import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'
import { Footer } from '@/components/footer/Footer'
import { Box } from '@mui/material'

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
      <NavBar
        linksToUse={[
          {
            label: 'About Us',
            href: '/about-us',
            children: [
              { label: '📖 Our Story', href: '/about-us' },
              {
                label: '📝 Add To The Story',
                href: '/about-us/add-your-story',
              },
              {
                label: '📸 Add Your Pictures',
                href: '/about-us/add-your-pictures',
              },
            ],
          },
        ]}
      />

      <main className="max-w-screen-md pt-[var(--header-height)] flex-1">
        <Box className="min-h-[var(--content-height)] p-4">{children}</Box>
      </main>
      <Footer />
    </>
  )
}
