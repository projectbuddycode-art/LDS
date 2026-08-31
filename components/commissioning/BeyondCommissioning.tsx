'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import { LIFECYCLE_STAGES } from '@/data/content'
import LazyVideo from '@/components/LazyVideo'

export default function BeyondCommissioning() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let isUnmounted = false
    let ctx: any
    const section = sectionRef.current
    if (!section) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (isUnmounted) return

      ctx = gsap.context(() => {
        // Left video enters from left
        const visual = section.querySelector('[data-visual]')
        if (visual) {
          gsap.fromTo(visual,
            { x: -32, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 80%', once: true } }
          )
        }
        // Right text enters from right
        const textSide = section.querySelector('[data-text-side]')
        if (textSide) {
          gsap.fromTo(textSide,
            { x: 32, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
              scrollTrigger: { trigger: section, start: 'top 80%', once: true } }
          )
        }
      }, section)

    }
    init()
    return () => {
      isUnmounted = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-py"
      style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Beyond commissioning — lifecycle support"
    >
      <div className="site-container">
        <div id="commissioning-grid" className="two-col" style={{ alignItems: 'center' }}>

          {/* LEFT — Video */}
          <div data-visual className="media-frame" style={{ aspectRatio: '16/9' }}>
            <LazyVideo src={MEDIA.beyondCommissioning} poster="/media/posters/beyond-commissioning.jpg"
              aria-label="Infrastructure maintenance and lifecycle support" />
          </div>

          {/* RIGHT — Text */}
          <div data-text-side>
            <div className="section-label">
              <span className="section-label-bullet" />
              <span className="t-label">10 — Beyond Commissioning</span>
            </div>

            <h2 className="t-headline" style={{ marginBottom: '20px' }}>
              Beyond
              <br />
              <span style={{ color: 'var(--accent-gold)' }}>commissioning.</span>
            </h2>

            <p className="t-body" style={{ maxWidth: '440px', marginBottom: '40px' }}>
              Electrical assets require continuous operational oversight after energisation. Lukhdatar & Sons provides routine maintenance, transformer oil filtration, breaker servicing, and lifecycle repair support for completed projects and existing client installations.
            </p>

            <div className="lifecycle-flow">
              {LIFECYCLE_STAGES.map((stage) => (
                <div key={stage.number} className="lifecycle-item">
                  <span className="lifecycle-number">{stage.number}</span>
                  <span className="lifecycle-label">{stage.label}</span>
                  {parseInt(stage.number) > 5 && (
                    <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                      Post-Commissioning
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #commissioning-grid {
          grid-template-columns: 60fr 40fr;
        }
        @media (max-width: 768px) {
          #commissioning-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          #commissioning-grid [data-visual] {
            aspect-ratio: 16/9 !important;
          }
        }
      `}</style>
    </section>
  )
}
