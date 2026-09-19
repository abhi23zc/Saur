"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  FileSpreadsheet, 
  MapPin, 
  Building2, 
  UserCheck, 
  Cpu, 
  Layers, 
  Check, 
  FileText, 
  BookOpen 
} from "lucide-react";
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

  // Applicable Codes & Standards derived from sector/disciplines
  const applicableCodes = [
    { code: "ASME B31.3 / B31.4 / B31.8", desc: "Process & Pipeline Transportation Systems" },
    { code: "API 579-1 / ASME FFS-1", desc: "Fitness-for-Service & Integrity Evaluation" },
    { code: "API 650 / ASME Sec. VIII", desc: "Pressure Vessels & Storage Tanks" },
    { code: "ISO 9001:2015", desc: "Accredium Certified Quality Management" },
  ];

  // Execution highlights fallback if not explicitly present
  const executionHighlights = project.highlights && project.highlights.length > 0
    ? project.highlights
    : [
        "FEED Verification & Constructability Audit",
        "3D Model Multi-Discipline Clash Resolution",
        "Detailed Calculation Notes & Stress Verification",
        "Comprehensive MTO & Procurement Data Packages",
        "Lead Engineer Verification & QA Sign-Off",
      ];

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#FF8A00] selection:text-white flex flex-col justify-between">
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full pt-14 lg:pt-20">
        {/* Breadcrumb Bar */}
        <div className="bg-slate-50 border-b border-slate-200 py-3.5">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex items-center gap-2 text-xs font-mono text-slate-500">
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

        {/* Project Header (Clean, Authoritative Hero) */}
        <section className="bg-[#0b233a] text-white py-14 sm:py-18 lg:py-20 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
            <div className="max-w-4xl">
              
              {/* Category, Year & Location Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-[#FF8A00] text-white">
                  {project.year}
                </span>
                {project.sector && (
                  <span className="px-3 py-1 rounded text-xs font-mono uppercase bg-white/10 text-amber-300 border border-white/20 font-semibold">
                    {project.sector}
                  </span>
                )}
                {project.location && (
                  <span className="px-3 py-1 rounded text-xs font-mono text-slate-200 bg-white/5 border border-white/15 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>{project.location}</span>
                  </span>
                )}
              </div>

              {/* Headline */}
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-[1.15]">
                {project.title}
              </h1>

              {/* Scope Summary */}
              <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6 max-w-3xl">
                {project.scope}
              </p>

              {/* CTAs & Actions */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Inquire for Similar Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/projects#directory"
                  className="border border-white/30 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors"
                >
                  <span>All 18 Projects</span>
                </Link>
              </div>

              {/* Discipline Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/15">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold mr-1">
                  Disciplines:
                </span>
                {project.disciplines.map((d) => (
                  <span
                    key={d}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-white/10 text-slate-200 border border-white/15 font-medium"
                  >
                    {d}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Trust Credentials Strip */}
        <TrustCredentialsStrip />

        {/* ══════════════════════════════════════════════════════════════════════
           KEY PROJECT TELEMETRY BAR (Flat, Integrated Strip with Hairline Dividers)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 sm:py-8 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 sm:divide-x divide-slate-200">
              
              <div className="sm:px-4 first:pl-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Client / EPC
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] truncate block">
                  {project.client}
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  End User / Operator
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] truncate block">
                  {project.endUser}
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Verified Effort
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#FF8A00] block">
                  {project.manHours ? `${project.manHours} hrs` : "Turnkey Execution"}
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Deliverables Issued
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] block">
                  {project.deliverables ? `${project.deliverables} Docs` : "Full Package"}
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Asset Location
                </span>
                <span className="font-display text-xs sm:text-sm font-bold text-slate-800 truncate block">
                  {project.location || "Global Execution"}
                </span>
              </div>

              <div className="sm:px-4 last:pr-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  QA Governance
                </span>
                <span className="font-display text-xs sm:text-sm font-bold text-emerald-700 block">
                  ISO 9001:2015
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           DETAILED SCOPE, SPEC MATRIX & PHASED DELIVERABLES (Option 1)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-18 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Scope, Highlights, Spec Matrix & Phases (7 cols) */}
              <div className="lg:col-span-7 space-y-10">
                
                {/* 1. Scope & Execution Narrative */}
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b233a]/5 border border-[#0b233a]/10 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                    <span className="font-mono text-[10px] text-[#0b233a] font-bold uppercase tracking-[0.15em]">
                      AUDITED SCOPE &amp; METHODOLOGY
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b233a] mb-4">
                    Multidisciplinary Engineering Scope
                  </h2>

                  <div className="text-slate-700 leading-relaxed text-xs sm:text-sm space-y-3.5 font-normal">
                    <p>
                      For <strong className="text-[#0b233a]">{project.title}</strong>, Saur Engineering was engaged by{" "}
                      <strong>{project.client}</strong> to perform specialized engineering design services complying with{" "}
                      <strong>{project.endUser}</strong> standards, operator specifications, and international design codes.
                    </p>
                    <p>
                      Our multidisciplinary execution team in Navi Mumbai and Chennai conducted front-end package verification,
                      detailed 3D modeling, stress and thermal calculations, material take-offs (MTO), and complete drawing
                      package preparation to guarantee zero site-level clashes and seamless constructability.
                    </p>
                  </div>
                </div>

                {/* 2. Key Execution Highlights (Open Checklist - No Boxes) */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                    <span>Verified Execution Highlights</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {executionHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 py-1.5 border-b border-slate-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Technical Specification Matrix (Clean Data Sheet Table) */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#0b233a]" />
                    <span>Engineering Specification Matrix</span>
                  </h3>

                  <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-200 bg-white">
                    {/* Row 1: Software Platforms */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2 bg-slate-50/60">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        CAD / CAE Platforms
                      </span>
                      <div className="sm:col-span-2 text-xs font-mono text-slate-800 font-semibold">
                        {project.software && project.software.length > 0
                          ? project.software.join(" · ")
                          : "Smart 3D · SP-PID · CAESAR II · AutoCAD"}
                      </div>
                    </div>

                    {/* Row 2: Applicable Codes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Governing Design Codes
                      </span>
                      <div className="sm:col-span-2 text-xs font-sans text-slate-700 leading-relaxed">
                        ASME B31.3 / B31.4 / B31.8 · API 579-1 Fitness-for-Service · API 650 · DEP Shell
                      </div>
                    </div>

                    {/* Row 3: Disciplines */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2 bg-slate-50/60">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Engaged Disciplines
                      </span>
                      <div className="sm:col-span-2 text-xs font-mono text-slate-800">
                        {project.disciplines.join(" · ")}
                      </div>
                    </div>

                    {/* Row 4: Quality & Verification Protocol */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        QA &amp; Verification Protocol
                      </span>
                      <div className="sm:col-span-2 text-xs font-sans text-slate-700 leading-relaxed">
                        ISO 9001:2015 Accredium Cert. GACB892020251128 · 100% Clash-Free Navisworks QA
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Document Deliverables by Phase (Numbered Linear List) */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] mb-4 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#FF8A00]" />
                    <span>Document Deliverables by Phase</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-3.5 border-b border-slate-100">
                      <span className="font-mono text-xs font-bold text-[#FF8A00] shrink-0 pt-0.5">01.</span>
                      <div>
                        <h4 className="font-display text-sm font-bold text-[#0b233a]">FEED Verification &amp; Design Basis Calculations</h4>
                        <p className="font-sans text-xs text-slate-600 mt-0.5 leading-relaxed">
                          Process simulation validation, design basis verification, piping stress analysis reports, and equipment sizing datasheets.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pb-3.5 border-b border-slate-100">
                      <span className="font-mono text-xs font-bold text-[#FF8A00] shrink-0 pt-0.5">02.</span>
                      <div>
                        <h4 className="font-display text-sm font-bold text-[#0b233a]">3D Model Integration &amp; General Arrangements</h4>
                        <p className="font-sans text-xs text-slate-600 mt-0.5 leading-relaxed">
                          Smart 3D multi-discipline models, equipment layouts, piping GA drawings, and clash detection resolution packages.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pb-3.5 border-b border-slate-100">
                      <span className="font-mono text-xs font-bold text-[#FF8A00] shrink-0 pt-0.5">03.</span>
                      <div>
                        <h4 className="font-display text-sm font-bold text-[#0b233a]">Fabrication &amp; Spool Isometrics</h4>
                        <p className="font-sans text-xs text-slate-600 mt-0.5 leading-relaxed">
                          Isometric drawing packages, weld maps, spool sheets, structural support details, and bill of materials.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-bold text-[#FF8A00] shrink-0 pt-0.5">04.</span>
                      <div>
                        <h4 className="font-display text-sm font-bold text-[#0b233a]">Procurement Support &amp; Material Take-Offs</h4>
                        <p className="font-sans text-xs text-slate-600 mt-0.5 leading-relaxed">
                          Comprehensive MTOs, valve schedules, specialty item technical datasheets, and vendor quote review support.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky Consultation & Delivery Hub Console (5 cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                
                <div className="bg-gradient-to-b from-[#0e2c48] to-[#071929] text-white rounded-2xl p-6 sm:p-7 border border-white/15">
                  
                  {/* Category Accent Badge */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-[0.16em] mb-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                    <span>ENGINEERING ENGAGEMENT</span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-[1.25] mb-2.5">
                    Require Similar Engineering Scope?
                  </h3>

                  {/* Scope Summary Narrative */}
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal mb-5">
                    Our Navi Mumbai HQ and Chennai engineering centers integrate seamlessly with your project schedules, CAD databases, and client specifications.
                  </p>

                  {/* Delivery Hub Technical Specs Panel */}
                  <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 mb-5 divide-y divide-white/10">
                    <div className="flex items-center justify-between gap-3 pb-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
                        Headquarters
                      </span>
                      <span className="font-sans text-xs sm:text-[13px] font-bold text-white text-right">
                        Navi Mumbai, India
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 py-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
                        Engineering Hub
                      </span>
                      <span className="font-sans text-xs sm:text-[13px] font-bold text-white text-right">
                        Chennai, India
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 py-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
                        Delivery Footprint
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-300 text-right">
                        UAE · KSA · Indonesia · India
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
                        QA Certification
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 text-right">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>ISO 9001:2015 QMS</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="group inline-flex items-center justify-center w-full py-3.5 px-5 rounded-lg bg-[#FF8A00] hover:bg-[#E67C00] text-white text-xs font-sans uppercase font-bold tracking-wider transition-all duration-200 gap-2 cursor-pointer mb-3.5 shadow-sm"
                  >
                    <span>Request Project Proposal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Back Link */}
                  <div className="text-center">
                    <Link
                      href="/projects#directory"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs font-mono transition-colors"
                    >
                      <span>← Back to All 18 Executed Projects</span>
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           RELATED PROJECTS SECTION (Clean & Responsive)
           ══════════════════════════════════════════════════════════════════════ */}
        {relatedProjects.length > 0 && (
          <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
              
              <div className="max-w-2xl mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF8A00] font-bold block mb-1">
                  PORTFOLIO EXPLORATION
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b233a]">
                  Related Engineering Works
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#0b233a] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview */}
                      {p.image && (
                        <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover object-center brightness-[0.9] group-hover:scale-102 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                            <span className="font-mono text-[10px] font-bold bg-[#FF8A00] px-2 py-0.5 rounded">
                              {p.endUser}
                            </span>
                            <span className="font-mono text-[10px] text-slate-300">
                              {p.year}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-4 sm:p-5">
                        <div className="text-[10px] font-mono text-[#FF8A00] uppercase font-bold mb-1">
                          {p.sector || "Detailed Engineering"}
                        </div>
                        <h3 className="font-display text-base font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors mb-2 line-clamp-2 leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-3 font-normal leading-relaxed">
                          {p.scope}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors">
                      <span>Inspect Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
