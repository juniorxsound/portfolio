import React from 'react'
import Link from 'next/link'
import { SocialIconsMinimal } from './social-icons-minimal'

export function Footer() {
  return (
    <footer className="font-sans" id="footer">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
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
            <Link
              href="/resume"
              prefetch={false}
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Résumé
            </Link>
          </nav>

          <SocialIconsMinimal />
        </div>
      </div>
    </footer>
  )
}
