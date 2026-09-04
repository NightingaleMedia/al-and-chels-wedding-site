import OutlineCard from '@/components/OutlineCard'
import { Box, Button, Typography } from '@mui/material'

export default function AccomodationsPage() {
  return (
    <Box className="max-w-[900px] px-4 pt-10 mx-auto">
      <Typography variant="h1">Accommodations</Typography>
      <Typography variant="body1">
        We've reserved a block of rooms at two hotels located in downtown
        Toledo! Since our venue is a short drive away, we've arranged
        complimentary charter buses that'll drive you from downtown to the
        property.
        <br />
        <br />
        We highly recommend booking at the two options below. But just be sure
        to book downtown to be close to the bride and groom and transportation!
      </Typography>
      <div className="mt-20">
        <Typography variant="h1">Hotel Options</Typography>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="min-w-[330px]">
            <OutlineCard
              maxWidth={330}
              imageSrc="https://cache.marriott.com/content/dam/marriott-renditions/TOLGP/tolgp-entrance-0055-sq.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=520px:*"
              imageAlt="Save The Date"
              tableTitle="Renaissance Toledo"
              tableRows={[
                <>
                  <td>
                    <div className="flex flex-col items-center justify-center">
                      <Typography variant="caption">
                        444 North Summit Street
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography variant="caption">15 Rooms</Typography>
                  </td>
                </>,
              ]}
            />
          </div>
          <div>
            <Typography variant="body1">
              Room Block Details
              <br />
              🗓 Dates: September 18–20, 2025
              <br />
              <br />
              🏨 Room Types & Rates:
              <br />
              King Room (1 Bed): $359/night <br /> 4 rooms available
              <br />
              Double Room (2 Full Beds): $369/night <br /> 6 rooms available
              <br />
              (Double rooms are most comfortable for one guest per bed)
              <br />
              <br />
            </Typography>
            <Typography variant="body2">
              Guests must stay Thursday night (Sept 18) to receive the
              discounted group rate. Rates are before taxes (14.75% city/state +
              $3.50 nightly occupancy tax).
            </Typography>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex flex-col lg:flex-row gap-8">
            <div>
              <Typography variant="body1">
                Room Block Details
                <br />
                🗓 Dates: September 18–20, 2025
                <br />
                <br />
                🏨 Room Types & Rates:
                <br />
                King Room (1 Bed): $359/night <br /> 4 rooms available
                <br />
                Double Room (2 Full Beds): $369/night <br /> 6 rooms available
                <br />
                (Double rooms are most comfortable for one guest per bed)
                <br />
                <br />
              </Typography>
              <Typography variant="body2">
                Guests must stay Thursday night (Sept 18) to receive the
                discounted group rate. Rates are before taxes (14.75% city/state
                + $3.50 nightly occupancy tax).
              </Typography>
            </div>
            <div className="min-w-[380px]">
              <OutlineCard
                maxWidth={440}
                imageSrc="https://media-api.xogrp.com/images/a44c3c47-c17c-4a8e-82cb-c833f3abd660~sc_675.375?quality=90"
                imageAlt="Save The Date"
                tableTitle="Hilton Garden"
                tableRows={[
                  <>
                    <td>
                      <Typography variant="caption">
                        101 N Summit St,
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="caption">30 Rooms</Typography>
                    </td>
                  </>,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ height: '200px' }}></Box>
    </Box>
  )
}
