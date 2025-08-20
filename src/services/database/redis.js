const RedisClient = require("ioredis");
const redis = new RedisClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USER, 
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("client connected to redis...");
});
redis.on("ready", () => {
  console.log("client connected to redis and ready to use...");
});

redis.on("error", (err) => {
  console.log(err.message);
});

redis.on("end", () => {
  console.log("client disconnected from redis...");
});

process.on("SIGINT", () => {
  redis.quit();
});
module.exports = redis;
