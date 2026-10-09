'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import { Story } from '@/serverActions/firebase/firebase.schemas'
import { getStories } from '@/serverActions/firebase/stories'
import { StoryItem } from './StoryItem'

export const StoryGallery = () => {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      const result = await getStories()
      if (result.success) {
        setStories(result.stories)
      } else {
        setError(result.error)
      }
      setLoading(false)
    }

    fetchStories()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (stories.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No stories yet. Be the first to share!
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        maxHeight: '70vh',
        overflowY: 'scroll',
        pr: 1,
        pb: '35vh',
        '&::-webkit-scrollbar': {
          width: 4,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: 4,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {stories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </Box>
    </Box>
  )
}
