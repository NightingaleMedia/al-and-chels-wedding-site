import type { ReactNode } from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

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
    <Box sx={{ maxWidth: maxWidth }}>
      {title && (
        <div className="relative h-full flex items-center justify-center overflow-hidden">
          <div className="rotate-[-90deg] whitespace-nowrap">{title}</div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full">
        <div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={maxWidth}
            height={360}
            style={{
              opacity: '0.85',
              maxWidth: '68vw',
              border: '1px solid #000',
            }}
          />
          <div className="font-monotype">
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
          </div>
        </div>
      </div>
    </Box>
  )
}
