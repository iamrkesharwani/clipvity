import { loginSchema } from '@clipvity/shared/schema/auth';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../../models/User.js';
import { getJwtSecret } from '../../constants/GetJwtSecret.js';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: z.treeifyError(validationResult.error),
      });
      return;
    }

    const { email, password } = validationResult.data;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const token = jwt.sign({ userId: user._id }, getJwtSecret(), {
      expiresIn: '7d',
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: process.env['NODE_ENV'] === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
    });
  }
};
