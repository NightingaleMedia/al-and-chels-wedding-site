'use client'

import { ReactNode } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

interface MobileCollapsibleProps {
  title: ReactNode
  children: ReactNode
  /** Whether the accordion starts open on mobile. Defaults to collapsed. */
  defaultExpanded?: boolean
}

/**
 * Renders children inside a collapsible MUI Accordion on mobile, and renders
 * them normally (no accordion) on desktop.
 */
export default function MobileCollapsible({
  title,
  children,
  defaultExpanded = false,
}: MobileCollapsibleProps) {
  const theme = useTheme()
  // noSsr defers evaluation to the client to avoid a hydration mismatch.
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })

  if (!isMobile) {
    return <>{children}</>
  }

  return (
    <Accordion defaultExpanded={defaultExpanded} disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography component="span" className="font-semibold">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
