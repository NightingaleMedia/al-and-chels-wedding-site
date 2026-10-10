'use client'

import { Typography, Skeleton, Alert, Divider, Box } from '@mui/material'
import { useHistoricalWeatherData } from '@/hooks/useHistoricalWeatherData'
import { useWeatherForecast } from '@/hooks/useWeatherForecast'
import HistoricalTempChart from '@/components/weather/HistoricalTempChart'
import HistoricalPrecipChart from '@/components/weather/HistoricalPrecipChart'
import HistoricalSummaryCards from '@/components/weather/HistoricalSummaryCards'
import ForecastCard from '@/components/weather/ForecastCard'
import ForecastCountdown from '@/components/weather/ForecastCountdown'
import { grey } from '@mui/material/colors'

function HistoricalSection() {
  const { data, loading, error } = useHistoricalWeatherData()

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton variant="rectangular" height={200} className="rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={100}
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
        Failed to load historical weather data. Please try again later.
      </Alert>
    )
  }

  if (!data || data.years.length === 0) {
    return <Alert severity="info">No historical weather data available.</Alert>
  }

  return (
    <div className="space-y-6">
      <HistoricalSummaryCards stats={data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HistoricalTempChart years={data.years} />
        <HistoricalPrecipChart years={data.years} />
      </div>

      {/* Historical conditions table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-3">Year</th>
              <th className="text-center py-2 px-3">High</th>
              <th className="text-center py-2 px-3">Low</th>
              <th className="text-center py-2 px-3">Rain</th>
              <th className="text-left py-2 px-3">Conditions</th>
              <th className="text-center py-2 px-3">Sunset</th>
            </tr>
          </thead>
          <tbody>
            {data.years.map((year) => (
              <tr key={year.year} className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">{year.year}</td>
                <td className="text-center py-2 px-3 text-red-500">
                  {year.daytime.tempHigh}°
                </td>
                <td className="text-center py-2 px-3 text-blue-500">
                  {year.daytime.tempLow}°
                </td>
                <td className="text-center py-2 px-3">
                  {year.precipitation.total > 0
                    ? `${year.precipitation.total}"`
                    : '—'}
                </td>
                <td className="py-2 px-3">{year.conditions}</td>
                <td className="text-center py-2 px-3">{year.sunset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ForecastSection() {
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

      {/* Wedding day highlight if available */}
      {forecast?.weddingDay && (
        <div>
          <Typography variant="h6" className="mb-3">
            Wedding Day Forecast
          </Typography>
          <ForecastCard day={forecast.weddingDay} />
        </div>
      )}

      {/* Upcoming days */}
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

export default function WeatherWatchPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Typography variant="h1" component="h1" className="mb-2">
          Weather Watch
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The wedding is <strong>outside*</strong>. But keep checking this page
          and dress to suit.
        </Typography>
        <Typography
          variant="caption"
          color="grey.600"
          component={'div'}
          sx={{ mt: 2, color: grey[500] }}
        >
          *Subject to change if the weather is bad
        </Typography>
      </div>

      {/* Forecast Section */}
      <section className="mb-12">
        <ForecastSection />
      </section>

      <Divider className="my-8" />

      {/* Historical Section */}
      <section>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" className="mb-4 flex items-center gap-2">
            Historical Weather
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-6">
            Based on weather data from May 29th over the past decade
          </Typography>
        </Box>{' '}
        <HistoricalSection />
      </section>
    </div>
  )
}
