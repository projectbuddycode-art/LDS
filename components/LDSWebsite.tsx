'use client'

import { useState, useEffect } from 'react'
import { useLenis } from '@/lib/lenis'

// Layout
import Header from '@/components/navigation/Header'
import Footer from '@/components/footer/Footer'

// Sections — in approved page flow order
import IntroSequence from '@/components/intro/IntroSequence'
import Hero from '@/components/hero/Hero'
import LeadershipSection from '@/components/leadership/LeadershipSection'
import EcosystemSection from '@/components/ecosystem/EcosystemSection'
import UndergroundCableSection from '@/components/cable-systems/UndergroundCableSection'
import CapabilitySection from '@/components/capability/CapabilitySection'
import TurnkeySection from '@/components/turnkey/TurnkeySection'
import EquipmentSection from '@/components/equipment/EquipmentSection'
import TransmissionSection from '@/components/transmission/TransmissionSection'
import ProjectPortfolio from '@/components/portfolio/ProjectPortfolio'
import BeyondCommissioning from '@/components/commissioning/BeyondCommissioning'
import IndustriesSection from '@/components/industries/IndustriesSection'
import AccountabilitySection from '@/components/accountability/AccountabilitySection'
import FinalCTA from '@/components/cta/FinalCTA'

// LDS Engineering Assist chatbot & Quote Modal
import LDSChatbot from '@/components/chatbot/LDSChatbot'
import QuoteModal from '@/components/quote/QuoteModal'

export default function LDSWebsite() {
  const [introComplete, setIntroComplete] = useState(false)

  // Initialize Lenis smooth scroll (only after intro)
  useLenis()

  // Lock scroll during intro, restore once complete
  useEffect(() => {
    if (introComplete) {
      document.body.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [introComplete])

  return (
    <>
      {/* Intro overlay (fixed, above everything) */}
      {!introComplete && (
        <IntroSequence onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main website — mounted immediately behind intro */}
      <div style={{
        opacity: 1,
        pointerEvents: introComplete ? 'all' : 'none',
      }}>
        <Header />

        <main>
          {/* ─ 01 Hero ──────────────────── */}
          <Hero />

          {/* ─ 02 Founder / Leadership ─── */}
          <LeadershipSection />

          {/* ─ 03 Industry Ecosystem ────── */}
          <EcosystemSection />

          {/* ─ 04 Underground Cable ──────── */}
          <UndergroundCableSection />

          {/* ─ 05 Capability ─────────────── */}
          <CapabilitySection />

          {/* ─ 06 Turnkey Electrification ── */}
          <TurnkeySection />

          {/* ─ 07 Equipment Range ─────────── */}
          <EquipmentSection />

          {/* ─ 08 Transmission Lines ──────── */}
          <TransmissionSection />

          {/* ─ 09 Project Portfolio ──────── */}
          <ProjectPortfolio />

          {/* ─ 10 Beyond Commissioning ────── */}
          <BeyondCommissioning />

          {/* ─ 11 Industries ─────────────── */}
          <IndustriesSection />

          {/* ─ 12 Built with Accountability ─ */}
          <AccountabilitySection />

          {/* ─ 13 Let's Build ─────────────── */}
          <FinalCTA />
        </main>

        <Footer />

        {/* ─ LDS Engineering Assist ─────── */}
        {/* Rendered outside main so it floats above all sections */}
        <LDSChatbot />

        {/* ─ LDS Unified Quote Modal ─────── */}
        <QuoteModal />
      </div>
    </>
  )
}
