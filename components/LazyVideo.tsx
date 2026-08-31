'use client'

import { useEffect, useRef, useState, useCallback, memo } from 'react'

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  poster: string
  aspectRatio?: string
  containerStyle?: React.CSSProperties
  rootMargin?: string      // Margin to start loading/buffering the video stream
  autoplayMargin?: string  // Margin to activate video playback
  preloadImmediate?: boolean // True for hero/above-the-fold content
}

function LazyVideo({
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

  // Mark video as active and playing (cross-fading poster away)
  const handlePlaySuccess = useCallback(() => {
    setVideoActive(true)
  }, [])

  // 1. Unified Proximity & Preload Observer
  useEffect(() => {
    if (preloadImmediate) return

    const container = containerRef.current
    if (!container || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      setShouldPlay(true)
      return
    }

    // Buffer observer — triggers video element mount & stream buffering
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

    // Play/Pause viewport proximity observer — pauses offscreen videos to save GPU/CPU
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        setShouldPlay(entry.isIntersecting)
      },
      { rootMargin: autoplayMargin }
    )
    playObserver.observe(container)

    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
    }
  }, [preloadImmediate, rootMargin, autoplayMargin])

  // 2. Manage Play / Pause lifecycle without continuous React state updates
  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    if (shouldPlay) {
      video.muted = true
      video.playsInline = true
      const promise = video.play()
      if (promise !== undefined) {
        promise
          .then(handlePlaySuccess)
          .catch(() => {
            // Autoplay policy or low power mode deferral
          })
      }
    } else {
      video.pause()
    }
  }, [shouldPlay, shouldLoad, handlePlaySuccess])

  // 3. Reset poster state when video source changes
  useEffect(() => {
    setVideoActive(false)
  }, [src])

  // 4. Memory cleanup on component unmount
  useEffect(() => {
    const video = videoRef.current
    return () => {
      if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
    }
  }, [])

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
        contain: 'paint layout',
        ...containerStyle,
      }}
      className={className}
    >
      {/* Video Stream Layer */}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          autoPlay={shouldPlay}
          muted
          playsInline
          loop
          preload={shouldPlay ? 'auto' : 'metadata'}
          onPlaying={handlePlaySuccess}
          onLoadedData={() => {
            if (shouldPlay) handlePlaySuccess()
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: style?.objectFit || 'cover',
            objectPosition: style?.objectPosition || 'center center',
            zIndex: 0,
            transform: 'none',
            ...style,
          }}
          {...props}
        />
      )}

      {/* Synchronized Seamless Poster Image Layer */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading={preloadImmediate ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: style?.objectFit || 'cover',
            objectPosition: style?.objectPosition || 'center center',
            zIndex: 1,
            opacity: videoActive ? 0 : 1,
            transition: 'opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

export default memo(LazyVideo)
