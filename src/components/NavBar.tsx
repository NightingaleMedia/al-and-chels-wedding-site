'use client'

import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const navLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Getting There', href: '/getting-there' },
  { label: 'The Location', href: '/the-location' },
  { label: 'Pictures', href: '/pictures' },
  { label: 'Registry', href: '/registry' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Add Your Story', href: '/add-your-story' },
]

// HELLO WORLD!

export default function NavBar() {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Our Wedding
        </Typography>
        {navLinks.map((link) => (
          <Button
            key={link.href}
            component={Link}
            href={link.href}
            color="inherit"
            size="small"
          >
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  )
}
