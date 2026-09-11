'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { MEDIA } from '@/data/media'
import { INDUSTRIES } from '@/data/content'

// Per-industry object-position for optimal video framing
const OBJECT_POSITIONS: Record<string, string> = {
  manufacturing:        'center 22%',
  commercial:           'center 20%',
  warehousing:          'center 25%',
  realEstate:           'center 22%',
  institutions:         'center 25%',
  utilities:            'center 20%',
  industrialFacilities: 'center 22%',
  infrastructure:       'center 25%',
}

const POSTER_MAP: Record<string, string> = {
  manufacturing:        '/media/posters/industrial.jpg',
  commercial:           '/media/posters/commercial.jpg',
  warehousing:          '/media/posters/warehouse.jpg',
  realEstate:           '/media/posters/residential.jpg',
  institutions:         '/media/posters/campus.jpg',
  utilities:            '/media/posters/substation.jpg',
  industrialFacilities: '/media/posters/industrial.jpg',
  infrastructure:       '/media/posters/infrastructure.jpg',
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
              pin: true,
              anticipatePin: 1,
              scrub: 0.8,
              start: 'top top',
              end: () => `+=${distance * 1.5}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress
                const rawIdx = progress * (numCards - 1)
                const activeIdx = Math.min(Math.round(rawIdx), numCards - 1)

                if (activeIdx !== activeIndexRef.current) {
                  activeIndexRef.current = activeIdx
                  updateVideoPlayback(activeIdx)
                  updateCardDOMStyles(activeIdx)
                }
              },
            },
          })

          tl.to(track, {
            x: -distance,
            ease: 'none',
          })

          cardRefs.current.forEach((card, i) => {
            if (!card) return
            const startRatio = i / numCards
            const peakRatio = (i + 0.5) / numCards
            const endRatio = (i + 1) / numCards

            gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${distance * 1.5}`,
                scrub: 0.8,
              }
            })
            .fromTo(card, 
              { scale: 0.94, opacity: 0.72 },
              { scale: 1.0, opacity: 1, duration: peakRatio - startRatio, ease: 'power2.out' }
            )
            .to(card,
              { scale: 0.94, opacity: 0.72, duration: endRatio - peakRatio, ease: 'power2.in' }
            )
          })
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
          <h2 className="t-headline" style={{ textWrap: 'balance' }}>
            POWERING EVERY{' '}
            <span style={{ color: 'var(--accent-gold)' }}>SECTOR.</span>
          </h2>
          <p className="t-body" style={{ maxWidth: '440px' }}>
            From manufacturing plants and warehouses to institutional campuses, commercial facilities, and utilities — Lukhdatar &amp; Sons delivers the same engineering precision across every industrial sector.
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
                    {POSTER_MAP[industry.mediaKey] && (
                      <img
                        src={POSTER_MAP[industry.mediaKey]}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: objPos,
                          zIndex: 1,
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                    <video
                      ref={(el) => { desktopVideoRefs.current[index] = el }}
                      src={videoSrc}
                      poster={POSTER_MAP[industry.mediaKey]}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: objPos,
                      }}
                      aria-label={`Video showing ${industry.label} electrification`}
                    />
                  </div>

                  {/* Gradient overlays */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,14,18,0.85) 0%, rgba(10,14,18,0.20) 40%, transparent 70%)',
                      zIndex: 2,
                    }}
                  />

                  {/* Active top gold bar */}
                  <div
                    data-active-bar
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-gold)',
                      opacity: isInitialActive ? 1 : 0,
                      transition: 'opacity 300ms ease',
                      zIndex: 3,
                    }}
                  />

                  {/* Content overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '28px',
                      left: '24px',
                      right: '24px',
                      zIndex: 3,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span
                        data-card-num
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          letterSpacing: '0.14em',
                          opacity: isInitialActive ? 1 : 0.6,
                          transition: 'opacity 300ms ease',
                        }}
                      >
                        0{index + 1}
                      </span>
                      <div
                        data-card-line
                        style={{
                          width: isInitialActive ? '32px' : '16px',
                          height: '1px',
                          background: 'var(--accent-gold)',
                          opacity: isInitialActive ? 0.9 : 0.4,
                          transition: 'width 300ms ease, opacity 300ms ease',
                        }}
                      />
                    </div>
                    <div
                      data-card-label
                      style={{
                        fontSize: 'clamp(17px, 1.4vw, 22px)',
                        fontWeight: isInitialActive ? 600 : 500,
                        color: isInitialActive ? '#FAF8F5' : 'rgba(250,248,245,0.70)',
                        letterSpacing: '-0.01em',
                        transition: 'color 300ms ease, font-weight 300ms ease',
                        lineHeight: 1.2,
                      }}
                    >
                      {industry.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Mobile: Native Smooth-Snapping Horizontal Carousel ── */}
      {isMobile && (
        <div style={{ paddingBottom: '48px' }}>
          <div
            className="industries-mobile-snap-track"
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingLeft: 'var(--container-px)',
              paddingRight: 'var(--container-px)',
              paddingBottom: '16px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {INDUSTRIES.map((industry, index) => {
              const videoSrc = MEDIA.industries[industry.mediaKey]
              const objPos = OBJECT_POSITIONS[industry.mediaKey] || 'center center'
              const isActive = index === mobileActiveIndex

              return (
                <div
                  key={industry.id}
                  onClick={() => handleMobileCardTap(index)}
                  aria-label={`Industry: ${industry.label}`}
                  style={{
                    flexShrink: 0,
                    width: 'calc(100vw - 48px)',
                    maxWidth: '340px',
                    height: '420px',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    border: isActive ? '1px solid rgba(201,160,82,0.45)' : '1px solid var(--line-soft)',
                    transition: 'border-color 300ms ease',
                  }}
                >
                  {/* Video wrapper */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {POSTER_MAP[industry.mediaKey] && (
                      <img
                        src={POSTER_MAP[industry.mediaKey]}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: objPos,
                          zIndex: 1,
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                    <video
                      ref={(el) => { mobileVideoRefs.current[index] = el }}
                      src={videoSrc}
                      poster={POSTER_MAP[industry.mediaKey]}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: objPos,
                      }}
                      aria-label={`Video showing ${industry.label} electrification`}
                    />
                  </div>

                  {/* Gradient overlays */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,14,18,0.88) 0%, rgba(10,14,18,0.20) 40%, transparent 70%)',
                      zIndex: 2,
                    }}
                  />

                  {/* Active top gold bar */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--accent-gold)',
                        zIndex: 3,
                      }}
                    />
                  )}

                  {/* Content overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '24px',
                      left: '20px',
                      right: '20px',
                      zIndex: 3,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          letterSpacing: '0.14em',
                        }}
                      >
                        0{index + 1}
                      </span>
                      <div
                        style={{
                          width: '24px',
                          height: '1px',
                          background: 'var(--accent-gold)',
                          opacity: 0.8,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#FAF8F5',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                      }}
                    >
                      {industry.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile pagination indicator dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              paddingTop: '8px',
            }}
          >
            {INDUSTRIES.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === mobileActiveIndex ? '20px' : '6px',
                  height: '3px',
                  borderRadius: '2px',
                  background: i === mobileActiveIndex ? 'var(--accent-gold)' : 'var(--line)',
                  transition: 'all 250ms ease',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Scoped styles */}
      <style>{`
        #industries-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 64px);
          align-items: end;
        }

        .industries-mobile-snap-track::-webkit-scrollbar {
          display: none;
        }

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
