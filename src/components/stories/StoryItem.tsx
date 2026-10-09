'use client'

import dayjs from 'dayjs'
import { Box, Paper, Typography } from '@mui/material'
import { FormatQuoteRounded } from '@mui/icons-material'
import { Story } from '@/serverActions/firebase/firebase.schemas'

interface StoryItemProps {
  story: Story
}

export const StoryItem = ({ story }: StoryItemProps) => {
  const formatDate = (date: string) => {
    return dayjs(date).format('MMM D, YYYY')
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        p: 3,
        pb: 1,
        backgroundColor: 'background.paper',
        borderLeftColor: 'primary.main',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <FormatQuoteRounded
        sx={{
          position: 'absolute',
          top: -4,
          left: 12,
          fontSize: 48,
          color: 'primary.light',
          opacity: 0.6,
        }}
      />

      <Box sx={{ mt: 1 }}>
        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: 'text.primary',
            mb: 2,
          }}
        >
          {story.storyMessage}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
            pt: 1,
            mt: 0.5,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 200,
              color: 'primary.dark',
              fontSize: '1rem',
            }}
          >
            - {story.author}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
            }}
          >
            {formatDate(story.createdAt)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
