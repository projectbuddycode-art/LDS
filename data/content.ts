// Content data for LDS Infrastructure website
// Sourced strictly from verified company prospectus and approved records.

export const COMPANY = {
  name: 'Lukhdatar & Sons',
  legalName: 'Lukhdatar & Sons',
  shortName: 'LDS',
  location: 'Kolkata, West Bengal, India',
  founded: '1997',
  turnkeySince: '2007',
  tagline: 'Turnkey Electrical Infrastructure & Contracting',
  email: 'info@ldsinfrastructure.com',
  summary: 'Established in 1997 as an electrical goods supplier, Lukhdatar & Sons expanded into turnkey electrical contracting in 2007. The company delivers complete electrical Supply, Installation, Testing & Commissioning (SITC) across Government and Private sectors for commercial, housing, industrial, public, and substation projects.',
}

export const LEADERSHIP = [
  {
    id: 'founder',
    name: 'Mr. Lalit Kumar Sureka',
    title: 'Founder',
    imageKey: 'founder' as const,
    since: '1997',
    bio: 'Mr. Lalit Kumar Sureka founded Lukhdatar & Sons in Kolkata in 1997 as an electrical equipment and goods supplier. His decade of on-ground commercial experience and deep supplier relationships established the technical standards that enabled the company to transition into turnkey electrical contracting.',
  },
  {
    id: 'md',
    name: 'Mr. Shree Mangalam Sureka',
    title: 'Managing Director',
    imageKey: 'md' as const,
    since: '2007',
    bio: 'Mr. Shree Mangalam Sureka joined Lukhdatar & Sons in 2007 to lead its expansion into turnkey electrical contracting. As Managing Director, he oversees project execution teams, client relationships, engineering quality, and safety compliance across Government and Private sector developments.',
  },
]

export const TIMELINE = [
  {
    year: '1997',
    label: 'Company Foundation',
    description:
      'Established in Kolkata by Mr. Lalit Kumar Sureka as an electrical goods and equipment supplier, building direct distribution and procurement channels.',
  },
  {
    year: '2007',
    label: 'Turnkey Contracting Expansion',
    description:
      'Transitioned into full-scale turnkey electrical contracting under Managing Director Mr. Shree Mangalam Sureka, undertaking complete SITC projects for Government and Private clients.',
  },
  {
    year: 'Present',
    label: 'Multi-Sector Execution',
    description:
      'Delivering complete electrical infrastructure across commercial, healthcare, industrial, residential township, public, and high-voltage substation environments across India.',
  },
]

export const CAPABILITY_STATS = [
  { value: '1997', label: 'Established in Kolkata' },
  { value: '2007', label: 'Turnkey Contracting Since' },
  { value: '66KV', label: 'Underground Cable Systems Up To' },
  { value: '220KV', label: 'Substations & Switchyards Up To' },
  { value: '400KV', label: 'Overhead Transmission Lines Up To' },
]

export const TURNKEY_STAGES = [
  { number: '01', label: 'Engineering Coordination', detail: 'Single-line diagrams, load calculation reviews, and technical layout planning.' },
  { number: '02', label: 'Procurement & Supply', detail: 'Verified electrical equipment sourced from approved manufacturers and tested to specification.' },
  { number: '03', label: 'Installation & Erection', detail: 'On-site structural works, cable laying, panel erection, and power distribution cabling.' },
  { number: '04', label: 'Testing & Pre-Commissioning', detail: 'High-voltage insulation testing, relay calibrations, and safety system validation checks.' },
  { number: '05', label: 'Commissioning & Handover', detail: 'Grid energisation, load trials, statutory clearances, and complete documentation handover.' },
]

export const LIFECYCLE_STAGES = [
  { number: '01', label: 'Engineering Coordination', detail: 'Technical specification review and execution planning.' },
  { number: '02', label: 'Procurement & Supply', detail: 'Sourcing spec-compliant transformers, switchgear, and cables.' },
  { number: '03', label: 'Site Installation', detail: 'Physical erection, HT/LT cabling, panel boards, and earthing grids.' },
  { number: '04', label: 'Testing & Verification', detail: 'Pre-energisation safety checks, relay settings, and insulation tests.' },
  { number: '05', label: 'Grid Commissioning', detail: 'Utility synchronization, energisation clearance, and handover.' },
  { number: '06', label: 'Routine Maintenance', detail: 'Scheduled preventative shutdowns, transformer oil filtration, and breaker servicing.' },
  { number: '07', label: 'Operational Lifecycle Support', detail: 'Refurbishment, component replacements, and technical troubleshooting.' },
]

