import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken"; // জাস্ট উদাহরণের জন্য, আপনার jwtUtils ব্যবহার করতে পারেন


export enum Role {
  user = "user",
  admin = "Admin",
  Super_Admin = "Super_Admin",
}

const auth = (...requiredRoles: Role[]) => { 
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    // ১. টোকেন না থাকলে এরর
    if (!token) { 
      throw new Error("Unauthorized Access! Token missing.");
    }

    // ২. টোকেন ভেরিফাই করার অংশ (আপনার jwtUtils বা jwt.verify এখানে হবে)
    // const decoded = jwt.verify(token, config.jwt_secret) as any;
    // req.user = decoded; // রিকোয়েস্টে ইউজার ডাটা পাস করার জন্য

    // ৩. রোল চেক করার অংশ (যদি প্রয়োজন হয়)
    // if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
    //   throw new Error("Forbidden Access!");
    // }

    console.log("Token Found:", token);

    next(); // ✅ অত্যন্ত গুরুত্বপূর্ণ! এটি রিকোয়েস্টকে কন্ট্রোলারে পাঠাবে।
  });
};

export default auth;
