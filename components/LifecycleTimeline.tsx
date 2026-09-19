"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LifecycleTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const stages = [
    {
      step: "01",
      title: "Basis of Design & FEED Verification",
      desc: "Reviewing process flow diagrams (PFD), site data, design criteria, and international codes (ASME, API, IEC) to establish a solid project baseline.",
      kpiLabel: "STAGE GATE:",
      kpiVal: "Design Basis Approval",
      duration: "PHASE 1",
      deliverable: "FEED VERIFICATION & DESIGN BASIS REPORT",
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
      kpiLabel: "STANDARDS:",
      kpiVal: "ASME / IEC / API Compliant",
      duration: "PHASE 2",
      deliverable: "3D PLANT MODEL & DETAILED CALCULATIONS",
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
      kpiLabel: "QUALITY:",
      kpiVal: "Zero-Clash Tolerance (ISO 9001)",
      duration: "PHASE 3",
      deliverable: "CLASH REPORT & QA CHECKLIST",
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
      kpiLabel: "STATUS:",
      kpiVal: "Issued For Construction (IFC)",
      duration: "FINAL STAGE",
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
      className="py-20 md:py-28 bg-[#07131e] text-white relative overflow-hidden border-t border-white/10"
    >
      <div className="absolute inset-0 micro-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
            Execution Methodology
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Project Engineering Lifecycle
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed font-light">
            Our ISO 9001:2015 quality process ensures every deliverable is verified, clash-free, and ready for site construction.
          </p>
        </div>

        {/* 4 Clean Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const isSelected = selectedPhase === idx;

            return (
              <div
                key={stage.step}
                onClick={() => setSelectedPhase(isSelected ? null : idx)}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between",
                  isSelected
                    ? "bg-[#0b233a] border-[#FF8A00] shadow-xl"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[#FF8A00]">
                      {stage.step}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-white/10 text-[10px] font-mono font-medium text-slate-300 uppercase">
                      {stage.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                    {stage.title}
                  </h3>

                  <p className="font-sans text-xs text-slate-300 leading-relaxed mb-4 font-light">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#FF8A00] font-bold">{stage.kpiLabel}</span>
                    <span className="text-slate-200 text-right">{stage.kpiVal}</span>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-200">
                      {stage.details.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-[#FF8A00]">✓</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
