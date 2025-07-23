import { createClient, RedisClientType } from 'redis';
import { CONFIG } from './constants';

export let redisClient: RedisClientType;

(async () => {
  if (!redisClient) {
    redisClient = createClient({
      socket: {
        host: CONFIG.REDIS_HOST,
        port: CONFIG.REDIS_PORT,
      },
      username: CONFIG.REDIS_USER,
      password: CONFIG.REDIS_PASS,
      database: 0
    });

    await redisClient.connect();
  }
})();

export default redisClient;