import fs from 'fs'
import path from 'path'
import { notFound, permanentRedirect } from 'next/navigation'

type LegacySet = Set<string>

function normalizePath(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return '/'
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.replace(/\/$/, '') || '/'
}

function buildLegacySet(): LegacySet {
  const projectsDir = path.join(process.cwd(), 'content', 'projects')
  let files: string[] = []
  try {
    files = fs.readdirSync(projectsDir).filter((name) => name.endsWith('.mdx'))
  } catch {
    return new Set()
  }

  const entries: LegacySet = new Set()
  for (const fileName of files) {
    const slug = fileName.replace(/\.mdx$/, '')
    const filePath = path.join(projectsDir, fileName)
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const match = content.match(
        /export\s+const\s+metadata\s*=\s*\{[\s\S]*?path:\s*['\"]([^'\"]+)['\"]/
      )
      if (match && match[1]) {
        const legacyPath = normalizePath(match[1])
        const seg = legacyPath.replace(/^\//, '')
        if (seg) entries.add(seg)
      } else {
        // Fallback: old scheme was "/:slug"
        if (slug) entries.add(slug)
      }
    } catch {
      // Ignore
    }
  }
  return entries
}

// Build once at module load; Node runtime on App Engine allows FS access.
const legacySet = buildLegacySet()

export const dynamicParams = false

export async function generateStaticParams() {
  return Array.from(legacySet).map((legacy) => ({ legacy }))
}

export default function LegacyRedirect({
  params,
}: {
  params: { legacy: string }
}) {
  const legacySeg = (params.legacy || '').trim()
  if (legacySeg && legacySet.has(legacySeg)) {
    permanentRedirect(`/projects/${legacySeg}`)
  }
  notFound()
}
