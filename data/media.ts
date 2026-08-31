// Centralized media manifest for LDS Infrastructure website
// All paths are relative to /public/media/
// When replacing placeholders, update only this file.

export const MEDIA = {
  // ── Intro + Hero ─────────────────────────────────────────
  introVideo: '/media/white-logo-intro.mp4',
  heroVideo: '/media/hero-bg.mp4',

  // ── Leadership ───────────────────────────────────────────
  leadership: {
    founder: '/media/founder-lalit.png',   // Mr. Lalit Kumar Sureka
    md: '/media/md-shree.png',             // Mr. Shree Mangalam Sureka
  },

  // ── Infrastructure / Cable Systems ───────────────────────
  cableSystems: '/media/underground-cabling-system.mp4',

  // ── Transmission ─────────────────────────────────────────
  transmission: '/media/substation.mp4',

  // ── Equipment Range ──────────────────────────────────────
  equipment: {
    busduct:           '/media/busduct.mp4',
    capacitorBank:     '/media/capacitor-bank.mp4',
    powerControlCenter: '/media/power-control-center.mp4',
  },

  // ── Turnkey / Workforce ──────────────────────────────────
  workers: '/media/workers.mp4',

  // ── Project Portfolio ────────────────────────────────────
  projects: {
    tajHotel:          '/media/taj-hotel.mp4',
    sonotel:           '/media/sonotel-project.mp4',
    assamHill:         '/media/aasam-hill-medical-college.mp4',
    sarojiniHospital:  '/media/sarojini-naidu-medical-hospital.mp4',
    skmcMedical:       '/media/shree-krishna-medical.mp4',
    biharVidhanSabha:  '/media/bihar-vidhan-sabha.mp4',
    warehouseProjects: '/media/warehouse-projects.mp4',
    kohoraSubstation:  '/media/kohora-substation.mp4',
    signature:         '/media/signature.mp4',
    shristinagar:      '/media/shristinagar.mp4',
  },

  // ── Industries Section ───────────────────────────────────
  // Keys match INDUSTRIES[].mediaKey in data/content.ts exactly.
  // Filenames verified against /public/media/ directory.
  industries: {
    education:      '/media/campus.mp4',        // 01 — Campus/Educational electrical infrastructure
    commercial:     '/media/commercial.mp4',    // 02 — Commercial complex electrical infrastructure
    residential:    '/media/residential.mp4',   // 03 — Residential / township electrical infrastructure
    medical:        '/media/hospital.mp4',      // 04 — Hospital electrical infrastructure
    township:       '/media/township.mp4',      // 05 — Township electrification
    warehousing:    '/media/warehouse.mp4',     // 06 — Warehouse / logistics electrical systems
    manufacturing:  '/media/industrial.mp4',    // 07 — Industrial electrical infrastructure
  },

  // ── Beyond Commissioning / Accountability ────────────────
  accountability:      '/media/accountability.mp4',
  beyondCommissioning: '/media/beyond-commissioning.mp4',
} as const

export type MediaKey = typeof MEDIA
