import React from 'react'
import { Metadata } from 'next'
import Bio from '@/content/bio.mdx'
import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { BackButton } from '@/components/back-button'

export const metadata: Metadata = {
  title: 'Bio - Or Fleisher',
  description:
    'Learn more about Or Fleisher, a creative technologist working at the intersection of technology and storytelling.',
  openGraph: {
    title: 'Bio - Or Fleisher',
    description:
      'Learn more about Or Fleisher, a creative technologist working at the intersection of technology and storytelling.',
    images: [
      {
        url: '/images/profile_facebook.jpg',
        width: 1200,
        height: 630,
        alt: 'Or Fleisher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@juniorxsound',
    creator: '@juniorxsound',
    title: 'Bio - Or Fleisher',
    description:
      'Learn more about Or Fleisher, a creative technologist working at the intersection of technology and storytelling.',
    images: [
      {
        url: '/images/profile_facebook.jpg',
        width: 1200,
        height: 630,
        alt: 'Or Fleisher',
      },
    ],
  },
}

export default function BioPage() {
  return (
    <div>
      {/* Hero pinned behind the scrolling card */}
      <div className="sticky top-0 h-content">
        <BackButton />
        <Hero
          title="About"
          background="accent"
          height="sm"
          className="px-8 text-balance"
          videoSources={[
            {
              src: '/videos/hero/about_vp9.webm',
              type: 'video/webm',
            },
            {
              src: '/videos/hero/about_h264.mp4',
              type: 'video/mp4',
            },
          ]}
        />
      </div>

      {/* Scrolling card that slides over the pinned hero */}
      <div className="relative z-10 bg-background shadow-[0_-12px_40px_rgba(0,0,0,0.4)]">
        <Container maxWidth="4xl" size="md">
          <div className="markdownContent">
            <Bio />
          </div>
        </Container>
      </div>
    </div>
  )
}
