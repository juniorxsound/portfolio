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
      <BackButton />
      <Hero
        title="About"
        background="accent"
        height="sm"
        className="px-8 text-balance"
      ></Hero>
      <Container maxWidth="4xl" size="md">
        <div className="markdownContent">
          <Bio />
        </div>
      </Container>
    </div>
  )
}
