/**
 * Cloudinary SDK configuration and helper functions
 * Server-side only - uses API credentials from environment variables
 */

import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Export configured client
export default cloudinary;

/**
 * Helper function to generate Cloudinary transformation URLs
 */

// Desktop gallery: justified grid with aspect ratio maintained
export function getJustifiedImageUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    width: 'auto',
    crop: 'limit',
    quality: 'auto',
    fetch_format: 'auto',
  });
}

// Mobile gallery: square crop with smart gravity
export function getSquareThumbnailUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    width: 400,
    height: 400,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
  });
}

// Video thumbnail with play button
export function getVideoThumbnailUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    start_offset: '2', // 2 seconds into video
    width: 400,
    height: 400,
    crop: 'fill',
  });
}

// Lightbox full-size image
export function getLightboxUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    width: 1920,
    height: 1080,
    crop: 'limit',
    quality: 'auto',
  });
}
