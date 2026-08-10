'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/bio', label: 'About' },
  { href: '/projects', label: 'Projects' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 w-full bg-transparent">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 via-black/15 to-transparent md:h-32"
      />
      <div className="container relative z-10 mx-auto flex h-14 items-center justify-between px-6 md:px-10">
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:contact@orfleisher.com"
          className="hidden items-center gap-1 rounded-full bg-primary px-4 py-2 text-[13px] text-primary-foreground transition-opacity hover:opacity-75 md:inline-flex"
        >
          Contact <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="group absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span
            aria-hidden="true"
            className={`absolute h-px w-4 bg-current transition-transform duration-200 ${
              open ? 'rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-px w-4 bg-current transition-transform duration-200 ${
              open ? '-rotate-45' : 'translate-y-1'
            }`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="relative z-10 mx-6 rounded-2xl bg-background/95 px-4 py-3 shadow-lg ring-1 ring-border/60 md:hidden"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:contact@orfleisher.com"
            className="mt-2 flex items-center justify-center gap-1 rounded-full bg-primary px-4 py-2 text-center text-sm text-primary-foreground transition-opacity hover:opacity-75"
            onClick={() => setOpen(false)}
          >
            Contact <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  )
}
