// Content data for LDS Infrastructure website
// Sourced from company prospectus. Do not add unverified claims.

export const COMPANY = {
  name: 'Lukhdatar & Sons',
  legalName: 'Lukhdatar & Sons',
  shortName: 'Lukhdatar & Sons',
  location: 'Kolkata, West Bengal, India',
  founded: '1997',
  turnkeySince: '2007',
  tagline: 'Power. Engineered to Endure.',
  email: 'info@ldsinfrastructure.com',
  phone: '+91 33 XXXX XXXX', // [REPLACE WITH VERIFIED CONTACT]
}

export const LEADERSHIP = [
  {
    id: 'founder',
    name: 'Mr. Lalit Kumar Sureka',
    title: 'Founder',
    imageKey: 'founder' as const,
    since: '1997',
  },
  {
    id: 'md',
    name: 'Mr. Shree Mangalam Sureka',
    title: 'Managing Director',
    imageKey: 'md' as const,
    since: '2007',
  },
]

export const TIMELINE = [
  {
    year: '1997',
    label: 'The Beginning',
    description:
      'Lukhdatar & Sons established as an electrical goods supplier in Kolkata.',
  },
  {
    year: '2007',
    label: 'Turnkey Contracting',
    description:
      'Expanded into complete turnkey electrical contracting for government and private sector projects.',
  },
  {
    year: 'Today',
    label: 'Infrastructure Delivery',
    description:
      'Lukhdatar & Sons undertakes complete electrical infrastructure projects across commercial, residential, industrial, public and substation environments.',
  },
]

export const CAPABILITY_STATS = [
  { value: '1997', label: 'Established' },
  { value: '2007', label: 'Turnkey Contracting Since' },
  { value: '66KV', label: 'Underground Cable Works Up To' },
  { value: '220KV', label: 'Substations & Switchyards Up To' },
  { value: '400KV', label: 'Transmission Capability Up To' },
]

export const TURNKEY_STAGES = [
  { number: '01', label: 'Engineering' },
  { number: '02', label: 'Supply' },
  { number: '03', label: 'Installation' },
  { number: '04', label: 'Testing' },
  { number: '05', label: 'Commissioning' },
]

export const LIFECYCLE_STAGES = [
  { number: '01', label: 'Engineering' },
  { number: '02', label: 'Supply' },
  { number: '03', label: 'Installation' },
  { number: '04', label: 'Testing' },
  { number: '05', label: 'Commissioning' },
  { number: '06', label: 'Maintenance' },
  { number: '07', label: 'Lifecycle Support' },
]

export const EQUIPMENT_RANGE = [
  { id: 'busduct',   title: 'Bus Duct Systems',         mediaKey: 'busduct' as const },
  { id: 'capacitor', title: 'Capacitor Banks',           mediaKey: 'capacitorBank' as const },
  { id: 'pcc',       title: 'Power Control Centres',     mediaKey: 'powerControlCenter' as const },
]

export const EQUIPMENT_CATEGORIES = [
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
  'VCB Panels',
]

