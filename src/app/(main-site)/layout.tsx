import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'
import { FEATURES } from '@/features'
import { Box } from '@mui/material'
import { Footer } from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: "Chels & Al's Wedding",
  description: 'Wedding website',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {FEATURES.navbar && <NavBar />}
      <main className="max-w-screen-md pt-[var(--header-height)] flex-1">
        <Box className="min-h-[var(--content-height)]">{children}</Box>
      </main>
      <Footer />
    </>
  )
}
