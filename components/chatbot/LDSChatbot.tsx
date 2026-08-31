'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// LDS VERIFIED KNOWLEDGE BASE — Sourced 100% from approved company materials
// ─────────────────────────────────────────────────────────────────────────────
const LDS_KB = {
  company: {
    name: 'Lukhdatar & Sons',
    legal: 'Lukhdatar & Sons',
    short: 'LDS',
    location: 'Kolkata, West Bengal, India',
    founded: '1997',
    turnkeySince: '2007',
    tagline: 'Power. Engineered to Endure.',
    pillars: 'Engineering • Equipment • Execution',
    email: 'info@ldsinfrastructure.com',
    about: `Lukhdatar & Sons (LDS) is a premier engineering-led electrical infrastructure company founded in 1997 in Kolkata. Originating as an electrical equipment and goods supplier, LDS expanded into full-scale Turnkey Electrical Contracting in 2007. Today, LDS delivers complete end-to-end electrical infrastructure across healthcare, government, commercial, residential, industrial, and utility substation environments.`,
    whyChoose: `Clients choose Lukhdatar & Sons because:\n\n1. **Engineering Precision**: Load design validation, single-line diagrams, and strict technical specification compliance.\n2. **Single Accountability**: Integrated SITC (Supply, Installation, Testing & Commissioning) with zero multi-vendor coordination bottlenecks.\n3. **High-Voltage Track Record**: Proven execution in substations up to 220KV, transmission lines up to 400KV, and underground cable networks up to 66KV.\n4. **Rapid Execution**: Demonstrated milestone speed, including energising the 2 × 3.15 MVA Kohora Substation in only 100 working days.\n5. **Beyond Commissioning**: 7-stage lifecycle support with scheduled preventative maintenance and emergency operational assistance.`,
  },

  leadership: {
    founder: {
      name: 'Mr. Lalit Kumar Sureka',
      role: 'Founder',
      since: '1997',
      story: 'Mr. Lalit Kumar Sureka founded Lukhdatar & Sons in Kolkata in 1997. His initial decade of direct equipment supply and technical distribution laid the bedrock of procurement acumen and engineering standards that enabled LDS to evolve into a full-scale turnkey electrical contractor.',
    },
    md: {
      name: 'Mr. Shree Mangalam Sureka',
      role: 'Managing Director',
      since: '2007',
      story: 'Mr. Shree Mangalam Sureka joined Lukhdatar & Sons as it transitioned into turnkey contracting in 2007. As Managing Director, he spearheads on-ground project execution, client relationships, engineering standards, and the company\'s long-term infrastructure expansion.',
    },
  },

  capabilities: {
    summary: `Lukhdatar & Sons provides complete turnkey electrical infrastructure across a 7-stage project lifecycle:\n\n• **Turnkey Electrification (SITC)**: Complete design, procurement, physical installation, and energisation.\n• **Substations & Switchyards**: High-voltage substations up to 220KV.\n• **Transmission Lines**: Overhead transmission tower lines up to 400KV.\n• **Underground Cable Systems**: Specialized trenching, laying, and jointing up to 66KV.\n• **HT / LT Distribution**: Main switchboards, PCC panels, MCCs, bus ducts, capacitor banks, and rising mains.\n• **Testing & Commissioning**: Relay calibrations, insulation resistance, hipot tests, and statutory grid clearances.\n• **Beyond Commissioning**: Preventative maintenance, transformer oil filtration, and operational lifecycle support.`,
    turnkey: `LDS delivers turnkey electrical infrastructure covering Engineering, Supply, Installation, Testing, and Commissioning (SITC) as a single accountable contract. We manage design approvals, equipment procurement, on-site physical erection, pre-commissioning safety audits, and grid synchronization.`,
    underground: `LDS specializes in high-voltage underground cable systems up to 66KV. Our capabilities include precision trenching, bedding, cable laying, cross-bonded jointing, heat-shrink terminations, and fault testing across challenging urban, industrial, and rocky terrains.`,
    substations: `LDS executes substations and switchyards up to 220KV capacity. Our scope includes transformer yards, vacuum circuit breaker (VCB) panels, control room SCADA interfaces, capacitor banks, and earthing grids. A prime example is our turnkey delivery of the 2 × 3.15 MVA Substation at Kohora, Assam in just 100 working days.`,
    transmission: `LDS delivers overhead high-voltage transmission line infrastructure up to 400KV, encompassing foundation erection, steel tower assembly, hardware fittings, conductor stringing, and statutory safety energisation clearances.`,
    htLt: `Our HT/LT power distribution capabilities include transformer installation, LT feeder pillars, power control centres (PCC), motor control centres (MCC), bus duct trunking, automatic power factor correction (APFC) capacitor banks, and internal/external cabling.`,
    lifecycle: `Beyond commissioning, LDS completes the 7-stage project lifecycle with Maintenance & Operational Support: scheduled preventative maintenance, transformer oil dielectric filtration, relay recalibrations, thermal imaging of panel busbars, and emergency technical troubleshooting.`,
  },

  equipment: {
    summary: `LDS supplies and installs a full range of spec-compliant HT/LT electrical equipment:\n\n• **LT Bus Ducts**: High-amperage sandwich & air-insulated trunking\n• **Power Control Centres (PCC)**: Heavy industrial main distribution switchboards\n• **Motor Control Centres (MCC)**: Draw-out & non-draw-out motor management\n• **Capacitor Banks**: APFC panels for power factor optimization\n• **VCB Panels & Switchgears**: High-reliability vacuum circuit breakers\n• **Transformers**: Step-up and step-down utility transformers\n• **AMF & DG Panels**: Automatic mains failure synchronization`,
  },

  projects: {
    tajHotel: {
      title: 'Taj Group of Hotels',
      sector: 'Hospitality',
      scope: 'Electrical Infrastructure',
      details: 'Delivered robust electrical infrastructure systems supporting luxury hospitality operations with dual backup power and premium lighting distribution.',
    },
    sonotel: {
      title: 'Sonotel',
      sector: 'Hospitality',
      scope: 'Complete SITC & Electrical Infrastructure',
      details: 'Full turnkey supply, installation, testing, and commissioning of primary power panels, bus ducts, DG synchronization, and aesthetic interior/exterior lighting.',
    },
    assamHill: {
      title: 'Assam Hill Medical College & Research Institute',
      sector: 'Healthcare / Medical',
      scope: 'Complete Electrical SITC',
      details: 'Engineered high-availability clean power distribution grids, transformer yards, LT rising mains, isolated earthing, and low-voltage integration for medical college blocks, surgical wards, and laboratories.',
    },
    sarojiniHospital: {
      title: 'Sarojini Naidu Medical Hospital, Agra',
      sector: 'Healthcare / Medical',
      scope: 'SITC of Electrical Installations',
      details: 'Modernized core electrical installations, installed capacitor banks, main power panels, bus ducts, and high-conductivity earthing networks with zero disruption to active patient care.',
    },
    skmcMedical: {
      title: 'Shri Krishna Medical College, Muzaffarpur',
      sector: 'Healthcare / Medical',
      scope: 'Complete Electrical SITC',
      details: 'Delivered complete electrical infrastructure including campus HT/LT cable tray networks, transformer erection, HT VCB panels, sub-distribution boards, and general/emergency illumination grids.',
    },
    biharVidhanSabha: {
      title: 'Bihar Vidhan Sabha',
      sector: 'Government / Institutional',
      scope: 'Turnkey Infrastructure Electrification',
      details: 'Executed turnkey electrical infrastructure for the state legislative complex, incorporating high-security power routing, primary distribution panels, underground feeder ducts, and backup power synchronization.',
    },
    warehouseProjects: {
      title: 'Warehouse Electrification Projects',
      sector: 'Industrial / Infrastructure',
      scope: 'Industrial Power Distribution',
      details: 'Installed heavy overhead cable tray networks, high-bay lighting, external yard high-masts, motor distribution boards, and lightning safety networks across extensive logistics facilities.',
    },
    kohoraSubstation: {
      title: 'Kohora, Assam',
      sector: 'Substation',
      scope: '2 × 3.15 MVA Substation, Control Room & VCB Panels',
      details: 'Completed complete engineering, supply, erection, testing, and utility energisation of a 2 × 3.15 MVA substation with a dedicated Control Room and 9 VCB Panels in only 100 working days in challenging Assam terrain.',
    },
    signature: {
      title: 'Signature',
      sector: 'Residential / Township',
      scope: 'HT/LT Power Distribution',
      details: 'Engineered multi-point HT/LT distribution, transformer yards, LT control panels, and sub-metering grids for premium multi-storey residential living.',
    },
    shristinagar: {
      title: 'Shristinagar',
      sector: 'Residential / Township',
      scope: 'HT/LT Power Distribution',
      details: 'Executed comprehensive outdoor township electrification including weather-proof LT feeder pillar boards, underground distribution loops, and street lighting networks.',
    },
  },

  sectors: [
    'Healthcare / Medical Campuses',
    'Government & Institutional Complexes',
    'Industrial & Warehouse Infrastructure',
    'High-Voltage Utility Substations',
    'Residential Developments & Townships',
    'Hospitality & Commercial Centres'
  ],

  contact: {
    email: 'info@ldsinfrastructure.com',
    location: 'Kolkata, West Bengal, India',
    cta: 'For project discussions, technical tenders, or vendor capability evaluations, reach out to our engineering team at info@ldsinfrastructure.com.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// INTENT MATCHER — Exact verified knowledge matching
// ─────────────────────────────────────────────────────────────────────────────
function getResponse(input: string): { text: string; actions?: string[]; scrollTo?: string } {
  const q = input.toLowerCase().trim()

  // 1. Specific Projects
  if (/bihar|vidhan|sabha/i.test(q)) {
    const p = LDS_KB.projects.biharVidhanSabha
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['All Projects', 'Turnkey Electrification', 'Discuss a Project'],
    }
  }

  if (/kohora|kohra|assam.*substation/i.test(q)) {
    const p = LDS_KB.projects.kohoraSubstation
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['Substations & Switchyards', 'All Projects', 'Discuss a Project'],
    }
  }

  if (/assam.*(hill|medical|college)/i.test(q)) {
    const p = LDS_KB.projects.assamHill
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['Healthcare Projects', 'All Projects', 'Discuss a Project'],
    }
  }

  if (/sarojini|naidu|agra/i.test(q)) {
    const p = LDS_KB.projects.sarojiniHospital
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['Healthcare Projects', 'All Projects', 'Discuss a Project'],
    }
  }

  if (/shri krishna|shree krishna|skmc|muzaffarpur/i.test(q)) {
    const p = LDS_KB.projects.skmcMedical
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['Healthcare Projects', 'All Projects', 'Discuss a Project'],
    }
  }

  if (/sonotel/i.test(q)) {
    const p = LDS_KB.projects.sonotel
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['All Projects', 'Turnkey Electrification', 'Discuss a Project'],
    }
  }

  if (/taj|hotel/i.test(q)) {
    const p = LDS_KB.projects.tajHotel
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['All Projects', 'Turnkey Electrification', 'Discuss a Project'],
    }
  }

  if (/signature/i.test(q)) {
    const p = LDS_KB.projects.signature
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['Residential Projects', 'All Projects', 'Discuss a Project'],
    }
  }

  if (/shristinagar|sristinagar/i.test(q)) {
    const p = LDS_KB.projects.shristinagar
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['Residential Projects', 'All Projects', 'Discuss a Project'],
    }
  }

  if (/warehouse/i.test(q)) {
    const p = LDS_KB.projects.warehouseProjects
    return {
      text: `**${p.title}** (${p.sector})\n\n**Scope:** ${p.scope}\n\n${p.details}`,
      scrollTo: '#projects',
      actions: ['Industrial Projects', 'All Projects', 'Discuss a Project'],
    }
  }

  // 2. Healthcare Sector / Medical
  if (/healthcare|hospital|medical|clinic/i.test(q)) {
    return {
      text: `**Healthcare Infrastructure by Lukhdatar & Sons**\n\nLDS provides complete electrical SITC for major medical campuses and research hospitals, ensuring uninterrupted power availability, dual grid failover, isolated grounding, and low-voltage hospital systems.\n\n**Key Healthcare Projects:**\n• **Assam Hill Medical College & Research Institute** — Complete electrical SITC across college blocks, labs & hospital wards.\n• **Sarojini Naidu Medical Hospital, Agra** — Main distribution grids, bus ducts, capacitor banks & grounding.\n• **Shri Krishna Medical College, Muzaffarpur** — Complete electrical SITC, HT VCB panels & illumination.`,
      scrollTo: '#projects',
      actions: ['Assam Hill Medical', 'Sarojini Naidu Hospital', 'Shri Krishna Medical', 'Discuss a Project'],
    }
  }

  // 3. Government / Institutional
  if (/government|institutional|govt|public sector|state/i.test(q)) {
    return {
      text: `**Government & Institutional Capabilities**\n\nLukhdatar & Sons delivers turnkey infrastructure electrification for government, public-sector, and legislative institutions under strict clearance and safety compliance.\n\n**Key Project:**\n• **Bihar Vidhan Sabha** — Turnkey electrical infrastructure, primary power panels, and backup synchronization for the legislative complex.`,
      scrollTo: '#projects',
      actions: ['Bihar Vidhan Sabha', 'Turnkey Electrification', 'Discuss a Project'],
    }
  }

  // 4. Turnkey SITC / Electrification
  if (/turnkey|sitc|what is sitc|electrification capability|end.to.end/i.test(q)) {
    return {
      text: `**Turnkey Electrification (SITC) by Lukhdatar & Sons**\n\n${LDS_KB.capabilities.turnkey}\n\n**Core SITC Deliverables:**\n• **Supply**: Spec-compliant procurement of transformers, VCBs, panels, bus ducts, and cables.\n• **Installation**: Erection of towers, panels, cable trays, grounding grids, and underground laying.\n• **Testing**: Pre-energisation hipot checks, relay calibrations, and insulation resistance.\n• **Commissioning**: Utility grid synchronization and statutory clearances.`,
      scrollTo: '#capabilities',
      actions: ['Underground Cabling', 'Substations & Lines', 'Beyond Commissioning', 'Discuss a Project'],
    }
  }

  // 5. Underground Cable Systems
  if (/underground|cable|trench|jointing|66kv/i.test(q)) {
    return {
      text: `**Underground Cable Systems (up to 66KV)**\n\n${LDS_KB.capabilities.underground}\n\nOur specialized teams manage trench excavation, cable bedding, protective ducting, thermal backfilling, and high-voltage jointing/terminations.`,
      scrollTo: '#capabilities',
      actions: ['Turnkey Electrification', 'Substations & Lines', 'Discuss a Project'],
    }
  }

  // 6. Substations & Switchyards
  if (/substation|switchyard|220kv|transformer yard|vcb/i.test(q)) {
    return {
      text: `**Substations & Switchyards (up to 220KV)**\n\n${LDS_KB.capabilities.substations}\n\nWe deliver complete engineering, civil foundations, gantry structures, transformer erection, VCB panels, protection relays, and control room SCADA interfacing.`,
      scrollTo: '#capabilities',
      actions: ['Kohora Assam Substation', 'Transmission Lines', 'Discuss a Project'],
    }
  }

  // 7. Transmission Lines
  if (/transmission|overhead|400kv|tower|stringing/i.test(q)) {
    return {
      text: `**Overhead Transmission Lines (up to 400KV)**\n\n${LDS_KB.capabilities.transmission}\n\nEncompasses site survey, route clearing, tower foundation casting, lattice tower erection, insulator assembly, and tension conductor stringing.`,
      scrollTo: '#capabilities',
      actions: ['Substations & Switchyards', 'Turnkey Electrification', 'Discuss a Project'],
    }
  }

  // 8. HT / LT Power Distribution
  if (/ht.*lt|distribution|feeder pillar|rising main|power distribution/i.test(q)) {
    return {
      text: `**HT / LT Power Distribution**\n\n${LDS_KB.capabilities.htLt}\n\nDelivered across residential towers (Signature), integrated townships (Shristinagar), industrial parks, and healthcare campuses.`,
      scrollTo: '#capabilities',
      actions: ['Equipment Range', 'Residential Projects', 'Discuss a Project'],
    }
  }

  // 9. Equipment Range
  if (/equipment|panel|busduct|bus duct|capacitor|pcc|mcc|amf/i.test(q)) {
    return {
      text: `${LDS_KB.equipment.summary}`,
      scrollTo: '#equipment',
      actions: ['Turnkey Electrification', 'Request Equipment Info', 'Discuss a Project'],
    }
  }

  // 10. Beyond Commissioning / Maintenance
  if (/maintenan|lifecycle|after commissioning|post.commissioning|preventative/i.test(q)) {
    return {
      text: `**Beyond Commissioning — Lifecycle Support**\n\n${LDS_KB.capabilities.lifecycle}\n\nLDS remains committed to asset longevity with preventative maintenance schedules, breakdown repairs, and engineering audits.`,
      scrollTo: '#capabilities',
      actions: ['Turnkey Electrification', 'Why Choose LDS', 'Discuss a Project'],
    }
  }

  // 11. Company Overview / Who is LDS / About
  if (/who is|what is|about|tell me about|what do you do|company overview|lukhdatar/i.test(q)) {
    return {
      text: LDS_KB.company.about,
      scrollTo: '#about',
      actions: ['Capabilities', 'Project Portfolio', 'Leadership', 'Discuss a Project'],
    }
  }

  // 12. History / Foundation
  if (/history|founded|established|when.*start|milestones|1997|2007/i.test(q)) {
    return {
      text: `**Company History**\n\n• **1997**: Founded in Kolkata by Mr. Lalit Kumar Sureka as an electrical goods and supply business.\n• **2007**: Managing Director Mr. Shree Mangalam Sureka joined as the company expanded into full-scale Turnkey Electrical Contracting.\n• **Present**: Leading electrical infrastructure firm executing high-voltage substations, transmission lines, and mega turnkey projects across India.`,
      scrollTo: '#about',
      actions: ['Leadership', 'Capabilities', 'Project Portfolio'],
    }
  }

  // 13. Leadership
  if (/leadership|founder|lalit|shree|director|management|md/i.test(q)) {
    return {
      text: `**Leadership at Lukhdatar & Sons**\n\n• **Founder:** ${LDS_KB.leadership.founder.name} — Established the company in 1997; shaped our deep procurement and installation standards.\n• **Managing Director:** ${LDS_KB.leadership.md.name} — Joined in 2007 to lead the turnkey contracting expansion, overseeing project execution and engineering quality.`,
      scrollTo: '#about',
      actions: ['Company History', 'Capabilities', 'Discuss a Project'],
    }
  }

  // 14. Why Choose LDS
  if (/why choose|why lds|advantage|strengths|differentiator/i.test(q)) {
    return {
      text: LDS_KB.company.whyChoose,
      scrollTo: '#about',
      actions: ['Capabilities', 'Project Portfolio', 'Discuss a Project'],
    }
  }

  // 15. Industries / Sectors Served
  if (/industr|sector|what markets|who do you serve/i.test(q)) {
    return {
      text: `**Sectors Served by Lukhdatar & Sons**\n\n${LDS_KB.sectors.map((s, i) => `0${i + 1} — ${s}`).join('\n')}`,
      scrollTo: '#industries',
      actions: ['Healthcare', 'Government', 'Industrial / Warehouse', 'Substations'],
    }
  }

  // 16. Projects Summary
  if (/project|portfolio|track record|case stud/i.test(q)) {
    return {
      text: `**Lukhdatar & Sons Landmark Projects**\n\n• **Hospitality**: Taj Group of Hotels, Sonotel\n• **Healthcare**: Assam Hill Medical College, Sarojini Naidu Hospital Agra, Shri Krishna Medical College Muzaffarpur\n• **Government**: Bihar Vidhan Sabha\n• **Substations**: Kohora, Assam 2 × 3.15 MVA Substation\n• **Residential**: Signature, Shristinagar\n• **Industrial**: Warehouse Electrification Projects`,
      scrollTo: '#projects',
      actions: ['Bihar Vidhan Sabha', 'Kohora Substation', 'Healthcare Projects', 'Discuss a Project'],
    }
  }

  // 17. Contact Details
  if (/contact|email|phone|address|location|reach|where are you located/i.test(q)) {
    return {
      text: `**Contact Lukhdatar & Sons**\n\n📍 **Headquarters:** ${LDS_KB.contact.location}\n📧 **Email:** ${LDS_KB.contact.email}\n\nTo discuss project requirements or request an engineering proposal, click **Discuss a Project** below.`,
      actions: ['Discuss a Project', 'Capabilities'],
    }
  }

  // 18. Pricing / Quotation Safeguard
  if (/price|cost|quote|pricing|how much|rate/i.test(q)) {
    return {
      text: `Commercial quotations for electrical infrastructure are custom-engineered based on approved single-line diagrams, site conditions, bill of quantities (BOQ), and statutory scope requirements.\n\nPlease share your project specifications with our engineering desk at **${LDS_KB.contact.email}** or click **Discuss a Project** to submit an enquiry.`,
      actions: ['Discuss a Project', 'Capabilities'],
    }
  }

  // 19. Fallback Safeguard (No Hallucinations)
  return {
    text: `That specific detail is not available in our public company profile. For custom technical specifications or project-specific queries, our engineering team can assist you directly at **${LDS_KB.contact.email}**.`,
    actions: ['Capabilities', 'Project Portfolio', 'Why Choose LDS', 'Contact Details'],
  }
}

