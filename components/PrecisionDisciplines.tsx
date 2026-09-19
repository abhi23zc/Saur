"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Discipline {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedSpecs: {
    tolerances: string;
    materials: string;
    standards: string;
    efficiency: string;
    deliverables: string[];
  };
  image: string;
  badge: string;
  metrics: { label: string; value: string; color?: string }[];
}

export const disciplinesData: Discipline[] = [
  {
    id: "piping-mechanical",
    title: "Piping & Mechanical Engineering",
    category: "Piping & Mechanical",
    description:
      "Complete piping layout design, 3D equipment modeling, CAESAR II stress analysis, isometric generation, and material take-offs (MTO/BOM).",
    detailedSpecs: {
      tolerances: "CAESAR II, PVElite, AutoCAD Plant 3D, TANK",
      materials: "Carbon Steel, Stainless Steel, Duplex, Inconel, Alloy Steel",
      standards: "ASME B31.3 / B31.1 / B31.8, API 650 / 620, ASME Sec VIII",
      efficiency: "100% Clash-Free 3D Routing & ISO 9001 QA Check",
      deliverables: [
        "Piping General Arrangement Drawings (GAD)",
        "Piping Isometrics & Vessel Trims",
        "CAESAR II Pipe Stress & Flexibility Analysis",
        "Static Equipment GA & Fabrication Drawings",
        "Material Take-Off (MTO) & Support Schedule",
      ],
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkhErjNQUcUeDVSPQNKKfFvm-nrxzUy1Lan7GwyCy7yIBYvA16Scgtfc&s=10",
    badge: "Core Discipline",
    metrics: [
      { label: "STANDARDS", value: "ASME / API", color: "text-[#FF8A00]" },
      { label: "DELIVERY", value: "IFC / As-Built", color: "text-white" },
    ],
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering",
    category: "Electrical",
    description:
      "Substation layouts, power system studies, Single Line Diagrams (SLD), cable tray routing, and industrial lighting calculations.",
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
    image:
      "https://www.eaton.com/content/dam/eaton/products/low-voltage-power-distribution-control-systems/switchboards/pow-r-line-xd-switchboard/pow-r-line-xd-switchboard-isometric-front-view.jpg",
    badge: "Power Systems",
    metrics: [
      { label: "TOOLS", value: "ETAP / SEL", color: "text-[#FF8A00]" },
      { label: "ACCURACY", value: "100% Verified", color: "text-white" },
    ],
  },
  {
    id: "instrumentation-control",
    title: "Instrumentation & Control",
    category: "Instrumentation",
    description:
      "Field instrumentation design, SmartPlant Instrumentation (SPI), loop diagrams, cable schedules, and control room architecture.",
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
    image:
      "https://neometrixgroup.com/products/imgs/mwf-coolant-monitoring-skid.jpg",
    badge: "Smart Automation",
    metrics: [
      { label: "SYSTEMS", value: "SPI / DCS", color: "text-[#FF8A00]" },
      { label: "SAFETY", value: "SIL 2 / SIL 3", color: "text-white" },
    ],
  },
  {
    id: "process-engineering",
    title: "Process Engineering",
    category: "Process",
    description:
      "Process Flow Diagrams (PFD), Piping & Instrumentation Diagrams (P&ID), control philosophies, cause & effect, and equipment sizing.",
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
    image:
      "https://t3.ftcdn.net/jpg/19/42/33/00/360_F_1942330057_D050Umlm30cCrZ63tnbiqNjyMFPY2oGo.jpg",
    badge: "Design Basis",
    metrics: [
      { label: "P&ID VERIFIED", value: "100%", color: "text-[#FF8A00]" },
      { label: "PLATFORMS", value: "SmartPID / AVEVA", color: "text-white" },
    ],
  },
  {
    id: "plant-3d-modeling",
    title: "3D Plant Modeling & BIM",
    category: "3D Plant Modeling",
    description:
      "Complete multi-discipline 3D modeling using Smart 3D (S3D) and AVEVA E3D/PDMS, clash detection, and automated 2D drawing extraction.",
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
    image:
      "https://ars.els-cdn.com/content/image/1-s2.0-S2352012425003649-gr1.jpg",
    badge: "Smart 3D & E3D",
    metrics: [
      { label: "MODELING", value: "S3D / E3D", color: "text-[#FF8A00]" },
      { label: "CLASHES", value: "Zero Tolerance", color: "text-white" },
    ],
  },
  {
    id: "telecommunication",
    title: "Telecommunication Engineering",
    category: "Telecom",
    description:
      "Plant telecommunications design, CCTV surveillance, Public Address & General Alarm (PAGA), and fiber optic network infrastructure.",
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
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    badge: "Plant Security",
    metrics: [
      { label: "COVERAGE", value: "100% Plant Wide", color: "text-[#FF8A00]" },
      { label: "SYSTEMS", value: "PAGA / CCTV / FO", color: "text-white" },
    ],
  },
  {
    id: "civil-structural",
    title: "Civil & Structural Engineering",
    category: "Structural & Civil",
    description:
      "Structural steel framing, equipment foundations, pipe racks, heavy lifting rigging studies, and blast-resistant building design.",
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
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    badge: "Structural Rigor",
    metrics: [
      { label: "ANALYSIS", value: "STAAD.Pro", color: "text-[#FF8A00]" },
      { label: "FOUNDATIONS", value: "Heavy Industrial", color: "text-white" },
    ],
  },
  {
    id: "pipeline-engineering",
    title: "Pipeline & Alignment Engineering",
    category: "Pipeline",
    description:
      "Cross-country pipeline design, alignment sheets, crossing drawings (HDD/thrust boring), stress analysis, and route optimization.",
    detailedSpecs: {
      tolerances: "AutoCAD, CAESAR II, Google Earth Pro, GIS Tools",
      materials: "API 5L Line Pipe (Grade B to X70), 3LPE Coating",
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
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    badge: "Cross-Country",
    metrics: [
      { label: "PIPELINES", value: "Gas & Liquid", color: "text-[#FF8A00]" },
      { label: "CODES", value: "ASME B31.4/8", color: "text-white" },
    ],
  },
];

interface PrecisionDisciplinesProps {
  onSelectDiscipline: (discipline: Discipline) => void;
}

export default function PrecisionDisciplines({
  onSelectDiscipline,
}: PrecisionDisciplinesProps) {
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Disciplines" },
    { id: "piping-mechanical", label: "Piping & Mechanical" },
    { id: "electrical-engineering", label: "Electrical" },
    { id: "instrumentation-control", label: "Instrumentation" },
    { id: "process-engineering", label: "Process" },
    { id: "plant-3d-modeling", label: "3D Plant Modeling" },
    { id: "civil-structural", label: "Structural" },
    { id: "pipeline-engineering", label: "Pipeline" },
  ];

  const filteredDisciplines =
    filter === "all"
      ? disciplinesData
      : disciplinesData.filter((d) => d.id === filter);

  return (
    <section id="disciplines" className="py-20 md:py-28 bg-[#f8fafc] relative border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
              Multidisciplinary Capabilities
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#0b233a]">
              Engineering Disciplines
            </h2>
            <p className="font-sans text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
              We provide full-spectrum engineering and 3D modeling across all 11 core disciplines, meeting international codes and client specifications.
            </p>
          </div>

          {/* Quick Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  filter === cat.id
                    ? "bg-[#0b233a] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Discipline Cards Grid with Hostinger Hover Drawer Pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDisciplines.map((discipline) => (
              <motion.div
                key={discipline.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectDiscipline(discipline)}
                className="group relative h-[340px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-[#07131e]"
              >
                {/* Background Image */}
                <img
                  src={discipline.image}
                  alt={discipline.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07131e] via-[#07131e]/60 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 rounded bg-[#07131e]/85 backdrop-blur-md border border-white/15 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {discipline.badge}
                  </span>
                </div>

                {/* Top Right Inspect Icon */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#FF8A00] text-white flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-base">visibility</span>
                </div>

                {/* Bottom Content & Hover Slide-Up Drawer */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end bg-gradient-to-t from-[#07131e] via-[#07131e]/90 to-transparent pt-12">
                  <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-wider block mb-1">
                    {discipline.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-[#FF8A00] transition-colors">
                    {discipline.title}
                  </h3>

                  {/* Rest State Short Description */}
                  <p className="font-sans text-xs text-slate-300 line-clamp-2 leading-relaxed mb-1 group-hover:hidden">
                    {discipline.description}
                  </p>

                  {/* Hover Slide-up Details */}
                  <div className="hidden group-hover:block transition-all duration-300 space-y-2.5 pt-1">
                    <p className="font-sans text-xs text-slate-200 leading-relaxed">
                      {discipline.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {discipline.detailedSpecs.deliverables.slice(0, 2).map((del, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-[10px] font-sans border border-white/10 truncate max-w-full"
                        >
                          ✓ {del}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#FF8A00]">
                      <span>View Specifications</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
