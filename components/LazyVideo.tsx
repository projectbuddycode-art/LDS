'use client'

import { useEffect, useRef, useState, memo } from 'react'

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video) return

    // Ensure native autoplay attributes are active
    video.muted = true
    video.playsInline = true

    // Initial play attempt
    const startPlay = () => {
      const promise = video.play()
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay deferred by browser policy
          })
      }
    }

    if (preloadImmediate) {
      startPlay()
    }

    if (typeof IntersectionObserver === 'undefined' || !container) {
      startPlay()
      return
    }

    // Viewport intersection observer: play when visible/near, pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startPlay()
        } else {
          video.pause()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(container)

    return () => {
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
        background: 'var(--surface)',
        ...containerStyle,
      }}
      className={className}
    >
      {/* ── HTML5 Video Element with Full Approved Source ── */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        loop
        preload={preloadImmediate ? 'auto' : 'metadata'}
        onPlay={() => setIsPlaying(true)}
        onPlaying={() => setIsPlaying(true)}
        onTimeUpdate={() => {
          if (!isPlaying) setIsPlaying(true)
        }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: style?.objectFit || 'cover',
          objectPosition: style?.objectPosition || 'center center',
          zIndex: 1,
          display: 'block',
          ...style,
        }}
        {...props}
      />

      {/* ── Seamless Poster Layer (fades out as video plays) ── */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading={preloadImmediate ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: style?.objectFit || 'cover',
            objectPosition: style?.objectPosition || 'center center',
            zIndex: 2,
            opacity: isPlaying ? 0 : 1,
            transition: 'opacity 400ms ease-out',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

export default memo(LazyVideo)
