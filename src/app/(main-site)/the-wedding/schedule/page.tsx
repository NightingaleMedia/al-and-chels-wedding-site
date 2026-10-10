import { Box, Typography } from '@mui/material'
import { ScheduleDayBlock } from '@/components/ScheduleDayBlock'
import { scheduleData } from '@/content/schedule'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false

export default function SchedulePage() {
  return (
    <Box className="pt-8 px-4">
      <Typography
        variant="special"
        component="h1"
        className="text-center"
        sx={{ mb: 4 }}
      >
        schedule
      </Typography>

      {scheduleData.map((dayData, index) => (
        <ScheduleDayBlock key={index} {...dayData} />
      ))}
    </Box>
  )
}
