"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LifecycleTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const stages = [
    {
      step: "01",
      title: "Conceptual Architecture",
      desc: "Feasibility studies, digital twin simulations, and environmental impact modeling.",
      kpiLabel: "KPI:",
      kpiVal: "100% Virtual Viability Validated",
      duration: "2-6 MONTHS",
      deliverable: "FRONT-END ENGINEERING DESIGN (FEED)",
      details: [
        "Computational fluid dynamics simulation",
        "Geotechnical risk modeling",
        "Carbon footprint & sustainability audit",
      ],
    },
    {
      step: "02",
      title: "Detailed Engineering",
      desc: "Micro-level structural calculations, material science selection, and BIM integration.",
      kpiLabel: "SPEC:",
      kpiVal: "BIM LOD 400 Compliant",
      duration: "6-18 MONTHS",
      deliverable: "APPROVED FOR CONSTRUCTION (AFC) DRAWINGS",
      details: [
        "Finite element analysis (FEA)",
        "3D clash detection & tolerance mapping",
        "Custom metallurgy formulation",
      ],
    },
    {
      step: "03",
      title: "Global Procurement",
      desc: "Supply chain logistics, quality assurance testing of custom components, and staging.",
      kpiLabel: "KPI:",
      kpiVal: "ISO 9001 Supply Chain Traceability",
      duration: "CONTINUOUS",
      deliverable: "MATERIALS RECEIVING REPORT (MRR)",
      details: [
        "Tier-1 vendor audit & verification",
        "Nondestructive ultrasonic weld testing",
        "Just-in-time site logistics dispatch",
      ],
    },
    {
      step: "04",
      title: "Execution & Commissioning",
      desc: "On-site assembly, system integration, live load testing, and operational handover.",
      kpiLabel: "STATUS:",
      kpiVal: "Zero-Incident Safety Target",
      duration: "FINAL STAGE",
      deliverable: "READY FOR START-UP (RFSU) CERTIFICATE",
      details: [
        "Hot & cold operational commissioning",
        "SCADA telemetry integration",
        "Operations team training & handover",
      ],
    },
  ];

  return (
    <section
      id="lifecycle"
      className="py-32 bg-[#05080c] text-white relative overflow-hidden border-y border-white/10"
    >
      <div className="absolute inset-0 blueprint-grid-dark opacity-30 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-28"
        >
          <span className="font-mono text-[9px] text-[#1FA67A] uppercase tracking-[0.2em] mb-4 block font-bold">
            Project Lifecycle
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
            Precision From Inception To Deployment
          </h2>
          <p className="font-sans text-base text-white/60 leading-relaxed font-light">
            A rigorous, data-driven methodology that ensures every project meets absolute standards of safety, efficiency, and scale.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line Container */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 overflow-hidden rounded-full">
            {/* Animated Draw Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#1FA67A] via-[#0049cc] to-transparent"
            />
          </div>

          <div className="space-y-20">
            {stages.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const isSelected = selectedPhase === idx;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  key={stage.step}
                  onClick={() => setSelectedPhase(isSelected ? null : idx)}
                  className="flex flex-col md:flex-row items-start md:justify-between relative group cursor-pointer"
                >
                  {/* Left Box (Desktop) */}
                  <div
                    className={cn(
                      "md:w-[45%] text-left",
                      isEven ? "md:text-right pr-0 md:pr-16 pl-16 md:pl-0" : "md:order-3 pl-16 md:pl-16",
                      "mb-4 md:mb-0"
                    )}
                  >
                    <div className="inline-block relative">
                      <span className="font-display text-5xl font-bold text-white/5 absolute -top-10 -left-6 md:-left-8 -z-10 tracking-tighter transition-colors group-hover:text-white/10">
                        {stage.step}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#1FA67A] transition-colors duration-300 tracking-tight">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="font-sans text-sm text-white/60 mb-5 leading-relaxed font-light">
                      {stage.desc}
                    </p>
                    <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 font-mono text-[10px] text-white/80 shadow-sm uppercase tracking-widest transition-all group-hover:border-white/20 group-hover:bg-white/10">
                      <span className="text-[#b5c4ff] font-bold">{stage.kpiLabel}</span>
                      {stage.kpiVal}
                    </div>

                    {/* Expandable Details on Click */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <div className={cn(
                            "p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#1FA67A]/30 shadow-lg",
                            isEven ? "md:text-right" : "text-left"
                          )}>
                            <div className="font-mono text-[9px] text-[#1FA67A] uppercase mb-3 font-bold tracking-[0.2em]">
                              Stage Verifications:
                            </div>
                            <ul className={cn(
                              "space-y-2 text-xs text-white/80 font-sans font-light",
                              isEven ? "md:items-end flex flex-col" : ""
                            )}>
                              {stage.details.map((d, dIdx) => (
                                <li key={dIdx} className={cn("flex items-center gap-3", isEven ? "md:flex-row-reverse" : "")}>
                                  <span className="w-1 h-1 rounded-full bg-[#1FA67A]" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Circle Node */}
                  <div className="absolute left-[21px] md:left-1/2 w-10 h-10 rounded-full bg-[#05080c] border-2 border-[#1FA67A] md:-translate-x-1/2 flex items-center justify-center transition-all duration-300 z-10 md:order-2 shadow-[0_0_20px_rgba(31,166,122,0.3)] group-hover:shadow-[0_0_30px_rgba(31,166,122,0.6)] group-hover:bg-[#1FA67A]/10">
                    <div className={cn(
                      "w-3 h-3 rounded-full bg-[#1FA67A] transition-transform duration-300",
                      isSelected ? "scale-150 shadow-[0_0_10px_#fff]" : "group-hover:scale-125"
                    )} />
                  </div>

                  {/* Right Box (Desktop) */}
                  <div
                    className={cn(
                      "md:w-[45%]",
                      isEven ? "pl-16 md:pl-16" : "md:order-1 text-left md:text-right pr-0 md:pr-16 pl-16 md:pl-0",
                      "opacity-70 font-mono text-xs text-white/50 pt-2 transition-opacity group-hover:opacity-100"
                    )}
                  >
                    <div className="text-[#1FA67A] font-bold text-[10px] tracking-widest uppercase mb-1">
                      PHASE DURATION: {stage.duration}
                    </div>
                    <div className="text-[10px] text-white/60 uppercase tracking-wider mb-3">
                      DELIVERABLE: <br className="hidden md:block" /> {stage.deliverable}
                    </div>
                    <div className={cn(
                      "text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold transition-colors",
                      isSelected ? "text-[#1FA67A]" : "group-hover:text-white/60"
                    )}>
                      [Click to {isSelected ? "collapse" : "expand"} specs]
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
