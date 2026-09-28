import { z } from "zod";
import db from "../../../prisma/db";
import { registerUserSchema } from "./auth.validation";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";



type User = z.infer<typeof registerUserSchema>

const registerUser = async (payload: User) => { 
    const validateInfo = registerUserSchema.parse(payload);

    // trim email
    const email = validateInfo.email.trim().toLocaleLowerCase();

    const isUserExist = await db.orm.public.User.where({
        email: email
    }).first();

    if (isUserExist) { 
        throw new AppError(409, "User Already Exist");
    }

    const hashedPassword = await bcrypt.hash(validateInfo.password, 8);
    
    


    // send user to database
    const userInfo = {
        name: validateInfo.name,
        email: validateInfo.email,
        imageUrl: validateInfo.imageUrl,
        password: hashedPassword
    }

    // const accessToken = jwtUtils.createToken(jwtInfo, config.jwt_secrect! , "15m" as SignOptions)
   


    const user = await db.orm.public.User.create(userInfo);

    return {user};
}

export const AuthService = { registerUser };