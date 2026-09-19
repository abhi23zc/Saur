"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { workforce, domainSME, otSecurity } from "@/data/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function DigitalWorkforcePage() {
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
        <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen" style={{ backgroundImage: "url('/media/page-digital-workforce-hero.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080c] via-[#05080c]/80 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-4 block">Workforce & Domain Solutions</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              People, expertise,<br />
              <span className="text-[#FF8A00]">and security.</span>
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl leading-relaxed">
              Manpower solutions, domain expertise for IT organizations, and OT cybersecurity aligned with IEC 62443.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
         Section 1: Manpower & Workforce Solutions
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" id="workforce">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-3 block">Manpower & Workforce Solutions</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1c1b] tracking-tight mb-4">
              Skilled workforce for onshore, yard & offshore.
            </h2>
            <p className="text-[#424656] leading-relaxed">
              {workforce.intro}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {/* Core Expertise */}
            <motion.div variants={itemVariants} className="bg-white border border-[#e2e3e1] rounded-2xl p-8 hover:border-[#FF8A00]/40 hover:shadow-[0_8px_32px_rgba(255,138,0,0.08)] transition-all duration-500">
              <span className="material-symbols-outlined text-3xl text-[#FF8A00] mb-4 block">engineering</span>
              <h3 className="font-display text-lg font-bold text-[#1a1c1b] mb-4">Core Expertise</h3>
              <ul className="space-y-3">
                {workforce.coreExpertise.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#424656]">
                    <span className="material-symbols-outlined text-[14px] text-[#FF8A00] mt-0.5 shrink-0">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Capabilities */}
            {workforce.capabilities.map((cap) => (
              <motion.div key={cap.title} variants={itemVariants} className="bg-white border border-[#e2e3e1] rounded-2xl p-8 hover:border-[#FF8A00]/40 hover:shadow-[0_8px_32px_rgba(255,138,0,0.08)] transition-all duration-500">
                <span className="material-symbols-outlined text-3xl text-[#FF8A00] mb-4 block">
                  {cap.title.includes("Electrical") ? "electrical_services" : "build"}
                </span>
                <h3 className="font-display text-lg font-bold text-[#1a1c1b] mb-4">{cap.title}</h3>
                <ul className="space-y-3">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#424656]">
                      <span className="material-symbols-outlined text-[14px] text-[#FF8A00] mt-0.5 shrink-0">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Industries Served + Commitment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#05080c] rounded-2xl p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6">Industries Served</h3>
              <div className="flex flex-wrap gap-2">
                {workforce.industriesServed.map((ind) => (
                  <span key={ind} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/10">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#FF8A00] to-[#FF9A20] rounded-2xl p-8 flex items-center">
              <div>
                <span className="material-symbols-outlined text-3xl text-white/90 mb-3 block">verified_user</span>
                <h3 className="font-display text-lg font-bold text-white mb-2">Commitment & Quality</h3>
                <p className="text-white/90 text-sm leading-relaxed">{workforce.commitment}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
         Section 2: Domain/SME Support for IT Companies
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#f4f4f2]" id="domain">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-3 block">Domain / SME Support for IT Companies</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1c1b] tracking-tight mb-4">
              Empowering IT firms through deep domain knowledge.
            </h2>
            <p className="text-[#424656] leading-relaxed">
              We provide subject matter expertise that enables IT organizations to deliver customer-centric solutions across industries.
            </p>
          </div>

          {/* Domain + SME Support */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <motion.div variants={itemVariants} className="bg-white border border-[#e2e3e1] rounded-2xl p-8">
              <span className="material-symbols-outlined text-3xl text-[#FF8A00] mb-4 block">domain</span>
              <h3 className="font-display text-lg font-bold text-[#1a1c1b] mb-4">{domainSME.domainSupport.title}</h3>
              <ul className="space-y-3">
                {domainSME.domainSupport.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#424656]">
                    <span className="material-symbols-outlined text-[14px] text-[#FF8A00] mt-0.5 shrink-0">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white border border-[#e2e3e1] rounded-2xl p-8">
              <span className="material-symbols-outlined text-3xl text-[#FF8A00] mb-4 block">psychology</span>
              <h3 className="font-display text-lg font-bold text-[#1a1c1b] mb-4">{domainSME.smeSupport.title}</h3>
              <ul className="space-y-3">
                {domainSME.smeSupport.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#424656]">
                    <span className="material-symbols-outlined text-[14px] text-[#FF8A00] mt-0.5 shrink-0">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Core Service Areas */}
          <h3 className="font-display text-xl font-bold text-[#1a1c1b] mb-6">Core Service Areas</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {domainSME.serviceAreas.map((area, i) => (
              <motion.div key={area.title} variants={itemVariants} className="bg-white border border-[#e2e3e1] rounded-2xl p-8 hover:border-[#FF8A00]/40 hover:shadow-[0_8px_32px_rgba(255,138,0,0.08)] transition-all duration-500">
                <div className="w-8 h-8 rounded-lg bg-[#FF8A00]/10 flex items-center justify-center mb-4">
                  <span className="font-mono text-xs font-bold text-[#FF8A00]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h4 className="font-display text-lg font-bold text-[#1a1c1b] mb-2">{area.title}</h4>
                <p className="text-sm text-[#737687] mb-4">{area.description}</p>
                <ul className="space-y-2">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#424656]">
                      <span className="text-[#FF8A00] mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
         Section 3: OT Security Roadmap
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#05080c] relative overflow-hidden" id="ot-security">
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-3 block">OT Security Roadmap · IEC 62443</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Securing critical infrastructure with IEC 62443.
            </h2>
            <p className="text-white/60 leading-relaxed">
              {otSecurity.intro}
            </p>
          </div>

          {/* Security Approach Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            {otSecurity.approach.map((step, i) => (
              <motion.div
                key={step}
                variants={itemVariants}
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#FF8A00]/40 transition-all duration-500 group"
              >
                <div className="font-display text-3xl font-bold text-[#FF8A00]/30 mb-3 group-hover:text-[#FF8A00]/60 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="font-display text-sm font-bold text-white leading-snug">
                  {step}
                </h4>
                {i < otSecurity.approach.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-white/20">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-4 block">Ready to get started?</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1a1c1b] tracking-tight mb-6">
            Let&apos;s discuss your requirements.
          </h2>
          <p className="text-[#424656] max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you need skilled manpower, domain expertise for IT, or OT security solutions — our team is ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setConsultationOpen(true)}
              className="group bg-[#FF8A00] text-white px-8 py-4 rounded-md font-sans text-sm font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(255,138,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,138,0,0.4)] hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Get a Quote
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <Link
              href="/contact"
              className="text-[#1a1c1b] px-8 py-4 rounded-md font-sans text-sm font-bold transition-all duration-300 flex items-center gap-3 border border-[#e2e3e1] hover:bg-[#f4f4f2] hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
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
