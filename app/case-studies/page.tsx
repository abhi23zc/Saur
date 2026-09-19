"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { caseStudies } from "@/data/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function CaseStudiesPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  const allDisciplines = Array.from(
    new Set(caseStudies.flatMap((cs) => cs.disciplines))
  ).sort();

  const filtered =
    filter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.disciplines.includes(filter));

  return (
    <div className="relative min-h-screen bg-background text-on-background">
      <div className="fixed inset-0 micro-grid pointer-events-none z-[-1] opacity-[0.25]" />

      <Navbar
        onOpenSearch={() => {}}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Hero */}
      <section className="relative w-full min-h-[60svh] flex flex-col justify-end bg-[#05080c] overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen" style={{ backgroundImage: "url('/media/saur-fabrication-projects.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080c] via-[#05080c]/80 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-4 block">Engineering Success Stories</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Case Studies
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl leading-relaxed">
              Detailed engineering success stories demonstrating our multidisciplinary capability across Oil & Gas, EPC, and industrial projects.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-8 mt-10"
          >
            <div>
              <div className="font-mono text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1">Case Studies</div>
              <div className="font-display text-2xl font-bold text-[#FF8A00]">{caseStudies.length}</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1">End Users</div>
              <div className="font-display text-2xl font-bold text-white">{new Set(caseStudies.map(cs => cs.endUser)).size}+</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1">Disciplines</div>
              <div className="font-display text-2xl font-bold text-white">{allDisciplines.length}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                filter === "All"
                  ? "bg-[#FF8A00] text-white border-[#FF8A00] shadow-[0_4px_12px_rgba(255,138,0,0.25)]"
                  : "bg-white text-[#424656] border-[#e2e3e1] hover:border-[#FF8A00]/40"
              }`}
            >
              All ({caseStudies.length})
            </button>
            {allDisciplines.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  filter === d
                    ? "bg-[#FF8A00] text-white border-[#FF8A00] shadow-[0_4px_12px_rgba(255,138,0,0.25)]"
                    : "bg-white text-[#424656] border-[#e2e3e1] hover:border-[#FF8A00]/40"
                }`}
              >
                {d} ({caseStudies.filter(cs => cs.disciplines.includes(d)).length})
              </button>
            ))}
          </div>

          {/* Case Study Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cs) => (
              <motion.div key={cs.slug} variants={itemVariants}>
                <Link href={`/case-studies/${cs.slug}`} className="block group">
                  <article className="relative bg-white border border-[#e2e3e1] rounded-2xl p-7 hover:border-[#FF8A00]/40 hover:shadow-[0_8px_32px_rgba(255,138,0,0.08)] transition-all duration-500 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[#FF8A00] font-bold tracking-wider">
                        CASE STUDY {cs.number}
                      </span>
                      <span className="material-symbols-outlined text-lg text-[#c3c5d9] group-hover:text-[#FF8A00] group-hover:translate-x-1 transition-all duration-300">
                        arrow_forward
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#1a1c1b] mb-2 group-hover:text-[#FF8A00] transition-colors duration-300 leading-tight">
                      {cs.title}
                    </h3>

                    <p className="text-sm text-[#424656] leading-relaxed mb-5 flex-1 line-clamp-3">
                      {cs.scope}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[#f4f4f2] rounded-lg px-3 py-2">
                        <div className="font-mono text-[8px] text-[#737687] uppercase tracking-wider">Man-Hours</div>
                        <div className="font-display text-sm font-bold text-[#1a1c1b]">{cs.manHours}</div>
                      </div>
                      <div className="bg-[#f4f4f2] rounded-lg px-3 py-2">
                        <div className="font-mono text-[8px] text-[#737687] uppercase tracking-wider">Deliverables</div>
                        <div className="font-display text-sm font-bold text-[#1a1c1b]">{cs.deliverableCount}</div>
                      </div>
                    </div>

                    {/* Disciplines & End User */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cs.disciplines.map((d) => (
                        <span key={d} className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#05080c] text-white">
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-[#737687]">
                      End User: <span className="font-semibold text-[#424656]">{cs.endUser}</span>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF8A00] to-[#FF9A20] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#05080c] relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-4 block">Have a similar project?</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Let&apos;s discuss your engineering requirements.
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Our team brings proven expertise across instrumentation, electrical, telecom, process, mechanical and structural engineering.
          </p>
          <button
            onClick={() => setConsultationOpen(true)}
            className="group relative overflow-hidden bg-[#FF8A00] text-white px-8 py-4 rounded-md font-sans text-sm font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(255,138,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,138,0,0.4)] hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <span className="relative z-10">Start a Conversation</span>
            <span className="material-symbols-outlined text-sm relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
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
