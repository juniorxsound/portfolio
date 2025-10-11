import React from 'react'
import { Metadata } from 'next'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Bio - Or Fleisher',
    description:
      'Learn more about Or Fleisher, a creative technologist working at the intersection of technology and storytelling.',
  }
}

async function getBioContent() {
  const bioPath = path.join(process.cwd(), 'data/bio.mdx')
  const fileContents = fs.readFileSync(bioPath, 'utf8')
  const { content } = matter(fileContents)

  return content
}

export default async function BioPage() {
  const content = await getBioContent()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="markdownContent">
          <MDXRemote source={content} />
        </div>
      </div>
    </div>
  )
}
