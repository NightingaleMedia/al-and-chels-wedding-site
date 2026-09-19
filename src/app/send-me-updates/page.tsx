import { EmailSubscriberForm } from '@/components/forms/Subscriber/EmailSubscriberForm'
import { PhoneSubscriberForm } from '@/components/forms/Subscriber/PhoneSubscriberForm'
import { Box, Typography } from '@mui/material'
export default function SendMeUpdatesPage() {
  return (
    <Box className="flex flex-col gap-6 max-w-md mx-auto my-10 p-4">
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        stay in the loop...
      </Typography>
      <PhoneSubscriberForm />
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        AND / OR
      </Typography>
      <EmailSubscriberForm />
    </Box>
  )
}
