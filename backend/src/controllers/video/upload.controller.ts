import type { NextFunction, Response } from 'express';
import type { AuthRequest } from '../../constants/AuthResponse.js';
import mongoose from 'mongoose';
import { Video } from '../../models/Video.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { b2Client } from '../../config/b2.js';
import {
  MAX_CATEGORY_LENGTH,
  ALLOWED_VIDEO_TYPES,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
} from '../../constants/VideoCons.js';

export const getUploadUrl = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res
        .status(401)
        .json({ success: false, message: 'User not authenticated' });
      return;
    }

    const bucketName = process.env['B2_BUCKET_NAME'];
    if (!bucketName) {
      res
        .status(500)
        .json({ success: false, message: 'Storage not configured' });
      return;
    }

    const {
      title,
      description = '',
      category = '',
      fileType,
    } = req.body as Record<string, string>;

    if (!title?.trim() || !fileType) {
      res.status(400).json({
        success: false,
        message: 'Title and fileType are required',
      });
      return;
    }

    const extension = ALLOWED_VIDEO_TYPES[fileType];
    if (!extension) {
      res.status(400).json({
        success: false,
        message: `Unsupported file type. Allowed types: ${Object.keys(ALLOWED_VIDEO_TYPES).join(', ')}`,
      });
      return;
    }

    const sanitizedTitle = title.trim().slice(0, MAX_TITLE_LENGTH);
    const sanitizedDescription = description
      .trim()
      .slice(0, MAX_DESCRIPTION_LENGTH);
    const sanitizedCategory = category.trim().slice(0, MAX_CATEGORY_LENGTH);

    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_-]/g, '_');
    const videoId = new mongoose.Types.ObjectId();
    const storageKey = `raw/${safeUserId}/${videoId.toString()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: storageKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(b2Client, command, {
      expiresIn: 3600,
    });

    await Video.create({
      _id: videoId,
      owner: userId,
      title: sanitizedTitle,
      description: sanitizedDescription,
      category: sanitizedCategory,
      status: 'pending',
      thumbnail: '',
      masterUrl: '',
    });

    res.status(200).json({
      success: true,
      message: 'Upload URL generated successfully',
      uploadUrl,
      videoId: videoId.toString(),
      storageKey,
    });
  } catch (error) {
    next(error);
  }
};
