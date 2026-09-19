"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  X, 
  Check, 
  Eye, 
  RotateCcw, 
  Cpu, 
  ShieldCheck, 
  FileText,
  SlidersHorizontal
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import ProjectQuickModal from "@/components/ProjectQuickModal";
import { projects, Project } from "@/data/site";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("All Sectors");
  const [selectedOperator, setSelectedOperator] = useState<string>("All Operators");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("All Disciplines");

  // Sectors list
  const sectors = [
    "All Sectors",
    "Wellheads & Upstream",
    "Pipelines & Distribution",
    "Modular Skids & Packages",
    "Refineries & Gas Plants",
    "Power & Industrial BIM",
  ];

  // Operators list
  const operators = [
    "All Operators",
    "ADNOC",
    "Saudi Aramco",
    "EMARAT",
    "Pertamina",
    "Jindal Steel",
  ];

  // Disciplines list
  const disciplines = [
    "All Disciplines",
    "Piping",
    "Instrumentation",
    "Electrical",
    "Pipeline",
    "3D Modelling",
    "Process",
    "Civil & Structural",
    "Mechanical",
  ];

  // Filtered Projects Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Sector filter
      if (selectedSector !== "All Sectors" && project.sector !== selectedSector) {
        return false;
      }

      // Operator filter
      if (selectedOperator !== "All Operators") {
        const matchesOperator =
          project.endUser.toLowerCase().includes(selectedOperator.toLowerCase()) ||
          project.client.toLowerCase().includes(selectedOperator.toLowerCase());
        if (!matchesOperator) return false;
      }

      // Discipline filter
      if (selectedDiscipline !== "All Disciplines") {
        const matchesDisc = project.disciplines.some((d) =>
          d.toLowerCase().includes(selectedDiscipline.toLowerCase())
        );
        if (!matchesDisc) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(q) ||
          project.scope.toLowerCase().includes(q) ||
          project.client.toLowerCase().includes(q) ||
          project.endUser.toLowerCase().includes(q) ||
          (project.location && project.location.toLowerCase().includes(q)) ||
          project.disciplines.some((d) => d.toLowerCase().includes(q)) ||
          (project.software && project.software.some((s) => s.toLowerCase().includes(q)));
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [searchQuery, selectedSector, selectedOperator, selectedDiscipline]);

  // Flagship Spotlight Projects (Top 4 Multi-Thousand Hour Programs from PDF)
  const flagshipProjects = useMemo(() => {
    return projects.filter((p) =>
      [
        "southeast-onshore-wellhead",
        "emarat-natural-gas-pipeline",
        "aip5-onshore-wellhead",
        "chemical-injection-skid",
      ].includes(p.slug)
    );
  }, []);

  const [activeFlagshipIndex, setActiveFlagshipIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  // Auto-slide animation timer (advances continuously every 5.5 seconds)
  const AUTOPLAY_INTERVAL = 5500;

  useEffect(() => {
    if (isPaused || quickViewProject || consultationOpen || searchOpen) return;

    const intervalStep = 50; // update every 50ms for smooth progress bar
    const stepIncrement = (intervalStep / AUTOPLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setActiveFlagshipIndex((curr) => (curr + 1) % flagshipProjects.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, quickViewProject, consultationOpen, searchOpen, flagshipProjects.length]);

  const handleSelectFlagship = (index: number) => {
    setActiveFlagshipIndex(index);
    setSlideProgress(0);
  };

  const handlePrevFlagship = () => {
    setActiveFlagshipIndex((curr) => (curr - 1 + flagshipProjects.length) % flagshipProjects.length);
    setSlideProgress(0);
  };

  const handleNextFlagship = () => {
    setActiveFlagshipIndex((curr) => (curr + 1) % flagshipProjects.length);
    setSlideProgress(0);
  };

  const currentFlagship = flagshipProjects[activeFlagshipIndex] || flagshipProjects[0];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSector("All Sectors");
    setSelectedOperator("All Operators");
    setSelectedDiscipline("All Disciplines");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedSector !== "All Sectors" ||
    selectedOperator !== "All Operators" ||
    selectedDiscipline !== "All Disciplines";

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#FF8A00] selection:text-white flex flex-col justify-between">
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full">
        {/* ══════════════════════════════════════════════════════════════════════
           1. HERO: Clean Corporate Diagonal Angle Split (Fully Responsive)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[480px] lg:min-h-[520px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-10 bg-[#0b233a]">
          {/* Photographic Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/saur-fabrication-projects.png')",
              backgroundPosition: "center right",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-black/60" />
            
            {/* Editorial Badge on Right (Desktop) */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white">
              <div className="w-8 h-0.5 bg-[#FF8A00] ml-auto mb-2" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                AUDITED EXECUTION TRACK RECORD
              </div>
              <div className="font-display text-xs text-slate-300 font-light">
                UAE · Saudi Arabia · Indonesia · India
              </div>
            </div>
          </div>

          {/* Left Navy Polygon Split (Desktop Only) */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[65%] z-10 bg-[#0b233a] opacity-95 lg:opacity-100"
            style={{
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
            }}
          />

          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-[#0b233a]/90 lg:hidden z-10" />

          {/* Hero Content */}
          <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full flex flex-col justify-center my-auto py-6">
            <div className="max-w-2xl">
              
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
                  PROJECT PORTFOLIO &amp; TRACK RECORD
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
                Engineering delivered for <br />
                <span className="text-[#FF8A00]">critical industrial assets.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-light mb-6 max-w-xl">
                A verified track record of FEED verification, detailed engineering, 3D modelling, MTO
                calculations, and site execution support for global energy and infrastructure majors.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 sm:px-6 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#directory"
                  className="border border-white/30 hover:bg-white/10 text-white px-5 sm:px-6 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore 18 Projects</span>
                </a>
              </div>

              {/* Telemetry Strip */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#FF8A00]">68,000+</div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">Man-Hours</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white">18</div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">Major Works</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#FF8A00]">4,000+</div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">Drawings</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white">100%</div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">Clash Free</div>
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
           3. FLAGSHIP SPOTLIGHT (Continuously Animated Engineering Console)
           ══════════════════════════════════════════════════════════════════════ */}
        <section 
          className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-[11px] text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-1">
                  FLAGSHIP PROGRAMS
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b233a] tracking-tight">
                  High-Impact Capital Projects
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Multi-thousand manhour engineering engagements executed under ISO 9001:2015 QA governance.
                </p>
              </div>

              {/* Clean Segmented Tab Switcher with Subtle Progress Line */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/70 border border-slate-200 overflow-x-auto max-w-full">
                {flagshipProjects.map((fp, idx) => {
                  const isActive = activeFlagshipIndex === idx;
                  return (
                    <button
                      key={fp.slug}
                      onClick={() => handleSelectFlagship(idx)}
                      className={cn(
                        "relative px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer select-none overflow-hidden",
                        isActive
                          ? "bg-[#0b233a] text-white"
                          : "text-slate-700 hover:text-[#0b233a] hover:bg-white/50"
                      )}
                    >
                      <span className="relative z-10">0{idx + 1} · {fp.endUser.split(",")[0]}</span>
                      
                      {/* Animated Progress Timer Line */}
                      {isActive && !isPaused && (
                        <div 
                          className="absolute bottom-0 left-0 h-[2px] bg-[#FF8A00] transition-all duration-75"
                          style={{ width: `${slideProgress}%` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continuously Animated Card with AnimatePresence */}
            <div className="relative min-h-[440px]">
              <AnimatePresence mode="wait">
                {currentFlagship && (
                  <motion.div
                    key={currentFlagship.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
                  >
                    {/* Left Visual Banner with Subtly Moving Photography */}
                    <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] bg-slate-900 overflow-hidden">
                      <motion.img
                        key={currentFlagship.image}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src={currentFlagship.image || "/media/page-services-hero.png"}
                        alt={currentFlagship.title}
                        className="w-full h-full object-cover object-center brightness-[0.9]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a]/80 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-white text-[#0b233a] font-mono text-[10px] font-bold border border-slate-200">
                          {currentFlagship.endUser}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-black/70 text-white font-mono text-[10px] font-bold border border-white/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                          {currentFlagship.manHours} Man-Hours
                        </span>
                      </div>

                      {/* Bottom Image Info */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                        <span className="font-mono text-[10px] text-amber-300 uppercase font-semibold block mb-0.5">
                          {currentFlagship.location}
                        </span>
                        <div className="font-display text-sm font-bold truncate">
                          {currentFlagship.deliverables} Deliverables Issued
                        </div>
                      </div>
                    </div>

                    {/* Right Detailed Specs (7 cols) */}
                    <div className="lg:col-span-7 p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-5">
                      <div>
                        <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-slate-500 mb-1.5">
                          <span className="text-[#FF8A00] font-bold">{currentFlagship.sector}</span>
                          <span>YEAR: {currentFlagship.year}</span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0b233a] mb-2 leading-snug">
                          {currentFlagship.title}
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                          {currentFlagship.scope}
                        </p>

                        {/* Highlights Grid */}
                        {currentFlagship.highlights && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                            {currentFlagship.highlights.map((h, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-sans text-slate-800"
                              >
                                <Check className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                                <span className="font-medium text-[11px] sm:text-xs">{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Platforms & Software */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
                          <span className="font-mono text-[10px] text-slate-400 uppercase font-bold mr-1.5">
                            Platforms:
                          </span>
                          {currentFlagship.software?.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded bg-orange-50 text-[#FF8A00] border border-orange-200 text-[11px] font-mono font-semibold"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setQuickViewProject(currentFlagship)}
                          className="px-4 py-2.5 rounded-lg bg-[#0b233a] hover:bg-[#143c61] text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick Inspect Scope</span>
                        </button>

                        <Link
                          href={`/projects/${currentFlagship.slug}`}
                          className="px-4 py-2.5 rounded-lg border border-slate-300 hover:border-[#0b233a] text-slate-800 font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
                        >
                          <span>Full Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. GLOBAL OPERATORS & PARTNERS ROSTER
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-0.5">
                TRUSTED BY INDUSTRY MAJORS
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b233a]">
                Global Operators &amp; EPC Client Partners
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {[
                { name: "ADNOC", sub: "Abu Dhabi National Oil", loc: "UAE" },
                { name: "Saudi Aramco", sub: "Offshore Programs", loc: "KSA" },
                { name: "EMARAT", sub: "Petroleum Company", loc: "UAE" },
                { name: "PT. Pertamina", sub: "EP / PGE / Gas", loc: "Indonesia" },
                { name: "Jindal Steel", sub: "Industrial Gas Heaters", loc: "India" },
                { name: "L&T Hydrocarbon", sub: "EPC Engineering", loc: "India / Gulf" },
              ].map((partner, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center hover:border-slate-300 transition-colors flex flex-col justify-center"
                >
                  <span className="font-display text-sm font-bold text-[#0b233a] block">
                    {partner.name}
                  </span>
                  <span className="font-sans text-[10px] text-slate-500 font-normal block truncate">
                    {partner.sub}
                  </span>
                  <span className="font-mono text-[9px] text-[#FF8A00] uppercase font-bold mt-0.5 block">
                    {partner.loc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           5. INTERACTIVE PROJECT DIRECTORY (Flat, Realistic, Fully Responsive)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 bg-white border-t border-slate-200" id="directory">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            
            {/* Header & Search Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b233a]/5 border border-[#0b233a]/10 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                  <span className="font-mono text-[10px] text-[#0b233a] font-bold uppercase tracking-[0.15em]">
                    AUDITED EXECUTION DATABASE
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b233a] tracking-tight">
                  All 18 Executed Projects
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl font-normal leading-relaxed">
                  Search, filter, and inspect verified engineering deliverables, man-hour scopes, and 3D modeling packages across global energy assets.
                </p>
              </div>

              {/* Search Box + Result Counter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search project, operator, software..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#0b233a] focus:bg-white focus:outline-none text-xs sm:text-sm text-slate-900 transition-colors placeholder:text-slate-400 font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-[#0b233a]">
                    Showing <span className="text-[#FF8A00]">{filteredProjects.length}</span> of {projects.length}
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={handleResetFilters}
                      className="px-3 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Reset all filters"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sector Tabs Navigation (Primary Classification - Flat & Scrollable) */}
            <div className="pt-6 pb-4">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  SECTOR CLASSIFICATION:
                </span>
                {selectedSector !== "All Sectors" && (
                  <button
                    onClick={() => setSelectedSector("All Sectors")}
                    className="text-[11px] font-mono text-[#FF8A00] hover:underline cursor-pointer"
                  >
                    Clear sector
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors cursor-pointer select-none shrink-0 border",
                      selectedSector === sector
                        ? "bg-[#0b233a] text-white border-[#0b233a]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Refinement Toolbar: Operator, Discipline & Active Chips */}
            <div className="py-4 border-t border-b border-slate-200 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left: Filter Controls */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                  
                  {/* Operator Filter */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 shrink-0">
                      Operator:
                    </span>
                    <select
                      value={selectedOperator}
                      onChange={(e) => setSelectedOperator(e.target.value)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-md border text-xs font-mono transition-colors focus:outline-none focus:border-[#0b233a] cursor-pointer",
                        selectedOperator !== "All Operators"
                          ? "bg-[#FF8A00]/10 border-[#FF8A00] text-[#0b233a] font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                      )}
                    >
                      {operators.map((op) => (
                        <option key={op} value={op}>{op}</option>
                      ))}
                    </select>
                  </div>

                  {/* Discipline Filter */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 shrink-0">
                      Discipline:
                    </span>
                    <select
                      value={selectedDiscipline}
                      onChange={(e) => setSelectedDiscipline(e.target.value)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-md border text-xs font-mono transition-colors focus:outline-none focus:border-[#0b233a] cursor-pointer",
                        selectedDiscipline !== "All Disciplines"
                          ? "bg-[#FF8A00]/10 border-[#FF8A00] text-[#0b233a] font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                      )}
                    >
                      {disciplines.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Right: Active Filter Dismiss Chips */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] text-slate-400 uppercase mr-1">Active:</span>
                    {selectedSector !== "All Sectors" && (
                      <button
                        onClick={() => setSelectedSector("All Sectors")}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-mono border border-slate-200 cursor-pointer"
                      >
                        <span>{selectedSector}</span>
                        <X className="w-3 h-3 text-slate-500" />
                      </button>
                    )}
                    {selectedOperator !== "All Operators" && (
                      <button
                        onClick={() => setSelectedOperator("All Operators")}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FF8A00]/10 hover:bg-[#FF8A00]/20 text-[#0b233a] text-[11px] font-mono border border-[#FF8A00]/30 font-semibold cursor-pointer"
                      >
                        <span>{selectedOperator}</span>
                        <X className="w-3 h-3 text-[#FF8A00]" />
                      </button>
                    )}
                    {selectedDiscipline !== "All Disciplines" && (
                      <button
                        onClick={() => setSelectedDiscipline("All Disciplines")}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FF8A00]/10 hover:bg-[#FF8A00]/20 text-[#0b233a] text-[11px] font-mono border border-[#FF8A00]/30 font-semibold cursor-pointer"
                      >
                        <span>{selectedDiscipline}</span>
                        <X className="w-3 h-3 text-[#FF8A00]" />
                      </button>
                    )}
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-mono border border-slate-200 cursor-pointer"
                      >
                        <span className="truncate max-w-[120px]">"{searchQuery}"</span>
                        <X className="w-3 h-3 text-slate-500" />
                      </button>
                    )}
                    <button
                      onClick={handleResetFilters}
                      className="text-[11px] font-mono text-slate-500 hover:text-red-600 underline ml-2 cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="border border-slate-200 rounded-xl p-10 text-center max-w-md mx-auto my-8 bg-slate-50">
                <SlidersHorizontal className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <h3 className="font-display text-base font-bold text-[#0b233a] mb-1">
                  No projects match your criteria
                </h3>
                <p className="font-sans text-xs text-slate-500 mb-4">
                  Try clearing the filters or searching a different term.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg bg-[#0b233a] text-white text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* 18 Projects Grid (Flat, Clean 1px Hairline Borders, Taller Images & Lucide Icons) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {filteredProjects.map((project) => (
                <div
                  key={project.slug}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#0b233a] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Image Banner (Height 240px-260px for High Visual Impact) */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
                      <img
                        src={project.image || "/media/saur-industrial-hero.png"}
                        alt={project.title}
                        className="w-full h-full object-cover object-center brightness-[0.9] group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="px-2.5 py-0.5 rounded bg-white text-[#0b233a] font-mono text-[10px] font-bold truncate max-w-[150px] border border-slate-100">
                          {project.endUser}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full bg-black/70 text-white font-mono text-[10px] font-bold border border-white/15 flex items-center gap-1 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                          {project.manHours ? `${project.manHours} hrs` : project.year}
                        </span>
                      </div>

                      {/* Bottom Banner Tag */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white z-10">
                        <span className="px-2 py-0.5 rounded bg-[#FF8A00] text-[9px] font-mono font-bold">
                          {project.deliverables ? `${project.deliverables} Deliverables` : "DED Package"}
                        </span>
                        <span className="font-mono text-[10px] text-slate-300">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5">
                      {/* Sector Line */}
                      <div className="font-mono text-[10px] font-bold text-[#FF8A00] uppercase tracking-wider mb-1">
                        {project.sector || "Detailed Engineering"}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors leading-snug mb-2 line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Scope Summary */}
                      <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal line-clamp-3 mb-3.5">
                        {project.scope}
                      </p>

                      {/* Discipline Chips */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.disciplines.slice(0, 3).map((disc) => (
                          <span
                            key={disc}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-medium border border-slate-200/50"
                          >
                            {disc}
                          </span>
                        ))}
                        {project.disciplines.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-mono border border-slate-200/50">
                            +{project.disciplines.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Software Tools Chips */}
                      {project.software && project.software.length > 0 && (
                        <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 overflow-hidden">
                          <Cpu className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="font-mono text-[10px] text-slate-500 truncate">
                            {project.software.join(" · ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => setQuickViewProject(project)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0b233a] hover:text-white text-[#0b233a] font-mono text-[11px] font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer border border-slate-200/60"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#FF8A00] hover:text-[#FF8A00] text-slate-700 font-mono text-[11px] font-bold uppercase transition-colors flex items-center gap-1"
                    >
                      <span>Full Case</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           6. QA & COMPLIANCE ASSURANCE STRIP
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8">
                <span className="font-mono text-[11px] text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-1">
                  ISO 9001:2015 ACCREDITED DELIVERY
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0b233a] mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#FF8A00] shrink-0" />
                  <span>Every deliverable audited for constructability &amp; safety</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl">
                  Accredium Certifications (GACB892020251128). Every calculation, 3D model, and drawing package
                  undergoes rigorous Lead Engineer verification, multi-discipline clash audits, and QA sign-off
                  before issuance.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-3 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-colors text-center cursor-pointer"
                >
                  <span>Request Project Proposal</span>
                </button>
                <Link
                  href="/company#certificates"
                  className="border border-slate-300 hover:border-[#0b233a] text-[#0b233a] px-5 py-3 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-colors text-center"
                >
                  <span>View Certifications</span>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           7. ACTION CTA
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-[#0b233a] text-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 text-center">
            <div className="w-8 h-0.5 bg-[#FF8A00] mx-auto mb-3" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Have an upcoming capital project or turnkey engineering requirement?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Our multidisciplinary engineering teams in Navi Mumbai and Chennai integrate seamlessly with your project schedules, CAD databases, and software standards.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Scope Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/expertise"
                className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore 11 Disciplines</span>
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
      <ProjectQuickModal
        project={quickViewProject}
        onClose={() => setQuickViewProject(null)}
        onOpenConsultation={() => {
          setQuickViewProject(null);
          setConsultationOpen(true);
        }}
      />
    </div>
  );
}