// Quick action pill options
const QUICK_ACTIONS = [
  { label: 'About LDS',          query: 'What does Lukhdatar & Sons do?' },
  { label: 'Turnkey SITC',       query: 'What is your turnkey electrification capability?' },
  { label: 'Project Portfolio',  query: 'What projects has Lukhdatar & Sons delivered?' },
  { label: 'Healthcare Projects', query: 'Tell me about your healthcare projects' },
  { label: 'Substations & Lines', query: 'Tell me about your substation and transmission capabilities' },
  { label: 'Beyond Commissioning', query: 'Can you provide maintenance after commissioning?' },
  { label: 'Why Choose LDS',     query: 'Why should a client choose LDS?' },
  { label: 'Contact Details',    query: 'How can I contact your company?' },
]

type EnquiryStep = 'idle' | 'name' | 'company' | 'email' | 'phone' | 'type' | 'location' | 'requirement' | 'done'

interface Message {
  role: 'user' | 'assistant'
  text: string
  actions?: string[]
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

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const smoothScrollTo = (hash: string) => {
    if (typeof window === 'undefined') return
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
    }, 400 + Math.random() * 200)
  }, [addMessage])

  // Handle action click
  const handleAction = useCallback((action: string) => {
    addMessage({ role: 'user', text: action })

    if (action === 'Discuss a Project') {
      setEnquiryStep('name')
      sendResponse(
        `I will connect you directly with the Lukhdatar & Sons engineering desk.\n\nTo begin, what is your **name**?`,
        undefined
      )
      return
    }

    if (action === 'Request Equipment Info') {
      sendResponse(
        `For detailed equipment specifications, load ratings, or OEM datasheets, please contact our procurement desk at **${LDS_KB.contact.email}**.\n\nYou can also click **Discuss a Project** to submit your required equipment schedule.`,
        ['Discuss a Project', 'Turnkey SITC']
      )
      return
    }

    const response = getResponse(action)
    sendResponse(response.text, response.actions, response.scrollTo)
  }, [addMessage, sendResponse])

  // Handle step-by-step project enquiry flow
  const handleEnquiryInput = useCallback((value: string) => {
    const steps: Record<EnquiryStep, { next: EnquiryStep; question: string; field: string }> = {
      name:        { next: 'company',     field: 'name',     question: `Thank you, ${value}. What is the name of your **company or organisation**?` },
      company:     { next: 'email',       field: 'company',  question: 'What **email address** should we send the technical proposal to?' },
      email:       { next: 'phone',       field: 'email',    question: 'What is the best **phone number** to reach your project team?' },
      phone:       { next: 'type',        field: 'phone',    question: 'What is the **project sector**? (e.g. Healthcare, Industrial/Warehouse, Substation, Government, Residential)' },
      type:        { next: 'location',    field: 'type',     question: 'Where is the **project site located** (City / State)?' },
      location:    { next: 'requirement', field: 'location', question: 'Please briefly outline the **technical scope or capacity requirement**.' },
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
      const summary = `**Project Enquiry Summary**\n\n• **Name**: ${updatedData.name}\n• **Organisation**: ${updatedData.company}\n• **Email**: ${updatedData.email}\n• **Phone**: ${updatedData.phone}\n• **Sector**: ${updatedData.type}\n• **Location**: ${updatedData.location}\n• **Scope**: ${value}\n\nThank you. Your enquiry has been recorded. Our engineering desk will review your scope and follow up at **${updatedData.email}**.`
      sendResponse(summary, ['Project Portfolio', 'Turnkey SITC'])
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

  return (
    <>
      {/* Floating trigger button */}
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
            border: '1px solid rgba(201,160,82,0.35)',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#FAF8F5',
            transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 8px 24px rgba(17,24,32,0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1a2330'
            e.currentTarget.style.borderColor = 'var(--accent-gold)'
            e.currentTarget.style.paddingRight = '24px'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--text-primary)'
            e.currentTarget.style.borderColor = 'rgba(201,160,82,0.35)'
            e.currentTarget.style.paddingRight = '20px'
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--accent-gold)',
              flexShrink: 0,
              boxShadow: '0 0 8px rgba(201,160,82,0.8)',
            }}
          />
          {isOpen ? '✕ Close' : 'Ask LDS AI'}
          {!isOpen && (
            <span style={{ color: 'var(--accent-gold)', marginLeft: '2px' }}>→</span>
          )}
        </button>
      </div>

      {/* Chat modal container */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lukhdatar & Sons Engineering Assistant"
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '28px',
            width: 'min(420px, calc(100vw - 36px))',
            height: 'min(580px, calc(100vh - 120px))',
            background: 'var(--bg-light)',
            border: '1px solid var(--line)',
            borderTop: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 8999,
            boxShadow: '0 20px 48px rgba(17,24,32,0.22), 0 4px 16px rgba(17,24,32,0.08)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--line)',
              background: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 6px rgba(34,197,94,0.6)',
                }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                  Ask LDS AI
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Engineering Knowledge Desk
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages list */}
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
            {/* Initial Welcome */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  padding: '14px 16px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--line-soft)',
                  borderLeft: '3px solid var(--accent-gold)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                }}
              >
                Welcome to **Lukhdatar & Sons**. Ask me about our technical capabilities, project portfolio (Kohora Substation, Bihar Vidhan Sabha, Healthcare SITC), leadership, or submit a project enquiry.
              </div>

              {/* Quick action buttons */}
              {messages.length === 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                  {QUICK_ACTIONS.map(a => (
                    <button
                      key={a.label}
                      onClick={() => handleAction(a.label)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--line)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        e.currentTarget.style.color = 'var(--accent-gold)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--line)'
                        e.currentTarget.style.color = 'var(--text-primary)'
                      }}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Render conversation messages */}
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                }}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    background: m.role === 'user' ? 'var(--text-primary)' : 'var(--bg-secondary)',
                    color: m.role === 'user' ? '#FAF8F5' : 'var(--text-primary)',
                    border: m.role === 'user' ? 'none' : '1px solid var(--line-soft)',
                    borderLeft: m.role === 'assistant' ? '3px solid var(--accent-gold)' : undefined,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {m.text}
                </div>

                {/* Optional response pill buttons */}
                {m.actions && m.actions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {m.actions.map(act => (
                      <button
                        key={act}
                        onClick={() => handleAction(act)}
                        style={{
                          padding: '5px 10px',
                          fontSize: '10.5px',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          background: 'var(--bg-primary)',
                          border: '1px solid rgba(201,160,82,0.3)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--accent-gold)'
                          e.currentTarget.style.color = '#000'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--bg-primary)'
                          e.currentTarget.style.color = 'var(--accent-gold)'
                        }}
                      >
                        {act} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '10px 14px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--line-soft)',
                  borderLeft: '3px solid var(--accent-gold)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Analyzing knowledge base</span>
                <span style={{ animation: 'lds-pulse 1s infinite' }}>...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--line)',
              background: 'var(--bg-primary)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={enquiryStep !== 'idle' && enquiryStep !== 'done' ? 'Enter response...' : 'Ask about LDS capabilities, projects, scope...'}
              style={{
                flex: 1,
                padding: '10px 14px',
                background: 'var(--bg-light)',
                border: '1px solid var(--line)',
                color: 'var(--text-primary)',
                fontSize: '12.5px',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)'
              }}
            />
            <button
              type="submit"
              aria-label="Send Message"
              style={{
                padding: '10px 16px',
                background: 'var(--accent-gold)',
                color: '#000',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
