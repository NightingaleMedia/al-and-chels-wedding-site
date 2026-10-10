'use client'

import { Skeleton, Alert } from '@mui/material'
import { useHistoricalWeatherData } from '@/hooks/useHistoricalWeatherData'
import HistoricalTempChart from './HistoricalTempChart'
import HistoricalPrecipChart from './HistoricalPrecipChart'
import HistoricalSummaryCards from './HistoricalSummaryCards'

export default function HistoricalSection() {
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
