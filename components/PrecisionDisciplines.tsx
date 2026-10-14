"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Discipline {
  id: string;
  code: string;
  title: string;
  category: string;
  badge: string;
  kpi: string;
  description: string;
  detailedSpecs: {
    tolerances: string;
    materials: string;
    standards: string;
    efficiency: string;
    deliverables: string[];
  };
  image: string;
  metrics: { label: string; value: string; color?: string }[];
}

export const disciplinesData: Discipline[] = [
  {
    id: "piping-mechanical",
    code: "01",
    title: "Piping & Mechanical Engineering",
    category: "Piping & Mechanical",
    badge: "CAESAR II · SP3D / E3D",
    kpi: "ZERO CLASH 3D ROUTING",
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
    image: "/media/saur-fabrication-projects.png",
    metrics: [
      { label: "STANDARDS", value: "ASME / API", color: "text-[#FF8A00]" },
      { label: "DELIVERY", value: "IFC / As-Built", color: "text-slate-900" },
    ],
  },
  {
    id: "electrical-engineering",
    code: "02",
    title: "Electrical Engineering",
    category: "Electrical",
    badge: "ETAP · Smart Electrical",
    kpi: "LOAD FLOW & ARC FLASH",
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
    image: "/images/electrical.png",
    metrics: [
      { label: "TOOLS", value: "ETAP / SEL", color: "text-[#FF8A00]" },
      { label: "ACCURACY", value: "100% Verified", color: "text-slate-900" },
    ],
  },
  {
    id: "instrumentation-control",
    code: "03",
    title: "Instrumentation & Control",
    category: "Instrumentation",
    badge: "SmartPlant SPI · InstruCalc",
    kpi: "SIL 2/3 SAFETY LOOPS",
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
    image: "/media/expertise-design-office.png",
    metrics: [
      { label: "SYSTEMS", value: "SPI / DCS", color: "text-[#FF8A00]" },
      { label: "SAFETY", value: "SIL 2 / SIL 3", color: "text-slate-900" },
    ],
  },
  {
    id: "process-engineering",
    code: "04",
    title: "Process Engineering & Flow",
    category: "Process",
    badge: "SmartPID · Aspen HYSYS",
    kpi: "HEAT & MASS BALANCE",
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
    image: "/images/process.png",
    metrics: [
      { label: "P&ID VERIFIED", value: "100%", color: "text-[#FF8A00]" },
      { label: "PLATFORMS", value: "SmartPID / AVEVA", color: "text-slate-900" },
    ],
  },
  {
    id: "plant-3d-modeling",
    code: "05",
    title: "3D Plant Modeling & BIM",
    category: "3D Plant Modeling",
    badge: "Intergraph S3D · AVEVA E3D",
    kpi: "MULTI-DISCIPLINE BIM",
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
    image: "/media/saur-engineering-coordination.png",
    metrics: [
      { label: "MODELING", value: "S3D / E3D", color: "text-[#FF8A00]" },
      { label: "CLASHES", value: "Zero Tolerance", color: "text-slate-900" },
    ],
  },
  {
    id: "civil-structural",
    code: "06",
    title: "Civil & Structural Engineering",
    category: "Structural & Civil",
    badge: "STAAD.Pro · Tekla",
    kpi: "BLAST & SEISMIC RIGOR",
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
    image: "/media/page-services-hero.png",
    metrics: [
      { label: "ANALYSIS", value: "STAAD.Pro", color: "text-[#FF8A00]" },
      { label: "FOUNDATIONS", value: "Heavy Industrial", color: "text-slate-900" },
    ],
  },
  {
    id: "telecommunication",
    code: "07",
    title: "Telecommunication Engineering",
    category: "Telecom",
    badge: "PAGA · CCTV · Fiber",
    kpi: "100% PLANT COVERAGE",
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
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "COVERAGE", value: "100% Plant Wide", color: "text-[#FF8A00]" },
      { label: "SYSTEMS", value: "PAGA / CCTV / FO", color: "text-slate-900" },
    ],
  },
  {
    id: "pipeline-engineering",
    code: "08",
    title: "Pipeline & Alignment Engineering",
    category: "Pipeline",
    badge: "CAESAR II · GIS Route",
    kpi: "CROSS-COUNTRY DED",
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
    image: "/media/saur-industrial-hero.png",
    metrics: [
      { label: "PIPELINES", value: "Gas & Liquid", color: "text-[#FF8A00]" },
      { label: "CODES", value: "ASME B31.4/8", color: "text-slate-900" },
    ],
  },
  {
    id: "subsea-engineering",
    code: "09",
    title: "Subsea & Marine Engineering",
    category: "Offshore & Marine",
    badge: "DNV · Subsea Tiedowns",
    kpi: "OFFSHORE ASSETS",
    description:
      "Offshore wellhead platforms, topside tie-in engineering, subsea clamp designs, marine transportation, and sea-fastening calculations.",
    detailedSpecs: {
      tolerances: "STAAD.Pro, AutoCAD, Mathcad",
      materials: "High-Strength Structural Steel, Marine Anti-Corrosion Coatings",
      standards: "DNV Standards, API RP 2A, ISO 19902",
      efficiency: "Offshore Marine Rigor & Certified Constructability",
      deliverables: [
        "Offshore Platform Tie-In Engineering Packages",
        "Subsea Clamps & Riser Protector Details",
        "Topside Equipment Skid Calculations",
        "Marine Transportation & Sea-Fastening Analysis",
        "Offshore Constructability & Installation Plans",
      ],
    },
    image: "/media/page-company-hero.png",
    metrics: [
      { label: "OFFSHORE", value: "DNV Compliant", color: "text-[#FF8A00]" },
      { label: "PLATFORMS", value: "Tie-In / Wellhead", color: "text-slate-900" },
    ],
  },
  {
    id: "flow-assurance",
    code: "10",
    title: "Flow Assurance & Thermal Hydraulics",
    category: "Process & Flow",
    badge: "Hydraulics · Surge",
    kpi: "TRANSIENT HYDRAULICS",
    description:
      "Steady-state and transient hydraulic analysis, surge pressure verification, insulation optimization, and slug catcher sizing.",
    detailedSpecs: {
      tolerances: "Aspen HYSYS, Hydraulic Solvers, Mathcad",
      materials: "Multiphase Flow, Condensate, High-Pressure Hydrocarbons",
      standards: "API RP 14E, ASME B31.3, Client Criteria",
      efficiency: "Elimination of Hydraulic Surges & Slugging Risks",
      deliverables: [
        "Steady-State Pressure Drop & Flow Profiles",
        "Water Hammer & Surge Analysis Calculation Reports",
        "Hydrate & Wax Deposition Mitigation Studies",
        "Thermal Insulation Thickness Calculations",
        "Slug Catcher Volume & Sizing Reports",
      ],
    },
    image: "/images/process.png",
    metrics: [
      { label: "ANALYSIS", value: "Hydraulics", color: "text-[#FF8A00]" },
      { label: "RISK", value: "Zero Surge", color: "text-slate-900" },
    ],
  },
  {
    id: "yard-fabrication",
    code: "11",
    title: "Yard Fabrication & Modular Skids",
    category: "Fabrication & Yard",
    badge: "Spoolgen · LOD 400",
    kpi: "SHOP-READY SPOOLS",
    description:
      "Shop fabrication isometrics, modular skid detailing, pipe support fabrication shop drawings, and lifting rig designs.",
    detailedSpecs: {
      tolerances: "Spoolgen, Tekla Structures, AutoCAD",
      materials: "Carbon Steel, Duplex, Structural Steel, Modular Skids",
      standards: "ASME Sec IX, AWS D1.1, Fabrication Yard Specs",
      efficiency: "LOD 400 Shop-Ready Drawings for Zero Site Rework",
      deliverables: [
        "Fabrication Shop Isometrics with Cut-Length Spool Splits",
        "Chemical & Utility Injection Skid Shop Drawings",
        "Pipe Support Fabrication Details & Weld Schedules",
        "Lifting Lug Calculations & Spreader Beam Details",
        "Fabrication As-Built Redline Integration",
      ],
    },
    image: "/images/mechanical.png",
    metrics: [
      { label: "LOD LEVEL", value: "LOD 400", color: "text-[#FF8A00]" },
      { label: "FABRICATION", value: "Shop Ready", color: "text-slate-900" },
    ],
  },
];

