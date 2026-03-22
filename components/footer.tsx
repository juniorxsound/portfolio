import React from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { SocialIconsMinimal } from './social-icons-minimal'

export function Footer() {
  return (
    <footer className="bg-background font-sans" id="footer">
      <div className="container mx-auto px-4 py-8">
        <SocialIconsMinimal />
      </div>
    </footer>
  )
}
