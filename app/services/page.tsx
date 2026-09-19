"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import DisciplineModal from "@/components/DisciplineModal";
import PrecisionDisciplines, { type Discipline } from "@/components/PrecisionDisciplines";
import { cn } from "@/lib/utils";

// ══════════════════════════════════════════════════════════════════════════════
// DATA: Engagement Commercial Frameworks
// ══════════════════════════════════════════════════════════════════════════════
const engagementModels = [
  {
    id: "turnkey-ded",
    code: "MODEL 01",
    badge: "FIXED SCOPE / MILESTONE",
    title: "Turnkey DED & Package Delivery",
    subtitle: "Complete Engineering Packages with Full Deliverable Accountability",
    desc: "Fixed-price or milestone-based execution of FEED verification, detailed multidisciplinary engineering, 3D modeling, and IFC drawing packages under strict ISO 9001 QA/QC.",
    icon: "inventory_2",
    benefits: [
      "Guaranteed schedule & milestone delivery",
      "Two-tier QA check with verified MTOs & BOMs",
      "Zero-clash 3D model integration across all 11 disciplines",
      "Full technical comment (TQ) resolution through IFC release",
    ],
    idealFor: "EPC Contractors, Package Vendors & Equipment Fabricators",
  },
  {
    id: "dedicated-odc",
    code: "MODEL 02",
    badge: "OFFSHORE DELIVERY CENTER",
    title: "Dedicated Engineering Teams (ODC)",
    subtitle: "Scalable Multidisciplinary Engineering Cell for Ongoing Programs",
    desc: "Dedicated project leads, senior discipline engineers, stress analysts, and 3D modelers working as a direct seamless extension of your in-house engineering and project office.",
    icon: "hub",
    benefits: [
      "Custom team composition (Lead + Sr. Eng + Modelers)",
      "Direct integration with client CAD servers & SPI/E3D databases",
      "Flexible scaling up or down with project cycle demands",
      "Significant reduction in overhead and engineering unit cost",
    ],
    idealFor: "Global Engineering Consultancies, EPCs & Major Operators",
  },
  {
    id: "manpower-deputation",
    code: "MODEL 03",
    badge: "SITE & OFFICE DEPUTATION",
    title: "Specialized Manpower Deputation",
    subtitle: "Rapid Placement of Certified Technical Specialists",
    desc: "Deployment of certified discipline engineers, CAESAR II stress analysts, Smart 3D modelers, and QA/QC checkers directly at client design offices, fabrication yards, and project sites.",
    icon: "badge",
    benefits: [
      "Pre-vetted personnel with proven Oil & Gas / EPC track record",
      "Rapid mobilization across India, UAE, and Middle East",
      "Flexible short-term or long-term deployment agreements",
      "Full compliance, payroll, and technical governance support",
    ],
    idealFor: "Fabrication Yards, Shutdown Operations & Project Peaks",
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// DATA: 6 Primary Service Pillars (Authentic to Company Profile PDF)
// ══════════════════════════════════════════════════════════════════════════════
interface ServicePillar {
  id: string;
  number: string;
  code: string;
  title: string;
  category: string;
  tagline: string;
  overview: string;
  software: string;
  standards: string;
  image: string;
  deliverables: string[];
  capabilities: { title: string; desc: string }[];
  caseReference: string;
}

const servicePillars: ServicePillar[] = [
  {
    id: "feed-concept",
    number: "01",
    code: "SRV-FEED",
    title: "FEED & Conceptual Engineering",
    category: "Front-End Engineering",
    tagline: "Front-End Engineering Design & Feasibility Studies",
    overview:
      "We scale proven projects and investments to achieve sustainable growth and maximize long-term asset value. Our FEED studies establish project feasibility, define technical philosophies, optimize CAPEX/OPEX, and verify process and safety baselines before capital commitment.",
    software: "Aspen HYSYS · SmartPID · AVEVA PID · FlareNet · CAESAR II",
    standards: "API 520/521/2000 · ISO 10418 · ASME B31.3 · Shell DEP",
    image: "/images/process.png",
    deliverables: [
      "Design Basis Memorandums (DBM) & Process Philosophies",
      "Heat & Mass Balance (HMB) Calculations",
      "Process Flow Diagrams (PFD) & Utility Distribution Schematics",
      "Piping & Instrumentation Diagrams (P&ID) Development",
      "Equipment Process Datasheets & Pump NPSH Sizing",
      "Technical Bid Evaluation (TBE) for Long-Lead Items",
    ],
    capabilities: [
      {
        title: "Feasibility & Concept Selection",
        desc: "Comparative economic and technical evaluation of plant configurations, pipeline routing corridors, and equipment selection.",
      },
      {
        title: "FEED Verification & Audits",
        desc: "Independent peer review of existing FEED packages (e.g. CRPO 116, Ruwais Refinery) to identify design gaps, stress risks, and cost savings.",
      },
      {
        title: "Safety & Relief Analysis",
        desc: "Flare network sizing, pressure relief valve (PRV) capacity calculations, and Emergency Shutdown (ESD) cause & effect formulation.",
      },
    ],
    caseReference: "CRPO 116 (Saudi Aramco / L&T) & Lower Zakum Phase 1 (ADNOC)",
  },
  {
    id: "detail-engineering",
    number: "02",
    code: "SRV-DED",
    title: "Multidisciplinary Detail Engineering (DED)",
    category: "Detail Engineering",
    tagline: "Complete Drawing & Calculation Packages Across 11 Disciplines",
    overview:
      "Comprehensive detailed engineering design translating concept packages into fabrication-ready, clash-free, and Issued-For-Construction (IFC) packages. Covering Piping, Mechanical, Electrical, Instrumentation, Civil/Structural, Telecom, and Pipeline disciplines.",
    software: "Smart 3D (S3D) · AVEVA E3D · CAESAR II · STAAD.Pro · ETAP · SmartPlant SPI",
    standards: "ASME B31.3/B31.1/B31.8 · API 650 · IEC 61850 · AISC 360 · NFPA 70",
    image: "/media/saur-fabrication-projects.png",
    deliverables: [
      "Piping General Arrangement Drawings (GAD) & Isometrics",
      "CAESAR II Pipe Stress & Flexibility Analysis Reports",
      "Single Line Diagrams (SLD) & ETAP Power System Studies",
      "SmartPlant SPI Loop, Wiring & Junction Box Schedules",
      "STAAD.Pro Equipment Foundation & Pipe Rack Framing Calculations",
      "Verified Material Take-Off (MTO) & Bill of Materials (BOM)",
    ],
    capabilities: [
      {
        title: "100% Inter-Discipline Coordination (IDC)",
        desc: "Rigorous cross-checking between mechanical, electrical, structural, and instrumentation teams ensures zero dimensional clashes on site.",
      },
      {
        title: "Rigorous Stress & Structural Analysis",
        desc: "Finite element analysis, high-temperature pipe stress runs, dynamic compressor foundations, and wind/seismic load calculations.",
      },
      {
        title: "Complete Procurement Support",
        desc: "Material requisitions (MR), technical bid evaluations (TBE), vendor drawing reviews (VDR), and technical query (TQ) resolution.",
      },
    ],
    caseReference: "EMARAT 6km Gas Pipeline & Tanjung Miring Gas Station DED",
  },
  {
    id: "3d-plant-bim",
    number: "03",
    code: "SRV-3D",
    title: "3D Plant Modeling & BIM Coordination",
    category: "Digital Plant Modeling",
    tagline: "Intelligent 3D Modeling, Clash Management & Laser Scan Reconciliation",
    overview:
      "End-to-end multi-discipline 3D plant design and BIM integration using Intergraph Smart 3D (S3D) and AVEVA E3D/PDMS. We create intelligent, data-centric plant models that eliminate physical rework during yard fabrication and onsite assembly.",
    software: "Intergraph Smart 3D (S3D) · AVEVA E3D / PDMS · Navisworks · Revit · AutoCAD Plant 3D",
    standards: "ISO 19650 (BIM) · Client 3D CAD Specifications",
    image: "/media/saur-engineering-coordination.png",
    deliverables: [
      "Comprehensive Multi-Discipline 3D Plant Model in S3D / E3D",
      "Automated Isometric & General Arrangement Drawing Extraction",
      "Navisworks Clash Detection Matrix & Resolution Audit Logs",
      "Point Cloud Laser Scan As-Built Reconciliation Models",
      "BIM Level 2 Coordination & Yard Fabrication Models",
      "Material Take-Off (MTO) Extraction Directly from 3D Model",
    ],
    capabilities: [
      {
        title: "Multi-Discipline Clash Elimination",
        desc: "Piping, equipment, structural steel, cable trays, HVAC ducts, and telecom equipment integrated in a single master federated model.",
      },
      {
        title: "Automated 2D Extraction",
        desc: "Batch extraction of piping isometrics with spool splits, cut-pipe lists, and GAD layout extractions with 100% database synchronization.",
      },
      {
        title: "As-Built Laser Scan Conversion",
        desc: "Reconciling 3D laser scan point clouds against brownfield drawings to generate true, verified as-built digital assets.",
      },
    ],
    caseReference: "Novargi Process Gas Heater (Jindal Steel) & ADNOC AiP5 132 Well Pads",
  },
  {
    id: "yard-fabrication",
    number: "04",
    code: "SRV-FAB",
    title: "Yard Fabrication & Construction Support",
    category: "Construction Engineering",
    tagline: "BIM from IFC, Spool Drawings & Rigging Heavy Lifting Studies",
    overview:
      "Direct technical engineering support for fabrication yards, modular skid builders, and construction sites. We translate engineering IFC drawings into practical fabrication spools, erection sequences, rigging studies, and rapid technical query (TQ) solutions.",
    software: "Tekla Structures · AutoCAD Plant 3D · STAAD.Pro · Navisworks · CAESAR II",
    standards: "AISC 360 · AWS D1.1 · API RP 2A · ASME Sec VIII Div 1",
    image: "/media/page-services-hero.png",
    deliverables: [
      "Piping Spool Fabrication Drawings & Weld Schedules",
      "Structural Steel Shop Fabrication Drawings & Cut Sheets (BBS)",
      "Heavy Lifting & Rigging Arrangement Study Reports",
      "Modular Skid Erection & Transportation Analysis",
      "Site Technical Query (TQ) & Deviation Resolution Packages",
      "Final As-Built Redline Mark-Up Incorporation",
    ],
    capabilities: [
      {
        title: "Spool & Shop Drawings",
        desc: "Precise pipe spool drawings with weld IDs, hydro-test limits, paint boundaries, and field weld margins for rapid shop assembly.",
      },
      {
        title: "Rigging & Heavy Lift Engineering",
        desc: "Crane capacity verification, spreader bar design, center of gravity (CoG) calculations, and lift trajectory simulation.",
      },
      {
        title: "Site Engineering Assistance",
        desc: "Dedicated site engineers handling fit-up issues, nozzle alignment checks, and immediate redline mark-up validation.",
      },
    ],
    caseReference: "ADNOC Ruwais Reflux Pumps Lifting System & 109 Chemical Injection Skids",
  },
  {
    id: "manpower-solutions",
    number: "05",
    code: "SRV-HR",
    title: "Technical Manpower & Workforce Deputation",
    category: "Workforce Solutions",
    tagline: "High-Caliber Engineering Personnel for Offices, Yards & Offshore Sites",
    overview:
      "Building on our engineering and safety excellence, our specialized technical manpower division provides certified engineers, 3D modelers, and discipline leads for design office deputation, fabrication yards, and offshore project sites.",
    software: "All Licensed Industry CAD/CAE Platforms",
    standards: "ISO 9001:2015 · ISO 45001:2018 (Safety Certified)",
    image: "/media/page-digital-workforce-hero.png",
    deliverables: [
      "Discipline Lead & Principal Engineers (Piping, E&I, Struct, Process)",
      "CAESAR II Pipe Stress & Flexibility Analysts",
      "Certified Smart 3D (S3D) & AVEVA E3D/PDMS Modelers",
      "SmartPlant SPI / INtools Instrumentation Specialists",
      "QA/QC Inspection & Welding Engineering Personnel",
      "Onsite Technical Query (TQ) Resolvers & Field Coordinators",
    ],
    capabilities: [
      {
        title: "Pre-Screened Technical Rigor",
        desc: "Every deputed engineer is technically assessed by Saur's Discipline Leads on live CAD/CAE tools before client presentation.",
      },
      {
        title: "Flexible Deployment Framework",
        desc: "Short-term project surge staffing, long-term multi-year contracts, and offshore shutdown deputation options.",
      },
      {
        title: "Complete Administrative Governance",
        desc: "Full statutory compliance, payroll management, and international mobility support for Middle East and SE Asia deployments.",
      },
    ],
    caseReference: "50,000+ Engineering Hours Delivered for Tier-1 EPC Clients",
  },
  {
    id: "it-domain-sme",
    number: "06",
    code: "SRV-IT",
    title: "IT & Digital Engineering Domain / SME Support",
    category: "Digital Transformation",
    tagline: "Subject Matter Expertise for IT Firms & Industrial Software Vendors",
    overview:
      "Empowering IT firms and industrial software vendors through deep Oil & Gas, petrochemical, and power engineering domain knowledge. We assist technology companies in building digital twins, configuring CAD catalogs, and digitizing complex legacy plant data.",
    software: "SmartPlant Suite · AVEVA NET · Intergraph Smart 3D · Python / SQL · BIM",
    standards: "ISO 15926 (Plant Data) · CFIHOS · ISO 19650",
    image: "/media/ot-security-control-room.png",
    deliverables: [
      "P&ID Intelligent Digitization & Database Tagging",
      "Smart 3D & AVEVA E3D Piping Catalog & Spec Customization",
      "SmartPlant Instrumentation (SPI) Database Schema Configuration",
      "Digital Twin Asset Data Verification & Attribute Populating",
      "Engineering Domain Rules Validation for Software Applications",
      "Legacy 2D MicroStation / AutoCAD to Smart 3D Migration",
    ],
    capabilities: [
      {
        title: "Domain Knowledge Injection",
        desc: "Providing software development teams with real-world EPC engineering context, calculation validation, and user workflow guidance.",
      },
      {
        title: "Catalog & Specification Engineering",
        desc: "Creating and verifying piping material specifications (PMS), valve catalogs, and branch tables for Smart 3D and AVEVA E3D.",
      },
      {
        title: "Intelligent Data Extraction",
        desc: "Automated conversion of static PDF / TIFF drawings into structured intelligent engineering databases and asset hierarchies.",
      },
    ],
    caseReference: "SME Consulting for Global IT Services Firms in Energy Domain",
  },
];

export default function ServicesPage() {
  const [selectedPillar, setSelectedPillar] = useState<ServicePillar | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#FF8A00] selection:text-white flex flex-col justify-between">
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full">
        {/* ══════════════════════════════════════════════════════════════════════
           1. HERO: Classical Geometric Diagonal Angle Split
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[520px] lg:min-h-[560px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-8 bg-[#0b233a]">
          {/* Full-bleed Industrial Plant Photographic Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/page-services-hero.png')",
              backgroundPosition: "center right",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/50" />
            
            {/* Floating Editorial Badges on Right (Desktop) */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white">
              <div className="w-8 h-0.5 bg-[#FF8A00] ml-auto mb-2" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                MULTIDISCIPLINARY EXECUTION
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
                CONCEPT TO COMMISSIONING
              </div>
            </div>

            <div className="hidden xl:block absolute bottom-12 right-16 text-right text-white/80 font-mono text-[10px] uppercase tracking-[0.2em]">
              ISO 9001:2015 CERTIFIED DELIVERY
            </div>
          </div>

          {/* Left Angle Polygonal Navy Container */}
          <div className="relative z-10 w-full lg:w-[58%] xl:w-[54%] bg-[#0b233a] flex flex-col justify-center px-6 sm:px-12 md:px-16 py-10 lg:py-14 [clip-path:none] lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-0.5 bg-[#FF8A00]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF8A00]">
                  SERVICES &amp; EXECUTION CAPABILITIES
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-5">
                Engineering Services <br />
                <span className="text-white">Built for Critical</span>{" "}
                <span className="text-[#FF8A00]">Industrial Assets.</span>
              </h1>

              {/* Description */}
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed mb-8 max-w-lg font-light">
                From conceptual FEED and multidisciplinary detailed engineering to 3D plant modeling, fabrication support, technical manpower deputation, and IT engineering domain solutions.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-sm hover:shadow inline-flex items-center gap-2 group"
                >
                  <span>Request Service Proposal</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <a
                  href="#pillars"
                  className="border border-white/40 hover:bg-white/10 text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore 6 Pillars</span>
                </a>
              </div>

              {/* Bottom Telemetry Line */}
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 pt-5 border-t border-white/15">
                <span>FEED &amp; DED</span>
                <span className="text-white/30">•</span>
                <span>3D MODELING</span>
                <span className="text-white/30">•</span>
                <span>WORKFORCE</span>
                <span className="text-white/30">•</span>
                <span className="text-[#FF8A00] font-bold">100% ISO 9001 QA</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           2. COMMERCIAL ENGAGEMENT MODELS (How We Work With Clients)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                  <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
                    FLEXIBLE COMMERCIAL FRAMEWORKS
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b233a] tracking-tight leading-tight">
                  Commercial Engagement Models
                </h2>
                <p className="font-sans text-sm sm:text-base text-slate-600 mt-2 font-light">
                  Tailored collaboration structures designed for international EPC contractors, plant operators, and engineering consultants.
                </p>
              </div>

              <button
                onClick={() => setConsultationOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF8A00] hover:text-[#E67C00] transition-colors self-start md:self-auto"
              >
                <span>Discuss Custom Engagement</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* 3 High-Impact Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {engagementModels.map((model) => (
                <div
                  key={model.id}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#FF8A00]/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] font-bold text-[#FF8A00] uppercase tracking-wider bg-[#FF8A00]/10 px-2.5 py-1 rounded">
                        {model.badge}
                      </span>
                      <span className="font-mono text-xs text-slate-400 font-semibold">
                        {model.code}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0b233a] mb-4 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors shadow-2xs">
                      <span className="material-symbols-outlined text-2xl">{model.icon}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#0b233a] mb-1 group-hover:text-[#FF8A00] transition-colors">
                      {model.title}
                    </h3>
                    <p className="font-mono text-xs text-slate-500 mb-4 font-medium">
                      {model.subtitle}
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-light">
                      {model.desc}
                    </p>

                    {/* Value Bullet List */}
                    <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
                      {model.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="material-symbols-outlined text-sm text-[#FF8A00] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span className="leading-snug">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Ideal For Badge */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-mono text-slate-500">
                      <span className="text-slate-400 block uppercase text-[9px]">Best Suited For:</span>
                      <span className="font-bold text-slate-800">{model.idealFor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           3. CORE SERVICE PILLARS: 3x2 Bento Grid Showcase
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-24 bg-white" id="pillars">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            
            {/* Header & Eyebrow */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-2">
                  TECHNICAL DEPTH &amp; OFFERINGS
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0b233a] leading-tight">
                  Our Six Core Service Pillars
                </h2>
                <p className="font-sans text-sm sm:text-base text-slate-600 mt-2 font-light">
                  Explore our end-to-end multidisciplinary engineering capabilities, licensed CAD/CAE platforms, verified deliverables, and international compliance benchmarks.
                </p>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs text-xs font-mono text-slate-600 self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
                <span>6 Core Pillars // 100% ISO 9001 QA</span>
              </div>
            </div>

            {/* 3x2 Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {servicePillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#FF8A00]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a] via-[#0b233a]/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold bg-[#FF8A00] text-white px-2.5 py-0.5 rounded shadow">
                        PILLAR {pillar.number}
                      </span>
                      <span className="font-mono text-[10px] font-semibold bg-[#0b233a]/85 backdrop-blur-xs text-slate-200 px-2.5 py-0.5 rounded border border-white/20">
                        {pillar.code}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#FF8A00] tracking-wider block mb-1">
                        {pillar.category}
                      </span>
                      <h3 className="font-display text-xl font-bold text-white leading-tight drop-shadow">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light line-clamp-3">
                        {pillar.overview}
                      </p>

                      {/* Key Deliverables Highlights */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block mb-1">
                          Key Deliverables:
                        </span>
                        {pillar.deliverables.slice(0, 3).map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="material-symbols-outlined text-sm text-[#FF8A00] shrink-0 mt-0.5">
                              check_circle
                            </span>
                            <span className="leading-snug line-clamp-1">{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Meta & Action */}
                    <div className="pt-4 border-t border-slate-100 space-y-3.5">
                      
                      {/* Software / Standards mini tags */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 truncate">
                          <span className="text-slate-400 font-bold uppercase shrink-0">Tools:</span>
                          <span className="text-slate-700 truncate font-semibold">{pillar.software}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 truncate">
                          <span className="text-slate-400 font-bold uppercase shrink-0">Codes:</span>
                          <span className="text-[#FF8A00] truncate font-semibold">{pillar.standards}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => setSelectedPillar(pillar)}
                        className="w-full py-3 rounded-xl bg-slate-50 hover:bg-[#0b233a] hover:text-white text-[#0b233a] border border-slate-200 hover:border-[#0b233a] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-[#FF8A00]/50"
                      >
                        <span>Explore Full Scope &amp; Deliverables</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>

                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. DELIVERABLES MATRIX: Flowing Animated Disciplines Showcase
           ══════════════════════════════════════════════════════════════════════ */}
        <PrecisionDisciplines
          sectionId="deliverables-matrix"
          preTitle="VERIFIED OUTPUTS & DRAWINGS"
          title="Deliverables & Engineering Matrix"
          description="Standard technical deliverables generated, audited, and issued for construction (IFC) across major engineering disciplines."
          onSelectDiscipline={(discipline) => setSelectedDiscipline(discipline)}
          viewAllHref="/expertise"
          viewAllText="Explore All 11 Disciplines"
        />

        {/* ══════════════════════════════════════════════════════════════════════
           5. PROJECT EXECUTION LIFECYCLE (Step-by-Step Delivery Flow)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-2">
                DELIVERY GOVERNANCE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b233a] tracking-tight">
                Project Execution Lifecycle
              </h2>
              <p className="font-sans text-sm text-slate-600 mt-2 font-light">
                How our multidisciplinary design offices in Navi Mumbai and Chennai execute project scopes from kickoff to site handover.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Scope & Basis Alignment",
                  subtitle: "Code & Standards Setup",
                  desc: "Kickoff review of client design criteria, P&ID limits, international standards (ASME/API/IEC), and software database configurations.",
                  icon: "description",
                },
                {
                  step: "02",
                  title: "3D Modeling & Stress Runs",
                  subtitle: "Integrated Engineering",
                  desc: "Detailed multi-discipline modeling in Smart 3D / E3D, CAESAR II stress analysis, and structural framing with real-time clash resolution.",
                  icon: "view_in_ar",
                },
                {
                  step: "03",
                  title: "Two-Tier QA Review Gate",
                  subtitle: "IDC & Lead SME Check",
                  desc: "Inter-discipline checks (IDC) and Senior Discipline Lead sign-offs on all calculations, layouts, and material take-offs (MTO).",
                  icon: "verified_user",
                },
                {
                  step: "04",
                  title: "IFC Release & Site Support",
                  subtitle: "Fabrication Handover",
                  desc: "Issuance of certified Issued-For-Construction (IFC) drawings, spool sheets, and continuous technical query (TQ) resolution during fabrication.",
                  icon: "task_alt",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#FF8A00]/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#FF8A00] bg-[#FF8A00]/10 px-2 py-0.5 rounded">
                        STAGE {item.step}
                      </span>
                      <span className="material-symbols-outlined text-2xl text-slate-400">
                        {item.icon}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#0b233a] mb-1">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[11px] text-slate-500 font-medium mb-3">
                      {item.subtitle}
                    </p>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           6. ACTIONABLE CONSULTATION CTA
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-[#0b233a] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
            <div className="w-8 h-1 bg-[#FF8A00] mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Need multidisciplinary engineering execution?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base font-light leading-relaxed">
              Connect with our Navi Mumbai HQ and Chennai engineering leads to review your project scope, deliverable schedule, and dedicated team staffing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Request Project Proposal</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <Link
                href="/projects"
                className="border border-white/40 hover:bg-white/10 text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>Inspect Major Projects</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
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

      {/* ══════════════════════════════════════════════════════════════════════
         PILLAR DETAILED SCOPE MODAL (Interactive Drilldown)
         ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillar(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header Frame */}
              <div className="relative h-44 sm:h-52 w-full bg-slate-900 shrink-0 overflow-hidden">
                <img
                  src={selectedPillar.image}
                  alt={selectedPillar.title}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a] via-[#0b233a]/60 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>

                {/* Badges & Title on Image */}
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold bg-[#FF8A00] text-white px-2.5 py-0.5 rounded shadow">
                      PILLAR {selectedPillar.number}
                    </span>
                    <span className="font-mono text-[10px] font-semibold bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded">
                      {selectedPillar.code}
                    </span>
                    <span className="font-mono text-[10px] text-slate-300">
                      {selectedPillar.category}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                    {selectedPillar.title}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[#FF8A00] font-medium mt-0.5">
                    {selectedPillar.tagline}
                  </p>
                </div>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
                
                {/* Overview */}
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-slate-400 block mb-2">
                    SERVICE OVERVIEW
                  </span>
                  <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-light">
                    {selectedPillar.overview}
                  </p>
                </div>

                {/* 3 Capabilities Grid */}
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-slate-400 block mb-3">
                    EXECUTION CAPABILITIES &amp; SPECIALIZATIONS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedPillar.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="font-display text-xs font-bold text-[#0b233a] mb-1.5">
                          {cap.title}
                        </h4>
                        <p className="font-sans text-xs text-slate-600 font-light leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Verified Deliverables Checklist */}
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-slate-400 block mb-3">
                    STANDARD VERIFIED DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedPillar.deliverables.map((deliv, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 p-3 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <span className="material-symbols-outlined text-sm text-[#FF8A00] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className="leading-snug font-medium">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Standards Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#0b233a] text-white">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                      Licensed Software Suite
                    </span>
                    <div className="font-mono text-xs text-[#FF8A00] font-bold">
                      {selectedPillar.software}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b233a] text-white">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                      Governing Standards
                    </span>
                    <div className="font-mono text-xs text-slate-200 font-bold">
                      {selectedPillar.standards}
                    </div>
                  </div>
                </div>

                {/* Case Citation */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#FF8A00] text-xl shrink-0">
                    history_edu
                  </span>
                  <div>
                    <span className="font-bold block">Case Study Benchmark:</span>
                    <span className="font-light">{selectedPillar.caseReference}</span>
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 shrink-0">
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Close Scope
                </button>
                
                <div className="flex items-center gap-3">
                  <Link
                    href="/projects"
                    onClick={() => setSelectedPillar(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-[#0b233a] hover:border-[#0b233a] transition-colors"
                  >
                    View Real Projects →
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedPillar(null);
                      setConsultationOpen(true);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#FF8A00] hover:bg-[#E67C00] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Scope Proposal</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

