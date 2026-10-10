'use client'

import { Typography, Skeleton, Alert } from '@mui/material'
import { useWeatherForecast } from '@/hooks/useWeatherForecast'
import ForecastCard from './ForecastCard'
import ForecastCountdown from './ForecastCountdown'

export default function ForecastSection() {
  const { forecast, status, loading, error } = useWeatherForecast()

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton variant="rectangular" height={120} className="rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={150}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load weather forecast. Please try again later.
      </Alert>
    )
  }

  if (!status) {
    return null
  }

  return (
    <div className="space-y-6">
      <ForecastCountdown status={status} />

      {forecast?.weddingDay && (
        <div>
          <Typography variant="h6" className="mb-3">
            Wedding Day Forecast
          </Typography>
          <ForecastCard day={forecast.weddingDay} />
        </div>
      )}

      {status.daysUntilWedding < 30 && forecast && forecast.days.length > 0 && (
        <div>
          <Typography variant="h6" className="mb-3">
            {forecast.weddingDay
              ? 'Full 5-Day Outlook'
              : 'Current 5-Day Forecast'}
          </Typography>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {forecast.days.slice(0, 5).map((day) => (
              <ForecastCard key={day.date} day={day} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
