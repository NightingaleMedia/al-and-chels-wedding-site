'use client'

import { Card, Typography, LinearProgress } from '@mui/material'
import { ForecastStatus } from '@/serverActions/weather/weather.schemas'

interface ForecastCountdownProps {
  status: ForecastStatus
}

export default function ForecastCountdown({ status }: ForecastCountdownProps) {
  // Progress: 100% when forecast is available, decreases as we get further from availability
  const maxDaysOut = 45 // Show progress starting from ~45 days out
  const progress = status.available 
    ? 100 
    : Math.max(0, ((maxDaysOut - status.daysUntilForecast) / maxDaysOut) * 100)

  return (
    <Card className="p-4 md:p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <Typography variant="h5" className="mb-2">
        {status.daysUntilWedding <= 0 ? '🎉' : '📅'} {status.daysUntilWedding} days
      </Typography>
      <Typography variant="body1" color="text.secondary" className="mb-4">
        {status.message}
      </Typography>
      
      {!status.available && status.daysUntilForecast > 0 && (
        <div className="max-w-xs mx-auto">
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            className="h-2 rounded-full"
          />
          <Typography variant="caption" color="text.secondary" className="mt-2 block">
            Forecast unlocks in {status.daysUntilForecast} days
          </Typography>
        </div>
      )}

      {status.available && (
        <Typography variant="body2" color="success.main" className="font-medium">
          ✓ Live forecast available below
        </Typography>
      )}
    </Card>
  )
}
