import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Project } from '@/types'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), 'data/projects')
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))

  const params = []

  for (const file of files) {
    const fullPath = path.join(projectsDir, file)
    const { data: frontmatter } = matter.read(fullPath)

    if (frontmatter.path) {
      // Remove leading slash from path to get the slug
      const slug = frontmatter.path.replace(/^\//, '')
      params.push({ slug })
    } else {
      // Fallback to filename if no path in frontmatter
      const slug = file.replace('.md', '')
      params.push({ slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const projectPath = path.join(process.cwd(), 'data/projects', `${slug}.mdx`)

  if (!fs.existsSync(projectPath)) {
    return {
      title: 'Project Not Found',
    }
  }

  const fileContents = fs.readFileSync(projectPath, 'utf8')
  const { data: frontmatter } = matter(fileContents)

  return {
    title: `${frontmatter.title} - Or Fleisher`,
    description:
      frontmatter.excerpt ||
      `Learn more about ${frontmatter.title} by Or Fleisher`,
  }
}

async function getProject(slug: string): Promise<Project | null> {
  const projectsDir = path.join(process.cwd(), 'data/projects')
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))

  // First, try to find by matching the path field in frontmatter
  for (const file of files) {
    const fullPath = path.join(projectsDir, file)
    const { data: frontmatter } = matter.read(fullPath)

    if (frontmatter.path) {
      const frontmatterSlug = frontmatter.path.replace(/^\//, '')
      if (frontmatterSlug === slug) {
        return await processProjectFile(fullPath, frontmatter)
      }
    }
  }

  // Fallback: try to find by filename
  const projectPath = path.join(projectsDir, `${slug}.mdx`)

  if (fs.existsSync(projectPath)) {
    const { data: frontmatter } = matter.read(projectPath)
    return await processProjectFile(projectPath, frontmatter)
  }

  return null
}

async function processProjectFile(
  filePath: string,
  frontmatter: any
): Promise<Project> {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContents)

  return {
    frontmatter: {
      ...frontmatter,
      tags: frontmatter.tags || [],
      components: frontmatter.components || [],
      press: frontmatter.press || [],
      links: frontmatter.links || [],
    } as Project['frontmatter'],
    content: content,
  }
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

  const { frontmatter, content } = project
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.join(' / ')
    : ''
  const hasCoverImage = frontmatter.cover && frontmatter.cover.length > 0

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-light mb-2">
          {frontmatter.title || 'Untitled Project'}
        </h1>
        <p className="font-semibold text-muted-foreground mb-8">{tags}</p>
        {hasCoverImage && (
          <img
            alt={frontmatter.title || 'Project cover image'}
            className="w-full rounded-lg mb-8"
            src={`/assets/images/headers/${frontmatter.cover}`}
          />
        )}
        <div>
          <div dangerouslySetInnerHTML={{ __html: frontmatter.embed || '' }} />
          <div className="markdownContent">
            <MDXRemote source={content || ''} />
          </div>
          <div className="row mt-12">
            <div className="col-xs-12 col-sm-4 col-md-4">
              {frontmatter.about && frontmatter.about.length > 0 && (
                <>
                  <h4 className="font-semibold text-lg mb-4">About</h4>
                  <p className="text-muted-foreground">{frontmatter.about}</p>
                </>
              )}
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              {frontmatter.components && frontmatter.components.length > 0 && (
                <>
                  <h4 className="font-semibold text-lg mb-4">Components</h4>
                  <ul className="space-y-2">
                    {frontmatter.components.map((node, index) => (
                      <li key={index} className="font-semibold">
                        <span className="text-sm"> {node[1]}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              {frontmatter.links && frontmatter.links.length > 0 && (
                <>
                  <h4 className="font-semibold text-lg mb-4">Links</h4>
                  <div className="space-y-2">
                    {frontmatter.links.map((node, index) => (
                      <a
                        key={index}
                        href={node[1]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full">
                          {node[0]}
                        </Button>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8 mt-8">
              {frontmatter.press && frontmatter.press.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-4">Recognition</h4>
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.press.map((node, index) => (
                      <span key={index} className="text-sm">
                        <a
                          target="_blank"
                          href={node[1]}
                          rel="noreferrer"
                          className="text-foreground underline hover:text-muted-foreground transition-colors"
                        >
                          {node[0]}
                        </a>
                        {' • '}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 mt-8">
              {frontmatter.credits && frontmatter.credits.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-4">Credits</h4>
                  <p
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: frontmatter.credits }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
