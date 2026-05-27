export type VideoStatus = 'processing' | 'published' | 'failed';

export interface IResolutions {
  p360?: string;
  p720?: string;
  p1080?: string;
}

export interface IVideoBase {
  owner: string;
  title: string;
  description: string;
  thumbnail: string;
  masterUrl: string;
  resolutions: IResolutions;
  status: VideoStatus;
  category: string;
  tags: string[];
  views: number;
  duration: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideoPublic extends IVideoBase {
  _id: string;
}
