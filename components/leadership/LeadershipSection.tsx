'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { MEDIA } from '@/data/media'

const FOUNDER_STORY = [
  {
    year: '1997',
    label: 'The Beginning',
    body: 'Lukhdatar & Sons was established by Mr. Lalit Kumar Sureka in Kolkata as an electrical goods supply business. Operating in the field gave Mr. Sureka direct exposure to equipment requirements, installation practices and the practical gaps that existed between supply and reliable delivery.',
  },
  {
    year: '2007',
    label: 'From Supply to Execution',
    body: 'After a decade of building supplier relationships and technical knowledge, Lukhdatar & Sons made a decisive strategic move — transitioning from electrical goods supply into full turnkey electrical contracting. This shift meant owning the complete engineering cycle: design, supply, installation, testing, commissioning and ongoing maintenance as a single integrated scope.',
  },
  {
    year: 'Today',
    label: 'Infrastructure at Scale',
    body: 'Today, Lukhdatar & Sons undertakes electrical infrastructure projects across commercial, residential, industrial, public and substation environments — with technical capability spanning underground cable works up to 66KV, substations and switchyards up to 220KV, and overhead transmission lines up to 400KV.',
  },
]

const MD_STORY = [
  {
    label: 'The Next Generation',
    body: 'Mr. Shree Mangalam Sureka joined Lukhdatar & Sons as it entered its contracting phase, bringing structured management discipline to complement the technical foundation his father had built. As Managing Director, he oversees project delivery, client relationships and the company\'s long-term strategic direction.',
  },
  {
    label: 'Continuity of Standards',
    body: 'Under his leadership, Lukhdatar & Sons has maintained the engineering discipline and delivery accountability that defined its early years — while expanding the scope and complexity of projects it undertakes. The company\'s commitment to testing, documentation and post-commissioning support reflects a management philosophy built on long-term relationships.',
  },
]

const CAPABILITY_HIGHLIGHTS = [
  { value: '66KV', label: 'Underground Cable Works' },
  { value: '220KV', label: 'Substations & Switchyards' },
  { value: '400KV', label: 'Transmission Capability' },
]

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        // Portrait clip-path reveals — bottom to top
        section.querySelectorAll('[data-portrait-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0.6 },
            {
              clipPath: 'inset(0 0 0% 0)',
              opacity: 1,
              duration: 1.1,
              ease: 'expo.out',
              delay: i * 0.18,
              scrollTrigger: { trigger: section.querySelector('[data-portraits]'), start: 'top 82%', once: true },
            }
          )
        })

        // Text reveals — staggered, subtle
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 18, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.72,
              ease: 'power3.out',
              delay: i * 0.06,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }
          )
        })
      }, section)

      cleanup = () => ctx.revert()
    }

    init()
    return () => cleanup?.()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="company"
      className="section-py"
      style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Leadership and company story"
    >
      <div className="site-container">

        {/* Section label */}
        <div data-reveal className="section-label" style={{ marginBottom: '48px' }}>
          <span className="section-label-bullet" />
          <span className="t-label">02 — Founder / Leadership</span>
        </div>

        {/* Main grid: portraits LEFT, story RIGHT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(240px, 28%, 380px) 1fr',
          gap: 'clamp(40px, 6vw, 88px)',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Portrait column ─────────────────── */}
          <div data-portraits style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Founder portrait */}
            <div>
              <div
                data-portrait-reveal
                className="leadership-portrait-card"
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  marginBottom: '14px',
                }}
              >
                <Image
                  src={MEDIA.leadership.founder}
                  alt="Mr. Lalit Kumar Sureka, Founder of Lukhdatar & Sons"
                  fill
                  sizes="(max-width: 768px) 90vw, 28vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  priority
                />
                {/* Subtle gold rule at bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--accent-gold)',
                  opacity: 0.5,
                  zIndex: 2,
                }} />
              </div>
              <div data-reveal>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  Mr. Lalit Kumar Sureka
                </div>
                <div className="t-label" style={{ color: 'var(--accent-gold)', marginTop: '5px' }}>Founder · Est. 1997</div>
              </div>
            </div>

            {/* MD portrait */}
            <div>
              <div
                data-portrait-reveal
                className="leadership-portrait-card"
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  marginBottom: '14px',
                }}
              >
                <Image
                  src={MEDIA.leadership.md}
                  alt="Mr. Shree Mangalam Sureka, Managing Director of Lukhdatar & Sons"
                  fill
                  sizes="(max-width: 768px) 90vw, 28vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--accent-gold)',
                  opacity: 0.5,
                  zIndex: 2,
                }} />
              </div>
              <div data-reveal>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  Mr. Shree Mangalam Sureka
                </div>
                <div className="t-label" style={{ color: 'var(--accent-gold)', marginTop: '5px' }}>Managing Director</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Story column ───────────────────── */}
          <div>
            <h2 data-reveal className="t-headline" style={{ marginBottom: '10px' }}>
              Built from
              {' '}<span style={{ color: 'var(--accent-gold)' }}>three decades</span>
              {' '}of craft.
            </h2>

            <p data-reveal className="t-body" style={{ maxWidth: '540px', marginBottom: '44px' }}>
              From a Kolkata electrical supply business to a full-service turnkey contractor — the
              evolution of Lukhdatar & Sons reflects a deliberate accumulation of technical knowledge,
              field experience and delivery capability.
            </p>

            {/* Founder timeline */}
            <div style={{ marginBottom: '48px' }}>
              <div data-reveal style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--line)',
              }}>
                Founding Leadership — Mr. Lalit Kumar Sureka
              </div>

              {FOUNDER_STORY.map((item, i) => (
                <div
                  key={item.year}
                  data-reveal
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1fr',
                    gap: '20px',
                    padding: '18px 0',
                    borderBottom: '1px solid var(--line-soft)',
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      color: 'var(--accent-gold)',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}>
                      {item.year}
                    </div>
                    <div style={{
                      width: '16px',
                      height: '1px',
                      background: 'var(--line-gold)',
                    }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                    }}>
                      {item.label}
                    </div>
                    <p className="t-body" style={{ fontSize: '14px', lineHeight: 1.68 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* MD section */}
            <div style={{ marginBottom: '40px' }}>
              <div data-reveal style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--line)',
              }}>
                Current Leadership — Mr. Shree Mangalam Sureka
              </div>

              {MD_STORY.map((item) => (
                <div
                  key={item.label}
                  data-reveal
                  style={{
                    padding: '18px 0',
                    borderBottom: '1px solid var(--line-soft)',
                  }}
                >
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}>
                    {item.label}
                  </div>
                  <p className="t-body" style={{ fontSize: '14px', lineHeight: 1.68 }}>{item.body}</p>
                </div>
              ))}
            </div>

            {/* Capability highlights */}
            <div data-reveal style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              border: '1px solid var(--line)',
            }}>
              {CAPABILITY_HIGHLIGHTS.map((stat, i) => (
                <div key={stat.value} style={{
                  padding: '18px 16px',
                  borderRight: i < CAPABILITY_HIGHLIGHTS.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <div style={{
                    fontSize: 'clamp(20px, 2.2vw, 28px)',
                    fontWeight: 700,
                    letterSpacing: '-0.015em',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '9px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        .leadership-portrait-card {
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .leadership-portrait-card:hover {
          transform: translateY(-3px);
        }
        @media (max-width: 768px) {
          #company .site-container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
