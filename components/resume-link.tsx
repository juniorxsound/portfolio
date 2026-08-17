'use client'

import { track } from '@vercel/analytics'
import { type ComponentPropsWithoutRef } from 'react'

type ResumeLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  source: string
}

export function ResumeLink({
  source,
  onClick,
  ...props
}: ResumeLinkProps) {
  return (
    <a
      {...props}
      href="/resume"
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          track('Resume opened', { source })
        }
      }}
    />
  )
}
