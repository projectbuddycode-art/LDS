'use client'

import PageLayout from '@/components/layout/PageLayout'
import Link from 'next/link'
import BackNav from '@/components/navigation/BackNav'

const CAPABILITIES_LIST = [
  { id: 'turnkey-electrification', title: 'Turnkey Electrification', desc: 'Complete end-to-end electrical design, engineering, procurement, installation, and commissioning.' },
  { id: 'substations-switchyards', title: 'Substations & Switchyards', desc: 'Substation and switchyard works up to 220KV voltage capacity systems engineering.' },
  { id: 'transmission-lines', title: 'Transmission Lines', desc: 'Overhead transmission line towers installation, conductor stringing, and grid commissioning up to 400KV.' },
  { id: 'underground-cable-laying', title: 'Underground Cable Laying', desc: 'High-voltage underground cable trenching, laying, jointing, and termination up to 66KV.' },
  { id: 'industrial-electrification', title: 'Industrial Electrification', desc: 'Main panels, MCC/PCC, bus ducts, capacitor banks, and plant cabling for industrial zones.' },
  { id: 'healthcare-electrical-infrastructure', title: 'Healthcare Electrical Infrastructure', desc: 'Integrated clean power grids, earthing, alarms, and emergency AMF backup power for medical campuses.' },
  { id: 'warehouse-electrification', title: 'Warehouse Electrification', desc: 'Power distribution, cable trays routing, high masts, yard lighting, and lightning safety networks.' },
  { id: 'testing-commissioning', title: 'Testing & Commissioning', desc: 'HV continuity checks, relay calibrations, breaker operations, and grid clearance documents.' },
  { id: 'electrical-maintenance', title: 'Electrical Maintenance', desc: 'Scheduled preventive maintenance, shutdowns, oil filtrations, and emergency operational repairs.' },
]

export default function CapabilitiesPage() {
  return (
    <PageLayout>
      {/* Hero section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/#capabilities" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Technical Hub</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05 }}>
            Our Technical
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Capabilities</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '640px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Factual engineering-led delivery across the complete project lifecycle — from load designs through to ongoing preventative maintenance.
          </p>
        </div>
      </section>

      {/* Grid listing capabilities */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px', background: 'var(--line)', border: '1px solid var(--line)' }}>
            {CAPABILITIES_LIST.map((cap, idx) => (
              <div key={cap.id} style={{ padding: '40px 36px', background: 'var(--bg-light)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '260px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.14em' }}>
                      CAPABILITY 0{idx + 1}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
                    {cap.title}
                  </h2>
                  <p className="t-body" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
                    {cap.desc}
                  </p>
                </div>
                <div>
                  <Link href={`/capabilities/${cap.id}`} style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'opacity 200ms ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    View Specifications ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
