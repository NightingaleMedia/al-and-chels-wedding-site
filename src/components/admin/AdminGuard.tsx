'use client';

/**
 * Admin authentication guard component
 * Shows login UI if JWT is absent/invalid, otherwise renders children
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PinAuth from './PinAuth';
import { verifyAdminToken } from '@/serverActions/admin/adminAuth';

const TOKEN_KEY = 'admin_token';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const isValid = await verifyAdminToken(token);
    
    if (!isValid) {
      // Clear invalid token
      sessionStorage.removeItem(TOKEN_KEY);
    }
    
    setIsAuthenticated(isValid);
  }

  function handleAuthenticated(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
    setIsAuthenticated(true);
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return <PinAuth onAuthenticated={handleAuthenticated} />;
  }

  // Authenticated - render children
  return <>{children}</>;
}
