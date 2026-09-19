"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import { Project } from "@/data/site";

interface ProjectDetailViewProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailView({
  project,
  relatedProjects,
}: ProjectDetailViewProps) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-[#1a1c1b] flex flex-col justify-between">
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full pt-14 lg:pt-20">
        {/* Breadcrumb Bar */}
        <div className="bg-slate-50 border-b border-slate-200 py-3.5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-[#FF8A00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-[#FF8A00] transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-[#0b233a] font-bold truncate max-w-xs sm:max-w-md">
              {project.title}
            </span>
          </div>
        </div>

        {/* Project Header (Classical Dark Navy Accent) */}
        <section className="bg-[#0b233a] text-white py-16 md:py-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-[#FF8A00] text-white">
                  {project.year}
                </span>
                {project.disciplines.map((d) => (
                  <span
                    key={d}
                    className="inline-block px-3 py-1 rounded text-xs font-mono uppercase bg-white/10 text-slate-200 border border-white/20"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {project.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-3xl">
                {project.scope}
              </p>
            </div>
          </div>
        </section>

        {/* Trust Credentials Strip */}
        <TrustCredentialsStrip />

        {/* Key Project Metadata Grid */}
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                  CLIENT
                </span>
                <span className="font-display text-base font-bold text-[#0b233a] block">
                  {project.client}
                </span>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                  END USER / OPERATOR
                </span>
                <span className="font-display text-base font-bold text-[#0b233a] block">
                  {project.endUser}
                </span>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                  ENGINEERING EFFORT
                </span>
                <span className="font-display text-base font-bold text-[#FF8A00] block">
                  {project.manHours ? `${project.manHours} Man-Hours` : "Turnkey Execution"}
                </span>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                  DOCUMENT DELIVERABLES
                </span>
                <span className="font-display text-base font-bold text-[#0b233a] block">
                  {project.deliverables ? `${project.deliverables} Deliverables` : "Integrated Package"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Scope of Work & Disciplines */}
        <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Scope & Methodology (7 cols) */}
              <div className="lg:col-span-7">
                <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  DETAILED SCOPE &amp; EXECUTION
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b233a] mb-6">
                  Multidisciplinary Engineering Deliverables
                </h2>

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 font-normal">
                  <p>
                    For <strong className="text-[#0b233a]">{project.title}</strong>, Saur Engineering was engaged by{" "}
                    <strong>{project.client}</strong> to perform specialized engineering design services complying with{" "}
                    <strong>{project.endUser}</strong> specifications and international engineering standards (API, ASME, IEC, ISO).
                  </p>
                  <p>
                    Our multidisciplinary execution team verified front-end packages, prepared fabrication and construction
                    drawings, generated detailed MTOs, and conducted model reviews to ensure zero constructability clashes.
                  </p>
                </div>

                {/* Quality & HSE Callout */}
                <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-2xl text-[#FF8A00]">verified</span>
                    <h3 className="font-display text-base font-bold text-[#0b233a]">
                      IMS Quality &amp; Safety Governance
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Executed under Saur&apos;s accredited ISO 9001:2015 Quality Management System and ISO 45001:2018 safety
                    guidelines, guaranteeing strict document version control, checker/approver workflows, and on-time submittals.
                  </p>
                </div>
              </div>

              {/* Right Column: Execution Team & Deliverable Breakdown (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h3 className="font-display text-lg font-bold text-[#0b233a] mb-4">
                    Assigned Disciplines
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.disciplines.map((discipline) => (
                      <div
                        key={discipline}
                        className="px-3 py-1.5 rounded bg-white border border-slate-200 text-xs font-mono font-semibold text-[#0b233a]"
                      >
                        {discipline}
                      </div>
                    ))}
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#0b233a] mb-4">
                    Execution Capabilities
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-base text-[#FF8A00] shrink-0 mt-0.5">check_circle</span>
                      <span>FEED verification &amp; detailed calculations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-base text-[#FF8A00] shrink-0 mt-0.5">check_circle</span>
                      <span>3D Model Integration &amp; Clash Resolution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-base text-[#FF8A00] shrink-0 mt-0.5">check_circle</span>
                      <span>Procurement Support &amp; Material Take-Offs (MTO)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-base text-[#FF8A00] shrink-0 mt-0.5">check_circle</span>
                      <span>As-Built Documentation &amp; Redline Incorporation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0b233a] text-white rounded-xl p-6 sm:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF8A00] font-bold block mb-2">
                    START A PROJECT
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    Have a similar requirement?
                  </h3>
                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Our Navi Mumbai and Chennai delivery centers provide engineering support for global EPC and energy assets.
                  </p>
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="inline-flex items-center justify-center w-full py-3 px-4 rounded bg-[#FF8A00] hover:bg-[#E67C00] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors gap-2"
                  >
                    <span>Request Engineering Proposal</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-16">
              <div className="max-w-2xl mb-12">
                <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  PORTFOLIO EXPLORATION
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b233a]">
                  Related Engineering Projects
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-[#FF8A00]/50 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-500">
                        <span>{p.year}</span>
                        <span className="text-[#FF8A00] font-bold">{p.client}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors mb-2">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                        {p.scope}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors">
                      <span>View Case Scope</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
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
