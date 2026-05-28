import type { Request, Response } from 'express';

export const logout = (_req: Request, res: Response): void => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env['JWT_SECRET'] === 'production',
      sameSite: process.env['JWT_SECRET'] === 'production' ? 'none' : 'lax',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout',
    });
  }
};
