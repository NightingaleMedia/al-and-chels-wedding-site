import OutlineCard from '@/components/OutlineCard'
import { Typography } from '@mui/material'

export default function AccomodationsPage() {
  return (
    <>
      <Typography variant="h1">Accommodations</Typography>
      <Typography variant="body1">
        We've reserved a block of rooms at two hotels located in downtown
        Toledo! Since our venue is a short drive away, we've arranged
        complimentary charter buses that'll drive you from downtown to the
        property.
        <br />
        <br />
        We highly recommend booking at the two options below, but if those are
        full, there are several other great options in the area that will be
        close to the shuttle service. Just be sure to book downtown if you want
        to be close to the bride and groom and the transportation!
      </Typography>
      <div>
        <OutlineCard
          title={
            <Typography
              variant="h1"
              style={{ color: '#4e2d11' }}
              className="!text-[1rem] lg:!text-[2.45rem] font-monotype"
            >
              Rennaisance Toledo
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
    </>
  )
}
