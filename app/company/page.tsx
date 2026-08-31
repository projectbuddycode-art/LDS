'use client'

import PageLayout from '@/components/layout/PageLayout'
import { COMPANY, TIMELINE, LEADERSHIP } from '@/data/content'
import Image from 'next/image'

export default function CompanyPage() {
  return (
    <PageLayout>
      {/* Hero section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Enterprise Profile</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05 }}>
            Lukhdatar & Sons
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Company Profile</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '640px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Factual engineering-led turnkey project execution since 1997. From electrical goods supplier to a leading high-voltage electrical contracting firm.
          </p>
        </div>
      </section>

      {/* 01 — Company Overview */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">01 — Company Overview</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '24px' }}>
                Our Journey
                <br />
                <span style={{ color: 'var(--accent-gold)' }}>and Milestones</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '32px' }}>
                Lukhdatar & Sons was formed in 1997 in Kolkata as an electrical goods supply business, laying down a deep decade-long foundation in equipment procurement and installer dynamics. In 2007, we transitioned into full-scale Turnkey Electrical Contracting. Today, we deliver complete infrastructure execution for government and private-sector developers.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              {TIMELINE.map((item) => (
                <div key={item.year} style={{ position: 'relative' }}>
                  <div style={{ fontSize: 'clamp(20px, 1.8vw, 28px)', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '8px' }}>
                    {item.year}
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {item.label}
                  </h3>
                  <p className="t-body" style={{ fontSize: '13.5px', margin: 0 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — What We Deliver */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">02 — What We Deliver</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '40px' }}>
            Complete Electrical Project
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Lifecycle Delivery</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', border: '1px solid var(--line)' }}>
            {[
              { title: 'Engineering', desc: 'Detailed load calculations, SLDs, protection settings, cable routing, and layouts.' },
              { title: 'Supply', desc: 'Verified procurement of panelboards, switchgears, and cables from certified suppliers.' },
              { title: 'Installation', desc: 'On-site execution, cable laying, equipment erection, and grounding grids.' },
              { title: 'Testing', desc: 'Continuity audits, HV insulation testing, relay calibrations, and VCB timing checks.' },
              { title: 'Commissioning', desc: 'Energisation, load trial supervision, clearance documents, and handovers.' },
              { title: 'Maintenance', desc: 'Scheduled preventative maintenance, transformer servicing, oil filtration, and shutdowns.' },
              { title: 'Lifecycle Support', desc: 'Predictive troubleshooting, upgrades, equipment swaps, and 24/7 technical assistance.' },
            ].map((stage, idx) => (
              <div key={stage.title} style={{ padding: '32px 28px', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '14px', letterSpacing: '0.14em' }}>
                  0{idx + 1} — {stage.title}
                </div>
                <p className="t-body" style={{ fontSize: '13px', margin: 0, lineHeight: 1.6 }}>{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Where We Operate & 04 — What We Execute */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">03 — Where We Operate</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '24px' }}>
                Private and Public
                <br />
                <span style={{ color: 'var(--accent-gold)' }}>Sectors</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '32px' }}>
                Lukhdatar & Sons operates in active project corridors under strict vendor specifications. We provide complete electrical SITC across Hospitality, Healthcare, Government/Institutional, Industrial, and Residential/Township sectors.
              </p>
            </div>

            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">04 — What We Execute</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Turnkey Electrical Projects',
                  'Electrical Infrastructure & Substations (up to 220KV)',
                  'Transmission Lines (up to 400KV)',
                  'Underground Cable Systems (up to 66KV)',
                  'HT and LT Power Distribution',
                  'Industrial & Warehouse Electrification',
                  'Healthcare & Institutional Projects',
                  'Maintenance & Lifecycle Support'
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', fontWeight: 500 }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Leadership and Accountability */}
      <section id="leadership" className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">05 — Leadership & Accountability</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '48px' }}>
            Accountability-driven
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Leadership</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
            {[
              { name: 'Mr. Lalit Kumar Sureka', role: 'Founder', since: '1997', bio: 'Founded Lukhdatar & Sons in 1997 as an electrical goods supply business. His direct exposure to equipment specifications and installation demands laid the groundwork for our turnkey engineering contracting operations.' },
              { name: 'Mr. Shree Mangalam Sureka', role: 'Managing Director', since: '2007', bio: 'Joined the company in 2007 as it transitioned into turnkey contracting. He oversees project delivery, client engineering coordinates, and Lukhdatar & Sons\' strategic enterprise growth direction.' }
            ].map((person) => (
              <div key={person.name} style={{ border: '1px solid var(--line)', padding: '36px 32px', background: 'var(--bg-light)', position: 'relative' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{person.name}</h3>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '20px' }}>
                  {person.role} — Since {person.since}
                </div>
                <p className="t-body" style={{ fontSize: '13.5px', margin: 0, lineHeight: 1.6 }}>{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — A Partner for Complex Electrical Delivery */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="section-label-bullet" />
            <span className="t-label">06 — Collaboration</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '24px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
            Partner for Complex
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Electrical Delivery</span>
          </h2>
          <p className="t-body" style={{ maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px' }}>
            We support OEMs, manufacturers, EPC contractors, system integrators, and infrastructure developers with compliant on-ground execution, technical verification, and operational lifecycle support.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/partner-with-us" className="cta-btn cta-btn-primary">
              Explore Partnership
            </a>
            <a href="/vendor-capabilities" className="cta-btn">
              Request Capability Profile
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
