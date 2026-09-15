import { ComingSoonPage } from '@/components/pageComponents/ComingSoonPageComponents'
import { Box, Typography } from '@mui/material'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function LocationPage() {
  return (
    <Box component={'main'}>
      <Box className="max-w-[768px] mx-auto min-h-screen pb-10 px-4">
        <Typography variant="h1" className="text-center mb-10" sx={{ my: 4 }}>
          The Location
        </Typography>
        <Typography variant="body1" sx={{ mb: 6 }} className="text-center mb-4">
          The wedding will take place at the following location, the parking is
          importantly somewhere else, please route to the parking lot and a
          shuttle will take you to the event!:
        </Typography>
        <Box className="mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1493.108800837732!2d-83.8927249569485!3d41.54288551768474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883c69a0c3f81d25%3A0xc6c76a1e291174b8!2s4850%20County%20Hwy%201-2%2C%20Swanton%2C%20OH%2043558!5e0!3m2!1sen!2sus!4v1789058516179!5m2!1sen!2sus"
            style={{
              border: 'none',
              margin: '0 auto',
              width: '100%',
              minHeight: '450px',
            }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </Box>
      </Box>
    </Box>
  )
}
