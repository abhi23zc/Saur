"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import { expertise } from "@/data/site";

const expertiseIcons: Record<string, string> = {
  telecommunication: "cell_tower",
  electrical: "bolt",
  instrumentation: "sensors",
  "piping-mechanical": "plumbing",
  process: "science",
  "3d-modelling": "view_in_ar",
  subsea: "scuba_diving",
  "flow-assurance": "water_drop",
  "yard-fabrication": "factory",
  pipeline: "route",
  "civil-structural": "apartment",
};

export default function ExpertisePage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Piping & Mechanical",
    "Electrical & Instrumentation",
    "Civil & Structural",
    "Process & Flow Assurance",
  ];

  const filteredExpertise = expertise.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Piping & Mechanical") {
      return ["piping-mechanical", "3d-modelling", "pipeline", "yard-fabrication"].includes(item.slug);
    }
    if (activeCategory === "Electrical & Instrumentation") {
      return ["electrical", "instrumentation", "telecommunication"].includes(item.slug);
    }
    if (activeCategory === "Civil & Structural") {
      return ["civil-structural", "subsea"].includes(item.slug);
    }
    if (activeCategory === "Process & Flow Assurance") {
      return ["process", "flow-assurance"].includes(item.slug);
    }
    return true;
  });

  return (
    <div className="relative min-h-screen bg-white text-[#1a1c1b] flex flex-col justify-between">
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full pt-14 lg:pt-20">
        {/* ══════════════════════════════════════════════════════════════════════
           1. HERO: Diagonal Angle-Split Hero
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[480px] lg:min-h-[520px] overflow-hidden flex items-center bg-[#0b233a]">
          {/* Right Photographic Background */}
          <div className="absolute inset-0 lg:left-1/3">
            <img
              src="/media/expertise-design-office.png"
              alt="Multidisciplinary Engineering Office"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#0b233a]/80 lg:bg-[#0b233a]/40 backdrop-blur-[1px]" />
          </div>

          {/* Left Diagonal Navy Angle-Split Polygon */}
          <div
            className="absolute inset-0 bg-[#0b233a] hidden lg:block"
            style={{
              clipPath: "polygon(0 0, 62% 0, 48% 100%, 0 100%)",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full py-16">
            <div className="max-w-2xl">
              {/* Orange Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-0.5 bg-[#FF8A00]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold">
                  MULTIDISCIPLINARY CAPABILITIES
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                11 engineering disciplines. <br />
                <span className="text-[#FF8A00]">One integrated delivery.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-8 max-w-xl">
                Every discipline is structured around clear, audited engineering deliverables — ensuring
                constructability, regulatory compliance, and seamless inter-discipline coordination.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <span>Consult an Engineering Lead</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>

                <a
                  href="#disciplines"
                  className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2"
                >
                  <span>Explore 11 Disciplines</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           2. TRUST CREDENTIALS STRIP
           ══════════════════════════════════════════════════════════════════════ */}
        <TrustCredentialsStrip />

        {/* ══════════════════════════════════════════════════════════════════════
           3. 11 DISCIPLINE DIRECTORY: Classical Light Cards
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-slate-50 border-b border-slate-200" id="disciplines">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  DISCIPLINE DIRECTORY
                </span>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight">
                  Comprehensive Engineering Expertise
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors border ${
                      activeCategory === cat
                        ? "bg-[#0b233a] text-white border-[#0b233a]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-[#FF8A00]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExpertise.map((item) => {
                const isExpanded = expanded === item.slug;
                return (
                  <article
                    key={item.slug}
                    className="bg-white border border-slate-200 rounded-xl p-7 hover:border-[#FF8A00]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded border border-slate-200 flex items-center justify-center text-[#0b233a] group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors">
                          <span className="material-symbols-outlined text-2xl">
                            {expertiseIcons[item.slug] || "engineering"}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#FF8A00] font-bold tracking-wider">
                          DISCIPLINE {item.number}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-[#0b233a] mb-2 group-hover:text-[#FF8A00] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                        {item.summary}
                      </p>

                      {/* Deliverables List */}
                      <div className="pt-4 border-t border-slate-100">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                          Standard Deliverables ({item.deliverables.length}):
                        </span>

                        <ul className="space-y-1.5">
                          {(isExpanded ? item.deliverables : item.deliverables.slice(0, 4)).map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <span className="material-symbols-outlined text-sm text-[#FF8A00] shrink-0 mt-0.5">
                                check
                              </span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>

                        {item.deliverables.length > 4 && (
                          <button
                            onClick={() => setExpanded(isExpanded ? null : item.slug)}
                            className="mt-3 text-xs font-mono font-bold text-[#FF8A00] hover:underline flex items-center gap-1"
                          >
                            <span>{isExpanded ? "Show fewer deliverables" : `+${item.deliverables.length - 4} more deliverables`}</span>
                            <span className="material-symbols-outlined text-sm">
                              {isExpanded ? "expand_less" : "expand_more"}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setConsultationOpen(true)}
                        className="text-xs font-mono font-bold uppercase tracking-wider text-[#0b233a] hover:text-[#FF8A00] transition-colors flex items-center gap-1"
                      >
                        <span>Request Discipline Scope</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. ENGINEERING SOFTWARE & PLATFORMS
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="max-w-2xl mb-12">
              <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                TOOLS &amp; INFRASTRUCTURE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight">
                Industry Standard Engineering Software
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "AVEVA E3D / PDMS", category: "Plant 3D Modeling" },
                { name: "Intergraph SP3D", category: "Multidiscipline 3D" },
                { name: "Caesar II", category: "Piping Stress Analysis" },
                { name: "ETAP", category: "Power System Studies" },
                { name: "STAAD.Pro", category: "Structural Analysis" },
                { name: "SmartPlant SPI", category: "Instrumentation (InTools)" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#FF8A00]/50 hover:shadow-xs transition-all text-center"
                >
                  <div className="font-display text-sm font-bold text-[#0b233a] mb-1">
                    {tool.name}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    {tool.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           5. ACTION CTA
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-[#0b233a] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
            <div className="w-8 h-1 bg-[#FF8A00] mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Explore how our disciplines integrate for your project
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base font-light leading-relaxed">
              Connect directly with our multidisciplinary design leads in Mumbai and Chennai.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>Request Scope Review</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <Link
                href="/projects"
                className="border border-white/40 hover:bg-white/10 text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>View Delivered Projects</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectDiscipline={() => {}}
        onSelectWhitepaper={() => {}}
      />
    </div>
  );
}
