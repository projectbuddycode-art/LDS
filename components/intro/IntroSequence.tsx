'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { MEDIA } from '@/data/media'

interface IntroSequenceProps {
  onComplete: () => void
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [videoReady, setVideoReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const isDoneRef = useRef(false)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const finishSequence = useCallback(() => {
    if (isDoneRef.current) return
    isDoneRef.current = true
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
    }

    const container = containerRef.current
    if (container) {
      container.style.transition = 'opacity 850ms cubic-bezier(0.4, 0, 0.2, 1)'
      container.style.opacity = '0'
      container.style.pointerEvents = 'none'
    }

    setTimeout(() => {
      onComplete()
    }, 870)
  }, [onComplete])

  const handleEnded = useCallback(() => {
    finishSequence()
  }, [finishSequence])

  const handleError = useCallback(() => {
    if (isDoneRef.current) return
    console.warn('Intro video failed to load, triggering fallback')
    setHasError(true)
    setTimeout(finishSequence, 1500)
  }, [finishSequence])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Lock playback rate to 1.0 natural timing
    video.playbackRate = 1.0

    function handleVideoReady() {
      if (isDoneRef.current) return
      setVideoReady(true)
      const playPromise = video?.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay deferred or restricted:', err)
          setTimeout(finishSequence, 2000)
        })
      }
    }

    // Check if video is already ready (e.g. cached)
    if (video.readyState >= 2) {
      handleVideoReady()
    } else {
      video.addEventListener('loadeddata', handleVideoReady, { once: true })
      video.addEventListener('canplay', handleVideoReady, { once: true })
      video.addEventListener('canplaythrough', handleVideoReady, { once: true })
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    // Force explicit load attempt
    video.load()

    // Fallback safety timeout
    fallbackTimerRef.current = setTimeout(() => {
      if (!isDoneRef.current) {
        finishSequence()
      }
    }, 8000)

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
      }
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
      className="intro-overlay-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: 1,
        willChange: 'opacity',
        height: '100svh',
        padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      }}
      aria-label="Intro Sequence"
    >
      {/* Intro Video — Autoplays immediately with poster fallback */}
      <video
        ref={videoRef}
        src={MEDIA.introVideo}
        poster="/media/posters/white-logo-intro.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={() => setVideoReady(true)}
        onPlaying={() => setVideoReady(true)}
        onTimeUpdate={(e) => {
          setVideoReady(true)
          const target = e.currentTarget
          if (target.duration > 0 && target.currentTime >= target.duration - 0.25) {
            // Near end of video — trigger smooth transition
            const container = containerRef.current
            if (container) {
              container.style.transition = 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
              container.style.opacity = '0'
              container.style.pointerEvents = 'none'
            }
          }
        }}
        onEnded={handleEnded}
        onError={handleError}
        aria-hidden="true"
        className="intro-video-element"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 1,
          transition: 'opacity 400ms ease',
        }}
      />

      {/* Thin gold rule overlay — communicates brand */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(to right, transparent, var(--accent-gold), transparent)',
          opacity: 0.6,
          zIndex: 3,
        }}
      />

      {/* Brand mark — visible while video loads or on fallback, fades when video is ready */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          opacity: videoReady && !hasError ? 0 : 1,
          transition: 'opacity 500ms ease',
          pointerEvents: 'none',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.020em',
            color: 'var(--text-primary)',
            lineHeight: 1,
            marginBottom: '4px',
          }}
        >
          Lukhdatar & Sons<span style={{ color: 'var(--accent-gold)' }}>.</span>
        </div>

        <div
          style={{
            width: '32px',
            height: '1px',
            background: 'var(--accent-gold)',
            margin: '20px auto 0',
            opacity: 0.7,
          }}
        />
      </div>

      <style>{`
        /* Desktop: Cinematic full cover */
        .intro-video-element {
          object-fit: cover;
          object-position: center;
        }

        /* Mobile Safari & mobile screens: preserve complete brand composition without cropping */
        @media (max-width: 768px) {
          .intro-overlay-container {
            height: 100svh !important;
          }
          .intro-video-element {
            object-fit: contain !important;
            object-position: center !important;
          }
        }
      `}</style>
    </div>
  )
}

