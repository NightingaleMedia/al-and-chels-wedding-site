'use client'

import { Card, Typography } from '@mui/material'
import { ForecastStatus } from '@/serverActions/weather/weather.schemas'

interface ForecastCountdownProps {
  status: ForecastStatus
}

export default function ForecastCountdown({ status }: ForecastCountdownProps) {
  return (
    <Card className="p-4 md:p-6 text-center" elevation={3}>
      <Typography
        variant="h4"
        sx={{ fontSize: '1.5rem', textTransform: 'lowercase' }}
        className="mb-2"
      >
        {status.daysUntilWedding} days
      </Typography>
      <Typography variant="body1" color="text.secondary" className="mb-4">
        {status.message}
      </Typography>

      {status.available && (
        <Typography
          variant="body2"
          color="success.main"
          className="font-medium"
        >
          ✓ Live forecast available below
        </Typography>
      )}
    </Card>
  )
}
