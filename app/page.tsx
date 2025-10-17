import React from 'react'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'

import type { Project, Writing } from '@/types'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { FeaturedProjects } from '@/components/featured-projects'
import { FeaturedWriting } from '@/components/featured-writing'
import { Container } from '@/components/container'

export async function generateMetadata() {
  return {
    title: 'Or Fleisher',
    description:
      'Creative technologist, developer and artist working at the intersection of technology and storytelling.',

    openGraph: {
      images: [
        {
          url: '/images/gifs/myth.gif',
          width: 420,
          height: 230,
          alt: 'Myth',
        },
      ],
    },
    twitter: {
      images: [
        {
          url: '/images/gifs/myth.gif',
          width: 420,
          height: 230,
          alt: 'Myth',
        },
      ],
    },
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

async function getWriting(): Promise<Writing[]> {
  const writingDir = path.join(process.cwd(), 'content/writing')

  // Check if writing directory exists
  if (!fs.existsSync(writingDir)) {
    return []
  }

  const files = fs.readdirSync(writingDir).filter((f) => f.endsWith('.mdx'))

  const writing = await Promise.all(
    files.map(async (file) => {
      const fileName = path.basename(file, '.mdx')
      const fullPath = path.join(writingDir, file)

      try {
        // Dynamic import to get the metadata export
        const module = await import(`@/content/writing/${fileName}.mdx`)
        const metadata = module.metadata

        return {
          frontmatter: metadata as Writing['frontmatter'],
          filePath: fullPath,
        }
      } catch (error) {
        console.error(`Error loading writing ${fileName}:`, error)
        return null
      }
    })
  )

  // Filter out null results, only show featured articles, and sort by date
  return writing
    .filter((article): article is Writing => article !== null)
    .filter((article) => article.frontmatter.featured === true)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date || '')
      const dateB = new Date(b.frontmatter.date || '')
      return dateB.getTime() - dateA.getTime()
    })
}

export default async function HomePage() {
  const projects = await getProjects()
  const writing = await getWriting()

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
            <Link href="/bio" aria-label="Learn More">
              Learn More
            </Link>
          </Button>
          <Button variant="default" asChild aria-label="Contact">
            <Link href="mailto:contact@orfleisher.com" prefetch={true}>
              Contact
            </Link>
          </Button>
        </div>
      </Hero>
      <Container>
        <section id="featured-work">
          <FeaturedProjects projects={projects} />
        </section>

        {writing.length > 0 && (
          <section id="writing" className="mt-16">
            <FeaturedWriting writing={writing} />
          </section>
        )}
      </Container>
    </div>
  )
}
