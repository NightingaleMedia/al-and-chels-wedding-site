'use client'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AppleIcon from '@mui/icons-material/Apple'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useState } from 'react'
import { ADD_TO_CALENDAR_URL, APPLE_CALENDAR_URL } from '@/constants'
import { Google } from '@mui/icons-material'

export default function CalendarButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<CalendarMonthIcon />}
        onClick={() => setOpen(true)}
      >
        Add to Calendar
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="calendar-dialog-title"
      >
        <DialogTitle id="calendar-dialog-title">choose a calendar</DialogTitle>
        <DialogContent className="flex justify-center gap-3">
          <IconButton
            color="primary"
            href={ADD_TO_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <Google />
          </IconButton>

          <IconButton
            color="primary"
            href={APPLE_CALENDAR_URL}
            download="wedding.ics"
            aria-label="Download Apple Calendar event"
            title="Download Apple Calendar event"
            onClick={() => setOpen(false)}
          >
            <AppleIcon />
          </IconButton>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
