'use client'

import { Card, Typography, Chip } from '@mui/material'
import { ForecastDay } from '@/serverActions/weather/weather.schemas'

interface ForecastCardProps {
  day: ForecastDay
  compact?: boolean
}

// Simple icon mapping using emoji (could be replaced with actual icons)
const iconMap: Record<string, string> = {
  sun: '☀️',
  'cloud-sun': '⛅',
  cloud: '☁️',
  'cloud-rain': '🌧️',
  'cloud-showers-heavy': '🌧️',
  'cloud-sun-rain': '🌦️',
  snowflake: '❄️',
  bolt: '⚡',
  smog: '🌫️',
  icicles: '🧊',
  question: '❓',
}

export default function ForecastCard({ day, compact = false }: ForecastCardProps) {
  const icon = iconMap[day.icon] || '❓'

  if (compact) {
    return (
      <Card className="p-3 text-center min-w-[100px]">
        <Typography variant="caption" color="text.secondary">
          {day.dayOfWeek.slice(0, 3)}
        </Typography>
        <div className="text-2xl my-1">{icon}</div>
        <Typography variant="body2" className="font-medium">
          {day.daytime.tempHigh}° / {day.daytime.tempLow}°
        </Typography>
        {day.precipitation.probability > 0 && (
          <Typography variant="caption" color="primary">
            {day.precipitation.probability}%
          </Typography>
        )}
      </Card>
    )
  }

  return (
    <Card 
      className={`p-4 ${day.isWeddingDay ? 'ring-2 ring-amber-400' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Typography variant="h6">{day.dayOfWeek}</Typography>
            {day.isWeddingDay && (
              <Chip label="Wedding Day" size="small" color="primary" />
            )}
          </div>
          <Typography variant="body2" color="text.secondary">
            {new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>

      <Typography variant="body1" className="mb-3">
        {day.conditions}
      </Typography>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <Typography variant="caption" color="text.secondary">
            Temperature
          </Typography>
          <Typography variant="body2">
            <span className="text-red-500 font-medium">{day.daytime.tempHigh}°</span>
            {' / '}
            <span className="text-blue-500 font-medium">{day.daytime.tempLow}°</span>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Feels like {day.daytime.feelsLikeHigh}° / {day.daytime.feelsLikeLow}°
          </Typography>
        </div>

        <div>
          <Typography variant="caption" color="text.secondary">
            Precipitation
          </Typography>
          <Typography variant="body2">
            {day.precipitation.probability}% chance
          </Typography>
          {day.precipitation.total > 0 && (
            <Typography variant="caption" color="text.secondary">
              ~{day.precipitation.total}&quot; expected
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="caption" color="text.secondary">
            Wind
          </Typography>
          <Typography variant="body2">
            {day.wind.speed} mph {day.wind.direction}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Gusts up to {day.wind.gusts} mph
          </Typography>
        </div>

        <div>
          <Typography variant="caption" color="text.secondary">
            Sun Times
          </Typography>
          <Typography variant="body2">
            ↑ {day.sunrise}
          </Typography>
          <Typography variant="body2">
            ↓ {day.sunset}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" color="text.secondary">
            Humidity
          </Typography>
          <Typography variant="body2">{day.humidity}%</Typography>
        </div>

        <div>
          <Typography variant="caption" color="text.secondary">
            UV Index
          </Typography>
          <Typography variant="body2">{day.uvIndex}</Typography>
        </div>
      </div>
    </Card>
  )
}
