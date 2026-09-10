'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { MEDIA } from '@/data/media'

interface IntroSequenceProps {
  onComplete: () => void
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDoneRef = useRef(false)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const finishSequence = useCallback(() => {
    if (isDoneRef.current) return
    isDoneRef.current = true

    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
    }

    const container = containerRef.current
    if (container) {
      // 450ms subtle cinematic crossfade into the homepage hero
      container.style.transition = 'opacity 450ms cubic-bezier(0.4, 0, 0.2, 1)'
      container.style.opacity = '0'
      container.style.pointerEvents = 'none'
    }

    setTimeout(() => {
      onComplete()
    }, 480)
  }, [onComplete])

  const handleEnded = useCallback(() => {
    finishSequence()
  }, [finishSequence])

  const handleError = useCallback(() => {
    if (isDoneRef.current) return
    console.warn('[IntroSequence] Video playback issue, proceeding smoothly to homepage')
    finishSequence()
  }, [finishSequence])

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        finishSequence()
        return
      }
    }

    const video = videoRef.current
    if (!video) return

    // Ensure muted & playsinline attributes are strictly applied on the DOM instance
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('muted', '')
    video.playbackRate = 1.0

    function handleVideoReady() {
      if (isDoneRef.current) return
      const playPromise = video?.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true)
          })
          .catch((err) => {
            console.warn('[IntroSequence] Autoplay deferred:', err)
            // If browser prevents autoplay, advance after a short moment
            setTimeout(finishSequence, 1500)
          })
      }
    }

    if (video.readyState >= 2) {
      handleVideoReady()
    } else {
      video.addEventListener('loadeddata', handleVideoReady, { once: true })
      video.addEventListener('canplay', handleVideoReady, { once: true })
      video.addEventListener('canplaythrough', handleVideoReady, { once: true })
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    // Explicit load
    video.load()

    // Safety timeout: transition after 11s maximum in case video hangs
    fallbackTimerRef.current = setTimeout(() => {
      if (!isDoneRef.current) {
        finishSequence()
      }
    }, 11000)

    // Escape or Space key skips intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        finishSequence()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
      }
      window.removeEventListener('keydown', handleKeyDown)
      video.removeEventListener('loadeddata', handleVideoReady)
      video.removeEventListener('canplay', handleVideoReady)
      video.removeEventListener('canplaythrough', handleVideoReady)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
    }
  }, [finishSequence, handleEnded, handleError])

  return (
    <div
      ref={containerRef}
      className="intro-fullscreen-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 99999,
        background: '#0A0E12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: 1,
        willChange: 'opacity',
      }}
      aria-label="LDS Cinematic Intro 101"
    >
      {/* ── Instant Fallback Poster (Zero layout shift, zero blank frame) ── */}
      <img
        src="/media/posters/intro-101.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100dvh',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── True Full-Screen INTRO 101 Video — 100vw × 100dvh ── */}
      <video
        ref={videoRef}
        src={MEDIA.introVideo}
        poster="/media/posters/intro-101.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlaying={() => setIsVideoPlaying(true)}
        onTimeUpdate={(e) => {
          const target = e.currentTarget
          // Trigger subtle crossfade ~0.25s before end to avoid any frame stutter
          if (target.duration > 0 && target.currentTime >= target.duration - 0.25) {
            const container = containerRef.current
            if (container && !isDoneRef.current) {
              container.style.transition = 'opacity 450ms cubic-bezier(0.4, 0, 0.2, 1)'
              container.style.opacity = '0'
              container.style.pointerEvents = 'none'
            }
          }
        }}
        onEnded={handleEnded}
        onError={handleError}
        aria-hidden="true"
        className="intro-101-video"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100dvh',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          zIndex: 2,
          opacity: isVideoPlaying ? 1 : 0.99,
        }}
      />

      {/* ── Premium Top-Right Skip Intro CTA ── */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          finishSequence()
        }}
        aria-label="Skip Intro"
        className="intro-skip-btn"
        style={{
          position: 'absolute',
          top: 'clamp(20px, 3.5vw, 36px)',
          right: 'clamp(20px, 3.5vw, 36px)',
          zIndex: 10,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          background: 'rgba(10, 14, 18, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 160, 82, 0.45)',
          color: '#FAF8F5',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          borderRadius: '2px',
          cursor: 'pointer',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.40)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-gold)'
          e.currentTarget.style.background = 'rgba(201, 160, 82, 0.18)'
          e.currentTarget.style.color = 'var(--accent-gold)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201, 160, 82, 0.45)'
          e.currentTarget.style.background = 'rgba(10, 14, 18, 0.75)'
          e.currentTarget.style.color = '#FAF8F5'
        }}
      >
        <span>SKIP INTRO</span>
        <span style={{ fontSize: '13px', lineHeight: 1 }}>→</span>
      </button>

      <style>{`
        .intro-fullscreen-overlay {
          width: 100vw !important;
          height: 100dvh !important;
          height: 100svh !important;
          height: 100vh !important;
        }

        .intro-101-video {
          width: 100vw !important;
          height: 100dvh !important;
          height: 100svh !important;
          height: 100vh !important;
          object-fit: cover !important;
          object-position: center !important;
        }

        .intro-skip-btn:active {
          transform: scale(0.96);
        }

        /* Mobile full-screen cover protection */
        @media (max-width: 768px) {
          .intro-fullscreen-overlay,
          .intro-101-video {
            width: 100vw !important;
            height: 100dvh !important;
            height: 100svh !important;
            object-fit: cover !important;
            object-position: center !important;
          }
          .intro-skip-btn {
            top: 18px !important;
            right: 18px !important;
            padding: 8px 14px !important;
            font-size: 10.5px !important;
          }
        }
      `}</style>
    </div>
  )
}
