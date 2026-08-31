'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

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
  rootMargin = '1800px',
  autoplayMargin = '900px',
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

  // Mark video as active and playing
  const markActive = useCallback(() => {
    setVideoActive(true)
  }, [])

  // 3. Keep video play/pause synced with proximity state
  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    if (shouldPlay) {
      video.muted = true
      video.playsInline = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            markActive()
          })
          .catch(() => {
            // Autoplay policy or power-save deferral
          })
      }
    } else {
      video.pause()
    }
  }, [shouldPlay, shouldLoad, markActive])

  // Reset state when source changes
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
      {/* Video Stream Layer — underneath poster */}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          autoPlay={shouldPlay}
          muted
          playsInline
          loop
          preload={shouldLoad ? 'auto' : 'metadata'}
          onPlay={markActive}
          onPlaying={markActive}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime > 0) {
              markActive()
            }
          }}
          onLoadedData={() => {
            if (shouldPlay) markActive()
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            transform: 'none',
            ...style,
          }}
          {...props}
        />
      )}

      {/* Poster Image Layer — covers video until first frame renders */}
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
            objectFit: 'cover',
            zIndex: 1,
            opacity: videoActive ? 0 : 1,
            transition: 'opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
