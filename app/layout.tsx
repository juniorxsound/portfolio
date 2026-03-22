import React from 'react'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Open_Sans, Merriweather } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
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
    'VR, AR, ML, AI, Virtual Reality, Augmented Reality, WebXR, WebAR, WebGL, three.js, Machine Learning, Or, Or Fleisher, Fleisher, Creative Technologist, nytimes, vimeo, viacom, nike, nike virtual studios',
  openGraph: {
    title: 'Or Fleisher',
    description:
      'Creative technologist, developer and artist working at the intersection of technology and storytelling.',
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
      'Creative technologist, developer and artist working at the intersection of technology and storytelling.',
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
      className={cn(open_sans.className, merriweather.className)}
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
            <Navbar />
            {/* pt-16 clears the fixed navbar on all pages; home page hero
                compensates with -mt-16 to slide behind the transparent bar */}
            <main id="main-content" className="flex-1 pt-16">
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
