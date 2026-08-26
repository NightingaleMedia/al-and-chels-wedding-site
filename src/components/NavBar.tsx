'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

type NavLink = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const navLinks: NavLink[] = [
  {
    label: 'About Us',
    href: '/about-us',
    children: [
      { label: 'Add To The Story', href: '/about-us#getting-there' },
      { label: 'Our Story', href: '/about-us#our-story' },
      { label: 'Day of Travel', href: '/travel#day-of-travel' },
      { label: 'Pictures', href: '/pictures' },
    ],
  },
  {
    label: 'Travel',
    href: '/travel',
    children: [
      { label: 'Getting There', href: '/travel#getting-there' },
      { label: 'Accommodations', href: '/travel/accommodations' },
      { label: 'Day of Travel', href: '/travel#day-of-travel' },
    ],
  },
  {
    label: 'The Wedding',
    href: '/the-wedding',
    children: [
      { label: 'Schedule', href: '/the-wedding#schedule' },
      { label: 'Location', href: '/the-wedding#location' },
      { label: 'RSVP', href: '/the-wedding#location' },
    ],
  },
  { label: 'FAQs', href: '/faqs' },
]

function DesktopNavItem({ link }: { link: NavLink }) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const router = useRouter()

  if (!link.children) {
    return (
      <Button component={Link} href={link.href} color="inherit" size="small">
        {link.label}
      </Button>
    )
  }

  return (
    <>
      <Button
        color="inherit"
        size="small"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-haspopup="true"
        aria-expanded={Boolean(anchor)}
      >
        {link.label}
      </Button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {link.children.map((child) => (
          <MenuItem
            key={child.href}
            onClick={() => {
              setAnchor(null)
              router.push(child.href)
            }}
          >
            {child.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

function MobileNavItem({
  link,
  onClose,
}: {
  link: NavLink
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  if (!link.children) {
    return (
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            onClose()
            router.push(link.href)
          }}
        >
          <ListItemText primary={link.label} />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen((v) => !v)}>
          <ListItemText primary={link.label} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {link.children.map((child) => (
            <ListItem key={child.href} disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  onClose()
                  router.push(child.href)
                }}
              >
                <ListItemText primary={child.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppBar position="fixed" color="transparent" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Our Wedding
        </Typography>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((nl) => (
            <DesktopNavItem key={nl.href} link={nl} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <IconButton
          className="md:hidden"
          color="inherit"
          aria-label="open navigation menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="w-64">
          <List>
            {navLinks.map((nl, i) => (
              <>
                <MobileNavItem
                  key={nl.href}
                  link={nl}
                  onClose={() => setDrawerOpen(false)}
                />
                {i < navLinks.length - 1 && <Divider key={`d-${nl.href}`} />}
              </>
            ))}
          </List>
        </div>
      </Drawer>
    </AppBar>
  )
}
