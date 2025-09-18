import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ThemeProviderProps {
  defaultTheme?: string
  children: React.ReactNode
}

export function ThemeProvider({
  defaultTheme = 'dark',
  children,
}: ThemeProviderProps) {
  const [theme] = useState(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <div className={cn('min-h-screen', theme)}>
      {children}
    </div>
  )
}