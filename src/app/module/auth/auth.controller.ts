import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "../user/user.service";
import { email } from "zod";
import { IRequestUser } from "./auth.validation";

// register
const registerUser = catchAsync(async (req: Request, res: Response) => {
  // register condition
  const payload = req.body;

  const data = await AuthService.registerUser(payload);

  res.cookie("acccessToken", "Rahat", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 15,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created!",
    data: data.user,
  });
});

// verify
const verifyUser = catchAsync(async (req: Request, res: Response,) => { 
  const {email, otp} = req.body;
  const  verificationResult = await AuthService.verifyUser(email, otp);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message:  verificationResult.message,
    data:  verificationResult.user
  })
})

// login
const loginUser = async (req: Request, res: Response) => {
  // payload
  const { email, password } = req.body;
  const callbackUrl = req.query.callbackUrl || "/";
  // here login condition
  const loginRes = await AuthService.loginUser(email, password)

  res.cookie("accessToken", loginRes.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 15
  } )
  res.cookie("refreshToken", loginRes.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 7
  })

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User Created Successfully!",
    data: null,
    meta: {
      callbackUrl
    }
  })
  
};


// 4. Get Current User Profile (Me)
const getMe = catchAsync(async (req: Request, res: Response) => {
  // req অবজেক্টকে কাস্টম টাইপে রূপান্তর করা হলো যাতে user এরর চলে যায়
  // req.user-কে আপনার কাঙ্ক্ষিত টাইপে কাস্ট করুন
  const user = req.user as unknown as IRequestUser ;



  const result = await AuthService.getMe(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});


export const AuthController = { loginUser, registerUser, verifyUser };
