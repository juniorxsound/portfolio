import { Project } from '@/types'
import { ProjectCard } from './project-card'

interface MoreProjectsProps {
  project: Project
  projects: Project[]
}

function getRelatedProjects(project: Project, projects: Project[]): Project[] {
  const tags = new Set(project.frontmatter.tags ?? [])
  const related = projects.filter(
    (candidate) =>
      candidate.filePath !== project.filePath &&
      candidate.frontmatter.tags?.some((tag) => tags.has(tag))
  )

  for (let index = related.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[related[index], related[randomIndex]] = [
      related[randomIndex],
      related[index],
    ]
  }

  return related.slice(0, 3)
}

export function MoreProjects({ project, projects }: MoreProjectsProps) {
  const relatedProjects = getRelatedProjects(project, projects)

  if (relatedProjects.length === 0) {
    return null
  }

  return (
    <section
      className="mt-24"
      aria-labelledby="related-projects-title"
    >
      <h2 id="related-projects-title" className="mb-8">
        Related Projects
      </h2>
      <div className="portfolio-mosaic-grid grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
        {relatedProjects.map((relatedProject, index) => (
          <ProjectCard
            key={relatedProject.frontmatter.path || relatedProject.filePath}
            project={relatedProject}
            className={index === 2 ? 'hidden md:block' : undefined}
          />
        ))}
      </div>
    </section>
  )
}
