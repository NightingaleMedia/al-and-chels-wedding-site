import { Box, Typography } from '@mui/material'
import { ScheduleDayBlock } from '@/components/ScheduleDayBlock'
import { scheduleData } from '@/content/schedule'

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
