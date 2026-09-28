import { NextFunction, Request, Response } from "express";
import config from "../config";
import { AppError } from "./AppError";
import httpStatus from 'http-status';
import { isStructuredError } from "@prisma/orm-postgres/utils/structured-error";

export const globalErrorHandler = async(err:any, _req:Request, res:Response, _next:NextFunction) => {
    let statusCode:number = 500;
    let errorMessage = err.message || "Internal Server Error!";

    // error name ex:typeErr / refreanceErr
    const errorName = err.name || "Internal Server Error!"

    // development এ error console এ দেখাবে
    if (config.node_env === "development") {
        console.log("Error from Global Error Handler", err);
    }


    // error messeage set

    if (err instanceof AppError) { 
        statusCode = err.statusCode
        errorMessage = err.message
    }else if (err instanceof Error) { 
        errorMessage = err.message
    } else if (isStructuredError(err)) {
          statusCode = httpStatus.BAD_REQUEST;
        errorMessage = err.message;
    }
  
    // send response
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        name: config.node_env === "development" ? errorName : "undefine",
        message: config.node_env === "development" ? errorMessage : "Internal Server Error",
        stack: config.node_env === "development" ? err.stack : undefined
    })
};

