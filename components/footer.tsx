import React from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { SocialIconsMinimal } from './social-icons-minimal'

export function Footer() {
  return (
    <footer className="bg-accent font-sans" id="footer">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/bio"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Email Contact */}
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a
              href="mailto:contact@orfleisher.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              contact@orfleisher.com
            </a>
          </div>

          <SocialIconsMinimal />
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Made with <span className="dark:hidden">🖤</span>
          <span className="hidden dark:inline">🤍</span> in NYC
        </div>
      </div>
    </footer>
  )
}
