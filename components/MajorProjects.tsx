"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCase {
  id: string;
  code: string;
  title: string;
  client: string;
  endUser: string;
  location: string;
  manHours: string;
  deliverables: string;
  year: string;
  category: string;
  summary: string;
  highlights: string[];
  image: string;
}

const realProjects: ProjectCase[] = [
  {
    id: "adnoc-ruwais",
    code: "PRJ-01",
    title: "Train-3 Reflux Pumps Lifting System",
    client: "Avenir",
    endUser: "ADNOC",
    location: "Ruwais, UAE",
    manHours: "1,200+ Hours",
    deliverables: "12 Deliverables",
    year: "2026",
    category: "Structural & Piping",
    summary:
      "Detailed engineering for lifting arrangements of Train-3 Reflux Pumps & Motors at ADNOC Ruwais, covering structural, piping, and electrical deliverables for safe maintenance.",
    highlights: [
      "Rigging & Heavy Lifting Handling Study",
      "Structural Calculations & Fabrication Drawings",
      "CAESAR II Pipe Stress & Flexibility GADs",
    ],
    image: "/media/saur-fabrication-projects.png",
  },
  {
    id: "jindal-gas-heater",
    code: "PRJ-02",
    title: "Process Gas Heater 3D Modeling & E&I",
    client: "Novargi Engineering",
    endUser: "Jindal Steel & Power",
    location: "India",
    manHours: "600+ Hours",
    deliverables: "44+ Deliverables",
    year: "2026",
    category: "Electrical & 3D Model",
    summary:
      "Electrical 3D modeling, equipment layout development, cable tray routing, lighting simulation, vendor document reviews, and 2D drawing extractions.",
    highlights: [
      "Electrical 3D Model in S3D & Layouts",
      "Cable Tray Sizing & Routing Schedules",
      "Dialux Lighting Simulation Reports",
    ],
    image: "/images/electrical.png",
  },
  {
    id: "adnoc-aip5",
    code: "PRJ-03",
    title: "AiP5 Onshore 132 Wellhead Instrumentation",
    client: "Petrocon Engineers",
    endUser: "ADNOC",
    location: "Bab & Buhasa, UAE",
    manHours: "7,000 Hours",
    deliverables: "269 Deliverables",
    year: "2024",
    category: "Instrumentation & SPI",
    summary:
      "Instrumentation detail engineering for 132 onshore well pads including ESP, GLW, WIW, WAG, OPW, and PWDW wells with full 3D modeling and cable schedules.",
    highlights: [
      "SmartPlant SPI Database & I/O Mapping",
      "Cable & Junction Box Interconnections",
      "Hydraulic Tubing & Hook-Up Schedules",
    ],
    image: "/media/expertise-design-office.png",
  },
  {
    id: "emarat-pipeline",
    code: "PRJ-04",
    title: "6km Natural Gas Pipeline EPC",
    client: "Tekzone",
    endUser: "EMARAT",
    location: "UAE",
    manHours: "12,500 Hours",
    deliverables: "Full EPC DED",
    year: "2024-2026",
    category: "Pipeline Engineering",
    summary:
      "Complete engineering design from concept to commissioning for a 6km cross-country natural gas pipeline, including alignment sheets and crossing details.",
    highlights: [
      "Concept to Commissioning DED Package",
      "Route Alignment & River Crossing HDD",
      "Pipeline Stress & Wall Sizing (B31.8)",
    ],
    image: "/media/saur-industrial-hero.png",
  },
  {
    id: "tuban-refinery",
    code: "PRJ-05",
    title: "Tuban Grass Root Refinery FEED & Stress",
    client: "Technip Energies",
    endUser: "Pertamina",
    location: "Tuban, Indonesia",
    manHours: "4,500 Hours",
    deliverables: "85 Deliverables",
    year: "2023-2025",
    category: "Process & Piping",
    summary:
      "Piping stress analysis, column piping layout development, and static equipment nozzle load calculations for mega grassroots refinery units.",
    highlights: [
      "CAESAR II Critical High-Temp Stress Runs",
      "Distillation Column Trims & Platforms",
      "API 650 Storage Tank Farm Integration",
    ],
    image: "/images/process.png",
  },
  {
    id: "substation-infrastructure",
    code: "PRJ-06",
    title: "400kV Substation & Cable Routing DED",
    client: "EPC Contractor",
    endUser: "National Grid",
    location: "Middle East",
    manHours: "3,200 Hours",
    deliverables: "60 Deliverables",
    year: "2025",
    category: "Electrical & Structural",
    summary:
      "Detailed engineering for a 400kV high-voltage gas insulated substation (GIS) including gantry structural design, earthing grids, and protection SLDs.",
    highlights: [
      "ETAP Short Circuit & Load Flow Studies",
      "GIS Substation Building & Gantry STAAD",
      "Earthing & Lightning Protection Systems",
    ],
    image: "/media/page-services-hero.png",
  },
];

