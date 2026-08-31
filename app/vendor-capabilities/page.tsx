'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'
import { COMPANY } from '@/data/content'

export default function VendorPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    organisation: '',
    name: '',
    email: '',
    phone: '',
    projectType: 'Turnkey Electrification',
    enquiryType: 'Procurement Evaluation',
    location: '',
    requirement: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated form submission
    setFormSubmitted(true)
  }

  return (
    <PageLayout>
      {/* Hero section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Procurement & Evaluation</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05 }}>
            Vendor & Project
            <br />
            <span style={{ color: 'var(--accent-gold)' }}>Capabilities Profile</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Factual operational datasets, business scope parameters, safety practices, and compliance structures for procurement team evaluations.
          </p>
        </div>
      </section>

      {/* Main categories */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            {/* Left side — structured evaluation sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">Evaluation Checklist</span>
              </div>
              
              {[
                { num: '01', title: 'Company Information', text: `Legal Name: ${COMPANY.legalName}. Established in 1997. Turnkey electrical contractor since 2007. Location: ${COMPANY.location}.` },
                { num: '02', title: 'Business Scope', text: 'Turnkey electrical project contracting, substations and switchyards installation up to 220KV, transmission lines erection up to 400KV, and underground cable laying up to 66KV.' },
                { num: '03', title: 'Engineering Capability', text: 'Detailed electrical load calculation, protection relay coordination mapping, schematics and SLD development.' },
                { num: '04', title: 'Project Delivery', text: 'Integrated supply chain orchestration from approved manufacturers, field site construction, VCB erection, and cable pulling.' },
                { num: '05', title: 'Quality Approach', text: 'Comprehensive incoming inspection of switchgears, testing on site, and compliance documentation handover.' },
                { num: '06', title: 'Safety Approach', text: 'Strict PPE compliance on site, ground insulation audits, earth pit continuity checks, and compliance monitoring.' },
                { num: '07', title: 'Testing & Commissioning', text: 'Pre-commissioning tests, insulation resistance checks, relay settings calibration, and load trial supervisions.' },
                { num: '08', title: 'Maintenance Capability', text: 'Transformer oil filtration, preventative shutdown calibrations, breaker servicing, and predictive troubleshooting.' },
                { num: '09', title: 'Project Documentation', text: 'Factual as-built schematics, manufacturer testing logs, earth resistance audit certificates, and safety clearances.' }
              ].map((sec) => (
                <div key={sec.num} style={{ borderBottom: '1px solid var(--line-soft)', paddingBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--accent-gold)' }}>{sec.num}</span>
                    <span>{sec.title}</span>
                  </h3>
                  <p className="t-body" style={{ fontSize: '13px', margin: 0, paddingLeft: '32px' }}>
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right side — Inquiry form container */}
            <div style={{ background: 'var(--bg-light)', border: '1px solid var(--line-gold)', padding: 'clamp(24px, 3.5vw, 40px)', position: 'sticky', top: '100px' }}>
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Vendor Enquiry Form
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                      Submit your evaluation checklist or project parameters.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Organisation *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      style={{ padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Project Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        style={{ padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Requirement Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      style={{ padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                      <option>Turnkey Electrification</option>
                      <option>Substations & Switchyards</option>
                      <option>Transmission Lines</option>
                      <option>Underground Cable Laying</option>
                      <option>Industrial Electrification</option>
                      <option>Testing & Commissioning</option>
                      <option>Electrical Maintenance</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Enquiry Purpose
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      style={{ padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                      <option>Procurement Evaluation</option>
                      <option>OEM Partnership Explore</option>
                      <option>Project Bid RFP</option>
                      <option>Other Enquiry</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Brief Requirement Description *
                    </label>
                    <textarea
                      required
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      rows={4}
                      style={{ padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Upload Tender / Spec Document (Optional)
                    </label>
                    <input
                      type="file"
                      style={{ fontSize: '12px', color: 'var(--text-secondary)' }}
                    />
                  </div>

                  <button type="submit" className="cta-btn cta-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    Submit Enquiry
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201,160,82,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Enquiry Submitted
                  </h3>
                  <p className="t-body" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
                    Thank you. Lukhdatar & Sons' engineering and procurement team will evaluate your specifications and follow up at <strong>{formData.email}</strong>.
                  </p>
                  <button onClick={() => setFormSubmitted(false)} className="cta-btn">
                    Submit Another Enquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
