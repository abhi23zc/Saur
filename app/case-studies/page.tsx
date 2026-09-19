"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import CaseStudyQuickModal from "@/components/CaseStudyQuickModal";
import { caseStudies, CaseStudy } from "@/data/site";
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  ArrowRight, 
  Search, 
  X, 
  Building2, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowUpDown, 
  FileSpreadsheet
} from "lucide-react";

export default function CaseStudiesPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeModalCaseStudy, setActiveModalCaseStudy] = useState<CaseStudy | null>(null);

  // Filter & Sort State
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("All");
  const [selectedOperator, setSelectedOperator] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"number" | "hours-desc" | "deliverables-desc" | "title-asc">("number");

  // Helper to parse numeric hours for sorting
  const parseHours = (manHoursStr: string): number => {
    const clean = manHoursStr.replace(/[^0-9]/g, "");
    return clean ? parseInt(clean, 10) : 0;
  };

  // Helper to parse numeric deliverables count
  const parseDocs = (docStr: string): number => {
    const clean = docStr.replace(/[^0-9]/g, "");
    return clean ? parseInt(clean, 10) : 0;
  };

  // Extract Unique Disciplines & Operators
  const allDisciplines = useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((cs) => cs.disciplines.forEach((d) => set.add(d)));
    return Array.from(set).sort();
  }, []);

  const allOperators = useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((cs) => {
      if (cs.endUser) set.add(cs.endUser);
    });
    return Array.from(set).sort();
  }, []);

  // Filtered and Sorted Case Studies
  const filteredCaseStudies = useMemo(() => {
    const result = caseStudies.filter((cs) => {
      // Discipline filter
      if (selectedDiscipline !== "All" && !cs.disciplines.includes(selectedDiscipline)) {
        return false;
      }
      // Operator filter
      if (selectedOperator !== "All" && cs.endUser !== selectedOperator) {
        return false;
      }
      // Keyword search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = cs.title.toLowerCase().includes(q);
        const matchesScope = cs.scope.toLowerCase().includes(q);
        const matchesOperator = cs.endUser.toLowerCase().includes(q);
        const matchesClient = cs.client ? cs.client.toLowerCase().includes(q) : false;
        const matchesDiscipline = cs.disciplines.some((d) => d.toLowerCase().includes(q));
        const matchesDeliverables = cs.deliverables.some((cat) =>
          cat.category.toLowerCase().includes(q) || cat.items.some((it) => it.toLowerCase().includes(q))
        );
        if (!matchesTitle && !matchesScope && !matchesOperator && !matchesClient && !matchesDiscipline && !matchesDeliverables) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === "hours-desc") {
        return parseHours(b.manHours) - parseHours(a.manHours);
      }
      if (sortBy === "deliverables-desc") {
        return parseDocs(b.deliverableCount) - parseDocs(a.deliverableCount);
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      // Default: By Case Study Number (01 -> 13)
      return parseInt(a.number, 10) - parseInt(b.number, 10);
    });
  }, [selectedDiscipline, selectedOperator, searchQuery, sortBy]);

  const hasActiveFilters = selectedDiscipline !== "All" || selectedOperator !== "All" || searchQuery.trim() !== "" || sortBy !== "number";

  const clearAllFilters = () => {
    setSelectedDiscipline("All");
    setSelectedOperator("All");
    setSearchQuery("");
    setSortBy("number");
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#FF8A00] selection:text-white flex flex-col justify-between">
      {/* Navigation */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full pt-14 lg:pt-20">
        
        {/* ══════════════════════════════════════════════════════════════════════
           1. EXECUTIVE HERO SECTION (Dark Navy with Photographic Background)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#0b233a] text-white pt-14 pb-16 sm:pt-18 sm:pb-20 relative overflow-hidden">
          {/* Photographic Background Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/saur-engineering-coordination.png')",
              backgroundPosition: "center right",
            }}
          >
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b233a] via-[#0b233a]/90 to-[#0b233a]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a] via-transparent to-transparent" />
            
            {/* Editorial Badge on Right (Desktop) */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white">
              <div className="w-8 h-0.5 bg-[#FF8A00] ml-auto mb-2" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                AUDITED CASE FILES
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
                VERIFIED ENGINEERING DOSSIERS
              </div>
            </div>

            <div className="hidden xl:block absolute bottom-12 right-16 text-right text-white/80 font-mono text-[10px] uppercase tracking-[0.2em]">
              ISO 9001:2015 CERTIFIED DELIVERY
            </div>
          </div>

          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
          
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
            
            {/* Breadcrumb Bar */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
              <Link href="/" className="hover:text-[#FF8A00] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-400 font-bold">Case Studies</span>
            </div>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FF8A00]/20 border border-[#FF8A00]/40 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-[0.16em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                <span>AUDITED ENGINEERING CASE FILES</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.12]">
                Multidisciplinary <br className="hidden sm:inline" />
                <span className="text-white">Engineering Case Studies</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-8 max-w-3xl">
                Audited project deliverables, man-hour effort logs, and execution milestones demonstrating Saur Engineering&apos;s multidisciplinary capability across major Middle East, Southeast Asia, and Indian energy infrastructure.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#directory"
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Explore 13 Case Studies</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setConsultationOpen(true)}
                  className="border border-white/25 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  <span>Request Engineering Proposal</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Trust Credentials Strip */}
        <TrustCredentialsStrip />

        {/* ══════════════════════════════════════════════════════════════════════
           2. INTERACTIVE CONTROL CONSOLE (Quick Filters, Search & Sort)
           ══════════════════════════════════════════════════════════════════════ */}
        <section id="directory" className="py-6 sm:py-7 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-4">
            
            {/* Operator Quick Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider mr-1 shrink-0">
                OPERATOR:
              </span>
              <button
                onClick={() => setSelectedOperator("All")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedOperator === "All"
                    ? "bg-[#0b233a] text-white border-[#0b233a]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                All ({caseStudies.length})
              </button>
              {allOperators.map((op) => {
                const count = caseStudies.filter((c) => c.endUser === op).length;
                return (
                  <button
                    key={op}
                    onClick={() => setSelectedOperator(op)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider whitespace-nowrap transition-colors cursor-pointer border ${
                      selectedOperator === op
                        ? "bg-[#0b233a] text-white border-[#0b233a]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {op} ({count})
                  </button>
                );
              })}
            </div>

            {/* Discipline Horizontal Filter Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider mr-1 shrink-0">
                DISCIPLINE:
              </span>
              <button
                onClick={() => setSelectedDiscipline("All")}
                className={`px-3 py-1 rounded-md text-xs font-mono uppercase font-medium tracking-wider whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedDiscipline === "All"
                    ? "bg-[#FF8A00] text-white border-[#FF8A00]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                All Disciplines ({caseStudies.length})
              </button>

              {allDisciplines.map((d) => {
                const count = caseStudies.filter((cs) => cs.disciplines.includes(d)).length;
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDiscipline(d)}
                    className={`px-3 py-1 rounded-md text-xs font-mono uppercase font-medium tracking-wider whitespace-nowrap transition-colors cursor-pointer border ${
                      selectedDiscipline === d
                        ? "bg-[#FF8A00] text-white border-[#FF8A00]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {d} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search, Sort & Clear Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search deliverables, operator, scope..."
                  className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:border-[#0b233a] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort & Filter Reset */}
              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                
                {/* Sort Selector */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold uppercase text-[10px] text-slate-500">SORT:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-800 focus:outline-none focus:border-[#0b233a] cursor-pointer"
                  >
                    <option value="number">Case Number (01 → 13)</option>
                    <option value="hours-desc">Highest Effort (Man-Hours ↓)</option>
                    <option value="deliverables-desc">Most Deliverables (Docs ↓)</option>
                    <option value="title-asc">Alphabetical (A → Z)</option>
                  </select>
                </div>

                {/* Reset Filters Button */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

            </div>

            {/* Results Count Summary */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
              <span>
                Showing <strong className="text-[#0b233a]">{filteredCaseStudies.length}</strong> of {caseStudies.length} Audited Case Files
              </span>
              {hasActiveFilters && (
                <span className="text-[#FF8A00] font-semibold">
                  Filtered Results Active
                </span>
              )}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           3. 13 ENGINEERING DOSSIER CARDS (Uniform Fixed Header Heights)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 bg-white min-h-[500px]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            
            {filteredCaseStudies.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl max-w-lg mx-auto p-8">
                <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-[#0b233a] mb-2">No Matching Case Studies</h3>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  No audited case files match your current search query or filter combination.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-[#FF8A00] hover:bg-[#E67C00] text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Grid View with Mathematical Uniform Header Heights */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
                {filteredCaseStudies.map((cs) => (
                  <article
                    key={cs.slug}
                      className="group bg-white border border-slate-200 hover:border-[#0b233a] rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
                    >
                      <div>
                        {/* Clean Top Metadata Strip */}
                        <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-orange-50 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider border border-orange-200">
                              CASE FILE {cs.number}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-white text-[#0b233a] font-mono text-[11px] font-bold border border-slate-200">
                              {cs.endUser}
                            </span>
                          </div>

                          {cs.client && (
                            <span className="text-[11px] font-mono text-slate-500 font-medium truncate max-w-[150px]" title={cs.client}>
                              {cs.client}
                            </span>
                          )}
                        </div>

                        {/* Card Main Body */}
                        <div className="p-5 sm:p-6 space-y-4">
                          
                          {/* Program Title (Unified 2-line height for clean horizontal alignment) */}
                          <Link href={`/case-studies/${cs.slug}`} className="block">
                            <h3 className="font-display text-base sm:text-lg font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors leading-snug min-h-[48px] line-clamp-2">
                              {cs.title}
                            </h3>
                          </Link>

                          {/* Scope Summary Narrative (Unified min-height for clean alignment) */}
                          <p className="text-xs text-slate-600 line-clamp-3 min-h-[48px] leading-relaxed font-normal">
                            {cs.scope}
                          </p>

                          {/* High-Contrast 2-Column Telemetry Box */}
                          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                            <div className="grid grid-cols-2 gap-3 divide-x divide-slate-200">
                              <div className="pr-2">
                                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 font-semibold mb-0.5">
                                  Verified Effort
                                </div>
                                <div className="font-display text-base sm:text-lg font-bold text-[#FF8A00]">
                                  {cs.manHours ? `${cs.manHours} hrs` : "Turnkey"}
                                </div>
                              </div>
                              <div className="pl-3">
                                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 font-semibold mb-0.5">
                                  Deliverables
                                </div>
                                <div className="font-display text-base sm:text-lg font-bold text-[#0b233a]">
                                  {cs.deliverableCount} Docs
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Engaged Disciplines Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {cs.disciplines.map((d) => (
                              <span
                                key={d}
                                className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                              >
                                {d}
                              </span>
                            ))}
                          </div>

                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
                        <button
                          onClick={() => setActiveModalCaseStudy(cs)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 hover:text-[#FF8A00] transition-colors cursor-pointer py-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick Modal</span>
                        </button>

                        <Link
                          href={`/case-studies/${cs.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors py-1"
                        >
                          <span>Full Case File</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                    </article>
                  ))}
              </div>
            )}

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. BOTTOM PROPOSAL & CONSULTATION MASTHEAD
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-[#0b233a] text-white relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
          
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF8A00] font-bold block mb-2">
              ENGINEERING ENGAGEMENT
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 max-w-2xl mx-auto">
              Require Multidisciplinary Engineering Support?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed font-light">
              Our Navi Mumbai HQ and Chennai engineering teams integrate directly with your project schedules, CAD databases, and client specifications.
            </p>

            <button
              onClick={() => setConsultationOpen(true)}
              className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-8 py-3.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Request Detailed Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectDiscipline={() => {}}
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
