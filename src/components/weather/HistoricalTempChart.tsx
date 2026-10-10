'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Card, Typography } from '@mui/material'
import { HistoricalYearData } from '@/serverActions/weather/weather.schemas'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface HistoricalTempChartProps {
  years: HistoricalYearData[]
}

export default function HistoricalTempChart({ years }: HistoricalTempChartProps) {
  const labels = years.map((y) => y.year.toString())

  const data = {
    labels,
    datasets: [
      {
        label: 'Daytime High',
        data: years.map((y) => y.daytime.tempHigh),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Daytime Low',
        data: years.map((y) => y.daytime.tempLow),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Nighttime High',
        data: years.map((y) => y.nighttime.tempHigh),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Nighttime Low',
        data: years.map((y) => y.nighttime.tempLow),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: false,
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { dataset: { label?: string }; parsed: { y: number | null } }) => {
            return `${context.dataset.label}: ${context.parsed.y ?? 0}°F`
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°F)',
        },
        min: 30,
        max: 100,
      },
    },
  }

  return (
    <Card className="p-4">
      <Typography variant="h6" className="mb-4 text-center">
        Temperature Trends (May 29)
      </Typography>
      <div className="h-64 md:h-80">
        <Line data={data} options={options} />
      </div>
    </Card>
  )
}
