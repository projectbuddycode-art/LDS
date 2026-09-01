'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0E131A', color: '#FAF8F5', fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div style={{ width: '48px', height: '2px', background: '#C9A052', marginBottom: '24px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            LDS Infrastructure
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(250, 248, 245, 0.70)', maxWidth: '440px', lineHeight: 1.6, marginBottom: '32px' }}>
            A temporary system error occurred. Click below to reload the application.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '12px 28px',
              background: '#C9A052',
              color: '#0E131A',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reload Website
          </button>
        </div>
      </body>
    </html>
  )
}
