'use client'

import { useEffect } from 'react'
import { useLenis } from '@/lib/lenis'
import Header from '@/components/navigation/Header'
import Footer from '@/components/footer/Footer'
import LDSChatbot from '@/components/chatbot/LDSChatbot'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  // Initialize Lenis smooth scroll for pages
  useLenis()

  // Reset any body scroll locks from the intro sequence
  useEffect(() => {
    document.body.style.overflow = ''
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <LDSChatbot />
    </div>
  )
}
