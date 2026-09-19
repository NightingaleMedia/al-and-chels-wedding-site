export interface NavLinkData {
  href: string
  label: string
  emoji: string
}

export const homePageNavLinks: NavLinkData[] = [
  { href: '/rsvp', label: 'RSVP', emoji: '✉️' },
  { href: '/about-us', label: 'Our Story', emoji: '💕' },
  { href: '/the-wedding/schedule', label: 'The Wedding/Schedule', emoji: '💒' },
]
