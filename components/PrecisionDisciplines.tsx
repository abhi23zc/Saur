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
    id: "mechanical-systems",
    title: "Mechanical Systems",
    category: "Mechanical",
    description:
      "Designing high-precision mechanical components and turbine systems for industrial applications. Ultra-sharp detail, polished steel, and premium technical integration.",
    detailedSpecs: {
      tolerances: "±0.001mm micro-machining accuracy",
      materials: "Titanium Grade 5, Super Invar, Inconel 718",
      standards: "ISO 9001:2015, AS9100D, ASME Section VIII",
      efficiency: "98.4% thermal and mechanical conversion rate",
      deliverables: [
        "High-RPM Turbine Assemblies",
        "Kinetic Energy Storage Rotors",
        "Cryogenic Valve Manifolds",
        "Structural Dynamic Shock Absorbers",
      ],
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkhErjNQUcUeDVSPQNKKfFvm-nrxzUy1Lan7GwyCy7yIBYvA16Scgtfc&s=10",
    badge: "Primary Domain",
    metrics: [
      { label: "EFFICIENCY", value: "98.4%", color: "text-[#FF8A00]" },
      { label: "UPTIME", value: "24/7/365", color: "text-white" },
    ],
  },
  {
    id: "electrical-instrumentation",
    title: "Electrical & Instrumentation",
    category: "Electrical",
    description:
      "Delivering robust electrical networks and precise instrumentation systems. From detailed design to turnkey E&I project execution.",
    detailedSpecs: {
      tolerances: "Sub-millisecond data acquisition",
      materials: "Industrial Grade Sensors, Flameproof Enclosures",
      standards: "IEC 61511, ISA, IEEE Standards",
      efficiency: "99.9% network reliability",
      deliverables: [
        "2D/3D Design & Drafting",
        "As-built documentation",
        "Control System Architecture",
        "Field Instrument Calibration",
      ],
    },
    image:
      "https://neometrixgroup.com/products/imgs/mwf-coolant-monitoring-skid.jpg",
    badge: "Turnkey E&I",
    metrics: [
      { label: "RELIABILITY", value: "99.9%", color: "text-[#FF8A00]" },
      { label: "STANDARDS", value: "IEC/ISA", color: "text-white" },
    ],
  },
  {
    id: "process-engineering",
    title: "Process Engineering",
    category: "Process",
    description:
      "Optimizing complex chemical and physical processes with state-of-the-art simulation, AI control loops, and digital twin monitoring.",
    detailedSpecs: {
      tolerances: "Sub-second automation response times",
      materials: "Hastelloy C-276, PTFE-lined piping, Alloy 20",
      standards: "ISA-88, IEC 61511 (SIL 3), OSHA PSM",
      efficiency: "32% energy reduction in continuous processing",
      deliverables: [
        "Closed-loop Distillation Columns",
        "Catalytic Reaction Chambers",
        "Real-time SCADA AI Controllers",
        "Zero-Liquid Discharge Systems",
      ],
    },
    image:
      "https://t3.ftcdn.net/jpg/19/42/33/00/360_F_1942330057_D050Umlm30cCrZ63tnbiqNjyMFPY2oGo.jpg",
    badge: "AI Automation",
    metrics: [
      { label: "CONTROL LOOP", value: "<10ms", color: "text-[#FF8A00]" },
      { label: "YIELD BOOST", value: "+14.2%", color: "text-[#FF8A00]" },
    ],
  },
];

interface PrecisionDisciplinesProps {
  onSelectDiscipline: (discipline: Discipline) => void;
}

