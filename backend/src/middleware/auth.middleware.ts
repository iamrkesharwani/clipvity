import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../constants/AuthResponse.js';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../constants/GetJwtSecret.js';

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
      return;
    }

    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Issue occurred:', error);
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed',
    });
  }
};
