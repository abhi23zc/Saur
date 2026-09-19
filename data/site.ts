// ─────────────────────────────────────────────────────────────────────────────
// Saur Engineering & Consultancy — Centralised Site Data
// All content sourced from the company profile PDF
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

export type Expertise = {
  slug: string;
  title: string;
  number: string;
  summary: string;
  deliverables: string[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  endUser: string;
  year: string;
  disciplines: string[];
  scope: string;
  manHours?: string;
  deliverables?: string;
  location?: string;
  sector?: string;
  software?: string[];
  highlights?: string[];
  image?: string;
};

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  scope: string;
  manHours: string;
  deliverableCount: string;
  endUser: string;
  client?: string;
  disciplines: string[];
  deliverables: { category: string; items: string[] }[];
};

export type CourseModule = {
  phase: string;
  title: string;
  topics: string[];
};

export type Course = {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  duration: string;
  batchSchedule: string;
  software: string[];
  governingCodes: string[];
  targetAudience: string[];
  highlights: string[];
  modules: CourseModule[];
  deliverablesLearned: string[];
};

export type OrgNode = {
  role: string;
  children?: OrgNode[];
};

export type CoreValue = {
  title: string;
  description: string;
  icon: string; // Material Symbol name
};

export type Certification = {
  standard: string;
  title: string;
  certifiedFor: string[];
  authority: string;
  certificateNumber: string;
  validity: string;
};

export type CertificateItem = {
  id: string;
  title: string;
  subtitle: string;
  standard: string;
  authority: string;
  certificateNumber: string;
  issueDate: string;
  validity: string;
  image: string;
  badge: string;
  scope: string[];
};

export type OfficeInfo = {
  city: string;
  address: string;
  features?: string[];
};

export type WorkforceData = {
  intro: string;
  coreExpertise: string[];
  capabilities: { title: string; items: string[] }[];
  industriesServed: string[];
  commitment: string;
};

export type DomainSMEData = {
  domainSupport: { title: string; items: string[] };
  smeSupport: { title: string; items: string[] };
  serviceAreas: { title: string; description: string; items: string[] }[];
};

export type OTSecurityData = {
  intro: string;
  approach: string[];
};

// ── Static Data ──────────────────────────────────────────────────────────────

export const site = {
  name: "Saur Engineering & Consultancy",
  tagline: "Reliable Engineering. Sustainable Design. Proven Results.",
  phones: ["+91 99671 12295", "+91 88286 12183"],
  emails: ["contact@saurengineering.in", "saurengineeringconsultancy@gmail.com"],
  website: "www.saurengineering.in",
  linkedin: "https://www.linkedin.com/company/saur-engineering-consultancy",
  offices: [
    {
      city: "Mumbai",
      address: "507, 5th Floor, Real Tech Park, Sector 30A, Vashi, Navi Mumbai-400703",
      features: ["Engineering delivery centre", "Client coordination hub"],
    },
    {
      city: "Chennai",
      address: "No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai-600026",
      features: ["Engineering delivery centre", "Training classroom facility"],
    },
  ] as OfficeInfo[],
};

export const about = {
  intro:
    "At Saur Engineering & Consultancy, we combine technical expertise, global experience, and cutting-edge software tools to deliver engineering solutions that meet international standards. We are ISO 9001:2015 Certified (Quality Management System) and trusted partners to EPC companies, Oil & Gas operators, and industrial clients worldwide, helping them achieve project efficiency, safety, and sustainability.",
  vision:
    "To be a globally trusted engineering consultancy, recognized for delivering innovative, sustainable, and future-ready solutions that empower industries and advance the frontiers of engineering excellence.",
  mission:
    "To provide world-class, technology-driven engineering services that meet global standards — ensuring quality, efficiency, and customer satisfaction through timely, cost-effective, and value-oriented solutions.",
  whyUs:
    "At Saur Engineering & Consultancy, we deliver end-to-end engineering solutions with precision, innovation, and integrity. Our multidisciplinary expertise across Process, Piping, Electrical, and Instrumentation ensures high-quality, cost-effective results. We combine global standards with local insight, maintaining strict focus on safety, timely delivery, and client satisfaction — making us a trusted partner for complex industrial and energy projects.",
};

export const coreValues: CoreValue[] = [
  {
    title: "Excellence",
    description:
      "We are dedicated to delivering superior engineering solutions that uphold the highest standards of quality, safety, and precision.",
    icon: "workspace_premium",
  },
  {
    title: "Innovation",
    description:
      "We embrace technology, creativity, and forward-thinking approaches to solve complex engineering challenges with efficiency and impact.",
    icon: "lightbulb",
  },
  {
    title: "Integrity",
    description:
      "We operate with honesty, transparency, and accountability, fostering lasting trust with our clients, partners, and communities.",
    icon: "verified_user",
  },
];

export const certification: Certification = {
  standard: "ISO 9001:2015",
  title: "Quality Management System",
  certifiedFor: [
    "FEED & Detail Engineering",
    "Consultancy & Project Management",
    "Skilled Manpower Resource Support",
    "Engineering Training & Upskilling",
  ],
  authority: "Robust Certifications / IAF & EIAC",
  certificateNumber: "408319/2026/R",
  validity: "2026–2029",
};

export const certificates: CertificateItem[] = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    subtitle: "Quality Management System (QMS)",
    standard: "ISO 9001:2015",
    authority: "Robust Certifications Pvt. Ltd. (Accredited by IAF & EIAC CB-QMS-115)",
    certificateNumber: "408319/2026/R",
    issueDate: "02/09/2026",
    validity: "01/09/2029",
    image: "/certificates/iso-9001-2015.jpeg",
    badge: "Quality Management",
    scope: [
      "FEED & Detailed Engineering Services for Oil & Gas and Renewable Energy",
      "Subsea Engineering, Flow Assurance & Commissioning Support",
      "Multidisciplinary Engineering Consultancy & Project Management",
      "Skilled Manpower Resources & Professional Engineering Training",
    ],
  },
  {
    id: "iso-14001",
    title: "ISO 14001:2015",
    subtitle: "Environmental Management System (EMS)",
    standard: "ISO 14001:2015",
    authority: "Anglia Compliance Group (United Kingdom)",
    certificateNumber: "25-07-21157307",
    issueDate: "01/09/2026",
    validity: "31/08/2029",
    image: "/certificates/iso-14001-2015.jpeg",
    badge: "Environmental Safety",
    scope: [
      "Environmental Compliance across FEED and Detailed Engineering Workflows",
      "Resource Skilled Manpower & Engineering Consultancy for Energy Projects",
      "Professional Training Courses for All Engineering Disciplines",
      "Renewable Energy Engineering, Subsea & Commissioning Support",
    ],
  },
  {
    id: "iso-45001",
    title: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety Management System (OHSMS)",
    standard: "ISO 45001:2018",
    authority: "Anglia Compliance Group (United Kingdom)",
    certificateNumber: "25-07-21157308",
    issueDate: "01/09/2026",
    validity: "31/08/2029",
    image: "/certificates/iso-45001-2018.jpeg",
    badge: "Occupational Health & Safety",
    scope: [
      "Occupational Health & Safety Protocols across Design Offices and On-Site Works",
      "Zero-Harm and Incident Prevention Management for Industrial & Offshore Sites",
      "HSE-Trained Manpower Resource Deputation & Safe Commissioning Support",
    ],
  },
  {
    id: "dpiit-startup-india",
    title: "DPIIT Recognition",
    subtitle: "Department for Promotion of Industry and Internal Trade",
    standard: "Government of India #startupindia",
    authority: "Ministry of Commerce & Industry, Government of India",
    certificateNumber: "DIPP280090",
    issueDate: "01-09-2026",
    validity: "13-05-2036",
    image: "/certificates/dpiit-startup-india.jpeg",
    badge: "Govt. of India Recognition",
    scope: [
      "Recognized by DPIIT, Ministry of Commerce and Industry, Government of India",
      "Recognized Entity in 'Non-Renewable Energy' Industry and Engineering Sector",
      "Government-Backed Innovation & Enterprise Capability Credential",
    ],
  },
];

export const orgStructure: OrgNode = {
  role: "CEO",
  children: [
    {
      role: "Director — Operation",
      children: [
        {
          role: "Discipline Lead",
          children: [
            { role: "Electrical" },
            { role: "Instrumentation" },
            { role: "Telecommunication" },
            { role: "Process" },
            { role: "Mechanical" },
            { role: "Piping" },
            { role: "Subsea" },
            { role: "Cyber Security" },
          ],
        },
        {
          role: "Engineer & Sr. Engineer",
        },
        {
          role: "Design — Draftsman",
          children: [{ role: "2D & 3D Work" }],
        },
        { role: "QA/QC" },
        { role: "Procurement Support" },
      ],
    },
    {
      role: "Director — Technical",
      children: [
        { role: "Business Development" },
        { role: "Engineering" },
      ],
    },
    {
      role: "Admin & IT",
      children: [{ role: "HR" }, { role: "Finance" }],
    },
  ],
};

