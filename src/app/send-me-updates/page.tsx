import { EmailSubscriberForm } from '@/components/forms/Subscriber/EmailSubscriberForm'
import { PhoneSubscriberForm } from '@/components/forms/Subscriber/PhoneSubscriberForm'
import { pingBackend } from '@/serverActions/warmup/pingBackend'
import { Box, Typography } from '@mui/material'
export default async function SendMeUpdatesPage() {
  await pingBackend()
  return (
    <Box className="flex flex-col gap-6 max-w-md mx-auto p-4 mb-10">
      <Typography variant="h1" sx={{ py: 1, textAlign: 'center' }}>
        Stay In The Loop
      </Typography>
      <PhoneSubscriberForm />
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        AND / OR
      </Typography>
      <EmailSubscriberForm />
    </Box>
  )
}
