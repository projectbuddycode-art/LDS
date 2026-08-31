'use client'

import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'

export default function QualitySafetyPage() {
  return (
    <PageLayout>
      {/* Hero section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Safety & Quality Protocols</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05 }}>
            Quality & Safety
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Approach Protocols</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Lukhdatar & Sons operates under strict quality and safety compliance criteria. Every installation is tested, checked, and verified for grid safety and technical specifications compliance.
          </p>
        </div>
      </section>

      {/* Main steps */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Execution Principles</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '40px' }}>
            Lifecycle Quality
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Management</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px', background: 'var(--line)', border: '1px solid var(--line)' }}>
            {[
              { title: 'Planning', desc: 'Sourcing components from verified, client-approved manufacturer supply chains with documented specifications.' },
              { title: 'Engineering Review', desc: 'Validating electrical load diagrams, wiring routing constraints, and substation clearance distances.' },
              { title: 'Site Execution', desc: 'Erecting frames, laying cables in concrete trenches, and structural assembly checks under technical oversight.' },
              { title: 'Installation Checks', desc: 'Visual connection line audits, earth grid connectivity tests, and component alignment spacing checks.' },
              { title: 'Testing', desc: 'Hipot testing, insulation resistance testing, relay settings verification, and circuit breaker operation checks.' },
              { title: 'Commissioning', desc: 'Supervised energisation trials, load testing balance reviews, and utility clearance compliance documentation.' },
              { title: 'Maintenance', desc: 'Preventative shutdowns, oil filtrations, and contact replacement checking to guarantee operational lifespan.' }
            ].map((step, idx) => (
              <div key={idx} style={{ padding: '32px 28px', background: 'var(--bg-light)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '14px', letterSpacing: '0.14em' }}>
                  0{idx + 1} — {step.title}
                </div>
                <p className="t-body" style={{ fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Compliance Section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">Safety Principles</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '24px' }}>
                On-Ground Safety
                <br />
                <span style={{ color: 'var(--accent-gold)' }}>Mandates</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px' }}>
                Electrical infrastructure works carry high operational risk. Lukhdatar & Sons enforces strict field safety protocols to safeguard personnel and equipment assets.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              {[
                { title: 'Mandatory PPE Compliance', desc: 'All personnel wear certified protective helmets, insulating gloves, high-visibility jackets, and electrical safety footwear.' },
                { title: 'Trench & Laying Protections', desc: 'Cable trench barricading, warning tapes placement, and structural support frames during heavy digging.' },
                { title: 'High-Voltage Safety Checks', desc: 'Isolators interlocking checks, voltage testers checking before handling, and secure grounding switches.' },
                { title: 'Clean Earth Safety Grids', desc: 'Double copper earthing loops and lightning protection grids to secure panels and structures.' }
              ].map((safety, idx) => (
                <div key={idx}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {safety.title}
                  </h3>
                  <p className="t-body" style={{ fontSize: '13px', margin: 0 }}>
                    {safety.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Notice Section */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="site-container">
          <div style={{ maxWidth: '640px', margin: '0 auto', border: '1px solid var(--line-gold)', padding: '40px 32px', background: 'var(--bg-light)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Compliance & Certifications
            </h3>
            <p className="t-body" style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              Lukhdatar & Sons is committed to complying with state utility regulations and standard industry codes. Detailed safety credentials and past validation logs are available.
            </p>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', borderTop: '1px solid var(--line-soft)', paddingTop: '20px' }}>
              Certifications and compliance documentation available on request
            </div>
            <div style={{ marginTop: '24px' }}>
              <a href="/vendor-capabilities?type=QualitySafety" className="cta-btn cta-btn-primary">
                Request Safety Documentation
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
