'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export default function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#f7871f"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  )
}
