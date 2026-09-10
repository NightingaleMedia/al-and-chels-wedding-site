import { Typography } from '@mui/material'
import { ScheduleDayBlock } from '@/components/ScheduleDayBlock'
import { scheduleData } from '@/content/schedule'

export default function SchedulePage() {
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <Typography
        variant="h1"
        className="text-center text-3xl sm:text-4xl font-bold mb-6"
      >
        Wedding Schedule
      </Typography>

      {scheduleData.map((dayData, index) => (
        <ScheduleDayBlock key={index} {...dayData} />
      ))}
    </main>
  )
}
