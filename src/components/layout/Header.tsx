'use client'
import { useCallback } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { navItems } from '@/lib/data'
import { useActiveSection } from '@/hooks/useActiveSection'

const sectionIds = navItems.map(item => item.href.replace('#', ''))

export function Header() {
  const active = useActiveSection(sectionIds)

  const scrollTo = useCallback((href: string) => {
    const id = href.replace('#', '')
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-[#121212] border-b border-[#2a2a2a]">
      <div className="flex items-center justify-between h-[140px] px-[60px] max-lg:px-[40px] max-md:px-[20px] max-md:h-auto max-md:py-4">

        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-4 shrink-0"
          aria-label="Go to top"
        >
          {/* Angled logo mark */}
          <div
            className="w-[80px] h-[80px] max-md:w-[40px] max-md:h-[40px] flex items-center justify-center bg-gradient-to-br from-[#555] to-[#333] shrink-0"
            style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}
          >
            <span className="text-[#d0d0d0] font-bold text-xl max-md:text-sm select-none">CS</span>
          </div>
          <div className="text-left">
            <h1 className="text-[#d0d0d0] text-2xl max-md:text-lg font-semibold leading-tight tracking-wide">
              Creative Studio
            </h1>
            <p className="text-[#777] text-xs uppercase tracking-[2px]">Minimal Design</p>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map(item => {
            const id = item.href.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={[
                  'relative h-[60px] px-5 text-sm uppercase tracking-[1px] transition-colors duration-300 cursor-pointer',
                  isActive
                    ? 'text-white bg-[#333]'
                    : 'text-[#999] hover:text-[#d0d0d0] hover:bg-[#222]',
                ].join(' ')}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Mobile nav — shadcn Sheet */}
        <Sheet>
          <SheetTrigger
            className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[2px] bg-[#d0d0d0]" />
            <span className="block w-6 h-[2px] bg-[#d0d0d0]" />
            <span className="block w-6 h-[2px] bg-[#d0d0d0]" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#121212] border-l border-[#2a2a2a] w-[260px]">
            <nav className="flex flex-col gap-2 mt-10">
              {navItems.map(item => {
                const id = item.href.replace('#', '')
                const isActive = active === id
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={[
                      'text-left px-4 py-3 text-sm uppercase tracking-[1px] transition-colors duration-200 border-l-2',
                      isActive
                        ? 'text-[#d0d0d0] border-[#555] bg-[#222]'
                        : 'text-[#999] border-transparent hover:text-[#d0d0d0] hover:border-[#444]',
                    ].join(' ')}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}
