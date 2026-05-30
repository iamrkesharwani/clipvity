import type { Response } from 'express';
import type { AuthRequest } from '../../constants/AuthResponse.js';
import { Video } from '../../models/Video.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { b2Client } from '../../config/b2.js';

export const getUploadUrl = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description = '', category = '', fileType } = req.body;
    const userId = req.userId;

    if (!userId) {
      res
        .status(401)
        .json({ success: false, message: 'User not authenticated' });
      return;
    }

    if (!title || !fileType) {
      res.status(400).json({
        success: false,
        message: 'Title and fileType are required',
      });
      return;
    }

    if (!fileType.startsWith('video/')) {
      res.status(400).json({
        success: false,
        message: 'Invalid file format. Only video files are allowed.',
      });
      return;
    }

    const video = await Video.create({
      owner: userId,
      title,
      description,
      category,
      status: 'processing',
      thumbnail: '',
      masterUrl: '',
    });

    const extension = fileType.split('/')[1] || 'mp4';
    const uniqueStorageKey = `raw/${userId}/${video._id}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env['B2_BUCKET_NAME'],
      Key: uniqueStorageKey,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(b2Client, command, {
      expiresIn: 3600,
    });

    res.status(200).json({
      status: true,
      message: 'Upload URL generated successfully',
      uploadUrl: signedUrl,
      videoId: video._id,
      storageKey: uniqueStorageKey,
    });
  } catch (error) {
    console.error('Error generating upload URL:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during upload',
    });
  }
};
