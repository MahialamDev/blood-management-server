import nodemailer from "nodemailer";
import config from "../../app/config";

// 1. Create transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email_user,
    pass: config.email_pass,
  },
});

