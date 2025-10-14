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

- **Staging**: `gcloud app deploy app-staging.yaml --project=orfleisher-staging`
- **Production**: `gcloud app deploy --project=orfleisher-production`

## Project Structure

- `content/projects/` - MDX project files
- `app/` - Next.js app router pages
- `components/` - Reusable React components
- `lib/` - Utilities and constants
