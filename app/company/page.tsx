"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateModal from "@/components/CertificateModal";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import DisciplineModal from "@/components/DisciplineModal";
import WhitepaperModal from "@/components/WhitepaperModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { cn } from "@/lib/utils";
import {
  about,
  coreValues,
  certificates,
  type CertificateItem,
} from "@/data/site";
import type { Discipline } from "@/components/PrecisionDisciplines";
import type { Whitepaper } from "@/components/TechnicalWhitepapers";

// Corporate Animation Physics (Classical, Sleek, Formal)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// ISO 9001:2015 Quality Gate Stepper Data (Compact, Clean & Easy Language)
const qualityGates = [
  {
    step: "01",
    name: "Basis of Design & Codes",
    code: "PHASE 01",
    stamp: "DBM APPROVED",
    icon: "rule",
    image: "/images/process.png",
    desc: "We review all project requirements, client standards, and safety codes before design begins.",
    deliverables: [
      "Design Basis Document",
      "P&ID Philosophy & Limits",
      "Material & Safety Codes",
    ],
  },
  {
    step: "02",
    name: "Multidisciplinary 3D Model",
    code: "PHASE 02",
    stamp: "ZERO CLASH",
    icon: "view_in_ar",
    image: "/media/saur-engineering-coordination.png",
    desc: "We build integrated 3D models across all disciplines to remove clashes and make construction smooth.",
    deliverables: [
      "30% / 60% / 90% Model Reviews",
      "Clash Detection Audit Logs",
      "Pipe Stress & Support Plans",
    ],
  },
  {
    step: "03",
    name: "Two-Tier QA Check Gate",
    code: "PHASE 03",
    stamp: "IDC VERIFIED",
    icon: "verified_user",
    image: "/media/expertise-design-office.png",
    desc: "Senior discipline checkers and lead engineers review every calculation and drawing for 100% accuracy.",
    deliverables: [
      "Inter-Discipline Review (IDC)",
      "Design Comment Fix Log",
      "Verified Material Take-Offs",
    ],
  },
  {
    step: "04",
    name: "IFC Release & As-Built",
    code: "PHASE 04",
    stamp: "IFC CERTIFIED",
    icon: "task_alt",
    image: "/media/saur-fabrication-projects.png",
    desc: "We issue approved drawings for construction, fabrication spool sheets, and as-built updates.",
    deliverables: [
      "Issued For Construction (IFC)",
      "Fabrication Spool Drawings",
      "Final As-Built Updates",
    ],
  },
];

// Option 2: Vision & Mission Interactive Focus Pillars (Easy & Clear Language)
const visionPillars = [
  {
    id: "future-ready",
    label: "Future-Ready Design",
    proof: "Clean energy engineering and sustainable plant upgrades.",
  },
  {
    id: "digital-twin",
    label: "3D Plant Modeling",
    proof: "Accurate 3D models that prevent errors and clashes during construction.",
  },
  {
    id: "standards",
    label: "Global Standards",
    proof: "Strict compliance with international safety and engineering standards.",
  },
];

const missionPillars = [
  {
    id: "schedule",
    label: "On-Time Delivery",
    proof: "Clear milestone planning to prevent site delays and keep projects on schedule.",
  },
  {
    id: "qa-gates",
    label: "Two-Tier Quality Check",
    proof: "Every drawing and calculation is independently checked by senior engineers.",
  },
  {
    id: "multi-disc",
    label: "11 Disciplines",
    proof: "Full multidisciplinary team working together under dedicated project leads.",
  },
];

