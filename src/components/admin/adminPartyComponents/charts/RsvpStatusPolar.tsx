'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Typography } from '@mui/material'
import { ByParty } from '@/serverActions/rsvp/weddingBackend.schemas'

ChartJS.register(ArcElement, Tooltip, Legend)

interface RsvpStatusPolarProps {
  parties: ByParty[]
}

export default function RsvpStatusPolar({ parties }: RsvpStatusPolarProps) {
  const allGuests = parties.flatMap((p) => p.guests)

  const attending = allGuests.filter((g) => g.rsvp === 'Attending').length
  const notAttending = allGuests.filter(
    (g) => g.rsvp === 'Not Attending',
  ).length
  const notResponded = allGuests.filter(
    (g) => g.rsvp === 'Not Responded',
  ).length

  const data = {
    labels: [
      `Attending 🎉 (${attending})`,
      `Declined 😢 (${notAttending})`,
      `Waiting 🤞 (${notResponded})`,
    ],
    datasets: [
      {
        data: [attending, notAttending, notResponded],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(234, 179, 8, 0.7)',
        ],
        borderColor: ['#16a34a', '#dc2626', '#ca8a04'],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { usePointStyle: true },
      },
    },
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Typography variant="subtitle2">RSVP Breakdown</Typography>
      <div className="h-56 w-56">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
