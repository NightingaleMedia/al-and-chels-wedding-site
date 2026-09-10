'use server'

/**
 * Server action to fetch approved photos from Cloudinary
 */

import cloudinary from './cloudinary'
import { MediaItem } from '@/types/media'

interface ListPhotosResult {
  items: MediaItem[]
  nextCursor?: string
}

export async function listApprovedPhotos(
  cursor?: string,
): Promise<ListPhotosResult> {
  try {
    // Search for approved media using Cloudinary Admin API
    const result = await cloudinary.search
      .expression('tags=approved')
      .sort_by('created_at', 'desc')
      .max_results(20)
      .with_field('context')
      .with_field('tags')
      .next_cursor(cursor || '')
      .execute()

    const items: MediaItem[] = result.resources.map((resource: any) => ({
      publicId: resource.public_id,
      resourceType: resource.resource_type === 'video' ? 'video' : 'image',
      format: resource.format,
      url: resource.url,
      secureUrl: resource.secure_url,
      width: resource.width,
      height: resource.height,
      createdAt: resource.created_at,
      context: resource.context || {},
      tags: resource.tags || [],
      duration: resource.duration, // For videos
    }))

    return {
      items,
      nextCursor: result.next_cursor,
    }
  } catch (error) {
    console.error('Error fetching approved photos from Cloudinary:', error)
    throw new Error('Failed to fetch gallery photos')
  }
}
