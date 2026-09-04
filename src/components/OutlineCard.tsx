import type { ReactNode } from 'react'
import Image from 'next/image'
import { Box, Card, Typography } from '@mui/material'

type OutlineCardProps = {
  title?: ReactNode
  imageSrc: string
  imageAlt: string
  tableTitle: string
  tableRows: ReactNode[]
  maxWidth: number
}

export default function OutlineCard({
  title,
  imageSrc,
  imageAlt,
  tableTitle,
  tableRows,
  maxWidth,
}: OutlineCardProps) {
  return (
    <Box>
      {title && (
        <div className="relative h-full flex items-center justify-center overflow-hidden">
          <div className="rotate-[-90deg] whitespace-nowrap">{title}</div>
        </div>
      )}
      <div className="flex flex-col w-full">
        <div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={maxWidth}
            height={360}
            style={{
              opacity: '0.85',
              border: '1px solid #000',
            }}
          />
          <Box className="font-monotype" sx={{ maxWidth }}>
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th colSpan={2}>
                    <Typography
                      variant="h5"
                      className="text-center font-monotype"
                    >
                      {tableTitle}
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i}>{row}</tr>
                ))}
              </tbody>
            </table>
          </Box>
        </div>
      </div>
    </Box>
  )
}
