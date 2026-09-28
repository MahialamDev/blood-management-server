import dotenv from "dotenv";
import path from "path"

dotenv.config({path: path.join(process.cwd(), ".env")})

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt_secrect: process.env.JWT_SECRECT,
    redis_url: process.env.REDIS_URL,

    //=====// nodemailer ==== // ====
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS
}