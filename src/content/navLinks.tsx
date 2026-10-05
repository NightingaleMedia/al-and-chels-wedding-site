import CalendarButton from '@/components/CalendarButton'

export interface NavLinkData {
  href: string
  label: string
  emoji: string
  children?: React.ReactNode
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
