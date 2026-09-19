"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SectorInsightsProps {
  onOpenCaseStudy: () => void;
}

export default function SectorInsights({ onOpenCaseStudy }: SectorInsightsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const industries = [
    {
      code: "SEC-01",
      title: "Oil & Gas (Onshore & Offshore)",
      desc: "FEED, detail engineering, and 3D modeling for well pads, offshore platforms, gathering stations, and pipeline networks.",
      icon: "oil_barrel",
      standard: "API 650 · ASME B31.3",
    },
    {
      code: "SEC-02",
      title: "Petrochemical & Refining",
      desc: "Process gas heaters, chemical injection skids, column modifications, and complex piping stress analysis.",
      icon: "factory",
      standard: "API 520 · TEMA Standards",
    },
    {
      code: "SEC-03",
      title: "EPC Projects & Heavy Infrastructure",
      desc: "Multidisciplinary drawing deliverables, MTO/BOM calculations, vendor document reviews, and technical TQ resolution.",
      icon: "construction",
      standard: "ISO 9001 · Full DED",
    },
    {
      code: "SEC-04",
      title: "Energy, Power & Geothermal",
      desc: "Thermal power, geothermal plant piping, gas distribution pipelines, and high-voltage substation engineering.",
      icon: "bolt",
      standard: "IEC 61850 · ASME B31.1",
    },
    {
      code: "SEC-05",
      title: "Industrial Plants & Manufacturing",
      desc: "Heavy structural steel, pump stations, lifting arrangements, material handling, and blast-resistant building layouts.",
      icon: "precision_manufacturing",
      standard: "AISC 360 · IS 800",
    },
  ];

  // Automatic sequential flow cycle
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % industries.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, industries.length]);

  return (
    <section id="insights" className="py-12 md:py-16 bg-white text-slate-800 relative border-t border-slate-200 overflow-hidden">
      {/* Subtle Micro-Grid */}
      <div className="absolute inset-0 micro-grid opacity-25 pointer-events-none" />

      {/* Decorative background glow that subtly follows active card */}
      <div
        className="absolute w-96 h-96 bg-[#FF8A00]/5 rounded-full blur-3xl pointer-events-none transition-all duration-700 -right-20"
        style={{ top: `${activeIdx * 18 + 10}%` }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Heading & Trust Badges */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.18em]">
                  FIG. 04 — SECTOR MATRIX
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight leading-tight">
                Powering Critical Global Infrastructure
              </h2>
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              We combine deep technical expertise and international standards (ASME, API, IEC, ISO) to deliver cost-effective engineering solutions for operators and EPC contractors.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="font-display text-xl font-bold text-[#0b233a]">
                  5+ Sectors
                </div>
                <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
                  Critical Industries
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="font-display text-xl font-bold text-[#FF8A00]">
                  Zero Defect
                </div>
                <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
                  Quality Compliance
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center gap-1.5 group"
              >
                <span>Explore Track Record</span>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link
                href="/services"
                className="bg-white hover:bg-slate-50 text-[#0b233a] px-4 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-slate-300 shadow-2xs"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Right Column: Connected Flow Sector Cards with Compact Visual Pipeline */}
          <div
            className="lg:col-span-7 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Visual Engineering Pipeline Line (Connecting the cards) */}
            <div className="absolute left-[22px] sm:left-[23px] top-5 bottom-5 w-[2px] bg-slate-200 z-0 rounded-full hidden sm:block">
              {/* Dynamic Traveling Flow Pulse Indicator */}
              <div
                className="absolute w-[6px] -left-[2px] h-10 bg-gradient-to-b from-transparent via-[#FF8A00] to-transparent rounded-full shadow-[0_0_8px_#FF8A00] transition-all duration-500 ease-out"
                style={{
                  top: `calc(${activeIdx * 20}% + 6px)`,
                }}
              />
            </div>

            <div className="space-y-5 relative z-10">
              {industries.map((ind, idx) => {
                const isActive = activeIdx === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all duration-300 relative flex items-start gap-3 sm:gap-4 border ${isActive
                        ? "bg-white border-[#FF8A00] shadow-md shadow-orange-500/10 scale-[1.01] ring-1.5 ring-[#FF8A00]/25"
                        : "bg-slate-50/90 border-slate-200 hover:border-slate-300 hover:bg-white/80 shadow-2xs opacity-85 hover:opacity-100"
                      }`}
                  >
                    {/* Active Scanline Highlight across card top */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent rounded-t-xl animate-pulse" />
                    )}

                    {/* Left Icon Badge with Pulse Node */}
                    <div className="relative shrink-0">
                      {isActive && (
                        <span className="absolute -inset-0.5 rounded-lg bg-[#FF8A00]/20 animate-ping opacity-60" />
                      )}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 border relative z-10 ${isActive
                            ? "bg-[#FF8A00] text-white border-[#FF8A00] shadow-sm shadow-orange-500/30"
                            : "bg-white text-slate-500 border-slate-200"
                          }`}
                      >
                        <span className="material-symbols-outlined text-lg sm:text-xl">
                          {ind.icon}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-0.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded transition-colors ${isActive
                                ? "bg-[#FF8A00]/15 text-[#FF8A00]"
                                : "bg-slate-200/70 text-slate-500"
                              }`}
                          >
                            {ind.code}
                          </span>
                          <h3
                            className={`font-display text-sm sm:text-base font-bold transition-colors ${isActive ? "text-[#0b233a]" : "text-slate-700"
                              }`}
                          >
                            {ind.title}
                          </h3>
                        </div>

                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold border transition-all ${isActive
                              ? "bg-orange-50 text-[#FF8A00] border-orange-200 font-bold"
                              : "bg-white text-slate-500 border-slate-200"
                            }`}
                        >
                          {ind.standard}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-slate-600 leading-snug font-light">
                        {ind.desc}
                      </p>
                    </div>

                    {/* Flow arrow indicator */}
                    <div className="hidden sm:flex items-center self-center shrink-0">
                      <span
                        className={`material-symbols-outlined text-base transition-all duration-200 ${isActive
                            ? "text-[#FF8A00] translate-x-0.5 font-bold"
                            : "text-slate-300 opacity-40"
                          }`}
                      >
                        chevron_right
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


