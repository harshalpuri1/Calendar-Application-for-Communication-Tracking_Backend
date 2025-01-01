const RedisClient = require("ioredis");
const redis = new RedisClient({
  host: "redis-12850.c245.us-east-1-3.ec2.redns.redis-cloud.com",
  port: 12850,
  password: "n8kQK9Hi8COpiqg2C7YNPP79RGJKxg1r",
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
