import { z } from "zod";


export const registerUserSchema = z.object({
    name: z.string().min(2, "Must Be 2 character!").regex(/^[a-zA-Z\s]+$/, "Name can only contain letters"),
    email: z.email("Invalid Email Address"),
    imageUrl : z.url("Invalid Image Url")
})