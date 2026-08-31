'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import { EQUIPMENT_RANGE, EQUIPMENT_CATEGORIES } from '@/data/content'

export default function EquipmentSection() {
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
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.08,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
          )
        })

        // Equipment cards scale reveal
        section.querySelectorAll('[data-eq-card]').forEach((card, i) => {
          gsap.fromTo(card,
            { scale: 0.96, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.75, ease: 'power2.out', delay: i * 0.12,
              scrollTrigger: { trigger: card, start: 'top 88%', once: true } }
          )
        })
      }, section)

      cleanup = () => ctx.revert()
    }
    init()
    return () => cleanup?.()
  }, [])

  const mediaMap: Record<string, string> = {
    busduct: MEDIA.equipment.busduct,
    capacitorBank: MEDIA.equipment.capacitorBank,
    powerControlCenter: MEDIA.equipment.powerControlCenter,
  }

  return (
    <section
      ref={sectionRef}
      className="section-py"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Equipment range"
    >
      <div className="site-container">

        <div style={{ marginBottom: 'clamp(36px, 4vw, 56px)' }}>
          <div data-reveal className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">07 — Equipment Range</span>
          </div>
          <div id="equipment-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'end' }}>
            <h2 data-reveal className="t-headline">
              Engineered
              <br />
              <span style={{ color: 'var(--accent-gold)' }}>to specification.</span>
            </h2>
            <p data-reveal className="t-body" style={{ maxWidth: '380px' }}>
              Lukhdatar & Sons supplies and installs a complete range of HT/LT electrical equipment —
              from bus ducts and capacitor banks to MCC/PCC panels, transformers and distribution boards.
            </p>
          </div>
        </div>

        {/* Equipment video cards */}
        <div id="equipment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          {EQUIPMENT_RANGE.map((item) => (
            <div key={item.id} data-eq-card className="equipment-card" style={{
              position: 'relative', aspectRatio: '4/5',
              overflow: 'hidden', background: 'var(--surface)',
            }}>
              <div className="equipment-card-media" style={{ position: 'absolute', inset: 0, transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <video
                  src={mediaMap[item.mediaKey]}
                  autoPlay muted playsInline loop preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  aria-label={item.title}
                />
              </div>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,14,18,0.78) 0%, transparent 50%)',
                zIndex: 2,
              }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 3 }}>
                <div className="t-label" style={{ color: 'rgba(250,248,245,0.50)', marginBottom: '6px' }}>Equipment</div>
                <div style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', fontWeight: 600, color: '#FAF8F5', letterSpacing: '-0.01em' }}>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment categories */}
        <div data-reveal>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px',
          }}>
            <span className="t-label" style={{ color: 'var(--text-muted)' }}>Full Equipment Range</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--line-soft)' }} />
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            border: '1px solid var(--line)',
          }}>
            {EQUIPMENT_CATEGORIES.map((cat) => (
              <div key={cat} style={{
                padding: '13px 16px', borderRight: '1px solid var(--line-soft)',
                borderBottom: '1px solid var(--line-soft)',
                fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)',
              }}>
                <span style={{
                  display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%',
                  background: 'var(--accent-gold)', marginRight: '10px', verticalAlign: 'middle',
                }} />
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .equipment-card {
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .equipment-card:hover {
          transform: translateY(-3px);
        }
        .equipment-card:hover .equipment-card-media {
          transform: scale(1.03);
        }
        @media (max-width: 768px) {
          #equipment-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          #equipment-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}
