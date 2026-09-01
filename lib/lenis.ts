'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function useLenis() {
  useEffect(() => {
    // Only initialize smooth wheel interpolation for precision pointers
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    })

    lenisInstance = lenis

    let isDestroyed = false
    let rafId: number = 0

    const syncWithScrollTrigger = async () => {
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        if (isDestroyed) return
        lenis.on('scroll', ScrollTrigger.update)
      } catch {
        // Fallback if GSAP is not loaded
      }
    }
    syncWithScrollTrigger()

    function raf(time: number) {
      if (isDestroyed) return
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Pause RAF when document is hidden to conserve GPU/CPU cycles
    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = 0
      } else if (!isDestroyed && !rafId) {
        rafId = requestAnimationFrame(raf)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      isDestroyed = true
      document.removeEventListener('visibilitychange', handleVisibility)
      if (rafId) cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

