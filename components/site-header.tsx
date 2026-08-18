'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/bio', label: 'About' },
  { href: '/projects', label: 'Projects' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [pastHomeHero, setPastHomeHero] = useState(!isHomePage)
  const previousScrollY = useRef(0)
  const pastHomeHeroRef = useRef(!isHomePage)

  useEffect(() => {
    const homeHero = isHomePage
      ? document.querySelector<HTMLElement>('[data-home-hero]')
      : null

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - previousScrollY.current
      const heroBottom = homeHero?.getBoundingClientRect().bottom ?? -1
      const isPastHero = !isHomePage || heroBottom <= 0
      const justPassedHero = isPastHero && !pastHomeHeroRef.current
      const isInRevealZone =
        isHomePage && isPastHero && heroBottom > -160

      setPastHomeHero(isPastHero)

      if (
        open ||
        currentScrollY < 80 ||
        justPassedHero ||
        isInRevealZone
      ) {
        setHidden(false)
      } else if (isPastHero && Math.abs(delta) > 6) {
        setHidden(delta > 0)
      }

      pastHomeHeroRef.current = isPastHero
      previousScrollY.current = currentScrollY
    }

    pastHomeHeroRef.current = !isHomePage
    previousScrollY.current = window.scrollY
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isHomePage, open])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === href : pathname.startsWith(href)
  const desktopHeaderOffscreen = !open && (hidden || !pastHomeHero)

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 w-full bg-transparent transition-transform duration-300 ease-out motion-reduce:transition-none ${
        desktopHeaderOffscreen
          ? 'translate-y-0 md:-translate-y-[7.5rem]'
          : 'translate-y-0'
      }`}
    >
      <div
        className="header-progressive-blur hidden h-[7.5rem] md:block"
        aria-hidden="true"
      >
        <span className="header-progressive-blur__layer header-progressive-blur__layer--1 backdrop-blur-[4px]" />
        <span className="header-progressive-blur__layer header-progressive-blur__layer--2 backdrop-blur-[6px]" />
        <span className="header-progressive-blur__layer header-progressive-blur__layer--3 backdrop-blur-[10px]" />
        <span className="header-progressive-blur__layer header-progressive-blur__layer--4 backdrop-blur-[18px]" />
        <span className="header-progressive-blur__layer header-progressive-blur__layer--5 backdrop-blur-[34px]" />
        <span className="absolute inset-0 z-[1] bg-gradient-to-b from-background/45 via-background/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
          aria-hidden={desktopHeaderOffscreen}
          inert={desktopHeaderOffscreen}
        >
          {links.map((link) => {
            const active = isActive(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`nav-link rounded-full px-4 py-2 text-[14px] font-medium leading-5 text-foreground transition-[background-color,box-shadow,opacity] duration-200 hover:bg-background/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                  active
                    ? 'bg-background/35 shadow-[inset_0_0_0_1px_hsl(var(--color-foreground)/0.16)]'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <a
          href="mailto:contact@orfleisher.com"
          aria-label="Contact"
          aria-hidden={desktopHeaderOffscreen}
          tabIndex={desktopHeaderOffscreen ? -1 : undefined}
          className="nav-link hidden items-center gap-1.5 rounded-full bg-foreground/90 px-4 py-2 text-[14px] font-medium leading-5 text-background shadow-[0_0_0_1px_hsl(var(--color-background)/0.12)] backdrop-blur-md transition-[background-color,box-shadow] duration-200 hover:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 md:inline-flex"
        >
          Contact
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
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