// ── Services (4 pillars) ─────────────────────────────────────────────────────

export const services = [
  {
    number: "01",
    title: "FEED & Detail Engineering",
    text: "Scale proven projects and investments to achieve sustainable growth and maximize their long-term value.",
    href: "/services#feed",
    details: [
      "FEED verification and detail engineering",
      "Design, drawings, reports and MTO",
      "Consultancy and project management",
    ],
  },
  {
    number: "02",
    title: "Manpower & Workforce Solutions",
    text: "Building on our engineering and safety excellence, we've introduced a specialized manpower services division for yard fabrication and offshore operations to meet the rising demand for skilled expertise.",
    href: "/digital-workforce#workforce",
    details: [
      "Site survey & construction supervision",
      "Pre-commissioning, commissioning & start-up",
      "Inspection, expediting & skilled deputation",
    ],
  },
  {
    number: "03",
    title: "Domain/SME Support for IT",
    text: "Empowering IT firms through deep domain knowledge and customer-centric solutions that drive success across industries.",
    href: "/digital-workforce#domain",
    details: [
      "Domain enablement & knowledge transfer",
      "Complex issue resolution & stakeholder alignment",
      "Lifecycle support from pre-sales to delivery",
    ],
  },
  {
    number: "04",
    title: "Training & Development",
    text: "Empowering professionals, students, and organizations through customized courses that build expertise and drive exceptional results.",
    href: "/training",
    details: [
      "Piping, Process & Mechanical engineering",
      "Electrical & Instrumentation engineering",
      "PDMS, SP3D, E3D & AutoCAD platforms",
    ],
  },
];

// ── 11 Expertise Areas ──────────────────────────────────────────────────────

export const expertise: Expertise[] = [
  {
    slug: "telecommunication",
    number: "01",
    title: "Telecommunication",
    summary: "Telecom systems and field communication engineering for industrial facilities.",
    deliverables: [
      "Telecom cable routing layout",
      "Telecom overall block diagram",
      "PAGA System block diagram",
      "Telecom equipment layout",
      "Telecom CCTV block diagram",
      "Telecom & FO cable schedule",
      "Telecom equipment list",
      "Material take off & BOQ",
      "3D modelling",
      "Layout extraction & preparation",
    ],
  },
  {
    slug: "electrical",
    number: "02",
    title: "Electrical",
    summary: "Power distribution, lighting and installation engineering for reliable plant operations.",
    deliverables: [
      "Power studies",
      "Single line diagrams",
      "Sizing calculations",
      "Data sheets",
      "Schematics & wiring diagrams",
      "Layouts, installation drawings & MTO",
    ],
  },
  {
    slug: "instrumentation",
    number: "03",
    title: "Instrumentation",
    summary: "Field instrumentation and control-system engineering from specification through installation.",
    deliverables: [
      "Data sheets",
      "Sizing calculations",
      "Cable block diagrams",
      "Loop diagrams & wiring diagrams",
      "Layouts, hook-ups & installation drawings & MTO",
      "SPI (Smart Plant Instrumentation)",
    ],
  },
  {
    slug: "piping-mechanical",
    number: "04",
    title: "Piping & Mechanical",
    summary: "Mechanical equipment and piping deliverables for constructible, maintainable facilities.",
    deliverables: [
      "Data sheets",
      "Static equipment GA / fabrication drawings",
      "Plot plans & layouts",
      "Material selection and corrosion management",
      "Stress analysis",
      "Bill of materials (piping and supports)",
      "Isometrics and vessel trims",
      "Insulation & steam tracing schedule and MTO",
    ],
  },
  {
    slug: "process",
    number: "05",
    title: "Process Engineering",
    summary: "Process design and safety engineering for oil, gas and industrial facilities.",
    deliverables: [
      "Piping & Instrumentation Diagram",
      "Operation & control philosophy",
      "Alarm & trip",
      "Cause & effect",
      "Tank sizing, pump NPSH calculation",
    ],
  },
  {
    slug: "3d-modelling",
    number: "06",
    title: "3D Modelling",
    summary: "Integrated model development and drawing/report extraction across all major disciplines.",
    deliverables: [
      "Equipment, piping, civil, structural",
      "Electrical, instruments, HVAC and telecom",
      "Extraction of drawings and reports",
    ],
  },
  {
    slug: "subsea",
    number: "07",
    title: "Subsea Engineering",
    summary: "Specialist subsea architecture and FEED support, delivered with partners where required.",
    deliverables: [
      "Subsea architecture",
      "Umbilical data sheet & selection",
      "FEED assistance",
      "Technical bid evaluation for subsea instrumentation",
    ],
  },
  {
    slug: "flow-assurance",
    number: "08",
    title: "Flow Assurance",
    summary: "Process and pipeline analysis to help protect operating performance.",
    deliverables: [
      "Piping & Instrumentation Diagram",
      "Operation & control philosophy",
      "Alarm & trip",
      "Cause & effect",
      "Tank sizing, pump NPSH calculation",
    ],
  },
  {
    slug: "yard-fabrication",
    number: "09",
    title: "Yard Fabrication Support",
    summary: "Fabrication-ready documentation and model-driven support for yard execution.",
    deliverables: [
      "BIM/3D modelling from IFC drawings",
      "Generation of isometric drawings from GAD, 3D model & IDF files",
      "Generation of bill of material (MTO)",
      "Generation of general arrangement, fabrication & erection drawings",
      "As-built drawings",
    ],
  },
  {
    slug: "pipeline",
    number: "10",
    title: "Pipeline Engineering",
    summary: "Pipeline route, crossing, station and stress-analysis documentation.",
    deliverables: [
      "Pipeline alignment sheets",
      "Pipeline route maps",
      "Crossing detail drawings",
      "Preparation of pipeline route in Google Earth",
      "Pipeline typical standard drawings",
      "Station approach drawings",
      "Block valve station drawings",
      "Various pipeline design calculations",
      "Pipe bending drawings",
      "Pipeline stress analysis",
      "Row cut sheets for pipeline",
      "Pipeline as-built drawings",
      "Material take-offs and BOMs",
    ],
  },
  {
    slug: "civil-structural",
    number: "11",
    title: "Civil & Structural Engineering",
    summary: "Civil and structural design support, delivered with partners where required.",
    deliverables: [
      "Structural steel jackets — mooring & loading equipment",
      "Civil foundation design",
      "Lifting analysis & calculation",
      "Civil architectural layout",
      "Bill of quantities (BOQ) bar bending schedule",
      "Blast design of buildings",
      "Structural detail drawings",
      "Structural calculations & analysis",
    ],
  },
];

// ── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "southeast-onshore-wellhead",
    title: "SO4-Southeast (SE) Onshore Wellhead (117 Wells)",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    year: "2025 (Ongoing)",
    location: "Southeast Assets, Abu Dhabi, UAE",
    sector: "Wellheads & Upstream",
    disciplines: ["Electrical", "Instrumentation", "Telecommunication", "3D Modelling"],
    scope: "Comprehensive 3D modeling and multidisciplinary detail engineering for 117 onshore off-pad wells (ESP, GLW, WIW, WAG, OPW, PWDW) across Electrical, Instrumentation, and Telecom disciplines.",
    manHours: "20,354",
    deliverables: "672",
    software: ["Smart 3D (S3D)", "Smart Instrumentation (SI)", "Smart Electrical (SEL)", "Dialux"],
    highlights: ["117 Off-Pad Wells Integrated", "20,354 Total Engineering Man-Hours", "672 Audited Technical Deliverables"],
    image: "/media/page-services-hero.png",
  },
  {
    slug: "emarat-natural-gas-pipeline",
    title: "EPC for 6km Cross-Country Natural Gas Pipeline",
    client: "Tekzone",
    endUser: "EMARAT",
    year: "2024-2026",
    location: "UAE",
    sector: "Pipelines & Distribution",
    disciplines: ["Pipeline", "Multidisciplinary", "Civil & Structural", "Piping"],
    scope: "Complete project engineering deliverables from concept to commissioning for a 6km natural gas pipeline, including route alignment sheets, river/road HDD crossing profiles, and ASME B31.8 stress analysis.",
    manHours: "12,500",
    deliverables: "Full EPC DED Package",
    software: ["CAESAR II", "AutoCAD", "GIS", "Pipeline Studio"],
    highlights: ["Concept to Commissioning DED", "12,500 Total Engineering Man-Hours", "HDD Crossing Profiles & Stress Verification"],
    image: "/media/saur-industrial-hero.png",
  },
  {
    slug: "aip5-onshore-wellhead",
    title: "AiP5 Onshore Wellhead (132 Wells) - BAB & BUHASA",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    year: "2024",
    location: "Bab & Buhasa, Abu Dhabi, UAE",
    sector: "Wellheads & Upstream",
    disciplines: ["Instrumentation", "Telecommunication"],
    scope: "Instrumentation & Telecom detail engineering for 132 onshore well pads (ESP, GLW, WIW, WAG, OPW & PWDW) including 3D cable routing, junction box schedules, and hydraulic tubing.",
    manHours: "11,000",
    deliverables: "533",
    software: ["Smart 3D (S3D)", "SmartPlant SPI", "AutoCAD"],
    highlights: ["132 Onshore Well Pads Modeled", "SmartPlant SPI Database Setup", "Complete Hydraulic Tube & Cable Schedules"],
    image: "/media/expertise-design-office.png",
  },
  {
    slug: "chemical-injection-skid",
    title: "109 Nos. Chemical Injection Skids (Bab & Buhasa)",
    client: "Petrocon Engineers / Robt Stone, Abu Dhabi",
    endUser: "ADNOC Onshore",
    year: "2025",
    location: "Bab & Buhasa Fields, UAE",
    sector: "Modular Skids & Packages",
    disciplines: ["Process", "Mechanical", "Electrical", "Instrumentation"],
    scope: "Detail engineering of 109 modular chemical injection skids for ADNOC onshore well pads covering Smart P&ID development, tank sizing, pump NPSH, electrical solar systems, and hook-up packages.",
    manHours: "9,000",
    deliverables: "450",
    software: ["SmartPID (SPID)", "Smart 3D", "PVElite", "AutoCAD"],
    highlights: ["109 Skids Detail Engineering", "102 SP-PID Schematic Deliverables", "Solar Sizing & Tank Fabrication Drawings"],
    image: "/media/saur-fabrication-projects.png",
  },
  {
    slug: "tanjung-miring",
    title: "EPC Development Gas Station Tanjung Miring Field",
    client: "PT. Pertamina EP Zona 4",
    endUser: "Pertamina",
    year: "2025-2026",
    location: "South Sumatra, Indonesia",
    sector: "Refineries & Gas Plants",
    disciplines: ["Mechanical", "Piping"],
    scope: "Developing all DED mechanical and piping documents, equipment layouts, piping GADs, static equipment drawings, and stress calculations for Tanjung Miring Gas Station.",
    manHours: "7,120",
    deliverables: "Full Mechanical & Piping DED",
    software: ["AVEVA E3D", "CAESAR II", "PVElite", "AutoCAD"],
    highlights: ["7,120 Engineering Man-Hours", "Gas Station Mechanical & Piping DED", "CAESAR II Stress Calculation Packages"],
    image: "/images/process.png",
  },
  {
    slug: "bangko-menggala",
    title: "EPC Bangko Phase 1 & Menggala South Facility Upgrade",
    client: "PT. Pertamina Hulu Rokan",
    endUser: "Pertamina",
    year: "2025-2026",
    location: "Riau, Sumatra, Indonesia",
    sector: "Refineries & Gas Plants",
    disciplines: ["Mechanical", "Piping"],
    scope: "Developing all DED mechanical and piping documentation for production facility upgrade, equipment replacement, and piping stress analysis.",
    manHours: "6,440",
    deliverables: "Full Facility Upgrade DED",
    software: ["AVEVA E3D", "CAESAR II", "AutoCAD"],
    highlights: ["6,440 Engineering Man-Hours", "Production Facility Upgrade DED", "Piping Isometrics & Equipment Layouts"],
    image: "/media/saur-engineering-coordination.png",
  },
  {
    slug: "pressure-flow-regulation-skid",
    title: "Pressure & Flow Regulation Skid (EMARAT)",
    client: "Tekzone",
    endUser: "EMARAT",
    year: "2025",
    location: "UAE",
    sector: "Modular Skids & Packages",
    disciplines: ["Mechanical", "Electrical", "Instrumentation", "Civil & Structural", "Process"],
    scope: "Skid detail engineering and yard fabrication support for Emirates Petroleum Company PJSC, covering 3D model, stress calculations, wall thickness, earthing, lighting lux levels, and structural base frame design.",
    manHours: "5,000",
    deliverables: "60",
    software: ["AutoCAD Plant 3D", "CAESAR II", "STAAD.Pro", "Dialux"],
    highlights: ["Turnkey Skid DED Package", "CAESAR II Stress Compliance", "Structural Base Frame Calculations"],
    image: "/media/saur-fabrication-projects.png",
  },
  {
    slug: "pertagas-pipeline-inspection",
    title: "PERTAGAS Existing Pipeline Inspection & Stress Assessment",
    client: "PT. Pertamina Gas / Direktorat Jenderal Migas",
    endUser: "Pertamina",
    year: "2023-2024",
    location: "Indonesia",
    sector: "Pipelines & Distribution",
    disciplines: ["Pipeline", "Piping"],
    scope: "Feasibility assessment and pipeline integrity verification using pipeline stress analysis based on intelligent pigging and ultrasonic corrosion inspection data.",
    manHours: "4,200",
    deliverables: "Feasibility & Stress Reports",
    software: ["CAESAR II", "Pipeline Studio", "AutoCAD"],
    highlights: ["Corrosion Data Stress Analysis", "4,200 Man-Hours Integrity Audit", "Residual Life & Fitness-For-Service Assessment"],
    image: "/media/saur-industrial-hero.png",
  },
  {
    slug: "feed-ded-gas-distribution",
    title: "FEED & DED — Jaringan Distribusi Pipa Gas",
    client: "PT. Pertamina Gas / KESDM",
    endUser: "Pertamina",
    year: "2023-2024",
    location: "Indonesia",
    sector: "Pipelines & Distribution",
    disciplines: ["Pipeline", "Multidisciplinary", "Civil & Structural"],
    scope: "Pustek E&T producing front-end and detailed engineering design for regional natural gas distribution pipeline network, pressure reduction stations, and city gas grids.",
    manHours: "3,910",
    deliverables: "Turnkey FEED & DED Package",
    software: ["AutoCAD", "CAESAR II", "GIS"],
    highlights: ["City Gas Distribution Grid DED", "3,910 Man-Hours Execution", "Pressure Regulating & Metering Stations"],
    image: "/media/saur-industrial-hero.png",
  },
  {
    slug: "lumut-balai-geothermal",
    title: "Lumut Balai II Geothermal Power Plant",
    client: "PT. Pertamina Geothermal Energy",
    endUser: "Pertamina",
    year: "2024-2025",
    location: "South Sumatra, Indonesia",
    sector: "Power & Industrial BIM",
    disciplines: ["Pipeline", "Piping", "Civil & Structural"],
    scope: "Design and engineering calculations for geothermal steam pipeline networks, high-pressure piping deliverables, and structural supports.",
    manHours: "3,460",
    deliverables: "Geothermal Piping Package",
    software: ["CAESAR II", "AutoCAD Plant 3D", "STAAD.Pro"],
    highlights: ["3,460 Man-Hours Geothermal DED", "Steam Pipeline Stress & Expansion Loops", "High-Temperature Thermal Fatigue Analysis"],
    image: "/media/page-services-hero.png",
  },
  {
    slug: "crpo-116",
    title: "CRPO 116 — Offshore Platforms & Tie-Ins",
    client: "Petrocon Engineers",
    endUser: "L&T Hydrocarbon / Saudi Aramco",
    year: "2024",
    location: "Offshore, Saudi Arabia",
    sector: "Offshore & Upstream",
    disciplines: ["Instrumentation", "Electrical"],
    scope: "Instrumentation FEED verification, detail engineering, and RFP compilation for 3 tie-in platforms (TP-01, 02, 03) and 3 wellhead platforms (BRRI 19/22, 58/63, 101/106).",
    manHours: "1,500",
    deliverables: "40",
    software: ["Smart 3D", "SmartPlant SPI", "AutoCAD"],
    highlights: ["3 Tie-In & 3 Wellhead Platforms", "ESD & F&G Cause & Effect Matrices", "480V Switchrack & SCADA Upgrades"],
    image: "/media/saur-engineering-coordination.png",
  },
  {
    slug: "amine-treated-gas-cooler",
    title: "Amine Treated Gas Cooler — Piping Stress Analysis",
    client: "PT. Pertamina Hulu Energi",
    endUser: "Pertamina",
    year: "2025-2026",
    location: "Indonesia",
    sector: "Refineries & Gas Plants",
    disciplines: ["Piping"],
    scope: "Critical piping stress analysis calculation reports and nozzle load evaluations for Amine Treated Gas Cooler Package under ASME B31.3.",
    manHours: "1,540",
    deliverables: "Stress Calculation Reports",
    software: ["CAESAR II", "PVElite"],
    highlights: ["CAESAR II High-Temp Stress Runs", "Nozzle Load Verification on Exchangers", "ASME B31.3 Compliance Audits"],
    image: "/images/process.png",
  },
  {
    slug: "ruwais-lifting-arrangements",
    title: "Train-3 Reflux Pumps & Motors Lifting Arrangement — Ruwais",
    client: "Avenir",
    endUser: "ADNOC",
    year: "2026",
    location: "Ruwais Refinery, UAE",
    sector: "Refineries & Gas Plants",
    disciplines: ["Civil & Structural", "Piping", "Electrical"],
    scope: "Detailed engineering for lifting arrangements of Train-3 Reflux Pumps & Motors at ADNOC Ruwais, covering structural adequacy checks, rigging studies, piping stress GADs, and safe installation procedures.",
    manHours: "1,200+",
    deliverables: "12 Deliverables",
    software: ["STAAD.Pro", "CAESAR II", "AutoCAD"],
    highlights: ["Rigging & Heavy Lifting Study", "Structural Adequacy & Foundation Checks", "Piping GADs & Pipe Support Schedules"],
    image: "/media/saur-fabrication-projects.png",
  },
  {
    slug: "lower-zakum",
    title: "Lower Zakum Field Phase 1 (Das Island Terminal Facilities)",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    year: "2024",
    location: "Das Island Terminal, UAE",
    sector: "Terminals & Offshore",
    disciplines: ["Multidisciplinary", "Piping", "Civil & Structural", "Electrical", "Instrumentation"],
    scope: "FEED verification and comprehensive Material Take-Off (MTO) calculations across Civil/Structural, Mechanical, E&I, Process Safety, and HVAC for Das Island Terminal Facilities (Package 5).",
    manHours: "1,000",
    deliverables: "10 Packages",
    software: ["Smart 3D", "SmartPlant Foundation (SPF)", "AutoCAD"],
    highlights: ["EPC Package 5 Das Island", "Multi-Discipline MTO Verification", "Zero-Variance Procurement Baseline"],
    image: "/media/saur-industrial-hero.png",
  },
  {
    slug: "1098-gas-heater",
    title: "1098 Gas Heater Project — Electrical & 3D Modeling",
    client: "Novargi Engineering",
    endUser: "Jindal Steel & Power",
    year: "2026",
    location: "India",
    sector: "Power & Industrial BIM",
    disciplines: ["Electrical", "3D Modelling"],
    scope: "Executed electrical engineering and procurement support for the Novargi Process Gas Heater Project, including electrical 3D modeling, cable tray routing, lighting simulation, vendor document reviews, and BOQ support.",
    manHours: "600+",
    deliverables: "44+ Deliverables",
    software: ["Smart 3D (S3D)", "Dialux", "AutoCAD"],
    highlights: ["Full Electrical 3D Model in S3D", "Dialux Lux Simulation Reports", "Vendor Document & Procurement Review"],
    image: "/images/electrical.png",
  },
  {
    slug: "5b5c-onshore-wellhead",
    title: "5b5c Onshore Wellhead (Mini Pad & BUHASA)",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    year: "2025",
    location: "Buhasa Field, Abu Dhabi, UAE",
    sector: "Wellheads & Upstream",
    disciplines: ["Telecommunication", "3D Modelling"],
    scope: "Telecom detail engineering for 4 mini pads (MP-109, MP-119, MP-125, MP-137) and BUHASA field covering 3D telecom tower/5G pole modeling, CCTV layouts, and fiber optic schedules.",
    manHours: "500",
    deliverables: "20",
    software: ["Smart 3D", "AutoCAD"],
    highlights: ["4 Mini Pads + Buhasa Field", "PTZ/Fixed CCTV Coverage Maps", "Fiber Optic & PAGA Routing"],
    image: "/media/page-digital-workforce-hero.png",
  },
  {
    slug: "asr-gas-well-tie-ins",
    title: "ASR Gas Well Tie-Ins (2023-2027) – Package 4",
    client: "Total Vision",
    endUser: "ADNOC Onshore",
    year: "2024",
    location: "Abu Dhabi, UAE",
    sector: "Pipelines & Distribution",
    disciplines: ["Pipeline", "Piping"],
    scope: "Preparing pipeline engineering deliverables, route drawings, tie-in location plans, and construction packages for Package 4 ASR gas well tie-ins.",
    manHours: "400",
    deliverables: "18 Drawings",
    software: ["AutoCAD", "CAESAR II"],
    highlights: ["ASR Gas Well Tie-In Plans", "Detailed Pipeline Drawings", "Construction & Tie-In Packages"],
    image: "/media/saur-industrial-hero.png",
  },
  {
    slug: "as-built-spi-sppid",
    title: "As-Built Engineering — SmartPlant SPI & SPPID",
    client: "Dexterity Design Services",
    endUser: "ADNOC",
    year: "Ongoing",
    location: "Abu Dhabi, UAE",
    sector: "Wellheads & Upstream",
    disciplines: ["Instrumentation", "Process"],
    scope: "Continuous SmartPlant administration, ILD updates, interconnection diagrams, P&ID redline reconciliation, and instrument engineering sheets for RDS-4, RDS-6, and RDS-7 stations.",
    manHours: "Ongoing Execution",
    deliverables: "2,000+ Drawings",
    software: ["SmartPlant Instrumentation (SPI)", "SmartPID (SPID)"],
    highlights: ["2,000+ Verified Loops & ILDs", "RDS-4, RDS-6, RDS-7 Administration", "Continuous As-Built Database Synchronization"],
    image: "/media/expertise-design-office.png",
  },
];

