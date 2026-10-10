'use client'

import { useState, useEffect } from 'react'
import { getWeatherForecast, getForecastStatus } from '@/serverActions/weather/getWeatherForecast'
import { WeatherForecast, ForecastStatus } from '@/serverActions/weather/weather.schemas'

export function useWeatherForecast() {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null)
  const [status, setStatus] = useState<ForecastStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        // Always fetch status first
        const forecastStatus = await getForecastStatus()
        setStatus(forecastStatus)

        // Only fetch full forecast if it's relevant (within reasonable range)
        // Always fetch for now to show upcoming days
        const forecastData = await getWeatherForecast()
        setForecast(forecastData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch weather forecast'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { forecast, status, loading, error }
}
