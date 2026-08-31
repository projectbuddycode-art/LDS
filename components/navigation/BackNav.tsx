'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface BackNavProps {
  fallbackHref: string
  label?: string
  style?: React.CSSProperties
  className?: string
}

export default function BackNav({ fallbackHref, label = 'Back', style, className }: BackNavProps) {
  const router = useRouter()

  const handleBack = (e: React.MouseEvent) => {
    // If the visitor navigated internally, use history back; otherwise link fallback takes over
    if (typeof window !== 'undefined' && window.history.length > 1) {
      e.preventDefault()
      router.back()
    }
  }

  return (
    <Link
      href={fallbackHref}
      onClick={handleBack}
      className={`back-nav-link ${className || ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--accent-gold)',
        textDecoration: 'none',
        marginBottom: '24px',
        padding: '6px 0',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        cursor: 'pointer',
        ...style,
      }}
      aria-label={`Go back to ${label}`}
    >
      <span style={{ fontSize: '14px', lineHeight: 1, display: 'inline-block' }}>←</span>
      <span>{label}</span>
    </Link>
  )
}
