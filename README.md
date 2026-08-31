# LDS Infrastructure Pvt. Ltd. — Production Website

**Lukhdatar & Sons / LDS Infrastructure Pvt. Ltd.**  
Complete electrical infrastructure — turnkey contracting, underground cable works, substations, and transmission up to 400KV.

---

## Architecture

```
lds-website/
├── app/
│   ├── globals.css        ← Design tokens, base styles, all utility classes
│   ├── layout.tsx         ← Root layout, SEO metadata, Inter font
│   └── page.tsx           ← Entry point
├── components/
│   ├── LDSWebsite.tsx     ← Page orchestrator (intro + all sections)
│   ├── navigation/Header.tsx
│   ├── intro/IntroSequence.tsx
│   ├── hero/Hero.tsx
│   ├── leadership/LeadershipSection.tsx
│   ├── ecosystem/EcosystemSection.tsx
│   ├── cable-systems/UndergroundCableSection.tsx
│   ├── capability/CapabilitySection.tsx
│   ├── turnkey/TurnkeySection.tsx
│   ├── equipment/EquipmentSection.tsx
│   ├── transmission/TransmissionSection.tsx
│   ├── portfolio/ProjectPortfolio.tsx
│   ├── commissioning/BeyondCommissioning.tsx
│   ├── industries/IndustriesSection.tsx
│   ├── accountability/AccountabilitySection.tsx
│   ├── cta/FinalCTA.tsx
│   └── footer/Footer.tsx
├── data/
│   ├── media.ts           ← Central media manifest — all asset paths
│   └── content.ts         ← All text content, sourced from company prospectus
├── lib/
│   └── lenis.ts           ← Lenis smooth scroll hook
└── public/
    └── media/             ← All uploaded assets (18 files)
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15 | Framework (App Router) |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility styling |
| GSAP | 3 | Scroll animations |
| Lenis | Latest | Smooth scroll |
| Inter | Google Fonts | Typography |

---

## Design System

All colors are CSS custom properties:

```css
--bg-primary:   #F5F2E9   /* Warm ivory */
--text-primary: #111820   /* Near-black */
--accent-gold:  #C9A052   /* Muted champagne gold */
```

**Color proportions**: 75-82% ivory / 12-18% near-black / 3-7% gold

---

## Development

```bash
cd lds-website
npm install
npm run dev
```

Open http://localhost:3000

---

## Production Build

```bash
npm run build
npm start
```

---

## Replacing Media

All asset paths are in `data/media.ts`. To replace any file:
1. Add new file to `public/media/`
2. Update the path in `data/media.ts`
3. No component changes needed

---

## Logo Replacement

The ecosystem section currently uses typography-based logo treatment.
When logo image files are uploaded:
1. Add images to `public/media/logos/`
2. Update `EcosystemSection.tsx` to render Image instead of span

---

## Page Flow (in order)

1. Intro Sequence
2. Hero
3. Founder / Leadership
4. Industry Ecosystem
5. Underground Cable Systems
6. Capability
7. Turnkey Electrification
8. Equipment Range
9. Transmission Lines
10. Project Portfolio
11. Beyond Commissioning
12. Industries (horizontal scroll)
13. Built with Accountability
14. CTA
15. Footer

---

## Content Source

All text content is sourced from the LDS company prospectus. Edit `data/content.ts` to update.

---

LDS Infrastructure Pvt. Ltd. - Kolkata, West Bengal, India
