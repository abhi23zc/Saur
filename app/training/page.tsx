"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import CourseSyllabusModal from "@/components/CourseSyllabusModal";
import { courses, Course } from "@/data/site";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Laptop,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Building2,
  Layers,
  Compass,
  Cpu,
  FileSpreadsheet,
  Zap,
  Boxes,
  Users,
  Award,
  Search,
  X,
  GraduationCap
} from "lucide-react";

export default function TrainingPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [syllabusModalOpen, setSyllabusModalOpen] = useState(false);

  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => set.add(c.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (selectedCategory !== "All" && c.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesDesc = c.description.toLowerCase().includes(q);
        const matchesSoftware = c.software.some((s) => s.toLowerCase().includes(q));
        const matchesCodes = c.governingCodes.some((code) => code.toLowerCase().includes(q));
        const matchesHighlights = c.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesSoftware && !matchesCodes && !matchesHighlights) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const openSyllabus = (course: Course) => {
    setSelectedCourse(course);
    setSyllabusModalOpen(true);
  };

  const handleEnquireBatch = (course: Course) => {
    setSelectedCourse(course);
    setConsultationOpen(true);
  };

  // Icon mapping helper
  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Compass":
        return <Compass className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "FileSpreadsheet":
        return <FileSpreadsheet className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Boxes":
        return <Boxes className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
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
           1. HERO: Diagonal Angle-Split Hero with Photographic Background
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-6 sm:pb-8 bg-[#0b233a]">
          {/* Full-bleed Photographic Background on Right */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/page-training-hero.png')",
              backgroundPosition: "center right",
            }}
          >
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0b233a] via-[#0b233a]/85 sm:via-[#0b233a]/60 to-black/60 sm:to-black/40" />

            {/* Editorial Badges on Right (Desktop) */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white">
              <div className="w-8 h-0.5 bg-[#FF8A00] ml-auto mb-2" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                TECHNICAL ACADEMY &amp; CAD LAB
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
                CHENNAI ENGINEERING FACILITY
              </div>
            </div>

            <div className="hidden xl:block absolute bottom-12 right-16 text-right text-white/80 font-mono text-[10px] uppercase tracking-[0.2em]">
              ISO 9001:2015 CERTIFIED DELIVERY
            </div>
          </div>

          {/* Left Navy Angle-Split Polygon (Desktop polygon / Mobile full width overlay) */}
          <div
            className="relative z-10 w-full lg:w-[68%] xl:w-[62%] bg-[#0b233a]/95 sm:bg-[#0b233a] flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-16 py-10 sm:py-12 lg:py-16 [clip-path:none] lg:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]"
          >
            <div className="max-w-2xl">

              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
                  TECHNICAL ACADEMY &amp; UPSKILLING
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4">
                We don&apos;t just teach. <br />
                <span className="text-[#FF8A00]">We prepare you to lead.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-light mb-6 sm:mb-8 max-w-xl">
                Practical, workflow-grounded engineering courses conducted by experienced design leads.
                Equipping graduates and practicing engineers with hands-on 3D modeling and EPC delivery expertise.
              </p>

              {/* CTAs */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 mb-8">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="w-full xs:w-auto justify-center bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] text-white px-6 sm:px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md shadow-[#FF8A00]/20 flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Enquire for Next Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#courses"
                  className="w-full xs:w-auto justify-center border border-white/30 hover:bg-white/10 active:scale-[0.98] text-white px-6 sm:px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Explore 6 Program Modules</span>
                </a>
              </div>

              {/* Telemetry Strip */}
              <div className="pt-5 sm:pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-white">
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#FF8A00]">6</div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">Programs</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white">100%</div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">Licensed CAD Lab</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#FF8A00]">Active</div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">EPC Design Leads</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white">Chennai</div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-wider">Delivery Hub</div>
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
           3. ACADEMY TELEMETRY BAR (Responsive Grid with Clean Dividers)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 sm:py-8 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:divide-x divide-slate-200">

              <div className="lg:px-4 first:pl-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Core Disciplines
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] block">
                  6 Signature Programs
                </span>
              </div>

              <div className="lg:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  CAD / CAE Lab
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#FF8A00] block">
                  100% Licensed Workstations
                </span>
              </div>

              <div className="lg:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Instructors
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] block">
                  Active EPC Design Leads
                </span>
              </div>

              <div className="lg:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Training Facility
                </span>
                <span className="font-display text-xs sm:text-sm font-bold text-slate-800 truncate block">
                  Vadapalani, Chennai Hub
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 lg:px-4 last:pr-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  QA Governance
                </span>
                <span className="font-display text-xs sm:text-sm font-bold text-emerald-700 block">
                  ISO 9001:2015 QMS Certified
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. COURSES CATALOG (Interactive Search, Filters & The 6 Programs)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 bg-[#F4F6F9] border-b border-slate-200" id="courses">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-6">

            {/* Catalog Header */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b233a]/5 border border-[#0b233a]/10 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                <span className="font-mono text-[10px] text-[#0b233a] font-bold uppercase tracking-[0.15em]">
                  OFFICIAL CURRICULUM
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b233a] tracking-tight">
                Industry-Aligned Engineering Programs
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 font-normal leading-relaxed">
                Practical, workflow-grounded engineering courses conducted by experienced design leads at our Chennai facility.
              </p>
            </div>

            {/* Interactive Control Console (Filters + Search) */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
              
              {/* Category Pills Strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
                <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider mr-1 shrink-0">
                  PROGRAM:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold tracking-wider whitespace-nowrap transition-colors cursor-pointer border min-h-[36px] active:scale-[0.98] ${
                      selectedCategory === cat
                        ? "bg-[#0b233a] text-white border-[#0b233a]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search software (SP3D, CAESAR II, HYSYS)..."
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans placeholder:text-slate-400 focus:outline-none focus:border-[#0b233a] transition-colors min-h-[40px]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-slate-500">
                  <span>
                    Showing <strong className="text-[#0b233a]">{filteredCourses.length}</strong> of {courses.length} Programs
                  </span>
                  {(selectedCategory !== "All" || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      className="text-[#FF8A00] font-bold hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Courses Grid View */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto p-8">
                <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="font-display text-base font-bold text-[#0b233a] mb-1">No Matching Courses Found</h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Try searching for a different software tool or reset your category filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-[#FF8A00] hover:bg-[#E67C00] text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                {filteredCourses.map((course) => (
                  <article
                    key={course.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* 1. Navy Title & Metadata Header Strip */}
                      <div className="bg-[#0b233a] text-white px-5 py-4 border-b border-[#0b233a] space-y-3">
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded bg-[#FF8A00] text-white font-mono text-[10px] font-extrabold uppercase tracking-wider">
                              PROGRAM {course.number}
                            </span>
                            <span className="px-2.5 py-1 rounded bg-white/10 text-amber-300 font-mono text-[10px] font-bold uppercase border border-white/20 truncate max-w-[140px]">
                              {course.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300 font-semibold shrink-0">
                            <Clock className="w-3.5 h-3.5 text-[#FF8A00]" />
                            <span>{course.duration.split("·")[0].trim()}</span>
                          </div>
                        </div>

                        {/* Discipline Icon + Title */}
                        <div className="flex items-start gap-3 pt-0.5">
                          <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FF8A00] border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                            {getCourseIcon(course.icon)}
                          </div>
                          <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug min-h-[48px] flex items-center">
                            {course.title}
                          </h3>
                        </div>
                      </div>

                      {/* 2. White Card Content Body */}
                      <div className="p-5 sm:p-6 space-y-4">
                        {/* Description */}
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal min-h-[40px] line-clamp-2">
                          {course.description}
                        </p>

                        {/* High-Contrast Technical Telemetry Box */}
                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2.5">
                          <div>
                            <span className="font-mono text-[9px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5 flex items-center gap-1">
                              <Laptop className="w-3 h-3 text-[#FF8A00]" />
                              <span>CAD / CAE Platforms Taught</span>
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {course.software.slice(0, 3).map((sw) => (
                                <span
                                  key={sw}
                                  className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0b233a] font-mono text-[10px] font-semibold"
                                >
                                  {sw}
                                </span>
                              ))}
                              {course.software.length > 3 && (
                                <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500 font-mono text-[10px]">
                                  +{course.software.length - 3}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-500 font-medium">Training Center</span>
                            <span className="text-slate-800 font-bold">Vadapalani Hub, Chennai</span>
                          </div>
                        </div>

                        {/* Core Highlights */}
                        <div className="space-y-2 pt-1">
                          {course.highlights.slice(0, 3).map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-snug line-clamp-1">{hl}</span>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-4 sm:p-5 pt-3 border-t border-slate-200 flex items-center gap-2.5 bg-slate-50">
                      <button
                        onClick={() => openSyllabus(course)}
                        className="w-1/2 py-2.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-100 font-mono text-xs uppercase font-bold tracking-wider text-[#0b233a] flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[42px]"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </button>

                      <button
                        onClick={() => handleEnquireBatch(course)}
                        className="w-1/2 py-2.5 px-3 rounded-lg bg-[#FF8A00] hover:bg-[#E67C00] text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[42px]"
                      >
                        <span>Enquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </article>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           5. WHY SAUR ACADEMY: PEDAGOGY & METHODOLOGY
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

            <div className="max-w-2xl mb-10 sm:mb-12">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF8A00] font-bold block mb-1">
                OUR METHODOLOGY &amp; PEDAGOGY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b233a] tracking-tight">
                Why Engineers &amp; Corporates Choose Saur Academy
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">

              {/* Pillar 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[#FF8A00]/10 flex items-center justify-center text-[#FF8A00] mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#0b233a] mb-2">
                  Taught by Active Design Leads
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Mentorship from engineers actively delivering FEED and detailed engineering projects for ADNOC, Saudi Aramco, and Pertamina.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#0b233a] mb-2">
                  Real Industrial Project Workflows
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  No artificial toy problems. Students work on actual P&amp;IDs, 3D equipment layouts, clash checks, and isometric extractions.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0b233a] mb-4 border border-blue-100">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#0b233a] mb-2">
                  Dedicated Workstation Lab
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  High-performance multi-monitor CAD/CAE workstations in our Vadapalani, Chennai facility for uninterrupted hands-on practice.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 border border-amber-100">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#0b233a] mb-2">
                  Placement &amp; Portfolio Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Comprehensive portfolio reviews, mock technical interviews, and resume alignment for top EPC contractors and consultancies.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           6. CHENNAI ACADEMY FACILITY (Split Card)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-18 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col lg:flex-row bg-slate-50">

              <div className="p-6 sm:p-8 lg:p-12 lg:w-[60%] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b233a]/5 border border-[#0b233a]/10 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                    <span className="font-mono text-[10px] text-[#0b233a] font-bold uppercase tracking-[0.15em]">
                      CHENNAI DELIVERY &amp; TRAINING HUB
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0b233a] mb-3">
                    Chennai Technical Academy Center
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    Our Chennai academy is equipped with licensed engineering software workstations, high-speed connectivity,
                    and interactive lecture rooms designed for immersive training on live project workflows.
                  </p>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 mb-6">
                    <div className="flex items-start gap-2.5 text-xs font-mono text-slate-700">
                      <MapPin className="w-4 h-4 text-[#FF8A00] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai - 600026, Tamil Nadu, India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4 sm:gap-6 text-xs font-mono text-slate-700">
                  <a href="tel:+918828612183" className="hover:text-[#FF8A00] transition-colors flex items-center gap-1.5 min-h-[36px]">
                    <Phone className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>+91 88286 12183</span>
                  </a>
                  <a href="tel:+919967112295" className="hover:text-[#FF8A00] transition-colors flex items-center gap-1.5 min-h-[36px]">
                    <Phone className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>+91 99671 12295</span>
                  </a>
                  <a href="mailto:contact@saurengineering.in" className="hover:text-[#FF8A00] transition-colors flex items-center gap-1.5 min-h-[36px]">
                    <Mail className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>contact@saurengineering.in</span>
                  </a>
                </div>
              </div>

              <div className="lg:w-[40%] min-h-[260px] sm:min-h-[320px] relative bg-slate-900">
                <img
                  src="/media/page-training-hero.png"
                  alt="Chennai Academy Classrooms"
                  className="w-full h-full object-cover object-center brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300 font-bold block mb-0.5">
                    VADAPALANI LAB
                  </span>
                  <span className="font-display text-sm font-bold">
                    Classroom &amp; Workstations Lab
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           7. B2B CORPORATE TRAINING & BESPOKE UPSKILLING CTA
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-[#0b233a] text-white relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF8A00]/20 border border-[#FF8A00]/40 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-[0.16em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
              <span>CORPORATE ENGAGEMENT</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Equip your engineering teams with proven delivery skills
            </h2>

            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              We offer bespoke corporate training packages tailored to your engineering team&apos;s active project tools, CAD databases, and client specifications.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <button
                onClick={() => setConsultationOpen(true)}
                className="w-full sm:w-auto justify-center bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] text-white px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Request Corporate Training Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/company#certificates"
                className="w-full sm:w-auto justify-center border border-white/30 hover:bg-white/10 active:scale-[0.98] text-white px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all inline-flex items-center gap-2 min-h-[44px]"
              >
                <span>View ISO Certifications</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CourseSyllabusModal
        course={selectedCourse}
        isOpen={syllabusModalOpen}
        onClose={() => setSyllabusModalOpen(false)}
        onEnquireBatch={handleEnquireBatch}
      />

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
    </div>
  );
}

