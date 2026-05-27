import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IUserBase } from '@clipvity/shared/types';

type UserDocument = IUserBase &
  mongoose.Document & {
    comparePassword(candidate: string): Promise<boolean>;
  };

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500,
    },
    subscribersCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password') || !this['password']) return;
  const salt = await bcrypt.genSalt(12);
  this['password'] = await bcrypt.hash(this['password'] as string, salt);
});

UserSchema.methods['comparePassword'] = async function (
  candidate: string
): Promise<boolean> {
  const hash = this['password'] as string | undefined;
  if (!hash) return false;
  return bcrypt.compare(candidate, hash);
};

export const User = mongoose.model<UserDocument>('User', UserSchema);
