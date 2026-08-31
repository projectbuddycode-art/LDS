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
  const videoRef = useRef<HTMLVideoElement>(null)
  const posterRef = useRef<HTMLImageElement>(null)
  const playTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isPlayingRef = useRef<boolean>(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    const posterEl = posterRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true

    const handlePlaying = () => {
      isPlayingRef.current = true
      if (posterEl) {
        posterEl.style.opacity = '0'
      }
    }

    video.addEventListener('playing', handlePlaying)
    video.addEventListener('play', handlePlaying)

    // Above-the-fold hero video plays immediately
    if (preloadImmediate) {
      const promise = video.play()
      if (promise !== undefined) {
        promise.catch(() => {})
      }
      return () => {
        video.removeEventListener('playing', handlePlaying)
        video.removeEventListener('play', handlePlaying)
      }
    }

    if (typeof IntersectionObserver === 'undefined' || !container) {
      const promise = video.play()
      if (promise !== undefined) {
        promise.catch(() => {})
      }
      return () => {
        video.removeEventListener('playing', handlePlaying)
        video.removeEventListener('play', handlePlaying)
      }
    }

    // Viewport IntersectionObserver with tight margins & debounce for rapid scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Debounce play by 80ms: if user flings past in <80ms, we don't stress the hardware decoder
          if (playTimerRef.current) clearTimeout(playTimerRef.current)
          playTimerRef.current = setTimeout(() => {
            if (video && entry.isIntersecting) {
              const promise = video.play()
              if (promise !== undefined) {
                promise.catch(() => {})
              }
            }
          }, 80)
        } else {
          // Immediately cancel any pending play and pause offscreen video
          if (playTimerRef.current) {
            clearTimeout(playTimerRef.current)
            playTimerRef.current = null
          }
          if (video && !video.paused) {
            video.pause()
          }
        }
      },
      { rootMargin: '60px 0px 60px 0px', threshold: 0.05 }
    )

    observer.observe(container)

    return () => {
      if (playTimerRef.current) {
        clearTimeout(playTimerRef.current)
        playTimerRef.current = null
      }
      observer.disconnect()
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('play', handlePlaying)
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
        contain: 'layout paint',
        ...containerStyle,
      }}
      className={className}
    >
      {/* ── HTML5 Video Element with Full Approved Source ── */}
      <video
        ref={videoRef}
        src={src}
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
          zIndex: 1,
          display: 'block',
          ...style,
        }}
        {...props}
      />

      {/* ── Seamless Poster Layer (fades out directly in DOM on play) ── */}
      {poster && (
        <img
          ref={posterRef}
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
            opacity: 1,
            transition: 'opacity 350ms ease-out',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

export default memo(LazyVideo)
