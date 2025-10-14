import React from 'react'
import { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import { Open_Sans, Merriweather } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'

import './globals.css'
import { BASE_URL } from '@/lib/constants'

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
    url: BASE_URL,
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
  metadataBase: new URL(BASE_URL),
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
    <html
      lang="en"
      className={cn(open_sans.className, merriweather.className)}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId="UA-123776962-1" />

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <div className="absolute top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
