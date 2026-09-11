'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { ECOSYSTEM_LOGOS } from '@/data/content'

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  // ── Viewport entry reveal ─────────────────────────────────────────────────
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
        // Header reveals
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'power3.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            }
          )
        })

        // Carousel container reveal
        const carousel = section.querySelector('.eco-carousel-viewport')
        if (carousel) {
          gsap.fromTo(carousel,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: { trigger: carousel, start: 'top 88%', once: true },
            }
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

  // ── Smooth manual carousel navigation (Left / Right buttons) ──────────────
  const handleScroll = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    setIsPaused(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)

    const scrollAmount = direction === 'left' ? -320 : 320
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' })

    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 3500)
  }, [])

  // ── Pointer Drag & Swipe Support ──────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current
    if (!track) return
    isDraggingRef.current = true
    startXRef.current = e.pageX - track.offsetLeft
    scrollLeftRef.current = track.scrollLeft
    setIsPaused(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    e.preventDefault()
    const track = trackRef.current
    if (!track) return
    const x = e.pageX - track.offsetLeft
    const walk = (x - startXRef.current) * 1.5
    track.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 3000)
  }

  // Double list for continuous seamless infinite loop (Single-line continuous moving logo spotlight)
  const doubledLogos = [...ECOSYSTEM_LOGOS, ...ECOSYSTEM_LOGOS]

  return (
    <section
      ref={sectionRef}
      className="section-py-dense"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--line-soft)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Our clients and trusted industry relationships"
    >
      <div className="site-container" style={{ marginBottom: '36px' }}>
        <div data-reveal className="section-label" style={{ marginBottom: '20px' }}>
          <span className="section-label-bullet" />
          <span className="t-label">03 — Our Clients &amp; Industry Relationships</span>
        </div>

        <div
          id="ecosystem-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'end',
          }}
        >
          <h2 data-reveal className="t-headline" style={{ maxWidth: '540px' }}>
            Trusted Relationships{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Across the Electrical Industry.</span>
          </h2>
          <div>
            <p
              data-reveal
              className="t-body"
              style={{ maxWidth: '440px', marginBottom: '24px' }}
            >
              Lukhdatar &amp; Sons maintains authorized stocking, system integration, and project joint ventures with India&apos;s leading electrical manufacturers and technology brands.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <a
                href="/partner-with-us"
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
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)'
                  e.currentTarget.style.color = 'var(--accent-gold)'
                  e.currentTarget.style.background = 'rgba(201,160,82,0.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Our Clients &amp; Relationships ↗
              </a>

              {/* ── Circular Carousel Navigation Arrows ── */}
              <div className="eco-nav-controls" aria-label="Ecosystem carousel controls">
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  className="eco-arrow-btn"
                  aria-label="Previous ecosystem brands"
                  title="Previous"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  className="eco-arrow-btn"
                  aria-label="Next ecosystem brands"
                  title="Next"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Single-Line Horizontal Moving Logo Spotlight (Seamless 30s Loop) ── */}
      <div className="eco-carousel-viewport">
        {/* Center Spotlight Effect */}
        <div className="eco-spotlight-beam" aria-hidden="true" />

        {/* Carousel Track */}
        <div
          ref={trackRef}
          className={`eco-track-wrapper ${isPaused ? 'is-paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!isDraggingRef.current) setIsPaused(false)
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="eco-carousel-track">
            {doubledLogos.map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="eco-logo-card"
                title={brand.name}
              >
                <div className="eco-card-ambient" aria-hidden="true" />
                <div className="eco-logo-frame">
                  <Image
                    src={brand.logo}
                    alt={brand.alt}
                    width={160}
                    height={70}
                    className="eco-logo-img"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical footer caption */}
      <div className="site-container" style={{ paddingTop: '28px' }}>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            opacity: 0.70,
          }}
        >
          Brands and industry relationships — Authorized Super Stockist of HPL, Lucy Electric, Huphen · System House of L&amp;T · JVs with CG Power &amp; Areva T&amp;D
        </div>
      </div>

      {/* ── Scoped Styles for Moving Spotlight Carousel ── */}
      <style>{`
        #ecosystem-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: end;
        }

        @media (max-width: 768px) {
          #ecosystem-header {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }

        /* ── Navigation Arrow Controls ── */
        .eco-nav-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .eco-arrow-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(201, 160, 82, 0.35);
          background: rgba(17, 24, 32, 0.85);
          backdrop-filter: blur(8px);
          color: var(--accent-gold);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          cursor: pointer;
          transition: all 280ms ease;
          user-select: none;
        }

        .eco-arrow-btn:hover {
          border-color: var(--accent-gold);
          background: rgba(201, 160, 82, 0.18);
          color: #FAF8F5;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(201, 160, 82, 0.20);
        }

        .eco-arrow-btn:active {
          transform: scale(0.95);
        }

        /* ── Carousel Viewport ── */
        .eco-carousel-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 12px 0;
        }

        /* ── Subtle Center Spotlight Effect ── */
        .eco-spotlight-beam {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(600px, 80vw);
          height: 200px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 3;
          background: radial-gradient(
            ellipse 50% 50% at center,
            rgba(201, 160, 82, 0.14) 0%,
            rgba(201, 160, 82, 0.04) 50%,
            transparent 75%
          );
        }

        /* ── Carousel Track Wrapper ── */
        .eco-track-wrapper {
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
          user-select: none;
        }

        .eco-track-wrapper::-webkit-scrollbar {
          display: none;
        }

        .eco-track-wrapper:active {
          cursor: grabbing;
        }

        /* ── Single-Line Continuous Horizontal Moving Track (Approx 32s cycle, seamless) ── */
        .eco-carousel-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: eco-marquee 32s linear infinite;
          will-change: transform;
        }

        .is-paused .eco-carousel-track {
          animation-play-state: paused;
        }

        @keyframes eco-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* ── Premium Logo Card ── */
        .eco-logo-card {
          flex-shrink: 0;
          width: clamp(170px, 14vw, 210px);
          height: 94px;
          background: #11171E;
          border: 1px solid rgba(201, 160, 82, 0.16);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          position: relative;
          overflow: hidden;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 300ms ease,
                      background-color 300ms ease,
                      box-shadow 300ms ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
        }

        .eco-card-ambient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(201, 160, 82, 0.08), transparent 70%);
          opacity: 0;
          transition: opacity 300ms ease;
          pointer-events: none;
        }

        .eco-logo-frame {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .eco-logo-img {
          width: auto;
          height: auto;
          max-width: 90%;
          max-height: 82%;
          object-fit: contain;
          object-position: center;
          opacity: 1;
          transition: transform 300ms ease, filter 300ms ease;
          filter: contrast(1.05);
        }

        /* ── Desktop Hover Interactions ── */
        @media (hover: hover) and (pointer: fine) {
          .eco-logo-card:hover {
            transform: translateY(-2px) scale(1.02);
            background: #151D26;
            border-color: rgba(201, 160, 82, 0.55);
            box-shadow: 0 8px 24px rgba(201, 160, 82, 0.14), 0 2px 8px rgba(0, 0, 0, 0.35);
            z-index: 2;
          }

          .eco-logo-card:hover .eco-card-ambient {
            opacity: 1;
          }

          .eco-logo-card:hover .eco-logo-img {
            opacity: 1;
            filter: contrast(1.08) brightness(1.02);
          }
        }

        /* ── Reduced Motion ── */
        @media (prefers-reduced-motion: reduce) {
          .eco-carousel-track {
            animation: none;
          }
          .eco-spotlight-beam {
            display: none;
          }
          .eco-logo-card {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
