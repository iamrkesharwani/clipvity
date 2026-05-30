import type { NextFunction, Request, Response } from 'express';
import { logger } from './logger.js';

export const appError = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const isProd = process.env['NODE_ENV'] === 'production';

  logger.error(
    {
      err,
      path: req.path,
      method: req.method,
    },
    'Unhandled exception intercepted by global error handler'
  );

  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred',
    ...(!isProd &&
      err instanceof Error && { stack: err.stack, details: err.message }),
  });
};
