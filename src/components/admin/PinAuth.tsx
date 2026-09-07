'use client';

/**
 * PIN authentication component for admin moderation access
 */

import React, { useState, FormEvent } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { LockOpen as LockIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { verifyAdminPin } from '@/serverActions/photos/verifyAdminPin';

interface PinAuthProps {
  onAuthenticated: () => void;
}

export default function PinAuth({ onAuthenticated }: PinAuthProps) {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (pin.length !== 6) {
      toast.error('PIN must be 6 digits');
      return;
    }

    setLoading(true);

    try {
      const isValid = await verifyAdminPin(pin);

      if (isValid) {
        toast.success('Access granted!');
        onAuthenticated();
      } else {
        toast.error('Incorrect PIN. Please try again.');
        setPin('');
      }
    } catch (error) {
      console.error('PIN verification error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Admin Access
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter the 6-digit PIN to access the moderation interface
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="6-Digit PIN"
            type="password"
            fullWidth
            required
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
            disabled={loading}
            slotProps={{
              htmlInput: {
                maxLength: 6,
                inputMode: 'numeric' as const,
                pattern: '[0-9]*',
              },
            }}
            sx={{ mb: 3 }}
            autoFocus
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || pin.length !== 6}
            startIcon={<LockIcon />}
          >
            {loading ? 'Verifying...' : 'Access Moderation'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
