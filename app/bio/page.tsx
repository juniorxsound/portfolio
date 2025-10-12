import React from 'react'
import { Metadata } from 'next'
import Bio from '@/content/bio.mdx'

export const metadata: Metadata = {
  title: 'Bio - Or Fleisher',
  description:
    'Learn more about Or Fleisher, a creative technologist working at the intersection of technology and storytelling.',
}

export default function BioPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="markdownContent">
          <Bio />
        </div>
      </div>
    </div>
  )
}
