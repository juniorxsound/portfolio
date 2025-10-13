import React from 'react'
import { Metadata } from 'next'
import Bio from '@/content/bio.mdx'
import { Container } from '@/components/container'

export const metadata: Metadata = {
  title: 'Bio - Or Fleisher',
  description:
    'Learn more about Or Fleisher, a creative technologist working at the intersection of technology and storytelling.',
}

export default function BioPage() {
  return (
    <div className="min-h-screen">
      <Container maxWidth="4xl" size="md">
        <div className="markdownContent">
          <Bio />
        </div>
      </Container>
    </div>
  )
}
