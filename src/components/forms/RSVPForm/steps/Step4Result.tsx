'use client'

import { Button, Link, Typography } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { SUPPORT_EMAIL } from '@/constants'
import { useRSVPForm } from '@/context/rsvp/RSVPFormContext'
import { ErrorPanel } from '../errorPanel'
import { OpenInNew } from '@mui/icons-material'

const todos = [
  { label: 'Book Your Hotel', href: '/travel/accommodations' },
  { label: 'Add Some Pictures', href: '/about-us/add-your-pictures' },
  { label: 'Check Out The Registry', href: '/registry' },
]

/** Step 4 — the result of the submission. */
export default function Step4Result() {
  const { status, errorMessage, retry, party } = useRSVPForm()

  if (status === 'success') {
    return (
      <section className="flex flex-col gap-3 mt-4">
        <Typography variant="h1">{party.partyName}, you're all set!</Typography>
        <Typography variant="body1">
          Need to change something?
          <br /> Email{' '}
          <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>.
        </Typography>
        <div className="mt-10">
          <Typography variant="h1" component={'p'}>
            Time To:
          </Typography>

          <ul className="flex flex-col gap-3 mt-3">
            {todos.map((todo) => (
              <li key={todo.href}>
                <Link
                  href={todo.href}
                  underline="none"
                  className="group flex items-center gap-2 w-fit"
                >
                  <CheckBoxOutlineBlankIcon
                    fontSize="medium"
                    className="transition-transform duration-200 group-hover:scale-125 group-hover:-rotate-6"
                  />
                  <Typography
                    variant="h5"
                    component="span"
                    className="transition-all duration-200 group-hover:line-through group-hover:opacity-50"
                  >
                    {todo.label}
                  </Typography>
                  <OpenInNew />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  return (
    <ErrorPanel errorMessage={errorMessage}>
      <Button variant="contained" onClick={retry}>
        Try again
      </Button>
    </ErrorPanel>
  )
}
