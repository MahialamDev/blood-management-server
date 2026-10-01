import app from "./app";
import db from "../prisma/db";


import redisClient from "./app/lib/redis";


const PORT = Number(process.env.PORT);

const main = async () => {
  try {

    // Connect to database
    await db.connect();
    console.log("✅ Database connected");

    // redis connect
    await redisClient.connect();
    console.log("Redis connected")

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Your Server is running on Port : ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
