'use client';

/**
 * Admin moderation interface for pending photo uploads
 */

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PinAuth from '@/components/admin/PinAuth';
import PendingMediaCard from '@/components/admin/PendingMediaCard';
import { listPendingPhotos } from '@/serverActions/photos/listPendingPhotos';
import { MediaItem } from '@/types/media';

export default function PendingPhotosPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingItems, setPendingItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending items after authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchPendingItems();
    }
  }, [isAuthenticated]);

  async function fetchPendingItems() {
    setLoading(true);
    try {
      const items = await listPendingPhotos();
      setPendingItems(items);
    } catch (error) {
      console.error('Error fetching pending items:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleItemModerated(publicId: string) {
    // Remove item from list
    setPendingItems((prev) => prev.filter((item) => item.publicId !== publicId));
  }

  if (!isAuthenticated) {
    return (
      <>
        <ToastContainer />
        <PinAuth onAuthenticated={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Pending Photos & Videos ({pendingItems.length})
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review and approve or reject uploaded content before it appears in the public gallery.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : pendingItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No pending items to review
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              All uploads have been moderated!
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {pendingItems.map((item) => (
              <PendingMediaCard
                key={item.publicId}
                item={item}
                onModerated={handleItemModerated}
              />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
