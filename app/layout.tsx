import React from 'react'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GeistPixelSquare } from 'geist/font/pixel'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { SiteNav } from '@/components/site-nav'

import './globals.css'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Or Fleisher',
  description:
    'Creative technologist working at the intersection of technology and storytelling',
  keywords:
    'VR, AR, ML, AI, Virtual Reality, Augmented Reality, WebXR, WebAR, WebGL, three.js, Machine Learning, Or, Or Fleisher, Fleisher, Creative Technologist, nytimes, vimeo, viacom, nike, nike virtual studios',
  openGraph: {
    title: 'Or Fleisher',
    description:
      'Creative technologist working at the intersection of technology and storytelling',
    url: BASE_URL,
    siteName: 'Or Fleisher',
    images: [
      {
        url: '/images/profile_facebook.jpg',
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
      'Creative technologist working at the intersection of technology and storytelling',
    images: ['/images/profile_facebook.jpg'],
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
      className={cn(
        GeistSans.className,
        GeistSans.variable,
        GeistMono.variable,
        GeistPixelSquare.variable
      )}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-md"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 -mb-[72px] text-foreground">
              <div className="mx-auto flex max-w-[1448px] items-center justify-between px-4 py-4 sm:px-8">
                <SiteNav />
                <ThemeToggle />
              </div>
            </header>
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
