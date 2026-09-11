'use client'

import { useEffect, useRef, useState, memo, useCallback } from 'react'

export interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  poster: string
  aspectRatio?: string
  containerStyle?: React.CSSProperties
  preloadImmediate?: boolean
}

function LazyVideo({
  src,
  poster,
  aspectRatio,
  containerStyle,
  preloadImmediate = false,
  className,
  style,
  onError,
  onPlaying,
  onCanPlay,
  onLoadedData,
  ...props
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Reset states if src changes
  useEffect(() => {
    setIsPlaying(false)
    setHasError(false)
  }, [src])

  const safePlay = useCallback(() => {
    const video = videoRef.current
    if (!video || hasError) return

    // Enforce mobile-safe DOM parameters
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[LDS Video Playback Info]', { src, message: err?.message })
          }
        })
    }
  }, [src, hasError])

  useEffect(() => {
    if (hasError) return
    const video = videoRef.current
    const container = containerRef.current
    if (!video) return

    // Explicitly configure DOM instance properties
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('muted', '')

    // For hero video or immediate preload, trigger playback immediately
    if (preloadImmediate) {
      safePlay()
      return
    }

    if (typeof IntersectionObserver === 'undefined' || !container) {
      safePlay()
      return
    }

    // Proactive IntersectionObserver (350px preload buffer)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (playDebounceRef.current) clearTimeout(playDebounceRef.current)
          playDebounceRef.current = setTimeout(() => {
            if (video && entry.isIntersecting) {
              safePlay()
            }
          }, 50)
        } else {
          if (playDebounceRef.current) {
            clearTimeout(playDebounceRef.current)
            playDebounceRef.current = null
          }
          if (video && !video.paused) {
            video.pause()
          }
        }
      },
      { rootMargin: '350px 0px 350px 0px', threshold: 0.05 }
    )

    observer.observe(container)

    return () => {
      if (playDebounceRef.current) {
        clearTimeout(playDebounceRef.current)
        playDebounceRef.current = null
      }
      observer.disconnect()
    }
  }, [src, preloadImmediate, hasError, safePlay])

  const handleVideoPlaying = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsPlaying(true)
    if (onPlaying) onPlaying(e)
  }

  const handleCanPlay = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    safePlay()
    if (onCanPlay) onCanPlay(e)
  }

  const handleLoadedData = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (preloadImmediate) {
      safePlay()
    }
    if (onLoadedData) onLoadedData(e)
  }

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setHasError(true)
    setIsPlaying(false)
    const video = videoRef.current
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[LDS Video Error Handler]', {
        src,
        poster,
        readyState: video?.readyState,
        networkState: video?.networkState,
        error: video?.error,
      })
    }
    if (onError) onError(e)
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio,
        overflow: 'hidden',
        background: '#0A0E12',
        contain: 'layout paint',
        ...containerStyle,
      }}
      className={className}
    >
      {/* ── 1. Poster Layer (Immediately visible, guarantees 0 layout shift or blank frame) ── */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="eager"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: (style?.objectFit as any) || 'cover',
            objectPosition: (style?.objectPosition as any) || 'center center',
            display: 'block',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ── 2. Cinematic Video Layer (Crossfades seamlessly over poster when playing) ── */}
      {!hasError && (
        <video
          ref={(el) => {
            if (el) {
              el.muted = true
              el.defaultMuted = true
              el.playsInline = true
            }
            videoRef.current = el
          }}
          src={src}
          poster={poster}
          autoPlay={preloadImmediate}
          muted
          playsInline
          loop
          preload={preloadImmediate ? 'auto' : 'metadata'}
          onPlaying={handleVideoPlaying}
          onCanPlay={handleCanPlay}
          onLoadedData={handleLoadedData}
          onError={handleVideoError}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: style?.objectFit || 'cover',
            objectPosition: style?.objectPosition || 'center center',
            display: 'block',
            backgroundColor: 'transparent',
            zIndex: 2,
            opacity: isPlaying ? 1 : 0,
            transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
            ...style,
          }}
          {...props}
        />
      )}
    </div>
  )
}

export default memo(LazyVideo)
