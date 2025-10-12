import React from 'react'
import { Metadata } from 'next'
import { Open_Sans, Merriweather } from 'next/font/google'
import { cn } from '@/lib/utils'

import './globals.css'

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '700'],
})

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Or Fleisher',
  description:
    'Creative technologist, developer and artist working at the intersection of technology and storytelling.',
  keywords:
    'VR, AR, ML, AI, Virtual Reality, Augmented Reality, WebVR, WebAR, WebGL, three.js, Machine Learning, Or, Or Fleisher, Fleisher, Creative Technologist, אור, אור פליישר, פליישר',
  openGraph: {
    title: 'Or Fleisher',
    description:
      'Creative technologist, developer and artist working at the intersection of technology and storytelling.',
    url: 'https://orfleisher.com',
    siteName: 'Or Fleisher',
    images: [
      {
        url: '/assets/images/profile_facebook.jpg',
        width: 1200,
        height: 630,
        alt: 'Or Fleisher',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL('https://orfleisher.com'),
  twitter: {
    card: 'summary_large_image',
    site: '@juniorxsound',
    creator: '@juniorxsound',
    title: 'Or Fleisher',
    description:
      'Creative technologist, developer and artist working at the intersection of technology and storytelling.',
    images: ['https://i.imgur.com/Gu2tbUp.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(open_sans.className, merriweather.className)}>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicons/favicon-32x32.png"
        />
        <link rel="canonical" href="https://orfleisher.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
