'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NAV_LINKS } from '@/data/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={headerRef} className={`nav-root${scrolled ? ' scrolled' : ''}`}>
      <div className="site-container">
        <nav className="nav-inner" aria-label="Main navigation">

          {/* ── Logo ── actual LDS logo asset */}
          <Link
            href="/"
            aria-label="Lukhdatar & Sons — Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            {/*
              The actual logo has a white background.
              On the dark hero: mix-blend-mode multiply makes white transparent,
              leaving the dark LDS letterforms and gold bolt visible.
              On scrolled (light ivory bg): the white bg merges with the header bg naturally.
            */}
            <Image
              src="/media/lds-logo.png"
              alt="Lukhdatar & Sons"
              width={120}
              height={52}
              priority
              style={{
                height: '40px',
                width: 'auto',
                maxWidth: '120px',
                objectFit: 'contain',
                mixBlendMode: scrolled ? 'normal' : 'multiply',
                transition: 'all 400ms ease',
                // On dark hero, invert makes the logo appear in light tones
                filter: scrolled ? 'none' : 'invert(1) contrast(0.9) brightness(1.1)',
              }}
            />
          </Link>

          {/* Desktop nav links */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(24px, 3vw, 40px)' }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="header-nav-link"
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: scrolled ? 'var(--text-secondary)' : 'rgba(250,248,245,0.80)',
                  textDecoration: 'none',
                  transition: 'color 250ms ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? 'var(--text-secondary)' : 'rgba(250,248,245,0.80)')}
              >
                {link.label}
              </Link>
            ))}

            <a
              href="#contact"
              className="header-cta-btn"
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                textDecoration: 'none',
                paddingLeft: '20px',
                borderLeft: '1px solid var(--line-gold)',
                transition: 'opacity 250ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.75'
                const arrow = e.currentTarget.querySelector('.hdr-arrow') as HTMLSpanElement
                if (arrow) arrow.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                const arrow = e.currentTarget.querySelector('.hdr-arrow') as HTMLSpanElement
                if (arrow) arrow.style.transform = 'translateX(0)'
              }}
            >
              Start a Project
              <span className="hdr-arrow" style={{ display: 'inline-block', transition: 'transform 300ms ease' }}>
                ↗
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: scrolled ? 'var(--text-primary)' : '#FAF8F5',
                  transition: 'all 300ms ease',
                  transformOrigin: 'center',
                  ...(menuOpen && i === 0 ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}),
                  ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                  ...(menuOpen && i === 2 ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}),
                }}
              />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--bg-light)',
            borderTop: '1px solid var(--line)',
            padding: '24px var(--container-px) 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--line-soft)',
                paddingBottom: '20px',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#contact"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              textDecoration: 'none',
            }}
            onClick={() => setMenuOpen(false)}
          >
            Start a Project ↗
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        .header-nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-gold);
          transition: width 300ms ease;
        }
        .header-nav-link:hover::after { width: 100%; }
      `}</style>
    </header>
  )
}
