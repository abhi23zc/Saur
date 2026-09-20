"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HumanCapitalProps {
  onOpenLeadership: () => void;
}

export default function HumanCapital({ onOpenLeadership }: HumanCapitalProps) {
  const capabilities = [
    {
      title: "Site Survey & Construction Supervision",
      desc: "Experienced field engineers for constructability reviews, site measurements, and execution oversight.",
    },
    {
      title: "Pre-Commissioning & Start-Up",
      desc: "Multi-discipline technician teams for loop checking, hydrotesting, energization, and system start-up.",
    },
    {
      title: "Inspection & Expediting",
      desc: "Vendor QA/QC surveillance, third-party inspection, and material expediting across manufacturing yards.",
    },
    {
      title: "Turnkey E&I & As-Built Documentation",
      desc: "Field drafting, 2D/3D redline updates, junction box wiring, and comprehensive as-built handover.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#f8fafc] border-t border-slate-200 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
              Manpower &amp; Workforce Solutions
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight text-[#0b233a] leading-tight">
              Skilled Technical Workforce for Onshore, Yard &amp; Offshore
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-slate-600 mb-6 leading-relaxed">
              We provide certified engineers, designers, and site technicians to support EPC contractors and plant owners during fabrication, installation, and commissioning.
            </p>

            {/* Core Capabilities List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {capabilities.map((c, i) => (
                <div key={i} className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-[#0b233a] font-bold text-xs mb-1">
                    <span className="material-symbols-outlined text-[#FF8A00] text-base">check_circle</span>
                    <span>{c.title}</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-500 leading-snug">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenLeadership}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-6 py-3 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Request Manpower Support</span>
                <span className="material-symbols-outlined text-base">groups</span>
              </button>
              <Link
                href="/services#manpower"
                className="text-xs font-bold text-[#0b233a] hover:text-[#FF8A00] transition-colors text-center sm:text-left py-2 sm:py-0"
              >
                Explore Deputation Details →
              </Link>
            </div>
          </div>

          {/* Right Column: Verified HSE & Safety Card */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white relative">
              <img
                alt="Engineering Field Execution"
                className="w-full h-56 sm:h-72 sm:h-80 object-cover"
                src="https://mystartupnews.in/_next/image?url=https://res.cloudinary.com/dfycb17sf/image/upload/v1781250211/writerProfiles/abti1vwpsmc6slhztdp7.webp&w=1920&q=75"
              />

              {/* HSE Safety Commitment Bar */}
              <div className="p-6 bg-[#0b233a] text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FF8A00]/20 border border-[#FF8A00]/40 flex items-center justify-center text-[#FF8A00]">
                    <span className="material-symbols-outlined text-lg">verified_user</span>
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">
                      HSE Commitment &amp; Quality
                    </h4>
                    <span className="font-mono text-[10px] text-slate-400">Zero Unsafe Acts Policy</span>
                  </div>
                </div>
                <p className="font-sans text-xs text-slate-300 italic leading-relaxed">
                  &ldquo;Safety First: Zero unsafe acts, certified equipment, and strict compliance with global safety and environmental norms across all deployments.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
