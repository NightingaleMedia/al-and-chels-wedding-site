import { NearMe } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Link from 'next/link'

export interface TimeSlot {
  title: string
  time: string
  note?: string
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
  blurb: string
}

export function ScheduleDayBlock({
  emoji,
  dayTitle,
  title,
  location,
  timeSlots,
  colorScheme = 'pink',
  blurb,
}: ScheduleDayBlockProps) {
  return (
    <Box component={'section'} sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
      {/* Day Header - Mobile First */}
      <div className={`bg-card  p-4 border-1  mb-4`}>
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
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.75rem',
            textAlign: 'center',
            my: 2,
            maxWidth: '400px',
            mx: 'auto',
          }}
        >
          {blurb}
        </Typography>
      </div>

      {/* Time Slots - Mobile Optimized */}
      <div className="space-y-3">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="p-4 border mx-auto border-1 flex flex-wrap justify-between bg-card"
          >
            <Typography variant="h6" sx={{ fontSize: '0.75rem' }}>
              {slot.title}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '0.75rem' }}>
              {slot.time}
            </Typography>
            {slot.note && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.65rem',
                  color: 'gray',
                  flexGrow: 1,
                  flexBasis: '100%',
                  mt: 2,
                }}
              >
                {slot.note}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </Box>
  )
}
