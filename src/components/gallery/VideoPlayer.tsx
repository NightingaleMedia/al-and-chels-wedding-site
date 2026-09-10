'use client';

/**
 * Video player modal component
 * Opens in dialog with HTML5 video controls
 */

import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  caption?: string;
}

export default function VideoPlayer({ open, onClose, videoUrl, caption }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stop video when modal closes
  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'black',
          },
        },
      }}
    >
      <DialogTitle sx={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {caption || 'Video'}
        <IconButton
          onClick={onClose}
          sx={{ color: 'white' }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <video
            ref={videoRef}
            controls
            autoPlay
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
