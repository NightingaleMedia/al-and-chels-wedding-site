import type { Metadata } from 'next'
import { Archivo_Black, IBM_Plex_Mono, Roboto } from 'next/font/google'
import '../styles/globals.css'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'
import localFont from 'next/font/local'
import ThemeRegistry from '@/styles/ThemeRegistry'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import ProgressBarProvider from '@/context/progressBar/ProgressBar'

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
  title: "Chels & Al's Wedding",
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
      className={`${monotype.variable} ${archivoBlack.variable} ${body1.variable} ${secondary.variable} ${caption.variable}`}
    >
      <AppRouterCacheProvider>
        <ThemeRegistry>
          <body className="min-h-full">
            <ProgressBarProvider>{children}</ProgressBarProvider>
          </body>
        </ThemeRegistry>
      </AppRouterCacheProvider>
    </html>
  )
}
