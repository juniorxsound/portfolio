'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/bio', label: 'About' },
  { href: '/projects', label: 'Projects' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 w-full bg-transparent">
      <div className="relative z-10 mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between px-6 md:px-10">
        <nav
          className={`hidden items-center gap-8 rounded-full px-4 py-2 transition-[background-color,box-shadow,backdrop-filter] duration-300 md:flex ${
            scrolled
              ? 'bg-primary text-primary-foreground'
              : ''
          }`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] transition-opacity hover:opacity-70 ${
                scrolled
                  ? 'text-primary-foreground'
                  : 'text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:contact@orfleisher.com"
          className={`hidden h-9 items-center gap-1 rounded-full px-3 py-1 text-[13px] font-medium transition-colors md:inline-flex ${
            scrolled
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-transparent text-foreground hover:opacity-70'
          }`}
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
            className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-150 ease-out ${
              open ? 'rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-150 ease-out ${
              open ? '-rotate-45' : 'translate-y-1'
            }`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="absolute inset-x-0 top-0 z-0 animate-in rounded-b-2xl border-b border-border/60 bg-background/95 px-6 pb-5 pt-16 shadow-lg fade-in slide-in-from-top-4 duration-300 md:hidden"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-foreground transition-opacity hover:opacity-70"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:contact@orfleisher.com"
            className="mt-2 flex h-9 items-center justify-center gap-1 rounded-full bg-primary px-3 py-1 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={() => setOpen(false)}
          >
            Contact <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <div className="mt-4 flex justify-center">
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  )
}