export const EQUIPMENT_RANGE = [
  { id: 'busduct',   title: 'Bus Duct Systems',         mediaKey: 'busduct' as const,          desc: 'High-amperage sandwich and air-insulated LT bus ducts for efficient main power distribution.' },
  { id: 'capacitor', title: 'Capacitor Banks',           mediaKey: 'capacitorBank' as const,    desc: 'Automatic Power Factor Correction (APFC) panels designed to maintain power efficiency and reduce line losses.' },
  { id: 'pcc',       title: 'Power Control Centres',     mediaKey: 'powerControlCenter' as const, desc: 'Heavy-duty industrial and commercial PCC switchboards built for centralized power control and circuit protection.' },
]

export const EQUIPMENT_CATEGORIES = [
  'LT Motor Control Centres (MCC)',
  'LT Power Control Centres (PCC)',
  'LT Power Factor Improvement Capacitor Panels',
  'AMF Panels & DG Synchronizing Boards',
  'Instrumentation & Control Panels',
  'LT Rising Mains & Bus Ducts',
  'Junction Boxes & Tap-Off Units',
  'LT Distribution Boards & Feeder Pillars',
  'Control Desks & MIMIC Panels',
  'Draw-Out & Non-Draw-Out Switchgear',
  'Distribution & Power Transformers',
  'Vacuum Circuit Breaker (VCB) Panels',
  'Substation Gantry & Structural Equipment',
  'Normal & Emergency Lighting Distribution Fixtures',
  'Earthing & Lightning Protection Systems',
]

export const PROJECTS = [
  {
    id: 'taj-hotel',
    title: 'Taj Group of Hotels',
    scope: 'Electrical Infrastructure',
    mediaKey: 'tajHotel' as const,
    tag: 'Hospitality',
    desc: 'Electrical infrastructure installations supporting luxury hospitality operations with dependable primary distribution and backup power coordination.',
  },
  {
    id: 'sonotel',
    title: 'Sonotel',
    scope: 'Complete SITC & Electrical Infrastructure',
    mediaKey: 'sonotel' as const,
    tag: 'Hospitality',
    desc: 'Turnkey Supply, Installation, Testing & Commissioning of main distribution panels, bus ducts, standby generator synchronization, and illumination systems.',
  },
  {
    id: 'assam-medical-college',
    title: 'Assam Hill Medical College & Research Institute',
    scope: 'Complete Electrical SITC',
    mediaKey: 'assamHill' as const,
    tag: 'Healthcare / Medical',
    desc: 'Turnkey electrical SITC across college blocks, hospital wards, and research laboratories, incorporating transformer yards, rising mains, and isolated earthing networks.',
  },
  {
    id: 'sarojini-naidu-hospital',
    title: 'Sarojini Naidu Medical Hospital, Agra',
    scope: 'SITC of Electrical Installations',
    mediaKey: 'sarojiniHospital' as const,
    tag: 'Healthcare / Medical',
    desc: 'Modernization and SITC of primary electrical installations, capacitor banks, main power switchboards, and grounding networks across active medical facilities.',
  },
  {
    id: 'skmc-medical-college',
    title: 'Shri Krishna Medical College, Muzaffarpur',
    scope: 'Complete Electrical SITC',
    mediaKey: 'skmcMedical' as const,
    tag: 'Healthcare / Medical',
    desc: 'Complete campus electrical infrastructure execution including HT VCB switchgear, transformer installation, distribution cable trays, and emergency lighting networks.',
  },
  {
    id: 'bihar-vidhan-sabha',
    title: 'Bihar Vidhan Sabha',
    scope: 'Turnkey Infrastructure Electrification',
    mediaKey: 'biharVidhanSabha' as const,
    tag: 'Government / Institutional',
    desc: 'Turnkey electrical infrastructure for the state legislative complex, incorporating high-security power routing, primary distribution panels, and backup power synchronization.',
  },
  {
    id: 'warehouse-projects',
    title: 'Warehouse Electrification Projects',
    scope: 'Industrial Power Distribution',
    mediaKey: 'warehouseProjects' as const,
    tag: 'Industrial / Infrastructure',
    desc: 'Overhead cable tray installations, high-bay lighting, external yard high-masts, motor distribution boards, and lightning protection systems for major logistics facilities.',
  },
  {
    id: 'kohora-substation',
    title: 'Kohora, Assam',
    scope: '2 × 3.15 MVA Substation, Control Room & VCB Panels',
    mediaKey: 'kohoraSubstation' as const,
    tag: 'Substation',
    desc: 'Turnkey engineering, supply, erection, testing, and commissioning of a 2 × 3.15 MVA substation with a dedicated Control Room and 9 VCB Panels in 100 working days.',
  },
  {
    id: 'signature',
    title: 'Signature',
    scope: 'HT/LT Power Distribution',
    mediaKey: 'signature' as const,
    tag: 'Residential / Township',
    desc: 'Multi-point HT/LT power distribution, transformer yards, LT control panels, and sub-metering grids for multi-storey residential living.',
  },
  {
    id: 'shristinagar',
    title: 'Shristinagar',
    scope: 'HT/LT Power Distribution',
    mediaKey: 'shristinagar' as const,
    tag: 'Residential / Township',
    desc: 'Outdoor township electrification including weather-proof LT feeder pillar boards, underground distribution loops, and street lighting networks.',
  },
]

