'use server'

import {
  WEDDING_COORDS,
  WEDDING_DATE,
  WEDDING_DATE_STR,
  ForecastDay,
  WeatherForecast,
  ForecastStatus,
  OpenMeteoForecastResponse,
} from './weather.schemas'

// Weather code to description and icon mapping
const weatherCodeMap: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: 'sun' },
  1: { description: 'Mainly clear', icon: 'sun' },
  2: { description: 'Partly cloudy', icon: 'cloud-sun' },
  3: { description: 'Overcast', icon: 'cloud' },
  45: { description: 'Foggy', icon: 'smog' },
  48: { description: 'Depositing rime fog', icon: 'smog' },
  51: { description: 'Light drizzle', icon: 'cloud-rain' },
  53: { description: 'Moderate drizzle', icon: 'cloud-rain' },
  55: { description: 'Dense drizzle', icon: 'cloud-rain' },
  61: { description: 'Slight rain', icon: 'cloud-rain' },
  63: { description: 'Moderate rain', icon: 'cloud-showers-heavy' },
  65: { description: 'Heavy rain', icon: 'cloud-showers-heavy' },
  66: { description: 'Light freezing rain', icon: 'icicles' },
  67: { description: 'Heavy freezing rain', icon: 'icicles' },
  71: { description: 'Slight snow', icon: 'snowflake' },
  73: { description: 'Moderate snow', icon: 'snowflake' },
  75: { description: 'Heavy snow', icon: 'snowflake' },
  77: { description: 'Snow grains', icon: 'snowflake' },
  80: { description: 'Slight rain showers', icon: 'cloud-sun-rain' },
  81: { description: 'Moderate rain showers', icon: 'cloud-showers-heavy' },
  82: { description: 'Violent rain showers', icon: 'cloud-showers-heavy' },
  85: { description: 'Slight snow showers', icon: 'snowflake' },
  86: { description: 'Heavy snow showers', icon: 'snowflake' },
  95: { description: 'Thunderstorm', icon: 'bolt' },
  96: { description: 'Thunderstorm with slight hail', icon: 'bolt' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'bolt' },
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32)
}

// Convert mm to inches
function mmToInches(mm: number): number {
  return Math.round((mm / 25.4) * 100) / 100
}

// Convert m/s to mph
function msToMph(ms: number): number {
  return Math.round(ms * 2.237)
}

// Convert wind direction degrees to compass direction
function degreesToCompass(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

// Format time from ISO string
function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  })
}

// Get day of week
function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/New_York' })
}

// Determine precipitation type from weather code
function getPrecipitationType(code: number): 'none' | 'rain' | 'snow' | 'mixed' {
  if (code >= 71 && code <= 77) return 'snow'
  if (code >= 85 && code <= 86) return 'snow'
  if (code >= 66 && code <= 67) return 'mixed'
  if (code >= 51 && code <= 65) return 'rain'
  if (code >= 80 && code <= 82) return 'rain'
  if (code >= 95 && code <= 99) return 'rain'
  return 'none'
}

// Check if a date matches the wedding date
function isWeddingDay(dateString: string): boolean {
  return dateString === WEDDING_DATE_STR
}

export async function getForecastStatus(): Promise<ForecastStatus> {
  const now = new Date()
  const timeDiff = WEDDING_DATE.getTime() - now.getTime()
  const daysUntilWedding = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  
  // Open-Meteo provides 16-day forecasts
  const forecastDays = 16
  const daysUntilForecast = Math.max(0, daysUntilWedding - forecastDays)
  const available = daysUntilWedding <= forecastDays

  let message: string
  if (daysUntilWedding <= 0) {
    message = "It's wedding time!"
  } else if (available) {
    message = `Wedding day forecast is available! ${daysUntilWedding} days to go.`
  } else if (daysUntilForecast <= 7) {
    message = `Forecast available in ${daysUntilForecast} days. Check back soon!`
  } else {
    message = `${daysUntilWedding} days until the wedding. Forecast available when we're ${forecastDays} days out.`
  }

  return {
    available,
    daysUntilWedding,
    daysUntilForecast,
    message,
  }
}

export async function getWeatherForecast(): Promise<WeatherForecast> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(WEDDING_COORDS.latitude))
  url.searchParams.set('longitude', String(WEDDING_COORDS.longitude))
  url.searchParams.set('daily', [
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'precipitation_sum',
    'precipitation_probability_max',
    'windspeed_10m_max',
    'windgusts_10m_max',
    'winddirection_10m_dominant',
    'relative_humidity_2m_max',
    'uv_index_max',
    'sunrise',
    'sunset',
    'weathercode',
  ].join(','))
  url.searchParams.set('temperature_unit', 'celsius')
  url.searchParams.set('windspeed_unit', 'ms')
  url.searchParams.set('precipitation_unit', 'mm')
  url.searchParams.set('timezone', 'America/New_York')
  url.searchParams.set('forecast_days', '16')

  console.log(`[weather] Fetching forecast from Open-Meteo`)

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 * 60 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch forecast: ${response.status}`)
  }

  const data: OpenMeteoForecastResponse = await response.json()

  const days: ForecastDay[] = data.daily.time.map((date, i) => {
    const weatherInfo = weatherCodeMap[data.daily.weathercode[i]] || { description: 'Unknown', icon: 'question' }
    
    return {
      date,
      dayOfWeek: getDayOfWeek(date),
      isWeddingDay: isWeddingDay(date),
      daytime: {
        tempHigh: celsiusToFahrenheit(data.daily.temperature_2m_max[i]),
        tempLow: celsiusToFahrenheit(data.daily.temperature_2m_min[i]),
        feelsLikeHigh: celsiusToFahrenheit(data.daily.apparent_temperature_max[i]),
        feelsLikeLow: celsiusToFahrenheit(data.daily.apparent_temperature_min[i]),
      },
      precipitation: {
        probability: data.daily.precipitation_probability_max[i] || 0,
        total: mmToInches(data.daily.precipitation_sum[i] || 0),
        type: getPrecipitationType(data.daily.weathercode[i]),
      },
      wind: {
        speed: msToMph(data.daily.windspeed_10m_max[i]),
        gusts: msToMph(data.daily.windgusts_10m_max[i]),
        direction: degreesToCompass(data.daily.winddirection_10m_dominant[i]),
      },
      humidity: data.daily.relative_humidity_2m_max[i],
      uvIndex: Math.round(data.daily.uv_index_max[i]),
      sunrise: formatTime(data.daily.sunrise[i]),
      sunset: formatTime(data.daily.sunset[i]),
      conditions: weatherInfo.description,
      icon: weatherInfo.icon,
    }
  })

  const weddingDay = days.find(d => d.isWeddingDay) || null

  return {
    generatedAt: new Date().toISOString(),
    location: 'Swanton, Ohio',
    days,
    weddingDay,
  }
}
