import cookieParser from "cookie-parser"
import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { rateLimiter } from "./app/utils/rateLimiter";
import { AuthRoute } from "./app/module/auth/auth.route";
import { UserRoute } from "./app/module/user/user.route";
import { globalErrorHandler } from "./app/utils/globalErrorHandler";
import { printRoutes } from "./app/utils/printRoute";
import listEndpoints from "express-list-endpoints";


const app:Application = express();


// middleware
app.use(rateLimiter)
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', //cross origin
  credentials: true,                // credintial true
}));


// Root Routes
app.get('/', (req:Request, res:Response) => { 
    res.status(httpStatus.OK).json({
        success: true,
        message: "Blood Management Server is Running"
    })
})

// All Routes
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/users', UserRoute);

const moduleRoutes = [
  { path: "/api/v1/auth", route: AuthRoute },
  { path: "/api/v1/users", route: UserRoute },
  // notun module hole ekhane ekta line add korun
];




// dev only: sob route table e dekhano
if (process.env.NODE_ENV === "development") {
  console.table(
    moduleRoutes.flatMap((r) =>
      listEndpoints(r.route).flatMap((e) =>
        e.methods.map((method) => ({
          method,
          path: r.path + (e.path === "/" ? "" : e.path),
        })),
      ),
    ),
  );
}


// error handler in last
app.use(globalErrorHandler)

export default app;