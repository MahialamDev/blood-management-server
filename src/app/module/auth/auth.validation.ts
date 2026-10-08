import { RlsRoleHandle } from "@prisma/orm-postgres/contract-builder";
import { z } from "zod";


export const registerUserSchema = z.object({
    name: z.string().min(2, "Must Be 2 character!").regex(/^[a-zA-Z\s]+$/, "Name can only contain letters"),
    email: z.email("Invalid Email Address"),
    password: z.string().min(6, "Password must be 6 charecter"),
    imageUrl : z.url("Invalid Image Url")
})

export interface IRequestUser {
	userId: string;
	email: string;
	name: string;
	role: RlsRoleHandle;
}


