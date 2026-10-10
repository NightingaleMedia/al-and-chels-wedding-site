'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Typography } from '@mui/material'
import { ByParty } from '@/serverActions/rsvp/weddingBackend.schemas'

ChartJS.register(ArcElement, Tooltip)

interface ResponseRateGaugeProps {
  parties: ByParty[]
}

export default function ResponseRateGauge({ parties }: ResponseRateGaugeProps) {
  const allGuests = parties.flatMap((p) => p.guests)
  const totalGuests = allGuests.length
  const respondedGuests = allGuests.filter(
    (g) => g.rsvp !== 'Not Responded'
  ).length
  const responseRate = totalGuests > 0 ? (respondedGuests / totalGuests) * 100 : 0

  const data = {
    labels: ['Responded', 'Awaiting'],
    datasets: [
      {
        data: [respondedGuests, totalGuests - respondedGuests],
        backgroundColor: ['#22c55e', '#e5e7eb'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Typography variant="subtitle2">Response Rate</Typography>
      <div className="relative h-32 w-48">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <Typography variant="h4" className="font-bold">
            {Math.round(responseRate)}%
          </Typography>
        </div>
      </div>
      <Typography variant="caption" color="text.secondary">
        {respondedGuests} of {totalGuests} responded
      </Typography>
    </div>
  )
}
