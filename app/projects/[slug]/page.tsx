import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import path from 'path'

// Components
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { Container } from '@/components/container'
import { ProjectCard } from '@/components/project-card'
import {
  getProjectBySlug,
  getProjectSlugs,
  getProjects,
  getRelatedProjects,
} from '@/lib/content'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found - Or Fleisher',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.frontmatter.title} - Or Fleisher`,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      images: [
        {
          url: project.frontmatter.animatedThumbnail || '',
          width: 420,
          height: 230,
          alt: project.frontmatter.title,
        },
        {
          url: project.frontmatter.thumbnail?.src || '',
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
          url: project.frontmatter.animatedThumbnail || '',
          width: 420,
          height: 230,
          alt: project.frontmatter.title,
        },
        {
          url: project.frontmatter.thumbnail?.src || '',
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ])

  if (!project) {
    notFound()
  }

  const { frontmatter, filePath } = project
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.join(' / ')
    : ''
  const relatedProjects = getRelatedProjects(project, projects)

  // Dynamic import of the MDX component
  const fileName = path.basename(filePath, '.mdx')
  const module = await import(`@/content/projects/${fileName}.mdx`)
  const ProjectComponent = module.default

  return (
    <div>
      <Hero
        title={frontmatter.title || 'Untitled Project'}
        subtitle={tags}
        eyebrow={
          frontmatter.badge ? (
            <span className="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-muted px-2 py-1">
              <img
                src={frontmatter.badge}
                alt=""
                width={80}
                height={20}
                className="h-auto max-h-5 w-auto max-w-20 invert dark:invert-0"
              />
            </span>
          ) : undefined
        }
        backgroundImage={frontmatter.cover}
        height="xl"
        background="accent"
        className="text-balance"
      >
        <div className="flex flex-row flex-wrap gap-2">
          {(frontmatter.links || []).map((link: [string, string]) => {
            return (
              <Button
                key={link[0]}
                variant="secondary"
                asChild
              >
                <Link
                  href={link[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-1"
                >
                  {link[0]}
                  <ExternalLink className="w-3" aria-hidden="true" />
                </Link>
              </Button>
            )
          })}
        </div>
      </Hero>
      <div className="relative z-10 bg-background">
        <Container>
          <ProjectComponent />

          {relatedProjects.length > 0 && (
            <section className="mt-16" aria-labelledby="more-projects-heading">
              <h2 id="more-projects-heading" className="mb-6">
                More projects
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((relatedProject) => (
                  <ProjectCard
                    key={relatedProject.frontmatter.path || relatedProject.filePath}
                    project={relatedProject}
                    compact
                  />
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
    </div>
  )
}
