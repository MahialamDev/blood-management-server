import { z } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const zodValidate = (payload: z.ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatePayload = payload.safeParse(req.body);
      if (!validatePayload.success) {
        throw new Error(validatePayload.error.issues[0].message);
      }

      req.body = validatePayload.data;
      next();
    } catch (error) {
      next(error);
    }
  });
};

export default zodValidate;
