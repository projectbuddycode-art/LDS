'use client'

import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'
import { PROJECTS, INDUSTRIES } from '@/data/content'
import { MEDIA } from '@/data/media'
import LazyVideo from '@/components/LazyVideo'
import Link from 'next/link'
import { openQuoteModal } from '@/lib/quoteEvents'

export default function ProjectsIndustriesPage() {
  const projectMediaMap: Record<string, string> = {
    tajHotel:          MEDIA.projects.tajHotel,
    sonotel:           MEDIA.projects.sonotel,
    assamHill:         MEDIA.projects.assamHill,
    sarojiniHospital:  MEDIA.projects.sarojiniHospital,
    skmcMedical:       MEDIA.projects.skmcMedical,
    biharVidhanSabha:  MEDIA.projects.biharVidhanSabha,
    warehouseProjects: MEDIA.projects.warehouseProjects,
    kohoraSubstation:  MEDIA.projects.kohoraSubstation,
    signature:         MEDIA.projects.signature,
    shristinagar:      MEDIA.projects.shristinagar,
  }

  const projectPosterMap: Record<string, string> = {
    tajHotel:          '/media/posters/taj-hotel.jpg',
    sonotel:           '/media/posters/sonotel-project.jpg',
    assamHill:         '/media/posters/aasam-hill-medical-college.jpg',
    sarojiniHospital:  '/media/posters/sarojini-naidu-medical-hospital.jpg',
    skmcMedical:       '/media/posters/shree-krishna-medical.jpg',
    biharVidhanSabha:  '/media/posters/bihar-vidhan-sabha.jpg',
    warehouseProjects: '/media/posters/warehouse-projects.jpg',
    kohoraSubstation:  '/media/posters/kohora-substation.jpg',
    signature:         '/media/posters/signature.jpg',
    shristinagar:      '/media/posters/shristinagar.jpg',
  }

  const industryPosterMap: Record<string, string> = {
    manufacturing:        '/media/posters/industrial.jpg',
    commercial:           '/media/posters/commercial.jpg',
    warehousing:          '/media/posters/warehouse.jpg',
    realEstate:           '/media/posters/residential.jpg',
    institutions:         '/media/posters/campus.jpg',
    utilities:            '/media/posters/substation.jpg',
    industrialFacilities: '/media/posters/industrial.jpg',
    infrastructure:       '/media/posters/infrastructure.jpg',
  }

  return (
    <PageLayout>
      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">PROJECTS &amp; INDUSTRIES</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, textWrap: 'balance' }}>
            Projects &amp;{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Industries Served</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Explore verified project execution highlights across hospitality, healthcare campuses, logistics warehouses, government facilities, and residential townships.
          </p>
        </div>
      </section>

      {/* ── Section 1: Verified Project Portfolio ─────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label" style={{ marginBottom: '16px' }}>
            <span className="section-label-bullet" />
            <span className="t-label">DELIVERED PROJECTS</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '36px', textWrap: 'balance' }}>
            Featured Project{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Execution Experience</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  border: '1px solid var(--line-soft)',
                }}
              >
                <div style={{ position: 'absolute', inset: 0 }}>
                  <LazyVideo
                    src={projectMediaMap[proj.mediaKey]}
                    poster={projectPosterMap[proj.mediaKey]}
                    aria-label={proj.title}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,14,18,0.92) 0%, rgba(10,14,18,0.3) 50%, transparent 80%)',
                  zIndex: 2,
                }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', zIndex: 3 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="t-label" style={{ color: 'var(--accent-gold)' }}>{proj.tag}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(250,248,245,0.4)', fontWeight: 600 }}>0{idx + 1}</span>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#FAF8F5', marginBottom: '4px' }}>
                    {proj.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(250,248,245,0.70)', lineHeight: 1.4 }}>
                    {proj.scope}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Industries (8 Dedicated Sectors) ─────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label" style={{ marginBottom: '16px' }}>
            <span className="section-label-bullet" />
            <span className="t-label">INDUSTRIES</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '16px', textWrap: 'balance' }}>
            POWERING EVERY{' '}
            <span style={{ color: 'var(--accent-gold)' }}>SECTOR.</span>
          </h2>
          <p className="t-body" style={{ maxWidth: '540px', marginBottom: '40px' }}>
            Dedicated electrical engineering and installation solutions configured for each industrial sector.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: '16px',
          }}>
            {INDUSTRIES.map((ind, idx) => (
              <div
                key={ind.id}
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  border: '1px solid var(--line-soft)',
                }}
              >
                <div style={{ position: 'absolute', inset: 0 }}>
                  <LazyVideo
                    src={MEDIA.industries[ind.mediaKey]}
                    poster={industryPosterMap[ind.mediaKey]}
                    aria-label={ind.label}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,14,18,0.90) 0%, rgba(10,14,18,0.2) 40%, transparent 70%)',
                  zIndex: 2,
                }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-gold)' }}>0{idx + 1}</span>
                    <div style={{ width: '24px', height: '1px', background: 'var(--accent-gold)', opacity: 0.8 }} />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#FAF8F5' }}>
                    {ind.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Call to Action ─────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="site-container">
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '20px' }}>
            Ready for Your Next Project?
          </h2>
          <p className="t-body" style={{ maxWidth: '520px', margin: '0 auto 36px' }}>
            Tell us about your electrical project requirements and our engineering team will get in touch.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openQuoteModal()}
              className="cta-btn cta-btn-primary"
              style={{ cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Get a Quote ↗
            </button>
            <a href="/capabilities" className="cta-btn">
              Our Services ↗
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
