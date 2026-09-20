"use client";

import { motion } from "framer-motion";

interface ConsultationCTAProps {
  onOpenConsultation: () => void;
}

export default function ConsultationCTA({ onOpenConsultation }: ConsultationCTAProps) {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#07131e] text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 micro-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-3 sm:mb-4">
          Direct Engineering Support
        </div>
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight text-white leading-tight">
          Ready to Partner on Your Next Engineering Project?
        </h2>
        <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light">
          Connect directly with our engineering team in Navi Mumbai and Chennai for FEED, 3D plant modeling, detailed engineering, or skilled manpower support.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
          <button
            onClick={onOpenConsultation}
            className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-sans text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>Request Project Consultation</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <a
            href="mailto:contact@saurengineering.in"
            className="bg-white/10 hover:bg-white/15 text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-lg font-sans text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 border border-white/15 text-center justify-center inline-flex w-full sm:w-auto"
          >
            contact@saurengineering.in
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-[11px] sm:text-xs font-mono text-slate-400">
          <span>📞 +91 99671 12295</span>
          <span className="hidden sm:inline">•</span>
          <span>📞 +91 88286 12183</span>
          <span className="hidden sm:inline">•</span>
          <span>📍 Mumbai &amp; Chennai Offices</span>
        </div>
      </div>
    </section>
  );
}
