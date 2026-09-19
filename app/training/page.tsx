"use client";

import { useState } from "react";
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
  Sparkles,
  ChevronRight,
  GraduationCap
} from "lucide-react";

export default function TrainingPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [syllabusModalOpen, setSyllabusModalOpen] = useState(false);

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

      <main className="w-full pt-14 lg:pt-20">
        
        {/* ══════════════════════════════════════════════════════════════════════
           1. HERO: Diagonal Angle-Split Hero with Photographic Background
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[480px] lg:min-h-[520px] flex items-stretch overflow-hidden pt-20 lg:pt-24 pb-8 bg-[#0b233a]">
          {/* Full-bleed Photographic Background on Right */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/media/page-training-hero.png')",
              backgroundPosition: "center right",
            }}
          >
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b233a] via-[#0b233a]/90 to-[#0b233a]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a] via-transparent to-transparent" />
            
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

          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full flex flex-col justify-center my-auto py-6">
            <div className="max-w-2xl">
              
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF8A00]/20 border border-[#FF8A00]/40 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-[0.16em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
                <span>TECHNICAL ACADEMY &amp; UPSKILLING</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
                We don&apos;t just teach. <br />
                <span className="text-[#FF8A00]">We prepare you to lead.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-8 max-w-xl">
                Practical, workflow-grounded engineering courses conducted by experienced design leads.
                Equipping graduates and practicing engineers with hands-on 3D modeling and EPC delivery expertise.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-6 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Enquire for Next Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#courses"
                  className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2"
                >
                  <span>Explore 6 Program Modules</span>
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           2. TRUST CREDENTIALS STRIP
           ══════════════════════════════════════════════════════════════════════ */}
        <TrustCredentialsStrip />

        {/* ══════════════════════════════════════════════════════════════════════
           3. ACADEMY TELEMETRY BAR (Flat Strip with Hairline Dividers)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-6 sm:py-8 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 sm:divide-x divide-slate-200">
              
              <div className="sm:px-4 first:pl-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Core Disciplines
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] block">
                  6 Signature Programs
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  CAD / CAE Lab
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#FF8A00] block">
                  100% Licensed Workstations
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Instructors
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#0b233a] block">
                  Active EPC Design Leads
                </span>
              </div>

              <div className="sm:px-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Training Facility
                </span>
                <span className="font-display text-xs sm:text-sm font-bold text-slate-800 truncate block">
                  Vadapalani, Chennai Hub
                </span>
              </div>

              <div className="sm:px-4 last:pr-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  QA Governance
                </span>
                <span className="font-display text-xs sm:text-sm font-bold text-emerald-700 block">
                  ISO 9001:2015 QMS
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. COURSES CATALOG (The 6 Signature Programs)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-white" id="courses">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b233a]/5 border border-[#0b233a]/10 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                <span className="font-mono text-[10px] text-[#0b233a] font-bold uppercase tracking-[0.15em]">
                  OFFICIAL CURRICULUM
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight">
                Industry-Aligned Engineering Programs
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal leading-relaxed">
                Practical, workflow-grounded engineering courses conducted by experienced design leads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="group bg-white border border-slate-200 hover:border-[#0b233a] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg"
                >
                  <div>
                    {/* 1. Navy Title & Metadata Header Strip */}
                    <div className="bg-[#0b233a] text-white px-5 py-4 border-b border-[#0b233a] space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-[#FF8A00] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                            PROGRAM {course.number}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-amber-300 font-mono text-[10px] font-bold uppercase border border-white/20 truncate max-w-[130px]">
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
                        <div className="w-10 h-10 rounded-lg bg-white/10 text-[#FF8A00] border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                          {getCourseIcon(course.icon)}
                        </div>
                        <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#FF8A00] transition-colors leading-snug min-h-[48px] flex items-center">
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
                          <span className="font-mono text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                            CAD / CAE Platforms Taught
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

                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono">
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
                  <div className="p-5 pt-3 border-t border-slate-100 flex items-center gap-3">
                    <button
                      onClick={() => openSyllabus(course)}
                      className="w-1/2 py-2.5 px-3 rounded-lg border border-slate-200 hover:border-[#0b233a] hover:bg-slate-50 font-sans text-xs uppercase font-bold tracking-wider text-[#0b233a] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Syllabus</span>
                    </button>

                    <button
                      onClick={() => handleEnquireBatch(course)}
                      className="w-1/2 py-2.5 px-3 rounded-lg bg-[#FF8A00] hover:bg-[#E67C00] text-white font-sans text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           5. WHY SAUR ACADEMY: PEDAGOGY & METHODOLOGY
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF8A00] font-bold block mb-1">
                OUR METHODOLOGY &amp; PEDAGOGY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight">
                Why Engineers &amp; Corporates Choose Saur Academy
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Pillar 1 */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#FF8A00]/10 flex items-center justify-center text-[#FF8A00] mb-4">
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
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
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
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0b233a] mb-4">
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
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
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
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col lg:flex-row">
              
              <div className="p-8 lg:p-12 lg:w-[60%] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b233a]/5 border border-[#0b233a]/10 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                    <span className="font-mono text-[10px] text-[#0b233a] font-bold uppercase tracking-[0.15em]">
                      CHENNAI DELIVERY &amp; TRAINING HUB
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b233a] mb-4">
                    Chennai Technical Academy Center
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    Our Chennai academy is equipped with licensed engineering software workstations, high-speed connectivity,
                    and interactive lecture rooms designed for immersive training on live project workflows.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                    <div className="flex items-start gap-2.5 text-xs font-mono text-slate-700">
                      <MapPin className="w-4 h-4 text-[#FF8A00] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai - 600026, Tamil Nadu, India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-6 text-xs font-mono text-slate-700">
                  <a href="tel:+918828612183" className="hover:text-[#FF8A00] transition-colors flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>+91 88286 12183</span>
                  </a>
                  <a href="tel:+919967112295" className="hover:text-[#FF8A00] transition-colors flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>+91 99671 12295</span>
                  </a>
                  <a href="mailto:contact@saurengineering.in" className="hover:text-[#FF8A00] transition-colors flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>contact@saurengineering.in</span>
                  </a>
                </div>
              </div>

              <div className="lg:w-[40%] min-h-[300px] relative bg-slate-900">
                <img
                  src="/media/page-training-hero.png"
                  alt="Chennai Academy Classrooms"
                  className="w-full h-full object-cover object-center brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Request Corporate Training Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/company#certificates"
                className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
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
        onSelectDiscipline={() => {}}
        onSelectWhitepaper={() => {}}
      />
    </div>
  );
}
