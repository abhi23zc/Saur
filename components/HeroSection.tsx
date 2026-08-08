"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onExplore: () => void;
  onOpenConsultation: () => void;
}

export default function HeroSection({ onExplore, onOpenConsultation }: HeroSectionProps) {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toUTCString().split(" ").slice(4, 5)[0] + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#05080c] overflow-hidden pt-32 md:pt-40 pb-40 md:pb-32">
      {/* Premium Dark Tech Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida/AP1WRLthXp8x2DBlPIRMaB5o0YK_8vV-YAYxSNci05thmyyE1INNKne1B-DnAkvZZE2-rH4pw20_uupXreKL1K3XKE4WBcDv60wjE4LsYThlnyMK45sqDBUxnqNG4mtrbwzwcDoL6l_iaP_9R-GVVjKksarNgZZ6QVk6MpKrZT_qRhoLzuyKKNlKg4yOmnRsW5FLoDHTruu2LsLS8L1m2oODQVDQjSYtx4ZfTr7UqDxyzapqscEOuKaWI0xrlQ')",
        }}
      />

      {/* Sophisticated Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05080c] via-[#05080c]/80 to-transparent opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0b5fff]/5 via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full mt-10 md:mt-0 flex flex-col items-start justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6 font-mono text-[12px] uppercase tracking-widest font-bold text-[#FF8A00]">
            ISO 9001:2015 CERTIFIED
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter text-white"
          >
            Reliable Engineering.<br />
            Sustainable Design.<br />
            <span className="text-[#FF8A00]">Proven Results.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-sans text-base md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-light"
          >
            Trusted by ADNOC, L&T Hydrocarbon, Saudi Aramco & more — delivering engineering excellence across Oil & Gas, EPC, and industrial projects.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 relative z-10">
            <button
              onClick={onExplore}
              className="group relative overflow-hidden bg-[#FF8A00] text-white px-8 py-4 rounded-md font-sans text-sm font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(255,138,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,138,0,0.4)] hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="relative z-10">Explore Our Services</span>
              <span className="material-symbols-outlined text-sm relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button
              onClick={onOpenConsultation}
              className="group text-white px-8 py-4 rounded-md font-sans text-sm font-bold transition-all duration-300 flex items-center gap-3 border border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
            >
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Floating Stats Pill */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2.5rem)] sm:w-max max-w-[95vw]"
      >
        <div className="grid grid-cols-3 divide-x divide-white/10 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] px-2 sm:px-10 md:px-14 py-4 sm:py-5">
          <div className="text-center px-3 sm:px-6">
            <div className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1 sm:mb-1.5">
              Active Projects
            </div>
            <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A20] to-[#FF8A00]">
              500+
            </div>
          </div>
          <div className="text-center px-3 sm:px-6">
            <div className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1 sm:mb-1.5">
              Quality
            </div>
            <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              ISO 9001
            </div>
          </div>
          <div className="text-center px-3 sm:px-6">
            <div className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1 sm:mb-1.5">
              Global Reach
            </div>
            <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              10+
              <span className="hidden sm:inline"> Countries</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
