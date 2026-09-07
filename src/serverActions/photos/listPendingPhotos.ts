'use server';

/**
 * Server action to fetch pending photos for moderation
 */

import cloudinary from './cloudinary';
import { MediaItem } from '@/types/media';

export async function listPendingPhotos(): Promise<MediaItem[]> {
  try {
    // Search for pending media using Cloudinary Admin API
    const result = await cloudinary.search
      .expression('tags=pending')
      .sort_by('created_at', 'asc') // Oldest first for moderation queue
      .max_results(100) // Get all pending items
      .with_field('context')
      .with_field('tags')
      .execute();

    const items: MediaItem[] = result.resources.map((resource: any) => ({
      publicId: resource.public_id,
      resourceType: resource.resource_type === 'video' ? 'video' : 'image',
      format: resource.format,
      url: resource.url,
      secureUrl: resource.secure_url,
      width: resource.width,
      height: resource.height,
      createdAt: resource.created_at,
      context: resource.context?.custom || {},
      tags: resource.tags || [],
      duration: resource.duration, // For videos
    }));

    return items;
  } catch (error) {
    console.error('Error fetching pending photos from Cloudinary:', error);
    throw new Error('Failed to fetch pending photos');
  }
}
