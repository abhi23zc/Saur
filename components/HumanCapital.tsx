"use client";

import { motion } from "framer-motion";

interface HumanCapitalProps {
  onOpenLeadership: () => void;
}

export default function HumanCapital({ onOpenLeadership }: HumanCapitalProps) {
  return (
    <section className="py-24 md:py-32 bg-[#f4f4f2] border-t border-[#c3c5d9]/30 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs text-[#FF8A00] uppercase tracking-widest mb-3 block font-bold">
              Manpower &amp; Workforce Solutions
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-[#1a1c1b] uppercase leading-tight">
              EXPERT WORKFORCE DEPUTATION
            </h2>
            <p className="font-sans text-base text-[#424656] mb-8 leading-relaxed">
              Focused exclusively on manpower for onshore, yard & offshore operations. We provide skilled engineers and technicians for site survey, pre-commissioning, inspection, and erection.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="border-l-2 border-[#FF8A00] pl-4">
                <div className="font-display text-3xl font-bold text-[#1a1c1b] mb-1">
                  100+
                </div>
                <div className="font-mono text-xs text-[#424656] uppercase font-semibold">
                  Skilled Experts
                </div>
              </div>
              <div className="border-l-2 border-[#FF8A00] pl-4">
                <div className="font-display text-3xl font-bold text-[#1a1c1b] mb-1">
                  Zero
                </div>
                <div className="font-mono text-xs text-[#424656] uppercase font-semibold">
                  Safety Incidents
                </div>
              </div>
            </div>

            <button
              onClick={onOpenLeadership}
              className="bg-[#FF8A00] text-white px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffaa44] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Request Manpower Support
              <span className="material-symbols-outlined text-base">groups</span>
            </button>
          </motion.div>

          {/* Right Imagery Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#FF8A00]/10 -translate-x-4 translate-y-4 rounded-2xl" />
            <img
              alt="Engineering Leadership"
              className="relative z-10 w-full h-auto rounded-2xl shadow-xl border border-white/40"
              src="https://mystartupnews.in/_next/image?url=https://res.cloudinary.com/dfycb17sf/image/upload/v1781250211/writerProfiles/abti1vwpsmc6slhztdp7.webp&w=1920&q=75"
            />

            {/* Floating Safety Card */}
            <div className="absolute -bottom-6 left-4 right-4 md:right-auto md:-left-6 z-20 glass-panel-light p-6 rounded-xl border border-white/60 shadow-xl md:max-w-[320px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#eeeeec] flex items-center justify-center border border-[#c3c5d9]">
                  <span className="material-symbols-outlined text-[#FF8A00]">
                    verified_user
                  </span>
                </div>
                <div>
                  <div className="font-sans text-sm font-bold text-[#1a1c1b]">
                    Commitment & Quality
                  </div>
                  <div className="font-mono text-xs text-[#424656]">
                    HSE Compliance
                  </div>
                </div>
              </div>
              <p className="font-sans text-xs text-[#424656] italic leading-relaxed">
                &ldquo;Safety First: Zero unsafe acts, certified equipment, strict compliance with safety norms.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
