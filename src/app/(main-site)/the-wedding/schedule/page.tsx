import { Typography } from '@mui/material'
import { ScheduleDayBlock } from '@/components/ScheduleDayBlock'
import { scheduleData } from '@/content/schedule'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function SchedulePage() {
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <Typography variant="h1" className="text-center" sx={{ mb: 4 }}>
        Wedding Schedule
      </Typography>

      {scheduleData.map((dayData, index) => (
        <ScheduleDayBlock key={index} {...dayData} />
      ))}
    </main>
  )
}
