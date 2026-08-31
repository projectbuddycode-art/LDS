'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { MEDIA } from '@/data/media'
import { INDUSTRIES } from '@/data/content'

// Per-industry object-position for optimal video framing
const OBJECT_POSITIONS: Record<string, string> = {
  education:      'center 25%',
  commercial:     'center 20%',
  residential:    'center 22%',
  medical:        'center 20%',
  township:       'center 28%',
  warehousing:    'center 25%',
  manufacturing:  'center 22%',
}

const POSTER_MAP: Record<string, string> = {
  education:      '/media/posters/campus.jpg',
  commercial:     '/media/posters/commercial.jpg',
  residential:    '/media/posters/residential.jpg',
  medical:        '/media/posters/hospital.jpg',
  township:       '/media/posters/township.jpg',
  warehousing:    '/media/posters/warehouse.jpg',
  manufacturing:  '/media/posters/industrial.jpg',
}

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndexRef = useRef<number>(0)
  
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0)

  // Controlled video playback helper
  const updateVideoPlayback = useCallback((activeIdx: number) => {
    const refs = isMobile ? mobileVideoRefs.current : desktopVideoRefs.current
    refs.forEach((vid, i) => {
      if (!vid) return
      if (i === activeIdx) {
        const promise = vid.play()
        if (promise !== undefined) {
          promise.catch(() => {})
        }
      } else {
        vid.pause()
      }
    })
  }, [isMobile])

  // Viewport intersection observer to play active video when section is in view
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      updateVideoPlayback(isMobile ? mobileActiveIndex : activeIndexRef.current)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        updateVideoPlayback(isMobile ? mobileActiveIndex : activeIndexRef.current)
      } else {
        const refs = isMobile ? mobileVideoRefs.current : desktopVideoRefs.current
        refs.forEach((vid) => { if (vid) vid.pause() })
      }
    }, { rootMargin: '200px' })

    observer.observe(el)
    return () => observer.disconnect()
  }, [isMobile, mobileActiveIndex, updateVideoPlayback])

  // Handle responsive breakpoint
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile((prev) => (prev !== mobile ? mobile : prev))
    }
    checkMobile()
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkMobile, 150)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // DOM active style update helper
  const updateCardDOMStyles = useCallback((activeIdx: number) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const isCurrent = i === activeIdx
      const topBar = card.querySelector('[data-active-bar]') as HTMLElement
      const label = card.querySelector('[data-card-label]') as HTMLElement
      const number = card.querySelector('[data-card-num]') as HTMLElement
      const line = card.querySelector('[data-card-line]') as HTMLElement

      if (topBar) topBar.style.opacity = isCurrent ? '1' : '0'
      if (label) {
        label.style.color = isCurrent ? '#FAF8F5' : 'rgba(250,248,245,0.70)'
        label.style.fontWeight = isCurrent ? '600' : '500'
      }
      if (number) number.style.opacity = isCurrent ? '1' : '0.6'
      if (line) {
        line.style.width = isCurrent ? '32px' : '16px'
        line.style.opacity = isCurrent ? '0.9' : '0.4'
      }
    })
  }, [])

  // Desktop GSAP Horizontal Scroll Pinning
  useEffect(() => {
    let isUnmounted = false
    let ctx: any
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || isMobile) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (isUnmounted) return

      ctx = gsap.context(() => {
        const numCards = INDUSTRIES.length

        const getDistance = () => {
          const trackWidth = track.scrollWidth
          const containerWidth = section.clientWidth
          return Math.max(0, trackWidth - containerWidth + 48)
        }

        const distance = getDistance()

        if (distance > 0) {
          updateVideoPlayback(0)
          updateCardDOMStyles(0)

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              scrub: 0.6,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress
                const cardIndex = Math.min(
                  Math.floor(progress * numCards),
                  numCards - 1
                )

                if (cardIndex !== activeIndexRef.current) {
                  activeIndexRef.current = cardIndex
                  updateVideoPlayback(cardIndex)
                  updateCardDOMStyles(cardIndex)
                }

                cardRefs.current.forEach((card, i) => {
                  if (!card) return
                  const cardProgress = i / (numCards - 1)
                  const diff = Math.abs(progress - cardProgress) * (numCards - 1)
                  const scale = Math.max(0.95, 1 - diff * 0.035)
                  const opacity = Math.max(0.55, 1 - diff * 0.35)
                  card.style.transform = `scale3d(${scale}, ${scale}, 1)`
                  card.style.opacity = String(opacity)
                })
              },
            },
          })

          tl.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            duration: 1,
          })
        }

        const headerEl = section.querySelector('[data-header]')
        if (headerEl) {
          gsap.fromTo(headerEl,
            { y: 20, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
              scrollTrigger: { trigger: headerEl, start: 'top 88%', once: true },
            }
          )
        }
      }, section)
    }

    const timer = setTimeout(init, 100)
    return () => {
      isUnmounted = true
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [isMobile, updateVideoPlayback, updateCardDOMStyles])

  // Mobile tap handler
  const handleMobileCardTap = (index: number) => {
    setMobileActiveIndex(index)
    updateVideoPlayback(index)
  }

  return (
    <section
      ref={sectionRef}
      id="industries"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--line-soft)',
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-label="Industries served"
    >
      {/* Section header */}
      <div
        data-header
        className="site-container"
        style={{ paddingTop: 'var(--section-py)', paddingBottom: '36px' }}
      >
        <div className="section-label" style={{ marginBottom: '20px' }}>
          <span className="section-label-bullet" />
          <span className="t-label">11 — Industries</span>
        </div>
        <div id="industries-header" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(24px, 4vw, 64px)',
          alignItems: 'end',
        }}>
          <h2 className="t-headline">
            Every sector.
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>One standard.</span>
          </h2>
          <p className="t-body" style={{ maxWidth: '380px' }}>
            From manufacturing plants and hospitals to commercial complexes, warehouses
            and educational campuses — Lukhdatar & Sons delivers the same engineering rigour across
            every environment.
          </p>
        </div>
      </div>

      {/* ── Desktop: Pinned Cinematic Horizontal Scroll ── */}
      {!isMobile && (
        <div style={{ overflow: 'hidden', paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '12px',
              paddingLeft: 'var(--container-px)',
              paddingRight: 'var(--container-px)',
              width: 'max-content',
              willChange: 'transform',
              alignItems: 'flex-end',
            }}
          >
            {INDUSTRIES.map((industry, index) => {
              const videoSrc = MEDIA.industries[industry.mediaKey]
              const objPos = OBJECT_POSITIONS[industry.mediaKey] || 'center center'
              const isInitialActive = index === 0

              return (
                <div
                  key={industry.id}
                  ref={(el) => { cardRefs.current[index] = el }}
                  data-industry-card
                  aria-label={`Industry: ${industry.label}`}
                  style={{
                    flexShrink: 0,
                    width: 'clamp(280px, 26vw, 380px)',
                    height: 'clamp(380px, 48vh, 520px)',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    transformOrigin: 'bottom center',
                    willChange: 'transform, opacity',
                    cursor: 'default',
                    borderBottom: '2px solid transparent',
                  }}
                >
                  {/* Video wrapper */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <video
                      ref={(el) => { desktopVideoRefs.current[index] = el }}
                      src={videoSrc}
                      poster={POSTER_MAP[industry.mediaKey]}
                      autoPlay={isInitialActive}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      aria-hidden="true"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: objPos,
                        display: 'block',
                        transform: 'none',
                      }}
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,14,18,0.85) 0%, rgba(10,14,18,0.20) 60%, transparent 100%)',
                    zIndex: 2,
                  }} />

                  {/* Active indicator top bar */}
                  <div
                    data-active-bar
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-gold)',
                      zIndex: 4,
                      opacity: isInitialActive ? 1 : 0,
                      transition: 'opacity 300ms ease',
                    }}
                  />

                  {/* Card label & metadata */}
                  <div style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '20px',
                    right: '20px',
                    zIndex: 3,
                  }}>
                    <div
                      data-card-num
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        color: 'var(--accent-gold)',
                        marginBottom: '6px',
                        opacity: isInitialActive ? 1 : 0.6,
                        transition: 'opacity 300ms ease',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div
                      data-card-label
                      style={{
                        fontSize: 'clamp(16px, 1.4vw, 22px)',
                        fontWeight: isInitialActive ? 600 : 500,
                        color: isInitialActive ? '#FAF8F5' : 'rgba(250,248,245,0.70)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                        transition: 'color 300ms ease',
                      }}
                    >
                      {industry.label}
                    </div>
                    <div
                      data-card-line
                      style={{
                        width: isInitialActive ? '32px' : '16px',
                        height: '1px',
                        background: 'var(--accent-gold)',
                        marginTop: '10px',
                        opacity: isInitialActive ? 0.9 : 0.4,
                        transition: 'width 300ms ease, opacity 300ms ease',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Mobile: Vertical Accordion Card Stack ── */}
      {isMobile && (
        <div style={{ padding: '0 var(--container-px) clamp(40px, 8vw, 60px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {INDUSTRIES.map((industry, index) => {
              const videoSrc = MEDIA.industries[industry.mediaKey]
              const isActive = index === mobileActiveIndex
              const objPos = OBJECT_POSITIONS[industry.id] || 'center 25%'

              return (
                <div
                  key={industry.id}
                  onClick={() => handleMobileCardTap(index)}
                  role="button"
                  aria-label={`${industry.label} — ${isActive ? 'active' : 'tap to activate'}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleMobileCardTap(index)}
                  style={{
                    position: 'relative',
                    height: isActive ? 'clamp(220px, 55vw, 300px)' : '72px',
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'height 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                    borderBottom: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
                  }}
                >
                  {/* Video / Poster */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <video
                      ref={(el) => { mobileVideoRefs.current[index] = el }}
                      src={videoSrc}
                      poster={POSTER_MAP[industry.mediaKey]}
                      autoPlay={isActive}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      aria-hidden="true"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: objPos,
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Gradient */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive
                      ? 'linear-gradient(to top, rgba(10,14,18,0.85) 0%, rgba(10,14,18,0.20) 60%, transparent 100%)'
                      : 'linear-gradient(to right, rgba(10,14,18,0.85) 0%, rgba(10,14,18,0.60) 100%)',
                    zIndex: 2,
                    transition: 'background 400ms ease',
                  }} />

                  {/* Content */}
                  <div style={{
                    position: 'absolute',
                    bottom: isActive ? '20px' : '0',
                    top: isActive ? 'auto' : '0',
                    left: '20px',
                    right: '20px',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: isActive ? 'column' : 'row',
                    alignItems: isActive ? 'flex-start' : 'center',
                    justifyContent: isActive ? 'flex-end' : 'space-between',
                    transition: 'all 400ms ease',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        color: 'var(--accent-gold)',
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontSize: isActive ? '18px' : '15px',
                        fontWeight: isActive ? 600 : 500,
                        color: '#FAF8F5',
                        letterSpacing: '-0.01em',
                        transition: 'font-size 300ms ease',
                      }}>
                        {industry.label}
                      </span>
                    </div>

                    {!isActive && (
                      <span style={{
                        fontSize: '11px',
                        color: 'rgba(250,248,245,0.40)',
                        letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                      }}>
                        Expand +
                      </span>
                    )}

                    {isActive && (
                      <div style={{
                        width: '32px',
                        height: '1px',
                        background: 'var(--accent-gold)',
                        marginTop: '8px',
                      }} />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          #industries-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
