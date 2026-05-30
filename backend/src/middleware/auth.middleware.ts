import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../constants/AuthResponse.js';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../constants/GetJwtSecret.js';
import { logger } from '../utils/logger.js';

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies['token'];

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
      return;
    }

    const decoded = jwt.verify(token, getJwtSecret());
    if (typeof decoded === 'string' || !decoded['userId']) {
      res
        .status(401)
        .json({ success: false, message: 'Not authorized, token failed' });
      return;
    }
    req.userId = decoded['userId'] as string;

    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed',
    });
  }
};
