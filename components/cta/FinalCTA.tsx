'use client'

import { useEffect, useRef } from 'react'

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let isUnmounted = false
    let ctx: any
    const section = sectionRef.current
    if (!section) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (isUnmounted) return

      ctx = gsap.context(() => {
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: i * 0.1,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
          )
        })
      }, section)
    }
    init()
    return () => {
      isUnmounted = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-py"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--line)' }}
      aria-label="Contact and project enquiry"
    >
      <div className="site-container">

        <div data-reveal style={{ width: '40px', height: '1px', background: 'var(--accent-gold)', marginBottom: '28px' }} />

        <div data-reveal className="section-label" style={{ marginBottom: '24px' }}>
          <span className="section-label-bullet" />
          <span className="t-label">Lukhdatar & Sons / Let&apos;s Build</span>
        </div>

        <h2 data-reveal style={{
          fontSize: 'clamp(42px, 6vw, 96px)', fontWeight: 600,
          letterSpacing: '-0.025em', lineHeight: 0.92,
          color: 'var(--text-primary)', marginBottom: 'clamp(24px, 3vw, 40px)',
          maxWidth: '720px',
        }}>
          Ready for the next{' '}
          <span style={{ color: 'var(--accent-gold)' }}>requirement?</span>
        </h2>

        <p data-reveal className="t-body-lg" style={{ maxWidth: '560px', marginBottom: 'clamp(36px, 4vw, 56px)' }}>
          Looking for an established contractor for complete electrical SITC, HT/LT power distribution, substation erection, or cable infrastructure? Discuss your project scope and execution timeline directly with our team.
        </p>

        <div data-reveal style={{ width: '100%', height: '1px', background: 'var(--line-soft)', marginBottom: 'clamp(32px, 4vw, 48px)' }} />

        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, auto))', gap: '12px', maxWidth: '720px' }}>
          <a href="mailto:info@ldsinfrastructure.com" className="cta-btn cta-btn-primary" style={{ justifyContent: 'space-between' }}>
            Discuss a Project <span className="cta-arrow">↗</span>
          </a>
          <a href="mailto:info@ldsinfrastructure.com?subject=Equipment Enquiry" className="cta-btn" style={{ justifyContent: 'space-between' }}>
            Request Equipment <span className="cta-arrow">↗</span>
          </a>
          <a href="#capabilities" className="cta-btn" style={{ justifyContent: 'space-between' }}>
            Explore Capabilities <span className="cta-arrow">↗</span>
          </a>
          <a href="#projects" className="cta-btn" style={{ justifyContent: 'space-between' }}>
            View Project Experience <span className="cta-arrow">↗</span>
          </a>
        </div>

        <div data-reveal style={{ marginTop: 'clamp(48px, 6vw, 80px)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--line-gold)' }} />
          <span className="t-label" style={{ color: 'var(--text-muted)' }}>Kolkata, West Bengal, India</span>
        </div>
      </div>

      <style>{`
        .cta-btn {
          transition: border-color 300ms ease, background-color 300ms ease, color 300ms ease, transform 300ms ease;
        }
        .cta-btn .cta-arrow {
          display: inline-block;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-btn:hover .cta-arrow {
          transform: translateX(4px) translateY(-2px);
        }
        @media (max-width: 640px) {
          #contact [data-reveal]:nth-child(6) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
