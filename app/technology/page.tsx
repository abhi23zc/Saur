"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { engineeringPlatforms, industryTools } from "@/data/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function TechnologyPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-on-background">
      <div className="fixed inset-0 micro-grid pointer-events-none z-[-1] opacity-[0.25]" />

      <Navbar
        onOpenSearch={() => {}}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Hero */}
      <section className="relative w-full min-h-[60svh] flex flex-col justify-end bg-[#05080c] overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen" style={{ backgroundImage: "url('/media/expertise-design-office.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080c] via-[#05080c]/80 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-4 block">Specialized Software</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              The right tools behind<br />
              <span className="text-[#FF8A00]">every deliverable.</span>
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl leading-relaxed">
              Industry-recognized engineering platforms support coordinated, high-quality design, modelling and analysis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Engineering Software & Platforms */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-3 block">Engineering Software & Platforms</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1c1b] tracking-tight mb-4">
              Smart Plant & 3D design platforms.
            </h2>
            <p className="text-[#424656] leading-relaxed">
              Our engineering teams work with best-in-class intelligent plant design, P&ID, and instrumentation platforms from Hexagon, AVEVA, Bentley, and Autodesk.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {engineeringPlatforms.map((tool) => (
              <motion.div
                key={tool}
                variants={itemVariants}
                className="group bg-white border border-[#e2e3e1] rounded-xl px-5 py-5 hover:border-[#FF8A00]/40 hover:shadow-[0_8px_32px_rgba(255,138,0,0.08)] transition-all duration-500 text-center"
              >
                <span className="material-symbols-outlined text-2xl text-[#c3c5d9] group-hover:text-[#FF8A00] transition-colors duration-300 mb-2 block">
                  view_in_ar
                </span>
                <span className="font-sans text-xs font-bold text-[#1a1c1b] group-hover:text-[#FF8A00] transition-colors duration-300 leading-tight block">
                  {tool}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry-Specific Tools */}
      <section className="py-24 md:py-32 bg-[#f4f4f2]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-3 block">Industry-Specific Tools</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1c1b] tracking-tight mb-4">
              Specialist calculation & analysis software.
            </h2>
            <p className="text-[#424656] leading-relaxed">
              Purpose-built tools for stress analysis, vessel design, electrical studies, lighting calculations, structural analysis, and 3D coordination.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
          >
            {industryTools.map((tool) => (
              <motion.div
                key={tool}
                variants={itemVariants}
                className="group bg-white border border-[#e2e3e1] rounded-xl px-4 py-5 hover:border-[#FF8A00]/40 hover:shadow-[0_4px_16px_rgba(255,138,0,0.06)] transition-all duration-500 text-center"
              >
                <span className="material-symbols-outlined text-2xl text-[#c3c5d9] group-hover:text-[#FF8A00] transition-colors duration-300 mb-2 block">
                  calculate
                </span>
                <span className="font-sans text-xs font-bold text-[#1a1c1b] group-hover:text-[#FF8A00] transition-colors duration-300 block">
                  {tool}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
