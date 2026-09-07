'use client';

/**
 * Pending media card for moderation interface
 */

import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { MediaItem } from '@/types/media';
import { moderatePhoto } from '@/serverActions/photos/moderatePhoto';

interface PendingMediaCardProps {
  item: MediaItem;
  onModerated: (publicId: string) => void;
}

export default function PendingMediaCard({ item, onModerated }: PendingMediaCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Generate thumbnail URL
  const getThumbnailUrl = () => {
    const baseUrl = item.secureUrl.split('/upload/')[0];
    const publicId = item.publicId;

    if (item.resourceType === 'video') {
      return `${baseUrl}/upload/so_2,w_400,h_400,c_fill,f_jpg/${publicId}.jpg`;
    } else {
      return `${baseUrl}/upload/w_400,h_400,c_fill,g_auto,q_auto/${publicId}`;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  async function handleModerate(action: 'approve' | 'reject') {
    setIsProcessing(true);

    // Optimistic UI update
    setIsRemoved(true);

    try {
      const result = await moderatePhoto(item.publicId, action, item.resourceType);

      if (result.success) {
        toast.success(`${item.resourceType} ${action}d successfully!`);
        // Notify parent to remove from list
        setTimeout(() => onModerated(item.publicId), 300);
      } else {
        // Rollback optimistic update
        setIsRemoved(false);
        toast.error(result.error || `Failed to ${action} ${item.resourceType}`);
      }
    } catch (error) {
      console.error(`Error moderating ${item.publicId}:`, error);
      setIsRemoved(false);
      toast.error(`Failed to ${action} ${item.resourceType}. Please try again.`);
    } finally {
      setIsProcessing(false);
    }
  }

  if (isRemoved) {
    return null;
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={getThumbnailUrl()}
          alt={item.context?.caption || 'Pending upload'}
          sx={{ height: 300, objectFit: 'cover' }}
        />
        
        {/* Video indicator */}
        {item.resourceType === 'video' && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <Chip
              icon={<PlayIcon />}
              label="Video"
              size="small"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
              }}
            />
            {item.duration && (
              <Chip
                label={formatDuration(item.duration)}
                size="small"
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                }}
              />
            )}
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        {item.context?.caption && (
          <Typography variant="body2" gutterBottom>
            <strong>Caption:</strong> {item.context.caption}
          </Typography>
        )}
        
        {item.context?.submitter && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Submitted by:</strong> {item.context.submitter}
          </Typography>
        )}
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Uploaded: {formatDate(item.createdAt)}
        </Typography>
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {item.width} × {item.height}px
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<RejectIcon />}
          onClick={() => handleModerate('reject')}
          disabled={isProcessing}
          fullWidth
          sx={{ mr: 1 }}
        >
          Reject
        </Button>
        
        <Button
          variant="contained"
          color="success"
          startIcon={<ApproveIcon />}
          onClick={() => handleModerate('approve')}
          disabled={isProcessing}
          fullWidth
        >
          Approve
        </Button>
      </CardActions>
    </Card>
  );
}