export const PROJECTS = [
  {
    id: 'taj-hotel',
    title: 'Taj Group of Hotels',
    scope: 'Electrical Infrastructure',
    mediaKey: 'tajHotel' as const,
    tag: 'Hospitality',
  },
  {
    id: 'sonotel',
    title: 'Sonotel',
    scope: 'Complete SITC & Electrical Infrastructure',
    mediaKey: 'sonotel' as const,
    tag: 'Hospitality',
  },
  {
    id: 'assam-medical-college',
    title: 'Assam Hill Medical College & Research Institute',
    scope: 'Complete Electrical SITC',
    mediaKey: 'assamHill' as const,
    tag: 'Healthcare',
  },
  {
    id: 'sarojini-naidu-hospital',
    title: 'Sarojini Naidu Medical Hospital, Agra',
    scope: 'SITC of Electrical Installations',
    mediaKey: 'sarojiniHospital' as const,
    tag: 'Healthcare',
  },
  {
    id: 'skmc-medical-college',
    title: 'Shri Krishna Medical College, Muzaffarpur',
    scope: 'Complete Electrical SITC',
    mediaKey: 'hospital' as const,
    tag: 'Healthcare',
  },
  {
    id: 'bihar-vidhan-sabha',
    title: 'Bihar Vidhan Sabha',
    scope: 'Turnkey Infrastructure Electrification',
    mediaKey: 'commercial' as const,
    tag: 'Government / Institutional',
  },
  {
    id: 'warehouse-projects',
    title: 'Warehouse Electrification Projects',
    scope: 'Industrial Power Distribution',
    mediaKey: 'warehouse' as const,
    tag: 'Industrial / Infrastructure',
  },
  {
    id: 'kohora-substation',
    title: 'Kohora, Assam',
    scope: '2 × 3.15 MVA Substation, Control Room & VCB Panels',
    mediaKey: 'industrial' as const,
    tag: 'Substation',
  },
  {
    id: 'signature',
    title: 'Signature',
    scope: 'HT/LT Power Distribution',
    mediaKey: 'residential' as const,
    tag: 'Residential / Township',
  },
  {
    id: 'shristinagar',
    title: 'Shristinagar',
    scope: 'HT/LT Power Distribution',
    mediaKey: 'township' as const,
    tag: 'Residential / Township',
  },
]

export const INDUSTRIES = [
  { id: 'education',      label: 'Education',         mediaKey: 'education'     as const },
  { id: 'commercial',    label: 'Commercial',         mediaKey: 'commercial'    as const },
  { id: 'residential',   label: 'Residential',        mediaKey: 'residential'   as const },
  { id: 'medical',       label: 'Medical / Hospital', mediaKey: 'medical'       as const },
  { id: 'township',      label: 'Township',           mediaKey: 'township'      as const },
  { id: 'warehousing',   label: 'Warehousing',        mediaKey: 'warehousing'   as const },
  { id: 'manufacturing', label: 'Manufacturing',      mediaKey: 'manufacturing' as const },
]

export const ACCOUNTABILITY_PRINCIPLES = [
  { number: '01', title: 'Dedication',  description: 'Committed to every project from first drawing to final energisation.' },
  { number: '02', title: 'Excellence',  description: 'Engineering precision across supply, installation, testing and commissioning.' },
  { number: '03', title: 'Team Work',   description: 'Cross-functional expertise delivered as one integrated scope.' },
  { number: '04', title: 'Commitment',  description: 'Accountable not just at handover, but through the full operational lifecycle.' },
]

export const ECOSYSTEM_BRANDS = [
  'Larsen & Toubro', 'ABB', 'HPL', 'Havells', 'Polycab', 'KEI',
  'Legrand', 'Crompton Greaves', 'Schneider Electric', 'Anchor',
  'Bajaj Electricals', 'Philips', 'Wipro', '3M', 'Eaton',
  'Raychem RPG', 'Voltamp', 'Kotsons', 'Huphen Electromech',
  'Luccy Electric', "Dowell's", 'Lamco', 'AKG', 'Utkarsh',
  'HEX', 'MESCAB', 'Powerstar', 'Daga Power Group',
]

