import React from 'react'
import { Metadata } from 'next'
import Bio from '@/content/bio.mdx'
import { Container } from '@/components/container'
import { ResumeLink } from '@/components/resume-link'
import { Hero } from '@/components/hero'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Bio - Or Fleisher',
  description:
    'Or Fleisher is a New York-based engineer and creative technologist who solves complex visual problems with code. He specializes in computer graphics, computer vision and data visualization.',
  openGraph: {
    title: 'Bio - Or Fleisher',
    description:
      'Or Fleisher is a New York-based engineer and creative technologist who solves complex visual problems with code. He specializes in computer graphics, computer vision and data visualization.',
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
      'Or Fleisher is a New York-based engineer and creative technologist who solves complex visual problems with code. He specializes in computer graphics, computer vision and data visualization.',
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
      <Hero
        title="About"
        background="accent"
        height="sm"
        className="text-balance"
      >
        <Button variant="default" asChild>
          <ResumeLink
            source="bio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open PDF résumé"
          >
            Open PDF résumé
          </ResumeLink>
        </Button>
      </Hero>
      <Container maxWidth="6xl" size="md">
        <div className="markdownContent [&_.prose]:max-w-none [&_h3[id]]:scroll-mt-24">
          <Bio />
        </div>
      </Container>
    </div>
  )
}
