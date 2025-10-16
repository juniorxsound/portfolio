import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'

// Types
import { Project } from '@/types'

// Components
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { BackButton } from '@/components/back-button'
import { Container } from '@/components/container'

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), 'content/projects')
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))

  const params = await Promise.all(
    files.map(async (file) => {
      const fileName = path.basename(file, '.mdx')

      try {
        const module = await import(`@/content/projects/${fileName}.mdx`)
        const metadata = module.metadata

        if (metadata.path) {
          const slug = metadata.path.replace(/^\//, '')
          return { slug }
        } else {
          return { slug: fileName }
        }
      } catch (error) {
        console.error(`Error loading project ${fileName}:`, error)
        return { slug: fileName }
      }
    })
  )

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found - Or Fleisher',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.frontmatter.title} - Or Fleisher`,
    openGraph: {
      images: [
        {
          url: project.frontmatter.thumbnail || '',
          width: 420,
          height: 230,
          alt: project.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@juniorxsound',
      creator: '@juniorxsound',
      title: `${project.frontmatter.title} - Or Fleisher`,
      description:
        project.frontmatter.excerpt ||
        `Learn more about ${project.frontmatter.title} by Or Fleisher`,
      images: [
        {
          url: project.frontmatter.thumbnail || '',
          width: 420,
          height: 230,
          alt: project.frontmatter.title,
        },
      ],
    },
    description:
      project.frontmatter.excerpt ||
      `Learn more about ${project.frontmatter.title} by Or Fleisher`,
  }
}

async function getProject(slug: string): Promise<Project | null> {
  const projectsDir = path.join(process.cwd(), 'content/projects')
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))

  // First, try to find by matching the path field in metadata
  for (const file of files) {
    const fileName = path.basename(file, '.mdx')
    const fullPath = path.join(projectsDir, file)

    try {
      const module = await import(`@/content/projects/${fileName}.mdx`)
      const metadata = module.metadata

      if (metadata.path) {
        const metadataSlug = metadata.path.replace(/^\//, '')
        if (metadataSlug === slug) {
          return {
            frontmatter: {
              ...metadata,
              tags: metadata.tags || [],
              components: metadata.components || [],
              press: metadata.press || [],
              links: metadata.links || [],
            } as Project['frontmatter'],
            filePath: fullPath,
          }
        }
      }
    } catch (error) {
      console.error(`Error loading project ${fileName}:`, error)
    }
  }

  // Fallback: try to find by filename
  const projectPath = path.join(projectsDir, `${slug}.mdx`)

  if (fs.existsSync(projectPath)) {
    try {
      const module = await import(`@/content/projects/${slug}.mdx`)
      const metadata = module.metadata

      return {
        frontmatter: {
          ...metadata,
          tags: metadata.tags || [],
          components: metadata.components || [],
          press: metadata.press || [],
          links: metadata.links || [],
        } as Project['frontmatter'],
        filePath: projectPath,
      }
    } catch (error) {
      console.error(`Error loading project ${slug}:`, error)
    }
  }

  return null
}

function getCoverImagePath(frontmatter: Project['frontmatter']) {
  if (frontmatter.cover) {
    return `/images/headers/${frontmatter.cover}`
  }
  return ''
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const { frontmatter, filePath } = project
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.join(' / ')
    : ''

  // Dynamic import of the MDX component
  const fileName = path.basename(filePath, '.mdx')
  const module = await import(`@/content/projects/${fileName}.mdx`)
  const ProjectComponent = module.default
  const metadata = module.metadata

  return (
    <div>
      <BackButton href="/projects" children="Back to Projects" />
      <Hero
        title={frontmatter.title || 'Untitled Project'}
        subtitle={tags}
        backgroundImage={getCoverImagePath(frontmatter)}
        height="xl"
        background="accent"
        className="px-8 text-balance"
      >
        <div className="flex flex-row flex-wrap gap-2">
          {metadata.links.map((link: [string, string]) => {
            return (
              <Button key={link[0]} asChild>
                <Link
                  href={link[1]}
                  target="_blank"
                  className="flex flex-row gap-1"
                >
                  {link[0]}
                  <ExternalLink className="w-3" />
                </Link>
              </Button>
            )
          })}
        </div>
      </Hero>
      <Container>
        <ProjectComponent />
      </Container>
    </div>
  )
}
