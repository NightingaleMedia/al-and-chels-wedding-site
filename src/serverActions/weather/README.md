# Weather API Integration

## Current Setup (Free)

Using **Open-Meteo** for both historical and forecast data:
- No API key required
- Historical data: 10 years of May 29 weather
- Forecast: 16-day outlook
- Cached server-side (historical: 1 week, forecast: 1 hour)

## Upgrading to Paid API

When you're ~1 month out and want more accurate forecasts, here are the recommended options:

### Option 1: Tomorrow.io (Recommended)
**Cost**: Free tier (500 calls/day), or $25/mo for premium
**Forecast range**: 14 days (free), 30 days (premium)

1. Sign up at https://www.tomorrow.io/
2. Get your API key
3. Add to `.env.local`:
   ```
   TOMORROW_IO_API_KEY=your_key_here
   ```
4. Update `getWeatherForecast.ts`:

```typescript
// Replace Open-Meteo call with:
const url = `https://api.tomorrow.io/v4/weather/forecast`
const params = new URLSearchParams({
  location: `${SWANTON_COORDS.latitude},${SWANTON_COORDS.longitude}`,
  apikey: process.env.TOMORROW_IO_API_KEY!,
  units: 'imperial',
  timesteps: 'daily',
})
```

### Option 2: AccuWeather
**Cost**: ~$25/mo
**Forecast range**: 45 days (most accurate long-range)

1. Sign up at https://developer.accuweather.com/
2. Get your API key
3. Add to `.env.local`:
   ```
   ACCUWEATHER_API_KEY=your_key_here
   ACCUWEATHER_LOCATION_KEY=2240438  # Swanton, OH
   ```

### Option 3: WeatherAPI.com
**Cost**: Free tier (1M calls/mo), $9/mo for premium
**Forecast range**: 14 days

1. Sign up at https://www.weatherapi.com/
2. Very similar API structure to Open-Meteo

## Data Schema

Both hooks return typed data - see `weather.schemas.ts` for interfaces:
- `HistoricalWeatherStats` - 10 years of historical data
- `WeatherForecast` - current forecast with wedding day highlight
- `ForecastStatus` - countdown and availability info

## Testing

```bash
# Run the dev server
npm run dev

# Visit
http://localhost:3000/the-wedding/weather-watch
```
