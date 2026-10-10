'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card, Typography } from '@mui/material'
import { HistoricalYearData } from '@/serverActions/weather/weather.schemas'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface HistoricalPrecipChartProps {
  years: HistoricalYearData[]
}

export default function HistoricalPrecipChart({ years }: HistoricalPrecipChartProps) {
  const labels = years.map((y) => y.year.toString())

  const data = {
    labels,
    datasets: [
      {
        label: 'Precipitation (inches)',
        data: years.map((y) => y.precipitation.total),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number | null } }) => {
            return `${context.parsed.y ?? 0}" precipitation`
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Inches',
        },
        beginAtZero: true,
      },
    },
  }

  // Calculate years with rain
  const yearsWithRain = years.filter((y) => y.precipitation.total > 0).length
  const rainPercentage = Math.round((yearsWithRain / years.length) * 100)

  return (
    <Card className="p-4">
      <Typography variant="h6" className="mb-2 text-center">
        Precipitation History (May 29)
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4 text-center">
        Rain occurred {yearsWithRain} of {years.length} years ({rainPercentage}%)
      </Typography>
      <div className="h-48 md:h-64">
        <Bar data={data} options={options} />
      </div>
    </Card>
  )
}
