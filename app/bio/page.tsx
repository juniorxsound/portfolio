import React from 'react'
import { Metadata } from 'next'
import Bio from '@/content/bio.mdx'
import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { ScrollCard } from '@/components/scroll-card'

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
      <div className="sticky top-0 h-content -mt-16">
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
      <ScrollCard>
        <Container maxWidth="4xl" size="md" className="pt-16">
          <div className="markdownContent">
            <Bio />
          </div>
        </Container>
      </ScrollCard>
    </div>
  )
}
