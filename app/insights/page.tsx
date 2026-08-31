'use client'

import PageLayout from '@/components/layout/PageLayout'

const FAQS = [
  {
    q: 'What is SITC in electrical infrastructure?',
    a: 'SITC stands for Supply, Installation, Testing & Commissioning. It represents the complete execution sequence required to deliver functioning electrical assets. The contractor is responsible for sourcing spec-compliant equipment (Supply), physical erection and cabling (Installation), safety and insulation checks (Testing), and grid-synchronized energisation (Commissioning).'
  },
  {
    q: 'What is included in a turnkey electrical project?',
    a: 'A turnkey electrical project encompasses design validation, load engineering calculations, procurement of approved switchgears, transformers, VCB panels, cable trays routing, physical tower construction, underground trenching, testing checklists, safety audits, liaison clearances, and final utility-grid synchronization. The contractor acts as a single point of technical and operational accountability.'
  },
  {
    q: 'What happens after electrical commissioning?',
    a: 'After commissioning, the electrical assets enter the operations and maintenance stage. Post-commissioning support involves training client engineers on switchgear operation, handing over as-built layouts and testing reports, scheduled preventative maintenance shutdowns, transformer oil filtrations, relay calibration monitoring, and lifecycle part replacements.'
  },
  {
    q: 'What is the difference between testing and commissioning?',
    a: 'Testing is the pre-energisation audit process to check line integrity and isolate faults (e.g. insulation resistance testing, hipot testing, relay timings checks, grounding continuity checks). Commissioning is the actual energisation and validation sequence of putting the tested systems into active operation, verifying load balancing, and obtaining utility clearance handovers.'
  },
  {
    q: 'How is electrical infrastructure maintained?',
    a: 'Maintenance is executed via scheduled preventative shutdowns and predictive diagnostic checks. Key actions include transformer oil filtration and insulation testing, Servicing vacuum circuit breakers (VCB), checking earth pit resistance grids, inspecting cable joint boxes for heating, and updating legacy relay calibrations to prevent grid failures.'
  },
  {
    q: 'What electrical infrastructure does a healthcare facility require?',
    a: 'Healthcare facilities require dual-source grid backup configurations, automatic mains failure (AMF) synchronization panel boards, high-availability UPS backup systems, clean isolated grounding networks to protect medical scanners, and low-voltage integration (fire detection, public address systems, nurse call EPABX, and hospital ward cabling).'
  }
]

export default function InsightsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQS.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  }

  return (
    <PageLayout>
      {/* Schema injection for AEO / AI discoverability */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Technical Resources</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05 }}>
            Insights & Technical
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Resource Centre</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Factual engineering resource guides, SITC terminologies, lifecycle processes, and frequently asked electrical infrastructure questions.
          </p>
        </div>
      </section>

      {/* FAQs blocks */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Factual Answers</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '48px' }}>
            Frequently Asked
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Questions</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', maxWidth: '800px' }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid var(--line-soft)', paddingBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.3 }}>
                  {faq.q}
                </h3>
                <p className="t-body" style={{ fontSize: '14px', lineHeight: 1.7, margin: 0, color: 'var(--text-secondary)' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="site-container">
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '24px' }}>
            Have a Specific Question?
          </h2>
          <p className="t-body" style={{ maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px' }}>
            Our engineering team is ready to provide compliant specifications, details, and project estimates for your enterprise infrastructure needs.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/vendor-capabilities?type=ResourceCentre" className="cta-btn cta-btn-primary">
              Talk to an Electrical Infrastructure Team
            </a>
            <a href="/partner-with-us" className="cta-btn">
              Explore Partnership Options
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
