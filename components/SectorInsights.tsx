"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface SectorInsightsProps {
  onOpenCaseStudy: () => void;
}

export default function SectorInsights({ onOpenCaseStudy }: SectorInsightsProps) {
  const industries = [
    {
      title: "Oil & Gas (Onshore & Offshore)",
      desc: "FEED, detail engineering, and 3D modeling for well pads, platforms, gathering stations, and pipeline networks.",
      icon: "oil_barrel",
    },
    {
      title: "Petrochemical & Refining",
      desc: "Process gas heaters, chemical injection skids, column modifications, and complex piping stress analysis.",
      icon: "factory",
    },
    {
      title: "EPC Projects & Infrastructure",
      desc: "Multidisciplinary drawing deliverables, MTO/BOM calculations, vendor document reviews, and technical TQ resolution.",
      icon: "construction",
    },
    {
      title: "Energy, Power & Geothermal",
      desc: "Thermal power, geothermal plant piping, gas distribution pipelines, and high-voltage substation engineering.",
      icon: "bolt",
    },
    {
      title: "Industrial Plants & Manufacturing",
      desc: "Heavy structural steel, pump stations, lifting arrangements, material handling, and blast-resistant building layouts.",
      icon: "precision_manufacturing",
    },
  ];

  return (
    <section id="insights" className="py-20 md:py-28 bg-[#07131e] text-white relative overflow-hidden">
      <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
              Industries Served
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
              Powering Critical Global Sectors
            </h2>
            <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed font-light mb-8">
              We combine deep technical expertise and international standards (ASME, API, IEC, ISO) to deliver cost-effective engineering solutions for operators and EPC contractors.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-6 py-3 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md inline-flex items-center gap-2"
              >
                <span>Explore Track Record</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-white/15"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Sector Cards */}
          <div className="lg:col-span-7 space-y-3.5">
            {industries.map((ind, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF8A00]/40 transition-all duration-200 flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-[#FF8A00] flex items-center justify-center shrink-0 group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl">{ind.icon}</span>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white mb-1 group-hover:text-[#FF8A00] transition-colors">
                    {ind.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
