import app from "./app";
import db from "../prisma/db";
import config from "./config";
import { createClient } from "redis";
import redisClient from "./config/redis";

const PORT = Number(process.env.PORT);

const main = async () => {
  try {

    // Connect to database
    await db.connect();
    console.log("✅ Database connected");

    // redis connect
    await redisClient.connect();
    console.log("redis connected")

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Your Server is running on Port : ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
