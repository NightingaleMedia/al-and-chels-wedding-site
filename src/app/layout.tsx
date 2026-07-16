import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../styles/globals.css'
import NavBar from '@/components/NavBar'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { FEATURES } from '@/features'
import ThemeRegistry from '@/styles/ThemeRegistry'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Our Wedding',
  description: 'Wedding website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <ThemeRegistry>
            {FEATURES.navbar && <NavBar />}
            <main className="flex-1 min-h-full">{children}</main>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
