import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'
import { Footer } from '@/components/footer/Footer'
import { Box } from '@mui/material'
import AdminGuard from '@/components/admin/AdminGuard'
import { adminLinks } from '@/content/navLinks'

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
      <NavBar linksToUse={adminLinks} />

      <main className="max-w-screen-md pt-[var(--header-height)] flex-1">
        <Box className="min-h-[var(--content-height)] p-4">
          <AdminGuard>{children}</AdminGuard>
        </Box>
      </main>
      <Footer />
    </>
  )
}
