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
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative w-full min-h-[540px] lg:min-h-[580px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-6 bg-[#0b233a]">
      {/* Full-bleed Industrial Plant Image on Right */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/media/saur-industrial-hero.png')",
          backgroundPosition: "center right",
        }}
      />

      {/* Signature Geometric Angle Split in Corporate Deep Navy (#0b233a) */}
      <div
        className="absolute inset-0 bg-[#0b233a] [clip-path:polygon(0_0,62%_0,48%_100%,0%_100%)] hidden lg:block z-1"
      />
      {/* Mobile Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b233a] via-[#0b233a]/92 to-[#0b233a]/60 lg:hidden z-1" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 w-full my-auto py-8 sm:py-10 lg:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-white"
        >
          {/* Authentic Accreditation Eyebrow Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 mb-4 sm:mb-5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse shrink-0" />
              <span className="text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
                ISO 9001:2015 CERTIFIED · DPIIT #STARTUPINDIA
              </span>
            </div>
          </motion.div>

          {/* Authentic PDF Tagline Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] sm:leading-[1.08] mb-4 sm:mb-5"
          >
            Reliable Engineering.<br />
            Sustainable Design.<br />
            <span className="text-[#FF8A00]">Proven Results.</span>
          </motion.h1>

          {/* Simple, Genuine PDF Summary in Plain Language */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sm sm:text-base md:text-lg text-slate-200 max-w-xl mb-6 sm:mb-8 leading-relaxed font-light"
          >
            ISO 9001:2015 certified engineering consultancy delivering FEED, 3D plant modeling, detailed engineering, and skilled manpower for global Oil &amp; Gas, EPC, and industrial assets.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto justify-center bg-[#FF8A00] hover:bg-[#E67C00] text-white px-6 sm:px-7 py-3.5 rounded-md font-sans text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Explore Disciplines</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto justify-center bg-transparent hover:bg-white/10 text-white px-6 sm:px-7 py-3.5 rounded-md font-sans text-xs sm:text-sm font-semibold transition-all duration-200 border border-white/40 flex items-center gap-2"
            >
              <span>Request Consultation</span>
            </button>
          </motion.div>

          {/* Bottom Floating Stats Pill */}
          <motion.div
            variants={itemVariants}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-4 border-t border-white/15"
          >
            <div className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-display text-lg sm:text-xl font-bold text-[#FF8A00]">
                50,000+
              </div>
              <div className="font-mono text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider">
                Hours Delivered
              </div>
            </div>

            <div className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-display text-lg sm:text-xl font-bold text-white">
                2,000+
              </div>
              <div className="font-mono text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider">
                Deliverables
              </div>
            </div>

            <div className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-display text-lg sm:text-xl font-bold text-white">
                11 Core
              </div>
              <div className="font-mono text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider">
                Disciplines
              </div>
            </div>

            <div className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-display text-lg sm:text-xl font-bold text-[#FF8A00]">
                ISO 9001
              </div>
              <div className="font-mono text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider">
                Quality Standard
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
