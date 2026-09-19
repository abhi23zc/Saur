"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  onExplore: () => void;
  onOpenConsultation: () => void;
}

export default function HeroSection({ onExplore, onOpenConsultation }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative w-full min-h-[92svh] flex flex-col justify-center bg-[#07131e] overflow-hidden pt-28 md:pt-36 pb-36 md:pb-28">
      {/* Dark Technical Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{
          backgroundImage:
            "url('https://www.tcreng.com/assets/img/og/refining-hero-og.jpg')",
        }}
      />

      {/* Solid Overlays */}
      <div className="absolute inset-0 bg-[#07131e]/90" />
      <div className="absolute inset-0 micro-grid opacity-20 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full flex flex-col items-start justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full"
        >
          {/* Authentic Accreditation Badge */}
          <motion.div variants={itemVariants}>
            <a
              href="/company#certificates"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 hover:text-white transition-all text-xs font-mono font-medium tracking-wide mb-6 group backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF8A00]" />
              <span>ISO 9001:2015 CERTIFIED</span>
              <span className="text-white/30">|</span>
              <span className="text-[#FF8A00]">DPIIT #STARTUPINDIA</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform text-[#FF8A00]">
                arrow_forward
              </span>
            </a>
          </motion.div>

          {/* Authentic PDF Tagline Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white leading-[1.08]"
          >
            Reliable Engineering.<br />
            Sustainable Design.<br />
            <span className="text-[#FF8A00]">Proven Results.</span>
          </motion.h1>

          {/* Simple, Genuine PDF Summary */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base md:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed font-light"
          >
            We are an ISO 9001:2015 certified engineering consultancy. We deliver FEED, 3D plant modeling, detailed engineering, and skilled manpower for global Oil & Gas, EPC, and industrial projects.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 relative z-10">
            <button
              onClick={onExplore}
              className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded-lg font-sans text-sm font-semibold transition-all duration-200 shadow-md flex items-center gap-2"
            >
              <span>Explore Disciplines</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <button
              onClick={onOpenConsultation}
              className="bg-white/10 hover:bg-white/15 text-white px-7 py-3.5 rounded-lg font-sans text-sm font-semibold transition-all duration-200 border border-white/20 flex items-center gap-2"
            >
              <span>Request Consultation</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Real Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] sm:w-auto max-w-[95vw]"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 bg-[#0b1b2a]/95 backdrop-blur-md rounded-xl border border-white/15 shadow-xl px-4 sm:px-8 py-3.5">
          <div className="text-center px-3 sm:px-5 py-1">
            <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
              Engineering Hours
            </div>
            <div className="font-display text-lg sm:text-2xl font-bold text-[#FF8A00]">
              50,000+
            </div>
          </div>
          <div className="text-center px-3 sm:px-5 py-1">
            <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
              Deliverables
            </div>
            <div className="font-display text-lg sm:text-2xl font-bold text-white">
              2,000+
            </div>
          </div>
          <div className="text-center px-3 sm:px-5 py-1">
            <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
              Disciplines
            </div>
            <div className="font-display text-lg sm:text-2xl font-bold text-white">
              11 Core
            </div>
          </div>
          <div className="text-center px-3 sm:px-5 py-1">
            <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">
              Quality Standard
            </div>
            <div className="font-display text-lg sm:text-2xl font-bold text-[#FF8A00]">
              ISO 9001
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
