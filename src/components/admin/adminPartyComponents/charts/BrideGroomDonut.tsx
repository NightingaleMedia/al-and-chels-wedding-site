'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Typography } from '@mui/material'
import { ByParty } from '@/serverActions/rsvp/weddingBackend.schemas'

ChartJS.register(ArcElement, Tooltip, Legend)

interface BrideGroomDonutProps {
  parties: ByParty[]
}

export default function BrideGroomDonut({ parties }: BrideGroomDonutProps) {
  const brideCount = parties.reduce(
    (acc, p) => acc + p.guests.filter((g) => g.brideGroom === 'bride').length,
    0,
  )
  const groomCount = parties.reduce(
    (acc, p) => acc + p.guests.filter((g) => g.brideGroom === 'groom').length,
    0,
  )

  const data = {
    labels: [`Bride (${brideCount})`, `Groom (${groomCount})`],
    datasets: [
      {
        data: [brideCount, groomCount],
        backgroundColor: ['#ff6a4d', '#3b2701'],
        borderColor: ['#db2777', '#2563eb'],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Typography variant="subtitle2">Bride vs Groom</Typography>
      <div className="h-48 w-48">
        <Doughnut data={data} options={options} />
      </div>
      <Typography variant="caption" color="text.secondary">
        {brideCount + groomCount} total guests
      </Typography>
    </div>
  )
}
