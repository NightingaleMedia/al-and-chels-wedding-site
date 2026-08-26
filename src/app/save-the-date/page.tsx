import { Typography } from '@mui/material'
import type { Metadata } from 'next'
import OutlineCard from '@/components/OutlineCard'

export const metadata: Metadata = {
  title: "Al and Chelsea's Wedding",
  description: 'Save the Date, May 29 2027',
  openGraph: {
    title: "Al and Chelsea's Wedding",
    description: 'Save the Date, May 29 2027',
    type: 'website',
    siteName: "Al and Chelsea's Wedding",
    url: 'https://chels-and-al.com/save-the-date',
  },
  twitter: {
    card: 'summary',
    title: "Al and Chelsea's Wedding",
    description: 'Save the Date, May 29 2027',
  },
}

export default function SaveTheDatePage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#fff2e5]">
      <OutlineCard
        title={
          <Typography
            variant="h1"
            style={{ color: '#4e2d11' }}
            className="!text-[3.1rem] lg:!text-[3.45rem] font-monotype"
          >
            Save The Date
          </Typography>
        }
        imageSrc="/img/save-the-date-1.png"
        imageAlt="Save The Date"
        tableTitle="Al & Chels"
        tableRows={[
          <>
            <td>
              <div className="flex flex-col items-center justify-center">
                <Typography variant="caption">May 29, 2027</Typography>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center justify-center">
                <Typography variant="caption">Swanton, OH</Typography>
              </div>
            </td>
          </>,
        ]}
      />
    </div>
  )
}
