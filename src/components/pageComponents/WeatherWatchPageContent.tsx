'use client'

import { Typography, Divider, Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import ForecastSection from '@/components/weather/ForecastSection'
import HistoricalSection from '@/components/weather/HistoricalSection'

export default function WeatherWatchPageContent() {
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
          component="div"
          sx={{ mt: 2, color: grey[500] }}
        >
          *Subject to change if the weather is bad
        </Typography>
      </div>

      <section className="mb-12">
        <ForecastSection />
      </section>

      <Divider className="my-8" />

      <section>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" className="mb-4 flex items-center gap-2">
            Historical Weather
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-6">
            Based on weather data from May 29th over the past decade
          </Typography>
        </Box>
        <HistoricalSection />
      </section>
    </div>
  )
}
