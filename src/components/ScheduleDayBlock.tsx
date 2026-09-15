import { NavigateNextOutlined, NearMe } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Link from 'next/link'

export interface TimeSlot {
  title: string
  time: string
}

export interface ScheduleDayBlockProps {
  emoji?: string
  dayTitle: string
  title: string
  location: {
    name: string
    url: string
  }
  timeSlots: TimeSlot[]
  colorScheme?: 'pink' | 'blue' | 'purple' | 'green'
}

export function ScheduleDayBlock({
  emoji,
  dayTitle,
  title,
  location,
  timeSlots,
  colorScheme = 'pink',
}: ScheduleDayBlockProps) {
  return (
    <Box component={'section'} sx={{ mb: 20 }}>
      {/* Day Header - Mobile First */}
      <div className={`bg-gradient-to-r  p-4 border-1  mb-4`}>
        {/* Day Title and Emoji */}
        <div className="text-center mb-3">
          {emoji && (
            <Typography variant="h1" className="text-4xl mb-2">
              {emoji}
            </Typography>
          )}

          <Typography variant="h2" sx={{ mb: 1 }}>
            {dayTitle}
          </Typography>
          <Typography variant="body1" className={`font-medium`}>
            {title}
          </Typography>
        </div>

        {/* Location Link - Full Width Button on Mobile */}
        <Link
          href={location.url}
          className={`flex items-center justify-center gap-2`}
        >
          <Typography variant="body2" className="text-xl">
            📍
          </Typography>
          <Typography variant="body2" className="font-semibold">
            {location.name}
          </Typography>
          <IconButton>
            <NearMe />
          </IconButton>
        </Link>
      </div>

      {/* Time Slots - Mobile Optimized */}
      <div className="space-y-3">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="p-4 border  mx-auto border-1 flex justify-between"
          >
            <Typography variant="h6">{slot.title}</Typography>
            <Typography variant="body1">{slot.time}</Typography>
          </div>
        ))}
      </div>
    </Box>
  )
}
