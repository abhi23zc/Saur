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
      "https://lh3.googleusercontent.com/aida/AP1WRLtiOen6ACEuFhCTPn9Q1cXGS723KhA7q5swm1zkxz5C5VA9XEmWfScsvXh3JStdqCMiiE_hlRsWy4qJqQ5XdfwdTatWvdKjn4G0k7n79l2b3QkAQj20Itx684I0a6FcRa1lqzC2BhfE4GP9ppVOipTkzaGQoAIYM29X-4IIajm8QpvcqgtqnmMbfoXkBNZxnShXJ25sod8DoVWH5MjGoMnd55VIndMqQFyukDbe4vrNebip7oJ9Pwg0Tg",
    badge: "Primary Domain",
    metrics: [
      { label: "EFFICIENCY", value: "98.4%", color: "text-[#1FA67A]" },
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
      "https://lh3.googleusercontent.com/aida/AP1WRLtIKftqAX-iIhCGe3BlB7vI8uYWs7mjLKeTilW2Q2zYm09ZFitCAjWjbj5oU1Qnt5GJ7G7nUX0VxVc2zm5GgvsO4HMKtPPJBFBGHyHsrewZ6KEDQykowBP8xECPMiKVr0w3OyZ8nRifLO9fuaKO6fmB1mAenZypCUSR60Msn-jtqu8jiZ5O7gzeTI17s9JFLRtQQ6oXO0iwOK9StPhqa6gXQpz-EZ6DTqA8zvjC6CNgjYJSvBrV6SnE8w",
    badge: "Turnkey E&I",
    metrics: [
      { label: "RELIABILITY", value: "99.9%", color: "text-[#1FA67A]" },
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
      "https://lh3.googleusercontent.com/aida/AP1WRLt1MaLoe5qI5ZSF2niFrGzgc-yXRvFF5yGgfIKsIAlJW84MxWzbAkw3XDvKdQsHN5h2Moeokxh3zQERxD3e1I42LlyremIvjQeHd8zGPYNnD72pLWlfIssfrr34km3_3l-hUAyvot_zfz6wGvLRROtRyKAzee01baYjoi_JgoB7rOz3f2qcxYYvcKy9Ldkp5n7ttQwblmxOi7WCfU5p-k4yKDgX_5acrdUjc4hP1Tpr4rLcOXRkmouIpw",
    badge: "AI Automation",
    metrics: [
      { label: "CONTROL LOOP", value: "<10ms", color: "text-[#0049cc]" },
      { label: "YIELD BOOST", value: "+14.2%", color: "text-[#1FA67A]" },
    ],
  },
];

interface PrecisionDisciplinesProps {
  onSelectDiscipline: (discipline: Discipline) => void;
}

