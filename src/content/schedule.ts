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
      "Kick off the festivities with a special welcome evening at Al's parents home.",
    timeSlots: [
      {
        title: 'Welcome Event',
        time: '5:00 PM - 8:00 PM',
        note: 'Due to limited capacity at the house, this event is invite only, we will reach out to you directly.',
      },
      {
        title: 'Downtown Party',
        time: '9:00 PM - 12:00 PM',
        note: 'Afterwards in Downtown Toledo, location to be announced, open invite to all!',
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
        title: 'Guest Arrival',
        time: '3:00 PM - 4:00 PM',
        note: 'A bus will take guests from the hotel to the venue',
      },
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
        time: '8:00 PM - 10:00 PM',
      },
      {
        title: 'General Debauchery',
        time: '10:00 PM - Late',
        note: 'The bus runs late for those that would like to not drive themselves.',
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
      "Relax and unwind with friends and family at Al & Chelsea's home in Detroit.",
    colorScheme: 'green',
    timeSlots: [
      {
        title: 'Open House',
        time: '3:00 PM - Whenever',
        note: ' Open invite for all! BYOB',
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
