export const ALLOWED_VIDEO_TYPES: Record<string, string> = {
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/ogg': 'ogv',
  'video/quicktime': 'mov',
  'video/x-msvideo': 'avi',
  'video/x-matroska': 'mkv',
  'video/mp2t': 'ts',
  'video/3gpp': '3gp',
  'video/3gpp2': '3g2',
  'video/x-flv': 'flv',
  'video/x-ms-wmv': 'wmv',
  'video/mpeg': 'mpeg',
};

export const VIDEO_CATEGORIES = [
  'Music',
  'Gaming',
  'Comedy',
  'Film & TV',
  'Animation',
  'Education',
  'Science & Technology',
  'News & Politics',
  'History',
  'Sports',
  'Travel & Events',
  'Food & Cooking',
  'Fashion & Beauty',
  'Health & Fitness',
  'Pets & Animals',
  'Autos & Vehicles',
  'Nonprofits & Activism',
  'DIY & Crafts',
  'Other',
] as const;

export const MAX_TITLE_LENGTH = 200;
export const MAX_DESCRIPTION_LENGTH = 5000;
export const MAX_CATEGORY_LENGTH = 100;

export const ALLOWED_VIDEO_MIME_TYPES = Object.keys(ALLOWED_VIDEO_TYPES);
