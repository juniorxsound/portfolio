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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bio - Or Fleisher',
    description:
      'Learn more about Or Fleisher, a creative technologist working at the intersection of technology and storytelling.',
  },
}

export default function BioPage() {
  return (
    <div>
      <BackButton />
      <Hero
        title="About"
        background="accent"
        height="xl"
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