export default function PrecisionDisciplines({
  onSelectDiscipline,
}: PrecisionDisciplinesProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredDisciplines =
    activeFilter === "All"
      ? disciplinesData
      : disciplinesData.filter((d) => d.category === activeFilter);

  return (
    <section id="disciplines" className="py-32 bg-[#ffffff] relative border-t border-[#c3c5d9]/30">
      <div className="absolute inset-0 micro-grid opacity-[0.15] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] text-[#0049cc] font-bold uppercase tracking-[0.2em] block mb-3">
              Capabilities Architecture
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-[#1a1c1b] uppercase">
              Precision Disciplines
            </h2>
            <p className="font-sans text-base text-[#565f70] mt-5 leading-relaxed font-light">
              Mastery across multiple engineering domains, delivering integrated solutions for the world&apos;s most demanding environments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {["All", "Mechanical", "Electrical", "Process"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300",
                  activeFilter === cat
                    ? "bg-[#0049cc] text-white shadow-[0_4px_20px_rgba(0,73,204,0.3)]"
                    : "bg-[#f4f4f2] text-[#424656] hover:bg-[#e2e3e1] hover:text-[#1a1c1b]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[600px]">
          <AnimatePresence mode="popLayout">
            {/* Main 8-col card: Mechanical Systems */}
            {filteredDisciplines.find((d) => d.id === "mechanical-systems") && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() =>
                  onSelectDiscipline(
                    disciplinesData.find((d) => d.id === "mechanical-systems")!
                  )
                }
                className="md:col-span-8 md:row-span-2 group relative rounded-3xl overflow-hidden bg-[#05080c] shadow-xl flex flex-col cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex-1 relative overflow-hidden min-h-[420px]">
                  <img
                    alt="Mechanical Systems"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 mix-blend-screen"
                    src={disciplinesData[0].image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-[#05080c]/40 to-transparent" />
                  
                  <div className="absolute top-6 right-6 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#1FA67A] animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/90 font-semibold">
                      Primary Domain
                    </span>
                  </div>

                  {/* Tech Specs Overlay */}
                  <div className="absolute top-6 left-6 font-mono text-[10px] text-white/50 space-y-1.5 hidden sm:block tracking-widest">
                    <div className="bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">SYS_TOLERANCE: ±0.001mm</div>
                    <div className="bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">YIELD_STRENGTH: 850 MPa</div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
                    <span className="font-mono text-[10px] text-[#0b5fff] font-bold uppercase tracking-[0.2em] mb-2 block">
                      Core Specialization
                    </span>
                    <h3 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#b5c4ff] transition-all duration-500">
                      Mechanical Systems
                    </h3>
                    <p className="font-sans text-base text-white/60 max-w-2xl mb-8 font-light">
                      Designing high-precision mechanical components and turbine systems for industrial applications. Ultra-sharp detail, polished steel, and premium technical integration.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="bg-white/5 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/10 shadow-lg">
                        <div className="font-mono text-[9px] text-white/40 mb-1 uppercase tracking-widest">
                          EFFICIENCY
                        </div>
                        <div className="font-display text-2xl font-bold text-[#1FA67A]">
                          98.4%
                        </div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/10 shadow-lg">
                        <div className="font-mono text-[9px] text-white/40 mb-1 uppercase tracking-widest">
                          UPTIME
                        </div>
                        <div className="font-display text-2xl font-bold text-white">
                          24/7/365
                        </div>
                      </div>
                      <div className="ml-auto inline-flex items-center gap-3 text-white font-sans text-[10px] uppercase tracking-widest font-bold group-hover:translate-x-2 transition-transform duration-300">
                        Inspect Technical Specs
                        <span className="material-symbols-outlined text-base p-2 bg-white/10 rounded-full backdrop-blur-md">east</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4-col card: Electrical & Instrumentation */}
            {filteredDisciplines.find((d) => d.id === "electrical-instrumentation") && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() =>
                  onSelectDiscipline(
                    disciplinesData.find((d) => d.id === "electrical-instrumentation")!
                  )
                }
                className="md:col-span-4 md:row-span-1 group relative rounded-3xl overflow-hidden bg-[#05080c] shadow-lg flex flex-col justify-end min-h-[300px] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute inset-0">
                  <img
                    alt="Electrical & Instrumentation"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-50 mix-blend-luminosity"
                    src={disciplinesData[1].image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-[#05080c]/80 to-transparent" />
                </div>
                
                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  <div className="font-mono text-[9px] text-[#1FA67A] uppercase tracking-[0.2em] mb-2 font-bold">
                    Control Systems
                  </div>
                  <h3 className="font-display text-3xl text-white font-bold mb-3 group-hover:text-[#1FA67A] transition-colors">
                    E&I Engineering
                  </h3>
                  <p className="font-sans text-sm text-white/50 line-clamp-2 mb-6 font-light">
                    Robust electrical networks and precise instrumentation. Turnkey E&I execution.
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="font-mono text-[10px] text-[#1FA67A] tracking-widest uppercase">
                      RELIABILITY: 99.9%
                    </div>
                    <span className="material-symbols-outlined text-white bg-white/10 p-2 rounded-full backdrop-blur-md group-hover:bg-[#1FA67A] transition-colors duration-300 text-sm">
                      east
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4-col card: Process Engineering */}
            {filteredDisciplines.find((d) => d.id === "process-engineering") && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() =>
                  onSelectDiscipline(
                    disciplinesData.find((d) => d.id === "process-engineering")!
                  )
                }
                className="md:col-span-4 md:row-span-1 group relative rounded-3xl overflow-hidden bg-[#f4f4f2] shadow-lg flex flex-col min-h-[300px] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="h-[45%] overflow-hidden relative bg-[#05080c]">
                  <img
                    alt="Process Engineering"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80"
                    src={disciplinesData[2].image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 font-mono text-[9px] text-white/70 tracking-[0.2em] bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                    SEQ_A01
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between bg-white relative">
                  <div>
                    <h3 className="font-display text-2xl text-[#1a1c1b] font-bold mb-2 group-hover:text-[#0049cc] transition-colors">
                      Process Engineering
                    </h3>
                    <p className="font-sans text-sm text-[#565f70] line-clamp-2 font-light">
                      Optimizing complex chemical and physical processes with state-of-the-art simulation.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#eeeeec]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0049cc] animate-pulse shadow-[0_0_8px_#0049cc]" />
                      <span className="font-mono text-[10px] text-[#424656] uppercase tracking-widest font-semibold">
                        Active Monitoring
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#0049cc] bg-[#f4f4f2] p-2 rounded-full text-sm group-hover:translate-x-1 group-hover:bg-[#0049cc] group-hover:text-white transition-all duration-300">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
