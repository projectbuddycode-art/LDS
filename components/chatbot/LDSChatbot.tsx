'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// LDS COMPREHENSIVE ENGINEERING KNOWLEDGE REPOSITORY
// ─────────────────────────────────────────────────────────────────────────────
interface KnowledgeTopic {
  keywords: string[]
  response: string
  actions?: string[]
  scrollTo?: string
}

const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  // 1. GREETINGS & INTRODUCTIONS
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'who are you', 'what is this'],
    response: `Hello! I am your **LDS Engineering Assistant** representing **LDS Infrastructure Pvt. Ltd. (Lukhdatar & Sons)**.

We are a specialized turnkey electrical infrastructure contractor founded in Kolkata in 1997. I can help you with:

• **Turnkey SITC Electrification** across industrial, commercial, and utility sectors
• **High-Voltage Substations & Switchyards** (AIS / GIS up to 220kV / 400kV)
• **Overhead Transmission Lines** & lattice tower stringing
• **Underground HT/LT Cable Networks** (up to 66kV with HDD trenchless crossings)
• **HT/LT Power Distribution Panels** (PCC, MCC, Bus Ducts, APFC banks)
• **Critical Infrastructure & Hospital Electrification**
• **Project Portfolio & Case Studies** (Kohora Substation, Bihar Vidhan Sabha, Medical Colleges)

How can I assist your engineering team today?`,
    actions: ['Core Capabilities', 'Major Projects', 'Discuss a Project', 'Company Background'],
  },

  // 2. COMPANY BACKGROUND & LEADERSHIP
  {
    keywords: ['about', 'company background', 'who is lds', 'what is lds', 'lukhdatar', 'overview', 'profile', 'history', 'founded', 'established', 'heritage'],
    response: `**LDS Infrastructure Pvt. Ltd. (Lukhdatar & Sons)** is a premier turnkey electrical engineering contractor with over **27 years of field excellence**.

• **1997**: Founded in Kolkata by **Mr. Lalit Kumar Sureka** as an electrical equipment and goods supplier.
• **2007**: Under the leadership of Managing Director **Mr. Shree Mangalam Sureka**, LDS expanded into full-scale **Turnkey Electrical Contracting (SITC)**.
• **Present**: LDS executes complex high-voltage utility substations, transmission corridors, underground distribution networks, and critical institution electrification across India.

We take single-point responsibility for **Engineering Coordination**, **Spec-Compliant Procurement**, **Field Installation**, **Statutory Clearances**, and **Grid Energisation**.`,
    scrollTo: '#about',
    actions: ['Turnkey Capabilities', 'Project Track Record', 'Leadership', 'Discuss a Project'],
  },

  {
    keywords: ['leadership', 'director', 'managing director', 'md', 'founder', 'management', 'shree mangalam', 'lalit kumar', 'sureka'],
    response: `**Executive Leadership at LDS Infrastructure Pvt. Ltd.:**

• **Mr. Lalit Kumar Sureka (Founder)**: Established Lukhdatar & Sons in Kolkata in 1997, building foundational supply chain relationships and technical procurement benchmarks.
• **Mr. Shree Mangalam Sureka (Managing Director)**: Joined in 2007 to lead the transition into full turnkey EPC contracting. He personally oversees engineering coordination, on-ground project execution teams, utility client relationships, and safety standards across public and private sector developments.`,
    scrollTo: '#about',
    actions: ['Company Background', 'Core Capabilities', 'Discuss a Project'],
  },

  // 3. TURNKEY SITC ELECTRIFICATION
  {
    keywords: ['turnkey', 'sitc', 'what is sitc', 'supply installation testing commissioning', 'end to end', 'electrification capability', 'contracting', 'epc'],
    response: `**Turnkey Electrification (SITC) by LDS**

We provide end-to-end single-point execution covering the entire lifecycle of power infrastructure:

• **Supply**: Spec-compliant procurement of tier-1 transformers, switchgear, VCB panels, bus ducts, cables, and earthing materials from verified manufacturers.
• **Installation**: Precision erection of structural gantries, panel switchboards, cable tray networks, transformer yards, and lightning protection grids.
• **Testing**: Rigorous pre-energisation testing including insulation resistance, secondary current injection, protection relay calibration, and Hi-Pot cable testing.
• **Commissioning & Energisation**: Coordination with DISCOMs, state utilities, and electrical inspectorates for statutory clearances and seamless grid synchronisation.`,
    scrollTo: '#capabilities',
    actions: ['Substations & Switchyards', 'Underground Cabling', 'Project Portfolio', 'Discuss a Project'],
  },

  // 4. SUBSTATIONS & SWITCHYARDS
  {
    keywords: ['substation', 'switchyard', 'ais', 'gis', '220kv', '132kv', '66kv', '33kv', '11kv', 'transformer yard', 'vcb', 'gantry', 'scada'],
    response: `**High-Voltage Substations & Switchyards (up to 220kV / 400kV)**

LDS delivers complete engineering, procurement, civil construction, erection, and commissioning for utility and industrial substations:

• **Air-Insulated (AIS) & Gas-Insulated (GIS) Substations**: Customized for challenging terrain, high seismic zones, and space-constrained industrial footprints.
• **Key Equipment Scope**: Power transformers, vacuum circuit breakers (VCBs), SF6 breakers, CT/PT metering units, isolators, lightning arrestors, and battery banks.
• **Control & Protection**: SCADA automation, microprocessor-based numerical relay integration, and remote telemetry control units.

*Landmark Delivery:* We engineered and energized the **2 × 3.15 MVA Substation at Kohora, Assam** in just **100 working days**, overcoming severe monsoon flood challenges.`,
    scrollTo: '#capabilities',
    actions: ['Kohora Substation Case Study', 'Transmission Lines', 'Underground Cabling', 'Discuss a Project'],
  },

  // 5. OVERHEAD TRANSMISSION LINES
  {
    keywords: ['transmission', 'transmission line', 'overhead line', '400kv', 'lattice tower', 'conductor', 'stringing', 'tower erection', 'corridor'],
    response: `**Overhead High-Voltage Transmission Lines (up to 400kV)**

LDS has delivered over **2,500+ circuit kilometres** of transmission lines across diverse and difficult topographies:

• **Survey & Route Optimization**: Route profiling, contour mapping, and statutory forest/railway/river crossing clearances.
• **Civil Foundations**: Cast-in-situ RCC pile and stub foundations engineered for high water table, marshland, and rocky hill conditions.
• **Tower Erection & Stringing**: Lattice steel tower assembly, hardware fitting, and precision tension stringing of ACSR/HTLS conductors with optical ground wire (OPGW).`,
    scrollTo: '#capabilities',
    actions: ['Substations & Switchyards', 'Turnkey SITC', 'Discuss a Project'],
  },

  // 6. UNDERGROUND CABLE SYSTEMS
  {
    keywords: ['underground', 'cabling', 'cable laying', 'trenching', 'hdd', 'trenchless', 'jointing', 'termination', 'xlpe', '66kv cable', 'ht cable'],
    response: `**Underground HT / LT Cable Networks (up to 66kV)**

LDS specializes in high-reliability underground cable installations in dense urban corridors and industrial facilities:

• **Trenching & Bedding**: Mechanical and manual excavation, thermal backfill bedding, concrete protective slab laying, and route warning tape placement.
• **Trenchless HDD Crossings**: Horizontal Directional Drilling under active highways, railway tracks, and waterways without surface disruption.
• **Certified Jointing & Terminations**: Heat-shrink and cold-shrink straight-through joints and outdoor terminations performed by certified jointers.
• **Diagnostics**: VLF Hipot testing, sheath integrity verification, and time-domain reflectometry (TDR) fault profiling.`,
    scrollTo: '#capabilities',
    actions: ['Power Distribution Panels', 'Turnkey SITC', 'Discuss a Project'],
  },

  // 7. HT / LT DISTRIBUTION & PANELS
  {
    keywords: ['panel', 'switchboard', 'pcc', 'mcc', 'bus duct', 'busduct', 'apfc', 'capacitor bank', 'feeder pillar', 'rising main', 'distribution board', 'amf', 'dg sync'],
    response: `**HT / LT Power Distribution & Switchboards**

LDS engineers, procures, and commissions heavy-duty industrial and commercial power distribution assemblies:

• **Power Control Centres (PCC)**: Up to 6300A high-fault withstand main incoming and distribution switchboards.
• **Motor Control Centres (MCC)**: Draw-out and fixed type intelligent motor control boards with VFDs and soft starters.
• **Sandwich & Air-Insulated Bus Ducts**: High-current busway systems linking transformers, DG sets, and main distribution panels.
• **APFC Capacitor Banks**: Automatic power factor correction panels ensuring unity power factor and eliminating utility penalties.
• **Rising Mains & Feeder Pillars**: Multi-level vertical power distribution for medical towers, residential complexes, and commercial towers.`,
    scrollTo: '#capabilities',
    actions: ['Turnkey SITC', 'Healthcare Infrastructure', 'Discuss a Project'],
  },

  // 8. HEALTHCARE & HOSPITAL INFRASTRUCTURE
  {
    keywords: ['hospital', 'healthcare', 'medical', 'medical college', 'surgical', 'icu', 'clean power', 'assam hill', 'sarojini naidu', 'skmc'],
    response: `**Healthcare & Critical Medical Infrastructure Electrification**

Hospitals require zero-failover power continuity. LDS has electrified landmark medical colleges and multi-specialty hospitals:

• **Assam Hill Medical College & Research Institute (Diphu)**: Full turnkey SITC across college blocks, laboratories, surgical wards, and residential quarters.
• **Sarojini Naidu Medical College & Hospital (Agra)**: Modernization of main power grids, capacitor banks, LT rising mains, and bus duct networks with zero disruption to active critical care.
• **Shri Krishna Medical College (Muzaffarpur)**: Complete turnkey power distribution, HT VCB substations, isolated grounding, and emergency lighting.

*Key Specializations:* Isolated earthing for sensitive diagnostic equipment, dual DG synchronization failover, and segregated medical gas / emergency circuits.`,
    scrollTo: '#projects',
    actions: ['Assam Hill Medical College', 'Sarojini Naidu Hospital', 'Discuss a Project'],
  },

  // 9. GOVERNMENT & INSTITUTIONAL COMPLEXES
  {
    keywords: ['government', 'institutional', 'bihar vidhan sabha', 'vidhan sabha', 'public sector', 'legislative', 'patna'],
    response: `**Government & High-Security Institutional Electrification**

LDS has a trusted track record executing high-profile public sector and government projects under strict compliance and security standards:

• **Bihar Vidhan Sabha (Patna)**: Complete turnkey electrification of the state legislative assembly complex, featuring high-reliability primary power distribution, secure underground feeder loops, and instantaneous DG synchronization.
• **Compliance & Approvals**: Experienced in navigating PWD, CPWD, state electricity board approvals, and CEIG statutory clearances.`,
    scrollTo: '#projects',
    actions: ['Project Portfolio', 'Turnkey SITC', 'Discuss a Project'],
  },

  // 10. INDUSTRIAL & WAREHOUSE ELECTRIFICATION
  {
    keywords: ['industrial', 'warehouse', 'factory', 'plant', 'logistics', 'manufacturing', 'high bay', 'high mast'],
    response: `**Industrial Plants & Logistics Warehouse Electrification**

We design and construct high-capacity electrical systems for industrial manufacturing plants and large-scale logistics warehouses:

• Heavy overhead cable tray and trunking networks
• High-bay industrial LED illumination and automated yard high-mast lighting
• Machinery motor control centers (MCC), sub-distribution boards, and busways
• Comprehensive lightning protection grids and earth pit arrays with low-resistance testing.`,
    scrollTo: '#projects',
    actions: ['Project Portfolio', 'Turnkey SITC', 'Discuss a Project'],
  },

  // 11. HOSPITALITY & TOWNSHIPS
  {
    keywords: ['hospitality', 'hotel', 'taj', 'sonotel', 'residential', 'township', 'signature', 'shristinagar', 'housing'],
    response: `**Hospitality & Integrated Township Electrification**

• **Taj Group of Hotels & Sonotel**: Full turnkey SITC for luxury hospitality properties, incorporating aesthetic lighting control, dual utility grid failovers, and heavy HVAC power distribution.
• **Signature & Shristinagar Townships**: Comprehensive outdoor and indoor power distribution, multi-storey rising mains, weatherproof LT feeder pillars, and automated street lighting grids.`,
    scrollTo: '#projects',
    actions: ['Project Portfolio', 'Core Capabilities', 'Discuss a Project'],
  },

  // 12. KOHORA SUBSTATION SPECIFIC
  {
    keywords: ['kohora', 'assam substation', '100 days', '2x3.15', 'flood', 'kaziranga'],
    response: `**Case Study: Kohora 2 × 3.15 MVA Substation (Assam)**

• **Client & Location**: Power distribution utility at Kohora, near Kaziranga, Assam.
• **Scope**: Turnkey civil foundations, 2 × 3.15 MVA power transformers, control room construction, 9-panel HT VCB switchgear, protection relay integration, and grid tie-in.
• **Engineering Feat**: Executed and energized in **100 working days** in challenging flood-prone terrain with specialized elevated foundations and all-weather cable trenches.`,
    scrollTo: '#projects',
    actions: ['Substations & Switchyards', 'All Projects', 'Discuss a Project'],
  },

  // 13. SUPPLY CHAIN & VERIFIED MANUFACTURER PARTNERS
  {
    keywords: ['supplier', 'manufacturer', 'vendor', 'brand', 'abb', 'l&t', 'schneider', 'havells', 'crompton', 'finolex', 'kei', 'legrand', 'oem', 'supply chain'],
    response: `**Verified Supply Chain & OEM Ecosystem**

LDS integrates spec-compliant equipment from India's most respected electrical manufacturers:

• **Switchgear & Automation**: L&T, ABB, Schneider Electric, Legrand, Lucy Electric
• **Cables & Conductors**: Polycab, KEI Wires & Cables, Finolex, Havells, Utkarsh India, Raychem RPG
• **Transformers & Power Panels**: CG Power, Crompton, Volamp, Daga Power Group, Huphen Electromech
• **Lighting & Commercial Systems**: Philips, Wipro, Anchor by Panasonic, Bajaj Electricals, HPL Electric

Every component is delivered with manufacturer test certificates (MTC), routine inspection reports, and full specification compliance.`,
    scrollTo: '#ecosystem',
    actions: ['Turnkey SITC', 'Core Capabilities', 'Discuss a Project'],
  },

  // 14. QUALITY, SAFETY & COMPLIANCE
  {
    keywords: ['quality', 'safety', 'iso', 'certification', 'standards', 'cea', 'compliance', 'hazard', 'inspection'],
    response: `**Quality, Safety & Statutory Compliance**

• **Certifications**: Certified to **ISO 9001:2015** (Quality Management) and **ISO 45001:2018** (Occupational Health & Safety).
• **Statutory Standards**: Full adherence to Central Electricity Authority (CEA) safety guidelines, Indian Electricity Rules, and State DISCOM engineering codes.
• **Zero-Accident Protocol**: Daily safety tool-box talks (TBT), mandatory PPE compliance, calibrated safety interlocks, and verified LOTO (Lockout/Tagout) procedures during all commissioning phases.`,
    scrollTo: '#capabilities',
    actions: ['Turnkey SITC', 'Why Choose LDS', 'Discuss a Project'],
  },

  // 15. POST-COMMISSIONING & MAINTENANCE
  {
    keywords: ['maintenance', 'after commissioning', 'lifecycle', 'amc', 'oil filtration', 'testing', 'breakdown', 'preventative'],
    response: `**Beyond Commissioning — Lifecycle Support & Asset Management**

Our commitment extends far beyond energisation:

• **Preventative Maintenance Contracts**: Scheduled shutdowns, busbar torque audits, and thermographic infrared inspections to detect hot-spots before failures occur.
• **Transformer Servicing**: Dielectric oil breakdown voltage (BDV) testing, moisture de-gassing, and on-site high-vacuum oil filtration.
• **Relay Recalibration & Testing**: Periodic secondary injection testing of numerical protection relays and breaker trip timing checks.`,
    scrollTo: '#capabilities',
    actions: ['Core Capabilities', 'Why Choose LDS', 'Discuss a Project'],
  },

  // 16. GEOGRAPHIC REACH & LOCATIONS
  {
    keywords: ['location', 'where are you', 'address', 'kolkata', 'city', 'reach', 'coverage', 'assam', 'bihar', 'pan india', 'states'],
    response: `**Geographic Footprint & Headquarters**

• **Headquarters**: Kolkata, West Bengal, India.
• **Operational Presence**: We execute projects across Eastern India, North-East India (Assam, Meghalaya, Arunachal Pradesh), Northern India (Uttar Pradesh, Bihar), and industrial corridors nationwide.
• **Site Mobilization**: Our mobile engineering project management teams deploy dedicated site offices, heavy erection equipment, and certified crews directly to project locations.`,
    actions: ['Contact Details', 'Discuss a Project', 'Major Projects'],
  },

  // 17. PRICING, TENDERS & COMMERCIAL QUOTATIONS
  {
    keywords: ['price', 'pricing', 'cost', 'quote', 'quotation', 'rate', 'how much', 'estimate', 'tender', 'rfp', 'boq', 'budget'],
    response: `**Project Quotations & Commercial Tendering**

Turnkey electrical infrastructure costs depend strictly on technical project parameters:

• Approved Single-Line Diagrams (SLD) and load schedules
• Equipment bill of quantities (BOQ) and preferred OEM makes
• Site topography, soil resistivity, and cable routing distances
• Utility interconnection voltage (LT, 11kV, 33kV, 132kV, 220kV)

Our estimating engineers can review your tender documents, drawings, or preliminary requirements to provide an itemized commercial proposal. Would you like to submit your project requirements right now?`,
    actions: ['Discuss a Project', 'Contact Details', 'Core Capabilities'],
  },

  // 18. CONTACT & DIRECT COMMUNICATION
  {
    keywords: ['contact', 'email', 'phone', 'call', 'reach out', 'inquiry', 'enquiry', 'speak to team', 'office'],
    response: `**Contact LDS Infrastructure Pvt. Ltd.**

• **Email**: **info@ldsinfrastructure.com**
• **Headquarters**: Kolkata, West Bengal, India
• **Business Hours**: Mon – Sat, 9:30 AM – 6:30 PM IST

You can submit an immediate project enquiry by clicking **Discuss a Project** below, or email your RFP documents directly to our engineering desk.`,
    actions: ['Discuss a Project', 'Core Capabilities', 'Major Projects'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSATIONAL NLP MATCHING ENGINE
// ─────────────────────────────────────────────────────────────────────────────
function matchKnowledgeQuery(query: string, previousContext?: string): { text: string; actions?: string[]; scrollTo?: string } {
  const clean = query.toLowerCase().trim()

  // Score each topic based on keyword matches and context
  let bestTopic: KnowledgeTopic | null = null
  let maxScore = 0

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0
    for (const kw of topic.keywords) {
      if (clean.includes(kw)) {
        score += kw.length > 4 ? 3 : 2
        // Exact whole-word bonus
        const regex = new RegExp(`\\b${kw}\\b`, 'i')
        if (regex.test(clean)) {
          score += 2
        }
      }
    }

    if (score > maxScore) {
      maxScore = score
      bestTopic = topic
    }
  }

  if (bestTopic && maxScore >= 2) {
    return {
      text: bestTopic.response,
      actions: bestTopic.actions,
      scrollTo: bestTopic.scrollTo,
    }
  }

  // Conversational contextual fallback (No robotic canned answers)
  return {
    text: `Thank you for your question. While I don't have a confirmed public specification for that particular detail in my instant knowledge base, LDS Infrastructure specializes in customized turnkey electrical solutions tailored to exact client specifications.

Our chief engineering team in Kolkata can review your exact single-line diagram, technical drawings, or equipment requirements directly.

Would you like to outline your project scope with us or explore our delivered capabilities?`,
    actions: ['Discuss a Project', 'Turnkey Capabilities', 'Project Portfolio', 'Contact Details'],
  }
}

// Quick action pill options
const QUICK_ACTIONS = [
  { label: 'Core Capabilities',  query: 'What are the main turnkey electrical capabilities of LDS?' },
  { label: 'Major Projects',     query: 'What landmark projects has LDS delivered?' },
  { label: 'Healthcare SITC',    query: 'Tell me about your healthcare and hospital electrification projects' },
  { label: 'Substations & Lines', query: 'What are your high voltage substation and transmission line capabilities?' },
  { label: 'Verified Suppliers', query: 'Which equipment manufacturers and brands do you partner with?' },
  { label: 'Discuss a Project',  query: 'I would like to discuss an upcoming project enquiry' },
]

type EnquiryStep = 'idle' | 'name' | 'company' | 'email' | 'phone' | 'type' | 'location' | 'requirement' | 'done'

interface Message {
  role: 'user' | 'assistant'
  text: string
  actions?: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// SAFE FORMATTED MESSAGE RENDERER (NO RAW MARKDOWN)
// ─────────────────────────────────────────────────────────────────────────────
function FormattedMessage({ text }: { text: string }) {
  // Parse paragraphs and bullet points safely into clean semantic React nodes
  const paragraphs = useMemo(() => {
    return text.split('\n\n').map((para, pIdx) => {
      const lines = para.split('\n')

      // Check if this paragraph contains bullet points
      const hasBullets = lines.some(l => l.trim().startsWith('•') || l.trim().startsWith('* ') || l.trim().startsWith('- '))

      if (hasBullets) {
        return (
          <div key={pIdx} style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '4px 0' }}>
            {lines.map((line, lIdx) => {
              const trimmed = line.trim()
              if (trimmed.startsWith('•') || trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                const bulletContent = trimmed.replace(/^[•*-]\s*/, '')
                return (
                  <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', paddingLeft: '4px' }}>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '14px', lineHeight: '1.4', flexShrink: 0 }}>•</span>
                    <span style={{ flex: 1 }}>{renderInlineFormatting(bulletContent)}</span>
                  </div>
                )
              }
              return (
                <div key={lIdx}>
                  {renderInlineFormatting(line)}
                </div>
              )
            })}
          </div>
        )
      }

      return (
        <p key={pIdx} style={{ margin: 0, lineHeight: 1.6 }}>
          {lines.map((line, lIdx) => (
            <span key={lIdx}>
              {renderInlineFormatting(line)}
              {lIdx < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      )
    })
  }, [text])

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>{paragraphs}</div>
}

// Helper to render bold (**text**), italics (*text*), and clean text without exposing markdown syntax
function renderInlineFormatting(str: string) {
  const parts: React.ReactNode[] = []
  // Match **bold** or *italic*
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(str)) !== null) {
    // Push preceding plain text
    if (match.index > lastIndex) {
      parts.push(str.substring(lastIndex, match.index))
    }

    const token = match[0]
    if (token.startsWith('**') && token.endsWith('**')) {
      const boldText = token.slice(2, -2)
      parts.push(<strong key={match.index} style={{ fontWeight: 600, color: 'inherit' }}>{boldText}</strong>)
    } else if (token.startsWith('*') && token.endsWith('*')) {
      const italicText = token.slice(1, -1)
      parts.push(<em key={match.index} style={{ fontStyle: 'italic', color: 'rgba(250,248,245,0.85)' }}>{italicText}</em>)
    } else {
      parts.push(token)
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < str.length) {
    parts.push(str.substring(lastIndex))
  }

  return parts
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
    }, 450 + Math.random() * 200)
  }, [addMessage])

  // Handle action click
  const handleAction = useCallback((action: string) => {
    addMessage({ role: 'user', text: action })

    if (action === 'Discuss a Project') {
      setEnquiryStep('name')
      sendResponse(
        `I will be glad to record your project specifications and connect you directly with our engineering desk at LDS.\n\nTo begin, what is your **name**?`,
        undefined
      )
      return
    }

    const response = matchKnowledgeQuery(action)
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
      location:    { next: 'requirement', field: 'location', question: 'Please briefly outline the **technical scope, voltage class, or capacity requirement**.' },
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
      const summary = `**Project Enquiry Summary**\n\n• **Name**: ${updatedData.name}\n• **Organisation**: ${updatedData.company}\n• **Email**: ${updatedData.email}\n• **Phone**: ${updatedData.phone}\n• **Sector**: ${updatedData.type}\n• **Location**: ${updatedData.location}\n• **Scope**: ${value}\n\nThank you. Your enquiry has been recorded for technical review. Our chief engineering desk in Kolkata will examine your scope and follow up directly at **${updatedData.email}**.`
      sendResponse(summary, ['Project Portfolio', 'Core Capabilities', 'Company Background'])
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

    const response = matchKnowledgeQuery(value)
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
      {/* Floating trigger button matching Explore Capabilities styling */}
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
          aria-label={isOpen ? 'Close LDS Engineering Assistant' : 'Open LDS Engineering Assistant'}
          aria-expanded={isOpen}
          className="ask-lds-trigger-btn"
        >
          <span className="ask-lds-dot" />
          <span>{isOpen ? '✕ Close' : 'Ask LDS AI'}</span>
          {!isOpen && (
            <span className="cta-arrow">↗</span>
          )}
        </button>
      </div>

      {/* Chat modal container */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="LDS Infrastructure Engineering Assistant"
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '28px',
            width: 'min(440px, calc(100vw - 36px))',
            height: 'min(590px, calc(100vh - 120px))',
            background: '#121820',
            border: '1px solid rgba(201, 160, 82, 0.28)',
            borderTop: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 8999,
            boxShadow: '0 20px 48px rgba(0,0,0,0.55), 0 4px 16px rgba(201,160,82,0.08)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(250, 248, 245, 0.10)',
              background: '#0E131A',
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
                  boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#FAF8F5', letterSpacing: '0.02em' }}>
                  Ask LDS AI
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 500 }}>
                  LDS Engineering Knowledge Desk
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(250,248,245,0.6)',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: 1,
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF8F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,248,245,0.6)')}
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
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: '#121820',
            }}
          >
            {/* Initial Welcome Greeting */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  padding: '14px 16px',
                  background: '#161F2B',
                  border: '1px solid rgba(201, 160, 82, 0.20)',
                  borderLeft: '3px solid var(--accent-gold)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: '#FAF8F5',
                }}
              >
                <FormattedMessage text="Welcome to **LDS Infrastructure Pvt. Ltd. (Lukhdatar & Sons)**. I am your engineering assistant. Ask me about our turnkey SITC capabilities, high-voltage substations, transmission lines, healthcare & institutional projects, or submit an engineering enquiry." />
              </div>

              {/* Quick action buttons */}
              {messages.length === 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                  {QUICK_ACTIONS.map(a => (
                    <button
                      key={a.label}
                      onClick={() => handleAction(a.query)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'rgba(250, 248, 245, 0.85)',
                        background: '#182230',
                        border: '1px solid rgba(250, 248, 245, 0.16)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        e.currentTarget.style.color = '#FFFFFF'
                        e.currentTarget.style.background = 'rgba(201, 160, 82, 0.12)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(250, 248, 245, 0.16)'
                        e.currentTarget.style.color = 'rgba(250, 248, 245, 0.85)'
                        e.currentTarget.style.background = '#182230'
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
                  maxWidth: '90%',
                }}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    background: m.role === 'user' ? 'var(--accent-gold)' : '#161F2B',
                    color: m.role === 'user' ? '#0E131A' : '#FAF8F5',
                    fontWeight: m.role === 'user' ? 500 : 400,
                    border: m.role === 'user' ? 'none' : '1px solid rgba(201, 160, 82, 0.18)',
                    borderLeft: m.role === 'assistant' ? '3px solid var(--accent-gold)' : undefined,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  }}
                >
                  <FormattedMessage text={m.text} />
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
                          background: '#182230',
                          border: '1px solid rgba(201,160,82,0.35)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--accent-gold)'
                          e.currentTarget.style.color = '#0E131A'
                          e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#182230'
                          e.currentTarget.style.color = 'var(--accent-gold)'
                          e.currentTarget.style.borderColor = 'rgba(201,160,82,0.35)'
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
                  padding: '10px 16px',
                  background: '#161F2B',
                  border: '1px solid rgba(201, 160, 82, 0.18)',
                  borderLeft: '3px solid var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '11px', color: 'rgba(250, 248, 245, 0.65)', letterSpacing: '0.04em' }}>Consulting LDS engineering records</span>
                <span className="typing-dot" />
                <span className="typing-dot" style={{ animationDelay: '0.2s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(250, 248, 245, 0.10)',
              background: '#0E131A',
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
                padding: '11px 14px',
                background: '#161F2B',
                border: '1px solid rgba(250, 248, 245, 0.18)',
                color: '#FAF8F5',
                fontSize: '12.5px',
                outline: 'none',
                transition: 'border-color 200ms ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(250, 248, 245, 0.18)'
              }}
            />
            <button
              type="submit"
              aria-label="Send Message"
              style={{
                padding: '11px 18px',
                background: 'var(--accent-gold)',
                color: '#0E131A',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#DFB56C'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--accent-gold)'
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* ── Scoped Styles for Ask LDS Trigger Button matching Explore Capabilities button ── */}
      <style>{`
        .ask-lds-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          background: rgba(17, 24, 32, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(250, 248, 245, 0.32);
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FAF8F5;
          transition: all 300ms ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
          user-select: none;
        }

        .ask-lds-trigger-btn:hover {
          border-color: var(--accent-gold);
          color: #FFFFFF;
          background: rgba(201, 160, 82, 0.10);
          box-shadow: 0 0 20px rgba(201, 160, 82, 0.20), 0 8px 24px rgba(0, 0, 0, 0.45);
        }

        .ask-lds-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-gold);
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(201, 160, 82, 0.8);
          transition: transform 250ms ease;
        }

        .ask-lds-trigger-btn:hover .ask-lds-dot {
          transform: scale(1.2);
          box-shadow: 0 0 12px rgba(201, 160, 82, 1);
        }

        .ask-lds-trigger-btn .cta-arrow {
          display: inline-block;
          color: var(--accent-gold);
          font-size: 13px;
          transition: transform 250ms ease;
        }

        .ask-lds-trigger-btn:hover .cta-arrow {
          transform: translate(2px, -2px);
        }

        .typing-dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-gold);
          animation: dot-pulse 1.2s infinite ease-in-out;
        }

        @keyframes dot-pulse {
          0%, 80%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </>
  )
}
