'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  poster: string
  aspectRatio?: string
  containerStyle?: React.CSSProperties
  rootMargin?: string      // Margin to start loading/buffering the video file
  autoplayMargin?: string  // Margin to start playing the video
  preloadImmediate?: boolean // True for above-the-fold content
}

export default function LazyVideo({
  src,
  poster,
  aspectRatio,
  containerStyle,
  rootMargin = '1200px',
  autoplayMargin = '600px',
  preloadImmediate = false,
  className,
  style,
  ...props
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [shouldLoad, setShouldLoad] = useState(preloadImmediate)
  const [shouldPlay, setShouldPlay] = useState(preloadImmediate)
  const [videoActive, setVideoActive] = useState(false)

  // 1. IntersectionObserver for preloading (buffering) the video
  useEffect(() => {
    if (preloadImmediate || shouldLoad) return

    const container = containerRef.current
    if (!container) return

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          loadObserver.disconnect()
        }
      },
      { rootMargin }
    )

    loadObserver.observe(container)
    return () => loadObserver.disconnect()
  }, [shouldLoad, preloadImmediate, rootMargin])

  // 2. IntersectionObserver for playing/pausing based on proximity
  useEffect(() => {
    if (preloadImmediate || !shouldLoad) return

    const container = containerRef.current
    if (!container) return

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        setShouldPlay(entry.isIntersecting)
      },
      { rootMargin: autoplayMargin }
    )

    playObserver.observe(container)
    return () => playObserver.disconnect()
  }, [shouldLoad, preloadImmediate, autoplayMargin])

  // 3. Keep video play/pause synced with proximity state
  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    if (shouldPlay) {
      video.muted = true
      video.playsInline = true
      video.play().catch((err) => {
        // Autoplay could be blocked by browser policy on initial load
        console.warn('LazyVideo autoplay blocked/failed:', err)
      })
    } else {
      video.pause()
    }
  }, [shouldPlay, shouldLoad])

  // Triggered when video starts rendering frames
  const handlePlaying = () => {
    setVideoActive(true)
  }

  // Reset opacity state when source changes
  useEffect(() => {
    setVideoActive(false)
  }, [src])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio,
        overflow: 'hidden',
        background: 'var(--surface)',
        ...containerStyle,
      }}
      className={className}
    >
      {/* Poster Image Layer */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            opacity: videoActive ? 0 : 1,
            transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Video Stream Layer */}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          onPlaying={handlePlaying}
          muted
          playsInline
          loop
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: videoActive ? 1 : 0,
            transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: 'none', // Critical: prevents layout shake/jitter during rendering
            ...style,
          }}
          {...props}
        />
      )}
    </div>
  )
}
