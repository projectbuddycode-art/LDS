'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 2,
    })

    lenisInstance = lenis

    // Integrate with GSAP ScrollTrigger — critical for pinned sections
    let tickerCleanup: (() => void) | undefined

    const syncWithScrollTrigger = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        lenis.on('scroll', ScrollTrigger.update)
        
        const tick = (time: number) => {
          lenis.raf(time * 1000)
        }
        
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)
        
        tickerCleanup = () => {
          gsap.ticker.remove(tick)
        }
      } catch {
        // Fallback RAF if GSAP not loaded
      }
    }
    syncWithScrollTrigger()

    function raf(time: number) {
      if (!tickerCleanup) {
        lenis.raf(time)
      }
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      if (tickerCleanup) tickerCleanup()
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
