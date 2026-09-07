import type { Metadata } from 'next'
import { Archivo_Black, IBM_Plex_Mono, Roboto } from 'next/font/google'
import '../styles/globals.css'
import NavBar from '@/components/NavBar'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { FEATURES } from '@/features'
import ThemeRegistry from '@/styles/ThemeRegistry'
import localFont from 'next/font/local'
import { Box } from '@mui/material'

// Display font - Elegant script for hero/titles
const monotype = localFont({
  src: '../fonts/Talina.otf',
  variable: '--font-monotype',
  display: 'swap',
})

// Heading font - Bold, uppercase style
const archivoBlack = Archivo_Black({
  variable: '--font-archivo-black',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// Body font - Clean, readable monospace
const body1 = IBM_Plex_Mono({
  variable: '--font-body1',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// Accent font - Decorative serif
const secondary = localFont({
  src: '../fonts/elephant.otf',
  variable: '--font-secondary',
  display: 'swap',
})

// Caption font - Clean sans-serif
const caption = Roboto({
  variable: '--font-caption',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
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
      className={`${monotype.variable} ${archivoBlack.variable} ${body1.variable} ${secondary.variable} ${caption.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <ThemeRegistry>
            {FEATURES.navbar && <NavBar />}
            <main className="min-h-full max-w-screen-md mt-[42px]">
              <Box className="pt-6">{children}</Box>
            </main>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
