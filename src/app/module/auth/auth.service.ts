import { z } from "zod";

import { registerUserSchema } from "./auth.validation";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";
import ejs from "ejs";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
import db from "../../../../prisma/db";
import path from "path";
import { transporter } from "../../services/email.service";
import config from "../../config";
import crypto from "crypto";
import redisClient from "../../lib/redis";

type User = z.infer<typeof registerUserSchema>;

//register user
const registerUser = async (payload: User) => {
  const validateInfo = registerUserSchema.parse(payload);

  // trim email
  const email = validateInfo.email.trim().toLocaleLowerCase();

  //if user exist in database
  const isUserExist = await db.orm.public.User.where({
    email: email,
  }).first();

  if (isUserExist) {
    throw new AppError(409, "User Already Exist");
  }

  const name = validateInfo.name;

  //   if all ok now hashed the pass
  const hashedPassword = await bcrypt.hash(validateInfo.password, 8);

  // send user to database
  const userInfo = {
    name: validateInfo.name,
    email: validateInfo.email,
    imageUrl: validateInfo.imageUrl,
    password: hashedPassword,
  };

  // add redis and send email
  const expirationSecond = 5 * 60; //5 min
  const otpKey = `user-registation-otp:${email}`;
  const otpValue = crypto.randomInt(100000, 1000000);

  // set to redis
  await redisClient.set(otpKey, otpValue.toString(), {
    EX: expirationSecond,
  });

  // find the path for email body
  const templatePath = path.join(
    process.cwd(),
    "src/app/templates/user-registation-otp.ejs",
  );

  const templateData = {
    name,
    email,
    otp: otpValue,
    expirationMinutes: expirationSecond / 60,
  };

  const html = await ejs.renderFile(templatePath, templateData);

  await transporter.sendMail({
    from: config.email_user,
    to: email,
    subject: "Email Verification",
    // text : `Your OTP is ${otp}`
    // html: `<h1>Your OTP is ${otp}</h1>`
    html,
  });

  const user = await db.orm.public.User.create(userInfo);

  return { user };
};

// verify user
const verifyUser = async (email: string, otp: string) => {
  const otpKey = `user-registation-otp:${email}`;

  // 1. Redis থেকে OTP বের করা
  const storedOtp = await redisClient.get(otpKey);

  if (!storedOtp) {
    throw new AppError(400, "OTP expired or not found");
  }

  // 2. User-এর OTP এবং Redis-এর OTP মিলানো
  if (storedOtp !== otp) {
    throw new AppError(400, "Invalid OTP");
  }

  // 3. Database-এ user খোঁজা
  const user = await db.orm.public.User.where({
    email,
  }).first();

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // 4. Account status Active করা
  const updatedUser = await db.orm.public.User.where({
    email,
  }).update({
    accountStatus: "Active",
    verified: true,
  });

  // 5. OTP delete করা
  await redisClient.del(otpKey);

  return {
    user: updatedUser,
    message: "User verified successfully",
  };
};

// login user
const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new AppError(400, "Invalid Creditial");
  }

  const user = await db.orm.public.User.where({ email }).first();

  if (!user) {
    throw new AppError(400, "User not found!");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(401, "Unauthorized Access!");
  }

  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // access token
  const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_secrect!, {
    expiresIn: 60 * 15,
  });

  // refresh token
  const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_secrect!, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  // return
  return {
    accessToken,
    refreshToken,
  }
};

// get me
const getMe = async (user:User) => { 
  console.log("i am user")
}

// const accessToken = jwtUtils.createToken(jwtInfo, config.jwt_secrect! , "15m" as SignOptions)

export const AuthService = { registerUser, verifyUser, loginUser, getMe };
