# Portfolio

A minimalist portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Static Generation**: Optimized builds with `output: 'export'`
- **MDX Content**: Project pages auto-generated from MDX files
- **Responsive Design**: Mobile-first with Tailwind CSS
- **SEO Optimized**: Auto-generated sitemap and metadata
- **Dark/Light Mode**: Theme switching support

## Development

```bash
npm install
npm run dev
```

## Deployment

- **Staging**: Automatically deployed to staging environment on every push to the `dev` branch
- **Production**: Automatically deployed to production environment on every push to the `master` branch

## Project Structure

- `content/projects/` - MDX project files
- `app/` - Next.js app router pages
- `components/` - Reusable React components
- `lib/` - Utilities and constants
