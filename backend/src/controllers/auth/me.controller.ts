import type { Response } from 'express';
import { User } from '../../models/User.js';
import type { AuthRequest } from '../../constants/AuthResponse.js';

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (typeof userId !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid User ID',
      });
      return;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching user',
    });
  }
};