// ── Case Studies ─────────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    slug: "aip5-instrumentation",
    number: "01",
    title: "AiP5 Onshore Wellhead — Instrumentation",
    scope: "Instrumentation engineering for 132 onshore well pads (ESP, GLW, WIW, WAG, OPW & PWDW)",
    manHours: "7,000",
    deliverableCount: "269",
    endUser: "ADNOC",
    client: "Petrocon Engineers",
    disciplines: ["Instrumentation"],
    deliverables: [
      {
        category: "Instrumentation",
        items: [
          "3D modelling of Instrumentation (Cable trench, Cable tray, WHCP/RTU, Junction box, Field instruments)",
          "Cable block diagram (Instrumentation & Fire and Gas)",
          "Cable schedule (Instrumentation & Fire and Gas)",
          "Junction box schedule (Instrumentation & Fire and Gas)",
          "Hydraulic tube schedule for SSV & SSSV",
          "Material take off for cable tray, construction support, tube fittings, instrument cable & glands and junction boxes",
          "Engineering sheets for all field instrument items",
          "Interconnection & wiring diagram (Instrumentation & Fire and Gas)",
          "Cable routing layout including instrument & JB locations",
          "Instrument hook up drawing",
        ],
      },
    ],
  },
  {
    slug: "aip5-telecom",
    number: "02",
    title: "AiP5 Onshore Wellhead — Telecom",
    scope: "Telecom engineering for 132 onshore well pads (ESP, GLW, WIW, WAG, OPW & PWDW)",
    manHours: "4,000",
    deliverableCount: "264",
    endUser: "ADNOC",
    client: "Petrocon Engineers",
    disciplines: ["Telecommunication"],
    deliverables: [
      {
        category: "Telecommunication",
        items: [
          "3D modelling of Telecommunication (Cable trench, Cable tray, Telecom tower/5G pole)",
          "Telecom cable routing layout",
          "Telecom equipment layout",
        ],
      },
    ],
  },
  {
    slug: "crpo-116-feed",
    number: "03",
    title: "FEED Verification & Detail Engineering — CRPO 116",
    scope: "Instrumentation FEED verification, detail engineering & RFP compilation for 3 tie-in (TP-01, 02 & 03) & 3 wellhead platforms (BRRI 19/22, 58/63 & 101/106)",
    manHours: "1,500",
    deliverableCount: "40",
    endUser: "L&T Hydrocarbon / Saudi Aramco",
    client: "Petrocon Engineers",
    disciplines: ["Instrumentation", "Electrical"],
    deliverables: [
      {
        category: "FEED Verification",
        items: [
          "FEED verification report for 3 tie-in platforms (TP-01, TP-02 & TP-03)",
          "FEED verification report for 3 wellhead platforms (BRRI 19/22, BRRI 58/63 & BRRI 101/106)",
        ],
      },
      {
        category: "Detail Engineering",
        items: [
          "ESD Cause & Effect diagram",
          "F&G Cause & Effect diagram",
          "F&G layout modification",
          "Instrument piping installation (IPD) drawings",
          "Instrument point & lines (IPL) layouts",
          "Valve list",
        ],
      },
      {
        category: "MR Review for E&I Items",
        items: [
          "Electrical — 480V AC switchrack modification, electrical junction box, LV power panel & LV cables",
          "Instrumentation — SCADA modification, hydraulic ESD system",
        ],
      },
    ],
  },
  {
    slug: "lower-zakum-mto",
    number: "04",
    title: "FEED Verification — MTO (Lower Zakum)",
    scope: "Long Term Development Plan Phase-1 for Lower Zakum Field — Das Island Terminal Facilities (Package 5)",
    manHours: "1,000",
    deliverableCount: "10",
    endUser: "ADNOC",
    client: "Petrocon Engineers",
    disciplines: ["Multidisciplinary"],
    deliverables: [
      {
        category: "FEED Verification — MTO",
        items: [
          "FEED verification & MTO from piping layouts, P&IDs, structural layouts & other base documents",
          "MTO verification for civil & structural",
          "MTO verification for electrical, instrumentation & telecom",
          "MTO verification for mechanical",
          "MTO verification for process safety",
          "MTO verification for HVAC",
        ],
      },
    ],
  },
  {
    slug: "5b5c-telecom",
    number: "05",
    title: "5b5c Onshore Wellhead — Telecom (Mini Pad & BUHASA)",
    scope: "Telecom engineering for 4 mini pads & BUHASA field (MP-109, MP-119, MP-125, MP-137 & BUHASA)",
    manHours: "500",
    deliverableCount: "20",
    endUser: "ADNOC",
    client: "Petrocon Engineers",
    disciplines: ["Telecommunication"],
    deliverables: [
      {
        category: "Telecommunication",
        items: [
          "3D modelling of Telecommunication (Cable trench, Cable tray, Telecom tower/5G pole, CCTV PTZ & Fix, PAGA, Telephone)",
          "Telecom cable routing layout",
          "Telecom equipment layout",
          "Telecom equipment list",
          "Telecom & fibre optic cable schedule",
          "Material take off — MTO/BOQ",
        ],
      },
    ],
  },
  {
    slug: "chemical-injection-skid-detail",
    number: "06",
    title: "Chemical Injection Skid — Detail Engineering",
    scope: "Detail engineering of 109 chemical injection skids for BAB & BUHASA field (ADNOC onshore well pads)",
    manHours: "9,000",
    deliverableCount: "450",
    endUser: "ADNOC",
    client: "Petrocon Engineers / Robt Stone, Abu Dhabi",
    disciplines: ["Process", "Instrumentation", "Electrical", "Mechanical"],
    deliverables: [
      {
        category: "Process",
        items: [
          "Piping & Instrumentation Diagram for all 102 skids",
          "Control & operating philosophy",
          "Alarm & trip list",
          "Cause & effect chart",
          "Tank sizing calculations",
          "Pump NPSH calculation",
          "HAZOP participation and implementation",
          "P&ID development in SP P&ID",
          "As-built documentation",
          "Pump PDS",
        ],
      },
      {
        category: "Instrumentation",
        items: [
          "Junction box wiring & interconnection diagrams",
          "I/O list allocation for MLCP",
          "Data sheet for pressure safety valve (PSV) with GAD and sizing calculation",
          "Data sheet for pressure regulating valve (PRV) with GAD and sizing calculation",
          "Data sheets with GAD for level gauge, level transmitter, pressure transmitter, DP transmitter",
          "Data sheets for pressure gauge/indicator, flow transmitter, solenoid valve",
          "GA drawings for DBB, ball valve, check valve (instrument)",
          "Instrument index",
          "Instrument hook up drawings",
          "Instrument cable schedule",
        ],
      },
      {
        category: "Electrical",
        items: [
          "Cable & earthing layout diagram",
          "Local control station data sheet & GA drawing",
          "Motor data sheet, GA, terminal box & name plate",
          "Motor performance curve",
          "Utility consumption list",
          "Electrical load list",
          "Sizing calculation for solar system",
          "Datasheet & drawing for solar system",
          "As-built documentation",
        ],
      },
      {
        category: "Mechanical",
        items: [
          "Design calculation for storage tank",
          "Tank GA & fabrication drawing",
          "As-built documentation",
        ],
      },
    ],
  },
  {
    slug: "southeast-instrumentation",
    number: "07",
    title: "Southeast Onshore Wellhead — Instrumentation",
    scope: "3D modelling & detail engineering for 117 onshore off-pad wells covering instrumentation discipline",
    manHours: "11,300",
    deliverableCount: "403",
    endUser: "ADNOC",
    client: "Petrocon Engineers",
    disciplines: ["Instrumentation"],
    deliverables: [
      {
        category: "Instrumentation",
        items: [
          "3D modelling (Cable trench, cable tray, WHCP/RTU, junction box, field instruments)",
          "Cable block diagram (Instrumentation & Fire and Gas)",
          "Cable schedule (Instrumentation & Fire and Gas)",
          "Junction box schedule (Instrumentation & Fire and Gas)",
          "Hydraulic tube schedule for SSV & SSSV",
          "Material take off",
          "Engineering sheets for all field instrument items",
          "Interconnection & wiring diagram (Instrumentation & Fire and Gas)",
          "Cable routing layout including instrument & JB locations",
          "Instrument hook up drawing",
        ],
      },
    ],
  },
  {
    slug: "southeast-electrical",
    number: "08",
    title: "Southeast Onshore Wellhead — Electrical",
    scope: "3D modelling & detail engineering for 117 onshore off-pad wells covering electrical discipline",
    manHours: "5,759",
    deliverableCount: "166",
    endUser: "ADNOC",
    client: "Petrocon Engineers",
    disciplines: ["Electrical"],
    deliverables: [
      {
        category: "Electrical",
        items: [
          "3D modelling (Cable trench, cable tray, power supply skid, junction box, MOVs)",
          "Earthing & lightning layout",
          "Electrical cable schedule",
          "Electrical cable routing layout",
          "Electrical hazardous area layout",
          "Electrical interconnection diagram",
          "Lightning calculation via Dialux",
          "Material take off — MTO",
        ],
      },
    ],
  },
  {
    slug: "southeast-telecom",
    number: "09",
    title: "Southeast Onshore Wellhead — Telecom",
    scope: "3D modelling & detail engineering for 117 onshore off-pad wells covering telecom discipline",
    manHours: "3,295",
    deliverableCount: "103",
    endUser: "ADNOC",
    client: "Petrocon Engineers",
    disciplines: ["Telecommunication"],
    deliverables: [
      {
        category: "Telecommunication",
        items: [
          "3D modelling (Cable trench, cable tray, telecom tower/5G pole, CCTV PTZ & Fix, PAGA, Telephone)",
          "Telecom cable routing layout",
          "Telecom equipment layout",
          "Telecom equipment list",
          "Telecom & fibre optic cable schedule",
          "Material take off — MTO/BOQ",
        ],
      },
    ],
  },
  {
    slug: "emarat-skid",
    number: "10",
    title: "Pressure & Flow Regulation Skid — EMARAT",
    scope: "Skid detail engineering & fabrication support for EMARAT (Emirates Petroleum Company PJSC)",
    manHours: "5,000",
    deliverableCount: "60",
    endUser: "EMARAT",
    client: "Tekzone",
    disciplines: ["Mechanical", "Electrical", "Instrumentation", "Structural", "Process"],
    deliverables: [
      {
        category: "Mechanical",
        items: [
          "Skid 3D model",
          "Skid GAD",
          "Name plate drawing",
          "Data sheets for ball valve, DBB, check valve (piping)",
          "GA drawings for ball valve (piping)",
          "Stress calculation & pipe wall thickness calculation",
          "Piping isometric drawing",
        ],
      },
      {
        category: "Electrical",
        items: [
          "Cable & earthing layout diagram",
          "Lighting calculation / lux requirement",
          "Lighting layout",
          "Utility consumption list",
          "Electrical load list",
          "Sizing calculation for power supply requirement",
        ],
      },
      {
        category: "Instrumentation",
        items: [
          "Junction box wiring & interconnection diagrams",
          "I/O list",
          "Data sheets for PSV, pressure gauge, pressure switch, pressure transmitter, control valve, DPT, solenoid valve",
          "GAD review for pressure gauge, pressure transmitter, DPT",
          "Data sheets for instrument gas pressure regulators, RTU, shut-off valve",
          "Instrument index, hook up drawings, cable schedule",
          "BOQ / MTO",
          "Instrument and JB location layout",
        ],
      },
      {
        category: "Structure",
        items: [
          "Design calculation for structural base frame",
          "Foundation drawings",
          "Structural fabrication drawing",
        ],
      },
      {
        category: "General",
        items: ["Vendor document register list (VDRL)"],
      },
    ],
  },
  {
    slug: "as-built-spi-sppid-detail",
    number: "11",
    title: "As-Built Engineering — SPI & SPPID",
    scope: "Multiple documents like ILD, interconnection, P&ID etc. RLM & document update & admin support",
    manHours: "Ongoing",
    deliverableCount: "2,000+ ongoing",
    endUser: "ADNOC",
    client: "Dexterity Design Services",
    disciplines: ["Instrumentation"],
    deliverables: [
      {
        category: "Smart Plant Modules",
        items: [
          "Instrument interconnection diagram for DCS",
          "Instrument interconnection diagram for F&G",
          "Instrument loop diagram (UCP)",
          "Instrument loop diagram (DCS)",
          "Instrument loop diagrams for F&G",
          "Instrument loop diagrams for ESD",
          "Instrument index RDS-4",
          "Datasheet of flow control valve RDS-4",
          "Instrument engineering sheets for flow, pressure, and control valve instruments at RDS-4",
          "Fire and gas index for RDS-4",
          "F&G I/O list BCDS substation C",
          "Datasheets for pressure transmitter (SIL and non-SIL), vortex flowmeter, water in oil analyser",
          "Instrument cable schedule RDS-6",
        ],
      },
    ],
  },
  {
    slug: "ruwais-lifting",
    number: "12",
    title: "Lifting Arrangements — Train-3 Reflux Pumps & Motors, Ruwais",
    scope: "Detailed engineering for lifting arrangements of Train-3 Reflux Pumps & Motors at ADNOC Ruwais, covering structural, piping, and electrical engineering deliverables for safe installation and maintenance",
    manHours: "1,200+",
    deliverableCount: "12",
    endUser: "ADNOC",
    client: "Avenir",
    disciplines: ["Structural", "Piping", "Electrical"],
    deliverables: [
      {
        category: "Project Deliverables",
        items: [
          "Kick-off Meeting (KOM)",
          "Technical meetings & data collection",
          "Project deliverable register",
          "Site visit / survey report",
          "Design basis",
          "Lifting & handling report",
          "Option selection workshop",
          "Adequacy check report of structure and foundation",
          "Structural design calculations for lifting arrangement",
          "Structural drawings",
          "Electrical/Instrumentation modification drawings",
          "Piping engineering (GAD, isometrics, stress analysis, pipe support drawings)",
          "Cost estimate (+/- 15%) and schedule report",
          "Study report & presentation",
          "Scope of work for execution",
        ],
      },
    ],
  },
  {
    slug: "gas-heater-electrical",
    number: "13",
    title: "1098 Gas Heater Project — Electrical Engineering",
    scope: "Electrical 3D modelling, equipment layout development, cable tray routing, lighting system modelling, procurement document review, vendor document review, technical comment resolution, 2D drawing extraction and BOQ support",
    manHours: "600",
    deliverableCount: "44+",
    endUser: "Jindal Steel & Power",
    client: "Novargi Engineering",
    disciplines: ["Electrical", "3D Modelling"],
    deliverables: [
      {
        category: "Electrical Engineering",
        items: [
          "Cable routing drawings",
          "Electrical equipment layout",
          "Electrical general arrangement (GA)",
          "Lighting calculation report",
          "Vendor drawing review comments",
          "Lighting layout",
          "Procurement document review sheets",
          "Cable tray layout",
          "Datasheet review comments",
          "Cable tray support details",
          "Technical query (TQ) responses",
          "Electrical 3D model",
          "BOQ & MTO support",
        ],
      },
    ],
  },
];

