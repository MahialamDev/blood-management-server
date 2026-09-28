import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "../user/user.service";

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
  // here login condition

  res.status(200).json({
    success: true,
  });
};

export const AuthController = { loginUser, registerUser, verifyUser };