export default function AboutPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<Whitepaper | null>(null);
  const [activeVisionPillar, setActiveVisionPillar] = useState<number | null>(0);
  const [activeMissionPillar, setActiveMissionPillar] = useState<number | null>(0);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedGate, setExpandedGate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#FF8A00] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <main className="w-full">
        {/* ══════════════════════════════════════════════════════════════════════
           1. HERO: The Signature Diagonal Angle Split (Responsive Mobile + Desktop)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] flex items-stretch overflow-hidden pt-20 sm:pt-22 lg:pt-24 pb-6 bg-[#0b233a]">
          {/* Industrial Plant Image Background (Subtle overlay on mobile, full-bleed right on desktop) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/page-company-hero.png')",
              backgroundPosition: "center right",
            }}
          >
            {/* Scrim: Dark navy gradient on mobile, subtle vignette on desktop */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b233a]/95 via-[#0b233a]/90 to-[#0b233a] lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/50" />

            {/* Floating Editorial Badges on Right (Desktop only) */}
            <div className="hidden xl:block absolute top-12 right-16 text-right text-white">
              <div className="w-8 h-0.5 bg-[#FF8A00] ml-auto mb-2" />
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                ENGINEERING INDUSTRY
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
                FOR A STRONGER TOMORROW
              </div>
            </div>

            <div className="hidden xl:block absolute bottom-12 right-16 text-right text-white/80 font-mono text-[10px] uppercase tracking-[0.2em]">
              IDEAS. ENGINEERING. REAL IMPACT.
            </div>
          </div>

          {/* Left Angle Polygonal Navy Container */}
          <div className="relative z-10 w-full lg:w-[60%] xl:w-[54%] bg-transparent lg:bg-[#0b233a] flex flex-col justify-center px-4 sm:px-8 md:px-16 py-8 sm:py-10 lg:py-14 [clip-path:none] lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-xl"
            >
              {/* Eyebrow with Orange Accent Line */}
              <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <div className="w-5 sm:w-6 h-0.5 bg-[#FF8A00]" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#FF8A00]">
                  ABOUT SAUR ENGINEERING &amp; CONSULTANCY
                </span>
              </motion.div>

              {/* Main Headline (High Visibility & Crisp Contrast) */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-5"
              >
                Engineering Solutions <br className="hidden sm:inline" />
                <span className="text-white">That Power</span>{" "}
                <span className="text-[#FF8A00]">Industrial Progress</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="font-sans text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed mb-6 sm:mb-7 max-w-lg font-light"
              >
                A multidisciplinary engineering consultancy providing design, 3D modeling,
                and field support for Oil &amp; Gas, EPC, and industrial projects worldwide.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto"
              >
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg sm:rounded font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-sm hover:shadow inline-flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  <span>Request Consultation</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <a
                  href="#purpose"
                  className="border border-white/40 hover:bg-white/10 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg sm:rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  <span>Explore Capabilities</span>
                </a>
              </motion.div>

              {/* Bottom Telemetry Line */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-slate-300 sm:text-slate-400 pt-4 sm:pt-5 border-t border-white/15"
              >
                <span>PEOPLE</span>
                <span className="text-white/30">•</span>
                <span>PROCESS</span>
                <span className="text-white/30">•</span>
                <span>PERFORMANCE</span>
                <span className="text-white/30">•</span>
                <Link
                  href="#certificates"
                  className="text-amber-400 hover:text-white transition-colors underline decoration-amber-400/50 font-bold"
                >
                  IMS CERTIFIED
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           2. LIVE ANIMATED METRIC COUNTERS IN TRUST STRIP (2x2 Mobile, 4x1 Desktop)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-200 py-6 sm:py-7">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={containerVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
            >
              {/* Metric 1 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent lg:border-r lg:border-slate-200 lg:pr-6 group cursor-pointer"
                onClick={() => {
                  const el = document.getElementById("certificates");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border border-slate-200 flex items-center justify-center shrink-0 text-[#0b233a] bg-white sm:bg-slate-50 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors shadow-2xs">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">verified</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 sm:gap-1.5">
                    <AnimatedCounter
                      value={4}
                      className="font-display text-xl sm:text-2xl font-extrabold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors"
                    />
                    <span className="font-display text-xs sm:text-sm font-bold text-[#0b233a]">
                      ACCREDITATIONS
                    </span>
                  </div>
                  <div className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-slate-500 line-clamp-1">
                    ISO 9001 · 14001 · 45001 &amp; DPIIT
                  </div>
                </div>
              </motion.div>

              {/* Metric 2 */}
              <motion.div variants={itemVariants} className="p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent">
                <Link
                  href="/expertise"
                  className="flex items-center gap-2.5 sm:gap-3.5 lg:border-r lg:border-slate-200 lg:pr-6 group cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border border-slate-200 flex items-center justify-center shrink-0 text-[#0b233a] bg-white sm:bg-slate-50 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">hub</span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1 sm:gap-1.5">
                      <AnimatedCounter
                        value={11}
                        suffix="+"
                        className="font-display text-xl sm:text-2xl font-extrabold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors"
                      />
                      <span className="font-display text-xs sm:text-sm font-bold text-[#0b233a]">
                        DISCIPLINES
                      </span>
                    </div>
                    <div className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-slate-500 line-clamp-1">
                      PROCESS, PIPING, E&amp;I, SUBSEA
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Metric 3 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent lg:border-r lg:border-slate-200 lg:pr-6 group cursor-pointer"
                onClick={() => {
                  const el = document.getElementById("quality-process");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border border-slate-200 flex items-center justify-center shrink-0 text-[#0b233a] bg-white sm:bg-slate-50 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors shadow-2xs">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">description</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 sm:gap-1.5">
                    <AnimatedCounter
                      value={500}
                      suffix="+"
                      className="font-display text-xl sm:text-2xl font-extrabold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors"
                    />
                    <span className="font-display text-xs sm:text-sm font-bold text-[#0b233a]">
                      DELIVERABLES
                    </span>
                  </div>
                  <div className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-slate-500 line-clamp-1">
                    VERIFIED MTO, 3D MODELS, SLDs
                  </div>
                </div>
              </motion.div>

              {/* Metric 4 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent group cursor-pointer"
                onClick={() => {
                  const el = document.getElementById("locations");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border border-slate-200 flex items-center justify-center shrink-0 text-[#0b233a] bg-white sm:bg-slate-50 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors shadow-2xs">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">domain</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 sm:gap-1.5">
                    <AnimatedCounter
                      value={2}
                      className="font-display text-xl sm:text-2xl font-extrabold text-[#0b233a] group-hover:text-[#FF8A00] transition-colors"
                    />
                    <span className="font-display text-xs sm:text-sm font-bold text-[#0b233a]">
                      DELIVERY HUBS
                    </span>
                  </div>
                  <div className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-slate-500 line-clamp-1">
                    MUMBAI HQ &amp; CHENNAI ACADEMY
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* ══════════════════════════════════════════════════════════════════════
           3. WHO WE ARE: Purpose & Strategic Foundation (Interactive Focus Pillars)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-white" id="purpose">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="max-w-3xl mb-8 sm:mb-12"
            >
              <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                OUR PURPOSE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight leading-tight">
                Engineering excellence built for complex industrial assets
              </h2>
            </motion.div>

            {/* Responsive Overlay Cards for Vision & Mission with Click/Tap Toggle & Desktop Hover Drawer */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
            >
              {/* Vision Card */}
              {(() => {
                const isVisionOpen = expandedCard === "vision";
                return (
                  <motion.div
                    variants={itemVariants}
                    onClick={() => setExpandedCard(prev => prev === "vision" ? null : "vision")}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm hover:shadow-xl hover:border-[#FF8A00]/50 transition-all duration-300 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-3.5 sm:p-5 cursor-pointer"
                  >
                    {/* Full-bleed Background Image with subtle contrast scrim */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src="/media/expertise-design-office.png"
                        alt="Saur Engineering Strategic Vision"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a]/95 via-[#0b233a]/40 to-black/35" />
                    </div>

                    {/* Top Floating Telemetry Badges */}
                    <div className="relative z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-0">
                      <div className="bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-sm border border-slate-200/80 text-[10px] sm:text-xs font-mono font-bold text-[#0b233a] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs sm:text-sm text-[#FF8A00]">explore</span>
                        <span>STRATEGIC VISION</span>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg shadow-sm border border-slate-200/80 text-[9px] sm:text-[11px] font-mono font-semibold text-slate-700 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-[#FF8A00]">hub</span>
                        <span>SP3D / E3D</span>
                      </div>
                      <div className="hidden sm:flex bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200/80 text-[11px] font-mono font-semibold text-slate-700 items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-[#FF8A00]">eco</span>
                        <span>FUTURE-READY</span>
                      </div>
                    </div>

                    {/* Bottom Floating Navy Card Overlay (Collapsed by default, expands on tap or hover) */}
                    <div className="relative z-10 bg-[#0b233a]/95 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/15 shadow-2xl transition-all duration-500 ease-out">
                      {/* Header Bar */}
                      <div className="flex items-center justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-[#FF8A00] tracking-wider block mb-0.5 sm:mb-1">
                            STRATEGIC VISION
                          </span>
                          <h3 className="font-display text-base sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                            Globally Trusted Engineering Excellence
                          </h3>
                        </div>

                        {/* Orange Action Button with Animated Rotation */}
                        <div
                          className={cn(
                            "w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-[#FF8A00] flex items-center justify-center text-white shrink-0 transition-all duration-300 shadow-md",
                            isVisionOpen ? "rotate-90 scale-105" : "group-hover:scale-105 group-hover:rotate-[-45deg]"
                          )}
                        >
                          <span className="material-symbols-outlined text-base sm:text-xl">arrow_forward</span>
                        </div>
                      </div>

                      {/* Drawer Content: Animated expansion on click or desktop hover */}
                      <div
                        className={cn(
                          "grid transition-all duration-500 ease-out",
                          isVisionOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="pt-3 sm:pt-3.5 mt-2.5 sm:mt-3 border-t border-white/10">
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-3">
                              {about.vision}
                            </p>

                            {/* Interactive Focus Pillars */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                              {visionPillars.map((p, idx) => {
                                const isSelected = activeVisionPillar === idx;
                                return (
                                  <button
                                    key={p.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveVisionPillar(isSelected ? null : idx);
                                    }}
                                    className={`px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-all ${
                                      isSelected
                                        ? "bg-[#FF8A00] text-white font-bold shadow-xs"
                                        : "bg-white/10 hover:bg-white/20 text-slate-200 font-medium"
                                    }`}
                                  >
                                    {p.label}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Dynamic Micro Proof Point */}
                            <AnimatePresence mode="wait">
                              {activeVisionPillar !== null && (
                                <motion.div
                                  key={activeVisionPillar}
                                  initial={{ opacity: 0, y: 2 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -2 }}
                                  transition={{ duration: 0.15 }}
                                  className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-300 pt-2 border-t border-white/10"
                                >
                                  <span className="material-symbols-outlined text-xs sm:text-sm text-[#FF8A00] shrink-0">check_circle</span>
                                  <span className="leading-snug">{visionPillars[activeVisionPillar].proof}</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Mission Card */}
              {(() => {
                const isMissionOpen = expandedCard === "mission";
                return (
                  <motion.div
                    variants={itemVariants}
                    onClick={() => setExpandedCard(prev => prev === "mission" ? null : "mission")}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm hover:shadow-xl hover:border-[#FF8A00]/50 transition-all duration-300 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-3.5 sm:p-5 cursor-pointer"
                  >
                    {/* Full-bleed Background Image */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src="/media/saur-engineering-coordination.png"
                        alt="Saur Engineering Operational Mission"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a]/95 via-[#0b233a]/40 to-black/35" />
                    </div>

                    {/* Top Floating Telemetry Badges */}
                    <div className="relative z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-0">
                      <div className="bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-sm border border-slate-200/80 text-[10px] sm:text-xs font-mono font-bold text-[#0b233a] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs sm:text-sm text-[#FF8A00]">rocket_launch</span>
                        <span>OPERATIONAL MISSION</span>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg shadow-sm border border-slate-200/80 text-[9px] sm:text-[11px] font-mono font-semibold text-slate-700 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-[#FF8A00]">timer</span>
                        <span>SCHEDULE CERTAINTY</span>
                      </div>
                      <div className="hidden sm:flex bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200/80 text-[11px] font-mono font-semibold text-slate-700 items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-[#FF8A00]">verified_user</span>
                        <span>TWO-TIER QA</span>
                      </div>
                    </div>

                    {/* Bottom Floating Navy Card Overlay */}
                    <div className="relative z-10 bg-[#0b233a]/95 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/15 shadow-2xl transition-all duration-500 ease-out">
                      {/* Header Bar */}
                      <div className="flex items-center justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-[#FF8A00] tracking-wider block mb-0.5 sm:mb-1">
                            OPERATIONAL MANDATE
                          </span>
                          <h3 className="font-display text-base sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                            World-Class Delivery &amp; Client Value
                          </h3>
                        </div>

                        {/* Orange Action Button with Animated Rotation */}
                        <div
                          className={cn(
                            "w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-[#FF8A00] flex items-center justify-center text-white shrink-0 transition-all duration-300 shadow-md",
                            isMissionOpen ? "rotate-90 scale-105" : "group-hover:scale-105 group-hover:rotate-[-45deg]"
                          )}
                        >
                          <span className="material-symbols-outlined text-base sm:text-xl">arrow_forward</span>
                        </div>
                      </div>

                      {/* Drawer Content */}
                      <div
                        className={cn(
                          "grid transition-all duration-500 ease-out",
                          isMissionOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="pt-3 sm:pt-3.5 mt-2.5 sm:mt-3 border-t border-white/10">
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-3">
                              {about.mission}
                            </p>

                            {/* Interactive Focus Pillars */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                              {missionPillars.map((p, idx) => {
                                const isSelected = activeMissionPillar === idx;
                                return (
                                  <button
                                    key={p.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMissionPillar(isSelected ? null : idx);
                                    }}
                                    className={`px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-all ${
                                      isSelected
                                        ? "bg-[#FF8A00] text-white font-bold shadow-xs"
                                        : "bg-white/10 hover:bg-white/20 text-slate-200 font-medium"
                                    }`}
                                  >
                                    {p.label}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Dynamic Micro Proof Point */}
                            <AnimatePresence mode="wait">
                              {activeMissionPillar !== null && (
                                <motion.div
                                  key={activeMissionPillar}
                                  initial={{ opacity: 0, y: 2 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -2 }}
                                  transition={{ duration: 0.15 }}
                                  className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-300 pt-2 border-t border-white/10"
                                >
                                  <span className="material-symbols-outlined text-xs sm:text-sm text-[#FF8A00] shrink-0">check_circle</span>
                                  <span className="leading-snug">{missionPillars[activeMissionPillar].proof}</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. ISO 9001:2015 QUALITY PROCESS: Responsive Stage Gate Cards with Click/Tap Toggle
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 bg-white" id="quality-process">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
            >
              <div className="max-w-2xl">
                <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  QUALITY ASSURANCE &amp; METHODOLOGY
                </span>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight leading-tight">
                  ISO 9001:2015 Quality Governance Process
                </h2>
              </div>

              {/* ISO Quality Badge */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 shrink-0 self-start md:self-auto shadow-2xs">
                <span className="material-symbols-outlined text-xl text-[#FF8A00]">verified</span>
                <div className="font-display text-xs font-bold text-[#0b233a]">
                  ISO 9001:2015 Certified
                </div>
              </div>
            </motion.div>

            {/* 4 Clean Compact Floating Overlay Cards with Responsive Drawer */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {qualityGates.map((gate) => {
                const isGateOpen = expandedGate === gate.step;

                return (
                  <motion.div key={gate.step} variants={itemVariants}>
                    <div
                      onClick={() => setExpandedGate(prev => prev === gate.step ? null : gate.step)}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs hover:shadow-xl hover:border-[#FF8A00]/50 transition-all duration-300 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer"
                    >
                      {/* Full-bleed Background Image */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <img
                          src={gate.image}
                          alt={gate.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a]/95 via-[#0b233a]/35 to-black/35" />
                      </div>

                      {/* Top Floating Badges */}
                      <div className="relative z-10 flex items-center justify-between gap-2 mb-3 sm:mb-0">
                        <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-xs border border-slate-200/80 text-[10px] sm:text-[11px] font-mono font-bold text-[#0b233a] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs text-[#FF8A00]">
                            {gate.icon}
                          </span>
                          <span>{gate.code}</span>
                        </div>

                        <div className="bg-black/60 backdrop-blur-xs px-2 py-1 rounded-md text-[8px] sm:text-[9px] font-mono font-bold text-amber-300 border border-white/15 uppercase tracking-wider">
                          {gate.stamp}
                        </div>
                      </div>

                      {/* Bottom Floating Navy Drawer */}
                      <div className="relative z-10 bg-[#0b233a]/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-white/15 shadow-xl transition-all duration-500 ease-out">
                        {/* Header in Rest State */}
                        <div className="flex items-center justify-between gap-2 sm:gap-3">
                          <div className="flex-1 min-w-0">
                            <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-[#FF8A00] tracking-wider block mb-0.5">
                              STAGE {gate.step} GATE
                            </span>
                            <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                              {gate.name}
                            </h3>
                          </div>

                          {/* Orange Arrow Action Indicator */}
                          <div
                            className={cn(
                              "w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FF8A00] flex items-center justify-center text-white shrink-0 transition-all duration-300 shadow-sm",
                              isGateOpen ? "rotate-90 scale-105" : "group-hover:scale-105 group-hover:rotate-[-45deg]"
                            )}
                          >
                            <span className="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
                          </div>
                        </div>

                        {/* Expandable Drawer: Controlled by isGateOpen or desktop hover */}
                        <div
                          className={cn(
                            "grid transition-all duration-500 ease-out",
                            isGateOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="pt-2.5 sm:pt-3 mt-2 sm:mt-2.5 border-t border-white/10">
                              <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed font-light mb-2">
                                {gate.desc}
                              </p>

                              {/* Clean Deliverables Chips */}
                              <div className="space-y-1">
                                {gate.deliverables.map((deliv, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-200 font-mono"
                                  >
                                    <span className="material-symbols-outlined text-xs text-[#FF8A00] shrink-0">
                                      check
                                    </span>
                                    <span className="truncate">{deliv}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           5. ACCREDITATIONS & REGULATORY COMPLIANCE: Interactive Certificate Lens
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200" id="certificates">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="max-w-3xl mb-8 sm:mb-12"
            >
              <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                ACCREDITATIONS &amp; REGULATORY COMPLIANCE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight mb-2 sm:mb-3 leading-tight">
                Official Certifications &amp; Registrations
              </h2>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base font-light">
                Saur Engineering &amp; Consultancy operates an accredited Integrated Management System (IMS) covering
                Quality (ISO 9001:2015), Environmental Safety (ISO 14001:2015), Occupational Health &amp; Safety (ISO 45001:2018),
                and is officially recognized by the Government of India Department for Promotion of Industry and Internal Trade (DPIIT).
              </p>
            </motion.div>

            {/* 4 Official Certificate Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#FF8A00]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Certificate Thumbnail Preview Container */}
                    <div
                      onClick={() => setSelectedCertificate(cert)}
                      className="relative h-52 sm:h-64 bg-slate-100 overflow-hidden cursor-pointer border-b border-slate-200 flex items-center justify-center p-3 group-hover:bg-amber-50/40 transition-colors"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="max-h-full max-w-full object-contain shadow-xs rounded border border-slate-200 group-hover:scale-[1.03] transition-transform duration-500"
                      />

                      {/* Interactive Lens Overlay */}
                      <div className="absolute inset-0 bg-[#0b233a]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4 backdrop-blur-[2px]">
                        <span className="px-4 py-2 rounded-full bg-white text-[#0b233a] font-mono text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-base text-[#FF8A00]">zoom_in</span>
                          <span>Inspect Certificate</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold uppercase bg-amber-50 text-[#FF8A00] border border-amber-200 mb-2">
                        {cert.badge}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#0b233a] leading-tight mb-1 group-hover:text-[#FF8A00] transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2 font-light">
                        {cert.subtitle}
                      </p>

                      <div className="pt-3 border-t border-slate-100 space-y-1 text-xs font-mono text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Cert No:</span>
                          <span className="font-bold text-[#0b233a] text-[11px] sm:text-xs">{cert.certificateNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Valid Upto:</span>
                          <span className="font-bold text-slate-700 text-[11px] sm:text-xs">{cert.validity}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0">
                    <button
                      onClick={() => setSelectedCertificate(cert)}
                      className="w-full py-2.5 px-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-slate-50 hover:bg-[#0b233a] text-[#0b233a] hover:text-white border border-slate-200 transition-colors flex items-center justify-center gap-1.5 min-h-[42px]"
                    >
                      <span>View Official Certificate</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           6. LOCATIONS: Navi Mumbai HQ & Chennai Delivery Center
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-200" id="locations">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="max-w-2xl mb-8 sm:mb-12"
            >
              <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                DELIVERY INFRASTRUCTURE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight leading-tight">
                Two Delivery Centers in India
              </h2>
            </motion.div>

            {/* 2 Regional Delivery Center Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
            >
              {/* Navi Mumbai HQ Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-[#FF8A00]/50 hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative w-full h-48 sm:h-56 bg-slate-900 overflow-hidden border-b border-slate-200">
                  <img
                    src="/media/expertise-design-office.png"
                    alt="Navi Mumbai Design Center"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                    <span className="px-2.5 sm:px-3 py-1 rounded bg-[#0b233a] text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                      HEADQUARTERS &amp; EPC HUB
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b233a] mb-2 group-hover:text-[#FF8A00] transition-colors">
                      Navi Mumbai Delivery Center
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-5 sm:mb-6 leading-relaxed flex items-start gap-2 font-light">
                      <span className="material-symbols-outlined text-base text-[#FF8A00] shrink-0 mt-0.5">location_on</span>
                      <span>507 &amp; 508, 5th Floor, Real Tech Park, Sector 30A, Vashi, Navi Mumbai-400703</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-700">
                    <a href="tel:+919967112295" className="hover:text-[#FF8A00] flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-sm text-[#0b233a]">call</span>
                      +91 99671 12295
                    </a>
                    <a href="mailto:contact@saurengineering.in" className="hover:text-[#FF8A00] flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-sm text-[#0b233a]">mail</span>
                      contact@saurengineering.in
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Chennai Delivery & Academy Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-[#FF8A00]/50 hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative w-full h-48 sm:h-56 bg-slate-900 overflow-hidden border-b border-slate-200">
                  <img
                    src="/media/page-training-hero.png"
                    alt="Chennai Training Academy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                    <span className="px-2.5 sm:px-3 py-1 rounded bg-[#0b233a] text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                      DELIVERY &amp; TECHNICAL ACADEMY
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b233a] mb-2 group-hover:text-[#FF8A00] transition-colors">
                      Chennai Delivery &amp; Academy
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-5 sm:mb-6 leading-relaxed flex items-start gap-2 font-light">
                      <span className="material-symbols-outlined text-base text-[#FF8A00] shrink-0 mt-0.5">location_on</span>
                      <span>No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai-600026</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-slate-700">
                    <a href="tel:+918828612183" className="hover:text-[#FF8A00] flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-sm text-[#0b233a]">call</span>
                      +91 88286 12183
                    </a>
                    <Link href="/training" className="text-[#FF8A00] hover:underline font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">school</span>
                      Training Programs →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           7. CORE VALUES: Responsive Operating Principles
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="max-w-2xl mb-8 sm:mb-12"
            >
              <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                OPERATING PRINCIPLES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight leading-tight">
                Our Core Values
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
            >
              {coreValues.map((val) => (
                <motion.div
                  key={val.title}
                  variants={itemVariants}
                  className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#FF8A00]/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF8A00] mb-4">
                    <span className="material-symbols-outlined text-2xl">
                      {val.icon}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b233a] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           8. ACTIONABLE CTA (Matching the Hero Navy `#0b233a`)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-[#0b233a] text-white relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 text-center relative z-10">
            <div className="w-8 h-1 bg-[#FF8A00] mx-auto mb-3 sm:mb-4" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Ready to start your next engineering project?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Talk to our team about engineering design, 3D plant modeling, project manpower, or corporate training.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Request a Consultation</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <Link
                href="/projects"
                className="border border-white/40 hover:bg-white/10 text-white px-7 py-3.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              >
                <span>View Projects</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectDiscipline={(d) => setSelectedDiscipline(d)}
        onSelectWhitepaper={(w) => setSelectedWhitepaper(w)}
      />

      <DisciplineModal
        discipline={selectedDiscipline}
        onClose={() => setSelectedDiscipline(null)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      <WhitepaperModal
        whitepaper={selectedWhitepaper}
        onClose={() => setSelectedWhitepaper(null)}
      />
    </div>
  );
}