// ── Software & Technology ────────────────────────────────────────────────────

export const engineeringPlatforms = [
  "Smart 3D (S3D)",
  "Smart P&ID (SPID)",
  "Smart Instrumentation (SI)",
  "Smart Electrical (SEL)",
  "Smart Plant Foundation (SPF)",
  "AVEVA E3D / PDMS",
  "AVEVA P&ID",
  "AVEVA Instrumentation",
  "AVEVA Electrical",
  "Bentley AutoPlant 3D",
  "Bentley OpenPlant 3D",
  "Bentley OpenPlant P&ID",
  "AutoCAD Plant 3D",
  "AutoCAD Plant P&ID",
];

export const industryTools = [
  "CAESAR II",
  "PV Elite",
  "TANK",
  "ETAP",
  "InstruCalc",
  "DIALux",
  "Chamlite",
  "MicroStation",
  "AutoCAD",
  "Cyclone",
  "LFM",
  "STAAD Pro",
  "Revit",
  "Tekla",
];

/** Flat list kept for backward compatibility */
export const software = [...engineeringPlatforms, ...industryTools];

// ── Courses ──────────────────────────────────────────────────────────────────

export const courses: Course[] = [
  {
    id: "piping-engineering",
    number: "01",
    title: "Piping Engineering & Design",
    category: "Piping & Plant Layout",
    tagline: "Comprehensive piping layout, stress analysis, material specs & isometric production.",
    description: "Comprehensive piping design, stress analysis, material selection and layout practices used in modern EPC projects.",
    icon: "Layers",
    image: "/media/saur-fabrication-projects.png",
    duration: "8–12 Weeks · 80+ Hours",
    batchSchedule: "Weekend & Evening Batches · Chennai Lab",
    software: ["Smart 3D (SP3D)", "CAESAR II", "AutoPIPE", "AutoCAD", "Navisworks"],
    governingCodes: ["ASME B31.3 / B31.4 / B31.8", "ASME Sec II & IX", "API 570", "Shell DEPs"],
    targetAudience: ["Mechanical & Chemical Engineering Graduates", "Junior Piping Draftsmen & Designers", "Site Engineers Transitioning to EPC Design"],
    highlights: [
      "Pipe routing & clash resolution in Intergraph Smart 3D",
      "Static & dynamic stress analysis in CAESAR II",
      "Piping MTO & Spool drawing generation",
      "Nozzle load evaluation on static & rotating equipment",
    ],
    modules: [
      {
        phase: "Phase 1",
        title: "Engineering Fundamentals & Design Basis",
        topics: [
          "Piping Design Basis, Process Flow Diagram (PFD) & P&ID interpretation",
          "ASME B31.3 Process Piping Code & ASME B31.8 Gas Transmission codes",
          "Pipe wall thickness calculations, pressure-temperature ratings & schedule selection",
          "Piping components: Flanges, valves, fittings, gaskets & branch connections",
        ],
      },
      {
        phase: "Phase 2",
        title: "Plant Layout & 3D Modeling Workflows",
        topics: [
          "Plot plan development, equipment spacing, maintenance access & safety zones",
          "Pipe rack routing, battery limit interfaces, and pump suction/discharge piping",
          "3D Plant Modeling in Smart 3D (SP3D) / AVEVA E3D",
          "Valve accessibility, platform design & operator ergonomics",
        ],
      },
      {
        phase: "Phase 3",
        title: "Pipe Stress Analysis & Support Design",
        topics: [
          "Flexibility analysis fundamentals & thermal expansion behavior",
          "CAESAR II software modeling: Code compliance, sustained, expansion & occasional loads",
          "Spring support selection, expansion loops & rigid hanger placement",
          "Nozzle allowable load checks per API 610 (Pumps) & NEMA SM23 (Turbines)",
        ],
      },
      {
        phase: "Phase 4",
        title: "Deliverables Generation & Material Take-Off",
        topics: [
          "Automated piping isometric drawing extraction & verification (Isogen)",
          "Piping General Arrangement (GA) drawings & tie-in schedule compilation",
          "Multi-discipline clash detection and report resolution in Navisworks",
          "Comprehensive Bill of Materials (BOM) & Material Take-Off (MTO) generation",
        ],
      },
    ],
    deliverablesLearned: [
      "Piping Material Specification (PMS)",
      "Equipment & Pipe Rack Layout Drawings",
      "CAESAR II Stress Analysis Reports",
      "Piping Isometrics with Full BOM",
      "Piping Specialty Item Datasheets",
    ],
  },
  {
    id: "process-engineering",
    number: "02",
    title: "Process Engineering & Design",
    category: "Process & Flow Assurance",
    tagline: "Process simulation, P&ID development, control philosophy & safety system design.",
    description: "P&ID development, process simulation, control philosophy and safety engineering aligned with international standards.",
    icon: "Compass",
    image: "/media/ot-security-control-room.png",
    duration: "8–10 Weeks · 70+ Hours",
    batchSchedule: "Weekend & Evening Batches · Chennai Lab",
    software: ["Aspen HYSYS", "SmartPlant P&ID (SP-PID)", "Flarenet", "Hydraulics Calc", "AutoCAD"],
    governingCodes: ["API 520 / 521 / 526", "API 14C", "ISO 10418", "GPSA Engineering Data Book"],
    targetAudience: ["Chemical & Petroleum Engineering Graduates", "Process Operations Engineers", "FEED & Detail Design Trainees"],
    highlights: [
      "Steady-state simulation of oil & gas separation trains in Aspen HYSYS",
      "SmartPlant P&ID (SP-PID) drafting and database synchronization",
      "PSV sizing, flare network & blowdown calculations per API 521",
      "Hydraulic line sizing, control valve pressure drops & pump sizing",
    ],
    modules: [
      {
        phase: "Phase 1",
        title: "Process Simulation & Heat/Material Balances",
        topics: [
          "Thermodynamic fluid property packages (Peng-Robinson, SRK) in Aspen HYSYS",
          "Flash calculations, phase envelope analysis & hydrocarbon separation modeling",
          "Heat & Material Balance (H&MB) table generation",
          "Process Flow Diagram (PFD) compilation with stream telemetry",
        ],
      },
      {
        phase: "Phase 2",
        title: "Hydraulics & Line Sizing Calculations",
        topics: [
          "Single-phase and two-phase hydraulic pressure drop calculations",
          "Line sizing criteria: Velocity limits, erosional velocity ratio (API 14E)",
          "Centrifugal pump hydraulics, NPSHa vs. NPSHr, and control valve sizing",
          "Compressor power calculations and gas pipeline hydraulics",
        ],
      },
      {
        phase: "Phase 3",
        title: "P&ID Development & Control Philosophy",
        topics: [
          "SmartPlant P&ID (SP-PID) setup, symbology, and data synchronization",
          "Process control loops (Flow, Level, Pressure, Temp) & cascade logic",
          "Shutdown philosophy: ESD levels, Emergency Depressurization (EDP) systems",
          "Utility Distribution P&IDs: Instrument Air, Nitrogen, Cooling Water, Fuel Gas",
        ],
      },
      {
        phase: "Phase 4",
        title: "Overpressure Protection & Equipment Sizing",
        topics: [
          "API 520/521 Relief valve sizing for fire, blocked discharge & control failure scenarios",
          "Flare header network sizing and radiation contour calculations in Flarenet",
          "Separator sizing: 2-phase & 3-phase horizontal/vertical vessel internals",
          "Process datasheets for pumps, heat exchangers, vessels, and instrumentation",
        ],
      },
    ],
    deliverablesLearned: [
      "Aspen HYSYS Process Simulation Model",
      "Process Flow Diagrams (PFD) & Heat/Material Balance (HMB)",
      "SmartPlant P&ID Packages (SP-PID)",
      "PSV Sizing Calculation Sheets (API 520/521)",
      "Process Equipment Datasheets",
    ],
  },
  {
    id: "mechanical-engineering",
    number: "03",
    title: "Mechanical Engineering & Design",
    category: "Static & Rotating Equipment",
    tagline: "Static pressure vessel design, storage tanks, heat exchangers & rotating equipment sizing.",
    description: "Static equipment design, rotating machinery, tank sizing and fabrication drawing preparation for industrial plants.",
    icon: "Cpu",
    image: "/media/saur-industrial-hero.png",
    duration: "8–10 Weeks · 75+ Hours",
    batchSchedule: "Weekend & Evening Batches · Chennai Lab",
    software: ["PV Elite", "Compress", "Tank", "AutoCAD", "SolidWorks"],
    governingCodes: ["ASME Sec VIII Div 1 & 2", "API 650 / API 620", "TEMA Class R, C, B", "API 610 / 676"],
    targetAudience: ["Mechanical Engineering Graduates", "Equipment Draftsmen & Modellers", "Fabrication & QC Engineers"],
    highlights: [
      "Pressure vessel wall thickness, head design & nozzle reinforcement in PV Elite",
      "Atmospheric storage tank design per API 650",
      "Shell and tube heat exchanger mechanical design per TEMA",
      "Pump, compressor and skid general arrangement packages",
    ],
    modules: [
      {
        phase: "Phase 1",
        title: "ASME Pressure Vessel Design (ASME Sec VIII Div 1)",
        topics: [
          "Material selection, allowable stresses & joint efficiency factors per ASME Sec II",
          "Shell and head thickness sizing under internal & external pressure",
          "PV Elite software setup, modeling, and automated code compliance verification",
          "Nozzle reinforcement, opening compensation & flange rating checks",
        ],
      },
      {
        phase: "Phase 2",
        title: "Wind, Seismic & Support Design",
        topics: [
          "Wind load calculations per ASCE 7 and regional building codes",
          "Seismic analysis of tall vertical towers and horizontal vessels",
          "Vessel support design: Skirt, saddle (Zick analysis), leg, and bracket supports",
          "Lifting lug and trunnion calculation for erection and transport",
        ],
      },
      {
        phase: "Phase 3",
        title: "Heat Exchangers & API 650 Storage Tanks",
        topics: [
          "TEMA shell & tube heat exchanger mechanical design: Tubesheet, baffles, tie rods",
          "API 650 Atmospheric storage tanks: Shell course calculation (1-foot method)",
          "Tank roof design: Fixed cone, dome, and floating roof systems",
          "Tank bottom, annular plate, wind girder & anchor bolt sizing",
        ],
      },
      {
        phase: "Phase 4",
        title: "Fabrication Drawings & Rotating Equipment Packages",
        topics: [
          "Mechanical Equipment General Arrangement (GA) & fabrication drawings",
          "Nozzle schedule, weld maps, tolerances & bill of materials",
          "API 610 centrifugal pump datasheets & vendor drawing review (VDR)",
          "Compressor skid packaging, baseplate design & piping interface verification",
        ],
      },
    ],
    deliverablesLearned: [
      "PV Elite Calculation Reports (ASME Sec VIII)",
      "API 650 Storage Tank Design Books",
      "Equipment General Arrangement Drawings",
      "Mechanical Equipment Datasheets (Static & Rotating)",
      "Fabrication Drawing Packages with Bill of Materials",
    ],
  },
  {
    id: "instrumentation-engineering",
    number: "04",
    title: "Instrumentation Engineering & Design",
    category: "Automation & Field Instrumentation",
    tagline: "SmartPlant Instrumentation (SPI/INtools), loop diagrams, hook-ups & control architectures.",
    description: "Instrument specification, loop diagrams, hook-up drawings, SPI and control system engineering from field to DCS.",
    icon: "FileSpreadsheet",
    image: "/media/expertise-design-office.png",
    duration: "8–10 Weeks · 70+ Hours",
    batchSchedule: "Weekend & Evening Batches · Chennai Lab",
    software: ["SmartPlant Instrumentation (SPI / INtools)", "Smart 3D", "AutoCAD", "Navisworks"],
    governingCodes: ["ISA 5.1 / ISA 84", "IEC 61508 / IEC 61511 (SIL)", "API RP 551 / 552", "NFPA 72"],
    targetAudience: ["Instrumentation & Control Engineering Graduates", "Electrical Engineers transitioning to I&C", "DCS / PLC Commissioning Engineers"],
    highlights: [
      "Database administration, tag creation & specification in SPI (INtools)",
      "Instrument index, I/O assignment & loop diagram automated generation",
      "Field instrument hook-up drawings & cable schedule design",
      "Fire & Gas detector mapping, Cause & Effect matrix compilation",
    ],
    modules: [
      {
        phase: "Phase 1",
        title: "Field Instrumentation Fundamentals & Selection",
        topics: [
          "P&ID interpretation for instrumentation, tag numbering per ISA 5.1",
          "Pressure, temperature, level, and flow transmitters: Working principles & sizing",
          "Control valve selection: Cv calculations, trim selection, actuator sizing & cavitation checks",
          "Safety Instrumented Systems (SIS): SIL ratings per IEC 61508/61511",
        ],
      },
      {
        phase: "Phase 2",
        title: "SmartPlant Instrumentation (SPI / INtools) Database",
        topics: [
          "SPI project database architecture, user rights, and project preferences",
          "Importing P&ID line lists & automated tag index generation",
          "Instrument datasheet creation & specification management in SPI",
          "Wiring & termination module: Marshaling cabinets, DCS/ESD I/O card assignment",
        ],
      },
      {
        phase: "Phase 3",
        title: "Installation Details, Cable Routing & JB Schedules",
        topics: [
          "Pneumatic & process impulse line hook-up drawings (IPD)",
          "Junction box schedule & terminal strip wiring diagrams",
          "Instrument cable schedule, multi-pair cable sizing & gland selection",
          "Cable tray routing, instrument air header distribution & trench layouts in 3D",
        ],
      },
      {
        phase: "Phase 4",
        title: "Control System Architecture & Safety Interlocks",
        topics: [
          "DCS, ESD, F&G and SCADA system architecture block diagrams",
          "Cause & Effect matrix (C&E) development for emergency shutdown",
          "Control room layout, console ergonomics & telecom integration",
          "Material Take-Off (MTO) for instrument cables, trays, tubing & junction boxes",
        ],
      },
    ],
    deliverablesLearned: [
      "SPI (INtools) Database Backups & Tag Indexes",
      "Instrument Specification Datasheets",
      "Loop Diagrams & Interconnection Wiring Sheets",
      "Instrument Installation Hook-Up Drawings",
      "Cause & Effect (C&E) Logic Diagrams",
    ],
  },
  {
    id: "electrical-engineering",
    number: "05",
    title: "Electrical Engineering & Design",
    category: "Power Distribution & Substation Design",
    tagline: "ETAP power system analysis, Single Line Diagrams (SLD), cable sizing & substation layout.",
    description: "Power studies, SLD, cable sizing, lighting design, hazardous area classification and installation engineering.",
    icon: "Zap",
    image: "/media/page-services-hero.png",
    duration: "8–10 Weeks · 75+ Hours",
    batchSchedule: "Weekend & Evening Batches · Chennai Lab",
    software: ["ETAP", "Dialux", "Smart 3D (Electrical)", "AutoCAD", "Navisworks"],
    governingCodes: ["IEEE 141 / 242 / 399", "IEC 60079 (Hazardous Area)", "NFPA 70 (NEC)", "IEC 60364"],
    targetAudience: ["Electrical Engineering Graduates", "Power Systems Engineers", "Substation & Industrial Plant Designers"],
    highlights: [
      "Load flow, short circuit & motor acceleration studies in ETAP",
      "Single Line Diagram (SLD) & key one-line distribution development",
      "Indoor & outdoor illumination lux calculations in Dialux",
      "Substation equipment layout, cable tray routing & earthing grid design",
    ],
    modules: [
      {
        phase: "Phase 1",
        title: "Power Distribution Basis & Load Estimation",
        topics: [
          "Electrical Load Summary (ELS) compilation: Continuous, intermittent & standby loads",
          "Transformer sizing, diesel generator (DG) sizing & power factor correction",
          "Overall Single Line Diagram (Key SLD) & HV/LV distribution philosophy",
          "Switchgear, MCC, and UPS sizing calculations",
        ],
      },
      {
        phase: "Phase 2",
        title: "ETAP Power System Modeling & Analysis",
        topics: [
          "ETAP network single-line modeling: Generators, transformers, cables, motors",
          "Load Flow analysis: Voltage drop checks, power factor & transformer tap optimization",
          "Short Circuit study per IEC 60909 and ANSI/IEEE standards",
          "Motor Acceleration Study (Static & Dynamic starting) and breaker duty verification",
        ],
      },
      {
        phase: "Phase 3",
        title: "Hazardous Area Classification & Lighting Design",
        topics: [
          "Hazardous area classification layouts per IEC 60079 & API RP 500 (Zone 0, 1, 2)",
          "Electrical equipment selection for explosive atmospheres (Ex d, Ex e, Ex i)",
          "Illumination design & lux calculation using Dialux software",
          "Emergency lighting, battery backup & solar lighting systems",
        ],
      },
      {
        phase: "Phase 4",
        title: "Cables, Earthing & Substation Layout Deliverables",
        topics: [
          "HV & LV cable sizing calculations (Ampacity, voltage drop, short circuit withstand)",
          "Earthing & Lightning protection design per IEEE 80 and IEC 62305",
          "Substation equipment layout, trench/tray routing & building entry details",
          "Cable schedule, interconnection diagrams & electrical MTO packages",
        ],
      },
    ],
    deliverablesLearned: [
      "Electrical Load Summary & Key SLDs",
      "ETAP Load Flow & Short Circuit Calculation Reports",
      "Hazardous Area Classification Schedule & Layouts",
      "Substation Equipment Layout & Cable Tray Routing",
      "Cable Schedules & Electrical MTO Packages",
    ],
  },
  {
    id: "multi-cad-3d",
    number: "06",
    title: "PDMS, SP3D, E3D & AutoCAD",
    category: "Plant 3D Modeling & Administration",
    tagline: "Mastery of Intergraph Smart 3D, AVEVA E3D/PDMS, and AutoCAD for multidisciplinary EPC modeling.",
    description: "Hands-on training on industry-standard 3D modelling and design tools used across all engineering disciplines.",
    icon: "Boxes",
    image: "/media/saur-engineering-coordination.png",
    duration: "6–10 Weeks · 80+ Hours",
    batchSchedule: "Weekend & Evening Batches · Chennai Lab",
    software: ["Smart 3D (SP3D)", "AVEVA E3D / PDMS", "AutoCAD", "Navisworks Manage"],
    governingCodes: ["Plant 3D Specifications", "Catalog & Spec Management", "Multi-Discipline Project QA Protocols"],
    targetAudience: ["Designers & Drafters in Piping, Structural, Electrical, and Instrumentation", "CAD Administrators & Model Managers"],
    highlights: [
      "Equipment modeling, nozzle positioning & structural grid setup",
      "Piping routing, support placement & isometric extraction",
      "Tray & trench modeling for E&I disciplines",
      "Navisworks clash detection & multi-discipline coordination",
    ],
    modules: [
      {
        phase: "Phase 1",
        title: "User Interface, Hierarchy & Project Setup",
        topics: [
          "Smart 3D & AVEVA E3D GUI, coordinate systems, and spatial navigation",
          "Project database hierarchy: Site, Area, Unit, System & Discipline structures",
          "Catalog and Piping Material Specification (PMS) integration",
          "Grid system creation, datum levels & reference coordinate alignment",
        ],
      },
      {
        phase: "Phase 2",
        title: "Equipment & Civil Structural Modeling",
        topics: [
          "Standard equipment modeling: Vertical columns, horizontal drums, pumps, exchangers",
          "Nozzle placement, coordinate positioning & rating verification",
          "Structural modeling: Columns, beams, bracing, platforms, ladders & handrails",
          "Foundation modeling, pipe rack steel frames & penetration openings",
        ],
      },
      {
        phase: "Phase 3",
        title: "Piping Routing & Support Placement",
        topics: [
          "Interactive pipe routing, spec-driven component insertion (Elbows, Tees, Reducers)",
          "Slope piping routing for drainage and gravity lines",
          "Pipe support placement: Standard shoe supports, guides, stops & spring hangers",
          "Cable tray, conduit & underground trench modeling for Electrical/Telecom",
        ],
      },
      {
        phase: "Phase 4",
        title: "Drawing Extraction & Navisworks Coordination",
        topics: [
          "Automated Piping Isometric extraction (Isodraft / Isogen) and dimension verification",
          "Piping & Structural General Arrangement (GA) drawing creation from 3D models",
          "NWD/NWC model export and multi-discipline federated model compilation",
          "Navisworks clash matrix detection, hard/soft clash filtering & resolution reports",
        ],
      },
    ],
    deliverablesLearned: [
      "Complete 3D Multidisciplinary Plant Model",
      "Extracted Piping Isometric Packages (Isogen)",
      "Piping General Arrangement Drawings (GA)",
      "Navisworks Clash Detection Matrix & Audit Report",
      "Multi-discipline 3D Model Review Package",
    ],
  },
];


