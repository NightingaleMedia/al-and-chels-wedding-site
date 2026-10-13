import {
  MobileCollapsible,
  PartyDataGallery,
} from '@/components/admin/adminPartyComponents'
import { NavLinkList } from '@/components/homeNavLinks/NavLinkList'
import { adminLinks } from '@/content/navLinks'
import { Box, Typography } from '@mui/material'

import dynamic from 'next/dynamic'

export const instant = false

export default function AdminHomePage() {
  return (
    <Box>
      <Box
        sx={{ mx: 'auto', textAlign: 'center', mt: 4, mb: 5 }}
        className="max-w-2xl"
      >
        <Typography variant="special" component="h1">
          admin
        </Typography>
      </Box>
      <Box>
        <MobileCollapsible title="Charts">
          <PartyDataGallery />
        </MobileCollapsible>
      </Box>
      <NavLinkList
        linksToUse={adminLinks.map((l) => ({
          emoji: '',
          href: l.href,
          label: l.label,
        }))}
      />
    </Box>
  )
}
