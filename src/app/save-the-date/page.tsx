import { Typography } from '@mui/material'
import Image from 'next/image'
import type { Metadata } from 'next'
import CalendarButton from '@/components/CalendarButton'

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

const WIDTH = 360

export default function SaveTheDatePage() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center pt-16">
      <div
        className={`grid lg:grid-cols-[calc(${WIDTH}px_*_0.16)_calc(${WIDTH}px_*_0.84)] relative grid-cols-[9fr_50fr] w-[360px]`}
      >
        <div className="relative h-full flex items-center justify-center overflow-hidden border border-black">
          <div className="rotate-[-90deg] whitespace-nowrap">
            <Typography
              variant="h1"
              style={{ color: '#4e2d11' }}
              className="!text-[3.1rem] lg:!text-[3.45rem] font-monotype"
            >
              Save The Date
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="">
            <Image
              src="/img/save-the-date-1.png"
              alt="Save The Date"
              width={WIDTH * 0.841}
              height={400}
              style={{
                opacity: '0.85',
                // maxWidth: '68vw',
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
                        Al & Chels
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <CalendarButton />
      </div>
    </div>
  )
}
