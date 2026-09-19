import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export const ComingSoonPage = () => (
  <Box className="flex flex-col justify-center items-center min-h-[var(--content-height)]">
    <Typography variant="h1" align="center">
      Coming Soon
    </Typography>

    <Link href="/send-me-updates" className="mt-4">
      subscribe for updates
    </Link>
  </Box>
)
