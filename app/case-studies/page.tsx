"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import CaseStudyQuickModal from "@/components/CaseStudyQuickModal";
import { caseStudies, CaseStudy } from "@/data/site";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Helper to assign relevant realistic engineering discipline photos from available assets
function getCaseStudyImage(cs: CaseStudy): string {
  const text = (cs.disciplines.join(" ") + " " + cs.title + " " + cs.scope).toLowerCase();

  if (text.includes("telecom")) {
    return "/images/telecom.png";
  }
  if (text.includes("electrical") || text.includes("power") || text.includes("heater")) {
    return "/images/electrical.png";
  }
  if (text.includes("skid") || text.includes("mechanical") || text.includes("lifting") || text.includes("pump")) {
    return "/images/mechanical.png";
  }
  if (text.includes("feed") || text.includes("mto") || text.includes("zakum")) {
    return "/images/process.png";
  }
  if (text.includes("instrumentation") || text.includes("wellhead") || text.includes("aip5")) {
    return "/media/page-services-hero.png";
  }
  return "/images/process.png";
}

export default function CaseStudiesPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeModalCaseStudy, setActiveModalCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("All");
  const [showAllCards, setShowAllCards] = useState<boolean>(false);

  // Spotlighted featured case study (defaults to the 9,000 man-hour multidisciplinary flagship from the PDF)
  const defaultFeatured = useMemo(() => {
    return (
      caseStudies.find((c) => c.slug === "chemical-injection-skid-detail") ||
      caseStudies[0]
    );
  }, []);

  const [featuredCaseStudy, setFeaturedCaseStudy] = useState<CaseStudy>(defaultFeatured);

  // Discipline options reflecting Saur Engineering's real capabilities from the company profile PDF
  const disciplineFilters = [
    "All",
    "Instrumentation",
    "Telecom",
    "Electrical",
    "Process",
    "Mechanical",
    "Piping",
  ];

  // Filter the 13 real case studies from data/site.ts
  const filteredCaseStudies = useMemo(() => {
    if (selectedDiscipline === "All") {
      return caseStudies;
    }
    const target = selectedDiscipline.toLowerCase();
    return caseStudies.filter((cs) => {
      return (
        cs.disciplines.some((d) => d.toLowerCase().includes(target)) ||
        cs.title.toLowerCase().includes(target) ||
        cs.scope.toLowerCase().includes(target) ||
        cs.deliverables.some((cat) => cat.category.toLowerCase().includes(target))
      );
    });
  }, [selectedDiscipline]);

  // If "All" is active and not expanded, show top 6 real case studies by default, with smooth expansion to all 13
  const displayedCards = useMemo(() => {
    if (selectedDiscipline === "All" && !showAllCards) {
      return filteredCaseStudies.slice(0, 6);
    }
    return filteredCaseStudies;
  }, [filteredCaseStudies, selectedDiscipline, showAllCards]);

  // Extract top deliverables for the featured spotlight card
  const featuredDeliverableBullets = useMemo(() => {
    const list: string[] = [];
    featuredCaseStudy.deliverables.forEach((cat) => {
      cat.items.forEach((item) => {
        if (list.length < 5) list.push(item);
      });
    });
    if (list.length === 0) {
      list.push("Detailed engineering deliverables & vendor document review");
      list.push("3D modelling & multi-discipline coordination");
      list.push("Material take off (MTO / BOQ) and equipment schedules");
      list.push("Construction and commissioning technical support");
    }
    return list;
  }, [featuredCaseStudy]);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-[#FF8A00] selection:text-white">
      {/* Top Header Navigation */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full">
        {/* ═══════════════════════════════════════════════════════════════
           1. HERO: Clean Corporate Diagonal Angle Split (Matching Projects Page)
           ═══════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-8 sm:pb-12 bg-[#0b233a]">
          {/* Photographic Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/saur-engineering-coordination.png')",
              backgroundPosition: "center right",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0b233a] via-[#0b233a]/85 sm:via-[#0b233a]/65 to-black/60 sm:to-black/40" />

            {/* Editorial Badge on Right (Desktop) */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white">
              <div className="w-8 h-0.5 bg-[#FF8A00] ml-auto mb-2" />
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                AUDITED EXECUTION TRACK RECORD
              </div>
              <div className="text-xs text-slate-300 font-normal">
                UAE · Saudi Arabia · Indonesia · India
              </div>
            </div>
          </div>

          {/* Left Navy Angle-Split Column */}
          <div
            className="relative z-10 w-full lg:w-[68%] xl:w-[62%] bg-[#0b233a]/95 sm:bg-[#0b233a] flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-16 py-10 sm:py-12 lg:py-16 [clip-path:none] lg:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]"
          >
            <div className="max-w-2xl">

              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                <span className="text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
                  PROJECT PORTFOLIO &amp; CASE STUDIES
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
                Engineering work with <br />
                <span className="text-[#FF8A00]">measurable outcomes.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal mb-8 max-w-xl">
                Audited project deliverables, verified man-hour effort logs, and execution milestones demonstrating Saur Engineering&apos;s multidisciplinary capability across major Middle East, Southeast Asia, and Indian energy infrastructure.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="w-full sm:w-auto justify-center bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] text-[#0b233a] px-6 sm:px-7 py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Discuss a Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#case-studies-grid"
                  className="w-full sm:w-auto justify-center border border-white/30 hover:bg-white/10 active:scale-[0.98] text-white px-6 sm:px-7 py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>View Case Studies</span>
                </a>
              </div>

              {/* Telemetry / Metrics Strip */}
              <div className="pt-5 sm:pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-white">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FF8A00]">68,000+</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Audited Hours</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">13</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Deep Studies</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FF8A00]">4,000+</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Deliverables</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Clash Free</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           2. TRUST CREDENTIALS STRIP
           ═══════════════════════════════════════════════════════════════ */}
        <TrustCredentialsStrip />

        {/* ═══════════════════════════════════════════════════════════════
           3. FILTER BY DISCIPLINE BAR (Exact Match to Reference UI)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 pt-8 pb-4">
          <div className="rounded-lg bg-slate-50 border border-slate-200/90 p-3 sm:p-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs font-bold text-slate-800 mr-2 shrink-0">
              Filter by discipline:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {disciplineFilters.map((discipline) => {
                const isActive = selectedDiscipline === discipline;
                return (
                  <button
                    key={discipline}
                    onClick={() => {
                      setSelectedDiscipline(discipline);
                      setShowAllCards(true); // show all matches for selected discipline
                    }}
                    className={
                      (isActive
                        ? "bg-[#FF8A00] text-white font-bold shadow-xs border-[#FF8A00]"
                        : "bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300 font-medium border-slate-200") +
                      " rounded-md border px-4 py-1.5 text-xs transition-all cursor-pointer min-w-[70px] text-center"
                    }
                  >
                    {discipline}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
           4. SELECTED CASE STUDIES SECTION (3-Column Clean Card Grid)
           ═══════════════════════════════════════════════════════════════ */}
        <section id="case-studies-grid" className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 py-6 sm:py-8 space-y-6">
          {/* Header Row */}
          <div className="flex items-end justify-between border-b border-transparent pb-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b233a] tracking-tight">
                Selected case studies
              </h2>
              <div className="w-12 h-1 bg-[#FF8A00] mt-2 rounded-full" />
            </div>

            {/* Toggle to view all 13 real case studies or reset */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (selectedDiscipline !== "All") {
                    setSelectedDiscipline("All");
                    setShowAllCards(true);
                  } else {
                    setShowAllCards(!showAllCards);
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#FF8A00] transition-colors group cursor-pointer pb-1"
              >
                <span className="underline underline-offset-4 decoration-slate-300 group-hover:decoration-[#FF8A00]">
                  {selectedDiscipline !== "All"
                    ? "Reset filter & view all 13"
                    : showAllCards
                    ? "Show selected (6)"
                    : "View all 13 case studies"}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF8A00] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 3-Column Card Grid with Real PDF Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {displayedCards.map((cs) => {
              const cardImage = getCaseStudyImage(cs);
              const primaryDiscipline = cs.disciplines[0] || "ENGINEERING";

              return (
                <div
                  key={cs.slug}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-slate-300 group"
                >
                  {/* Card Image */}
                  <div className="relative w-full h-52 sm:h-56 bg-slate-100 overflow-hidden">
                    <Image
                      src={cardImage}
                      alt={cs.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Operator / End User Badge in Top Left */}
                    <div className="absolute top-3 left-3 bg-[#0b233a]/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-wider uppercase">
                      {cs.endUser}
                    </div>

                    {/* Quick Spotlight Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeaturedCaseStudy(cs);
                      }}
                      title="Spotlight this case study below"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 hover:text-[#FF8A00] text-[10px] font-bold px-2 py-1 rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-[#FF8A00]" />
                      <span>Spotlight</span>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Discipline Kicker */}
                      <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-2">
                        {primaryDiscipline}
                      </div>

                      {/* Real Case Study Title from PDF */}
                      <h3 className="text-base sm:text-lg font-bold text-[#0b233a] leading-snug min-h-[48px] mb-4">
                        {cs.title}
                      </h3>

                      {/* Real Specs Rows (Exact UI presentation from Image 1) */}
                      <div className="border-t border-slate-100 pt-3 space-y-2 mb-6">
                        <div className="flex items-start justify-between text-xs gap-3">
                          <span className="text-slate-500 font-medium shrink-0">
                            Scope
                          </span>
                          <span
                            className="text-slate-800 font-semibold text-right line-clamp-1"
                            title={cs.scope}
                          >
                            {cs.scope}
                          </span>
                        </div>

                        <div className="flex items-start justify-between text-xs gap-3">
                          <span className="text-slate-500 font-medium shrink-0">
                            Verified Effort
                          </span>
                          <span className="text-slate-800 font-semibold text-right">
                            {cs.manHours.includes("Ongoing") ? cs.manHours : `${cs.manHours} hrs`}
                          </span>
                        </div>

                        <div className="flex items-start justify-between text-xs gap-3">
                          <span className="text-slate-500 font-medium shrink-0">
                            Deliverables
                          </span>
                          <span className="text-slate-800 font-semibold text-right">
                            {cs.deliverableCount} Docs
                          </span>
                        </div>

                        {cs.client && (
                          <div className="flex items-start justify-between text-xs gap-3">
                            <span className="text-slate-500 font-medium shrink-0">
                              Client
                            </span>
                            <span className="text-slate-800 font-semibold text-right line-clamp-1">
                              {cs.client}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Link Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalCaseStudy(cs)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF8A00] hover:text-[#E67C00] transition-colors cursor-pointer group/link"
                      >
                        <span>View case study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </button>

                      <Link
                        href={`/case-studies/${cs.slug}`}
                        className="text-[11px] font-medium text-slate-400 hover:text-slate-800 transition-colors"
                      >
                        Full page →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           5. FEATURED CASE STUDY SPOTLIGHT CARD (Real Flagship PDF Content)
           ═══════════════════════════════════════════════════════════════ */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 py-8">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Image with FEATURED CASE STUDY Badge */}
              <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full bg-slate-900">
                <Image
                  src={getCaseStudyImage(featuredCaseStudy)}
                  alt={featuredCaseStudy.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                {/* Feature Tag Bar at bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 flex items-center gap-2">
                  <span className="w-5 h-[3px] bg-[#FF8A00]" />
                  <span className="text-white text-[11px] font-extrabold uppercase tracking-widest">
                    FEATURED CASE STUDY • {featuredCaseStudy.endUser}
                  </span>
                </div>
              </div>

              {/* Middle Column: Details & Key Deliverables from PDF */}
              <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
                <div>
                  <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-2">
                    {featuredCaseStudy.disciplines.join(" • ")}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0b233a] leading-tight mb-3">
                    {featuredCaseStudy.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {featuredCaseStudy.scope}
                  </p>

                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0b233a] mb-3">
                      KEY DELIVERABLES
                    </h4>
                    <ul className="space-y-2.5">
                      {featuredDeliverableBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] shrink-0 mt-1.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Project At A Glance Table (Audited PDF Data) */}
              <div className="lg:col-span-3 bg-slate-50/50 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-4 pb-2 border-b border-slate-200">
                    PROJECT AT A GLANCE
                  </h4>

                  <div className="divide-y divide-slate-200 text-xs">
                    <div className="py-2.5 flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium shrink-0">
                        End User
                      </span>
                      <span className="text-slate-800 font-semibold text-right">
                        {featuredCaseStudy.endUser}
                      </span>
                    </div>

                    {featuredCaseStudy.client && (
                      <div className="py-2.5 flex items-start justify-between gap-2">
                        <span className="text-slate-500 font-medium shrink-0">
                          Client
                        </span>
                        <span className="text-slate-800 font-semibold text-right">
                          {featuredCaseStudy.client}
                        </span>
                      </div>
                    )}

                    <div className="py-2.5 flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium shrink-0">
                        Verified Effort
                      </span>
                      <span className="text-slate-800 font-semibold text-right">
                        {featuredCaseStudy.manHours.includes("Ongoing")
                          ? featuredCaseStudy.manHours
                          : `${featuredCaseStudy.manHours} hrs`}
                      </span>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium shrink-0">
                        Deliverables
                      </span>
                      <span className="text-slate-800 font-semibold text-right">
                        {featuredCaseStudy.deliverableCount} Docs
                      </span>
                    </div>

                    <div className="py-2.5 flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium shrink-0">
                        Disciplines
                      </span>
                      <span className="text-slate-800 font-semibold text-right">
                        {featuredCaseStudy.disciplines.slice(0, 3).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200 flex flex-col gap-2">
                  <button
                    onClick={() => setActiveModalCaseStudy(featuredCaseStudy)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF8A00] hover:text-[#E67C00] transition-colors cursor-pointer group"
                  >
                    <span className="underline underline-offset-4 decoration-[#FF8A00]/40 group-hover:decoration-[#FF8A00]">
                      View full case study
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    href={`/case-studies/${featuredCaseStudy.slug}`}
                    className="text-[11px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Dedicated case page →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           6. CONSULTATION CTA BANNER (Exact Match to Reference UI)
           ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-[#0b233a] py-12 sm:py-16 mt-8">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            <div className="flex items-center gap-2.5 text-[#FF8A00] font-bold text-xs uppercase tracking-wider mb-4">
              <span>LET&apos;S DISCUSS YOUR NEXT PROJECT</span>
              <span className="w-8 h-[2px] bg-[#FF8A00]" />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Headline */}
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Looking for an experienced engineering partner?
                </h2>
              </div>

              {/* Subtitle / Description & CTA Button */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                  Tell us about your project and our team will get in touch to discuss how we can help.
                </p>

                <button
                  onClick={() => setConsultationOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] text-[#0b233a] font-bold px-6 py-3.5 rounded-md text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer shrink-0"
                >
                  <span>REQUEST CONSULTATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Standard Universal Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectDiscipline={(disc) => {
          setSelectedDiscipline(disc.title);
          setShowAllCards(true);
        }}
        onSelectWhitepaper={() => {}}
      />
      <CaseStudyQuickModal
        caseStudy={activeModalCaseStudy}
        onClose={() => setActiveModalCaseStudy(null)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />
    </div>
  );
}
