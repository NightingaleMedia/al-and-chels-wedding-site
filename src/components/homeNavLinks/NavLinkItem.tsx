import Link from 'next/link'
import { NavLinkData } from '@/content/navLinks'
import { Typography } from '@mui/material'
import { OpenInNew } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

export function NavLinkItem({ href, label, emoji, children }: NavLinkData) {
  return (
    <li>
      <Link
        href={href}
        style={{ textDecoration: 'none' }}
        className="flex items-center gap-3 p-3 border border-gray-400 hover:shadow-md hover:border-gray-300 transition-all"
      >
        <span className="text-xl">{emoji}</span>
        {children ? (
          <span className="flex-1">{children}</span>
        ) : (
          <Typography
            sx={(theme) => ({
              fontWeight: 'medium',
              color: theme.palette.primary.dark,
            })}
            variant="body2"
            component="span"
            className="flex-1"
          >
            {label}
          </Typography>
        )}
        <OpenInNew fontSize="small" sx={{ color: grey[400] }} />
      </Link>
    </li>
  )
}