interface PrecisionDisciplinesProps {
  onSelectDiscipline: (discipline: Discipline) => void;
  sectionId?: string;
  preTitle?: string;
  title?: string;
  description?: string;
  viewAllHref?: string;
  viewAllText?: string;
}

export default function PrecisionDisciplines({
  onSelectDiscipline,
  sectionId = "disciplines",
  preTitle = "CORE CAPABILITIES",
  title = "Engineering Disciplines — Live Delivery",
  description = "Explore the 11 core engineering disciplines and technical deliverables we execute for global Oil & Gas, EPC, and heavy industrial assets.",
  viewAllHref,
  viewAllText = "View All 11 Disciplines",
}: PrecisionDisciplinesProps) {
  const baseCount = disciplinesData.length;
  // Triple the array to create seamless infinite wrap-around
  const allItems = [...disciplinesData, ...disciplinesData, ...disciplinesData];

  const [currentIndex, setCurrentIndex] = useState<number>(baseCount);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [metrics, setMetrics] = useState({ cardWidth: 380, gap: 24, containerWidth: 1200 });

  const pauseAutoCycle = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  };

  // Measure container and card dynamically for pixel-perfect centering
  useEffect(() => {
    const updateMetrics = () => {
      if (!containerRef.current) return;
      const cWidth = containerRef.current.offsetWidth;
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const cW = isMobile ? Math.min(290, cWidth - 48) : isTablet ? 340 : 380;
      const g = isMobile ? 12 : 24;
      setMetrics({ cardWidth: cW, gap: g, containerWidth: cWidth });
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  // Automatic carousel cycling (3.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIsResetting(false);
      setCurrentIndex((prev) => prev + 1);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused]);

  const lastWheelTimeRef = useRef<number>(0);
  const handleWheel = (e: React.WheelEvent) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isHorizontal ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) < 20) return;

    const now = Date.now();
    if (now - lastWheelTimeRef.current < 400) return;
    lastWheelTimeRef.current = now;

    pauseAutoCycle();
    if (delta > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const handlePrev = () => {
    setIsResetting(false);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsResetting(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDotClick = (dotIdx: number) => {
    setIsResetting(false);
    const activeModulo = ((currentIndex % baseCount) + baseCount) % baseCount;
    const diff = dotIdx - activeModulo;
    setCurrentIndex((prev) => prev + diff);
  };

  // Seamless wrap-around after animation completes without visual snapping
  const handleAnimationComplete = () => {
    if (currentIndex >= baseCount * 2) {
      setIsResetting(true);
      setCurrentIndex((prev) => prev - baseCount);
    } else if (currentIndex < baseCount) {
      setIsResetting(true);
      setCurrentIndex((prev) => prev + baseCount);
    }
  };

  const activeDisciplineIndex = ((currentIndex % baseCount) + baseCount) % baseCount;
  const step = metrics.cardWidth + metrics.gap;
  const trackOffset = (metrics.containerWidth - metrics.cardWidth) / 2;
  const targetX = trackOffset - currentIndex * step;

  const transitionConfig = isResetting
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] };

  return (
    <section id={sectionId} className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 micro-grid opacity-25 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 relative z-10">
        
        {/* Top Header & Discipline Counter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div className="flex-1 min-w-0 pr-4 sm:pr-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 sm:w-10 h-1 bg-[#FF8A00] rounded-full shrink-0" />
              <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.18em] font-extrabold text-[#FF8A00]">
                CORE DISCIPLINES &amp; SERVICES
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] xl:text-[2.65rem] font-bold tracking-tight text-[#0b233a] leading-tight lg:whitespace-nowrap">
              {title}
            </h2>
            <p className="font-sans text-base sm:text-lg text-slate-600 mt-2.5 leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>

          {/* Header Controls on Right: Counter & All Disciplines Link */}
          <div className="flex items-center gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <div className="font-mono text-xs text-slate-500 font-semibold">
              <span className="text-[#FF8A00] font-bold">{String(activeDisciplineIndex + 1).padStart(2, "0")}</span> / {String(disciplinesData.length).padStart(2, "0")} Disciplines
            </div>

            {viewAllHref && (
              <a
                href={viewAllHref}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0b233a] hover:text-[#FF8A00] hover:border-[#FF8A00] transition-all shadow-xs"
              >
                <span>{viewAllText}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
           Center-Stage Elevated Carousel with Side-Scroll & Direct Card Arrows
           ══════════════════════════════════════════════════════════════════════ */}
        <div
          ref={containerRef}
          className="relative pt-4 pb-8 overflow-hidden select-none touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={pauseAutoCycle}
          onWheel={handleWheel}
        >
          {/* Continuous Sliding Horizontal Track with GPU acceleration & Touch Pan */}
          <div className="w-full py-4">
            <motion.div
              onPanStart={() => {
                isDraggingRef.current = true;
                pauseAutoCycle();
              }}
              onPanEnd={(_, info) => {
                setTimeout(() => {
                  isDraggingRef.current = false;
                }, 80);
                pauseAutoCycle();

                if (info.offset.x < -30 || info.velocity.x < -150) {
                  handleNext();
                } else if (info.offset.x > 30 || info.velocity.x > 150) {
                  handlePrev();
                }
              }}
              animate={{ x: targetX }}
              transition={transitionConfig}
              onAnimationComplete={handleAnimationComplete}
              style={{
                gap: `${metrics.gap}px`,
                willChange: "transform",
              }}
              className="flex items-center cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {allItems.map((disc, idx) => {
                const isCenter = idx === currentIndex;

                return (
                  <motion.div
                    key={`${disc.id}-${idx}`}
                    onClick={() => {
                      if (isDraggingRef.current) return;
                      if (!isCenter) {
                        setIsResetting(false);
                        setCurrentIndex(idx);
                      } else {
                        onSelectDiscipline(disc);
                      }
                    }}
                    style={{ width: `${metrics.cardWidth}px` }}
                    animate={{
                      scale: isCenter ? 1 : 0.92,
                      y: isCenter ? -6 : 0,
                      opacity: isCenter ? 1 : 0.5,
                    }}
                    transition={transitionConfig}
                    className={cn(
                      "shrink-0 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all duration-500 cursor-pointer flex flex-col justify-between select-none min-h-[440px] sm:min-h-[460px] relative group/card",
                      isCenter
                        ? "border-slate-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] ring-1 ring-slate-200/80 z-20"
                        : "border-slate-200 shadow-sm hover:opacity-90 z-10"
                    )}
                  >
                    {/* Top Image Frame with Floating Badge */}
                    <div>
                      <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-900 mb-5 shadow-xs">
                        <img
                          src={disc.image}
                          alt={disc.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                        {/* Top Floating Telemetry Badge */}
                        <div className="absolute top-3.5 right-3.5 z-10">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-sm border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                            {disc.kpi}
                          </span>
                        </div>

                        {/* Bottom Software Pill inside image */}
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-bold border border-white/10">
                            {disc.badge}
                          </span>
                        </div>
                      </div>

                      {/* Discipline Title */}
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0b233a] leading-tight mb-2">
                        {disc.title}
                      </h3>

                      {/* Plain English Description */}
                      <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 font-light">
                        {disc.description}
                      </p>
                    </div>

                    {/* Bottom Deliverables Pill Bar */}
                    <div className="pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {disc.detailedSpecs.deliverables.slice(0, 2).map((del, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-sans font-medium"
                          >
                            ✓ {del}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDiscipline(disc);
                        }}
                        className="flex items-center justify-between text-xs font-bold text-[#FF8A00] hover:text-[#E67C00] pt-1 w-full text-left cursor-pointer"
                      >
                        <span>Inspect Full Specification</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {disciplinesData.map((d, idx) => (
              <button
                key={d.id}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to ${d.title}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeDisciplineIndex === idx ? "w-8 bg-[#FF8A00]" : "w-2 bg-slate-200 hover:bg-slate-300"
                )}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
