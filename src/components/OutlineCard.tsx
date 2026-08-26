import type { ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@mui/material'

type OutlineCardProps = {
  title?: ReactNode
  imageSrc: string
  imageAlt: string
  tableTitle: string
  tableRows: ReactNode[]
}

export default function OutlineCard({
  title,
  imageSrc,
  imageAlt,
  tableTitle,
  tableRows,
}: OutlineCardProps) {
  return (
    <div>
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
            width={300}
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
                      variant="body1"
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
    </div>
  )
}
