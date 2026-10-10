'use client'

import { useState, useEffect } from 'react'
import { getHistoricalWeather } from '@/serverActions/weather/getHistoricalWeather'
import { HistoricalWeatherStats } from '@/serverActions/weather/weather.schemas'

export function useHistoricalWeatherData() {
  const [data, setData] = useState<HistoricalWeatherStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const stats = await getHistoricalWeather()
        setData(stats)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch historical weather'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
