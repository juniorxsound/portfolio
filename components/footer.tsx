import React from 'react'
import Link from 'next/link'
import { SocialIconsMinimal } from './social-icons-minimal'
import { ThemeToggle } from './theme-toggle'
import { ResumeLink } from './resume-link'
import { getFeaturedWriting, getProjects } from '@/lib/content'

export async function Footer() {
  const [projects, writing] = await Promise.all([
    getProjects(),
    getFeaturedWriting(),
  ])
  const featuredProjects = projects
    .filter((project) => project.frontmatter.featured === true)
    .filter((project) => project.frontmatter.title && project.frontmatter.path)
    .slice(0, 5)
  const featuredWriting = writing
    .filter((article) => article.frontmatter.title && article.frontmatter.href)
    .slice(0, 5)

  return (
    <footer className="bg-background font-sans text-foreground" id="footer">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <nav
          className="hidden grid-cols-2 gap-x-8 gap-y-12 sm:grid md:grid-cols-4"
          aria-label="Footer navigation"
        >
          <div>
            <Link
              href="/"
              className="text-[13px] font-normal text-foreground transition-colors hover:text-muted-foreground"
            >
              Home
            </Link>
          </div>
          <div>
            <Link
              href="/bio"
              className="text-[13px] font-normal text-foreground transition-colors hover:text-muted-foreground"
            >
              About
            </Link>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
              <Link
                href="/bio"
                className="transition-colors hover:text-foreground"
              >
                Bio
              </Link>
              <ResumeLink
                source="footer"
                className="transition-colors hover:text-foreground"
              >
                Résumé
              </ResumeLink>
            </div>
          </div>
          <div>
            <Link
              href="/projects"
              className="text-[13px] font-normal text-foreground transition-colors hover:text-muted-foreground"
            >
              Projects
            </Link>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
              {featuredProjects.map((project) => (
                <Link
                  key={project.frontmatter.path}
                  href={`/projects/${project.frontmatter.path!.replace(/^\//, '')}`}
                  className="transition-colors hover:text-foreground"
                >
                  {project.frontmatter.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <Link
              href="/#writing"
              className="text-[13px] font-normal text-foreground transition-colors hover:text-muted-foreground"
            >
              Writing
            </Link>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
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
            </div>
          </div>
        </nav>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-4 sm:mt-16 sm:flex-row sm:items-center sm:gap-6 sm:pt-6">
          <SocialIconsMinimal />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
