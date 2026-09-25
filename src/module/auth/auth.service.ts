import { z } from "zod";
import db from "../../../prisma/db";
import { registerUserSchema } from "./auth.validation";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";


type User = z.infer<typeof registerUserSchema>

const registerUser = async (payload: User) => { 
    const userInfo = registerUserSchema.parse(payload);

    const jwtInfo = {
        name: payload.name,
        email: payload.email,
        imageUrl: payload.imageUrl
    };

    const accessToken = jwtUtils.createToken(jwtInfo, "rahat", "15m" as SignOptions)
    


    const user = await db.orm.public.User.create(userInfo);

    return {user, accessToken};
}

export const AuthService = { registerUser };