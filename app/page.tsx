import React from 'react'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'

import type { Project } from '@/types'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { FeaturedProjects } from '@/components/featured-projects'
import { Container } from '@/components/container'

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

  const projects = await Promise.all(
    files.map(async (file) => {
      const fileName = path.basename(file, '.mdx')
      const fullPath = path.join(projectsDir, file)

      try {
        // Dynamic import to get the metadata export
        const module = await import(`@/content/projects/${fileName}.mdx`)
        const metadata = module.metadata

        return {
          frontmatter: metadata as Project['frontmatter'],
          filePath: fullPath,
        }
      } catch (error) {
        console.error(`Error loading project ${fileName}:`, error)
        return null
      }
    })
  )

  // Filter out null results and sort by date
  return projects
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date || '')
      const dateB = new Date(b.frontmatter.date || '')
      return dateB.getTime() - dateA.getTime()
    })
}

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <div>
      <Hero
        title="Or Fleisher is an award-winning creative technologist, developer and artist working at the intersection of technology and storytelling."
        height="xl"
        background="accent"
        videoSources={[
          {
            src: '/videos/hero/placeholder-720p.webm',
            type: 'video/webm',
          },
          {
            src: '/videos/hero/placeholder-720p.mp4',
            type: 'video/mp4',
          },
          {
            src: '/videos/hero/placeholder-720p-av1.mp4',
            type: 'video/mp4; codecs=av01',
          },
        ]}
        className="px-8 text-balance"
      >
        <div className="flex flex-row gap-2">
          <Button variant="default" asChild>
            <Link href="/bio" prefetch={true}>
              Learn More
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="#footer" prefetch={true}>
              Contact
            </Link>
          </Button>
        </div>
      </Hero>
      <Container>
        <section id="featured-work">
          <FeaturedProjects projects={projects} />
        </section>
      </Container>
    </div>
  )
}
