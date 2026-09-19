"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
          backgroundImage: "url('/media/page-company-hero.png')",
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
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full my-auto py-10 lg:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-white"
        >
          {/* Authentic Accreditation Badge */}
          <motion.div variants={itemVariants}>
            <Link
              href="/company#certificates"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white/90 hover:text-white transition-all text-xs font-mono font-medium tracking-wide mb-5 group backdrop-blur-md shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF8A00]" />
              <span>ISO 9001:2015 CERTIFIED</span>
              <span className="text-white/40">|</span>
              <span className="text-[#FF8A00] font-bold">DPIIT #STARTUPINDIA</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform text-[#FF8A00]">
                arrow_forward
              </span>
            </Link>
          </motion.div>

          {/* Authentic PDF Tagline Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-5"
          >
            Reliable Engineering.<br />
            Sustainable Design.<br />
            <span className="text-[#FF8A00]">Proven Results.</span>
          </motion.h1>

          {/* Simple, Genuine PDF Summary in Plain Language */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-slate-200 max-w-xl mb-8 leading-relaxed font-light"
          >
            ISO 9001:2015 certified engineering consultancy delivering FEED, 3D plant modeling, detailed engineering, and skilled manpower for global Oil &amp; Gas, EPC, and industrial assets.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onExplore}
              className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded-md font-sans text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Explore Disciplines</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
            <button
              onClick={onOpenConsultation}
              className="bg-transparent hover:bg-white/10 text-white px-7 py-3.5 rounded-md font-sans text-sm font-semibold transition-all duration-200 border border-white/40 flex items-center gap-2"
            >
              <span>Request Consultation</span>
            </button>
          </motion.div>

          {/* Bottom Floating Stats Pill */}
          <motion.div
            variants={itemVariants}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-white/15"
          >
            <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-display text-xl font-bold text-[#FF8A00]">
                50,000+
              </div>
              <div className="font-mono text-[9px] text-slate-300 uppercase tracking-wider">
                Hours Delivered
              </div>
            </div>

            <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-display text-xl font-bold text-white">
                2,000+
              </div>
              <div className="font-mono text-[9px] text-slate-300 uppercase tracking-wider">
                Deliverables
              </div>
            </div>

            <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-display text-xl font-bold text-white">
                11 Core
              </div>
              <div className="font-mono text-[9px] text-slate-300 uppercase tracking-wider">
                Disciplines
              </div>
            </div>

            <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-display text-xl font-bold text-[#FF8A00]">
                ISO 9001
              </div>
              <div className="font-mono text-[9px] text-slate-300 uppercase tracking-wider">
                Quality Standard
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