export default function PrecisionDisciplines({
  onSelectDiscipline,
}: PrecisionDisciplinesProps) {
  const [activeId, setActiveId] = useState<string>(disciplinesData[0].id);

  return (
    <section id="disciplines" className="py-24 md:py-32 bg-[#f4f4f2] relative border-t border-[#c3c5d9]/30 overflow-hidden">
      <div className="absolute inset-0 micro-grid opacity-50 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-12"
        >
          <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-3">
            Capabilities Architecture
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-[#1a1c1b] uppercase">
            Precision Disciplines
          </h2>
          <p className="font-sans text-base text-[#565f70] mt-5 leading-relaxed font-light">
            Mastery across multiple engineering domains, delivering integrated solutions for the world&apos;s most demanding environments.
          </p>
        </motion.div>

        {/* Hover Expand Pillars */}
        <div className="flex flex-col md:flex-row w-full h-[90vh] md:h-[650px] min-h-[600px] gap-4">
          {disciplinesData.map((discipline, index) => {
            const isActive = activeId === discipline.id;

            return (
              <motion.div
                key={discipline.id}
                layout
                onMouseEnter={() => setActiveId(discipline.id)}
                onClick={() => setActiveId(discipline.id)}
                className={cn(
                  "relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl border border-white/10 group",
                  isActive ? "md:flex-[3.5] flex-[4]" : "md:flex-[1] flex-[1]"
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={discipline.image}
                    alt={discipline.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className={cn(
                    "absolute inset-0 transition-colors duration-[800ms]",
                    isActive ? "bg-gradient-to-t from-[#05080c] via-[#05080c]/60 to-transparent" : "bg-[#05080c]/60 group-hover:bg-[#05080c]/40"
                  )} />
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end">

                  {/* Collapsed State Title */}
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col justify-end md:justify-center items-start md:items-center p-6 md:p-8 pointer-events-none transition-opacity duration-500",
                      isActive ? "opacity-0" : "opacity-100 delay-200"
                    )}
                  >
                    <div className="md:hidden flex items-center gap-3 w-full">
                      <span className="font-mono text-[9px] text-[#FF8A00] font-bold">0{index + 1}</span>
                      <h3 className="font-display text-2xl text-white font-bold tracking-wide uppercase">
                        {discipline.category}
                      </h3>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-6">
                      <span className="font-mono text-[10px] text-[#FF8A00] font-bold -rotate-90 tracking-widest">
                        0{index + 1}
                      </span>
                      <h3
                        className="font-display text-4xl text-white font-bold tracking-widest uppercase opacity-80"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {discipline.category}
                      </h3>
                    </div>
                  </div>

                  {/* Expanded Content State */}
                  <div
                    className={cn(
                      "flex flex-col justify-end overflow-hidden transition-all duration-700 h-full",
                      isActive ? "opacity-100 delay-100" : "opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="w-full md:w-[600px] p-6 md:p-12 flex flex-col justify-end h-full">
                      <div className="font-mono text-[9px] md:text-[10px] text-[#FF8A00] uppercase tracking-[0.2em] mb-4 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
                        {discipline.badge}
                      </div>

                      <h3 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 uppercase tracking-tight leading-none">
                        {discipline.title}
                      </h3>

                      <p className="font-sans text-sm md:text-base text-white/70 max-w-md mb-8 leading-relaxed font-light">
                        {discipline.description}
                      </p>

                      {/* Metrics Cards */}
                      <div className="flex gap-3 md:gap-4 mb-8 max-w-md">
                        {discipline.metrics.map((m, i) => (
                          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex-1">
                            <div className="font-mono text-[8px] md:text-[9px] text-white/40 mb-1 uppercase tracking-widest">{m.label}</div>
                            <div className={cn("font-display text-xl md:text-2xl font-bold", m.color || "text-white")}>{m.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Call to Action */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDiscipline(discipline);
                        }}
                        className="inline-flex items-center justify-center gap-3 bg-[#FF8A00] text-white px-7 py-3.5 w-max rounded-full font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-[#ffaa44] transition-all duration-300 shadow-[0_0_20px_rgba(255,138,0,0.25)] hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] hover:-translate-y-0.5"
                      >
                        View Full Specs
                        <span className="material-symbols-outlined text-sm">east</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
