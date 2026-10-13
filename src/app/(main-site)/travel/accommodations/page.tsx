import OutlineCard from '@/components/OutlineCard'
import { pageEnabledOrComingSoon } from '@/utils/getComingSoonPage'
import { Box, Divider, Typography } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { Public, Web } from '@mui/icons-material'
import { NavLinkItem } from '@/components/homeNavLinks/NavLinkItem'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false

export default async function AccomodationsPage() {
  const comingSoon = pageEnabledOrComingSoon('/travel/accommodations')

  if (comingSoon) {
    return comingSoon
  }

  return (
    <Box className="max-w-[900px] px-4 pb-10 mx-auto">
      <Typography variant="h1" sx={{ py: 4 }}>
        Accommodations
      </Typography>
      <Typography variant="body2">
        We&apos;ve reserved a block of rooms at two hotels located in downtown
        Toledo! Since our venue is a medium drive away, we&apos;ve arranged
        complimentary charter buses that&apos;ll drive you from downtown to the
        property.
        <br />
        <br />
        We <strong>
          highly recommend booking at the two options below.
        </strong>{' '}
        But just be sure to book downtown to be close to the bride and groom and
        transportation!
        <br />
        <br />
        You are welcome to book your arrival for earlier in the week or later as
        you prefer!{' '}
        <strong>
          Our reservations for both hotels are for Friday May 28 and Saturday
          May 29, 2027.
        </strong>
      </Typography>
      <Divider sx={{ mt: 4 }} />
      <div className="mt-10">
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
                    <Typography variant="caption">
                      (Where we're staying 💕)
                    </Typography>
                  </td>
                </>,
              ]}
            />
          </div>
          <div>
            <Typography variant="body2">
              Thanks to Renaissance Toledo, we are able to offer special room
              block pricing for guests.
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>
                *All reservations must be received by Wednesday, April 28, 2027*
              </strong>
            </Typography>

            <br />
            <Typography variant="body2">
              Reservations will be made by individual attendees:
            </Typography>
            <br />
            <NavLinkItem
              href="https://app.marriott.com/resview2?id=1791486054758&key=GRP&app=resvlink"
              emoji="🧑🏾‍💻"
              label="reserve online"
            />
            <div style={{ height: '1rem' }}></div>
            <NavLinkItem
              href="tel:4192442444"
              emoji="📞"
              label="call to reserve (419) 244-2444"
            />

            <Typography variant="body2" sx={{ fontSize: '0.7rem', mt: 1 }}>
              *Mention the &quot;Sigman Wedding Room Block&quot; when making
              your reservation
            </Typography>
          </div>
        </div>
        <Divider sx={{ mt: 8 }} />
        <div className="mt-20">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="min-w-[360px]">
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
                  </>,
                ]}
              />
            </div>
            <div>
              <Typography variant="body2">
                The Hilton Garden Inn is just a block away from the Renaissance.
                They have graciously offered us a room block for our guests.
              </Typography>
              <br />
              <Typography variant="body2">
                <strong>
                  *All reservations must be received by Wednesday, April 28,
                  2027*
                </strong>
              </Typography>
              <br />

              <Typography variant="body2">
                Reservations will be made by individual attendees:
              </Typography>
              <br />
              <NavLinkItem
                href="https://www.hilton.com/en/attend-my-event/toldegi-92i-fc170209-b153-42c5-809e-d21a65250be5/"
                emoji="🧑🏾‍💻"
                label="reserve online"
              />

              <div style={{ height: '1rem' }}></div>
              <NavLinkItem
                href="tel:5679703051"
                emoji="📞"
                label="call to reserve (567) 970-3051"
              />
              <Typography variant="body2" sx={{ fontSize: '0.7rem', mt: 1 }}>
                Mention the &quot;Burgin Sigman Wedding Room Block&quot; when
                placing your reservation.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ height: '200px' }}></Box>
    </Box>
  )
}
