'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import LazyVideo from '@/components/LazyVideo'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // ── Premium cinematic text reveal ─────────────────────────────────────────
  useEffect(() => {
    let isUnmounted = false
    let ctx: any
    const section = sectionRef.current
    if (!section) return

    const init = async () => {
      const { gsap } = await import('gsap')
      if (isUnmounted) return

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.25 })

        // 1. Eyebrow / section label
        const label = section.querySelector('[data-hero-label]')
        if (label) {
          tl.fromTo(label,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
          )
        }

        // 2. Headline lines — masked clip reveal (each line independently)
        const lines = section.querySelectorAll('[data-hero-line]')
        lines.forEach((line, i) => {
          tl.fromTo(line,
            { y: 32, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
            {
              y: 0,
              opacity: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.9,
              ease: 'expo.out',
            },
            // stagger each line by 100ms after the previous, overlap with label
            i === 0 ? '-=0.25' : '-=0.78'
          )
        })

        // 3. Supporting paragraph
        const para = section.querySelector('[data-hero-para]')
        if (para) {
          tl.fromTo(para,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
            '-=0.50'
          )
        }

        // 4. CTA row
        const ctas = section.querySelector('[data-hero-cta]')
        if (ctas) {
          tl.fromTo(ctas,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
            '-=0.38'
          )
        }

        // 5. Bottom detail (Est. 1997 + Scroll indicator)
        section.querySelectorAll('[data-hero-detail]').forEach((el, i) => {
          tl.fromTo(el,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' },
            i === 0 ? '-=0.30' : '<'
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
      className="hero-root"
      id="hero"
      aria-label="Hero — Lukhdatar & Sons"
    >
      {/* ── Full-bleed video background ─────────────────── */}
      <div className="hero-video-wrapper" aria-hidden="true">
        <LazyVideo
          src={MEDIA.heroVideo}
          poster="/media/posters/hero-bg.jpg"
          preloadImmediate={true}
          autoPlay
          muted
          playsInline
          loop
          aria-hidden="true"
        />
      </div>

      {/* ── Cinematic gradient overlay ──────────────────── */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* ── Content layer ──────────────────────────────── */}
      <div className="hero-content">
        <div className="site-container" style={{ position: 'relative', width: '100%' }}>

          {/* Two-column grid: text LEFT (40–44%), video takes right implicitly */}
          <div className="hero-text-col">

            {/* 1. Eyebrow label */}
            <div
              data-hero-label
              className="section-label"
              style={{ marginBottom: '20px' }}
            >
              <span className="section-label-bullet" />
              <span className="t-label" style={{ color: 'rgba(250,248,245,0.55)' }}>
                Lukhdatar & Sons
              </span>
            </div>

            {/* 2. Headline — each line wrapped for masked reveal */}
            <h1 className="hero-headline" aria-label="Powering the infrastructure behind what's next.">
              <span
                data-hero-line
                className="hero-headline-line"
              >
                Powering the
              </span>
              <span
                data-hero-line
                className="hero-headline-line"
              >
                infrastructure
              </span>
              <span
                data-hero-line
                className="hero-headline-line hero-headline-gold"
              >
                behind what&apos;s next.
              </span>
            </h1>

            {/* 3. Supporting paragraph */}
            <p
              data-hero-para
              className="hero-para"
            >
              Complete electrical infrastructure — engineering, supply, installation,
              testing and commissioning delivered as one accountable scope.
            </p>

            {/* 4. CTA row */}
            <div data-hero-cta className="hero-cta-row">
              <a
                href="#capabilities"
                className="cta-btn"
                style={{ color: '#FAF8F5', borderColor: 'rgba(250,248,245,0.32)' }}
              >
                Explore Capabilities <span className="cta-arrow">↗</span>
              </a>
              <a
                href="#projects"
                className="cta-btn"
                style={{ color: 'rgba(250,248,245,0.60)', borderColor: 'rgba(250,248,245,0.15)' }}
              >
                View Projects <span className="cta-arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Est. 1997 detail — bottom left, outside text col */}
          <div
            data-hero-detail
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{ width: '20px', height: '1px', background: 'var(--line-gold)', opacity: 0.6 }} />
            <span style={{
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,245,0.35)',
            }}>
              Est. 1997 · Kolkata
            </span>
          </div>

          {/* Scroll indicator — bottom right */}
          <div
            data-hero-detail
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={{ width: '1px', height: '44px', background: 'rgba(250,248,245,0.22)' }} />
            <span style={{
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,245,0.38)',
              writingMode: 'vertical-rl',
              paddingBottom: '8px',
            }}>
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Scoped responsive styles */}
      <style>{`
        /* ── Hero text column ── */
        .hero-text-col {
          width: 44%;
          max-width: 580px;
          min-width: 280px;
        }

        /* ── Hero headline ── */
        .hero-headline {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 24px;
          font-size: clamp(40px, 4.8vw, 68px);
          font-weight: 600;
          letter-spacing: -0.023em;
          line-height: 1.03;
          color: #FAF8F5;
        }

        .hero-headline-line {
          display: block;
          overflow: hidden;
        }

        .hero-headline-gold {
          color: var(--accent-gold);
        }

        /* ── Supporting paragraph ── */
        .hero-para {
          font-size: clamp(14px, 1.05vw, 16px);
          color: rgba(250,248,245,0.68);
          line-height: 1.70;
          max-width: 480px;
          margin-bottom: 32px;
        }

        /* ── CTA row ── */
        .hero-cta-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ── Tablet: widen text column slightly ── */
        @media (max-width: 1024px) {
          .hero-text-col {
            width: 52%;
            max-width: 540px;
          }
          .hero-headline {
            font-size: clamp(36px, 5vw, 56px);
          }
        }

        /* ── Mobile: full width, stack ── */
        @media (max-width: 768px) {
          .hero-text-col {
            width: 100%;
            max-width: 100%;
          }
          .hero-headline {
            font-size: clamp(32px, 8vw, 48px);
          }
          .hero-para {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
