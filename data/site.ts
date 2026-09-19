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
    slug: "aip5-onshore-wellhead",
    title: "AiP5 Onshore Wellhead - BAB & BUHASA",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    year: "2024",
    disciplines: ["Instrumentation", "Telecommunication"],
    scope: "Instrumentation & Telecom detail engineering for 132 onshore well pads (ESP, GLW, WIW, WAG, OPW & PWDW).",
    manHours: "11,000",
    deliverables: "533",
  },
  {
    slug: "crpo-116",
    title: "CRPO 116",
    client: "Petrocon Engineers",
    endUser: "L&T Hydrocarbon / Saudi Aramco",
    year: "2024",
    disciplines: ["Instrumentation"],
    scope: "FEED verification and detail engineering for 3 tie-in and 3 wellhead platforms.",
    manHours: "1,500",
    deliverables: "40",
  },
  {
    slug: "lower-zakum",
    title: "Lower Zakum Field - Phase 1",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    year: "2024",
    disciplines: ["Multidisciplinary"],
    scope: "MTO calculation for major disciplines — Das Island Terminal Facilities.",
    manHours: "1,000",
    deliverables: "10",
  },
  {
    slug: "5b5c-onshore-wellhead",
    title: "5b5c Onshore Wellhead - Mini Pad & BUHASA",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    year: "2025",
    disciplines: ["Telecommunication"],
    scope: "Telecom detail engineering for 4 mini pads & BUHASA field.",
    manHours: "500",
    deliverables: "20",
  },
  {
    slug: "chemical-injection-skid",
    title: "Chemical Injection Skid",
    client: "Petrocon Engineers",
    endUser: "ADNOC Onshore",
    year: "2025",
    disciplines: ["Process", "Mechanical", "Electrical", "Instrumentation"],
    scope: "Detail engineering of 109 chemical injection skids for BAB and BUHASA fields.",
    manHours: "9,000",
    deliverables: "450",
  },
  {
    slug: "southeast-onshore-wellhead",
    title: "Southeast Onshore Wellhead",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    year: "2025 (Ongoing)",
    disciplines: ["Electrical", "Instrumentation", "Telecommunication"],
    scope: "3D modelling and detail engineering for 117 onshore off-pad wells.",
    manHours: "20,354",
    deliverables: "672",
  },
  {
    slug: "pressure-flow-regulation-skid",
    title: "Pressure & Flow Regulation Skid",
    client: "Tekzone",
    endUser: "EMARAT",
    year: "2025",
    disciplines: ["Mechanical", "Electrical", "Instrumentation", "Structural"],
    scope: "Skid detail engineering and fabrication support for EMARAT.",
    manHours: "5,000",
    deliverables: "60",
  },
  {
    slug: "as-built-spi-sppid",
    title: "As-Built Engineering - SPI & SPPID",
    client: "Dexterity Design Services",
    endUser: "ADNOC",
    year: "Ongoing",
    disciplines: ["Instrumentation"],
    scope: "SmartPlant document updates and engineering administration support.",
    deliverables: "2,000+ ongoing",
  },
  {
    slug: "ruwais-lifting-arrangements",
    title: "Train-3 Reflux Pumps & Motors - Ruwais",
    client: "Avenir",
    endUser: "ADNOC",
    year: "2026",
    disciplines: ["Structural", "Piping", "Electrical"],
    scope: "Detailed engineering for lifting arrangements at ADNOC Ruwais, covering structural, piping, and electrical deliverables.",
    manHours: "1,200+",
    deliverables: "12",
  },
  {
    slug: "1098-gas-heater",
    title: "1098 Gas Heater Project",
    client: "Novargi Engineering",
    endUser: "Jindal Steel & Power",
    year: "2026",
    disciplines: ["Electrical", "3D Modelling"],
    scope: "Electrical 3D modelling, equipment layout, cable tray routing, lighting, procurement review and BOQ support.",
    manHours: "600+",
    deliverables: "44+",
  },
  {
    slug: "asr-gas-well-tie-ins",
    title: "ASR Gas Well Tie-ins",
    client: "Total Vision",
    endUser: "ADNOC Onshore",
    year: "2024",
    disciplines: ["Pipeline"],
    scope: "Pipeline deliverables for package 4.",
    manHours: "400",
  },
  {
    slug: "emarat-natural-gas-pipeline",
    title: "EPC 6km Natural Gas Pipeline",
    client: "Tekzone",
    endUser: "EMARAT",
    year: "2024-2026",
    disciplines: ["Pipeline", "Multidisciplinary"],
    scope: "Complete project deliverables from concept to commissioning.",
    manHours: "12,500",
  },
  {
    slug: "tanjung-miring",
    title: "Tanjung Miring Gas Station",
    client: "PT. Pertamina EP Zona 4",
    endUser: "Pertamina",
    year: "2025-2026",
    disciplines: ["Mechanical", "Piping"],
    scope: "DED mechanical and piping documentation.",
    manHours: "7,120",
  },
  {
    slug: "bangko-menggala",
    title: "Bangko Phase 1 & Menggala South Facility Upgrade",
    client: "PT. Pertamina Hulu Rokan",
    endUser: "Pertamina",
    year: "2025-2026",
    disciplines: ["Mechanical", "Piping"],
    scope: "DED mechanical and piping documentation for facility upgrade.",
    manHours: "6,440",
  },
  {
    slug: "amine-treated-gas-cooler",
    title: "Amine Treated Gas Cooler — Piping Stress Analysis",
    client: "PT. Pertamina Hulu Energi",
    endUser: "Pertamina",
    year: "2025-2026",
    disciplines: ["Piping"],
    scope: "Piping stress analysis calculation for Amine Treated Gas Cooler Package.",
    manHours: "1,540",
  },
  {
    slug: "lumut-balai-geothermal",
    title: "Lumut Balai II Geothermal Power Plant",
    client: "PT. Pertamina Geothermal Energy",
    endUser: "Pertamina",
    year: "2024-2025",
    disciplines: ["Pipeline", "Piping"],
    scope: "Design and calculation for pipeline and piping deliverables.",
    manHours: "3,460",
  },
  {
    slug: "pertagas-pipeline-inspection",
    title: "PERTAGAS Pipeline Inspection",
    client: "PT. Pertamina Gas / Direktorat Jenderal Migas",
    endUser: "Pertamina",
    year: "2023-2024",
    disciplines: ["Pipeline"],
    scope: "Feasibility analysis using pipeline stress analysis method based on corrosion data.",
    manHours: "4,200",
  },
  {
    slug: "feed-ded-gas-distribution",
    title: "FEED & DED — Jarigan Distribusi Pipa Gas",
    client: "PT. Pertamina Gas",
    endUser: "Pertamina",
    year: "2023-2024",
    disciplines: ["Pipeline", "Multidisciplinary"],
    scope: "Pustek E&T producing detail engineering design for gas distribution pipeline.",
    manHours: "3,910",
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

export const courses = [
  {
    title: "Piping Engineering & Design",
    description: "Comprehensive piping design, stress analysis, material selection and layout practices used in modern EPC projects.",
    icon: "valve",
  },
  {
    title: "Process Engineering & Design",
    description: "P&ID development, process simulation, control philosophy and safety engineering aligned with international standards.",
    icon: "science",
  },
  {
    title: "Mechanical Engineering & Design",
    description: "Static equipment design, rotating machinery, tank sizing and fabrication drawing preparation for industrial plants.",
    icon: "precision_manufacturing",
  },
  {
    title: "Instrumentation Engineering & Design",
    description: "Instrument specification, loop diagrams, hook-up drawings, SPI and control system engineering from field to DCS.",
    icon: "sensors",
  },
  {
    title: "Electrical Engineering & Design",
    description: "Power studies, SLD, cable sizing, lighting design, hazardous area classification and installation engineering.",
    icon: "bolt",
  },
  {
    title: "PDMS, SP3D, E3D & AutoCAD",
    description: "Hands-on training on industry-standard 3D modelling and design tools used across all engineering disciplines.",
    icon: "view_in_ar",
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
