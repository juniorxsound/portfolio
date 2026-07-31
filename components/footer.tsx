import React from 'react'
import Link from 'next/link'
import { SocialIconsMinimal } from './social-icons-minimal'

export function Footer() {
  return (
    <footer className="font-sans" id="footer">
      <div className="mx-auto max-w-[1448px] px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <Link
              href="/"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/bio"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          <SocialIconsMinimal />
        </div>
      </div>
    </footer>
  )
}
