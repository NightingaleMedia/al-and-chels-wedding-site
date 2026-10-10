// Swanton, Ohio coordinates
export const SWANTON_COORDS = {
  latitude: 41.5889,
  longitude: -83.8916,
} as const

// Wedding date range (May 27-31)
export const WEDDING_DATE_RANGE = {
  month: 5,
  startDay: 27,
  endDay: 31,
  targetDay: 29, // The actual wedding day
} as const

// Historical weather data for a single year
export interface HistoricalYearData {
  year: number
  date: string // ISO date string for May 29 of that year
  daytime: {
    tempHigh: number // Fahrenheit
    tempLow: number // Fahrenheit
    avgTemp: number // Fahrenheit
  }
  nighttime: {
    tempHigh: number // Fahrenheit
    tempLow: number // Fahrenheit
  }
  precipitation: {
    total: number // inches
    probability: number // percentage (0-100)
    hours: number // hours with precipitation
  }
  sunset: string // Time string (e.g., "8:45 PM")
  conditions: string // General weather description
}

// Aggregated historical statistics
export interface HistoricalWeatherStats {
  years: HistoricalYearData[]
  averages: {
    daytimeTempHigh: number
    daytimeTempLow: number
    nighttimeTempHigh: number
    nighttimeTempLow: number
    precipitationProbability: number
    avgSunset: string
  }
  ranges: {
    tempHigh: { min: number; max: number }
    tempLow: { min: number; max: number }
    precipitation: { min: number; max: number }
  }
}

// Forecast data for a single day
export interface ForecastDay {
  date: string // ISO date string
  dayOfWeek: string
  isWeddingDay: boolean
  daytime: {
    tempHigh: number
    tempLow: number
    feelsLikeHigh: number
    feelsLikeLow: number
  }
  precipitation: {
    probability: number // percentage
    total: number // inches
    type: 'none' | 'rain' | 'snow' | 'mixed'
  }
  wind: {
    speed: number // mph
    gusts: number // mph
    direction: string // e.g., "NW"
  }
  humidity: number // percentage
  uvIndex: number
  sunrise: string
  sunset: string
  conditions: string
  icon: string // weather icon code
}

// Full forecast response
export interface WeatherForecast {
  generatedAt: string // ISO timestamp
  location: string
  days: ForecastDay[]
  weddingDay: ForecastDay | null // null if wedding day not in forecast range
}

// Forecast availability status
export interface ForecastStatus {
  available: boolean
  daysUntilWedding: number
  daysUntilForecast: number // 0 if available, positive if not yet available
  message: string
}

// Open-Meteo API response types (for internal use)
export interface OpenMeteoHistoricalResponse {
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_sum: number[]
    precipitation_hours: number[]
    sunset: string[]
    weathercode: number[]
  }
}

export interface OpenMeteoForecastResponse {
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    apparent_temperature_max: number[]
    apparent_temperature_min: number[]
    precipitation_sum: number[]
    precipitation_probability_max: number[]
    windspeed_10m_max: number[]
    windgusts_10m_max: number[]
    winddirection_10m_dominant: number[]
    relative_humidity_2m_max: number[]
    uv_index_max: number[]
    sunrise: string[]
    sunset: string[]
    weathercode: number[]
  }
}
