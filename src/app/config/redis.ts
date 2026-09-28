
import { createClient } from "redis";
import config from ".";

const redisClient = createClient({
    url: config.redis_url
});

redisClient.on("error", (err) => {
    if (config.node_env === "development") {
        console.error("Redis Client Error:", err);
    }
});

export default redisClient;

    