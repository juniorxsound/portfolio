import React from 'react'
import Link from 'next/link'
import { SocialIconsMinimal } from './social-icons-minimal'

export function Footer() {
  return (
    <footer className="bg-background font-sans" id="footer">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
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
