"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import DisciplineModal from "@/components/DisciplineModal";
import { type Discipline } from "@/components/PrecisionDisciplines";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Server,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════════
// DATA: 11 Core Engineering Disciplines (Curated & Customer-Focused)
// ══════════════════════════════════════════════════════════════════════════════
interface ExpertiseDiscipline {
  id: string;
  slug: string;
  number: string;
  code: string;
  title: string;
  icon: string;
  category: "Piping & Mechanical" | "Electrical & Instrumentation" | "Civil & Structural" | "Process & Flow Assurance";
  badge: string;
  kpi: string;
  summary: string;
  image: string;
  leadSoftware: string[];
  standards: string[];
  deliverables: string[];
  detailedSpecs: {
    tolerances: string;
    materials: string;
    standards: string;
    efficiency: string;
    deliverables: string[];
  };
  metrics: { label: string; value: string; color?: string }[];
}

const allDisciplines: ExpertiseDiscipline[] = [
  {
    id: "piping-mechanical",
    slug: "piping-mechanical",
    number: "01",
    code: "01",
    title: "Piping & Mechanical Engineering",
    icon: "precision_manufacturing",
    category: "Piping & Mechanical",
    badge: "CAESAR II · SP3D / E3D",
    kpi: "ZERO CLASH 3D ROUTING",
    summary:
      "Comprehensive piping layout engineering, 3D equipment modeling, CAESAR II high-temperature stress analysis, and isometric generation.",
    image: "/media/saur-fabrication-projects.png",
    leadSoftware: ["Smart 3D (S3D)", "AVEVA E3D", "CAESAR II", "PVElite", "TANK"],
    standards: ["ASME B31.3", "ASME B31.1", "API 650", "ASME Sec VIII", "NACE MR0175"],
    deliverables: [
      "Piping General Arrangement Drawings (GAD) & Plot Plans",
      "Piping Isometrics with Spool Splits & Cut Lists",
      "CAESAR II Pipe Stress & Flexibility Analysis Reports",
      "Static Equipment GA & Fabrication Shop Drawings",
      "Special Pipe Support Drawings (SPS) & Schedules",
      "Material Take-Off (MTO) & Bill of Materials (BOM)",
    ],
    detailedSpecs: {
      tolerances: "CAESAR II, PVElite, AutoCAD Plant 3D, TANK",
      materials: "Carbon Steel, Stainless Steel, Duplex, Super Duplex, Inconel",
      standards: "ASME B31.3 / B31.1 / B31.8, API 650 / 620, ASME Sec VIII",
      efficiency: "100% Clash-Free 3D Routing & ISO 9001 QA Check",
      deliverables: [
        "Piping General Arrangement Drawings (GAD) & Plot Plans",
        "Piping Isometrics & Vessel Trims with Cut Lists",
        "CAESAR II Pipe Stress & Flexibility Analysis Reports",
        "Static Equipment GA & Fabrication Drawings",
        "Material Take-Off (MTO) & Support Schedule",
      ],
    },
    metrics: [
      { label: "STANDARDS", value: "ASME / API", color: "text-[#FF8A00]" },
      { label: "DELIVERY", value: "IFC / As-Built", color: "text-slate-900" },
    ],
  },
  {
    id: "electrical-engineering",
    slug: "electrical",
    number: "02",
    code: "02",
    title: "Electrical Engineering",
    icon: "electric_bolt",
    category: "Electrical & Instrumentation",
    badge: "ETAP · Smart Electrical",
    kpi: "LOAD FLOW & ARC FLASH",
    summary:
      "High/low voltage substation layouts, ETAP power system studies, Single Line Diagrams (SLD), and industrial lighting calculations.",
    image: "/images/electrical.png",
    leadSoftware: ["ETAP", "Smart Electrical (SEL)", "AVEVA Electrical", "Dialux"],
    standards: ["IEC 60364", "IEC 61850", "IEEE 1584", "NFPA 70 (NEC)"],
    deliverables: [
      "Single Line Diagrams (SLD) & Schematics",
      "ETAP Power System Studies & Sizing Calculations",
      "Substation Equipment Layouts & Cable Tray Routing",
      "Industrial Lighting & Lux Level Reports (Dialux)",
      "Earthing & Lightning Protection Layouts",
    ],
    detailedSpecs: {
      tolerances: "ETAP, Dialux, Smart Electrical (SEL), AutoCAD",
      materials: "HV/MV/LV Switchgear, Transformers, Cables, Cable Trays",
      standards: "IEC 60364, IEEE, NFPA 70 (NEC), IS Standards",
      efficiency: "Optimized Load Flow & Short-Circuit Analysis",
      deliverables: [
        "Single Line Diagrams (SLD) & Schematics",
        "ETAP Power System Studies & Sizing Calculations",
        "Electrical Equipment Layouts & Substation Design",
        "Cable Tray Routing & Sizing Schedules",
        "Lighting Calculation Reports & Dialux Layouts",
      ],
    },
    metrics: [
      { label: "ANALYSIS", value: "ETAP / SEL", color: "text-[#FF8A00]" },
      { label: "COMPLIANCE", value: "IEC / IEEE", color: "text-slate-900" },
    ],
  },
  {
    id: "instrumentation-control",
    slug: "instrumentation",
    number: "03",
    code: "03",
    title: "Instrumentation & Control",
    icon: "sensors",
    category: "Electrical & Instrumentation",
    badge: "SmartPlant SPI · InstruCalc",
    kpi: "SIL 2/3 SAFETY LOOPS",
    summary:
      "Intelligent instrument databases in SmartPlant SPI, loop diagrams, hook-up drawings, cable schedules, and control architectures.",
    image: "/media/page-services-hero.png",
    leadSoftware: ["SmartPlant SPI", "InstruCalc", "AutoCAD"],
    standards: ["ISA 5.1", "IEC 61508 / 61511 (SIL)", "API RP 551"],
    deliverables: [
      "SmartPlant Instrumentation (SPI / INtools) Setup",
      "Instrument Datasheets & Sizing Calculations",
      "Instrument Loop Diagrams & Interconnection Wiring",
      "Junction Box (JB) Schedules & Cable Routing",
      "Instrument Hook-Up & Installation Details",
    ],
    detailedSpecs: {
      tolerances: "Smart Instrumentation (SPI), InstruCalc, AutoCAD",
      materials: "Transmitters, Control Valves, DCS/PLC Racks, F&G Systems",
      standards: "ISA 5.1, IEC 61508 / 61511 (SIL), API RP 551",
      efficiency: "Complete SPI Database Automation & I/O Mapping",
      deliverables: [
        "SmartPlant Instrumentation (SPI / INtools) Setup",
        "Instrument Datasheets & Sizing Calculations",
        "Loop Diagrams & Interconnection Wiring Schedules",
        "Junction Box (JB) Schedules & Cable Routing",
        "Instrument Hook-Up & Installation Details",
      ],
    },
    metrics: [
      { label: "DATABASE", value: "SPI / INtools", color: "text-[#FF8A00]" },
      { label: "SAFETY", value: "SIL 2 / SIL 3", color: "text-slate-900" },
    ],
  },
  {
    id: "process-engineering",
    slug: "process",
    number: "04",
    code: "04",
    title: "Process Engineering & Flow",
    icon: "science",
    category: "Process & Flow Assurance",
    badge: "SmartPID · Aspen HYSYS",
    kpi: "HEAT & MASS BALANCE",
    summary:
      "Process Flow Diagrams (PFD), Piping & Instrumentation Diagrams (P&ID), control philosophies, cause & effect, and equipment sizing.",
    image: "/images/process.png",
    leadSoftware: ["SmartPID", "AVEVA PID", "Aspen HYSYS"],
    standards: ["API 520 / 521", "ISO 10418", "Shell DEP"],
    deliverables: [
      "P&ID and PFD Development & Updating",
      "Operating & Control Philosophy Documents",
      "Cause & Effect Matrix (C&E) and Alarm/Trip Lists",
      "Pump NPSH, Line Sizing & Relief Valve Calculations",
      "Storage Tank & Separator Sizing Calculations",
    ],
    detailedSpecs: {
      tolerances: "SmartPID, AVEVA PID, Aspen HYSYS, AutoCAD",
      materials: "Process Vessels, Pumps, Compressors, Flare Networks",
      standards: "API 520 / 521, ISO 10418, Shell DEP",
      efficiency: "Rigorous Heat & Mass Balance Verification",
      deliverables: [
        "P&ID and PFD Development & Updating",
        "Operating & Control Philosophy Documents",
        "Cause & Effect Matrix (C&E) and Alarm/Trip Lists",
        "Pump NPSH, Line Sizing & Relief Valve Calculations",
        "Storage Tank & Separator Sizing Calculations",
      ],
    },
    metrics: [
      { label: "P&ID VERIFIED", value: "100%", color: "text-[#FF8A00]" },
      { label: "SIMULATION", value: "HYSYS", color: "text-slate-900" },
    ],
  },
  {
    id: "plant-3d-modeling",
    slug: "3d-modelling",
    number: "05",
    code: "05",
    title: "3D Plant Modeling & BIM",
    icon: "view_in_ar",
    category: "Piping & Mechanical",
    badge: "Smart 3D · AVEVA E3D",
    kpi: "MULTI-DISCIPLINE BIM",
    summary:
      "Data-centric multi-discipline 3D modeling in Smart 3D and AVEVA E3D/PDMS, Navisworks clash checks, and automated drawing extraction.",
    image: "/media/saur-engineering-coordination.png",
    leadSoftware: ["Smart 3D (S3D)", "AVEVA E3D", "PDMS", "Navisworks"],
    standards: ["ISO 19650 (BIM)", "Client CAD Specifications"],
    deliverables: [
      "Comprehensive 3D Plant Model in S3D / E3D",
      "Multi-Discipline Clash Detection & Resolution Reports",
      "Automated Extraction of Isometrics & GADs",
      "Laser Scan Point Cloud Integration (Brownfield)",
      "As-Built 3D Model Reconciliation",
    ],
    detailedSpecs: {
      tolerances: "Intergraph Smart 3D (S3D), AVEVA E3D, PDMS, Navisworks",
      materials: "Full Multi-Discipline Plant Assets (Piping, Civ/Struct, E&I)",
      standards: "ISO 19650 (BIM), Client CAD Specifications",
      efficiency: "Zero-Clash Model Integration Across Disciplines",
      deliverables: [
        "Comprehensive 3D Plant Model in S3D / E3D",
        "Multi-Discipline Clash Detection & Resolution Reports",
        "Automated Extraction of Isometrics & GADs",
        "BIM / Yard Fabrication 3D Verification Models",
        "As-Built 3D Model Laser Scan Reconciliation",
      ],
    },
    metrics: [
      { label: "SUITES", value: "S3D / E3D", color: "text-[#FF8A00]" },
      { label: "TOLERANCE", value: "Zero Clash", color: "text-slate-900" },
    ],
  },
  {
    id: "civil-structural",
    slug: "civil-structural",
    number: "06",
    code: "06",
    title: "Civil & Structural Engineering",
    icon: "apartment",
    category: "Civil & Structural",
    badge: "STAAD.Pro · Tekla",
    kpi: "BLAST & SEISMIC RIGOR",
    summary:
      "Structural steel framing, equipment foundations, pipe racks, heavy lifting rigging studies, and blast-resistant building layouts.",
    image: "/media/page-services-hero.png",
    leadSoftware: ["STAAD.Pro", "Tekla Structures", "AutoCAD"],
    standards: ["AISC 360", "ACI 318", "ASCE 7", "IS 456 / IS 800"],
    deliverables: [
      "Equipment & Dynamic Compressor Foundation Design",
      "Pipe Rack & Technological Structure Calculations (STAAD.Pro)",
      "Rigging & Heavy Lifting Arrangement Studies",
      "Civil Architectural & Drainage Layouts",
      "Bar Bending Schedules (BBS) & Structural BOQ",
    ],
    detailedSpecs: {
      tolerances: "STAAD.Pro, Tekla Structures, AutoCAD, Revit",
      materials: "Structural Steel, Reinforced Concrete, Anchor Bolts",
      standards: "AISC 360, ACI 318, ASCE 7, IS 456 / IS 800",
      efficiency: "Safe Load Bearing & Optimized Steel Weight",
      deliverables: [
        "Equipment & Dynamic Compressor Foundation Design",
        "Pipe Rack & Technological Structure Calculations (STAAD.Pro)",
        "Rigging & Heavy Lifting Arrangement Studies",
        "Civil Architectural & Drainage Layouts",
        "Bar Bending Schedules (BBS) & Structural BOQ",
      ],
    },
    metrics: [
      { label: "FEA TOOLS", value: "STAAD.Pro", color: "text-[#FF8A00]" },
      { label: "DETAILING", value: "Tekla Steel", color: "text-slate-900" },
    ],
  },
  {
    id: "telecommunication",
    slug: "telecommunication",
    number: "07",
    code: "07",
    title: "Telecommunication Engineering",
    icon: "cell_tower",
    category: "Electrical & Instrumentation",
    badge: "PAGA · CCTV · Fiber",
    kpi: "100% PLANT COVERAGE",
    summary:
      "Industrial telecommunications design, CCTV surveillance coverage, Public Address & General Alarm (PAGA), and fiber optic routing.",
    image: "/images/telecom.png",
    leadSoftware: ["Specialist Telecom Tools", "AutoCAD", "Smart 3D"],
    standards: ["ITU-T", "IEEE 802.3", "IEC Standards"],
    deliverables: [
      "Telecom Overall Block Diagrams & Architecture",
      "PAGA System Block Diagrams & Acoustic Coverage",
      "CCTV Field Coverage & Camera Layouts",
      "Fiber Optic & Telecom Cable Schedules",
      "Telecom Equipment Lists & Bill of Quantities (BOQ)",
    ],
    detailedSpecs: {
      tolerances: "AutoCAD, SmartPlant 3D, Specialist Telecom Tools",
      materials: "Fiber Optic Cables, CCTV Cameras, PAGA Speakers, Racks",
      standards: "ITU-T, IEEE 802.3, IEC Standards",
      efficiency: "100% Plant Coverage & Emergency Broadcast Reliability",
      deliverables: [
        "Telecom Overall Block Diagrams & Architecture",
        "PAGA System Block Diagrams & Acoustic Coverage",
        "CCTV Layouts & Field Coverage Maps",
        "Fiber Optic & Telecom Cable Schedules",
        "Telecom Equipment Lists & Bill of Quantities (BOQ)",
      ],
    },
    metrics: [
      { label: "COVERAGE", value: "100% Site Wide", color: "text-[#FF8A00]" },
      { label: "NETWORKS", value: "Fiber / PAGA", color: "text-slate-900" },
    ],
  },
  {
    id: "pipeline-engineering",
    slug: "pipeline",
    number: "08",
    code: "08",
    title: "Pipeline & Alignment Engineering",
    icon: "route",
    category: "Piping & Mechanical",
    badge: "CAESAR II · GIS Route",
    kpi: "CROSS-COUNTRY DED",
    summary:
      "Cross-country pipeline alignment sheets, crossing drawings (HDD/thrust boring), stress analysis, and route corridor optimization.",
    image: "/images/process.png",
    leadSoftware: ["CAESAR II", "GIS Tools", "AutoCAD"],
    standards: ["ASME B31.4 / B31.8", "API 1104", "OISD Standards"],
    deliverables: [
      "Pipeline Route Alignment Sheets & Corridor Maps",
      "Road, Railway & River Crossing Detail Drawings",
      "Pipeline Stress Analysis & Wall Thickness Calculations",
      "Block Valve Station & Pig Trap Engineering",
      "Cathodic Protection (CP) Layouts & BOQ",
    ],
    detailedSpecs: {
      tolerances: "AutoCAD, CAESAR II, Google Earth Pro, GIS Tools",
      materials: "API 5L Line Pipe (Grade B to X70), 3LPE Coating",
      standards: "ASME B31.4 / B31.8, API 1104, OISD Standards",
      efficiency: "Optimized Route Corridor & Stress Compliance",
      deliverables: [
        "Pipeline Route Alignment Sheets & Corridor Maps",
        "Road, Railway & River Crossing Detail Drawings",
        "Pipeline Stress Analysis & Wall Thickness Calculations",
      ],
    },
    metrics: [
      { label: "CODES", value: "ASME B31.4/8", color: "text-[#FF8A00]" },
      { label: "CROSSINGS", value: "HDD / Bore", color: "text-slate-900" },
    ],
  },
  {
    id: "subsea-engineering",
    slug: "subsea",
    number: "09",
    code: "09",
    title: "Subsea & Marine Engineering",
    icon: "water",
    category: "Civil & Structural",
    badge: "DNV · Subsea Tiedowns",
    kpi: "OFFSHORE ASSETS",
    summary:
      "Offshore wellhead platforms, topside tie-in engineering, subsea clamp designs, and sea-fastening calculations.",
    image: "/media/page-company-hero.png",
    leadSoftware: ["STAAD.Pro", "SACS", "AutoCAD"],
    standards: ["DNV Standards", "API RP 2A", "ISO 19902"],
    deliverables: [
      "Offshore Platform Tie-In Engineering Packages",
      "Subsea Clamps & Riser Protector Details",
      "Topside Equipment Skid Calculations",
      "Marine Transportation & Sea-Fastening Analysis",
      "Offshore Constructability & Installation Plans",
    ],
    detailedSpecs: {
      tolerances: "STAAD.Pro, AutoCAD, Mathcad",
      materials: "High-Strength Structural Steel, Marine Coatings",
      standards: "DNV Standards, API RP 2A, ISO 19902",
      efficiency: "Offshore Marine Rigor & Certified Constructability",
      deliverables: [
        "Offshore Platform Tie-In Engineering Packages",
        "Subsea Clamps & Riser Protector Details",
        "Marine Transportation & Sea-Fastening Analysis",
      ],
    },
    metrics: [
      { label: "OFFSHORE", value: "DNV Compliant", color: "text-[#FF8A00]" },
      { label: "PLATFORMS", value: "Tie-In / Wellhead", color: "text-slate-900" },
    ],
  },
  {
    id: "flow-assurance",
    slug: "flow-assurance",
    number: "10",
    code: "10",
    title: "Flow Assurance & Thermal Hydraulics",
    icon: "cyclone",
    category: "Process & Flow Assurance",
    badge: "Hydraulics · Surge",
    kpi: "TRANSIENT HYDRAULICS",
    summary:
      "Steady-state and transient hydraulic analysis, surge pressure verification, insulation optimization, and slug catcher sizing.",
    image: "/images/process.png",
    leadSoftware: ["Specialist Hydraulic Solvers", "Aspen HYSYS"],
    standards: ["API RP 14E", "ASME B31.3", "Client Criteria"],
    deliverables: [
      "Steady-State Pressure Drop & Flow Profiles",
      "Water Hammer & Surge Analysis Calculation Reports",
      "Hydrate & Wax Deposition Mitigation Studies",
      "Thermal Insulation Thickness Calculations",
      "Slug Catcher Volume & Sizing Reports",
    ],
    detailedSpecs: {
      tolerances: "Aspen HYSYS, Hydraulic Tools, Mathcad",
      materials: "Multiphase Flow, Condensate, High-Pressure Gas",
      standards: "API RP 14E, ASME B31.3, Client Criteria",
      efficiency: "Elimination of Hydraulic Surges & Slugging Risks",
      deliverables: [
        "Steady-State Pressure Drop & Flow Profiles",
        "Water Hammer & Surge Analysis Reports",
        "Thermal Insulation Thickness Calculations",
      ],
    },
    metrics: [
      { label: "ANALYSIS", value: "Hydraulics", color: "text-[#FF8A00]" },
      { label: "RISK", value: "Zero Surge", color: "text-slate-900" },
    ],
  },
  {
    id: "yard-fabrication",
    slug: "yard-fabrication",
    number: "11",
    code: "11",
    title: "Yard Fabrication & Modular Skids",
    icon: "handyman",
    category: "Piping & Mechanical",
    badge: "Spoolgen · LOD 400",
    kpi: "SHOP-READY SPOOLS",
    summary:
      "Shop fabrication isometrics, modular skid detailing, pipe support fabrication shop drawings, and lifting rig designs.",
    image: "/images/mechanical.png",
    leadSoftware: ["Spoolgen", "Tekla Structures", "AutoCAD"],
    standards: ["ASME Sec IX", "AWS D1.1", "Fabrication Yard Specs"],
    deliverables: [
      "Fabrication Shop Isometrics with Cut-Length Spool Splits",
      "Chemical & Utility Injection Skid Shop Drawings",
      "Pipe Support Fabrication Details & Weld Schedules",
      "Lifting Lug Calculations & Spreader Beam Details",
      "Fabrication As-Built Redline Integration",
    ],
    detailedSpecs: {
      tolerances: "Spoolgen, Tekla, AutoCAD",
      materials: "Carbon Steel, Duplex, Structural Steel, Skids",
      standards: "ASME Sec IX, AWS D1.1, Fabrication Specs",
      efficiency: "LOD 400 Shop-Ready Drawings for Zero Site Rework",
      deliverables: [
        "Fabrication Shop Isometrics with Cut-Length Spool Splits",
        "Modular Skid Structural Shop Drawings",
        "Pipe Support Fabrication Details & Weld Schedules",
      ],
    },
    metrics: [
      { label: "LOD LEVEL", value: "LOD 400", color: "text-[#FF8A00]" },
      { label: "FABRICATION", value: "Shop Ready", color: "text-slate-900" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// DATA: Client-Centric Software Ecosystem (Curated 4 Strategic Suites)
// ══════════════════════════════════════════════════════════════════════════════
const softwareEcosystem = [
  {
    title: "3D Plant Design & BIM",
    icon: "view_in_ar",
    suites: ["Smart 3D (S3D)", "AVEVA E3D / PDMS", "Autodesk Plant 3D", "Bentley OpenPlant"],
    focus:
      "Data-centric multi-discipline plant models, point cloud laser scanning, automated drawing extraction, and weekly clash reviews.",
  },
  {
    title: "Piping Stress & Vessels",
    icon: "precision_manufacturing",
    suites: ["CAESAR II", "PVElite", "TANK (API 650)", "Mathcad"],
    focus:
      "Piping flexibility & dynamic stress analysis (ASME B31.3/B31.1), pressure vessel thickness sizing (Sec VIII), and atmospheric storage tanks.",
  },
  {
    title: "Electrical & Instrumentation",
    icon: "sensors",
    suites: ["SmartPlant SPI", "Smart Electrical (SEL)", "ETAP", "Dialux", "InstruCalc"],
    focus:
      "Intelligent tagged instrument databases, loop diagrams, power system load flow, arc flash calculations, and industrial lux modeling.",
  },
  {
    title: "Civil, Structural & Detailing",
    icon: "domain",
    suites: ["STAAD.Pro", "Tekla Structures", "AutoCAD", "Revit"],
    focus:
      "3D structural steel FEA, dynamic equipment foundation calculations, technological pipe rack analysis, and LOD 400 fabrication shop spools.",
  },
];

const governingStandards = [
  "ASME B31.3 / B31.1",
  "API 650 / 620",
  "ASME Sec VIII",
  "API 520 / 521",
  "IEC 61850 / 60364",
  "IEEE 1584",
  "ISA 5.1 / SIL",
  "AISC 360 / ACI 318",
  "ISO 19650",
  "Saudi Aramco CRPO",
  "Shell DEP",
];

export default function ExpertisePage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All Disciplines");

  const categories = [
    "All Disciplines",
    "Piping & Mechanical",
    "Electrical & Instrumentation",
    "Civil & Structural",
    "Process & Flow Assurance",
  ];

  const filteredDisciplines = allDisciplines.filter((item) => {
    if (activeCategory === "All Disciplines") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#FF8A00] selection:text-white flex flex-col justify-between">
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full">
        {/* ══════════════════════════════════════════════════════════════════════
           1. HERO: Clean Corporate Navy Split Hero
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-8 sm:pb-12 bg-[#0b233a]">
          {/* Photographic Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/expertise-design-office.png')",
              backgroundPosition: "center right",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0b233a] via-[#0b233a]/85 sm:via-[#0b233a]/65 to-black/50 sm:to-black/35" />

            {/* Subtle Brand Watermark on Right */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white/50 text-[11px] font-bold uppercase tracking-widest leading-relaxed pointer-events-none">
              IDEAS<br />
              ENGINEERED<br />
              FOR A MORE<br />
              RELIABLE TOMORROW
            </div>
          </div>

          {/* Left Navy Content Column */}
          <div className="relative z-10 w-full lg:w-[68%] xl:w-[62%] bg-[#0b233a]/95 sm:bg-[#0b233a] flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-16 py-10 sm:py-12 lg:py-16 [clip-path:none] lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
            <div className="max-w-2xl">
              {/* Category Eyebrow with Orange Accent Dash */}
              <div className="flex items-center gap-2.5 text-[#FF8A00] font-bold text-xs uppercase tracking-wider mb-4">
                <span>MULTIDISCIPLINARY CAPABILITIES</span>
                <span className="w-7 h-[2px] bg-[#FF8A00]" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-5">
                11 engineering disciplines. <br />
                <span className="text-[#FF8A00]">One integrated delivery.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed font-normal mb-8 max-w-xl">
                Every discipline is structured around clear, audited engineering deliverables — ensuring constructability, regulatory compliance, and seamless inter-discipline coordination.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="w-full sm:w-auto justify-center bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] text-[#0b233a] px-6 sm:px-7 py-3.5 rounded-md text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Consult an Engineering Lead</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#disciplines"
                  className="w-full sm:w-auto justify-center border border-white/30 hover:bg-white/10 active:scale-[0.98] text-white px-6 sm:px-7 py-3.5 rounded-md text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Explore Disciplines</span>
                </a>
              </div>

              {/* Metrics Strip */}
              <div className="pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-white">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FF8A00]">11</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 mt-0.5">Core Disciplines</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 mt-0.5">IDC Zero Clash</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FF8A00]">20+</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 mt-0.5">CAD/CAE Platforms</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">ISO 9001</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 mt-0.5">QA Certified</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           2. TRUST CREDENTIALS STRIP
           ══════════════════════════════════════════════════════════════════════ */}
        <TrustCredentialsStrip />

        {/* ══════════════════════════════════════════════════════════════════════
           3. 11 DISCIPLINE DIRECTORY: Clean, Customer-Focused Cards
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200" id="disciplines">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">

            {/* Header & Filter Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
              <div>
                <div className="flex items-center gap-2 text-[#FF8A00] font-bold text-xs uppercase tracking-wider mb-2">
                  <span>DISCIPLINE DIRECTORY</span>
                  <span className="w-6 h-[2px] bg-[#FF8A00]" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0b233a] tracking-tight">
                  Comprehensive Engineering Expertise
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 font-normal leading-relaxed">
                  Standard technical deliverables generated, audited, and issued for construction across all 11 disciplines.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-md text-xs font-bold transition-all border cursor-pointer select-none whitespace-nowrap min-h-[38px]",
                        isActive
                          ? "bg-[#FF8A00] text-white border-[#FF8A00] shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      )}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 11 Discipline Cards Grid: Clean Cinematic Photographic Cards with Floating Badges & Bottom Navy Drawer */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredDisciplines.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedDiscipline({ ...item, description: item.summary } as unknown as Discipline)}
                  className="group relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#07131e] shadow-lg hover:shadow-2xl hover:border-[#FF8A00]/60 transition-all duration-500 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-4 sm:p-5 cursor-pointer select-none active:scale-[0.99]"
                >
                  {/* Full-bleed Background Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.75] group-hover:brightness-[0.65]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a] via-[#0b233a]/40 to-black/40" />
                  </div>

                  {/* Top Floating Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    {/* Top Left Badge: Clean Icon + Discipline Number (No "Disc" abbreviation) */}
                    <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-white/20 text-xs font-bold text-[#0b233a] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#FF8A00]">
                        {item.icon}
                      </span>
                      <span>Discipline {item.number}</span>
                    </div>

                    {/* Top Right KPI Badge */}
                    <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-[#FF8A00] border border-white/15 uppercase tracking-wider">
                      {item.kpi}
                    </div>
                  </div>

                  {/* Bottom Floating Navy Drawer */}
                  <div className="relative z-10 bg-[#0b233a]/95 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/15 shadow-xl transition-all duration-500 ease-out group-hover:border-[#FF8A00]/40 mt-auto">
                    {/* Always-Visible Header in Rest State */}
                    <div>
                      <span className="text-[10px] font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                        DISCIPLINE {item.number} · {item.category.toUpperCase()}
                      </span>

                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                          {item.title}
                        </h3>

                        {/* Orange Arrow Button */}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FF8A00] group-hover:bg-[#E67C00] flex items-center justify-center text-[#0b233a] shrink-0 group-hover:scale-105 transition-all shadow-md">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details Area (Visible on Hover & Tap Drilldown) */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div className="overflow-hidden">
                        <div className="pt-3 mt-3 border-t border-white/10 space-y-3">
                          <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">
                            {item.summary}
                          </p>

                          {/* Clean Deliverables with Orange Checkmark */}
                          <div className="space-y-1.5">
                            {item.deliverables.slice(0, 3).map((deliv, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-start gap-2 text-xs text-slate-200 font-medium"
                              >
                                <span className="text-[#FF8A00] text-xs mt-0.5 font-bold">✓</span>
                                <span className="line-clamp-1">{deliv}</span>
                              </div>
                            ))}
                          </div>

                          {/* Software Chips & Full Scope Link */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                            <div className="flex flex-wrap gap-1.5">
                              {item.leadSoftware.slice(0, 2).map((tool, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-semibold text-slate-300 border border-white/10"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>

                            <span className="text-xs font-bold text-[#FF8A00] group-hover:text-[#FFA033] flex items-center gap-1 shrink-0">
                              <span>Full Scope</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. INTER-DISCIPLINE COORDINATION (IDC) & QUALITY ASSURANCE
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-[#FF8A00] font-bold text-xs uppercase tracking-wider mb-2">
                  <span>INTEGRATED DELIVERY GOVERNANCE</span>
                  <span className="w-6 h-[2px] bg-[#FF8A00]" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0b233a] tracking-tight">
                  Inter-Discipline Coordination (IDC) &amp; QA
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 font-normal leading-relaxed">
                  How our 11 disciplines collaborate concurrently to eliminate dimensional clashes, avoid site rework, and guarantee constructability.
                </p>
              </div>
            </div>

            {/* 4 Clean Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  stage: "01",
                  title: "Cross-Discipline Input & DBM",
                  desc: "Process P&IDs, electrical load lists, and site geotechnical criteria are synchronized across all Discipline Leads before 3D kickoff.",
                },
                {
                  stage: "02",
                  title: "Concurrent 3D CAD/CAE Modeling",
                  desc: "Live multi-discipline modeling in Smart 3D and AVEVA E3D with real-time CAESAR II pipe stress and STAAD.Pro structural verification.",
                },
                {
                  stage: "03",
                  title: "Navisworks Clash Resolution",
                  desc: "Weekly automated clash reports combined with mandatory peer review sign-offs by Senior Discipline Leads and QA/QC Directors.",
                },
                {
                  stage: "04",
                  title: "Clash-Free IFC Handover",
                  desc: "Issuance of clash-free Approved for Construction packages, fabrication spools, and active onsite Technical Query management.",
                },
              ].map((item) => (
                <div
                  key={item.stage}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 hover:border-slate-300 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-[#FF8A00] bg-[#FF8A00]/10 px-2.5 py-1 rounded">
                        Stage {item.stage}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0b233a] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           5. SPECIALIZED SOFTWARE & TECHNICAL ECOSYSTEM (Customer-Focused 4 Suites)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200" id="software-ecosystem">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-[#FF8A00] font-bold text-xs uppercase tracking-wider mb-2">
                  <span>CLIENT ENVIRONMENT COMPATIBILITY</span>
                  <span className="w-6 h-[2px] bg-[#FF8A00]" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0b233a] tracking-tight">
                  Specialized Software &amp; Engineering Tools
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 font-normal leading-relaxed">
                  Enterprise-licensed CAD, CAE, and analytical platforms deployed across our Mumbai HQ and Chennai engineering hub.
                </p>
              </div>

              {/* Verified Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-700 shadow-xs self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00]" />
                <span className="font-bold text-[#0b233a]">Enterprise Licensed &amp; Audited</span>
              </div>
            </div>

            {/* 4 Clean Balanced Ecosystem Cards (Replaces the 28-row clutter) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-8">
              {softwareEcosystem.map((suite, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-md bg-[#0b233a] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-base">{suite.icon}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#0b233a] leading-tight">
                        {suite.title}
                      </h3>
                    </div>

                    {/* Suite Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {suite.suites.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Focus Description */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {suite.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3 Customer Value Assurances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-md bg-orange-50 border border-orange-200 text-[#FF8A00] flex items-center justify-center shrink-0">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0b233a] mb-1">
                    Direct Server &amp; Citrix Integration
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Seamless remote or dedicated execution directly inside your central database environments via encrypted VPN.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-md bg-orange-50 border border-orange-200 text-[#FF8A00] flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0b233a] mb-1">
                    100% Native Model Delivery
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Deliverables authored natively in designated software suites without conversion data loss or geometric degradation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-md bg-orange-50 border border-orange-200 text-[#FF8A00] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0b233a] mb-1">
                    Verified License Compliance
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    100% genuine enterprise licenses across all workstations, eliminating compliance, IP, and audit risks for operators.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           6. GOVERNING INTERNATIONAL STANDARDS (Clean Trust Strip)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-10 sm:py-12 bg-white border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs text-[#FF8A00] font-bold uppercase tracking-wider block mb-1">
                COMPLIANCE BENCHMARKS
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0b233a]">
                Governing International Standards
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {governingStandards.map((std, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#FF8A00] transition-colors"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           7. ACTION CTA BANNER (Standard Corporate Deep Navy)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#0b233a] py-12 sm:py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            <div className="flex items-center gap-2.5 text-[#FF8A00] font-bold text-xs uppercase tracking-wider mb-4">
              <span>LET&apos;S DISCUSS YOUR NEXT PROJECT</span>
              <span className="w-8 h-[2px] bg-[#FF8A00]" />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Need multidisciplinary engineering execution?
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                  Connect with our Discipline Leads in Mumbai and Chennai to discuss scope, standards, and delivery schedules.
                </p>

                <button
                  onClick={() => setConsultationOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] text-[#0b233a] font-bold px-6 py-3.5 rounded-md text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer shrink-0"
                >
                  <span>REQUEST CONSULTATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Standard Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectDiscipline={(d) => setSelectedDiscipline(d)}
        onSelectWhitepaper={() => {}}
      />
      <DisciplineModal
        discipline={selectedDiscipline}
        onClose={() => setSelectedDiscipline(null)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />
    </div>
  );
}
