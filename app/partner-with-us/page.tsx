'use client'

import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'

export default function PartnerPage() {
  return (
    <PageLayout>
      {/* Hero section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Engineering Collaborations</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05 }}>
            Engineering Partnerships
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Built for Execution.</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Lukhdatar & Sons supports OEMs, manufacturers, system integrators, EPC contractors and infrastructure organisations with on-ground engineering, electrical execution, commissioning and lifecycle support.
          </p>
        </div>
      </section>

      {/* Collaboration scope */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Collaboration Areas</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '40px' }}>
            Areas of Factual
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Mutual Integration</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px', background: 'var(--line)', border: '1px solid var(--line)' }}>
            {[
              { title: 'Product & System Integration', desc: 'Compliant installation of high-voltage switches, vacuum circuit breakers, control panels, and transformer infrastructure.' },
              { title: 'Electrical Engineering Execution', desc: 'On-ground execution of design calculations, load distribution alignments, cable lay routing, and site preparation.' },
              { title: 'Project Installation', desc: 'Supervision and complete placement of physical panels, cable trays, structural tower grids, and lighting assemblies.' },
              { title: 'Testing & Commissioning', desc: 'Independent insulation checks, HV testing, relay setting calibrations, and commissioning clearance files support.' },
              { title: 'Field Execution', desc: 'Reliable on-site execution in challenging environments under strict compliance policies.' },
              { title: 'Retrofit & Modernization', desc: 'Replacing, modifying, and updating legacy switchboards, old panels, and out-of-spec industrial circuits.' },
              { title: 'Maintenance Support', desc: 'Substation and switchyard preventative servicing, oil filtration schedules, and quick breakdown repairs.' },
              { title: 'Long-term Lifecycle Support', desc: 'Post-handover lifecycle engineering checks, operational support audits, and continuous safety monitoring.' }
            ].map((collab, idx) => (
              <div key={idx} style={{ padding: '32px 28px', background: 'var(--bg-light)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {collab.title}
                </h3>
                <p className="t-body" style={{ fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                  {collab.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner with Us */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">Enterprise Value</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '24px' }}>
                Why Partner
                <br />
                <span style={{ color: 'var(--accent-gold)' }}>With Us</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px' }}>
                Lukhdatar & Sons brings decades of on-ground contracting experience and vendor accountability. We operate as an execution extension for major technology developers and developers across India.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              {[
                { title: 'Established Project Delivery Experience', desc: 'Operating as a turnkey electrical contractor since 2007 with a factual background in grid projects.' },
                { title: 'End-to-End SITC Capability', desc: 'Managing the entire sequence from load design, panel supply, site layout, test validations, through to final commissioning.' },
                { title: 'Complex Electrical Infrastructure Execution', desc: 'Erecting high-voltage substations up to 220KV and transmission corridors up to 400KV.' },
                { title: 'Multi-sector Project Experience', desc: 'Successful delivery of hospitality, healthcare, institutional, residential, and industrial electrical projects.' },
                { title: 'Maintenance Beyond Commissioning', desc: 'Supporting developers with structured maintenance shutdown schedules and operational support plans.' },
                { title: 'Accountability-driven Execution', desc: 'Transparent site safety systems, documented clearances, and single-point coordination accountability.' }
              ].map((reason, idx) => (
                <div key={idx}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {reason.title}
                  </h3>
                  <p className="t-body" style={{ fontSize: '13px', margin: 0 }}>
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="site-container">
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '24px' }}>
            Become a Delivery Partner
          </h2>
          <p className="t-body" style={{ maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px' }}>
            We work with manufacturers, EPC companies, and developers to deliver compliant infrastructure. Discuss collaboration opportunities with Lukhdatar & Sons.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/vendor-capabilities?type=Partnership" className="cta-btn cta-btn-primary">
              Discuss a Partnership
            </a>
            <a href="/vendor-capabilities?type=CompanyProfile" className="cta-btn">
              Request Company Profile
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
