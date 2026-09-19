'use client'
import { NavLinkList } from '@/components/homeNavLinks/NavLinkList'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false

const STATIC_WIDTH = 350

export default function Home() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      let oldCount = count
      if (oldCount >= 2) {
        oldCount = 0
      } else {
        oldCount = oldCount + 1
      }
      setCount(() => oldCount)
    }, 500)
    return () => clearInterval(timer)
  }, [count])

  const photos = [
    <Image
      key={`photo-0`}
      src="/img/home/photo1.png"
      alt="Home Photo 1"
      width={STATIC_WIDTH}
      height={(STATIC_WIDTH * 400) / 600}
    />,
    <Image
      key={`photo-1`}
      src="/img/home/photo2.png"
      alt="Home Photo 2"
      width={STATIC_WIDTH}
      height={(STATIC_WIDTH * 400) / 600}
    />,
    <Image
      key={`photo-2`}
      src="/img/home/photo3.png"
      alt="Home Photo 3"
      width={STATIC_WIDTH}
      height={(STATIC_WIDTH * 400) / 600}
    />,
  ]

  return (
    <main className="p-4">
      <Box className="flex flex-col gap-4 overflow-hidden">
        <Typography
          variant="h1"
          align="center"
          sx={{ fontSize: '8rem' }}
          className="hidden lg:block"
        >
          Getting Married
        </Typography>
        <Box className="max-h-[260px] mx-auto overflow-hidden">
          {photos[count]}
        </Box>
      </Box>
      <NavLinkList />
    </main>
  )
}
