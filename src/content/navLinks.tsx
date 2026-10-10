import CalendarButton from '@/components/CalendarButton'

export interface NavLinkData {
  href: string
  label: string
  emoji: string
  children?: React.ReactNode
}

export type NavLink = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const homePageNavLinks: NavLinkData[] = [
  {
    href: '#',
    label: 'Save The Date',
    emoji: '🔔',
    children: (
      <CalendarButton
        buttonProps={{
          variant: 'text',
          startIcon: null,
          sx: { padding: 0, textTransform: 'none' },
        }}
        labelOverride="Save The Date"
      />
    ),
  },
  { href: '/rsvp', label: 'RSVP', emoji: '✉️' },
  { href: '/about-us', label: 'Our Story', emoji: '💕' },
  { href: '/the-wedding/schedule', label: 'The Wedding/Schedule', emoji: '💒' },
  { href: '/send-me-updates', label: 'Send Me Wedding Updates', emoji: '💬' },
]

export const menuNavLinks: NavLink[] = [
  {
    label: 'About Us',
    href: '/about-us',
    children: [
      { label: '📖 Our Story', href: '/about-us' },
      { label: '📝 Add To The Story', href: '/about-us/add-your-story' },
      { label: '📸 Add Your Pictures', href: '/about-us/add-your-pictures' },
      { label: '🎁 Registry', href: '/registry' },
    ],
  },
  {
    label: 'Travel',
    href: '/travel',
    children: [
      { label: '🗺️ Getting There', href: '/travel/getting-there' },
      { label: '🏨 Accommodations', href: '/travel/accommodations' },
      { label: '🧳 Day of Travel', href: '/travel/day-of-travel' },
    ],
  },
  {
    label: 'The Wedding',
    href: '/the-wedding',
    children: [
      { label: '🗓️ Schedule', href: '/the-wedding/schedule' },
      { label: '📍 Location', href: '/the-wedding/location' },
      { label: '💌 RSVP', href: '/rsvp' },
      { label: '💬 Send Me Updates', href: '/send-me-updates' },
      { label: '🌦️ Weather Watch', href: '/the-wedding/weather-watch' },
    ],
  },
  { label: 'FAQs', href: '/faqs' },
]
