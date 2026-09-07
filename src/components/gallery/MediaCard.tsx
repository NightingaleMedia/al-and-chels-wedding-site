'use client'

/**
 * Individual media card for gallery display
 * Renders photo or video thumbnail with metadata
 */

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material'
import {
  FormatQuoteRounded,
  FormatQuoteSharp,
  PlayArrow as PlayIcon,
  QueueTwoTone,
  RequestQuoteRounded,
} from '@mui/icons-material'
import { MediaItem } from '@/types/media'
import VideoPlayer from './VideoPlayer'

interface MediaCardProps {
  item: MediaItem
  isMobile: boolean
}

export default function MediaCard({ item, isMobile }: MediaCardProps) {
  console.log(item)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  // Generate appropriate Cloudinary URL based on viewport
  const getImageUrl = () => {
    const baseUrl = item.secureUrl.split('/upload/')[0]
    const publicId = item.publicId

    if (isMobile) {
      // Square crop for mobile
      return `${baseUrl}/upload/w_400,h_400,c_fill,g_auto,q_auto/${publicId}`
    } else {
      // Justified layout for desktop
      return `${baseUrl}/upload/w_auto,c_limit,q_auto,f_auto/${publicId}`
    }
  }

  const getVideoThumbnailUrl = () => {
    const baseUrl = item.secureUrl.split('/upload/')[0]
    const publicId = item.publicId
    return `${baseUrl}/upload/so_2,w_400,h_400,c_fill,f_jpg/${publicId}.jpg`
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const thumbnailUrl =
    item.resourceType === 'video' ? getVideoThumbnailUrl() : getImageUrl()

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: item.resourceType === 'video' ? 'pointer' : 'default',
        }}
        onClick={() => item.resourceType === 'video' && setVideoModalOpen(true)}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={thumbnailUrl}
            alt={item.context?.caption || 'Wedding photo'}
            sx={{
              width: '100%',
              height: isMobile ? 400 : 'auto',
              objectFit: isMobile ? 'cover' : 'contain',
            }}
          />

          {/* Video overlay */}
          {item.resourceType === 'video' && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
              >
                <PlayIcon sx={{ fontSize: 48 }} />
              </IconButton>

              {/* Duration badge */}
              {item.duration && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption">
                    {formatDuration(item.duration)}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>

        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.context?.caption && (
              <Typography variant="body2" gutterBottom>
                {"\'"}
                {item.context.caption}
                {"\'"}
              </Typography>
            )}
          </Box>
          {item.context?.submitter && (
            <Typography variant="caption" color="text.secondary">
              -{item.context.submitter}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Video player modal */}
      {item.resourceType === 'video' && (
        <VideoPlayer
          open={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoUrl={item.secureUrl}
          caption={item.context?.caption}
        />
      )}
    </>
  )
}
