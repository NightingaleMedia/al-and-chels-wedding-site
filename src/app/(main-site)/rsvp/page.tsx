'use client'
import { Box, Divider, Typography } from '@mui/material'
import GuestSearch from '@/components/forms/GuestSearch/GuestSearch'
import { LoadingPageComponents } from '@/components/pageComponents/LoadingPageComponents'
import { usePingBackend } from '@/hooks/usePingBackend'

export default function RSVPPage() {
  const { loading: backendReady } = usePingBackend(true)

  return backendReady ? (
    <LoadingPageComponents />
  ) : (
    <Box className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      <Typography variant="special">rsvp</Typography>
      <Typography variant="body1">
        Open the RSVP QR code from your invitation to find your party.
      </Typography>
      <Divider />
      <Typography variant="h1">OR</Typography>
      <Typography variant="body1">
        Search below by your first and last name for your party.
      </Typography>
      <GuestSearch />
    </Box>
  )
}
