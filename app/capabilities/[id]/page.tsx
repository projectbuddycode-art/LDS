import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'
import { CAPABILITIES_DATA } from '@/data/content'

// static generation parameters for Next.js build optimization
export function generateStaticParams() {
  return [
    { id: 'turnkey-electrification' },
    { id: 'substations-switchyards' },
    { id: 'transmission-lines' },
    { id: 'underground-cable-laying' },
    { id: 'industrial-electrification' },
    { id: 'healthcare-electrical-infrastructure' },
    { id: 'warehouse-electrification' },
    { id: 'testing-commissioning' },
    { id: 'electrical-maintenance' }
  ]
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CapabilityDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id
  const capability = CAPABILITIES_DATA[id]

  if (!capability) {
    return (
      <PageLayout>
        <section className="section-py" style={{ background: 'var(--bg-primary)', textAlign: 'center', marginTop: '72px' }}>
          <div className="site-container">
            <h1 className="t-headline" style={{ color: 'var(--accent-gold)' }}>Capability Not Found</h1>
            <p className="t-body" style={{ marginTop: '16px' }}>The requested technical capability could not be located.</p>
            <div style={{ marginTop: '32px' }}>
              <Link href="/capabilities" className="cta-btn">Back to Capabilities</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Header section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/capabilities" label="Capabilities Hub" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Technical Details</span>
          </div>
          <h1 className="t-headline" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.1, marginBottom: '16px' }}>
            {capability.title}
          </h1>
        </div>
      </section>

      {/* Main specification content */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            
            {/* Left Column — Scopes & Technical Specifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div>
                <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
                  What We Deliver
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {capability.deliverables.map((item, idx) => (
                    <li key={idx} className="t-body" style={{ fontSize: '14px', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '8px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
                  Project Scope & Capabilities
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {capability.scopes.map((item, idx) => (
                    <li key={idx} className="t-body" style={{ fontSize: '14px', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '8px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column — Specifications, Environments & Handovers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div>
                <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
                  Typical Project Environments
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {capability.environments.map((item, idx) => (
                    <li key={idx} className="t-body" style={{ fontSize: '14px', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '8px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
                  Lifecycle Integration
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {capability.lifecycle.map((item, idx) => (
                    <li key={idx} className="t-body" style={{ fontSize: '14px', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '8px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Technical Spec Matrix Table */}
          <div style={{ marginTop: '64px', borderTop: '1px solid var(--line)', paddingTop: '48px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Technical Parameters Matrix
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', border: '1px solid var(--line)', background: 'var(--bg-light)' }}>
              {capability.specs.map((spec, idx) => {
                const parts = spec.split(':')
                const label = parts[0]
                const value = parts[1] || spec
                return (
                  <div key={idx} style={{ display: 'contents' }}>
                    <div style={{ padding: '16px 20px', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {label}
                    </div>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line-soft)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {value}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ marginTop: '64px', textAlign: 'center', borderTop: '1px solid var(--line)', paddingTop: '48px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Discuss your electrical project requirements with our engineering team.
            </h3>
            <Link href={capability.ctaHref} className="cta-btn cta-btn-primary">
              {capability.ctaText}
            </Link>
          </div>

        </div>
      </section>
    </PageLayout>
  )
}
