import type { Metadata } from 'next'

const title = 'RSVP To Our Wedding'
const description = "RSVP to Al and Chelsea's wedding"

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: "Al and Chelsea's Wedding",
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

export default function PartyRSVPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
