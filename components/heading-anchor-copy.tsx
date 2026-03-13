'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Link as LinkIcon } from 'lucide-react'

interface HeadingAnchorCopyProps {
  id: string
}

export function HeadingAnchorCopy({ id }: HeadingAnchorCopyProps) {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1200)
    return () => clearTimeout(timeout)
  }, [copied])

  const onCopy = async () => {
    const hash = `#${id}`
    const absoluteUrl = `${window.location.origin}${pathname}${hash}`

    try {
      await navigator.clipboard.writeText(absoluteUrl)
      setCopied(true)
      history.replaceState(null, '', hash)
    } catch {
      history.replaceState(null, '', hash)
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? 'Anchor link copied' : 'Copy anchor link'}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <LinkIcon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{copied ? 'Copied' : 'Copy link'}</span>
    </button>
  )
}
