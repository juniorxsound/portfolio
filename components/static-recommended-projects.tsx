import React from 'react'
import Link from 'next/link'
import Picture from 'next-export-optimize-images/picture'
import { cn } from '@/lib/utils'

interface StaticRecommendedProjectsProps {
  className?: string
  title?: string
  limit?: number
}

// Static list of recommended projects - you can customize this
// To add more projects, simply add them to this array with the required fields:
// - path: The project slug (without leading slash)
// - title: Project title
// - excerpt: Short description
// - thumbnail: Image URL
// - tags: Array of tag strings
const staticProjects = [
  {
    path: '/covid19',
    title: 'COVID-19 Data Visualization',
    excerpt: 'Interactive data visualization tracking the spread of COVID-19',
    thumbnail: 'https://i.imgur.com/Gu2tbUp.png',
    tags: ['Data Visualization', 'WebGL', '3D'],
  },
  {
    path: '/worldcup',
    title: 'FIFA World Cup Analysis',
    excerpt: '3D analysis of key World Cup moments using machine learning',
    thumbnail: 'https://i.imgur.com/Gu2tbUp.png',
    tags: ['Machine Learning', '3D', 'Sports'],
  },
  {
    path: '/looking-glass',
    title: 'Vimeo through The Looking Glass',
    excerpt: 'Streaming holographic video content directly from Vimeo',
    thumbnail: 'https://i.imgur.com/Gu2tbUp.png',
    tags: ['VR', 'Video', 'WebGL'],
  },
  {
    path: '/depthkitjs',
    title: 'DepthKit.js',
    excerpt: 'JavaScript library for volumetric video playback',
    thumbnail: 'https://i.imgur.com/Gu2tbUp.png',
    tags: ['JavaScript', '3D', 'Library'],
  },
  {
    path: '/detune',
    title: 'Detune',
    excerpt: 'Interactive music visualization and audio processing',
    thumbnail: 'https://i.imgur.com/Gu2tbUp.png',
    tags: ['Audio', 'WebGL', 'Music'],
  },
  {
    path: '/myth',
    title: 'Myth',
    excerpt: 'Immersive storytelling experience using WebXR',
    thumbnail: 'https://i.imgur.com/Gu2tbUp.png',
    tags: ['WebXR', 'Storytelling', 'VR'],
  },
]

export function RecommendedProjects({
  className,
  title = 'More Projects',
  limit = 3,
}: StaticRecommendedProjectsProps) {
  const projects = staticProjects.slice(0, limit)

  return (
    <div className={cn('mt-12 pt-8 border-t border-border', className)}>
      <h3 className="text-xl font-semibold mb-6 text-foreground">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={`/projects${project.path}`}
            className="group rounded-lg border bg-card hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <Picture
                src={project.thumbnail}
                alt={project.title}
                width={400}
                height={225}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                {project.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.excerpt}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
