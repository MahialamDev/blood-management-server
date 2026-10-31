import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const allUsers = catchAsync(async (req, res) => { 

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search as string | undefined;

    const users = await UserService.getAllUsers(page, limit, search);
    console.log(users)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Users found",
        data: users,
    })
})

const singleUser = catchAsync(async (req, res) => { 
    const singleUser = await UserService.singleUser();
    sendResponse(res, {
        success: true,
        statusCode: 200, 
        message: "user found",
        data: singleUser
    })
})

export const userController = { allUsers, singleUser };