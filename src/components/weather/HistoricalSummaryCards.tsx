'use client'

import { Card, Typography } from '@mui/material'
import { HistoricalWeatherStats } from '@/serverActions/weather/weather.schemas'

interface HistoricalSummaryCardsProps {
  stats: HistoricalWeatherStats
}

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  color?: string
}

function StatCard({ title, value, subtitle, color = 'text.primary' }: StatCardProps) {
  return (
    <Card className="p-4 text-center flex-1 min-w-[140px]">
      <Typography variant="body2" color="text.secondary" className="mb-1">
        {title}
      </Typography>
      <Typography variant="h4" sx={{ color }} className="font-bold">
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Card>
  )
}

export default function HistoricalSummaryCards({ stats }: HistoricalSummaryCardsProps) {
  const { averages, ranges } = stats

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <StatCard
        title="Avg High"
        value={`${averages.daytimeTempHigh}°F`}
        subtitle={`Range: ${ranges.tempHigh.min}° - ${ranges.tempHigh.max}°`}
        color="#ef4444"
      />
      <StatCard
        title="Avg Low"
        value={`${averages.daytimeTempLow}°F`}
        subtitle={`Range: ${ranges.tempLow.min}° - ${ranges.tempLow.max}°`}
        color="#3b82f6"
      />
      <StatCard
        title="Rain Chance"
        value={`${averages.precipitationProbability}%`}
        subtitle="Historical average"
        color="#6366f1"
      />
      <StatCard
        title="Sunset"
        value={averages.avgSunset}
        subtitle="Approximate time"
        color="#f97316"
      />
    </div>
  )
}
