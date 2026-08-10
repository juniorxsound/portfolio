import React from 'react'
import Link from 'next/link'
import { SocialIconsMinimal } from './social-icons-minimal'
import { ThemeToggle } from './theme-toggle'
import { getFeaturedWriting, getProjects } from '@/lib/content'

export async function Footer() {
  const featuredProjects = (await getProjects())
    .filter((project) => project.frontmatter.featured === true)
    .filter((project) => project.frontmatter.title && project.frontmatter.path)
    .slice(0, 5)
  const featuredWriting = (await getFeaturedWriting())
    .filter((article) => article.frontmatter.title && article.frontmatter.href)
    .slice(0, 5)

  return (
    <footer className="bg-background font-sans text-foreground" id="footer">
      <div className="container mx-auto px-6 py-16 md:px-10 md:py-24">
        <nav className="hidden grid-cols-2 gap-x-8 gap-y-12 sm:grid md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Home
            </Link>
          </div>
          <div>
            <Link
              href="/bio"
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              About
            </Link>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
              <Link href="/bio" className="transition-colors hover:text-foreground">
                Bio
              </Link>
              <Link
                href="/resume"
                prefetch={false}
                className="transition-colors hover:text-foreground"
              >
                Résumé
              </Link>
            </nav>
          </div>
          <div>
            <Link
              href="/projects"
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Projects
            </Link>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
              {featuredProjects.map((project) => (
                <Link
                  key={project.frontmatter.path}
                  href={`/projects/${project.frontmatter.path!.replace(/^\//, '')}`}
                  className="transition-colors hover:text-foreground"
                >
                  {project.frontmatter.title}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <Link
              href="/#writing"
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Writing
            </Link>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
              {featuredWriting.map((article) => (
                <a
                  key={article.frontmatter.href}
                  href={article.frontmatter.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {article.frontmatter.title}
                </a>
              ))}
            </nav>
          </div>
        </nav>

        <nav className="flex flex-wrap items-center justify-between gap-4 text-sm text-foreground sm:hidden">
          <Link href="/" className="transition-colors hover:text-muted-foreground">
            Home
          </Link>
          <Link href="/bio" className="transition-colors hover:text-muted-foreground">
            About
          </Link>
          <Link
            href="/projects"
            className="transition-colors hover:text-muted-foreground"
          >
            Projects
          </Link>
          <Link
            href="/#writing"
            className="transition-colors hover:text-muted-foreground"
          >
            Writing
          </Link>
        </nav>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-4 sm:mt-16 sm:flex-row sm:items-center sm:gap-6 sm:pt-6">
          <SocialIconsMinimal />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
