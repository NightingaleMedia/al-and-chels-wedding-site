import { ScheduleDayBlockProps } from '@/components/ScheduleDayBlock'

export const scheduleData: ScheduleDayBlockProps[] = [
  {
    emoji: '🎸',
    dayTitle: 'Friday',
    title: 'The Welcome Event',
    location: {
      name: "Al's Parents Home",
      url: 'https://maps.app.goo.gl/R7PhYM9DbYUN9sRs9',
    },
    blurb:
      "Kick off the wedding festivities with a casual welcome event at Al's parents home.",
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
    blurb:
      'Celebrate the big day with ceremony, cocktail hour, dinner, and dancing at the wedding venue.',
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
  {
    emoji: '🏡',
    dayTitle: 'Sunday',
    title: 'Open House Hangs',
    location: {
      name: 'Chez Al & Chels, Detroit',
      url: 'https://share.google/PVvB7pvBH61TIHSrB',
    },
    blurb:
      "Relax and unwind with friends and family at Al & Chelsea's home in Detroit. Open invite for all!",
    colorScheme: 'green',
    timeSlots: [
      {
        title: 'Open House, Open Decks, Open Grill',
        time: '3:00 PM - Whenever',
      },
    ],
  },
  {
    emoji: '🪩',
    dayTitle: 'Monday',
    title: 'Movement Festival Party',
    location: {
      name: 'Get Tickets',
      url: 'https://movementfestival.com/',
    },
    blurb:
      "If you're not tired yet, join us for our annual pilgrimage to dance and be merry.",
    colorScheme: 'purple',
    timeSlots: [
      {
        title: 'Join Us For our Annual Pilgrimage',
        time: '6:00 PM - Late',
      },
    ],
  },
]
