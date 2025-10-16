import React from 'react'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'

import type { Project } from '@/types'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { FilteredProjects } from '@/components/filtered-projects'
import { Container } from '@/components/container'
import { BackButton } from '@/components/back-button'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projects - Or Fleisher',
    description: 'Projects by Or Fleisher',
    openGraph: {
      title: 'Projects - Or Fleisher',
      description: 'Projects by Or Fleisher',
      images: [
        {
          url: '/assets/images/gifs/skeletron.gif',
          width: 420,
          height: 230,
          alt: 'Skeletron',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@juniorxsound',
      creator: '@juniorxsound',
      title: 'Projects - Or Fleisher',
      description: 'Projects by Or Fleisher',
      images: [
        {
          url: '/assets/images/gifs/skeletron.gif',
          width: 420,
          height: 230,
          alt: 'Skeletron',
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

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div>
      <BackButton />
      <Hero
        title="Projects"
        height="sm"
        background="accent"
        className="px-8 text-balance"
      />
      <Container className="space-y-8">
        <section id="work">
          <FilteredProjects projects={projects} />
        </section>

        <div className="text-center">
          <Button asChild>
            <Link href="/bio">Learn More</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
