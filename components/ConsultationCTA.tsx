"use client";

import { motion } from "framer-motion";

interface ConsultationCTAProps {
  onOpenConsultation: () => void;
}

export default function ConsultationCTA({ onOpenConsultation }: ConsultationCTAProps) {
  return (
    <section className="py-24 md:py-32 bg-[#0a0f18] text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF8A00]/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1440px] mx-auto px-6 md:px-16 text-center relative z-10"
      >
        <span className="font-mono text-[10px] text-[#FF8A00] uppercase tracking-[0.2em] block font-bold mb-4">
          Enterprise Engagement
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tighter uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
          Ready to Define the Next Frontier?
        </h2>
        <p className="font-sans text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Partner with Saur Engineering &amp; Consultancy to deliver your most ambitious
          infrastructure and industrial projects with unprecedented precision.
        </p>

        <button
          onClick={onOpenConsultation}
          className="shimmer-sweep group inline-flex items-center gap-3 bg-[#FF8A00] text-white px-9 py-4 rounded-full font-sans text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#ffaa44] transition-all duration-300 shadow-[0_0_40px_rgba(255,138,0,0.3)] hover:shadow-[0_0_60px_rgba(255,138,0,0.55)] hover:-translate-y-0.5"
        >
          Initiate Consultation
          <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </motion.div>
    </section>
  );
}
