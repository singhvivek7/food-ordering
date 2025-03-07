import path from 'path';

export const videoExtensions = ['.mp4', '.m4v', '.mov'];

export type MediaType = 'image' | 'video';

export const getMediaType = (uri: string): MediaType =>
  videoExtensions.includes(path.extname(uri)) ? 'video' : 'image';
