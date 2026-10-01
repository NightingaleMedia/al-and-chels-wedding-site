import { EmailSubscriberForm } from '@/components/forms/Subscriber/EmailSubscriberForm'
import { PhoneSubscriberForm } from '@/components/forms/Subscriber/PhoneSubscriberForm'
import { Box, Typography } from '@mui/material'
export default function SendMeUpdatesPage() {
  return (
    <Box className="flex flex-col gap-6 max-w-md mx-auto p-4 mb-10">
      <Typography variant="h1" sx={{ py: 4, textAlign: 'center' }}>
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
