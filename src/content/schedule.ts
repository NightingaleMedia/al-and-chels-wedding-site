import { ScheduleDayBlockProps } from '@/components/ScheduleDayBlock'

export const scheduleData: ScheduleDayBlockProps[] = [
  {
    dayTitle: 'Friday',
    title: 'The Welcome Event',
    location: {
      name: "Al's Parents Home",
      url: 'https://maps.app.goo.gl/R7PhYM9DbYUN9sRs9',
    },
    timeSlots: [
      {
        title: 'Welcome Event',
        time: '5:00 PM - 8:00 PM',
      },
      {
        title: 'Downtown Party',
        time: '9:00 PM - 12:00 PM',
      },
    ],
    colorScheme: 'blue',
  },
  {
    emoji: '💐',
    dayTitle: 'Saturday',
    title: 'Wedding Day',
    location: {
      name: 'Wedding Venue',
      url: 'https://maps.app.goo.gl/BS9LbrDfN53yx25Z9', // Replace with actual Google Maps link or directions
    },
    timeSlots: [
      {
        title: 'Ceremony',
        time: '4:00 PM - 4:40 PM',
      },
      {
        title: 'Cocktail Hour',
        time: '4:40 PM - 6:00 PM',
      },
      {
        title: 'Dinner in the Forest',
        time: '6:00 PM - 8:00 PM',
      },
      {
        title: 'Dancing & Reception',
        time: '8:00 PM - 11:00 PM',
      },
    ],
    colorScheme: 'pink',
  },
]
