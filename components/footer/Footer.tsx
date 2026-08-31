import Link from 'next/link'
import Image from 'next/image'
import { COMPANY, FOOTER_SECTIONS } from '@/data/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-root" aria-label="Site footer" id="footer">
      <div className="site-container">

        {/* Top grid */}
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            {/* Actual LDS Logo — inverted/filtered for dark footer */}
            <Link href="/" aria-label="Lukhdatar & Sons — Home" style={{ display: 'inline-block', textDecoration: 'none', marginBottom: '28px' }}>
              <Image
                src="/media/lds-logo.png"
                alt="Lukhdatar & Sons"
                width={160}
                height={68}
                style={{
                  height: '60px',
                  width: 'auto',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  // Invert white-bg logo for dark footer background
                  filter: 'invert(1) brightness(0.92) contrast(1.05)',
                }}
              />
            </Link>

            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'rgba(250,248,245,0.50)',
              maxWidth: '260px',
              marginBottom: '32px',
            }}>
              Complete electrical infrastructure — engineered, supplied,
              installed, tested and commissioned as one accountable delivery.
            </p>

            <div style={{ fontSize: '13px', color: 'rgba(250,248,245,0.40)', lineHeight: 1.8 }}>
              <div>{COMPANY.location}</div>
              <div style={{ marginTop: '8px' }}>
                <a
                  href="mailto:info@ldsinfrastructure.com"
                  style={{
                    color: 'var(--accent-gold)',
                    textDecoration: 'none',
                    transition: 'opacity 250ms ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  info@ldsinfrastructure.com
                </a>
              </div>
            </div>

            {/* Discuss a Project CTA */}
            <div style={{ marginTop: '32px' }}>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  border: '1px solid rgba(201,160,82,0.35)',
                  transition: 'all 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)'
                  e.currentTarget.style.background = 'rgba(201,160,82,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,160,82,0.35)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Discuss a Project
                <span style={{ display: 'inline-block', transition: 'transform 250ms ease' }}>↗</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((col) => (
            <div key={col.heading}>
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,248,245,0.35)',
                marginBottom: '20px',
              }}>
                {col.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(250,248,245,0.10)', marginBottom: '32px' }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(250,248,245,0.28)', letterSpacing: '0.04em' }}>
            © {currentYear} {COMPANY.legalName} All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,245,0.22)',
            }}>
              Est. {COMPANY.founded}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,245,0.22)',
            }}>
              Kolkata, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
