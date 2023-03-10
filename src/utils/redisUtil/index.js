const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (error) => console.error(`Error : ${error}`));

const setToRedisStore = async (token) => {
  redisClient.connect();
  await redisClient.set(token, ' ');
  redisClient.disconnect();
};

const getFromRedisStore = async (token) => {
  redisClient.connect();
  const tokenData = await redisClient.get(token);
  redisClient.disconnect();
  return tokenData;
};

const removeFromRedisStore = async (token) => {
  redisClient.connect();
  await redisClient.del(token);
  redisClient.disconnect();
};

module.exports = { setToRedisStore, getFromRedisStore, removeFromRedisStore, redisClient };