export const CAPABILITIES_LIST = [
  'Complete Electrical Design',
  'Substation & Switchyard',
  'Internal / External Electrification',
  'HT / LT Distribution',
  'Underground Cabling',
  'Street & Aviation Lighting',
  'Transformer Installation',
  'VCB & LT Panels',
  'Overhead Lines',
  'Earthing & Lightning Protection',
  'Fire Detection Systems',
  'Public Address & EPABX',
  'UPS Systems',
  'Voice / Data Cabling',
  'MATV',
  'Cable Tray Fabrication',
  'Structures & Light Poles',
  'High Mast Lighting',
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
    ],
  },
  {
    heading: 'Enterprise',
    links: [
      { label: 'Partnerships', href: '/partner-with-us' },
      { label: 'Procurement', href: '/vendor-capabilities' },
      { label: 'Quality & Safety', href: '/quality-safety' },
      { label: 'Insights & FAQs', href: '/insights' },
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
    title: 'Turnkey Electrification',
    deliverables: [
      'Complete end-to-end SITC (Supply, Installation, Testing & Commissioning)',
      'Integrated project engineering, supply chain orchestration, and field execution',
      'Single-point vendor accountability eliminating interface and coordination risks'
    ],
    scopes: [
      'HT and LT distribution systems, main power grids, and transformer hubs',
      'Indoor and outdoor turnkey electrical project execution up to specification',
      'Detailed site execution planning and engineering lifecycle mapping'
    ],
    specs: [
      'LT Rising Mains and bus duct installations',
      'LT Power Factor Improvement Capacitor Panels',
      'LT MCC / PCC, AMF, and instrumentation panels'
    ],
    environments: [
      'Hospitality and commercial complexes (e.g. Taj Group of Hotels, Sonotel)',
      'Healthcare and educational campuses (e.g. Assam Hill Medical College)',
      'Large industrial projects and distribution warehouses'
    ],
    lifecycle: [
      'Phase 01 Engineering: Detailed electrical design and load calculation mapping',
      'Phase 06 Maintenance: Scheduled preventive testing and component maintenance',
      'Phase 07 Lifecycle Support: Rapid response operational repairs and replacements'
    ],
    ctaText: 'Discuss Your Project',
    ctaHref: '/vendor-capabilities?type=Turnkey'
  },
  'substations-switchyards': {
    title: 'Substations & Switchyards',
    deliverables: [
      'Design, procurement, and complete construction of substations up to 220KV',
      'Switchyard engineering, transformer installation, VCB erection and panels commissioning',
      'Grid connection coordination and safety systems compliance approvals'
    ],
    scopes: [
      'Utility substations and high-voltage industrial switchyards',
      'VCB panels erection, HT bus ducts and power transformers integration',
      'Fast-track utility substations commissioning (e.g. Kohora, Assam 2 × 3.15 MVA complete substation)'
    ],
    specs: [
      'Voltage Levels: Complete infrastructure up to 220KV systems',
      'VCB Panels: Integrated indoor and outdoor type vacuum circuit breakers',
      'Transformers: Distribution and power transformer SITC'
    ],
    environments: [
      'State electricity grids and utility networks',
      'Heavy industrial plants and manufacturing zones',
      'High-capacity commercial and township hubs'
    ],
    lifecycle: [
      'HV testing, insulation resistance checks, and relay calibration settings',
      'Transformer oil filtration, VCB contact testing, and bushing maintenance',
      'Substation expansion, retrofitting, and modernization support'
    ],
    ctaText: 'Request Capability Profile',
    ctaHref: '/vendor-capabilities?type=Substation'
  },
  'transmission-lines': {
    title: 'Transmission Lines',
    deliverables: [
      'Complete overhead transmission line infrastructure up to 400KV voltage levels',
      'Tower design, structural foundations, conductor stringing, and line commissioning',
      'Right-of-Way (RoW) management and complex terrain engineering execution'
    ],
    scopes: [
      'Overhead lines up to 400KV grid connectivity',
      'Complete towers installation, stringing, and substation grid integration',
      'High-capacity power corridor transmission works'
    ],
    specs: [
      'Voltage Range: 11KV, 33KV, 132KV, 220KV, and 400KV transmission structures',
      'Fabrication: Steel towers, structural members, high-capacity light poles and high masts',
      'Conductors: AAAC/ACSR conductor stringing and sag optimization'
    ],
    environments: [
      'Interstate power transmission corridors',
      'Connecting substations to municipal utility grids',
      'Dedicated industrial heavy power corridors'
    ],
    lifecycle: [
      'Tower structural alignment testing and line insulation resistance validation',
      'Annual line patrols, structural integrity inspections, and insulator cleanings',
      'Emergency line restorations, tower retrofitting, and re-conductoring'
    ],
    ctaText: 'Explore Partnership',
    ctaHref: '/partner-with-us?type=Transmission'
  },
  'underground-cable-laying': {
    title: 'Underground Cable Laying',
    deliverables: [
      'Excavation, trenching, cable laying, and jointing up to 66KV voltage levels',
      'HT and LT underground distribution networks with structural protections',
      'Cable route surveying, utility mapping, and structural duct installation'
    ],
    scopes: [
      'High-voltage underground cabling up to 66KV capacity systems',
      'Cable trench construction, backfilling, jointing bays, and termination setups',
      'HT and LT underground distribution networks'
    ],
    specs: [
      'Cable types: XLPE insulated armored cables up to 66KV system voltages',
      'Laying methods: Direct burial, concrete ducts, or trenchless HDD piping',
      'Joints: Premium heat-shrinkable cable joints and end terminations'
    ],
    environments: [
      'Dense urban zones and municipal commercial districts',
      'Industrial parks and manufacturing campuses',
      'Premium townships and residential developments'
    ],
    lifecycle: [
      'Cable insulation resistance testing, sheath testing, and VLF testing',
      'Cable route marker checks, termination box heating inspections, and joint monitoring',
      'Locating cable faults, core repairs, and joint replacements'
    ],
    ctaText: 'Discuss Your Project',
    ctaHref: '/vendor-capabilities?type=Cabling'
  },
  'industrial-electrification': {
    title: 'Industrial Electrification',
    deliverables: [
      'Heavy-duty industrial power distribution systems and turnkey installations',
      'Plant wiring, power factor improvement capacitor systems, and motor control centers (MCC)',
      'DG set synchronizing panels, bus ducts, and main distribution setups'
    ],
    scopes: [
      'Main switchgear, MCC, PCC, capacitor banks, and power factor panels SITC',
      'Plant internal/external electrification, tray works, and cable terminations',
      'Process automation instrumentation cabling and control desks setup'
    ],
    specs: [
      'Bus Ducts: High-capacity copper and aluminum LT bus ducts',
      'Capacitor Banks: Automated Power Factor Correction (APFC) panels',
      'MCC/PCC Panels: Draw-out and non-draw-out type power control centers'
    ],
    environments: [
      'Manufacturing plants, chemical factories, and processing zones',
      'Warehousing and logistics facilities',
      'Industrial infrastructure and heavy utility grids'
    ],
    lifecycle: [
      'Earth loop impedance testing, relay calibration, and load trial runs',
      'Thermography inspections, contact resistance check, and breaker cleaning',
      'Power factor monitoring, equipment modernization, and capacity upgrades'
    ],
    ctaText: 'Discuss Your Project',
    ctaHref: '/vendor-capabilities?type=Industrial'
  },
  'healthcare-electrical-infrastructure': {
    title: 'Healthcare Electrical Infrastructure',
    deliverables: [
      'Ultra-reliable medical electrification and backup power distribution networks',
      'SITC of hospitals, operation theatres, critical care units, and labs electrical systems',
      'UPS systems integration, clean earthing, and lightning safety networks'
    ],
    scopes: [
      'Complete electrical SITC for medical colleges and healthcare institutes',
      'Clean power setups, isolated earthing, and back-up DG synchronisation',
      'Low-voltage setups (PA, fire alarms, MATV, data cabling) for hospital wards'
    ],
    specs: [
      'Healthcare sites: Shri Krishna Medical College, Assam Hill Medical College, etc.',
      'Panels: Custom hospital distribution boards and AMF panels',
      'Systems: Public address systems, EPABX, and voice/data cabling'
    ],
    environments: [
      'Government and private medical colleges',
      'Super-specialty hospitals and healthcare research institutes',
      'Diagnostic centers and clinical laboratories'
    ],
    lifecycle: [
      'Dual-source transfer testing, isolated grounding checks, and UPS runtime runs',
      'Bi-annual backup grid simulations, earthing resistance audits, and panel cleanings',
      '24/7 emergency response support and critical panel modernization'
    ],
    ctaText: 'Discuss Your Project',
    ctaHref: '/vendor-capabilities?type=Healthcare'
  },
  'warehouse-electrification': {
    title: 'Warehouse Electrification',
    deliverables: [
      'Large-scale warehouse lighting, high-bay setups, and power distribution cabling',
      'Main panel board, high masts, yard lighting, and lightning protection systems',
      'Integrated fire alarm networks and public address safety installations'
    ],
    scopes: [
      'High-bay general illumination, high masts, and perimeter yard lighting',
      'LT distribution networks, cable trays routing, and panels erection',
      'Lightning protection earthing and UPS backed safety control networks'
    ],
    specs: [
      'Lighting: General illumination, high masts, and energy-efficient lighting fixtures',
      'Fabrication: High-capacity cable trays, ducts, towers, and light poles',
      'Safety: Fire detection networks, earthing grid, and public address setups'
    ],
    environments: [
      'Large logistics parks and distribution warehouses',
      'E-commerce fulfillment centers',
      'Industrial storage and cold chain facilities'
    ],
    lifecycle: [
      'Illumination level lux audits, loop resistance testing, and fire alarm drills',
      'Annual earthing pit audits, high mast motor checks, and fixture cleaning',
      'LED lighting retrofits, panel relocations, and utility expansions'
    ],
    ctaText: 'Discuss Your Project',
    ctaHref: '/vendor-capabilities?type=Warehouse'
  },
  'testing-commissioning': {
    title: 'Testing & Commissioning',
    deliverables: [
      'Independent technical inspection, relay testing, and HV energization checks',
      'Load trial runs, transformer oil filtration, and compliance documentation checks',
      'Protection coordination relay calibration and safety systems audit checks'
    ],
    scopes: [
      'EHV, HV, and LV installations pre-commissioning testing and reports',
      'Relay settings, circuit breaker timings, and transformer characteristics tests',
      'Energisation supervision, grid synchronization, and safety clearances'
    ],
    specs: [
      'HV testing: Insulation resistance, cable sheath checks, and high voltage tests',
      'Panel testing: VCB contact checks, relay calibration, and interlocking tests',
      'Earthing test: Earth pit resistance measurements and grid continuity checks'
    ],
    environments: [
      'Utility substations and grid switchyards',
      'Industrial manufacturing plants and commercial properties',
      'Independent vendor quality verification reviews'
    ],
    lifecycle: [
      'Phase 04 Testing: Detailed HV testing, continuity mapping, and settings check',
      'Phase 05 Commissioning: Phase grid alignment, load trial, and handover documentation',
      'Periodic relay settings audits and protection system test validations'
    ],
    ctaText: 'Request Capability Profile',
    ctaHref: '/vendor-capabilities?type=Testing'
  },
  'electrical-maintenance': {
    title: 'Electrical Maintenance',
    deliverables: [
      'Scheduled preventive maintenance, shutdowns, and emergency breakdown repairs',
      'Breaker servicing, transformer testing, oil filtration, and earthing audits',
      'Retrofitting, modernization of legacy panels, and operational lifecycle support'
    ],
    scopes: [
      'Preventive, predictive, and breakdown maintenance programs',
      'Substations, industrial MCC/PCC, and commercial HT/LT systems upkeep',
      'Equipment replacements, breaker retrofitting, and panel modifications'
    ],
    specs: [
      'Servicing: VCB breakers, transformer dehydrating breathers, and contactors',
      'Auditing: Thermographic imaging inspections and earth resistance checks',
      'Upgrades: Modern relay retrofits and bus duct structural maintenance'
    ],
    environments: [
      'Hospitals, colleges, and commercial complexes',
      'Industrial manufacturing centers and warehouses',
      'Completed turnkey electrical projects and legacy substations'
    ],
    lifecycle: [
      'Phase 06 Maintenance: Routine predictive testing and breakdown maintenance',
      'Phase 07 Lifecycle Support: Panel modernizations, replacement items, and grid safety',
      '24/7 engineering response and support contracts'
    ],
    ctaText: 'Talk to our Team',
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
    scope: '2 × 3.15 MVA Complete Substation commissioning incorporating a dedicated Control Room and 9 VCB Panels.',
    engineering: [
      'Completed detailed engineering layout mapping for challenging terrain site conditions in Assam.',
      'Sourced and delivered utility-grade transformers, custom VCB panels, and auxiliary systems.',
      'Installed complete substation foundations, gantry structures, and cabling duct networks.'
    ],
    testing: [
      'Conducted full insulation resistance testing and high-voltage cable sheath tests.',
      'Calibrated protection relay settings and interlocking system checks.',
      'Performed vacuum circuit breaker contact resistance and timing validation tests.'
    ],
    outcome: 'Successful energisation of the complete substation in only 100 Working Days, providing reliable grid power with zero safety incidents.',
    mediaKey: 'industrial'
  },
  'assam-hill-medical-college': {
    title: 'Assam Hill Medical College',
    client: 'Assam Hill Medical College & Research Institute',
    sector: 'Healthcare / Medical',
    scope: 'Complete electrical SITC (Supply, Installation, Testing & Commissioning) for the medical college and research campus.',
    engineering: [
      'Executed detailed design and load planning analysis for multiple hospital blocks, labs, and lecture halls.',
      'Installed main HT distribution systems, transformer yards, and LT rising mains.',
      'Laid extensive internal power cabling, utility cable trays, and lighting distribution boards.'
    ],
    testing: [
      'Conducted earth loop impedance testing across all critical care rooms and surgical wards.',
      'Verified back-up generator synchronisation controls and AMF panel operation.',
      'Tested low-voltage communication setups, fire alarms, and public address networks.'
    ],
    outcome: 'Delivered an integrated, high-availability electrical system providing clean, uninterrupted power for critical healthcare operations.',
    mediaKey: 'hospital'
  },
  'sarojini-naidu-medical-hospital': {
    title: 'Sarojini Naidu Medical Hospital, Agra',
    client: 'Sarojini Naidu Medical Hospital',
    sector: 'Healthcare / Medical',
    scope: 'Turnkey SITC of electrical installations and main power distribution grids for hospital wards.',
    engineering: [
      'Engineered localized power sub-stations to support specialized hospital equipment loads.',
      'Installed capacitor banks, power panels, bus ducts, and high-conductivity grounding systems.',
      'Structured cable routes in functional clinical spaces with zero disruption to active areas.'
    ],
    testing: [
      'Performed transformer winding resistance testing and dielectric strength tests.',
      'Verified automated transfer switch timings and UPS system backup batteries.',
      'Tested lightning protection grids and earth pit ground resistance levels.'
    ],
    outcome: 'Successfully modernized the healthcare facility infrastructure, improving safety standards and power factor efficiency.',
    mediaKey: 'hospital'
  },
  'shri-krishna-medical-college': {
    title: 'Shri Krishna Medical College, Muzaffarpur',
    client: 'Shri Krishna Medical College',
    sector: 'Healthcare / Medical',
    scope: 'Complete electrical SITC encompassing campus power distribution and lighting installations.',
    engineering: [
      'Structured cable tray layouts and HT/LT power distribution networks.',
      'Erected transformers, HT VCB panels, and sub-distribution boards.',
      'Installed general illumination fixtures, external yard lighting, and emergency lighting grids.'
    ],
    testing: [
      'Tested cable insulation values and conducted high-potential (hipot) cable testing.',
      'Calibrated overcurrent and earth fault protection relay controls.',
      'Validated earth grid connectivity and grounding continuity.'
    ],
    outcome: 'Completed the electrical infrastructure under strict deadlines, meeting all safety clearance standards.',
    mediaKey: 'hospital'
  },
  'sonotel': {
    title: 'Sonotel',
    client: 'Sonotel Hotels',
    sector: 'Hospitality',
    scope: 'Complete electrical SITC and infrastructure installation for premium hospitality property.',
    engineering: [
      'Designed premium lighting layouts and customized interior power distribution paths.',
      'Installed main power panels, bus ducts, and aesthetic cable tray routing layouts.',
      'Integrated DG backup synchronisation and automated main transition controls.'
    ],
    testing: [
      'Tested phase alignment, breaker operations, and safety interlocks.',
      'Conducted thermal imaging checks on main panel termination terminals.',
      'Verified fire alarm integration and public address system controls.'
    ],
    outcome: 'Delivered a premium, code-compliant hospitality electrical system supporting high-end customer guest operations.',
    mediaKey: 'tajHotel'
  }
}

