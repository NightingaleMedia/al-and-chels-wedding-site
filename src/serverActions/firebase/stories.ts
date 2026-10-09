'use server'

import { firebaseClient } from './firebaseClient'
import { Story } from './firebase.schemas'

// Basic XSS sanitization - strips HTML tags and encodes special characters
function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Convert Firestore timestamp to ISO string
function serializeDate(date: unknown): string {
  if (date && typeof date === 'object' && '_seconds' in date) {
    // Firestore Timestamp
    return new Date((date as { _seconds: number })._seconds * 1000).toISOString()
  }
  if (date instanceof Date) {
    return date.toISOString()
  }
  return String(date)
}

export async function getStories(): Promise<
  { success: true; stories: Story[] } | { success: false; error: string }
> {
  try {
    const stories = await firebaseClient.getStories()
    const serializedStories: Story[] = stories.map((story) => ({
      id: story.id,
      storyMessage: story.storyMessage,
      author: story.author,
      createdAt: serializeDate(story.createdAt),
    }))

    return { success: true, stories: serializedStories }
  } catch (error) {
    console.error('[getStories] Exception:', error)
    return { success: false, error: 'Failed to load stories.' }
  }
}

export async function addStory(storyMessage: string, author: string) {
  try {
    const sanitizedMessage = sanitizeInput(storyMessage.trim())
    const sanitizedAuthor = sanitizeInput(author.trim())

    if (!sanitizedMessage || !sanitizedAuthor) {
      return { success: false, error: 'Story and author are required.' }
    }

    const id = await firebaseClient.addStory(sanitizedMessage, sanitizedAuthor)
    return { success: true, id }
  } catch (error) {
    console.error('[addStory] Exception:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}
