'use server'

import { unstable_cache } from 'next/cache'
import {
  WEDDING_COORDS,
  WEDDING_DATE_RANGE,
  HistoricalYearData,
  HistoricalWeatherStats,
  OpenMeteoHistoricalResponse,
} from './weather.schemas'

// Weather code to description mapping
const weatherCodeToDescription: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32)
}

// Convert mm to inches
function mmToInches(mm: number): number {
  return Math.round((mm / 25.4) * 100) / 100
}

// Format sunset time from ISO string
function formatSunsetTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  })
}

// Fetch historical data for a single year
async function fetchYearData(year: number): Promise<HistoricalYearData | null> {
  const { month, startDay, endDay, targetDay } = WEDDING_DATE_RANGE
  const startDate = `${year}-${String(month).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`
  const endDate = `${year}-${String(month).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`

  const url = new URL('https://archive-api.open-meteo.com/v1/archive')
  url.searchParams.set('latitude', String(WEDDING_COORDS.latitude))
  url.searchParams.set('longitude', String(WEDDING_COORDS.longitude))
  url.searchParams.set('start_date', startDate)
  url.searchParams.set('end_date', endDate)
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,sunset,weathercode')
  url.searchParams.set('temperature_unit', 'celsius')
  url.searchParams.set('timezone', 'America/New_York')

  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      console.error(`Failed to fetch historical data for ${year}: ${response.status}`)
      return null
    }

    const data: OpenMeteoHistoricalResponse = await response.json()
    
    // Find the index for the target day (May 29)
    const targetIndex = targetDay - startDay // 29 - 27 = 2
    
    if (!data.daily?.time?.[targetIndex]) {
      console.error(`No data found for May ${targetDay}, ${year}`)
      return null
    }

    const tempMax = celsiusToFahrenheit(data.daily.temperature_2m_max[targetIndex])
    const tempMin = celsiusToFahrenheit(data.daily.temperature_2m_min[targetIndex])
    const avgTemp = Math.round((tempMax + tempMin) / 2)
    
    // Estimate nighttime temps (typically cooler)
    const nighttimeHigh = Math.round(tempMax - 5)
    const nighttimeLow = Math.round(tempMin - 3)

    // Calculate precipitation probability based on historical occurrence
    const precipTotal = data.daily.precipitation_sum[targetIndex] || 0
    const precipHours = data.daily.precipitation_hours[targetIndex] || 0
    const precipProbability = precipTotal > 0 ? Math.min(100, Math.round(precipHours / 24 * 100 + 20)) : 0

    return {
      year,
      date: data.daily.time[targetIndex],
      daytime: {
        tempHigh: tempMax,
        tempLow: tempMin,
        avgTemp,
      },
      nighttime: {
        tempHigh: nighttimeHigh,
        tempLow: nighttimeLow,
      },
      precipitation: {
        total: mmToInches(precipTotal),
        probability: precipProbability,
        hours: precipHours,
      },
      sunset: formatSunsetTime(data.daily.sunset[targetIndex]),
      conditions: weatherCodeToDescription[data.daily.weathercode[targetIndex]] || 'Unknown',
    }
  } catch (error) {
    console.error(`Error fetching historical data for ${year}:`, error)
    return null
  }
}

// Calculate aggregated statistics
function calculateStats(years: HistoricalYearData[]): HistoricalWeatherStats {
  const validYears = years.filter(Boolean)
  
  if (validYears.length === 0) {
    return {
      years: [],
      averages: {
        daytimeTempHigh: 0,
        daytimeTempLow: 0,
        nighttimeTempHigh: 0,
        nighttimeTempLow: 0,
        precipitationProbability: 0,
        avgSunset: 'N/A',
      },
      ranges: {
        tempHigh: { min: 0, max: 0 },
        tempLow: { min: 0, max: 0 },
        precipitation: { min: 0, max: 0 },
      },
    }
  }

  const daytimeHighs = validYears.map(y => y.daytime.tempHigh)
  const daytimeLows = validYears.map(y => y.daytime.tempLow)
  const nighttimeHighs = validYears.map(y => y.nighttime.tempHigh)
  const nighttimeLows = validYears.map(y => y.nighttime.tempLow)
  const precipProbs = validYears.map(y => y.precipitation.probability)
  const precipTotals = validYears.map(y => y.precipitation.total)

  // Most common sunset time (they're all very close for the same date)
  const avgSunset = validYears[Math.floor(validYears.length / 2)]?.sunset || 'N/A'

  return {
    years: validYears,
    averages: {
      daytimeTempHigh: Math.round(daytimeHighs.reduce((a, b) => a + b, 0) / daytimeHighs.length),
      daytimeTempLow: Math.round(daytimeLows.reduce((a, b) => a + b, 0) / daytimeLows.length),
      nighttimeTempHigh: Math.round(nighttimeHighs.reduce((a, b) => a + b, 0) / nighttimeHighs.length),
      nighttimeTempLow: Math.round(nighttimeLows.reduce((a, b) => a + b, 0) / nighttimeLows.length),
      precipitationProbability: Math.round(precipProbs.reduce((a, b) => a + b, 0) / precipProbs.length),
      avgSunset,
    },
    ranges: {
      tempHigh: { min: Math.min(...daytimeHighs), max: Math.max(...daytimeHighs) },
      tempLow: { min: Math.min(...daytimeLows), max: Math.max(...daytimeLows) },
      precipitation: { min: Math.min(...precipTotals), max: Math.max(...precipTotals) },
    },
  }
}

// Cached function to fetch all historical data
const fetchHistoricalDataCached = unstable_cache(
  async (): Promise<HistoricalWeatherStats> => {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - 10
    
    console.log(`[weather] Fetching historical data for years ${startYear}-${currentYear - 1}`)
    
    // Fetch all years in parallel
    const yearPromises: Promise<HistoricalYearData | null>[] = []
    for (let year = startYear; year < currentYear; year++) {
      yearPromises.push(fetchYearData(year))
    }
    
    const yearResults = await Promise.all(yearPromises)
    const validYears = yearResults.filter((y): y is HistoricalYearData => y !== null)
    
    console.log(`[weather] Successfully fetched ${validYears.length} years of historical data`)
    
    return calculateStats(validYears)
  },
  ['historical-weather-swanton'],
  {
    revalidate: 60 * 60 * 24 * 7, // Cache for 1 week (historical data doesn't change)
    tags: ['weather'],
  }
)

export async function getHistoricalWeather(): Promise<HistoricalWeatherStats> {
  return fetchHistoricalDataCached()
}
