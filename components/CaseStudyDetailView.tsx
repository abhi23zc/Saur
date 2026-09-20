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
  ArrowLeft,
  Clock,
  FileSpreadsheet,
  Building2,
  BookOpen,
  Layers,
  Cpu,
  FileCheck,
  FileText,
  Compass,
} from "lucide-react";
import { CaseStudy } from "@/data/site";

interface CaseStudyDetailViewProps {
  caseStudy: CaseStudy;
  prevCaseStudy: CaseStudy;
  nextCaseStudy: CaseStudy;
  relatedCaseStudies: CaseStudy[];
}

export default function CaseStudyDetailView({
  caseStudy,
  prevCaseStudy,
  nextCaseStudy,
  relatedCaseStudies,
}: CaseStudyDetailViewProps) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Derive relevant software tools based on disciplines
  const getToolsForDisciplines = (disciplines: string[]) => {
    const tools: string[] = [];
    if (disciplines.some((d) => /telecom/i.test(d))) {
      tools.push("Smart 3D (Telecom)", "AutoCAD", "ETAP", "Telecom Coverage Modelling");
    }
    if (disciplines.some((d) => /instrument/i.test(d))) {
      tools.push("Smart 3D", "SmartPlant Instrumentation (SPI / INtools)", "AutoCAD");
    }
    if (disciplines.some((d) => /electrical/i.test(d))) {
      tools.push("ETAP", "Dialux", "Smart 3D (Electrical)", "AutoCAD");
    }
    if (disciplines.some((d) => /piping|stress/i.test(d))) {
      tools.push("Smart 3D", "CAESAR II", "AutoPIPE", "SP-PID");
    }
    if (disciplines.some((d) => /process/i.test(d))) {
      tools.push("HYSYS", "SP-PID", "Flarenet", "Hydraulics Calc");
    }
    if (disciplines.some((d) => /civil|structural|lifting/i.test(d))) {
      tools.push("STAAD.Pro", "Tekla Structures", "AutoCAD");
    }
    if (tools.length === 0) {
      tools.push("Smart 3D", "AutoCAD", "Navisworks QA", "SP-PID");
    }
    return Array.from(new Set(tools)).join(" · ");
  };

  // Derive governing operator design standards
  const getGoverningStandards = (endUser: string) => {
    if (/adnoc/i.test(endUser)) {
      return "ADNOC Standards (DEP/DGS) · Shell DEPs · ASME B31.3 / B31.8 · API 520/521 · ISO 9001:2015";
    }
    if (/aramco/i.test(endUser)) {
      return "Saudi Aramco Engineering Standards (SAES / SAEP) · ASME Sec VIII · API 650 · ISO 9001:2015";
    }
    if (/emarat/i.test(endUser)) {
      return "EMARAT Technical Guidelines · ASME B31.8 (Gas Transmission) · API 1104 · NFPA 54";
    }
    if (/pertamina/i.test(endUser)) {
      return "Pertamina EP Standards · ASME B31.3 · API 14C · API 579-1 Fitness-for-Service";
    }
    return "ASME / API / IEEE Industry Codes · Operator Technical Specifications · ISO 9001:2015 QA";
  };

  const totalDeliverablesCount = caseStudy.deliverables.reduce(
    (acc, group) => acc + group.items.length,
    0
  );

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
            <Link href="/case-studies" className="hover:text-[#FF8A00] transition-colors">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-[#0b233a] font-bold truncate max-w-xs sm:max-w-md">
              Case Study {caseStudy.number} · {caseStudy.title}
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
           CASE STUDY HEADER (Clean, Authoritative Masthead with Photographic BG)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#0b233a] text-white py-14 sm:py-18 lg:py-20 relative overflow-hidden">
          {/* Photographic Background Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/saur-engineering-coordination.png')",
              backgroundPosition: "center right",
            }}
          >
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b233a] via-[#0b233a]/90 to-[#0b233a]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a] via-transparent to-transparent" />
            
            {/* Editorial Badge on Right (Desktop) */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white">
              <div className="w-8 h-0.5 bg-[#FF8A00] ml-auto mb-2" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                ENGINEERING CASE FILE
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
                {caseStudy.endUser} · {caseStudy.manHours} HRS
              </div>
            </div>

            <div className="hidden xl:block absolute bottom-12 right-16 text-right text-white/80 font-mono text-[10px] uppercase tracking-[0.2em]">
              ISO 9001:2015 CERTIFIED DELIVERY
            </div>
          </div>

          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
            <div className="max-w-4xl">
              
              {/* Category, Number & Operator Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-[#FF8A00] text-white">
                  CASE STUDY {caseStudy.number}
                </span>
                <span className="px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-white/10 text-amber-300 border border-white/20">
                  {caseStudy.endUser}
                </span>
                {caseStudy.client && (
                  <span className="px-3 py-1 rounded text-xs font-mono text-slate-200 bg-white/5 border border-white/15 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>Client: {caseStudy.client}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-[1.15]">
                {caseStudy.title}
              </h1>

              {/* Scope Narrative */}
              <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6 max-w-3xl">
                {caseStudy.scope}
              </p>

              {/* CTAs & Actions */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Inquire for Similar Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/case-studies"
                  className="border border-white/30 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>All 13 Case Studies</span>
                </Link>
              </div>

              {/* Discipline Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/15">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold mr-1">
                  Disciplines:
                </span>
                {caseStudy.disciplines.map((d) => (
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
           KEY TELEMETRY BAR (Flat, Integrated Strip with Hairline Dividers)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 sm:py-8 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 sm:divide-x divide-slate-200">
              
              <div className="sm:px-4 first:pl-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Client / EPC
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] truncate block">
                  {caseStudy.client || "Direct Operator"}
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  End User / Operator
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] truncate block">
                  {caseStudy.endUser}
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Verified Man-Hours
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#FF8A00] block">
                  {caseStudy.manHours} hrs
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Deliverables Issued
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] block">
                  {caseStudy.deliverableCount} Docs
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Execution Centers
                </span>
                <span className="font-display text-xs sm:text-sm font-bold text-slate-800 truncate block">
                  Navi Mumbai &amp; Chennai
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
           DETAILED CASE FILE CONTENT & DELIVERABLES BREAKDOWN (7 + 5 Grid)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-18 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Scope Context, Grouped Deliverables Packages, & Spec Matrix (7 cols) */}
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
                    Engineering Case File Analysis
                  </h2>

                  <div className="text-slate-700 leading-relaxed text-xs sm:text-sm space-y-3.5 font-normal">
                    <p>
                      For <strong className="text-[#0b233a]">{caseStudy.title}</strong>, Saur Engineering was engaged
                      {caseStudy.client ? ` by ${caseStudy.client}` : ""} to deliver multidisciplinary engineering design and verification services
                      complying with <strong className="text-[#0b233a]">{caseStudy.endUser}</strong> technical specifications, safety guidelines, and international engineering codes.
                    </p>
                    <p>
                      The scope required <strong className="text-[#0b233a]">{caseStudy.manHours} verified engineering man-hours</strong> across{" "}
                      {caseStudy.disciplines.join(", ")} disciplines, resulting in the generation and formal client handover of{" "}
                      <strong className="text-[#0b233a]">{caseStudy.deliverableCount} approved technical deliverables</strong>.
                    </p>
                    <p>
                      Our delivery teams in Navi Mumbai and Chennai executed 3D model clash checks, calculation validations, cable routing, and material take-offs to guarantee constructability and zero on-site rework.
                    </p>
                  </div>
                </div>

                {/* 2. Categorized Deliverables Breakdown (Grouped Packages with Hairline Dividers) */}
                <div className="pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-[#FF8A00]" />
                        <span>Verified Deliverables Breakdown</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Exact engineering documents generated and verified under ISO 9001:2015 QMS.
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0b233a] bg-slate-100 px-2.5 py-1 rounded border border-slate-200 shrink-0">
                      {totalDeliverablesCount} Line Items
                    </span>
                  </div>

                  <div className="space-y-6">
                    {caseStudy.deliverables.map((group, gIdx) => (
                      <div
                        key={group.category || gIdx}
                        className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                      >
                        {/* Group Header */}
                        <div className="bg-slate-50 px-4 sm:px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs font-bold text-[#FF8A00] bg-[#FF8A00]/10 px-2 py-0.5 rounded">
                              {String(gIdx + 1).padStart(2, "0")}
                            </span>
                            <span className="font-display text-sm font-bold text-[#0b233a]">
                              {group.category} Deliverables Package
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-slate-500 font-medium">
                            {group.items.length} {group.items.length === 1 ? "document" : "documents"}
                          </span>
                        </div>

                        {/* Deliverables List */}
                        <div className="divide-y divide-slate-100">
                          {group.items.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-slate-50/50 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Technical Governance & Specification Matrix */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#0b233a]" />
                    <span>Technical Governance &amp; Specification Matrix</span>
                  </h3>

                  <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-200 bg-white">
                    {/* Row 1: Software Platforms */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2 bg-slate-50/60">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        CAD / CAE Platforms
                      </span>
                      <div className="sm:col-span-2 text-xs font-mono text-slate-800 font-semibold">
                        {getToolsForDisciplines(caseStudy.disciplines)}
                      </div>
                    </div>

                    {/* Row 2: Governing Standards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Governing Standards
                      </span>
                      <div className="sm:col-span-2 text-xs font-sans text-slate-700 leading-relaxed">
                        {getGoverningStandards(caseStudy.endUser)}
                      </div>
                    </div>

                    {/* Row 3: Disciplines */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2 bg-slate-50/60">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Engaged Disciplines
                      </span>
                      <div className="sm:col-span-2 text-xs font-mono text-slate-800">
                        {caseStudy.disciplines.join(" · ")}
                      </div>
                    </div>

                    {/* Row 4: QA Protocol */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        QA &amp; Verification Protocol
                      </span>
                      <div className="sm:col-span-2 text-xs font-sans text-slate-700 leading-relaxed">
                        ISO 9001:2015 Accredium Cert. GACB892020251128 · Multi-tier Lead Engineer Sign-off · Zero Clash Policy
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
                    Require Similar Scope Execution?
                  </h3>

                  {/* Scope Summary Narrative */}
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal mb-5">
                    Our Navi Mumbai HQ and Chennai engineering centers integrate seamlessly with your project schedules, CAD databases, and operator specifications.
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
                        Operator Standards
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-300 text-right">
                        ADNOC · Aramco · EMARAT · Pertamina
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
                    <span>Request Engineering Proposal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Back Link */}
                  <div className="text-center">
                    <Link
                      href="/case-studies"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs font-mono transition-colors"
                    >
                      <span>← Back to All 13 Case Studies</span>
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           LINEAR NAVIGATION (Previous / Next Case Study)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-8 bg-slate-50 border-t border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            
            <Link
              href={`/case-studies/${prevCaseStudy.slug}`}
              className="group flex items-center gap-3 p-3 sm:p-0 rounded-lg hover:bg-white sm:hover:bg-transparent transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 group-hover:border-[#FF8A00] group-hover:text-[#FF8A00] transition-colors shrink-0">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Previous Case Study ({prevCaseStudy.number})
                </div>
                <div className="font-display text-xs sm:text-sm font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors line-clamp-1 max-w-xs">
                  {prevCaseStudy.title}
                </div>
              </div>
            </Link>

            <Link
              href={`/case-studies/${nextCaseStudy.slug}`}
              className="group flex items-center justify-end gap-3 p-3 sm:p-0 rounded-lg hover:bg-white sm:hover:bg-transparent transition-colors text-right"
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Next Case Study ({nextCaseStudy.number})
                </div>
                <div className="font-display text-xs sm:text-sm font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors line-clamp-1 max-w-xs">
                  {nextCaseStudy.title}
                </div>
              </div>
              <div className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 group-hover:border-[#FF8A00] group-hover:text-[#FF8A00] transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           RELATED CASE STUDIES SECTION (High Contrast & Responsive)
           ══════════════════════════════════════════════════════════════════════ */}
        {relatedCaseStudies.length > 0 && (
          <section className="py-16 sm:py-20 bg-[#F4F6F9] border-t border-slate-200">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
              
              <div className="max-w-2xl mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF8A00] font-bold block mb-1">
                  RELATED CASE FILES
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0b233a]">
                  Explore Adjacent Engineering Studies
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {relatedCaseStudies.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/case-studies/${cs.slug}`}
                    className="bg-white border border-slate-200 hover:border-[#0b233a] rounded-xl p-5 sm:p-6 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge Strip */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="font-mono text-[10px] font-extrabold text-white bg-[#FF8A00] px-2.5 py-1 rounded">
                          CASE {cs.number}
                        </span>
                        <span className="font-mono text-[11px] font-extrabold text-white bg-[#0b233a] px-2.5 py-1 rounded">
                          {cs.endUser}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#0b233a] hover:text-[#FF8A00] transition-colors mb-2 line-clamp-2 leading-snug">
                        {cs.title}
                      </h3>

                      {/* Scope Summary */}
                      <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-3 font-normal leading-relaxed mb-4">
                        {cs.scope}
                      </p>
                    </div>

                    {/* Footer Metrics */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-600 font-bold">
                        <strong className="text-[#FF8A00]">{cs.manHours} hrs</strong> · <strong className="text-[#0b233a]">{cs.deliverableCount} docs</strong>
                      </span>
                      <span className="font-bold text-[#0b233a] flex items-center gap-1">
                        <span>Case File</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
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