export const INDUSTRIES = [
  { id: 'education',      label: 'Education & Institutional', mediaKey: 'education'     as const },
  { id: 'commercial',    label: 'Commercial Complexes',      mediaKey: 'commercial'    as const },
  { id: 'residential',   label: 'Residential Townships',     mediaKey: 'residential'   as const },
  { id: 'medical',       label: 'Healthcare & Hospitals',    mediaKey: 'medical'       as const },
  { id: 'township',      label: 'Integrated Townships',      mediaKey: 'township'      as const },
  { id: 'warehousing',   label: 'Logistics & Warehousing',   mediaKey: 'warehousing'   as const },
  { id: 'manufacturing', label: 'Industrial Manufacturing',  mediaKey: 'manufacturing' as const },
]

export const ACCOUNTABILITY_PRINCIPLES = [
  {
    number: '01',
    title: 'Single-Point Project Responsibility',
    description: 'We manage engineering coordination, procurement, installation, and commissioning as one accountable scope, eliminating multi-vendor interface friction.',
  },
  {
    number: '02',
    title: 'Engineering Rigour & Safety',
    description: 'Every installation adheres strictly to approved single-line diagrams, statutory clearance codes, and thorough pre-energisation testing protocols.',
  },
  {
    number: '03',
    title: 'Coordinated Execution Teams',
    description: 'Our in-house workforce coordinates cabling, panel erection, and specialist subcontracting under a synchronized on-site project management plan.',
  },
  {
    number: '04',
    title: 'Post-Commissioning Continuity',
    description: 'We support clients beyond energisation with scheduled preventative maintenance, transformer oil filtration, and operational lifecycle assistance.',
  },
]

export const ECOSYSTEM_BRANDS = [
  'Larsen & Toubro', 'ABB', 'HPL', 'Havells', 'Polycab', 'KEI',
  'Legrand', 'Crompton Greaves', 'Schneider Electric', 'Anchor',
  'Bajaj Electricals', 'Philips', 'Wipro', '3M', 'Eaton',
  'Raychem RPG', 'Voltamp', 'Kotsons', 'Huphen Electromech',
  'Lucy Electric', "Dowell's", 'Lamco', 'AKG', 'Utkarsh',
  'HEX', 'MESCAB', 'Powerstar', 'Daga Power Group',
]

export const CAPABILITIES_LIST = [
  'Turnkey Electrical Contracting (SITC)',
  'Substation & Switchyard Works up to 220KV',
  'Overhead Transmission Lines up to 400KV',
  'Underground Cable Systems up to 66KV',
  'HT and LT Power Distribution Systems',
  'Power Control Centres (PCC) & Motor Control Centres (MCC)',
  'Automatic Power Factor Improvement (APFC) Panels',
  'Normal and Emergency Lighting Installations',
  'Earthing, Grounding Grids & Lightning Protection',
  'Transformer Installation & Oil Filtration',
  'Vacuum Circuit Breaker (VCB) Panels',
  'Bus Duct Trunking & Rising Mains',
  'Pre-Commissioning Testing & Grid Clearances',
  'Routine Maintenance & Electrical Refurbishment',
]

