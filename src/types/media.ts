/**
 * Type definitions for photo gallery media items
 */

export type MediaType = 'image' | 'video';

export interface MediaItem {
  publicId: string;
  resourceType: MediaType;
  format: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  createdAt: string;
  context?: {
    caption?: string;
    submitter?: string;
  };
  tags: string[];
  // For videos
  duration?: number;
}

export interface UploadSignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  uploadPreset: string;
}

export type ModerationAction = 'approve' | 'reject';

/**
 * File validation constants
 */
export const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB in bytes

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/heic',
  'image/heif',
  'image/webp',
];

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/quicktime', // .mov
  'video/x-msvideo', // .avi
];
