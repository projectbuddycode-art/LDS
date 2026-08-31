'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// LDS KNOWLEDGE BASE — sourced exclusively from approved company materials
// Do not add unverified claims.
// ─────────────────────────────────────────────────────────────────────────────
const LDS_KB = {
  company: {
    name: 'Lukhdatar & Sons',
    legal: 'Lukhdatar & Sons',
    short: 'Lukhdatar & Sons',
    location: 'Kolkata, West Bengal, India',
    founded: '1997',
    turnkeySince: '2007',
    tagline: 'Power. Engineered to Endure.',
    email: 'info@ldsinfrastructure.com',
    about: `Lukhdatar & Sons is a Kolkata-based electrical infrastructure company established in 1997. Originally founded as an electrical goods supply business, Lukhdatar & Sons transitioned into full turnkey electrical contracting in 2007. Today, Lukhdatar & Sons delivers complete electrical infrastructure projects across commercial, residential, industrial, public and substation environments.`,
  },

  leadership: {
    founder: {
      name: 'Mr. Lalit Kumar Sureka',
      role: 'Founder',
      since: '1997',
      story: 'Mr. Lalit Kumar Sureka founded Lukhdatar & Sons in Kolkata in 1997 as an electrical goods supply business. His decade of direct exposure to equipment requirements and installation practices shaped Lukhdatar & Sons into a full turnkey contracting operation.',
    },
    md: {
      name: 'Mr. Shree Mangalam Sureka',
      role: 'Managing Director',
      since: '2007',
      story: 'Mr. Shree Mangalam Sureka joined Lukhdatar & Sons as it entered its contracting phase, bringing structured management discipline. As Managing Director, he oversees project delivery, client relationships and the company\'s long-term strategic direction.',
    },
  },

  capabilities: {
    summary: `Lukhdatar & Sons provides complete turnkey electrical infrastructure services including:
• Complete Electrical Design
• Substation & Switchyard works (up to 220KV)
• Internal / External Electrification
• HT / LT Distribution
• Underground Cabling (up to 66KV)
• Street & Aviation Lighting
• Transformer Installation
• VCB & LT Panels
• Overhead Transmission Lines (up to 400KV)
• Earthing & Lightning Protection
• Fire Detection Systems
• Public Address & EPABX
• UPS Systems
• Voice / Data Cabling
• MATV
• Cable Tray Fabrication
• Structures & Light Poles
• High Mast Lighting`,

    underground: 'Lukhdatar & Sons undertakes underground cable works up to 66KV.',
    substations: 'Lukhdatar & Sons handles substations and switchyard works up to 220KV, providing detailed engineering, procurement, construction, testing and commissioning, including commissioning a major 2 × 3.15 MVA substation with a Control Room and 9 VCB Panels at Kohora, Assam in only 100 working days.',
    transmission: 'Lukhdatar & Sons can deliver overhead transmission line projects up to 400KV.',
    turnkey: 'Lukhdatar & Sons delivers turnkey electrical projects covering Engineering, Supply, Installation, Testing and Commissioning as a single integrated scope.',
    lifecycle: 'Beyond commissioning, Lukhdatar & Sons provides Maintenance and Lifecycle Support — completing a 7-stage project lifecycle from Engineering through to ongoing operational support.',
  },

  equipment: {
    categories: [
      'LT Motor Control Centres (MCC)',
      'LT Power Control Centres (PCC)',
      'LT Power Factor Improvement Capacitor Panels',
      'AMF Panels',
      'Instrumentation Panels',
      'Control Panels',
      'LT Rising Mains',
      'Junction Boxes',
      'Tap-Off Boxes',
      'LT Distribution Boards',
      'Control Desks',
      'LT Bus Ducts',
      'Transformer Panels',
      'DG Panels',
      'Switchboards',
      'LT Feeder Pillar Boards',
      'Draw-Out & Non-Draw-Out Type Equipment',
      'Substation Equipment',
      'Transformers',
      'VCB Panels'
    ],
    highlighted: [
      'Bus Duct Systems',
      'Capacitor Banks',
      'Power Control Centres',
    ],
    summary: 'Lukhdatar & Sons supplies and installs a comprehensive range of HT/LT electrical equipment including panels, transformers, VCBs, bus ducts, capacitor banks and distribution systems.',
  },

  industries: {
    list: ['Hospitality', 'Healthcare', 'Government / Institutional', 'Industrial / Infrastructure', 'Substations', 'Residential / Township'],
    education: 'Lukhdatar & Sons has delivered power distribution and complete electrical infrastructure for educational campuses.',
    commercial: 'Lukhdatar & Sons delivers turnkey electrification for commercial complexes.',
    residential: 'Lukhdatar & Sons handles HT/LT distribution for residential projects including Prabhat Heights and Signature.',
    medical: 'Lukhdatar & Sons provides complete electrical SITC (Supply, Installation, Testing & Commissioning) for hospital and healthcare facilities including Assam Hill Medical College & Research Institute, Sarojini Naidu Medical Hospital in Agra, and Shri Krishna Medical College in Muzaffarpur.',
    township: 'Lukhdatar & Sons undertakes township electrification projects covering HT/LT distribution infrastructure including Shristinagar.',
    warehousing: 'Lukhdatar & Sons provides industrial electrical systems for warehouse and logistics facilities.',
    manufacturing: 'Lukhdatar & Sons delivers complete electrical infrastructure for manufacturing and industrial plants.',
    hospitality: 'Lukhdatar & Sons has delivered electrical infrastructure projects for hospitality clients including the Taj Group of Hotels and Sonotel.',
    government: 'Lukhdatar & Sons provides turnkey electrical infrastructure for government and institutional buildings, including the Bihar Vidhan Sabha.',
  },

  projects: {
    summary: 'Lukhdatar & Sons has delivered landmark electrical infrastructure projects including hospitality (Taj Group of Hotels, Sonotel), healthcare (Assam Hill Medical College & Research Institute, Sarojini Naidu Medical Hospital, Shri Krishna Medical College), government (Bihar Vidhan Sabha), industrial and warehouse electrification, major substations (such as the Kohora, Assam 2 × 3.15 MVA complete substation), and residential/township developments (Signature, Shristinagar, Prabhat Heights).',
    sectors: ['Hospitality', 'Healthcare', 'Government / Institutional', 'Industrial / Infrastructure', 'Substations', 'Residential / Township'],
  },

  contact: {
    email: 'info@ldsinfrastructure.com',
    location: 'Kolkata, West Bengal, India',
    cta: 'To discuss a project, you can contact our team at info@ldsinfrastructure.com or use the Start a Project button above.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// INTENT MATCHER — maps user input to structured LDS responses
// ─────────────────────────────────────────────────────────────────────────────
function getResponse(input: string): { text: string; actions?: string[]; scrollTo?: string } {
  const q = input.toLowerCase().trim()

  // About LDS
  if (/who is|what is|about|tell me about|what do you do|company|lukhdatar|sons/i.test(q)) {
    return {
      text: LDS_KB.company.about,
      actions: ['Capabilities', 'Project Experience', 'Leadership', 'Discuss a Project'],
    }
  }

  // Founded / history
  if (/found|established|history|when|start|begin|1997/i.test(q)) {
    return {
      text: `Lukhdatar & Sons was founded in ${LDS_KB.company.founded} by ${LDS_KB.leadership.founder.name} in Kolkata, initially as an electrical goods supply business. In ${LDS_KB.company.turnkeySince}, Lukhdatar & Sons expanded into full turnkey electrical contracting.`,
      actions: ['Leadership', 'Capabilities'],
    }
  }

  // Location
  if (/where|location|based|kolkata|india/i.test(q)) {
    return {
      text: `Lukhdatar & Sons is based in ${LDS_KB.company.location}.`,
      actions: ['Contact Us'],
    }
  }

  // Founder
  if (/lalit|founder|lalit kumar/i.test(q)) {
    return {
      text: LDS_KB.leadership.founder.story,
      actions: ['Managing Director', 'Company History'],
    }
  }

  // MD
  if (/shree|mangalam|managing director|md|director/i.test(q)) {
    return {
      text: LDS_KB.leadership.md.story,
      actions: ['Founder', 'Capabilities'],
    }
  }

  // Leadership
  if (/leadership|team|management/i.test(q)) {
    return {
      text: `Lukhdatar & Sons is led by:\n\n**Founder:** ${LDS_KB.leadership.founder.name} — established the company in 1997.\n\n**Managing Director:** ${LDS_KB.leadership.md.name} — oversees project delivery and strategic direction since 2007.`,
      actions: ['Capabilities', 'Project Experience'],
    }
  }

  // Underground cables
  if (/underground|cable|66kv|hv|high voltage cable/i.test(q)) {
    return {
      text: LDS_KB.capabilities.underground + '\n\n' + LDS_KB.capabilities.summary,
      scrollTo: '#capabilities',
      actions: ['Substations', 'Transmission', 'Discuss a Project'],
    }
  }

  // Substations
  if (/substation|switchyard|220kv/i.test(q)) {
    return {
      text: LDS_KB.capabilities.substations,
      scrollTo: '#capabilities',
      actions: ['Transmission', 'Underground Cable', 'Discuss a Project'],
    }
  }

  // Transmission
  if (/transmission|overhead|400kv|line/i.test(q)) {
    return {
      text: LDS_KB.capabilities.transmission,
      scrollTo: '#capabilities',
      actions: ['Substations', 'Underground Cable', 'Discuss a Project'],
    }
  }

  // Turnkey / full service
  if (/turnkey|full service|end.to.end|complete|engineering.*supply|lifecycle/i.test(q)) {
    return {
      text: LDS_KB.capabilities.turnkey + '\n\n' + LDS_KB.capabilities.lifecycle,
      scrollTo: '#capabilities',
      actions: ['Equipment', 'Industries', 'Discuss a Project'],
    }
  }

  // Capabilities
  if (/capabilit|service|what.*do|scope|work|offer|provide/i.test(q)) {
    return {
      text: LDS_KB.capabilities.summary,
      scrollTo: '#capabilities',
      actions: ['Underground Cable', 'Substations', 'Transmission', 'Discuss a Project'],
    }
  }

  // Equipment
  if (/equipment|panel|transformer|bus duct|capacitor|vcb|mcc|pcc|distribution board/i.test(q)) {
    return {
      text: LDS_KB.equipment.summary + '\n\nCategories include: ' + LDS_KB.equipment.categories.join(', ') + '.',
      scrollTo: '#equipment',
      actions: ['Request Equipment', 'Discuss a Project'],
    }
  }

  // Industries
  if (/industr|sector|which.*industry|what.*industry/i.test(q)) {
    return {
      text: `Lukhdatar & Sons serves the following industries:\n\n${LDS_KB.industries.list.map((s, i) => `${String(i + 1).padStart(2, '0')} — ${s}`).join('\n')}`,
      scrollTo: '#industries',
      actions: ['Hospitality', 'Healthcare', 'Government / Institutional', 'Industrial / Infrastructure', 'Residential / Township'],
    }
  }

  // Hospital / Healthcare
  if (/hospital|healthcare|medical|clinic/i.test(q)) {
    return {
      text: LDS_KB.industries.medical,
      scrollTo: '#industries',
      actions: ['Project Experience', 'Capabilities', 'Discuss a Project'],
    }
  }

  // Commercial
  if (/commercial|office|retail|complex/i.test(q)) {
    return {
      text: LDS_KB.industries.commercial,
      scrollTo: '#industries',
      actions: ['Project Experience', 'Capabilities', 'Discuss a Project'],
    }
  }

  // Residential / Township
  if (/residential|township|housing|apartment/i.test(q)) {
    return {
      text: LDS_KB.industries.residential + '\n\n' + LDS_KB.industries.township,
      scrollTo: '#industries',
      actions: ['Project Experience', 'Discuss a Project'],
    }
  }

  // Warehouse / Industrial / Manufacturing
  if (/warehouse|industrial|manufactur|factory|plant|logistics/i.test(q)) {
    return {
      text: LDS_KB.industries.warehousing + '\n\n' + LDS_KB.industries.manufacturing,
      scrollTo: '#industries',
      actions: ['Capabilities', 'Discuss a Project'],
    }
  }

  // Education
  if (/education|school|campus|university|college/i.test(q)) {
    return {
      text: LDS_KB.industries.education,
      scrollTo: '#industries',
      actions: ['Project Experience', 'Discuss a Project'],
    }
  }

  // Hospitality / Taj Hotel
  if (/hospitality|hotel|taj|restaurant|sonotel/i.test(q)) {
    return {
      text: LDS_KB.industries.hospitality,
      scrollTo: '#projects',
      actions: ['Project Experience', 'Discuss a Project'],
    }
  }

  // Government / Institutional / Bihar Vidhan Sabha
  if (/government|institutional|bihar|vidhan|sabha|govt/i.test(q)) {
    return {
      text: LDS_KB.industries.government,
      scrollTo: '#industries',
      actions: ['Project Experience', 'Capabilities', 'Discuss a Project'],
    }
  }

  // Projects / portfolio
  if (/project|portfolio|experience|delivered|work.*on|case/i.test(q)) {
    return {
      text: LDS_KB.projects.summary + '\n\nSectors: ' + LDS_KB.projects.sectors.join(', '),
      scrollTo: '#projects',
      actions: ['Capabilities', 'Industries', 'Discuss a Project'],
    }
  }

  // Maintenance / lifecycle
  if (/maintenan|lifecycle|after.*commission|support|ongoing/i.test(q)) {
    return {
      text: LDS_KB.capabilities.lifecycle,
      scrollTo: '#capabilities',
      actions: ['Capabilities', 'Discuss a Project'],
    }
  }

  // Contact
  if (/contact|email|phone|reach|talk|speak|enquir|discuss/i.test(q)) {
    return {
      text: `You can reach Lukhdatar & Sons at:\n\n📧 ${LDS_KB.contact.email}\n📍 ${LDS_KB.contact.location}\n\nFor project discussions, use the form above or reach out directly.`,
      actions: ['Discuss a Project', 'Capabilities'],
    }
  }

  // Fallback — unknown
  return {
    text: `I don't have that information in the current Lukhdatar & Sons company profile. You can contact our team directly at ${LDS_KB.contact.email} for further details.`,
    actions: ['About Us', 'Capabilities', 'Contact Us'],
  }
}

// Quick actions shown on open
const QUICK_ACTIONS = [
  { label: 'About Us',           query: 'What is Lukhdatar & Sons?' },
  { label: 'Capabilities',       query: 'What capabilities does Lukhdatar & Sons offer?' },
  { label: 'Project Experience', query: 'What projects has Lukhdatar & Sons delivered?' },
  { label: 'Equipment',          query: 'What equipment does Lukhdatar & Sons supply?' },
  { label: 'Industries',         query: 'Which industries does Lukhdatar & Sons serve?' },
  { label: 'Discuss a Project',  query: 'I would like to discuss a project' },
  { label: 'Contact Us',         query: 'How do I contact Lukhdatar & Sons?' },
]

// Project enquiry form state
type EnquiryStep = 'idle' | 'name' | 'company' | 'email' | 'phone' | 'type' | 'location' | 'requirement' | 'done'

interface Message {
  role: 'user' | 'assistant'
  text: string
  actions?: string[]
  isEnquiry?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// CHATBOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function LDSChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [enquiryStep, setEnquiryStep] = useState<EnquiryStep>('idle')
  const [enquiryData, setEnquiryData] = useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const smoothScrollTo = (hash: string) => {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const addMessage = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg])
  }, [])

  const sendResponse = useCallback((text: string, actions?: string[], scrollTo?: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      addMessage({ role: 'assistant', text, actions })
      if (scrollTo) smoothScrollTo(scrollTo)
    }, 480 + Math.random() * 280)
  }, [addMessage])

  // Handle action button click
  const handleAction = useCallback((action: string) => {
    const actionMap: Record<string, string> = {
      'About Us': 'What is Lukhdatar & Sons?',
      'Capabilities': 'What capabilities does Lukhdatar & Sons offer?',
      'Project Experience': 'What projects has Lukhdatar & Sons delivered?',
      'Equipment': 'What equipment does Lukhdatar & Sons supply?',
      'Industries': 'Which industries does Lukhdatar & Sons serve?',
      'Discuss a Project': 'I would like to discuss a project with Lukhdatar & Sons',
      'Contact Us': 'How do I contact Lukhdatar & Sons?',
      'Leadership': 'Tell me about Lukhdatar & Sons leadership',
      'Company History': 'What is the history of Lukhdatar & Sons?',
      'Founder': 'Who founded Lukhdatar & Sons?',
      'Managing Director': 'Who is the Managing Director of Lukhdatar & Sons?',
      'Underground Cable': 'Tell me about underground cable work',
      'Substations': 'Tell me about substation capabilities',
      'Transmission': 'Tell me about transmission line capabilities',
      'Hospitality': 'Tell me about hospitality projects',
      'Healthcare': 'What does Lukhdatar & Sons do for hospitals and healthcare?',
      'Government / Institutional': 'Tell me about government and institutional projects',
      'Industrial / Infrastructure': 'Tell me about industrial and warehouse projects',
      'Residential / Township': 'Tell me about residential and township developments',
      'Request Equipment': 'I need to request equipment information',
    }

    const query = actionMap[action] || action
    addMessage({ role: 'user', text: action })

    if (action === 'Discuss a Project') {
      setEnquiryStep('name')
      sendResponse(
        `I can connect you with our team. Let's gather some basic information.\n\nWhat is your name?`,
        undefined
      )
      return
    }

    if (action === 'Request Equipment') {
      sendResponse(
        `For equipment enquiries, please contact our team directly:\n\n📧 ${LDS_KB.contact.email}\n\nYou can specify the equipment category, application and your requirements in your message.`,
        ['Contact Us', 'Capabilities']
      )
      return
    }

    const response = getResponse(query)
    sendResponse(response.text, response.actions, response.scrollTo)
  }, [addMessage, sendResponse])

  // Handle project enquiry flow
  const handleEnquiryInput = useCallback((value: string) => {
    const steps: Record<EnquiryStep, { next: EnquiryStep; question: string; field: string }> = {
      name:        { next: 'company',     field: 'name',     question: `Thank you, ${value}. What company are you with?` },
      company:     { next: 'email',       field: 'company',  question: 'What is your email address?' },
      email:       { next: 'phone',       field: 'email',    question: 'What is the best phone number to reach you?' },
      phone:       { next: 'type',        field: 'phone',    question: 'What type of project is this? (e.g. Commercial, Industrial, Residential, Substation)' },
      type:        { next: 'location',    field: 'type',     question: 'Where is the project located?' },
      location:    { next: 'requirement', field: 'location', question: 'Briefly describe the electrical requirement or scope.' },
      requirement: { next: 'done',        field: 'requirement', question: '' },
      idle: { next: 'idle', field: '', question: '' },
      done: { next: 'done', field: '', question: '' },
    }

    const currentStep = steps[enquiryStep]
    if (!currentStep || enquiryStep === 'idle' || enquiryStep === 'done') return

    const updatedData = { ...enquiryData, [currentStep.field]: value }
    setEnquiryData(updatedData)

    if (enquiryStep === 'requirement') {
      setEnquiryStep('done')
      const summary = `
**Project Enquiry Received**

Name: ${updatedData.name}
Company: ${updatedData.company}
Email: ${updatedData.email}
Phone: ${updatedData.phone}
Project Type: ${updatedData.type}
Location: ${updatedData.location}
Requirement: ${value}

Thank you. Our team will review your enquiry and be in touch at ${updatedData.email}. For immediate assistance, contact info@ldsinfrastructure.com.`
      sendResponse(summary, ['Capabilities', 'Industries'])
    } else {
      setEnquiryStep(currentStep.next)
      sendResponse(currentStep.question)
    }
  }, [enquiryStep, enquiryData, sendResponse])

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    const value = inputValue.trim()
    if (!value) return

    addMessage({ role: 'user', text: value })
    setInputValue('')

    if (enquiryStep !== 'idle' && enquiryStep !== 'done') {
      handleEnquiryInput(value)
      return
    }

    const response = getResponse(value)
    sendResponse(response.text, response.actions, response.scrollTo)
  }, [inputValue, enquiryStep, addMessage, handleEnquiryInput, sendResponse])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const showQuickActions = messages.length === 0

  return (
    <>
      {/* ── Floating trigger button ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9000,
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Lukhdatar & Sons Assistant' : 'Open Lukhdatar & Sons Engineering Assistant'}
          aria-expanded={isOpen}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '13px 20px',
            background: 'var(--text-primary)',
            border: '1px solid rgba(201,160,82,0.30)',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#FAF8F5',
            transition: 'all 320ms cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1a2330'
            e.currentTarget.style.borderColor = 'var(--accent-gold)'
            e.currentTarget.style.paddingRight = '24px'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--text-primary)'
            e.currentTarget.style.borderColor = 'rgba(201,160,82,0.30)'
            e.currentTarget.style.paddingRight = '20px'
          }}
        >
          {/* Gold pulse indicator */}
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-gold)',
            flexShrink: 0,
            boxShadow: '0 0 0 0 rgba(201,160,82,0.4)',
            animation: isOpen ? 'none' : 'lds-pulse 2.4s infinite',
          }} />
          {isOpen ? '✕ Close' : 'Ask Us'}
          {!isOpen && (
            <span style={{
              display: 'inline-block',
              transition: 'transform 300ms ease',
              marginLeft: '2px',
              color: 'var(--accent-gold)',
            }}>
              →
            </span>
          )}
        </button>
      </div>

      {/* ── Chat panel ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lukhdatar & Sons Engineering Assistant"
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '28px',
            width: 'min(420px, calc(100vw - 40px))',
            height: 'min(580px, calc(100vh - 120px))',
            background: 'var(--bg-light)',
            border: '1px solid var(--line)',
            borderTop: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 8999,
            boxShadow: '0 16px 48px rgba(17,24,32,0.14), 0 4px 16px rgba(17,24,32,0.08)',
            animation: 'chatbot-enter 320ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--line-soft)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.8 6.2H15.4L10.8 9.4L12.6 14.6L8 11.4L3.4 14.6L5.2 9.4L0.6 6.2H6.2L8 1Z" fill="#C9A052"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Engineering Assist
                </div>
                <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginTop: '1px' }}>
                  Lukhdatar & Sons
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '16px', color: 'var(--text-muted)',
                width: '28px', height: '28px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Welcome message + quick actions */}
            {showQuickActions && (
              <div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Welcome to Engineering Assist.</span>
                  {' '}I can answer questions about Lukhdatar & Sons, capabilities, industries, projects and help you start a conversation with the team.
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}>
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleAction(action.label)}
                      style={{
                        padding: '7px 12px',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        color: 'var(--text-secondary)',
                        background: 'transparent',
                        border: '1px solid var(--line)',
                        cursor: 'pointer',
                        transition: 'all 250ms ease',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        e.currentTarget.style.color = 'var(--accent-gold)'
                        e.currentTarget.style.background = 'rgba(201,160,82,0.04)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--line)'
                        e.currentTarget.style.color = 'var(--text-secondary)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation messages */}
            {messages.map((msg, i) => (
              <div key={i}>
                <div style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: msg.actions ? '8px' : '0',
                }}>
                  {msg.role === 'assistant' && (
                    <div style={{
                      width: '20px', height: '20px',
                      background: 'var(--text-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginRight: '8px', marginTop: '2px',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1L9.8 6.2H15.4L10.8 9.4L12.6 14.6L8 11.4L3.4 14.6L5.2 9.4L0.6 6.2H6.2L8 1Z" fill="#C9A052"/>
                      </svg>
                    </div>
                  )}
                  <div style={{
                    maxWidth: '85%',
                    padding: msg.role === 'user' ? '10px 14px' : '12px 14px',
                    background: msg.role === 'user' ? 'var(--text-primary)' : 'var(--bg-secondary)',
                    border: msg.role === 'assistant' ? '1px solid var(--line-soft)' : 'none',
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: msg.role === 'user' ? '#FAF8F5' : 'var(--text-secondary)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.text.split('**').map((part, pi) =>
                      pi % 2 === 1
                        ? <strong key={pi} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{part}</strong>
                        : part
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '5px',
                    marginLeft: '28px',
                    marginTop: '6px',
                  }}>
                    {msg.actions.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleAction(action)}
                        style={{
                          padding: '5px 10px',
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--accent-gold)',
                          background: 'transparent',
                          border: '1px solid var(--line-gold)',
                          cursor: 'pointer',
                          transition: 'all 250ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(201,160,82,0.08)'
                          e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.borderColor = 'var(--line-gold)'
                        }}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '20px', height: '20px',
                  background: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L9.8 6.2H15.4L10.8 9.4L12.6 14.6L8 11.4L3.4 14.6L5.2 9.4L0.6 6.2H6.2L8 1Z" fill="#C9A052"/>
                  </svg>
                </div>
                <div style={{
                  padding: '10px 14px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--line-soft)',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width: '5px', height: '5px',
                      borderRadius: '50%',
                      background: 'var(--text-muted)',
                      animation: `lds-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div style={{
            borderTop: '1px solid var(--line-soft)',
            background: 'var(--bg-secondary)',
            padding: '12px 16px',
            flexShrink: 0,
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  enquiryStep !== 'idle' && enquiryStep !== 'done'
                    ? `Enter your ${enquiryStep}…`
                    : 'Ask about Lukhdatar & Sons capabilities, projects, industries…'
                }
                aria-label="Ask Lukhdatar & Sons Engineering Assistant"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  background: 'var(--bg-light)',
                  border: '1px solid var(--line)',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 250ms ease',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              />
              <button
                type="submit"
                aria-label="Send message"
                style={{
                  width: '40px', height: '40px',
                  background: inputValue.trim() ? 'var(--text-primary)' : 'var(--surface)',
                  border: 'none',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 250ms ease',
                  flexShrink: 0,
                  color: inputValue.trim() ? 'var(--accent-gold)' : 'var(--text-muted)',
                  fontSize: '16px',
                }}
              >
                →
              </button>
            </form>

            {/* Reset link */}
            {messages.length > 0 && (
              <button
                onClick={() => {
                  setMessages([])
                  setEnquiryStep('idle')
                  setEnquiryData({})
                }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '10px', letterSpacing: '0.10em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                  marginTop: '8px', padding: '0',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                Start new conversation
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatbot-enter {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lds-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,160,82,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(201,160,82,0); }
        }
        @keyframes lds-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-4px); opacity: 1; }
        }
        @media (max-width: 480px) {
          /* ensure chatbot button doesn't overlap OS bottom bar */
        }
      `}</style>
    </>
  )
}
