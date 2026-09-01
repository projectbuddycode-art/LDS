'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log non-fatal error telemetry
    console.error('LDS Application Error Caught:', error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0E131A',
        color: '#FAF8F5',
        padding: '24px',
        textAlign: 'center',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '2px',
          background: 'var(--accent-gold, #C9A052)',
          marginBottom: '24px',
        }}
      />
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent-gold, #C9A052)',
          marginBottom: '12px',
        }}
      >
        LDS Infrastructure
      </div>
      <h1
        style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          maxWidth: '540px',
          lineHeight: 1.2,
        }}
      >
        System Initialisation Notice
      </h1>
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(250, 248, 245, 0.70)',
          maxWidth: '440px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}
      >
        A temporary display state occurred while rendering this interface. Please refresh or retry below to restore full engineering controls.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          style={{
            padding: '12px 28px',
            background: 'var(--accent-gold, #C9A052)',
            color: '#0E131A',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 200ms ease',
          }}
        >
          Retry Loading
        </button>
        <button
          onClick={() => { window.location.href = '/' }}
          style={{
            padding: '12px 28px',
            background: 'transparent',
            color: '#FAF8F5',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: '1px solid rgba(250, 248, 245, 0.25)',
            cursor: 'pointer',
            transition: 'border-color 200ms ease',
          }}
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}
