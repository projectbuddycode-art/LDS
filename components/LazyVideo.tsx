'use client'

import { useEffect, useRef, useState, useCallback, memo } from 'react'

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  poster: string
  aspectRatio?: string
  containerStyle?: React.CSSProperties
  rootMargin?: string        // Distance ahead to mount video & prepare stream (default: '350px')
  autoplayMargin?: string    // Distance to trigger play / pause (default: '80px')
  unloadDistance?: string    // Distance beyond which video is unmounted to free decoder (default: '900px')
  preloadImmediate?: boolean // True for hero / above-the-fold content
}

function LazyVideo({
  src,
  poster,
  aspectRatio,
  containerStyle,
  rootMargin = '350px',
  autoplayMargin = '80px',
  unloadDistance = '900px',
  preloadImmediate = false,
  className,
  style,
  ...props
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMounted, setIsMounted] = useState<boolean>(preloadImmediate)
  const [isPlaying, setIsPlaying] = useState<boolean>(preloadImmediate)
  const [videoReady, setVideoReady] = useState<boolean>(false)

  // Mark video as ready and playing (fading poster out)
  const handlePlaying = useCallback(() => {
    setVideoReady(true)
  }, [])

  // 1. Proximity & Decoder Management Observer
  useEffect(() => {
    if (preloadImmediate) return

    const container = containerRef.current
    if (!container || typeof IntersectionObserver === 'undefined') {
      setIsMounted(true)
      setIsPlaying(true)
      return
    }

    // Observer 1: Mount & Unmount Windowing (Controls hardware video decoders)
    // Within rootMargin (350px) -> Mount video element
    // Beyond unloadDistance (900px) -> Unmount video element to free hardware decoder & RAM
    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true)
        } else {
          // Off-screen beyond unload distance — unmount video element
          setIsMounted(false)
          setIsPlaying(false)
          setVideoReady(false)
        }
      },
      { rootMargin: isMounted ? unloadDistance : rootMargin }
    )

    // Observer 2: Autoplay / Pause Viewport Observer
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting)
      },
      { rootMargin: autoplayMargin }
    )

    mountObserver.observe(container)
    playObserver.observe(container)

    return () => {
      mountObserver.disconnect()
      playObserver.disconnect()
    }
  }, [preloadImmediate, rootMargin, autoplayMargin, unloadDistance, isMounted])

  // 2. Play / Pause Controller
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isMounted) return

    if (isPlaying) {
      video.muted = true
      video.playsInline = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(handlePlaying)
          .catch(() => {
            // Autoplay policy or low power mode deferral
          })
      }
    } else {
      video.pause()
    }
  }, [isPlaying, isMounted, handlePlaying])

  // 3. Reset state on src change
  useEffect(() => {
    setVideoReady(false)
  }, [src])

  // 4. Memory & Hardware Decoder Cleanup on Unmount
  useEffect(() => {
    return () => {
      const video = videoRef.current
      if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
    }
  }, [isMounted])

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
      {/* Video Stream Layer — Mounted only within active viewport proximity */}
      {isMounted && (
        <video
          ref={videoRef}
          src={src}
          autoPlay={isPlaying}
          muted
          playsInline
          loop
          preload={isPlaying ? 'auto' : 'metadata'}
          onPlaying={handlePlaying}
          onLoadedData={() => {
            if (isPlaying) handlePlaying()
          }}
          aria-hidden="true"
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

      {/* Synchronized Seamless Poster Image Layer — Never unmounts, guarantees zero flash */}
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
            opacity: videoReady && isMounted ? 0 : 1,
            transition: 'opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

export default memo(LazyVideo)
