"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LifecycleTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(0);

  const stages = [
    {
      step: "01",
      title: "Basis of Design & FEED Verification",
      desc: "Reviewing process flow diagrams (PFD), site data, design criteria, and international codes (ASME, API, IEC) to establish a solid project baseline.",
      kpiLabel: "Stage Gate",
      kpiVal: "Design Basis Approval",
      duration: "Phase 1: Inception",
      deliverable: "FEED VERIFICATION & DESIGN BASIS REPORT",
      standards: "ASME B31.3 · API 650 · IEC 61850",
      details: [
        "Process parameter & criteria confirmation",
        "Applicable international codes & client spec review",
        "Initial equipment list & plot plan feasibility",
      ],
    },
    {
      step: "02",
      title: "Detailed Engineering & 3D Modeling",
      desc: "Creating multidisciplinary 3D models in Smart 3D (S3D) and AVEVA E3D, CAESAR II stress analysis, SLD, and SPI instrument databases.",
      kpiLabel: "Standards",
      kpiVal: "ASME / IEC / API Compliant",
      duration: "Phase 2: Detailed Design",
      deliverable: "3D PLANT MODEL & DETAILED CALCULATIONS",
      standards: "BIM LOD 400 · CAESAR II · STAAD.Pro",
      details: [
        "Smart 3D (S3D) & AVEVA E3D plant modeling",
        "CAESAR II piping stress & STAAD.Pro structural analysis",
        "Single Line Diagrams (SLD), P&IDs, and loop diagrams",
      ],
    },
    {
      step: "03",
      title: "Two-Tier Quality & Clash Check",
      desc: "Comprehensive multi-discipline clash detection across piping, structural, and E&I trays, with independent QA review by Discipline Leads.",
      kpiLabel: "Quality Gate",
      kpiVal: "Zero-Clash Tolerance (ISO 9001)",
      duration: "Phase 3: Quality Control",
      deliverable: "CLASH REPORT & QA CHECKLIST",
      standards: "ISO 9001:2015 · Navisworks Clash Matrix",
      details: [
        "Multi-discipline 3D clash check in Navisworks",
        "Senior discipline lead technical checking gate",
        "Material Take-Off (MTO / BOM) reconciliation",
      ],
    },
    {
      step: "04",
      title: "IFC Release & Site Commissioning",
      desc: "Issuance of Approved for Construction (IFC) drawings, vendor document review comments, procurement support, and site as-built updates.",
      kpiLabel: "Milestone",
      kpiVal: "Issued For Construction (IFC)",
      duration: "Final Stage: Execution",
      deliverable: "IFC DRAWINGS & AS-BUILT PACKAGE",
      standards: "RFSU Certificate · As-Built Redlines",
      details: [
        "IFC drawing packages & fabrication isometrics",
        "Vendor drawing reviews & technical query (TQ) resolution",
        "Site construction supervision & as-built redlines",
      ],
    },
  ];

  return (
    <section
      id="lifecycle"
      className="py-16 sm:py-24 md:py-32 bg-[#0b233a] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 micro-grid opacity-15 pointer-events-none" />

      {/* Decorative Brand Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-[#FF8A00]/10 via-[#07131e]/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-[#FF8A00] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
            Project Lifecycle
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 uppercase">
            Precision From Inception To Deployment
          </h2>
          <p className="font-sans text-xs sm:text-base text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            A rigorous, ISO 9001:2015 data-driven methodology that ensures every engineering deliverable meets absolute standards of safety, constructability, and scale.
          </p>
        </motion.div>

        {/* Central Vertical Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Spine Line Container */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-8 w-[2px] bg-white/10 md:-translate-x-1/2 rounded-full overflow-hidden">
            {/* Illuminated Animated Progress Track */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF8A00] via-[#FF8A00]/80 to-[#FF8A00]/20 shadow-[0_0_12px_rgba(255,138,0,0.6)]"
            />
          </div>

          <div className="space-y-16 sm:space-y-24">
            {stages.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const isSelected = selectedPhase === idx;

              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  onClick={() => setSelectedPhase(isSelected ? null : idx)}
                  className="flex flex-col md:flex-row items-start md:justify-between relative group cursor-pointer"
                >
                  {/* Left Column on Desktop */}
                  <div
                    className={cn(
                      "md:w-[45%] text-left",
                      isEven
                        ? "md:text-right pr-0 md:pr-14 pl-14 md:pl-0"
                        : "md:order-3 pl-14 md:pl-14",
                      "mb-3 md:mb-0 w-full"
                    )}
                  >
                    {isEven ? (
                      /* Even Item Primary Content: Title, Description, KPI */
                      <div>
                        <div className="relative inline-block">
                          <span className="font-display text-4xl sm:text-5xl font-extrabold text-white/[0.06] absolute -top-8 -left-4 md:-left-6 md:-right-6 -z-10 tracking-tighter transition-colors group-hover:text-[#FF8A00]/10">
                            {stage.step}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#FF8A00] transition-colors duration-200 tracking-tight">
                            {stage.title}
                          </h3>
                        </div>

                        <p className="font-sans text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-light">
                          {stage.desc}
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1 text-xs text-slate-200 shadow-sm transition-all group-hover:border-[#FF8A00]/30 group-hover:bg-white/[0.08]">
                          <span className="text-[#FF8A00] font-bold">{stage.kpiLabel}:</span>
                          <span className="font-medium text-slate-200">{stage.kpiVal}</span>
                        </div>

                        {/* Interactive Expandable Verification Box */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 18 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 sm:p-5 rounded-2xl bg-[#07131e]/90 border border-[#FF8A00]/30 shadow-xl text-left">
                                <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10">
                                  <span className="text-[11px] text-[#FF8A00] font-bold uppercase tracking-wider">
                                    Stage Verifications
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {stage.standards}
                                  </span>
                                </div>
                                <ul className="space-y-1.5 text-xs text-slate-200">
                                  {stage.details.map((detail, dIdx) => (
                                    <li key={dIdx} className="flex items-start gap-2">
                                      <span className="text-[#FF8A00] font-bold mt-0.5">✓</span>
                                      <span className="leading-snug">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Odd Item Secondary Content: Phase Duration, Deliverables on Left */
                      <div className="opacity-85 font-mono text-xs pt-1 transition-opacity group-hover:opacity-100">
                        <div className="text-[#FF8A00] font-bold text-xs tracking-wider uppercase mb-1">
                          {stage.duration}
                        </div>
                        <div className="text-[11px] text-slate-300 uppercase tracking-wider mb-2 font-medium">
                          DELIVERABLE: <br className="hidden md:block" /> {stage.deliverable}
                        </div>
                        <div
                          className={cn(
                            "text-[10px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1",
                            isSelected ? "text-[#FF8A00]" : "text-slate-400 group-hover:text-slate-200"
                          )}
                        >
                          <span>{isSelected ? "[-] Collapse specs" : "[+] Click to expand specs"}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Central Milestone Beacon Node */}
                  <div className="absolute left-[20px] md:left-1/2 w-10 h-10 rounded-full bg-[#0b233a] border-2 border-[#FF8A00] md:-translate-x-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 z-10 md:order-2 shadow-[0_0_20px_rgba(255,138,0,0.35)] group-hover:shadow-[0_0_30px_rgba(255,138,0,0.65)] group-hover:bg-[#FF8A00]/10">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full bg-[#FF8A00] transition-all duration-300",
                        isSelected
                          ? "scale-150 shadow-[0_0_10px_#ffffff] bg-white ring-2 ring-[#FF8A00]"
                          : "group-hover:scale-125"
                      )}
                    />
                  </div>

                  {/* Right Column on Desktop */}
                  <div
                    className={cn(
                      "md:w-[45%] text-left",
                      isEven
                        ? "pl-14 md:pl-14"
                        : "md:order-1 text-left md:text-right pr-0 md:pr-14 pl-14 md:pl-0",
                      "w-full"
                    )}
                  >
                    {!isEven ? (
                      /* Odd Item Primary Content: Title, Description, KPI on Right */
                      <div>
                        <div className="relative inline-block">
                          <span className="font-display text-4xl sm:text-5xl font-extrabold text-white/[0.06] absolute -top-8 -left-4 md:-left-6 md:-right-6 -z-10 tracking-tighter transition-colors group-hover:text-[#FF8A00]/10">
                            {stage.step}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#FF8A00] transition-colors duration-200 tracking-tight">
                            {stage.title}
                          </h3>
                        </div>

                        <p className="font-sans text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-light">
                          {stage.desc}
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1 text-xs text-slate-200 shadow-sm transition-all group-hover:border-[#FF8A00]/30 group-hover:bg-white/[0.08]">
                          <span className="text-[#FF8A00] font-bold">{stage.kpiLabel}:</span>
                          <span className="font-medium text-slate-200">{stage.kpiVal}</span>
                        </div>

                        {/* Interactive Expandable Verification Box */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 18 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 sm:p-5 rounded-2xl bg-[#07131e]/90 border border-[#FF8A00]/30 shadow-xl text-left">
                                <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10">
                                  <span className="text-[11px] text-[#FF8A00] font-bold uppercase tracking-wider">
                                    Stage Verifications
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {stage.standards}
                                  </span>
                                </div>
                                <ul className="space-y-1.5 text-xs text-slate-200">
                                  {stage.details.map((detail, dIdx) => (
                                    <li key={dIdx} className="flex items-start gap-2">
                                      <span className="text-[#FF8A00] font-bold mt-0.5">✓</span>
                                      <span className="leading-snug">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Even Item Secondary Content: Phase Duration, Deliverables on Right */
                      <div className="opacity-85 font-mono text-xs pt-1 transition-opacity group-hover:opacity-100">
                        <div className="text-[#FF8A00] font-bold text-xs tracking-wider uppercase mb-1">
                          {stage.duration}
                        </div>
                        <div className="text-[11px] text-slate-300 uppercase tracking-wider mb-2 font-medium">
                          DELIVERABLE: <br className="hidden md:block" /> {stage.deliverable}
                        </div>
                        <div
                          className={cn(
                            "text-[10px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1",
                            isSelected ? "text-[#FF8A00]" : "text-slate-400 group-hover:text-slate-200"
                          )}
                        >
                          <span>{isSelected ? "[-] Collapse specs" : "[+] Click to expand specs"}</span>
                        </div>
                      </div>
                    )}
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