export const NAV_LINKS = [
  { label: 'Company', href: '/company' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Partnerships', href: '/partner-with-us' },
  { label: 'Procurement', href: '/vendor-capabilities' },
  { label: 'Insights', href: '/insights' },
]

export const FOOTER_SECTIONS = [
  {
    heading: 'Capabilities',
    links: [
      { label: 'Turnkey Electrification', href: '/capabilities/turnkey-electrification' },
      { label: 'Substations & Switchyards', href: '/capabilities/substations-switchyards' },
      { label: 'Transmission Lines', href: '/capabilities/transmission-lines' },
      { label: 'Underground Cabling', href: '/capabilities/underground-cable-laying' },
      { label: 'Industrial Electrification', href: '/capabilities/industrial-electrification' },
      { label: 'Testing & Commissioning', href: '/capabilities/testing-commissioning' },
      { label: 'Electrical Maintenance', href: '/capabilities/electrical-maintenance' },
    ],
  },
  {
    heading: 'Enterprise',
    links: [
      { label: 'Partnerships & Subcontracting', href: '/partner-with-us' },
      { label: 'Procurement & Vendor Profile', href: '/vendor-capabilities' },
      { label: 'Quality & Safety Protocols', href: '/quality-safety' },
      { label: 'Technical Insights & FAQs', href: '/insights' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Company Overview', href: '/company' },
      { label: 'Project Portfolio', href: '/#projects' },
      { label: 'Leadership Team', href: '/company#leadership' },
    ],
  },
]

export interface CapabilityDetail {
  title: string
  deliverables: string[]
  scopes: string[]
  specs: string[]
  environments: string[]
  lifecycle: string[]
  ctaText: string
  ctaHref: string
}

export const CAPABILITIES_DATA: Record<string, CapabilityDetail> = {
  'turnkey-electrification': {
    title: 'Turnkey Electrification (SITC)',
    deliverables: [
      'Complete Supply, Installation, Testing & Commissioning (SITC) under single-point accountability.',
      'Comprehensive engineering coordination, procurement from approved manufacturers, and on-site erection.',
      'Streamlined project delivery that minimizes interface risks between civil, mechanical, and electrical packages.'
    ],
    scopes: [
      'HT and LT distribution systems, transformer yards, and main switchgear installations.',
      'Indoor and outdoor electrical distribution networks for Government and Private developments.',
      'Comprehensive on-site project management, progress reporting, and statutory authority liaison.'
    ],
    specs: [
      'LT Rising Mains and high-amperage bus duct systems.',
      'Automatic Power Factor Improvement (APFC) capacitor banks.',
      'Power Control Centres (PCC), Motor Control Centres (MCC), AMF panels, and instrumentation boards.'
    ],
    environments: [
      'Healthcare and educational campuses (such as Assam Hill Medical College and SKMC Muzaffarpur).',
      'Government and institutional complexes (such as Bihar Vidhan Sabha).',
      'Commercial hospitality hubs and industrial manufacturing facilities.'
    ],
    lifecycle: [
      'Engineering Coordination: Single-line diagram validation and load schedule engineering.',
      'Site Execution: Cable tray routing, panel erection, and termination work.',
      'Handover & Support: Statutory testing reports, as-built documentation, and routine maintenance.'
    ],
    ctaText: 'Discuss Your Turnkey Project',
    ctaHref: '/vendor-capabilities?type=Turnkey'
  },
  'substations-switchyards': {
    title: 'Substations & Switchyards',
    deliverables: [
      'Design validation, equipment procurement, civil foundations, and erection of substations up to 220KV.',
      'Switchyard structural assembly, power transformer erection, VCB panel integration, and control cabling.',
      'Protection coordination, utility liaison clearances, and grid energisation.'
    ],
    scopes: [
      'Utility substations, outdoor switchyards, and compact industrial substation packages.',
      'VCB panels, HT bus ducts, earthing grids, and auxiliary DC backup systems.',
      'Fast-track execution schedules, demonstrated by energising the 2 × 3.15 MVA Kohora Substation in 100 working days.'
    ],
    specs: [
      'Voltage Levels: Complete substation engineering up to 220KV capacity.',
      'VCB Panels: Spec-compliant indoor and outdoor vacuum circuit breakers.',
      'Transformers: Step-down and step-up power transformers with auxiliary protections.'
    ],
    environments: [
      'State electricity board distribution grids and utility substations.',
      'Heavy industrial manufacturing plants and processing facilities.',
      'Large residential township hubs and commercial developments.'
    ],
    lifecycle: [
      'Pre-Commissioning: High-voltage insulation testing, CT/PT calibration, and relay timing checks.',
      'Commissioning: Grid synchronisation and load trial runs.',
      'Post-Commissioning: Transformer oil filtration, contact resistance testing, and preventative maintenance.'
    ],
    ctaText: 'Discuss Substation Scope',
    ctaHref: '/vendor-capabilities?type=Substation'
  },
  'transmission-lines': {
    title: 'Overhead Transmission Lines',
    deliverables: [
      'Complete overhead transmission line infrastructure across voltage levels up to 400KV.',
      'Tower foundation casting, structural steel tower erection, hardware fitting, and conductor stringing.',
      'Right-of-Way (RoW) management, complex terrain execution, and grid connection clearances.'
    ],
    scopes: [
      'High-voltage transmission line works from 11KV and 33KV up to 400KV.',
      'Lattice steel tower erection, high-mast illumination, and structural light poles.',
      'Substation interconnection lines and dedicated industrial power corridors.'
    ],
    specs: [
      'Voltage Ratings: 11KV, 33KV, 66KV, 132KV, 220KV, and 400KV transmission structures.',
      'Fabrication: Galvanized steel lattice towers, structural hardware, and light poles.',
      'Conductor Stringing: ACSR and AAAC conductor tension stringing with sag matching.'
    ],
    environments: [
      'Inter-district utility power corridors and grid feeder lines.',
      'Dedicated transmission links connecting substations to industrial zones.',
      'Challenging terrain routes requiring specialized erection logistics.'
    ],
    lifecycle: [
      'Pre-Energisation: Tower structural verticality verification and line insulation testing.',
      'Commissioning: Phasing checks, clearance verification, and statutory energisation.',
      'Maintenance: Route inspection patrols, insulator washing, and structural maintenance.'
    ],
    ctaText: 'Discuss Transmission Requirements',
    ctaHref: '/partner-with-us?type=Transmission'
  },
  'underground-cable-laying': {
    title: 'Underground Cable Systems',
    deliverables: [
      'Precision trench excavation, bedding, ducting, cable laying, and jointing up to 66KV.',
      'High-voltage and low-voltage underground power distribution loops with mechanical protection.',
      'Route surveying, buried utility mapping, and concrete cable trench construction.'
    ],
    scopes: [
      'High-voltage underground cabling projects up to 66KV system ratings.',
      'Trenching, bedding, HDPE duct insertion, thermal backfilling, and route marking.',
      'High-voltage cable jointing bays, heat-shrink terminations, and end-box fittings.'
    ],
    specs: [
      'Cable Specifications: XLPE insulated armored copper and aluminum cables up to 66KV.',
      'Installation Methods: Open trench direct burial, concrete duct banks, and road crossing ducts.',
      'Terminations: Certified heat-shrinkable and cold-shrinkable joints and terminations.'
    ],
    environments: [
      'Dense urban commercial districts and municipal infrastructure routes.',
      'Industrial manufacturing campuses and heavy logistics parks.',
      'Modern residential developments, housing complexes, and townships.'
    ],
    lifecycle: [
      'Testing: Insulation resistance, sheath integrity checks, and High Voltage (Hipot) testing.',
      'Operation: Cable marker upkeep and thermal imaging of termination boxes.',
      'Support: Rapid fault location, core splicing, and joint box replacements.'
    ],
    ctaText: 'Discuss Underground Cabling',
    ctaHref: '/vendor-capabilities?type=Cabling'
  },
  'industrial-electrification': {
    title: 'Industrial Electrification',
    deliverables: [
      'Turnkey industrial power distribution systems engineered for continuous operational reliability.',
      'Plant internal and external cabling, motor control centres (MCC), and power control centres (PCC).',
      'Standby generator synchronization panels, bus duct distribution, and automated power factor correction.'
    ],
    scopes: [
      'Complete SITC of main switchboards, MCC/PCC panels, and capacitor banks.',
      'Industrial plant cable tray networks, heavy power cabling, and motor terminations.',
      'Process instrumentation wiring, control desks, and emergency isolation circuits.'
    ],
    specs: [
      'Bus Ducts: High-capacity sandwich and air-insulated LT bus ducts.',
      'Capacitor Banks: Automatic Power Factor Correction (APFC) panels with detuned reactors.',
      'Switchboards: Form 4 draw-out and fixed-type Power Control Centres.'
    ],
    environments: [
      'Manufacturing plants, fabrication workshops, and processing facilities.',
      'Warehousing, logistics hubs, and cold storage installations.',
      'Heavy industrial infrastructure facilities and captive power plants.'
    ],
    lifecycle: [
      'Pre-Commissioning: Earth loop impedance validation, relay calibration, and load trial testing.',
      'Preventative Maintenance: Thermography surveys, breaker contact inspection, and busbar torque checks.',
      'Upgrades: Panel retrofitting, capacity expansion, and switchgear modernization.'
    ],
    ctaText: 'Discuss Industrial Scope',
    ctaHref: '/vendor-capabilities?type=Industrial'
  },
  'healthcare-electrical-infrastructure': {
    title: 'Healthcare Electrical Infrastructure',
    deliverables: [
      'High-availability electrical infrastructure engineered for critical hospital environments.',
      'SITC of primary power distribution, dual utility-generator changeovers, and isolated grounding networks.',
      'Low-voltage auxiliary systems including public address, fire detection, and voice/data cabling.'
    ],
    scopes: [
      'Complete electrical SITC for medical colleges, super-specialty hospitals, and research facilities.',
      'Clean power distribution for operating theatres, intensive care units, and imaging laboratories.',
      'Hospital ward lighting, nurse call systems, and standby generator synchronization.'
    ],
    specs: [
      'Healthcare Projects: Assam Hill Medical College, Sarojini Naidu Hospital Agra, SKMC Muzaffarpur.',
      'Custom Panels: Hospital sub-distribution boards, AMF synchronizing panels, and essential supply boards.',
      'Low-Voltage Systems: Fire alarm systems, EPABX, public address, and structured voice/data cabling.'
    ],
    environments: [
      'Government and private medical college campuses.',
      'Multi-specialty hospitals, critical care facilities, and surgical suites.',
      'Diagnostic imaging centers, research laboratories, and institutional healthcare centers.'
    ],
    lifecycle: [
      'Testing: Dual-source transfer timing checks, isolated ground continuity, and UPS runtime verification.',
      'Maintenance: Scheduled maintenance shutdowns, breaker servicing, and earth pit resistance audits.',
      'Support: Emergency technical response and panel modernization.'
    ],
    ctaText: 'Discuss Healthcare Infrastructure',
    ctaHref: '/vendor-capabilities?type=Healthcare'
  },
  'warehouse-electrification': {
    title: 'Warehouse & Logistics Electrification',
    deliverables: [
      'Large-format warehouse illumination, high-bay lighting, and primary power distribution networks.',
      'External yard illumination, high masts, feeder pillars, and lightning protection systems.',
      'Fire detection integration, emergency lighting distribution, and auxiliary power supplies.'
    ],
    scopes: [
      'High-bay lighting design and installation for extensive storage and racking layouts.',
      'Heavy-duty LT cable tray routing, main distribution switchboards, and sub-panels.',
      'Yard perimeter lighting, high-mast towers, and perimeter grounding grids.'
    ],
    specs: [
      'Illumination: High-efficiency industrial LED high bays, floodlights, and motorized high masts.',
      'Fabrication: Heavy-gauge perforated and ladder cable trays, steel supports, and light poles.',
      'Safety: Comprehensive earthing grids, lightning protection masts, and fire detection cabling.'
    ],
    environments: [
      'Logistics parks, fulfillment centers, and distribution warehouses.',
      'Industrial storage depots and multi-tenant freight facilities.',
      'Cold chain storage warehouses and material handling facilities.'
    ],
    lifecycle: [
      'Testing: Lux level verification surveys, earth resistance audits, and fire alarm integration testing.',
      'Maintenance: High-mast winch motor inspections, panel cleaning, and lighting maintenance.',
      'Expansion: Electrical infrastructure scaling for warehouse expansion phases.'
    ],
    ctaText: 'Discuss Warehouse Project',
    ctaHref: '/vendor-capabilities?type=Warehouse'
  },
  'testing-commissioning': {
    title: 'Testing & Pre-Commissioning',
    deliverables: [
      'Thorough pre-energisation testing, relay calibrations, and high-voltage insulation audits.',
      'Protection coordination checks, circuit breaker timing tests, and earth resistance validation.',
      'Grid energisation supervision, statutory documentation preparation, and compliance sign-offs.'
    ],
    scopes: [
      'EHV, HV, MV, and LV electrical installations testing and reporting.',
      'Numerical protection relay programming, primary injection testing, and secondary injection checks.',
      'Transformer dielectric oil testing, ratio checks, and winding resistance verification.'
    ],
    specs: [
      'High-Voltage Tests: Insulation resistance (Megger), cable sheath checks, and Hipot testing.',
      'Switchgear Tests: VCB contact resistance (micro-ohm), breaker timing, and interlocking checks.',
      'Earthing Tests: Earth pit resistance measurements and structural grid continuity mapping.'
    ],
    environments: [
      'Utility substations and high-voltage grid switchyards.',
      'Industrial manufacturing complexes, commercial buildings, and institutional campuses.',
      'Pre-handover audits for completed turnkey electrical installations.'
    ],
    lifecycle: [
      'Pre-Commissioning: Step-by-step checklist execution and fault isolation before energisation.',
      'Commissioning: Phasing alignment, load trials, and utility handover.',
      'Periodic Testing: Annual relay recalibration and insulation resistance re-certification.'
    ],
    ctaText: 'Request Testing & Commissioning Scope',
    ctaHref: '/vendor-capabilities?type=Testing'
  },
  'electrical-maintenance': {
    title: 'Routine Maintenance & Lifecycle Support',
    deliverables: [
      'Scheduled preventative maintenance programs, planned shutdowns, and emergency repair response.',
      'Circuit breaker servicing, transformer oil filtration, contact testing, and earthing audits.',
      'Electrical refurbishment, legacy switchboard modernization, and component replacement.'
    ],
    scopes: [
      'Preventative, predictive, and routine maintenance contracts for completed projects.',
      'Upkeep of substations, industrial MCC/PCC panels, and commercial HT/LT networks.',
      'Equipment replacements, breaker retrofitting, and busbar structural maintenance.'
    ],
    specs: [
      'Servicing: VCB mechanism overhaul, transformer silica gel replacement, and contactor maintenance.',
      'Diagnostic Auditing: Thermographic imaging inspections and ground resistance testing.',
      'Modernization: Legacy relay retrofits and distribution board upgrades.'
    ],
    environments: [
      'Healthcare facilities, medical colleges, and institutional properties.',
      'Industrial manufacturing plants, warehouses, and commercial developments.',
      'Completed turnkey electrical projects requiring continuous operational oversight.'
    ],
    lifecycle: [
      'Routine Upkeep: Scheduled visual audits, cleaning, tightening, and lubrication of switchgear.',
      'Diagnostic Checks: Infrared thermography to identify loose connections before faults occur.',
      'Lifecycle Support: Modernizing obsolete components to prolong installation life.'
    ],
    ctaText: 'Discuss Maintenance Requirements',
    ctaHref: '/vendor-capabilities?type=Maintenance'
  }
}

export interface CaseStudyDetail {
  title: string
  client: string
  sector: string
  scope: string
  engineering: string[]
  testing: string[]
  outcome: string
  mediaKey: string
}

export const PROJECT_CASE_STUDIES: Record<string, CaseStudyDetail> = {
  'kohora-assam-substation': {
    title: 'Kohora, Assam Substation',
    client: 'Utility Infrastructure Project',
    sector: 'Substation',
    scope: 'Turnkey delivery of a 2 × 3.15 MVA Substation incorporating a dedicated Control Room and 9 VCB Panels.',
    engineering: [
      'Completed layout engineering tailored to challenging site terrain conditions in Assam.',
      'Procured and erected utility-grade transformers, custom VCB panels, and auxiliary systems.',
      'Constructed complete civil foundations, gantry structural members, and underground cable ducts.'
    ],
    testing: [
      'Conducted comprehensive insulation resistance testing and high-voltage cable sheath checks.',
      'Calibrated protection relay settings and verified electrical interlocking controls.',
      'Executed vacuum circuit breaker contact resistance and timing validation tests.'
    ],
    outcome: 'Successfully energised the complete substation in 100 working days, providing dependable grid power with full safety clearance compliance.',
    mediaKey: 'kohoraSubstation'
  },
  'assam-hill-medical-college': {
    title: 'Assam Hill Medical College',
    client: 'Assam Hill Medical College & Research Institute',
    sector: 'Healthcare / Medical',
    scope: 'Complete electrical SITC (Supply, Installation, Testing & Commissioning) for the medical college and research campus.',
    engineering: [
      'Executed detailed electrical design and load planning for academic blocks, hospital wards, and research laboratories.',
      'Installed main HT distribution systems, transformer yards, and LT rising mains.',
      'Laid campus-wide power distribution cables, cable tray networks, and lighting sub-distribution boards.'
    ],
    testing: [
      'Conducted earth loop impedance testing across critical clinical spaces and hospital rooms.',
      'Verified standby generator synchronisation controls and AMF panel operation.',
      'Tested low-voltage auxiliary networks including fire detection and public address systems.'
    ],
    outcome: 'Delivered an integrated, code-compliant electrical distribution network providing dependable power for critical medical operations.',
    mediaKey: 'assamHill'
  },
  'sarojini-naidu-medical-hospital': {
    title: 'Sarojini Naidu Medical Hospital, Agra',
    client: 'Sarojini Naidu Medical Hospital',
    sector: 'Healthcare / Medical',
    scope: 'Turnkey SITC of electrical installations and primary power distribution switchboards.',
    engineering: [
      'Engineered localized power distribution boards to support medical equipment electrical loads.',
      'Installed capacitor banks, power distribution panels, bus ducts, and high-conductivity grounding grids.',
      'Routed cabling through active healthcare facility areas with structured execution protocols.'
    ],
    testing: [
      'Performed transformer winding resistance testing and dielectric strength checks.',
      'Verified automated transfer switch timings and emergency power changeovers.',
      'Tested lightning protection networks and earth pit ground resistance levels.'
    ],
    outcome: 'Successfully modernized the healthcare facility infrastructure, improving power factor efficiency and operational safety standards.',
    mediaKey: 'sarojiniHospital'
  },
  'shri-krishna-medical-college': {
    title: 'Shri Krishna Medical College, Muzaffarpur',
    client: 'Shri Krishna Medical College',
    sector: 'Healthcare / Medical',
    scope: 'Complete electrical SITC encompassing campus power distribution and illumination installations.',
    engineering: [
      'Structured overhead and underground cable tray layouts and HT/LT power distribution networks.',
      'Erected transformers, HT VCB panels, and sub-distribution boards across campus blocks.',
      'Installed general illumination fixtures, external yard lighting, and emergency lighting circuits.'
    ],
    testing: [
      'Tested cable insulation values and conducted high-potential (hipot) cable testing.',
      'Calibrated overcurrent, short circuit, and earth fault protection relay controls.',
      'Validated earth grid connectivity and grounding continuity across all buildings.'
    ],
    outcome: 'Completed the campus electrical infrastructure within project deadlines, satisfying all statutory safety clearance standards.',
    mediaKey: 'skmcMedical'
  },
  'sonotel': {
    title: 'Sonotel',
    client: 'Sonotel Hotels',
    sector: 'Hospitality',
    scope: 'Complete electrical SITC and infrastructure installation for hospitality property.',
    engineering: [
      'Designed architectural lighting layouts and customized interior power distribution paths.',
      'Installed main power switchboards, bus ducts, and structured cable tray routing.',
      'Integrated standby generator synchronization and automated mains failure controls.'
    ],
    testing: [
      'Tested phase alignment, circuit breaker operations, and safety interlocks.',
      'Conducted thermographic inspection checks on main panel termination points.',
      'Verified fire alarm integration and public address system controls.'
    ],
    outcome: 'Delivered a code-compliant, reliable hospitality electrical installation supporting continuous guest operations.',
    mediaKey: 'sonotel'
  }
}
