import type { Metadata } from 'next'
import { Archivo, Archivo_Black, IBM_Plex_Mono, Roboto } from 'next/font/google'
import '../styles/globals.css'
import NavBar from '@/components/NavBar'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { FEATURES } from '@/features'
import ThemeRegistry from '@/styles/ThemeRegistry'
import localFont from 'next/font/local'
import { Box } from '@mui/material'

const monotype = localFont({
  src: '../fonts/Talina.otf',
  variable: '--font-monotype',
})
const body1 = IBM_Plex_Mono({
  variable: '--font-body1',
  weight: '400',
})
const secondary = localFont({
  src: '../fonts/elephant.otf',
  variable: '--font-secondary',
})

const archivoBlack = Archivo_Black({
  variable: '--font-archivo-black',
  weight: '400',
})

const caption = Roboto({
  variable: '--font-caption',
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
      className={`${secondary.variable} ${archivoBlack.variable} ${monotype.variable} ${body1.variable} ${caption.variable} h-full antialiased  `}
    >
      <body className="min-h-full flex flex-col bg-[#fff2e5]">
        <AppRouterCacheProvider>
          <ThemeRegistry>
            {FEATURES.navbar && <NavBar />}
            <main className=" min-h-full max-w-screen-md lg:ml-[15%] px-4 mt-[64px]">
              <Box className="pt-6">{children}</Box>
            </main>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
