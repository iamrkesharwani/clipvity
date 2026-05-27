import type { IUserPublic } from './user.types.js';
import type { IVideoPublic } from './video.types.js';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export type VideoListResponse = PaginatedResponse<IVideoPublic>;
export type UserResponse = ApiResponse<IUserPublic>;
