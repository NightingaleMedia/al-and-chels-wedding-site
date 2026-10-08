import { Box, Divider, Typography } from '@mui/material'
import { connection } from 'next/server'
import { pingBackend } from '@/serverActions/warmup/pingBackend'
import GuestSearch from '@/components/forms/GuestSearch/GuestSearch'

export const instant = false

export default async function RSVPPage() {
  await connection()
  await pingBackend()
  return (
    <Box className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      {/* <Suspense fallback={null}>
        <BackendWarmup />
      </Suspense> */}
      <Typography variant="h1">RSVP</Typography>
      <Typography variant="body1">
        Open the RSVP link from your invitation to find your party.
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
