'use server';

/**
 * Server action to approve or reject pending photos
 */

import cloudinary from './cloudinary';
import { ModerationAction } from '@/types/media';

export async function moderatePhoto(
  publicId: string,
  action: ModerationAction,
  resourceType: 'image' | 'video' = 'image'
): Promise<{ success: boolean; error?: string }> {
  try {
    const newTag = action === 'approve' ? 'approved' : 'rejected';
    
    // Update tags using Cloudinary Admin API
    await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      resource_type: resourceType,
      tags: ['wedding-photos', newTag], // Replace pending with approved/rejected
    });

    return { success: true };
  } catch (error) {
    console.error(`Error moderating photo ${publicId}:`, error);
    return {
      success: false,
      error: `Failed to ${action} photo. Please try again.`,
    };
  }
}
