import { Suspense } from 'react'
import { EmailSubscriberForm } from '@/components/forms/Subscriber/EmailSubscriberForm'
import { PhoneSubscriberForm } from '@/components/forms/Subscriber/PhoneSubscriberForm'
import { BackendWarmup } from '@/components/warmup/BackendWarmup'
import { Box, Typography } from '@mui/material'
export default function SendMeUpdatesPage() {
  return (
    <Box className="flex flex-col gap-6 max-w-md mx-auto p-4 mb-10">
      <Suspense fallback={null}>
        <BackendWarmup />
      </Suspense>
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
