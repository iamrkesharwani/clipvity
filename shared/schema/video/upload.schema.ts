import { z } from 'zod';
import {
  ALLOWED_VIDEO_MIME_TYPES,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  VIDEO_CATEGORIES,
} from '../../constants/video.constants.js';

export const uploadVideoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: 'Title is required' })
    .max(MAX_TITLE_LENGTH, {
      error: `Title cannot exceed ${MAX_TITLE_LENGTH} characters`,
    }),

  description: z
    .string()
    .trim()
    .max(MAX_DESCRIPTION_LENGTH, {
      error: `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`,
    })
    .default(''),

  category: z
    .enum(VIDEO_CATEGORIES, {
      error: (issue) =>
        `Invalid category "${issue.input}". Allowed: ${VIDEO_CATEGORIES.join(', ')}`,
    })
    .default('Other'),

  fileType: z.enum(ALLOWED_VIDEO_MIME_TYPES as [string, ...string[]], {
    error: (issue) =>
      `Unsupported video format "${issue.input}". Allowed: ${ALLOWED_VIDEO_MIME_TYPES.join(', ')}`,
  }),
});

export type UploadVideoInput = z.infer<typeof uploadVideoSchema>;
