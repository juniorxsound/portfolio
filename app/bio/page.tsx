import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Bio from '@/content/bio.mdx'
import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { BackButton } from '@/components/back-button'
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
      <BackButton />
      <Hero
        title="About"
        background="accent"
        height="sm"
        className="text-balance"
      >
        <Button variant="default" asChild>
          <Link
            href="/resume"
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open PDF résumé"
          >
            Open PDF résumé
          </Link>
        </Button>
      </Hero>
      <Container maxWidth="4xl" size="md">
        <div className="markdownContent">
          <Bio />
        </div>
      </Container>
    </div>
  )
}
