import cookieParser from "cookie-parser"
import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { rateLimiter } from "./app/utils/rateLimiter";
import { AuthRoute } from "./app/module/auth/auth.route";
import { UserRoute } from "./app/module/user/user.route";
import { globalErrorHandler } from "./app/utils/globalErrorHandler";


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