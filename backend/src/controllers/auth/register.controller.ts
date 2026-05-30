import { z } from 'zod';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import { serverRegisterSchema } from '@clipvity/shared/schema/auth';
import { User } from '../../models/User.js';
import { getJwtSecret } from '../../constants/GetJwtSecret.js';
import { logger } from '../../utils/logger.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = serverRegisterSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: z.treeifyError(validationResult.error),
      });
      return;
    }

    const { name, email, password } = validationResult.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'A user with this email already exists',
      });
      return;
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ userId: newUser._id }, getJwtSecret(), {
      expiresIn: '7d',
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: process.env['NODE_ENV'] === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    logger.error(error, 'Registration error');
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
    });
  }
};
