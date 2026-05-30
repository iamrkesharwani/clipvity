import { rateLimit } from 'express-rate-limit';

const isProd = process.env['NODE_ENV'] === 'production';

const base = {
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => !isProd,
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
  message: { success: false, message: 'Too many requests, please slow down.' },
});
