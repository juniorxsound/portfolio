import React from 'react'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

import type { Project } from '@/types'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function generateMetadata() {
  return {
    title: 'Or Fleisher',
    description:
      'Creative technologist, developer and artist working at the intersection of technology and storytelling.',
  }
}

async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), 'data/projects')
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))
  const projects = files
    .map((file) => {
      const fullPath = path.join(projectsDir, file)
      const { data } = matter.read(fullPath)
      return { frontmatter: data as Project['frontmatter'] }
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
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-9">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Or Fleisher is an award-winning creative technologist, developer
              and artist working at the intersection of technology and
              storytelling.
            </h1>
          </div>
        </div>
        <div className="row mb-12">
          <div className="col-xs-6 col-sm-4 col-md-3">
            <Link href="/bio">
              <Button variant="outline" className="w-full">
                Learn more
              </Button>
            </Link>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors w-full"
            >
              Contact
            </a>
          </div>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Recent work
          </h2>
          <div className="row">
            {projects.map((project) => {
              const fm = project.frontmatter
              const tags = Array.isArray(fm.tags) ? fm.tags.join(' / ') : ''
              return (
                <div
                  key={fm.path || 'unknown'}
                  className="col-xs-12 col-sm-6 col-md-4"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <Link
                      href={`/projects/${fm.path ? fm.path.replace(/^\//, '') : ''}`}
                      className="block"
                    >
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          alt={fm.path || 'project'}
                          src={`/assets/images/gifs${fm.path || ''}.gif`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {fm.title || 'Untitled Project'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-sm text-muted-foreground mb-2">
                          {tags}
                        </div>
                        <div className="text-sm text-foreground">
                          {fm.excerpt || ''}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              )
            })}
          </div>
        </section>
        <div id="contact" className="mt-16">
          <section className="mb-8">
            <div className="space-y-4">
              <p className="text-lg">
                Email me at{' '}
                <span className="font-semibold">contact(at)orfleisher.com</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
