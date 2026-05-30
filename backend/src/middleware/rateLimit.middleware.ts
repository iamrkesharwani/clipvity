import { rateLimit } from 'express-rate-limit';
import RedisStore, { type RedisReply } from 'rate-limit-redis';
import { Redis } from 'ioredis';
import { logger } from '../utils/logger.js';

const isProd = process.env['NODE_ENV'] === 'production';

const redisClient = new Redis(
  process.env['REDIS_URL'] || 'redis://127.0.0.1:6379',
  {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  }
);

redisClient.on('connect', () => {
  logger.info(
    'Rate limiter connection event: Connected to Redis server successfully'
  );
});

redisClient.on('error', (err) => {
  logger.error(err, 'Rate limiter connection event: Redis connection failure');
});

const redisStore = new RedisStore({
  sendCommand: async (...args: string[]): Promise<RedisReply> => {
    const command = args[0];
    if (!command) {
      throw new Error('Redis rate limiter received an empty command context');
    }
    return redisClient.call(command, ...args.slice(1)) as Promise<RedisReply>;
  },
});

const base = {
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => !isProd,
  store: redisStore,
};

export const authLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many attempts, please try again later.',
  },
});

export const generalLimiter = rateLimit({
  ...base,
  windowMs: 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please slow down.',
  },
});
