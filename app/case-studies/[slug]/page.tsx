"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { caseStudyBySlug, caseStudies } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export default function CaseStudyDetailPage({ params }: Props) {
  const { slug } = use(params);
  const cs = caseStudyBySlug(slug);
  const [consultationOpen, setConsultationOpen] = useState(false);

  if (!cs) notFound();

  // Find next case study for navigation
  const currentIdx = caseStudies.findIndex((c) => c.slug === slug);
  const nextCs = caseStudies[(currentIdx + 1) % caseStudies.length];
  const prevCs = caseStudies[(currentIdx - 1 + caseStudies.length) % caseStudies.length];

  return (
    <div className="relative min-h-screen bg-background text-on-background">
      <div className="fixed inset-0 micro-grid pointer-events-none z-[-1] opacity-[0.25]" />

      <Navbar
        onOpenSearch={() => {}}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Hero */}
      <section className="relative w-full min-h-[55svh] flex flex-col justify-end bg-[#05080c] overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen" style={{ backgroundImage: "url('/media/saur-engineering-coordination.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080c] via-[#05080c]/85 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/50 hover:text-[#FF8A00] transition-colors font-sans text-sm mb-6">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Case Studies
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-4 block">
              Case Study {cs.number} · {cs.endUser}
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 max-w-4xl">
              {cs.title}
            </h1>
            <p className="font-sans text-base md:text-lg text-white/70 max-w-3xl leading-relaxed">
              {cs.scope}
            </p>
          </motion.div>

          {/* Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-6 mt-10"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3">
              <div className="font-mono text-[8px] text-white/40 uppercase tracking-[0.2em] mb-1">Man-Hours</div>
              <div className="font-display text-xl font-bold text-[#FF8A00]">{cs.manHours}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3">
              <div className="font-mono text-[8px] text-white/40 uppercase tracking-[0.2em] mb-1">Deliverables</div>
              <div className="font-display text-xl font-bold text-white">{cs.deliverableCount}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3">
              <div className="font-mono text-[8px] text-white/40 uppercase tracking-[0.2em] mb-1">End User</div>
              <div className="font-display text-xl font-bold text-white">{cs.endUser}</div>
            </div>
            {cs.client && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3">
                <div className="font-mono text-[8px] text-white/40 uppercase tracking-[0.2em] mb-1">Client</div>
                <div className="font-display text-xl font-bold text-white">{cs.client}</div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Discipline Tags */}
      <section className="py-6 border-b border-[#e2e3e1]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-wrap gap-2">
          <span className="text-xs text-[#737687] font-semibold uppercase tracking-wider mr-2 self-center">Disciplines:</span>
          {cs.disciplines.map((d) => (
            <span key={d} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#05080c] text-white">
              {d}
            </span>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold mb-3 block">Engineering Deliverables</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1c1b] tracking-tight mb-4">
              Scope and deliverables
            </h2>
            <p className="text-[#424656] leading-relaxed">
              Complete breakdown of the engineering deliverables produced for this project, organized by discipline.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {cs.deliverables.map((group, gi) => (
              <div
                key={group.category}
                className="bg-white border border-[#e2e3e1] rounded-2xl p-8 hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-shadow duration-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#FF8A00]/10 flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-[#FF8A00]">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#1a1c1b]">
                    {group.category}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#424656] leading-relaxed">
                      <span className="material-symbols-outlined text-[14px] text-[#FF8A00] mt-0.5 shrink-0">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-[#e2e3e1]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex justify-between items-center">
          <Link
            href={`/case-studies/${prevCs.slug}`}
            className="group flex items-center gap-3 text-[#424656] hover:text-[#FF8A00] transition-colors"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#737687]">Previous</div>
              <div className="font-display text-sm font-bold">Case Study {prevCs.number}</div>
            </div>
          </Link>
          <Link
            href={`/case-studies/${nextCs.slug}`}
            className="group flex items-center gap-3 text-[#424656] hover:text-[#FF8A00] transition-colors text-right"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#737687]">Next</div>
              <div className="font-display text-sm font-bold">Case Study {nextCs.number}</div>
            </div>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#05080c] relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Have a related requirement?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Speak with the Saur team about your engineering project.
          </p>
          <button
            onClick={() => setConsultationOpen(true)}
            className="bg-[#FF8A00] text-white px-8 py-4 rounded-md font-sans text-sm font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(255,138,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,138,0,0.4)] hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            Start a Conversation
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
