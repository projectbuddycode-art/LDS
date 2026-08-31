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

    let isDestroyed = false
    let tickerCleanup: (() => void) | undefined
    let rafId: number = 0

    const syncWithScrollTrigger = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        if (isDestroyed) return
        
        lenis.on('scroll', ScrollTrigger.update)
        
        const tick = (time: number) => {
          if (!isDestroyed) {
            lenis.raf(time * 1000)
          }
        }
        
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)
        
        tickerCleanup = () => {
          gsap.ticker.remove(tick)
        }
      } catch {
        // Fallback if GSAP is not loaded
      }
    }
    syncWithScrollTrigger()

    function raf(time: number) {
      if (isDestroyed) return
      if (!tickerCleanup) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      isDestroyed = true
      if (rafId) cancelAnimationFrame(rafId)
      if (tickerCleanup) tickerCleanup()
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
