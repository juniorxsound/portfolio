import type { MDXComponents } from 'mdx/types'
import { ProjectComponents } from '@/components/project-components'
import { AutoComponentsTable } from '@/components/auto-components-table'
import { Collapsible } from '@/components/ui/collapsible'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components: MDXComponents = {
  // Allows customizing built-in components, e.g. to add styling.
  wrapper: ({ children }) => <div className="prose">{children}</div>,
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mb-4 text-foreground">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mb-3 text-foreground">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold mb-2 text-foreground">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-bold mb-1 text-foreground">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-base text-muted-foreground">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-4 text-muted-foreground">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-4 text-muted-foreground">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-primary underline hover:no-underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-muted p-4 rounded-md overflow-x-auto">{children}</pre>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-muted px-1 py-0.5 rounded">
      {children}
    </code>
  ),
  table: ({ children }) => (
    <table className="w-full border-collapse">{children}</table>
  ),
  th: ({ children }) => (
    <th className="border border-border px-4 py-2">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-4 py-2">{children}</td>
  ),
  img: (props) => (
    <img sizes="100vw" style={{ width: '100%', height: 'auto' }} {...props} />
  ),
  // Custom components for MDX
  ProjectComponents,
  AutoComponentsTable,
  Collapsible,
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
