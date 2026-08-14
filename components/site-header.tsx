'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { type CSSProperties, useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/bio', label: 'About' },
  { href: '/projects', label: 'Projects' },
]

function AnimatedNavLabel({ children }: { children: string }) {
  return (
    <span className="nav-label" aria-hidden="true">
      {children.split('').map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="nav-label-letter"
          style={
            {
              '--letter-enter-delay': `${index * 20}ms`,
              '--letter-exit-delay': `${(children.length - index - 1) * 20}ms`,
            } as CSSProperties
          }
        >
          <span className="nav-label-letter-track">
            <span>{letter}</span>
            <span>{letter}</span>
          </span>
        </span>
      ))}
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 w-full bg-transparent">
      <div className="relative z-10 mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-8">
        <nav
          className={`hidden h-8 items-center gap-8 rounded-full px-3 py-1 transition-[background-color,box-shadow,backdrop-filter] duration-300 md:flex ${
            scrolled
              ? 'bg-primary-foreground/80 text-primary backdrop-blur-sm'
              : ''
          }`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`nav-link text-[13px] transition-opacity hover:opacity-70 ${
                scrolled
                  ? 'text-primary'
                  : 'text-foreground'
              }`}
            >
              <AnimatedNavLabel>{link.label}</AnimatedNavLabel>
            </Link>
          ))}
        </nav>

        <a
          href="mailto:contact@orfleisher.com"
          aria-label="Contact"
          className={`nav-link hidden h-8 items-center gap-1 rounded-full px-3 py-1 text-[13px] transition-colors md:inline-flex ${
            scrolled
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-transparent text-foreground hover:opacity-70'
          }`}
        >
          <AnimatedNavLabel>Contact</AnimatedNavLabel>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
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
          className="fixed inset-0 z-0 flex min-h-dvh flex-col animate-in bg-background/95 px-6 pb-8 pt-20 shadow-lg fade-in slide-in-from-top-4 duration-300 md:hidden"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-2xl leading-tight text-foreground transition-opacity hover:opacity-70"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:contact@orfleisher.com"
            className="mt-3 flex items-center gap-1 py-3 text-2xl leading-tight text-foreground transition-opacity hover:opacity-70"
            onClick={() => setOpen(false)}
          >
            Contact <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <div className="mt-auto flex justify-center">
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  )
}
