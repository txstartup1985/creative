'use client'
import { useState, useEffect, useCallback } from 'react'

export function useImageSlider(count: number, intervalMs = 3000) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() =>
    setCurrent(c => (c + 1) % count), [count])

  const goTo = useCallback((index: number) =>
    setCurrent(index), [])

  useEffect(() => {
    const id = setInterval(next, intervalMs)
    return () => clearInterval(id)
  }, [next, intervalMs])

  return { current, goTo }
}
