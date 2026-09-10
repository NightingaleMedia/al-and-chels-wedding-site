import { Typography } from '@mui/material'
import Link from 'next/link'

export interface TimeSlot {
  title: string
  time: string
}

export interface ScheduleDayBlockProps {
  emoji: string
  dayTitle: string
  title: string
  location: {
    name: string
    url: string
  }
  timeSlots: TimeSlot[]
  colorScheme?: 'pink' | 'blue' | 'purple' | 'green'
}

const colorSchemes = {
  pink: {
    gradient: 'from-pink-50 to-rose-50',
    border: 'border-pink-200',
    textTitle: 'text-pink-900',
    textSubtitle: 'text-pink-700',
    linkText: 'text-pink-600 hover:text-pink-800',
  },
  blue: {
    gradient: 'from-blue-50 to-indigo-50',
    border: 'border-blue-200',
    textTitle: 'text-blue-900',
    textSubtitle: 'text-blue-700',
    linkText: 'text-blue-600 hover:text-blue-800',
  },
  purple: {
    gradient: 'from-purple-50 to-violet-50',
    border: 'border-purple-200',
    textTitle: 'text-purple-900',
    textSubtitle: 'text-purple-700',
    linkText: 'text-purple-600 hover:text-purple-800',
  },
  green: {
    gradient: 'from-green-50 to-emerald-50',
    border: 'border-green-200',
    textTitle: 'text-green-900',
    textSubtitle: 'text-green-700',
    linkText: 'text-green-600 hover:text-green-800',
  },
}

export function ScheduleDayBlock({
  emoji,
  dayTitle,
  title,
  location,
  timeSlots,
  colorScheme = 'pink',
}: ScheduleDayBlockProps) {
  const colors = colorSchemes[colorScheme]

  return (
    <section className="mb-8">
      {/* Day Header - Mobile First */}
      <div
        className={`bg-gradient-to-r ${colors.gradient} p-4 rounded-lg border-2 ${colors.border} mb-4`}
      >
        {/* Day Title and Emoji */}
        <div className="text-center mb-3">
          <Typography variant="h1" className="text-4xl mb-2">
            {emoji}
          </Typography>
          <Typography
            variant="h2"
            className={`text-2xl font-bold ${colors.textTitle}`}
          >
            {dayTitle}
          </Typography>
          <Typography
            variant="body1"
            className={`${colors.textSubtitle} mt-1 font-medium`}
          >
            {title}
          </Typography>
        </div>

        {/* Location Link - Full Width Button on Mobile */}
        <Link
          href={location.url}
          className={`flex items-center justify-center gap-2 ${colors.linkText} font-semibold text-base py-2 px-4 bg-white/50 rounded-md hover:bg-white/80 transition-colors`}
        >
          <Typography variant="body1" className="text-xl">
            📍
          </Typography>
          <Typography variant="body1" className="font-semibold">
            {location.name}
          </Typography>
        </Link>
      </div>

      {/* Time Slots - Mobile Optimized */}
      <div className="space-y-3">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm flex justify-between"
          >
            <Typography variant="h6">{slot.title}</Typography>
            <Typography variant="body1" className="text-gray-600 font-medium">
              {slot.time}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  )
}
