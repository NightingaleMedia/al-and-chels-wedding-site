'use client'

import { Fragment, useState } from 'react'
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
import Image from 'next/image'
import { menuNavLinks, NavLink } from '@/content/navLinks'

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
        {link.children.map((child, idx) => (
          <MenuItem
            key={`${child.href}-${idx}`}
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
    <Fragment key={link.href}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen((v) => !v)}>
          <ListItemText primary={link.label} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {link.children.map((child, idx) => (
            <ListItem key={`${child.href}-${idx}`} disablePadding>
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
    </Fragment>
  )
}

export default function NavBar({
  linksToUse = menuNavLinks,
}: {
  linksToUse?: NavLink[]
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      })}
      elevation={1}
    >
      <Toolbar>
        <Typography
          variant="body2"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Chels & Al
        </Typography>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {linksToUse.map((nl, idx) => (
            <DesktopNavItem key={`${nl.href}-${idx}`} link={nl} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="lg:hidden sm:flex">
          <IconButton
            color="inherit"
            aria-label="open navigation menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="w-64">
          <ListItem
            disablePadding
            sx={{ justifyContent: 'center' }}
            className="flex justify-center gap-4 items-center"
          >
            <Typography variant="body2" className="text-center">
              5.29.27
            </Typography>
            <div>
              <Image
                src="/marigold_32.png"
                className="spin-slow"
                alt="Logo"
                width={32}
                height={32}
              />
            </div>
          </ListItem>
          <List>
            {linksToUse.map((nl, i) => (
              <Fragment key={`${nl.href}-${i}`}>
                <MobileNavItem
                  key={`${nl.href}-${i}`}
                  link={nl}
                  onClose={() => setDrawerOpen(false)}
                />
                {i < linksToUse.length - 1 && (
                  <Divider key={`d-${nl.href}-${i}`} />
                )}
              </Fragment>
            ))}
          </List>
        </div>
      </Drawer>
    </AppBar>
  )
}
