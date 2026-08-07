import React from 'react'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Open_Sans, Merriweather } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
    'Or Fleisher is a New York-based engineer and creative technologist who solves complex visual problems with code. He specializes in computer graphics, computer vision and data visualization.',
  keywords:
    'Engineer, Creative Technologist, Computer Graphics, Computer Vision, Data Visualization, WebGL, WebGPU, Three.js, Machine Learning, Or Fleisher, New York',
  openGraph: {
    title: 'Or Fleisher',
    description:
      'Or Fleisher is a New York-based engineer and creative technologist who solves complex visual problems with code. He specializes in computer graphics, computer vision and data visualization.',
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
      'Or Fleisher is a New York-based engineer and creative technologist who solves complex visual problems with code. He specializes in computer graphics, computer vision and data visualization.',
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
            <div className="absolute top-4 right-4 z-50">
              <ThemeToggle />
            </div>
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
