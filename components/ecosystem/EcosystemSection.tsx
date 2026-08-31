'use client'

import { useEffect, useRef, useState } from 'react'
import { ECOSYSTEM_BRANDS } from '@/data/content'

// Split brands into two tracks
const TRACK_A = ECOSYSTEM_BRANDS.slice(0, 14)
const TRACK_B = ECOSYSTEM_BRANDS.slice(14)

function BrandTrack({ brands, reverse = false, activeIdx }: {
  brands: string[]
  reverse?: boolean
  activeIdx: number
}) {
  const doubled = [...brands, ...brands]
  return (
    <div
      style={{
        position: 'relative',
        borderTop: '1px solid var(--line-soft)',
        borderBottom: '1px solid var(--line-soft)',
        overflow: 'hidden',
        padding: '18px 0',
        marginBottom: '1px',
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
        background: 'linear-gradient(to right, var(--bg-secondary), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
        background: 'linear-gradient(to left, var(--bg-secondary), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <div className={reverse ? 'eco-track-reverse' : 'eco-track'}>
        {doubled.map((brand, i) => {
          const isActive = i % brands.length === activeIdx % brands.length
          return (
            <div
              key={`${brand}-${i}`}
              className="eco-brand-item"
              style={{
                flexShrink: 0,
                padding: '0 28px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              {/* Connector line */}
              <div style={{
                width: '1px',
                height: '16px',
                background: isActive ? 'var(--accent-gold)' : 'var(--technical-line)',
                transition: 'background 400ms ease',
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: isActive ? '12px' : '11px',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: isActive ? '0.04em' : '0.06em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
                opacity: isActive ? 1 : 0.60,
                transition: 'all 400ms ease',
                transform: isActive ? 'translateY(0)' : 'translateY(0)',
              }}>
                {brand}
              </span>
              {/* Active dot */}
              {isActive && (
                <div style={{
                  width: '4px', height: '4px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold)',
                  flexShrink: 0,
                  opacity: 0.8,
                }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Cycle spotlight slowly
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % TRACK_A.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

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
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 20, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            }
          )
        })
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
      className="section-py-dense"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Industry ecosystem — suppliers and partners"
    >
      <div className="site-container" style={{ marginBottom: '48px' }}>
        <div data-reveal className="section-label" style={{ marginBottom: '20px' }}>
          <span className="section-label-bullet" />
          <span className="t-label">03 — Industry Ecosystem</span>
        </div>

        <div id="ecosystem-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'end' }}>
          <h2 data-reveal className="t-headline">
            Built through
            <br />
            relationships that{' '}
            <span style={{ color: 'var(--accent-gold)' }}>power industry.</span>
          </h2>
          <div>
            <p data-reveal className="t-body" style={{ maxWidth: '400px', marginBottom: '24px' }}>
              Lukhdatar & Sons works with India&apos;s leading electrical manufacturers and suppliers —
              ensuring every project is built with the right equipment from verified supply chains.
            </p>
            <a
              href="#capabilities"
              data-reveal
              className="cta-btn"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: '1px solid var(--line)',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)'
                e.currentTarget.style.color = 'var(--accent-gold)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              View Capabilities ↗
            </a>
          </div>
        </div>
      </div>

      {/* Industrial ecosystem tracks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <BrandTrack brands={TRACK_A} activeIdx={activeIdx} />
        <BrandTrack brands={TRACK_B} reverse activeIdx={activeIdx} />
      </div>

      {/* Technical note */}
      <div className="site-container" style={{ paddingTop: '24px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          opacity: 0.65,
        }}>
          Established supply chain relationships — equipment sourced from verified manufacturers
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #ecosystem-header {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        .eco-track {
          display: flex;
          animation: eco-scroll-left 36s linear infinite;
        }
        .eco-track-reverse {
          display: flex;
          animation: eco-scroll-right 42s linear infinite;
        }
        @keyframes eco-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes eco-scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .eco-track:hover,
        .eco-track-reverse:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .eco-track, .eco-track-reverse { animation: none; }
        }
      `}</style>
    </section>
  )
}
