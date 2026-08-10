'use client'

import * as React from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = mounted ? theme : undefined

  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-background p-0.5 text-foreground"
      role="group"
      aria-label="Theme"
    >
      <Button
        variant={activeTheme === 'system' ? 'default' : 'ghost'}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme('system')}
        aria-pressed={activeTheme === 'system'}
        aria-label="Use system theme"
      >
        <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
      <Button
        variant={activeTheme === 'light' ? 'default' : 'ghost'}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme('light')}
        aria-pressed={activeTheme === 'light'}
        aria-label="Use light theme"
      >
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
      <Button
        variant={activeTheme === 'dark' ? 'default' : 'ghost'}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme('dark')}
        aria-pressed={activeTheme === 'dark'}
        aria-label="Use dark theme"
      >
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
    </div>
  )
}
