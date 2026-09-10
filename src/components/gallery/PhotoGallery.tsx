'use client';

/**
 * Photo gallery component with infinite scroll and responsive layouts
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { MediaItem } from '@/types/media';
import { listApprovedPhotos } from '@/serverActions/photos/listApprovedPhotos';
import MediaCard from './MediaCard';

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function PhotoGallery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [loadingMore, setLoadingMore] = useState(false);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch initial photos
  const fetchPhotos = useCallback(async (cursor?: string) => {
    try {
      const result = await listApprovedPhotos(cursor);
      
      if (cursor) {
        // Appending for infinite scroll
        setItems((prev) => [...prev, ...result.items]);
      } else {
        // Initial load - shuffle for random order
        const shuffled = shuffleArray(result.items);
        setItems(shuffled);
      }
      
      setNextCursor(result.nextCursor);
      setHasMore(!!result.nextCursor);
      setError(null);
    } catch (err) {
      console.error('Error fetching photos:', err);
      setError('Unable to load gallery. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          setLoadingMore(true);
          fetchPhotos(nextCursor);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loading, nextCursor, fetchPhotos]);

  // Retry handler
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setItems([]);
    fetchPhotos();
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRetry}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" gutterBottom>
          No photos yet. Be the first to share!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload your favorite memories using the form above.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Photo Gallery ({items.length} {items.length === 1 ? 'photo' : 'photos'})
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: isMobile ? '1fr' : 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: isMobile ? 2 : 3,
        }}
      >
        {items.map((item) => (
          <MediaCard key={item.publicId} item={item} isMobile={isMobile} />
        ))}
      </Box>

      {/* Infinite scroll trigger */}
      {hasMore && (
        <Box
          ref={observerTarget}
          sx={{ display: 'flex', justifyContent: 'center', py: 4 }}
        >
          {loadingMore && <CircularProgress />}
        </Box>
      )}

      {/* End of gallery message */}
      {!hasMore && items.length > 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            You've reached the end of the gallery
          </Typography>
        </Box>
      )}
    </Box>
  );
}
