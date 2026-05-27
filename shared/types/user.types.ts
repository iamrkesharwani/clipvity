export interface IUserBase {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPublic {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
