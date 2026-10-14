"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LifecycleTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const stages = [
    {
      title: "Basis of Design & FEED Verification",
      desc: "Reviewing process flow diagrams (PFD), site data, design criteria, and international codes (ASME, API, IEC) to establish a solid project baseline.",
      kpiLabel: "Stage Gate",
      kpiVal: "Design Basis Approval",
      duration: "Phase 1",
      deliverable: "FEED VERIFICATION & DESIGN BASIS REPORT",
      details: [
        "Process parameter & criteria confirmation",
        "Applicable international codes & client spec review",
        "Initial equipment list & plot plan feasibility",
      ],
    },
    {
      title: "Detailed Engineering & 3D Modeling",
      desc: "Creating multidisciplinary 3D models in Smart 3D (S3D) and AVEVA E3D, CAESAR II stress analysis, SLD, and SPI instrument databases.",
      kpiLabel: "Standards",
      kpiVal: "ASME / IEC / API Compliant",
      duration: "Phase 2",
      deliverable: "3D PLANT MODEL & DETAILED CALCULATIONS",
      details: [
        "Smart 3D (S3D) & AVEVA E3D plant modeling",
        "CAESAR II piping stress & STAAD.Pro structural analysis",
        "Single Line Diagrams (SLD), P&IDs, and loop diagrams",
      ],
    },
    {
      title: "Two-Tier Quality & Clash Check",
      desc: "Comprehensive multi-discipline clash detection across piping, structural, and E&I trays, with independent QA review by Discipline Leads.",
      kpiLabel: "Quality Gate",
      kpiVal: "Zero-Clash Tolerance (ISO 9001)",
      duration: "Phase 3",
      deliverable: "CLASH REPORT & QA CHECKLIST",
      details: [
        "Multi-discipline 3D clash check in Navisworks",
        "Senior discipline lead technical checking gate",
        "Material Take-Off (MTO / BOM) reconciliation",
      ],
    },
    {
      title: "IFC Release & Site Commissioning",
      desc: "Issuance of Approved for Construction (IFC) drawings, vendor document review comments, procurement support, and site as-built updates.",
      kpiLabel: "Milestone",
      kpiVal: "Issued For Construction (IFC)",
      duration: "Final Stage",
      deliverable: "IFC DRAWINGS & AS-BUILT PACKAGE",
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
      className="py-14 sm:py-20 md:py-28 bg-[#0b233a] text-white relative overflow-hidden border-t border-white/10"
    >
      <div className="absolute inset-0 micro-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3.5">
            <div className="w-8 sm:w-10 h-1 bg-[#FF8A00] rounded-full shrink-0" />
            <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.18em] font-extrabold text-[#FF8A00]">
              EXECUTION METHODOLOGY · LIFECYCLE
            </span>
            <div className="w-8 sm:w-10 h-1 bg-[#FF8A00] rounded-full shrink-0" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Project Engineering Lifecycle
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Our ISO 9001:2015 quality process ensures every deliverable is verified, clash-free, and ready for site construction.
          </p>
        </div>

        {/* 4 Interlocking Chevron Arrow Blocks */}
        <div className="flex flex-col lg:flex-row items-stretch">
          {stages.map((stage, idx) => {
            const isSelected = selectedPhase === idx;
            const isFirst = idx === 0;

            return (
              <div
                key={stage.duration}
                className={cn(
                  "relative flex-1 flex flex-col group",
                  !isFirst && "lg:-ml-[16px]",
                  "mb-4 lg:mb-0",
                  isSelected ? "z-20" : "z-10 hover:z-20"
                )}
              >
                {/* Mobile downward flow connector */}
                {idx > 0 && (
                  <div className="flex lg:hidden justify-center -mt-2 -mb-2 z-20">
                    <div className="w-7 h-7 rounded-full bg-[#07131e] border border-white/20 flex items-center justify-center text-[#FF8A00] shadow-md">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                {/* Card Container */}
                <div
                  onClick={() => setSelectedPhase(isSelected ? null : idx)}
                  className={cn(
                    "relative transition-all duration-300 h-full flex flex-col cursor-pointer",
                    // Mobile styling only (strictly < lg)
                    "max-lg:rounded-2xl max-lg:border max-lg:border-white/10 max-lg:bg-white/5 max-lg:hover:border-white/20 max-lg:hover:bg-white/[0.08]",
                    isSelected && "max-lg:shadow-xl",
                    // Desktop clean resets - absolutely no rectangular background or border
                    "lg:border-0 lg:bg-transparent lg:rounded-none lg:hover:bg-transparent lg:hover:border-none",
                    "lg:transition-transform lg:duration-300",
                    isSelected ? "z-20" : "z-10 hover:z-20"
                  )}
                >
                  {/* Desktop SVG Chevron Shape */}
                  <svg
                    className={cn(
                      "hidden lg:block absolute inset-0 w-full h-full pointer-events-none transition-all duration-300",
                      isSelected
                        ? "drop-shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
                        : "group-hover:drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                    )}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {/* Chevron Path: Flat left for Phase 1, notched left for subsequent phases */}
                    <path
                      d={
                        isFirst
                          ? "M 0,0 L 92,0 L 100,50 L 92,100 L 0,100 Z"
                          : "M 0,0 L 92,0 L 100,50 L 92,100 L 0,100 L 8,50 Z"
                      }
                      fill={
                        isSelected
                          ? "#07131e"
                          : "rgba(255, 255, 255, 0.05)"
                      }
                      stroke={
                        isSelected
                          ? "#FF8A00"
                          : "rgba(255, 255, 255, 0.10)"
                      }
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      className={cn(
                        "transition-all duration-300",
                        !isSelected && "group-hover:fill-[rgba(255,255,255,0.09)] group-hover:stroke-white/25"
                      )}
                    />
                  </svg>

                  {/* Card Content Surface */}
                  <div
                    className={cn(
                      "relative z-10 h-full w-full flex flex-col justify-between transition-colors duration-300",
                      "p-5 sm:p-6",
                      // Horizontal safe padding on desktop for chevron notch and point
                      isFirst ? "lg:pl-6 lg:pr-10" : "lg:pl-9 lg:pr-10"
                    )}
                  >
                    <div>
                      {/* Top Header: Original Quiet Neutral Badge (No S.No) */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded bg-white/10 text-[11px] font-semibold text-slate-200">
                          {stage.duration}
                        </span>
                      </div>

                      {/* Stage Title */}
                      <h3 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                        {stage.title}
                      </h3>

                      {/* Stage Description */}
                      <p className="font-sans text-xs text-slate-300 leading-relaxed mb-4 font-light">
                        {stage.desc}
                      </p>
                    </div>

                    {/* Bottom Metadata Gate (Original quiet color scheme) */}
                    <div className="pt-4 border-t border-white/10 mt-auto">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#FF8A00] font-semibold">{stage.kpiLabel}:</span>
                        <span className="text-slate-200 text-right font-medium">{stage.kpiVal}</span>
                      </div>

                      {/* Expanded deliverables on selection */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-200 overflow-hidden"
                          >
                            <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                              Deliverables & Controls
                            </div>
                            {stage.details.map((d, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-[#FF8A00] shrink-0 mt-0.5" />
                                <span className="font-light">{d}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
