import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/bio', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '#footer', label: 'Contact' },
]

export function SiteNav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="flex items-center gap-4 text-sm font-normal text-white mix-blend-difference sm:gap-7"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="transition-opacity hover:opacity-60"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
