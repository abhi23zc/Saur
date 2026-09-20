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
  ShieldCheck,
  SlidersHorizontal,
  MapPin,
  Clock,
  Layers,
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

  // Sectors list
  const sectors = [
    "All Sectors",
    "Wellheads & Upstream",
    "Pipelines & Distribution",
    "Modular Skids & Packages",
    "Refineries & Gas Plants",
    "Power & Industrial BIM",
  ];

  // Operators list for direct filtering
  const operators = [
    { name: "ADNOC", sub: "Abu Dhabi National Oil", loc: "UAE" },
    { name: "Saudi Aramco", sub: "Offshore Programs", loc: "KSA" },
    { name: "EMARAT", sub: "Petroleum Company", loc: "UAE" },
    { name: "PT. Pertamina", sub: "EP / PGE / Gas", loc: "Indonesia" },
    { name: "Jindal Steel", sub: "Industrial Gas Heaters", loc: "India" },
    { name: "L&T Hydrocarbon", sub: "EPC Engineering", loc: "India / Gulf" },
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

      // Search Query filter (matches title, scope, client, endUser, location, disciplines, software)
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
  }, [searchQuery, selectedSector, selectedOperator]);

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

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      setActiveFlagshipIndex((curr) => (curr + 1) % flagshipProjects.length);
      setSlideProgress(0);
    } else if (distance < -50) {
      setActiveFlagshipIndex((curr) => (curr - 1 + flagshipProjects.length) % flagshipProjects.length);
      setSlideProgress(0);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleSelectFlagship = (index: number) => {
    setActiveFlagshipIndex(index);
    setSlideProgress(0);
  };

  const currentFlagship = flagshipProjects[activeFlagshipIndex] || flagshipProjects[0];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSector("All Sectors");
    setSelectedOperator("All Operators");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedSector !== "All Sectors" ||
    selectedOperator !== "All Operators";

  const handleSelectOperator = (opName: string) => {
    setSelectedOperator((curr) => (curr === opName ? "All Operators" : opName));
    const directoryEl = document.getElementById("directory");
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#FF8A00] selection:text-white flex flex-col justify-between">
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full">
        {/* ══════════════════════════════════════════════════════════════════════
           1. HERO: Clean Corporate Split Hero
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-8 sm:pb-12 bg-[#0b233a]">
          {/* Photographic Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/saur-fabrication-projects.png')",
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
                  PROJECT PORTFOLIO &amp; TRACK RECORD
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
                Engineering delivered for <br />
                <span className="text-[#FF8A00]">critical industrial assets.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal mb-8 max-w-xl">
                A verified track record of FEED verification, detailed engineering, 3D modelling, MTO
                calculations, and site execution support for global energy and infrastructure majors.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="w-full sm:w-auto justify-center bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] text-[#0b233a] px-6 sm:px-7 py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#directory"
                  className="w-full sm:w-auto justify-center border border-white/30 hover:bg-white/10 active:scale-[0.98] text-white px-6 sm:px-7 py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Explore 18 Projects</span>
                </a>
              </div>

              {/* Metrics Strip */}
              <div className="pt-5 sm:pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-white">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FF8A00]">68,000+</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Man-Hours</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">18</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Major Works</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FF8A00]">4,000+</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Drawings</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-0.5">Clash Free</div>
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
           3. FLAGSHIP SPOTLIGHT (Clean Modern Showcase with Micro-Animations)
           ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <div className="flex items-center gap-2 text-[#FF8A00] font-bold text-xs uppercase tracking-wider mb-2">
                  <span>FLAGSHIP PROGRAMS</span>
                  <span className="w-6 h-[2px] bg-[#FF8A00]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b233a] tracking-tight">
                  High-Impact Capital Projects
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal">
                  Multi-thousand manhour engineering engagements executed under ISO 9001:2015 QA governance.
                </p>
              </div>

              {/* Clean Segmented Tab Switcher with Progress Line */}
              <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-200/80 border border-slate-200 overflow-x-auto max-w-full scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-1.5">
                {flagshipProjects.map((fp, idx) => {
                  const isActive = activeFlagshipIndex === idx;
                  const labelMap: Record<string, string> = {
                    "southeast-onshore-wellhead": "ADNOC Wellheads",
                    "emarat-natural-gas-pipeline": "EMARAT Pipeline",
                    "aip5-onshore-wellhead": "AiP5 Well Pads",
                    "chemical-injection-skid": "Injection Skids",
                  };
                  return (
                    <button
                      key={fp.slug}
                      onClick={() => handleSelectFlagship(idx)}
                      className={cn(
                        "relative px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none overflow-hidden min-h-[36px]",
                        isActive
                          ? "bg-[#0b233a] text-white shadow-xs"
                          : "text-slate-700 hover:text-[#0b233a] hover:bg-white/60"
                      )}
                    >
                      <span className="relative z-10">
                        0{idx + 1} · {labelMap[fp.slug] || fp.endUser.split(",")[0]}
                      </span>

                      {/* Animated Progress Timer Line */}
                      {isActive && !isPaused && (
                        <div
                          className="absolute bottom-0 left-0 h-[2.5px] bg-[#FF8A00] transition-all duration-75"
                          style={{ width: `${slideProgress}%` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clean Showcase Card with Framer Motion AnimatePresence */}
            <div className="relative min-h-[420px]">
              <AnimatePresence mode="wait">
                {currentFlagship && (
                  <motion.div
                    key={currentFlagship.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12"
                  >
                    {/* Left Photographic Banner */}
                    <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] lg:min-h-[400px] bg-slate-900 overflow-hidden">
                      <motion.img
                        key={currentFlagship.image}
                        initial={{ scale: 1.04 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        src={currentFlagship.image || "/media/page-services-hero.png"}
                        alt={currentFlagship.title}
                        className="w-full h-full object-cover object-center brightness-[0.88]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a]/85 via-transparent to-black/30" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#0b233a] text-xs font-bold border border-white/20 shadow-xs">
                          {currentFlagship.endUser}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-xs font-bold border border-white/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                          {currentFlagship.manHours} Man-Hours
                        </span>
                      </div>

                      {/* Bottom Image Info */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                        <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mb-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{currentFlagship.location}</span>
                        </div>
                        <div className="text-sm font-bold truncate">
                          {currentFlagship.deliverables} Deliverables Issued
                        </div>
                      </div>
                    </div>

                    {/* Right Specific Details */}
                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                      <div>
                        {/* Sector Eyebrow */}
                        <div className="flex items-center justify-between gap-4 text-xs text-slate-500 mb-2">
                          <span className="text-[#FF8A00] font-bold uppercase tracking-wider">
                            {currentFlagship.sector}
                          </span>
                          <span className="font-semibold text-slate-400">
                            {currentFlagship.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0b233a] mb-3 leading-snug">
                          {currentFlagship.title}
                        </h3>

                        {/* Clean Scope */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5 line-clamp-3">
                          {currentFlagship.scope}
                        </p>

                        {/* Specific Highlights Strip */}
                        {currentFlagship.highlights && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                            {currentFlagship.highlights.map((h, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
                              >
                                <Check className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                                <span className="font-medium text-[11px] sm:text-xs truncate">{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Platforms & Tools */}
                        {currentFlagship.software && currentFlagship.software.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 text-xs">
                            <span className="text-[11px] text-slate-400 uppercase font-bold mr-1">
                              Platforms:
                            </span>
                            {currentFlagship.software.map((s) => (
                              <span
                                key={s}
                                className="px-2 py-0.5 rounded bg-orange-50 text-[#FF8A00] border border-orange-200 text-[11px] font-semibold"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                          onClick={() => setQuickViewProject(currentFlagship)}
                          className="px-5 py-2.5 rounded-lg bg-[#0b233a] hover:bg-[#143c61] active:scale-[0.98] text-white text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Quick View &amp; Specs</span>
                        </button>

                        <Link
                          href={`/projects/${currentFlagship.slug}`}
                          className="px-5 py-2.5 rounded-lg border border-slate-300 hover:border-[#0b233a] hover:bg-slate-50 active:scale-[0.98] text-slate-800 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 min-h-[42px]"
                        >
                          <span>Full Case Study</span>
                          <ArrowRight className="w-4 h-4" />
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
           4. GLOBAL OPERATORS & PARTNERS ROSTER (Interactive Filter Trigger)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-1">
                TRUSTED BY INDUSTRY MAJORS
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0b233a]">
                Global Operators &amp; EPC Client Partners
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {operators.map((partner, idx) => {
                const isSelected = selectedOperator === partner.name;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOperator(partner.name)}
                    className={cn(
                      "p-3.5 rounded-xl border text-center transition-all flex flex-col justify-center cursor-pointer select-none group active:scale-98",
                      isSelected
                        ? "bg-[#0b233a] text-white border-[#0b233a] shadow-md"
                        : "bg-slate-50 border-slate-200 hover:border-[#FF8A00]/50 hover:bg-white text-slate-800"
                    )}
                  >
                    <span className={cn("text-sm font-bold block", isSelected ? "text-white" : "text-[#0b233a] group-hover:text-[#FF8A00]")}>
                      {partner.name}
                    </span>
                    <span className={cn("text-[10px] font-normal block truncate", isSelected ? "text-slate-300" : "text-slate-500")}>
                      {partner.sub}
                    </span>
                    <span className={cn("text-[9px] uppercase font-bold mt-0.5 block", isSelected ? "text-[#FF8A00]" : "text-[#FF8A00]")}>
                      {partner.loc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           5. INTERACTIVE PROJECT DIRECTORY (Clean, Executive Cards with Specific Details)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 bg-slate-50/50 border-t border-slate-200" id="directory">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

            {/* Header & Search Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-[#FF8A00] font-bold text-xs uppercase tracking-wider mb-2">
                  <span>AUDITED EXECUTION DATABASE</span>
                  <span className="w-6 h-[2px] bg-[#FF8A00]" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b233a] tracking-tight">
                  All 18 Executed Projects
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl font-normal leading-relaxed">
                  Search and inspect verified engineering deliverables, man-hour scopes, and 3D modeling packages across global energy assets.
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
                    placeholder="Search project, operator, platform..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-white border border-slate-200 focus:border-[#0b233a] focus:outline-none text-xs sm:text-sm text-slate-900 transition-colors placeholder:text-slate-400 font-normal shadow-2xs"
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
                  <span className="px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0b233a] shadow-2xs">
                    Showing <span className="text-[#FF8A00]">{filteredProjects.length}</span> of {projects.length}
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={handleResetFilters}
                      className="px-3 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Reset all filters"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sector Tabs Navigation (Clean & Uncluttered) */}
            <div className="pt-6 pb-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                {sectors.map((sector) => {
                  const isActive = selectedSector === sector;
                  return (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 border min-h-[38px]",
                        isActive
                          ? "bg-[#0b233a] text-white border-[#0b233a] shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      {sector}
                    </button>
                  );
                })}
              </div>

              {/* Active Operator Filter Notice if set */}
              {selectedOperator !== "All Operators" && (
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Filtering by Operator:</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FF8A00]/15 text-[#0b233a] font-bold border border-[#FF8A00]/30">
                    <span>{selectedOperator}</span>
                    <button
                      onClick={() => setSelectedOperator("All Operators")}
                      className="hover:text-red-600 ml-1 cursor-pointer"
                      aria-label="Remove operator filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                </div>
              )}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="border border-slate-200 rounded-2xl p-10 text-center max-w-md mx-auto my-8 bg-white shadow-sm">
                <SlidersHorizontal className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0b233a] mb-1">
                  No projects match your criteria
                </h3>
                <p className="text-xs text-slate-500 mb-4 font-normal">
                  Try clearing the filters or searching a different term.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg bg-[#0b233a] text-white text-xs font-bold uppercase cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* 18 Project Cards: Clean, Specific, and Lightly Animated */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4), ease: "easeOut" }}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#FF8A00]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  onClick={() => setQuickViewProject(project)}
                >
                  <div>
                    {/* Photographic Header Banner */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                      <img
                        src={project.image || "/media/saur-industrial-hero.png"}
                        alt={project.title}
                        className="w-full h-full object-cover object-center brightness-[0.88] group-hover:scale-105 group-hover:brightness-[0.98] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a]/80 via-transparent to-black/30" />

                      {/* Top Floating Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#0b233a] text-[10px] font-bold truncate max-w-[160px] shadow-xs border border-white/20">
                          {project.endUser}
                        </span>

                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold border border-white/15 flex items-center gap-1.5 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                          {project.manHours ? `${project.manHours} hrs` : project.year}
                        </span>
                      </div>

                      {/* Bottom Floating Tag */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white z-10 text-xs">
                        <span className="px-2 py-0.5 rounded bg-[#FF8A00] text-[10px] font-bold text-[#0b233a]">
                          {project.deliverables ? `${project.deliverables} Deliverables` : "DED Package"}
                        </span>
                        <span className="text-[10px] text-slate-200 font-semibold truncate max-w-[140px]">
                          {project.location?.split(",")[0] || project.year}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      {/* Sector Category */}
                      <span className="text-[10px] font-bold text-[#FF8A00] uppercase tracking-wider block mb-1">
                        {project.sector || "Detailed Engineering"}
                      </span>

                      {/* Project Title */}
                      <h3 className="text-base font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors leading-snug mb-2 line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Clean Concise Scope */}
                      <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2 mb-4">
                        {project.scope}
                      </p>

                      {/* Specific Details Strip */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] truncate">
                          <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate font-medium text-slate-700">
                            {project.disciplines.slice(0, 3).join(" · ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div
                    className="p-5 pt-0 flex items-center justify-between gap-2 mt-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setQuickViewProject(project)}
                      className="flex-1 justify-center px-3 py-2 rounded-lg bg-slate-100 hover:bg-[#0b233a] hover:text-white active:scale-[0.98] text-[#0b233a] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200/60 min-h-[38px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Specs</span>
                    </button>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex-1 justify-center px-3 py-2 rounded-lg border border-slate-200 hover:border-[#FF8A00] hover:text-[#FF8A00] active:scale-[0.98] text-slate-700 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 min-h-[38px]"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           6. QA & COMPLIANCE ASSURANCE STRIP
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

              <div className="lg:col-span-8">
                <span className="text-[11px] text-[#FF8A00] font-bold uppercase tracking-[0.2em] block mb-1">
                  ISO 9001:2015 ACCREDITED DELIVERY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0b233a] mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#FF8A00] shrink-0" />
                  <span>Every deliverable audited for constructability &amp; safety</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl">
                  Accredium Certifications (GACB892020251128). Every calculation, 3D model, and drawing package
                  undergoes rigorous Lead Engineer verification, multi-discipline clash audits, and QA sign-off
                  before issuance.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-3 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors text-center cursor-pointer shadow-xs"
                >
                  <span>Request Project Proposal</span>
                </button>
                <Link
                  href="/company#certificates"
                  className="border border-slate-300 hover:border-[#0b233a] text-[#0b233a] px-5 py-3 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors text-center"
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Have an upcoming capital project or turnkey engineering requirement?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
              Our multidisciplinary engineering teams in Navi Mumbai and Chennai integrate seamlessly with your project schedules, CAD databases, and software standards.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Request Scope Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/expertise"
                className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
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
        onSelectDiscipline={() => { }}
        onSelectWhitepaper={() => { }}
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