// ── Workforce, Domain/SME & OT Security ──────────────────────────────────────

export const workforce: WorkforceData = {
  intro: "A dedicated division focused exclusively on manpower for onshore, yard & offshore operations.",
  coreExpertise: [
    "Site Survey & Construction Supervision",
    "Pre-commissioning, Commissioning & Start-up",
    "Inspection & Expediting",
    "Erection & Commissioning Support",
  ],
  capabilities: [
    {
      title: "Electrical & Instrumentation Services",
      items: [
        "As-built documentation",
        "2D/3D Design & Drafting",
        "Skilled manpower deputation",
        "Turnkey E&I project execution",
      ],
    },
    {
      title: "Expanding Capabilities",
      items: ["Mechanical", "Piping", "Structural"],
    },
  ],
  industriesServed: [
    "Petrochemical",
    "Oil & Gas",
    "EPC Projects",
    "Energy & Power",
    "Industrial Plants",
  ],
  commitment:
    "Safety First: Zero unsafe acts, certified equipment, strict compliance with safety norms.",
};

export const domainSME: DomainSMEData = {
  domainSupport: {
    title: "Domain Support",
    items: [
      "Deep understanding of industry processes and business workflows",
      "Ensures IT solutions address real-world business challenges",
    ],
  },
  smeSupport: {
    title: "SME (Subject Matter Expert) Support",
    items: [
      "Access to specialists with in-depth functional and technical expertise",
      "Minimizes project risks and rework",
      "Improves stakeholder alignment and satisfaction",
      "Drives innovation and competitive advantage",
    ],
  },
  serviceAreas: [
    {
      title: "Domain Enablement",
      description: "Helps deliver customized, business-relevant solutions.",
      items: [
        "Deep dive into industry-specific workflows",
        "Knowledge transfer and training for IT teams",
        "Creation of domain frameworks and best practices",
      ],
    },
    {
      title: "Complex Issue Resolution",
      description: "Ensures smooth project execution and success.",
      items: [
        "Expert guidance for intricate project challenges",
        "Problem-solving and stakeholder alignment",
      ],
    },
    {
      title: "Lifecycle Support",
      description: "Ensures timely, scalable, and cost-effective outcomes.",
      items: [
        "Covers Program Management, Pre-Sales, Architecture, and Delivery",
        "Supports every phase of the IT solution lifecycle",
      ],
    },
  ],
};

export const otSecurity: OTSecurityData = {
  intro:
    "Saur Engineering & Consultancy is a specialized engineering firm delivering advanced Operational Technology (OT) Cybersecurity solutions aligned with globally recognized standards such as IEC 62443. We help industries secure critical infrastructure, ensure operational continuity, and achieve regulatory compliance.",
  approach: [
    "Security Assessment & Gap Analysis",
    "Architecture Design & Strategy",
    "Implementation & Integration",
    "Monitoring & Threat Detection",
    "Remediation & Compliance",
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

export const projectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const caseStudyBySlug = (slug: string) =>
  caseStudies.find((cs) => cs.slug === slug);
