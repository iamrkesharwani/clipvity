import mongoose, { Schema } from 'mongoose';
import type { IVideoBase, VideoStatus } from '@clipvity/shared/types';

type VideoDocument = Omit<IVideoBase, 'owner'> &
  mongoose.Document & {
    owner: mongoose.Types.ObjectId;
  };

const VideoSchema = new Schema<VideoDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      default: '',
      maxlength: 5000,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    masterUrl: {
      type: String,
      required: false,
    },
    resolutions: {
      p360: String,
      p720: String,
      p1080: String,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'processing',
        'queued',
        'published',
        'failed',
      ] satisfies VideoStatus[],
      default: 'processing',
      index: true,
    },
    category: {
      type: String,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    duration: {
      type: Number,
      default: 0,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

VideoSchema.index({ owner: 1, status: 1, isDeleted: 1 });

VideoSchema.statics['incrementViews'] = function (videoId: string) {
  return this.findByIdAndUpdate(videoId, { $inc: { views: 1 } });
};

export const Video = mongoose.model<VideoDocument>('Video', VideoSchema);
