'use client'

import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'

const FAQS = [
  {
    q: 'Who is Lukhdatar & Sons and when was the company established?',
    a: 'Lukhdatar & Sons was established in 1997 in Kolkata by Mr. Lalit Kumar Sureka as an electrical goods and equipment supplier. In 2007, under the leadership of Managing Director Mr. Shree Mangalam Sureka, the company transitioned into complete turnkey electrical contracting, delivering engineering, supply, installation, testing, and commissioning (SITC) across Government and Private sectors.'
  },
  {
    q: 'What is electrical SITC and what does it include?',
    a: 'SITC stands for Supply, Installation, Testing & Commissioning. In turnkey electrical contracting, SITC represents the complete delivery lifecycle: sourcing spec-compliant equipment (transformers, switchboards, cables), physical erection and wiring on-site, rigorous pre-energisation testing (insulation resistance, relay calibration, hipot), and grid-synchronized energisation with statutory compliance sign-offs.'
  },
  {
    q: 'What sectors does Lukhdatar & Sons undertake projects for?',
    a: 'Lukhdatar & Sons delivers turnkey electrical infrastructure across both Government and Private sectors. Key environments include Healthcare (medical colleges and hospitals), Government & Institutional (administrative complexes), Industrial Manufacturing, Logistics & Warehousing, Residential Townships, Commercial Complexes, and High-Voltage Utility Substations.'
  },
  {
    q: 'What in-house technical capabilities does Lukhdatar & Sons provide?',
    a: 'In-house capabilities include LV, MV, and HV electrical wiring and cabling, switchboards, HT and LT power panels, normal and emergency lighting installations, general power systems, earthing grids, lightning protection systems, electrical refurbishment, and substation equipment erection.'
  },
  {
    q: 'What services are coordinated with specialist subcontractors?',
    a: 'Where specialized engineering is required, Lukhdatar & Sons coordinates with specialist subcontractors for switchgear manufacturing, substation-specific specialized works, standby diesel generator sets, uninterruptible power supply (UPS) systems, and integrated security/low-voltage systems under one unified project management structure.'
  },
  {
    q: 'What high-voltage capacities can Lukhdatar & Sons deliver?',
    a: 'Lukhdatar & Sons engineers and executes underground cable systems up to 66KV, utility substations and switchyards up to 220KV, and overhead transmission line structures up to 400KV.'
  },
  {
    q: 'Does Lukhdatar & Sons provide maintenance after project commissioning?',
    a: 'Yes. Lukhdatar & Sons provides routine maintenance, planned shutdown servicing, transformer oil filtration, circuit breaker overhauls, earth pit resistance testing, and electrical refurbishment for completed projects as well as existing client installations.'
  },
  {
    q: 'What is the difference between electrical testing and commissioning?',
    a: 'Testing is the pre-energisation verification process that validates safety and integrity before power is introduced (insulation resistance tests, relay timing calibration, VCB contact resistance, grounding continuity). Commissioning is the formal energisation and live validation process that brings the installation into active service, verifies load balancing, and completes statutory utility handover.'
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
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Technical Resources & FAQs</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05 }}>
            Technical Insights &
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Company Information</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Verified company background, electrical SITC scopes, technical capabilities, and answers to common infrastructure procurement questions.
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', maxWidth: '840px' }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid var(--line-soft)', paddingBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.35 }}>
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
            Discuss Your Project Requirements
          </h2>
          <p className="t-body" style={{ maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px' }}>
            Share your project scope with our engineering team to discuss technical specifications, delivery approaches, and timeline coordination.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/vendor-capabilities?type=ResourceCentre" className="cta-btn cta-btn-primary">
              Discuss Electrical Scope
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