export default function MajorProjects() {
  const baseCount = realProjects.length;
  // Triple array for seamless infinite wrap-around
  const allItems = [...realProjects, ...realProjects, ...realProjects];

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

  const activeProjectIndex = ((currentIndex % baseCount) + baseCount) % baseCount;
  const step = metrics.cardWidth + metrics.gap;
  const trackOffset = (metrics.containerWidth - metrics.cardWidth) / 2;
  const targetX = trackOffset - currentIndex * step;

  const transitionConfig = isResetting
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] };

  return (
    <section id="projects" className="py-14 sm:py-16 md:py-24 bg-[#f8fafc] text-slate-800 relative border-t border-slate-200 overflow-hidden">
      {/* Subtle Micro-Grid */}
      <div className="absolute inset-0 micro-grid opacity-25 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 relative z-10">
        
        {/* Section Header with Figure Pre-Title & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <span className="text-xs text-[#FF8A00] font-bold uppercase tracking-wider block mb-2">
              FEATURED PROJECTS &amp; TRACK RECORD
            </span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0b233a] leading-tight">
              Major Projects Executed — Proven Delivery
            </h2>
            <p className="font-sans text-xs sm:text-base text-slate-600 mt-2 sm:mt-3 leading-relaxed font-light">
              Delivering multidisciplinary engineering, 3D plant modeling, and site execution support for global industry leaders.
            </p>
          </div>

          {/* Navigation Controls on Right */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
            <div className="font-mono text-xs text-slate-500 font-semibold">
              <span className="text-[#FF8A00] font-bold">0{activeProjectIndex + 1}</span> / 0{realProjects.length} Projects
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 hover:border-[#FF8A00] hover:text-[#FF8A00] text-slate-700 flex items-center justify-center transition-all shadow-sm hover:shadow active:scale-95"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">arrow_back</span>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next project"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0b233a] hover:bg-[#FF8A00] text-white flex items-center justify-center transition-all shadow-sm hover:shadow active:scale-95"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
              </button>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0b233a] hover:text-[#FF8A00] hover:border-[#FF8A00] transition-all shadow-xs"
            >
              <span>All Projects</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
           Center-Stage Elevated Carousel (Matching Infinite Fluid Sliding Track)
           ══════════════════════════════════════════════════════════════════════ */}
        <div
          ref={containerRef}
          className="relative pt-4 pb-8 overflow-hidden select-none touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={pauseAutoCycle}
        >
          {/* Continuous Sliding Horizontal Track with GPU acceleration & Touch Drag */}
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
              {allItems.map((p, idx) => {
                const isCenter = idx === currentIndex;

                return (
                  <motion.div
                    key={`${p.id}-${idx}`}
                    onClick={() => {
                      if (isDraggingRef.current) return;
                      if (!isCenter) {
                        setIsResetting(false);
                        setCurrentIndex(idx);
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
                      "shrink-0 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-shadow duration-500 cursor-pointer flex flex-col justify-between select-none min-h-[440px] sm:min-h-[460px]",
                      isCenter
                        ? "border-slate-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] ring-1 ring-slate-200/80 z-20"
                        : "border-slate-200 shadow-sm hover:opacity-80 z-10"
                    )}
                  >
                    {/* Top Image Frame with Floating Telemetry */}
                    <div>
                      <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-900 mb-5 shadow-xs group">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                        {/* Top Floating Client Badge */}
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[#0b233a] text-[10px] font-mono font-bold uppercase shadow-sm border border-slate-200">
                            {p.endUser}
                          </span>
                        </div>

                        {/* Top Right Hours Pill */}
                        <div className="absolute top-3.5 right-3.5 z-10">
                          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-white/10 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                            {p.manHours}
                          </span>
                        </div>

                        {/* Bottom Deliverables Pill inside image */}
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-md bg-[#FF8A00] text-white font-mono text-[10px] font-bold">
                            {p.deliverables}
                          </span>
                        </div>
                      </div>

                      {/* Metadata Line */}
                      <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                        <span className="text-[#FF8A00]">{p.code}</span>
                        <span>{p.year} · {p.location}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0b233a] leading-tight mb-2 flex items-center justify-between group">
                        <span>{p.title}</span>
                        <span className="material-symbols-outlined text-lg text-slate-400 group-hover:text-[#FF8A00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                          north_east
                        </span>
                      </h3>

                      {/* Plain Language Summary */}
                      <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 font-light">
                        {p.summary}
                      </p>
                    </div>

                    {/* Bottom Scope Highlights & Action */}
                    <div className="pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {p.highlights.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-sans font-medium"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="/projects"
                        className="flex items-center justify-between text-xs font-bold text-[#FF8A00] hover:text-[#E67C00] pt-1"
                      >
                        <span>Inspect Full Case Study</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {realProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to ${p.title}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeProjectIndex === idx ? "w-8 bg-[#FF8A00]" : "w-2 bg-slate-200 hover:bg-slate-300"
                )}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

