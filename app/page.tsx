import React from 'react'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

import type { Project } from '@/types'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { FilteredProjects } from '@/components/filtered-projects'

export async function generateMetadata() {
  return {
    title: 'Or Fleisher',
    description:
      'Creative technologist, developer and artist working at the intersection of technology and storytelling.',
  }
}

async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), 'content/projects')
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))
  const projects = files
    .map((file) => {
      const fullPath = path.join(projectsDir, file)
      const { data } = matter.read(fullPath)
      return {
        frontmatter: data as Project['frontmatter'],
        filePath: fullPath,
      }
    })
    .sort((a, b) => {
      // Sort by date in descending order (newest first)
      const dateA = new Date(a.frontmatter.date || '')
      const dateB = new Date(b.frontmatter.date || '')
      return dateB.getTime() - dateA.getTime()
    })

  return projects
}

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen">
      <Hero
        title="Or Fleisher is an award-winning creative technologist, developer and artist working at the intersection of technology and storytelling."
        height="xl"
        background="accent"
        className="px-8 text-balance"
      >
        <Button variant="default" asChild>
          <Link href="/bio" prefetch={true}>
            Learn More
          </Link>
        </Button>
      </Hero>
      <div className="container mx-auto px-8 py-12 max-w-6xl">
        <section id="work">
          <FilteredProjects projects={projects} />
        </section>
      </div>
    </div>
  )
}
