'use client'
import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sectionIds])

  return active
}
