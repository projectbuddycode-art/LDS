'use client'

import { useEffect, useRef, memo } from 'react'

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
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
  ...props
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video) return

    // Ensure muted & playsinline are strictly set on the DOM instance
    video.muted = true
    video.playsInline = true

    // For hero video or immediate preload, trigger play right away
    if (preloadImmediate) {
      const p = video.play()
      if (p !== undefined) {
        p.catch(() => {})
      }
      return
    }

    if (typeof IntersectionObserver === 'undefined' || !container) {
      const p = video.play()
      if (p !== undefined) {
        p.catch(() => {})
      }
      return
    }

    // Viewport IntersectionObserver: plays when visible, pauses when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (playDebounceRef.current) clearTimeout(playDebounceRef.current)
          playDebounceRef.current = setTimeout(() => {
            if (video && entry.isIntersecting) {
              const p = video.play()
              if (p !== undefined) {
                p.catch(() => {})
              }
            }
          }, 60)
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
      { rootMargin: '100px 0px 100px 0px', threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      if (playDebounceRef.current) {
        clearTimeout(playDebounceRef.current)
        playDebounceRef.current = null
      }
      observer.disconnect()
    }
  }, [src, preloadImmediate])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio,
        overflow: 'hidden',
        background: '#0E131A',
        contain: 'layout paint',
        ...containerStyle,
      }}
      className={className}
    >
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
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: style?.objectFit || 'cover',
          objectPosition: style?.objectPosition || 'center center',
          display: 'block',
          backgroundColor: '#0E131A',
          ...style,
        }}
        {...props}
      />
    </div>
  )
}

export default memo(LazyVideo)


