"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import DisciplineModal from "@/components/DisciplineModal";
import { type Discipline } from "@/components/PrecisionDisciplines";
import { cn } from "@/lib/utils";

// ══════════════════════════════════════════════════════════════════════════════
// DATA: 11 Core Engineering Disciplines (Authentic to Company Profile PDF)
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
    code: "DISC-01",
    title: "Piping & Mechanical Engineering",
    icon: "precision_manufacturing",
    category: "Piping & Mechanical",
    badge: "CAESAR II · SP3D / E3D",
    kpi: "ZERO CLASH 3D ROUTING",
    summary:
      "Comprehensive piping layout engineering, 3D equipment modeling, CAESAR II high-temperature stress analysis, isometric generation, and material take-offs (MTO/BOM).",
    image: "/media/saur-fabrication-projects.png",
    leadSoftware: ["Smart 3D (S3D)", "AVEVA E3D", "CAESAR II", "PVElite", "TANK"],
    standards: ["ASME B31.3", "ASME B31.1", "API 650", "ASME Sec VIII Div 1/2", "NACE MR0175"],
    deliverables: [
      "Piping General Arrangement Drawings (GAD) & Plot Plans",
      "Piping Isometrics with Spool Splits, Weld Maps & Cut Lists",
      "CAESAR II Pipe Stress & Flexibility Analysis Calculation Reports",
      "Static Equipment GA & Fabrication Shop Drawings (Tanks, Exchangers)",
      "Special Pipe Support Drawings (SPS) & Standard Support Schedules",
      "QA-Reconciled Material Take-Off (MTO) & Bill of Materials (BOM)",
      "Insulation, Painting & Steam Tracing Schedules",
      "Tie-In Location Plans & Shutdown Hook-Up Packages",
    ],
    detailedSpecs: {
      tolerances: "CAESAR II, PVElite, AutoCAD Plant 3D, TANK",
      materials: "Carbon Steel, Stainless Steel, Duplex, Super Duplex, Inconel, Alloy Steel",
      standards: "ASME B31.3 / B31.1 / B31.8, API 650 / 620, ASME Sec VIII Div 1/2",
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
    code: "DISC-02",
    title: "Electrical Engineering",
    icon: "electric_bolt",
    category: "Electrical & Instrumentation",
    badge: "ETAP · Smart Electrical",
    kpi: "LOAD FLOW & ARC FLASH",
    summary:
      "High/low voltage substation layouts, ETAP power system studies, Single Line Diagrams (SLD), cable tray routing, and industrial lighting calculations.",
    image: "/images/electrical.png",
    leadSoftware: ["ETAP", "Smart Electrical (SEL)", "AVEVA Electrical", "Dialux", "AutoCAD"],
    standards: ["IEC 60364", "IEC 61850", "IEEE 1584", "NFPA 70 (NEC)", "IS Standards"],
    deliverables: [
      "High & Low Voltage Single Line Diagrams (SLD) & Key Schematics",
      "ETAP Short Circuit, Load Flow, Motor Starting & Arc Flash Studies",
      "Substation Equipment Layouts, Earthing & Lightning Protection Plans",
      "Cable Tray Routing, Underground Trenching & MCT Layouts",
      "Indoor & Outdoor Lux Level Simulation Reports (Dialux/Chamlite)",
      "LV/HV Cable Sizing, Voltage Drop & Thermal Derating Schedules",
      "Transformer, UPS & Emergency Diesel Generator (EDG) Sizing",
      "Solar PV System Sizing Calculations, Datasheets & Array Layouts",
    ],
    detailedSpecs: {
      tolerances: "ETAP, Dialux, Smart Electrical (SEL), AutoCAD",
      materials: "HV/MV/LV Switchgear, Power Transformers, Cables, Busducts, Cable Trays",
      standards: "IEC 60364, IEEE 1584, NFPA 70 (NEC), IS Standards",
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
      { label: "TOOLS", value: "ETAP / SEL", color: "text-[#FF8A00]" },
      { label: "ACCURACY", value: "100% Verified", color: "text-slate-900" },
    ],
  },
  {
    id: "instrumentation-control",
    slug: "instrumentation",
    number: "03",
    code: "DISC-03",
    title: "Instrumentation & Control",
    icon: "sensors",
    category: "Electrical & Instrumentation",
    badge: "SmartPlant SPI · InstruCalc",
    kpi: "SIL 2/3 SAFETY LOOPS",
    summary:
      "Field instrumentation design, SmartPlant Instrumentation (SPI/INtools) databases, loop diagrams, cable schedules, and control room architecture.",
    image: "/media/expertise-design-office.png",
    leadSoftware: ["SmartPlant SPI", "InstruCalc", "AVEVA Instrumentation", "AutoCAD"],
    standards: ["ISA 5.1", "IEC 61508 / 61511 (SIL)", "API RP 551", "IEC 62443"],
    deliverables: [
      "SmartPlant Instrumentation (SPI / INtools) Tagged Database Setup",
      "Instrument Datasheets (PSV, PRV, Flow/Level/Pressure Transmitters, Solenoids)",
      "Instrument Loop Diagrams & Interconnection Wiring Schedules",
      "Junction Box (JB) Schedules & Field Cable Routing",
      "Instrument Hook-Up & Standard Installation Details",
      "Control Room Layouts, MLCP I/O Lists & Cabinet Elevations",
      "Emergency Shutdown (ESD) Cause & Effect Matrix",
      "Hydraulic Tube Schedules for SSV & SSSV Supply/Return Lines",
    ],
    detailedSpecs: {
      tolerances: "Smart Instrumentation (SPI), InstruCalc, AutoCAD",
      materials: "Transmitters, Control Valves, DCS/PLC Racks, Fire & Gas Systems",
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
      { label: "SYSTEMS", value: "SPI / DCS", color: "text-[#FF8A00]" },
      { label: "SAFETY", value: "SIL 2 / SIL 3", color: "text-slate-900" },
    ],
  },
  {
    id: "process-engineering",
    slug: "process",
    number: "04",
    code: "DISC-04",
    title: "Process Engineering & Flow",
    icon: "science",
    category: "Process & Flow Assurance",
    badge: "SmartPID · Aspen HYSYS",
    kpi: "HEAT & MASS BALANCE",
    summary:
      "Process Flow Diagrams (PFD), Piping & Instrumentation Diagrams (P&ID), control philosophies, cause & effect, and equipment sizing.",
    image: "/images/process.png",
    leadSoftware: ["Aspen HYSYS", "SmartPID", "AVEVA PID", "FlareNet", "AutoCAD"],
    standards: ["API 520 / 521 / 2000", "ISO 10418", "Shell DEP", "Client Project Specs"],
    deliverables: [
      "Process Flow Diagrams (PFD) with Heat & Mass Balances (HMB)",
      "Intelligent Piping & Instrumentation Diagrams (P&ID) in SmartPID / AVEVA PID",
      "Operating, Control & Safe Shutdown Philosophies",
      "Cause & Effect Matrix (C&E) and Alarm/Trip Lists",
      "Pump NPSH, Line Hydraulic Sizing & Relief Valve (PRV) Calculations",
      "Process Equipment Datasheets (Separators, Columns, Exchangers, Tanks)",
      "Flare Network Hydraulic Sizing & Depressurization Studies",
      "Utility Consumption Summaries & Effluent Treatment Philosophies",
    ],
    detailedSpecs: {
      tolerances: "SmartPID, AVEVA PID, Aspen HYSYS, AutoCAD",
      materials: "Process Vessels, Pumps, Compressors, Flare & Utility Networks",
      standards: "API 520 / 521, ISO 10418, Shell DEP, Client Specs",
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
      { label: "PLATFORMS", value: "SmartPID / AVEVA", color: "text-slate-900" },
    ],
  },
  {
    id: "plant-3d-modeling",
    slug: "3d-modelling",
    number: "05",
    code: "DISC-05",
    title: "3D Plant Modeling & BIM",
    icon: "view_in_ar",
    category: "Piping & Mechanical",
    badge: "Intergraph S3D · AVEVA E3D",
    kpi: "MULTI-DISCIPLINE BIM",
    summary:
      "Complete multidisciplinary 3D plant modeling in Smart 3D (S3D) and AVEVA E3D/PDMS, clash detection, and automated 2D drawing extraction.",
    image: "/media/saur-engineering-coordination.png",
    leadSoftware: ["Smart 3D (S3D)", "AVEVA E3D / PDMS", "Navisworks", "Leica Cyclone", "LFM"],
    standards: ["ISO 19650 (BIM)", "CFIHOS", "ISO 15926", "Client CAD Specifications"],
    deliverables: [
      "Comprehensive Multi-Discipline 3D Model (Piping, Struct, E&I, Telecom, HVAC)",
      "Multi-Discipline Clash Detection & Resolution Management in Navisworks",
      "Automated Extraction of Isometrics, GADs, and Equipment Layouts",
      "Laser Scan Point Cloud Brownfield As-Built Reconciliation (Cyclone/LFM)",
      "BIM / Yard Fabrication 3D Verification Models & Space Claim Management",
      "Intelligent 3D Catalog & Specification Database Customization",
    ],
    detailedSpecs: {
      tolerances: "Intergraph Smart 3D (S3D), AVEVA E3D, PDMS, Navisworks",
      materials: "Full Multi-Discipline Plant Assets (Piping, Civ/Struct, E&I, Telecom)",
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
      { label: "MODELING", value: "S3D / E3D", color: "text-[#FF8A00]" },
      { label: "CLASHES", value: "Zero Tolerance", color: "text-slate-900" },
    ],
  },
  {
    id: "civil-structural",
    slug: "civil-structural",
    number: "06",
    code: "DISC-06",
    title: "Civil & Structural Engineering",
    icon: "apartment",
    category: "Civil & Structural",
    badge: "STAAD.Pro · Tekla",
    kpi: "BLAST & SEISMIC RIGOR",
    summary:
      "Structural steel framing, equipment foundations, pipe racks, heavy lifting rigging studies, and blast-resistant building design.",
    image: "/media/page-services-hero.png",
    leadSoftware: ["STAAD.Pro", "Tekla Structures", "AutoCAD", "Revit", "SAFE"],
    standards: ["AISC 360", "ACI 318", "ASCE 7-16", "IS 456 / IS 800", "BS 5950"],
    deliverables: [
      "Pipe Rack & Technological Structure STAAD.Pro 3D Framing Analysis",
      "Dynamic Foundation Design for Heavy Compressors & Pumps",
      "Structural Steel Jackets, Mooring & Loading Platform Design",
      "Heavy Rigging & Lifting Arrangement Studies & Trajectory Simulation",
      "Civil Architectural Layouts, Paving, Grading & Drainage Plans",
      "Bar Bending Schedules (BBS) & Structural Bill of Quantities (BOQ)",
      "Blast-Resistant Control Building & Substation Structural Engineering",
      "Tekla 3D Steel Fabrication Models, Spool Assemblies & Connection Details",
    ],
    detailedSpecs: {
      tolerances: "STAAD.Pro, Tekla Structures, AutoCAD, Revit",
      materials: "Structural Steel, Reinforced Concrete, Grout, Anchor Bolts",
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
      { label: "ANALYSIS", value: "STAAD.Pro", color: "text-[#FF8A00]" },
      { label: "FOUNDATIONS", value: "Heavy Industrial", color: "text-slate-900" },
    ],
  },
  {
    id: "telecommunication",
    slug: "telecommunication",
    number: "07",
    code: "DISC-07",
    title: "Telecommunication Engineering",
    icon: "cell_tower",
    category: "Electrical & Instrumentation",
    badge: "PAGA · CCTV · Fiber",
    kpi: "100% PLANT COVERAGE",
    summary:
      "Industrial plant telecommunications design, CCTV surveillance, Public Address & General Alarm (PAGA), and fiber optic network infrastructure.",
    image: "/media/page-digital-workforce-hero.png",
    leadSoftware: ["AutoCAD", "SmartPlant 3D", "Acoustic Mapping Tools", "Dialux"],
    standards: ["ITU-T", "IEEE 802.3", "IEC Standards", "Client Telecom Specs"],
    deliverables: [
      "Plant Telecom Overall Block Diagrams & Network Architecture",
      "PAGA System Block Diagrams, Speaker Layouts & Acoustic Coverage Studies",
      "CCTV Surveillance Layouts & Field Viewing Angle Coverage Maps",
      "Fiber Optic & Telecom Cable Routing & Sizing Schedules",
      "Telecom Equipment Lists, Rack Layouts & Bill of Quantities (BOQ)",
      "Access Control, Intrusion Detection & Plant Intercom Drawings",
    ],
    detailedSpecs: {
      tolerances: "AutoCAD, SmartPlant 3D, Specialist Telecom Tools",
      materials: "Fiber Optic Cables, CCTV Cameras, PAGA Speakers, Telecom Racks",
      standards: "ITU-T, IEEE 802.3, IEC Standards, Client Specs",
      efficiency: "100% Plant Coverage & Fail-Safe Emergency Broadcast",
      deliverables: [
        "Telecom Overall Block Diagrams & Architecture",
        "PAGA System Block Diagrams & Acoustic Coverage",
        "CCTV Layouts & Field Coverage Maps",
        "Fiber Optic & Telecom Cable Schedules",
        "Telecom Equipment Lists & Bill of Quantities (BOQ)",
      ],
    },
    metrics: [
      { label: "COVERAGE", value: "100% Plant Wide", color: "text-[#FF8A00]" },
      { label: "SYSTEMS", value: "PAGA / CCTV / FO", color: "text-slate-900" },
    ],
  },
  {
    id: "pipeline-engineering",
    slug: "pipeline",
    number: "08",
    code: "DISC-08",
    title: "Pipeline & Alignment Engineering",
    icon: "route",
    category: "Piping & Mechanical",
    badge: "CAESAR II · GIS Route",
    kpi: "CROSS-COUNTRY DED",
    summary:
      "Cross-country pipeline design, alignment sheets, crossing drawings (HDD/thrust boring), stress analysis, and route optimization.",
    image: "/media/saur-industrial-hero.png",
    leadSoftware: ["CAESAR II", "AutoCAD", "Google Earth Pro", "Pipeline Studio", "GIS"],
    standards: ["ASME B31.4", "ASME B31.8", "API 1104", "OISD Standards"],
    deliverables: [
      "Pipeline Route Alignment Sheets & Google Earth / GIS Corridor Maps",
      "Horizontal Directional Drilling (HDD) River & Highway Crossing Profiles",
      "Pipeline Stress Analysis, Wall Thickness & Hydraulic Gradient Sizing",
      "Station Approach, Scraper Trap & Block Valve Station (BVS) Drawings",
      "Right-of-Way (ROW) Cut Sheets & Clearing Schedules",
      "Pipeline As-Built Drawings & Verified Material Take-Offs (MTO)",
    ],
    detailedSpecs: {
      tolerances: "AutoCAD, CAESAR II, Google Earth Pro, GIS Tools",
      materials: "API 5L Line Pipe (Grade B to X70), 3LPE Coating, Bends",
      standards: "ASME B31.4 / B31.8, API 1104, OISD Standards",
      efficiency: "Optimized Route Corridor & Stress Compliance",
      deliverables: [
        "Pipeline Route Alignment Sheets & Corridor Maps",
        "Road, Railway & River Crossing Detail Drawings",
        "Pipeline Stress Analysis & Wall Thickness Calculations",
        "Station Approach & Block Valve Station Drawings",
        "Right-of-Way (ROW) Cut Sheets & MTO / BOM",
      ],
    },
    metrics: [
      { label: "PIPELINES", value: "Gas & Liquid", color: "text-[#FF8A00]" },
      { label: "CODES", value: "ASME B31.4/8", color: "text-slate-900" },
    ],
  },
  {
    id: "subsea-engineering",
    slug: "subsea",
    number: "09",
    code: "DISC-09",
    title: "Subsea & Marine Engineering",
    icon: "water",
    category: "Civil & Structural",
    badge: "API 17D · Subsea Systems",
    kpi: "DEEPWATER ARCHITECTURE",
    summary:
      "Subsea field architecture, umbilical datasheets, subsea instrumentation, and FEED verification delivered with international engineering partners.",
    image: "/images/process.png",
    leadSoftware: ["Specialist Subsea CAD/CAE", "OrcaFlex (Partner)", "AutoCAD"],
    standards: ["API 17D", "ISO 13628", "DNV-ST-F101", "API RP 17A"],
    deliverables: [
      "Subsea Field Layout & Production Architecture Schematics",
      "Subsea Umbilical, Riser & Flowline (SURF) Datasheets & Selection",
      "Subsea Instrumentation & Control Pod Technical Specifications",
      "Technical Bid Evaluation (TBE) for Subsea Manifolds & Trees",
      "FEED Verification & Subsea Installation Feasibility Reviews",
    ],
    detailedSpecs: {
      tolerances: "Subsea Specialist Tools (Delivered with Global Partners)",
      materials: "Super Duplex Stainless Steel, CRA Clad, Inconel 625, Syntactic Foam",
      standards: "API 17D, ISO 13628, DNV-ST-F101",
      efficiency: "High-Reliability Subsea Asset Integrity",
      deliverables: [
        "Subsea Architecture & Layout Schematics",
        "Umbilical Datasheet & Sizing Selection",
        "Technical Bid Evaluation (TBE) for Subsea Equipment",
        "FEED Assistance & Subsea Review Reports",
      ],
    },
    metrics: [
      { label: "COLLABORATION", value: "Partner Model", color: "text-[#FF8A00]" },
      { label: "STANDARDS", value: "API 17D / DNV", color: "text-slate-900" },
    ],
  },
  {
    id: "flow-assurance",
    slug: "flow-assurance",
    number: "10",
    code: "DISC-10",
    title: "Flow Assurance & Thermal Hydraulics",
    icon: "cyclone",
    category: "Process & Flow Assurance",
    badge: "Multiphase · Hydrate Study",
    kpi: "FLOW ASSURANCE RIGOR",
    summary:
      "Multiphase flow dynamics, wax and hydrate mitigation, slug catcher sizing, and dynamic thermal-hydraulic simulation with specialist partners.",
    image: "/media/page-services-hero.png",
    leadSoftware: ["OLGA (Partner)", "Pipesim (Partner)", "Aspen HYSYS", "PVTSim"],
    standards: ["API 14E", "ISO 10418", "API 520 / 521"],
    deliverables: [
      "Steady-State & Dynamic Multiphase Hydraulic Simulation",
      "Hydrate, Wax, Asphaltene & Scale Deposition Risk Mitigation Studies",
      "Hydrodynamic & Terrain Slug Sizing and Slug Catcher Analysis",
      "Thermal Insulation & Cooldown Depressurization Time Sizing",
      "Severe Slugging Mitigation & Chemical Injection Rate Optimization",
    ],
    detailedSpecs: {
      tolerances: "OLGA / Pipesim / HYSYS Simulation Engines",
      materials: "Production Fluids, Hydrate Inhibitors (MEG/Methanol), Corrosion Inhibitors",
      standards: "API 14E, ISO 10418, Shell DEP",
      efficiency: "Zero Flow Blockage & Optimized OPEX",
      deliverables: [
        "Multiphase Flow Simulation Reports",
        "Hydrate & Wax Formation Mitigation Plans",
        "Dynamic Slug Analysis & Slug Catcher Sizing",
        "Thermal Cooldown & Depressurization Studies",
      ],
    },
    metrics: [
      { label: "SIMULATION", value: "Dynamic/Steady", color: "text-[#FF8A00]" },
      { label: "HYDRATE RISK", value: "Mitigated", color: "text-slate-900" },
    ],
  },
  {
    id: "yard-fabrication",
    slug: "yard-fabrication",
    number: "11",
    code: "DISC-11",
    title: "Yard Fabrication & Modular Skids",
    icon: "handyman",
    category: "Piping & Mechanical",
    badge: "Tekla · Shop Spools · Lifting",
    kpi: "FABRICATION READY",
    summary:
      "Fabrication-ready shop isometrics, Tekla structural models, rigging & heavy lifting calculations, and modular chemical injection skid engineering.",
    image: "/media/saur-fabrication-projects.png",
    leadSoftware: ["Tekla Structures", "Smart 3D", "AutoCAD", "STAAD.Pro"],
    standards: ["AWS D1.1", "ASME Sec IX", "AISC 360", "API RP 2A"],
    deliverables: [
      "Shop Fabrication Isometrics with Spool Cut Lengths & Weld Maps",
      "Tekla 3D Steel Fabrication Models, Gusset Details & CNC Data Files",
      "Heavy Rigging & Crane Lifting Plans with CoG Trajectory Simulation",
      "Detailed Engineering for Modular Skids (e.g. 109 Chemical Injection Skids)",
      "General Arrangement, Erection & As-Built Yard Drawing Packages",
      "Onsite Technical Query (TQ) Resolution & Redline Reconciliation",
    ],
    detailedSpecs: {
      tolerances: "Tekla Structures, Smart 3D, AutoCAD",
      materials: "Structural Steel, Prefabricated Spools, Lifting Lugs, Skids",
      standards: "AWS D1.1, ASME Sec IX, AISC 360",
      efficiency: "Zero Fit-Up Error at Fabrication Yard",
      deliverables: [
        "BIM / 3D Modeling from IFC Drawings",
        "Generation of Shop Isometrics with Spool Splits",
        "Tekla Fabrication & Erection Drawings",
        "Heavy Rigging & Lifting Analysis Reports",
        "As-Built Reconciliation Packages",
      ],
    },
    metrics: [
      { label: "FIT-UP", value: "Zero Error", color: "text-[#FF8A00]" },
      { label: "SKIDS", value: "Modular DED", color: "text-slate-900" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// DATA: Software & Engineering Platforms (100% Authentic from PDF Page 8)
// ══════════════════════════════════════════════════════════════════════════════
interface SoftwarePillarGroup {
  categoryTitle: string;
  icon: string;
  items: {
    name: string;
    role: string;
    tag: string;
  }[];
}

const engineeringSoftwarePlatforms: SoftwarePillarGroup[] = [
  {
    categoryTitle: "Intergraph / SmartPlant Suite",
    icon: "view_in_ar",
    items: [
      { name: "Smart 3D (S3D)", role: "3D Multi-Discipline Plant Design", tag: "3D CAD / BIM" },
      { name: "SmartPID (SPID)", role: "Intelligent Process & Instrumentation Diagrams", tag: "Process P&ID" },
      { name: "Smart Instrumentation (SI)", role: "INtools Tagged Instrument Database", tag: "Instrumentation" },
      { name: "Smart Electrical (SEL)", role: "Electrical Power & SLD Database", tag: "Electrical" },
      { name: "Smart Plant Foundation (SPF)", role: "Engineering Information & Document Lifecycle", tag: "Lifecycle DB" },
    ],
  },
  {
    categoryTitle: "AVEVA Plant Suite",
    icon: "3d_rotation",
    items: [
      { name: "Aveva E3D / PDMS", role: "3D Plant Design & Laser Scan Modeling", tag: "3D CAD / Laser" },
      { name: "Aveva PID", role: "Intelligent 2D Piping & Instrumentation Diagrams", tag: "Schematics" },
      { name: "Aveva Instrumentation", role: "Instrument Index, Loops & Wiring Database", tag: "Instrumentation" },
      { name: "Aveva Electrical", role: "Electrical Single Line & Cable Schedules", tag: "Electrical" },
    ],
  },
  {
    categoryTitle: "Bentley Systems",
    icon: "apartment",
    items: [
      { name: "Bentley AutoPlant 3D", role: "Plant Design & Equipment Layouts", tag: "3D Plant" },
      { name: "Bentley OpenPlant 3D", role: "Open 3D Plant Modeling & Isometrics", tag: "Open BIM" },
      { name: "Bentley OpenPlant PID", role: "Intelligent P&ID Schematics", tag: "2D Schematics" },
    ],
  },
  {
    categoryTitle: "Autodesk Platform",
    icon: "polyline",
    items: [
      { name: "AutoCAD Plant 3D", role: "Spec-Driven 3D Piping & Isometrics", tag: "3D Piping" },
      { name: "AutoCAD Plant PID", role: "Piping & Instrumentation Diagrams", tag: "P&ID" },
    ],
  },
];

const industrySpecificTools: SoftwarePillarGroup[] = [
  {
    categoryTitle: "Piping Stress, Pressure Vessels & Tanks",
    icon: "precision_manufacturing",
    items: [
      { name: "CAESAR II", role: "Pipe Stress & Flexibility Analysis", tag: "ASME B31.3 / B31.1" },
      { name: "PVElite", role: "ASME Pressure Vessel & Exchanger Sizing", tag: "ASME Sec VIII" },
      { name: "TANK", role: "Welded Storage Tank Sizing & Evaluation", tag: "API 650 / 620" },
    ],
  },
  {
    categoryTitle: "Power Systems & Electrical Studies",
    icon: "electric_bolt",
    items: [
      { name: "etap", role: "Power System Simulation, Load Flow & Arc Flash", tag: "IEEE 1584 / NFPA" },
      { name: "Dialux", role: "3D Lighting & Lux Level Calculations", tag: "Indoor / Outdoor" },
      { name: "Chamlite", role: "Industrial Lighting Simulation", tag: "Photometrics" },
    ],
  },
  {
    categoryTitle: "Instrumentation & Sizing",
    icon: "sensors",
    items: [
      { name: "InstruCalc", role: "Control Valve, Orifice & Relief Valve Sizing", tag: "ISA 75.01 / API" },
    ],
  },
  {
    categoryTitle: "Civil, Structural & Detailing BIM",
    icon: "domain",
    items: [
      { name: "STAAD.Pro", role: "3D Structural FEA & Dynamic Framing", tag: "AISC 360 / ACI" },
      { name: "Tekla", role: "3D Structural Steel Detailing & Shop Spools", tag: "LOD 400 Steel" },
      { name: "Revit", role: "BIM Architectural & Structural Modeling", tag: "BIM Lifecycle" },
      { name: "AutoCAD", role: "2D/3D Multi-Discipline Engineering Drafting", tag: "General Drafting" },
      { name: "MicroStation", role: "Plant Drafting & Infrastructure Modeling", tag: "CAD Drafting" },
    ],
  },
  {
    categoryTitle: "3D Laser Scanning & Brownfield",
    icon: "blur_on",
    items: [
      { name: "Cyclone", role: "Terrestrial Laser Scan Point Cloud Processing", tag: "Leica Geosystems" },
      { name: "LFM", role: "3D Point Cloud Integration & Clash Verification", tag: "Brownfield BIM" },
    ],
  },
];

export default function ExpertisePage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All 11 Disciplines");

  const categories = [
    "All 11 Disciplines",
    "Piping & Mechanical",
    "Electrical & Instrumentation",
    "Civil & Structural",
    "Process & Flow Assurance",
  ];

  const filteredDisciplines = allDisciplines.filter((item) => {
    if (activeCategory === "All 11 Disciplines") return true;
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
           1. HERO: Classical Geometric Diagonal Angle Split
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[520px] lg:min-h-[560px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-8 bg-[#0b233a]">
          {/* Photographic Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/expertise-design-office.png')",
              backgroundPosition: "center right",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/50" />
            
            {/* Floating Editorial Badges on Right (Desktop) */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white">
              <div className="w-8 h-0.5 bg-[#FF8A00] ml-auto mb-2" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                ENGINEERING DELIVERY CENTERS
              </div>
              <div className="font-display text-sm font-light text-slate-300">
                Navi Mumbai HQ · Chennai Engineering Hub
              </div>
            </div>
          </div>

          {/* Left Navy Angle-Split Polygon */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[68%] z-10 bg-[#0b233a]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 84% 100%, 0% 100%)",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-16 w-full flex flex-col justify-center my-auto py-8">
            <div className="max-w-2xl">
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
                  MULTIDISCIPLINARY CAPABILITIES
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
                11 engineering disciplines. <br />
                <span className="text-[#FF8A00]">One integrated delivery.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-8 max-w-xl">
                Every discipline is structured around clear, audited engineering deliverables — ensuring
                constructability, regulatory compliance, and seamless inter-discipline coordination.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md shadow-[#FF8A00]/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Consult an Engineering Lead</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>

                <a
                  href="#disciplines"
                  className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore 11 Disciplines</span>
                </a>
              </div>

              {/* Telemetry Strip */}
              <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
                <div>
                  <div className="font-display text-2xl font-bold text-[#FF8A00]">11</div>
                  <div className="font-mono text-[10px] text-slate-300 uppercase">Core Disciplines</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-white">100%</div>
                  <div className="font-mono text-[10px] text-slate-300 uppercase">IDC Zero Clash</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#FF8A00]">20+</div>
                  <div className="font-mono text-[10px] text-slate-300 uppercase">CAD/CAE Platforms</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-white">ISO 9001</div>
                  <div className="font-mono text-[10px] text-slate-300 uppercase">QA Certified</div>
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
           3. 11 DISCIPLINE DIRECTORY: Rich Interactive Visual Cards
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-slate-50 border-b border-slate-200" id="disciplines">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            
            {/* Header & Filter Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-2">
                  DISCIPLINE DIRECTORY
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b233a] tracking-tight">
                  Comprehensive Engineering Expertise
                </h2>
                <p className="font-sans text-sm sm:text-base text-slate-600 mt-2 font-light">
                  Standard technical deliverables generated, audited, and issued for construction across all 11 disciplines.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border cursor-pointer select-none",
                      activeCategory === cat
                        ? "bg-[#0b233a] text-white border-[#0b233a] shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-[#FF8A00] hover:text-[#0b233a]"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 11 Discipline Cards Grid: Sleek Full-Bleed Photographic Cards with Hover-Drawer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {filteredDisciplines.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedDiscipline(item as unknown as Discipline)}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs hover:shadow-2xl hover:border-[#FF8A00]/60 transition-all duration-300 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-4 cursor-pointer select-none"
                >
                  {/* Full-bleed Background Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a]/95 via-[#0b233a]/35 to-black/35" />
                  </div>

                  {/* Top Floating Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-xs border border-slate-200/80 text-[11px] font-mono font-bold text-[#0b233a] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-[#FF8A00]">
                        {item.icon}
                      </span>
                      <span>{item.code}</span>
                    </div>

                    <div className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md text-[9px] font-mono font-bold text-amber-300 border border-white/15 uppercase tracking-wider">
                      {item.kpi}
                    </div>
                  </div>

                  {/* Bottom Floating Navy Drawer */}
                  <div className="relative z-10 bg-[#0b233a]/95 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-xl transition-all duration-500 ease-out">
                    {/* Always-Visible Header in Rest State */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[9px] uppercase font-bold text-[#FF8A00] tracking-wider block mb-0.5">
                          DISCIPLINE {item.number} · {item.category}
                        </span>
                        <h3 className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug truncate">
                          {item.title}
                        </h3>
                      </div>

                      {/* Orange Arrow Action Indicator */}
                      <div className="w-8 h-8 rounded-lg bg-[#FF8A00] flex items-center justify-center text-white shrink-0 group-hover:scale-105 group-hover:rotate-[-45deg] transition-all duration-300 shadow-sm">
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </div>
                    </div>

                    {/* Expandable Drawer: Slides Up and Fades in on Hover */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div className="overflow-hidden">
                        <div className="pt-3 mt-2.5 border-t border-white/10 space-y-2.5">
                          <p className="text-[11px] text-slate-300 leading-relaxed font-normal line-clamp-2">
                            {item.summary}
                          </p>

                          {/* Clean Deliverables Chips */}
                          <div className="space-y-1">
                            {item.deliverables.slice(0, 3).map((deliv, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-center gap-1.5 text-[10px] text-slate-200 font-mono"
                              >
                                <span className="material-symbols-outlined text-xs text-[#FF8A00] shrink-0">
                                  check
                                </span>
                                <span className="truncate">{deliv}</span>
                              </div>
                            ))}
                          </div>

                          {/* Software Chips & Trigger */}
                          <div className="flex items-center justify-between pt-2 border-t border-white/10">
                            <div className="flex flex-wrap gap-1">
                              {item.leadSoftware.slice(0, 2).map((tool, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-slate-300"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-[#FF8A00] group-hover:text-amber-300 flex items-center gap-1">
                              <span>Full Scope</span>
                              <span className="material-symbols-outlined text-xs">arrow_forward</span>
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
           4. INTER-DISCIPLINE COORDINATION (IDC) & ZERO-CLASH 3D WORKFLOW
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-2">
                  INTEGRATED DELIVERY GOVERNANCE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b233a] tracking-tight">
                  Inter-Discipline Coordination (IDC) &amp; QA
                </h2>
                <p className="font-sans text-sm sm:text-base text-slate-600 mt-2 font-light">
                  How our 11 disciplines collaborate concurrently to eliminate dimensional clashes, avoid rework, and guarantee constructability.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Zero Dimensional Clash Commitment</span>
              </div>
            </div>

            {/* 4-Stage Process Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  stage: "01",
                  title: "Cross-Discipline Input & DBM",
                  desc: "Process P&IDs, electrical load lists, and site geotechnical data are synchronized across all Discipline Leads before 3D kickoff.",
                  icon: "input",
                },
                {
                  stage: "02",
                  title: "Concurrent 3D CAD/CAE Modeling",
                  desc: "Live multi-discipline modeling in Smart 3D / AVEVA E3D with real-time CAESAR II pipe stress and STAAD.Pro structural load verification.",
                  icon: "view_in_ar",
                },
                {
                  stage: "03",
                  title: "Navisworks Clash Check & Two-Tier QA",
                  desc: "Weekly automated clash reports + mandatory peer review sign-offs by Senior Discipline Leads and QA/QC Directors.",
                  icon: "verified_user",
                },
                {
                  stage: "04",
                  title: "IFC Release & Site TQ Resolution",
                  desc: "Issuance of clash-free Issued-For-Construction drawings, fabrication spool sheets, and active onsite Technical Query management.",
                  icon: "task_alt",
                },
              ].map((item) => (
                <div
                  key={item.stage}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#FF8A00]/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#FF8A00] bg-[#FF8A00]/10 px-2.5 py-1 rounded">
                        STAGE {item.stage}
                      </span>
                      <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-[#0b233a] transition-colors">
                        {item.icon}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-[#0b233a] mb-2 group-hover:text-[#FF8A00] transition-colors">
                      {item.title}
                    </h3>
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
           5. SPECIALIZED SOFTWARE & INDUSTRY TOOLS (100% AUTHENTIC PDF PAGE 8)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-slate-50 border-t border-slate-200" id="software-ecosystem">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-2">
                  TOOLS &amp; INFRASTRUCTURE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0b233a] tracking-tight">
                  Specialized Software &amp; Industry Tools
                </h2>
                <p className="font-sans text-sm sm:text-base text-slate-600 mt-2 font-light">
                  Enterprise licensed engineering platforms and specialized analytical suites deployed across our Mumbai and Chennai delivery centers.
                </p>
              </div>

              {/* Verified Badge */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
                <span className="font-bold text-[#0b233a]">28 Authentic Tools &amp; Platforms</span>
              </div>
            </div>

            {/* 2-Pillar Dual Console (Direct 1:1 Mirror of PDF Page 8) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Pillar 1: Engineering Software & Platforms */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0b233a] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-xl">view_in_ar</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#FF8A00] uppercase tracking-wider block">
                          PILLAR 01 · CAD &amp; DATABASES
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b233a]">
                          Engineering Software &amp; Platforms
                        </h3>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full shrink-0">
                      14 Platforms
                    </span>
                  </div>

                  {/* Ecosystem Groups */}
                  <div className="space-y-6">
                    {engineeringSoftwarePlatforms.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#FF8A00]">
                            {group.icon}
                          </span>
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                            {group.categoryTitle}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {group.items.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100/90 hover:border-[#FF8A00]/50 hover:bg-orange-50/20 transition-all text-xs group"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] shrink-0" />
                                <span className="font-mono font-bold text-[#0b233a] truncate group-hover:text-[#FF8A00] transition-colors">
                                  {item.name}
                                </span>
                              </div>

                              <span className="font-sans text-[11px] text-slate-500 font-light truncate ml-3 shrink-0">
                                {item.role}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar 1 Footer */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>
                    <span>Direct Server &amp; Citrix Integration</span>
                  </span>
                  <span className="text-[#FF8A00] font-bold">100% Verified</span>
                </div>
              </div>

              {/* Pillar 2: Industry Specific Tools */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0b233a] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-xl">precision_manufacturing</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#FF8A00] uppercase tracking-wider block">
                          PILLAR 02 · CAE, FEA &amp; SIZING
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b233a]">
                          Industry Specific Tools
                        </h3>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full shrink-0">
                      14 Specialized Tools
                    </span>
                  </div>

                  {/* Discipline Groups */}
                  <div className="space-y-6">
                    {industrySpecificTools.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#FF8A00]">
                            {group.icon}
                          </span>
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                            {group.categoryTitle}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {group.items.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100/90 hover:border-[#FF8A00]/50 hover:bg-orange-50/20 transition-all text-xs group"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] shrink-0" />
                                <span className="font-mono font-bold text-[#0b233a] truncate group-hover:text-[#FF8A00] transition-colors">
                                  {item.name}
                                </span>
                              </div>

                              <span className="font-sans text-[11px] text-slate-500 font-light truncate ml-3 shrink-0">
                                {item.role}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar 2 Footer */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>
                    <span>Audited Calculation Reports &amp; FEA</span>
                  </span>
                  <span className="text-[#FF8A00] font-bold">ISO 9001 QA</span>
                </div>
              </div>

            </div>

            {/* Bottom Direct Proposal Action Strip */}
            <div className="mt-10 p-6 rounded-2xl bg-[#0b233a] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="font-display text-base font-bold text-white mb-1">
                  Need project delivery on a specific CAD / CAE software platform?
                </h4>
                <p className="font-sans text-xs text-slate-300 font-light">
                  Our engineering teams integrate seamlessly with client database servers, project specs, and software versions.
                </p>
              </div>

              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <span>Consult Software Specialist</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           6. GOVERNING INTERNATIONAL CODES & COMPLIANCE WALL
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-2">
                GLOBAL BENCHMARKS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b233a] tracking-tight">
                Governing International Standards
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { code: "ASME B31.3", title: "Process Piping" },
                { code: "ASME B31.4 / B31.8", title: "Liquid & Gas Pipelines" },
                { code: "API 650 / 620", title: "Storage Tanks" },
                { code: "API 520 / 521", title: "Pressure Relief & Flares" },
                { code: "ASME Sec VIII", title: "Pressure Vessels" },
                { code: "IEC 61850 / 60364", title: "Power & Substations" },
                { code: "IEEE 1584", title: "Arc Flash Safety" },
                { code: "ISA 5.1 / IEC 61508", title: "SIL 2/3 Instrumentation" },
                { code: "AISC 360 / ACI 318", title: "Structural Steel & Concrete" },
                { code: "ISO 19650", title: "BIM Lifecycle Data" },
                { code: "Shell DEP", title: "Operator Specifications" },
                { code: "Saudi Aramco CRPO", title: "Offshore Standards" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center hover:border-[#FF8A00] transition-colors"
                >
                  <div className="font-mono text-xs font-bold text-[#0b233a]">{item.code}</div>
                  <div className="font-sans text-[10px] text-slate-500 font-light">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           7. ACTION CTA
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-[#0b233a] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
            <div className="w-8 h-1 bg-[#FF8A00] mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Explore how our disciplines integrate for your project
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base font-light leading-relaxed">
              Connect directly with our multidisciplinary design leads in Mumbai and Chennai to review your technical scope and deliverable schedule.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-8 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md shadow-[#FF8A00]/20"
              >
                <span>Request Scope Review</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <Link
                href="/projects"
                className="border border-white/40 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View Delivered Projects</span>
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
    </div>
  );
}

