import cookieParser from "cookie-parser"
import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { AuthRoute } from "./module/auth/auth.route";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import { UserRoute } from "./module/user/user.route";
import { rateLimiter } from "./utils/rateLimiter";

const app:Application = express();


// middleware
app.use(rateLimiter)
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// Root Routes
app.get('/', (req:Request, res:Response) => { 
    res.status(httpStatus.OK).json({
        success: true,
        message: "Blood Management Server is Running"
    })
})

// All Routes
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/users', UserRoute)



// error handler in last
app.use(globalErrorHandler)

export default app;