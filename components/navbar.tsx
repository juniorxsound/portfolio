'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/bio', label: 'About' },
  { href: '/projects', label: 'Work' },
] as const

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent">
      <div className="container mx-auto max-w-6xl h-full px-8 flex items-center justify-between">
        {/* Nav links */}
        <nav className="flex items-center gap-5" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-sans text-[11px] uppercase tracking-widest transition-colors duration-200',
                pathname === href
                  ? 'text-foreground font-bold'
                  : 'text-foreground hover:text-foreground/70'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Theme toggle — far right */}
        <ThemeToggle />
      </div>
    </header>
  )
}
