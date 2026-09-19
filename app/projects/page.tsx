"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import { projects } from "@/data/site";

export default function ProjectsPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  const allDisciplines = Array.from(
    new Set(projects.flatMap((p) => p.disciplines))
  ).sort();

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.disciplines.includes(filter));

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
              src="/media/saur-fabrication-projects.png"
              alt="Industrial Engineering Projects"
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
                  PROJECT TRACK RECORD
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Engineering delivered for <br />
                <span className="text-[#FF8A00]">critical industrial assets.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-8 max-w-xl">
                A track record of FEED verification, detailed engineering, 3D modelling, MTO calculations,
                and execution support for energy and infrastructure majors across the Middle East and India.
              </p>

              {/* CTAs & Stats */}
              <div className="flex flex-wrap items-center gap-8">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <span>Discuss a Project</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>

                <div className="flex items-center gap-6 text-white font-mono text-xs">
                  <div>
                    <span className="text-xl font-bold font-display text-[#FF8A00] block">
                      {projects.length}+
                    </span>
                    <span className="text-slate-300 text-[10px] uppercase tracking-wider">Major Works</span>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <span className="text-xl font-bold font-display text-white block">
                      {allDisciplines.length}
                    </span>
                    <span className="text-slate-300 text-[10px] uppercase tracking-wider">Disciplines</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           2. TRUST CREDENTIALS STRIP
           ══════════════════════════════════════════════════════════════════════ */}
        <TrustCredentialsStrip />

        {/* ══════════════════════════════════════════════════════════════════════
           3. PROJECTS DIRECTORY WITH DISCIPLINE FILTERS
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-12">
              <button
                onClick={() => setFilter("All")}
                className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors border ${
                  filter === "All"
                    ? "bg-[#0b233a] text-white border-[#0b233a]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#FF8A00]"
                }`}
              >
                All Projects ({projects.length})
              </button>
              {allDisciplines.map((d) => (
                <button
                  key={d}
                  onClick={() => setFilter(d)}
                  className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors border ${
                    filter === d
                      ? "bg-[#0b233a] text-white border-[#0b233a]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-[#FF8A00]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-7 hover:border-[#FF8A00]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Row: Year & Client */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#FF8A00]">
                        {project.year}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                        {project.client}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#0b233a] mb-2 group-hover:text-[#FF8A00] transition-colors leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6 line-clamp-3">
                      {project.scope}
                    </p>

                    {/* Metadata Pills */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 mb-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        End User: {project.endUser}
                      </span>
                      {project.disciplines.map((disc) => (
                        <span
                          key={disc}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-[#FF8A00] border border-amber-200"
                        >
                          {disc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors">
                    <span>
                      {project.deliverables ? `${project.deliverables} Deliverables` : "Full Scope Review"}
                    </span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. ACTION CTA
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-[#0b233a] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
            <div className="w-8 h-1 bg-[#FF8A00] mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Looking for specialized engineering execution?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base font-light leading-relaxed">
              We provide detail engineering, 3D modelling, and dedicated engineering team deputation for international EPCs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>Request Project Proposal</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <Link
                href="/company#certificates"
                className="border border-white/40 hover:bg-white/10 text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>View Certifications</span>
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
