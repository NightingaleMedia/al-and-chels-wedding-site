'use server'

/**
 * Server action to generate signed upload parameters for Cloudinary
 */

import cloudinary from './cloudinary'
import { UploadSignature } from '@/types/media'

export async function generateUploadSignature(
  context: string,
  tags: string,
): Promise<UploadSignature> {
  // Validate required environment variables
  if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error(
      'CLOUDINARY_API_SECRET environment variable is not configured',
    )
  }

  if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error('CLOUDINARY_API_KEY environment variable is not configured')
  }

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error(
      'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not configured',
    )
  }

  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'wedding_photos'
  const timestamp = Math.round(Date.now() / 1000)

  // All params sent in the upload request must be signed, or Cloudinary rejects with 400
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      upload_preset: uploadPreset,
      context,
      tags,
    },
    process.env.CLOUDINARY_API_SECRET,
  )

  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset,
  }
}
