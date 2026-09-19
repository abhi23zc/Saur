"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import { courses } from "@/data/site";

export default function TrainingPage() {
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
        {/* ══════════════════════════════════════════════════════════════════════
           1. HERO: Diagonal Angle-Split Hero
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[480px] lg:min-h-[520px] overflow-hidden flex items-center bg-[#0b233a]">
          {/* Right Photographic Background */}
          <div className="absolute inset-0 lg:left-1/3">
            <img
              src="/media/page-training-hero.png"
              alt="Engineering Training Academy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#0b233a]/80 lg:bg-[#0b233a]/40 backdrop-blur-[1px]" />
          </div>

          {/* Left Diagonal Navy Angle-Split Polygon */}
          <div
            className="absolute inset-0 bg-[#0b233a] hidden lg:block"
            style={{
              clipPath: "polygon(0 0, 62% 0, 48% 100%, 0 100%)",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full py-16">
            <div className="max-w-2xl">
              {/* Orange Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-0.5 bg-[#FF8A00]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A00] font-bold">
                  TECHNICAL ACADEMY &amp; UPSKILLING
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                We don&apos;t just teach. <br />
                <span className="text-[#FF8A00]">We prepare you to lead.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-8 max-w-xl">
                Practical, workflow-grounded engineering courses conducted by experienced design leads.
                Equipping graduates and practicing engineers with hands-on 3D modeling and EPC delivery expertise.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <span>Enquire for Next Batch</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>

                <a
                  href="#courses"
                  className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2"
                >
                  <span>Explore Course Modules</span>
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
           3. COURSES CATALOG
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-slate-50 border-b border-slate-200" id="courses">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="max-w-2xl mb-12">
              <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                COURSE MODULES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight">
                Industry-Aligned Engineering Programs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <article
                  key={course.title}
                  className="bg-white border border-slate-200 rounded-xl p-8 hover:border-[#FF8A00]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded border border-slate-200 flex items-center justify-center text-[#0b233a] group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors">
                        <span className="material-symbols-outlined text-2xl">
                          {course.icon || "school"}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#FF8A00] font-bold tracking-wider">
                        COURSE {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#0b233a] mb-2 group-hover:text-[#FF8A00] transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setConsultationOpen(true)}
                      className="text-xs font-mono font-bold uppercase tracking-wider text-[#0b233a] hover:text-[#FF8A00] transition-colors flex items-center gap-1"
                    >
                      <span>Get Syllabus &amp; Fees</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. CHENNAI ACADEMY FACILITY (Split Card)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col lg:flex-row">
              <div className="p-8 lg:p-12 lg:w-[60%] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                    TRAINING LOCATION
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b233a] mb-4">
                    Chennai Technical Academy Center
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    Our Chennai academy is equipped with licensed engineering software workstations, high-speed connectivity,
                    and interactive lecture rooms designed for immersive training on live project workflows.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                    <div className="flex items-start gap-2 text-xs font-mono text-slate-700">
                      <span className="material-symbols-outlined text-base text-[#FF8A00] shrink-0 mt-0.5">location_on</span>
                      <span>No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai - 600026, Tamil Nadu</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-mono text-slate-700">
                  <a href="tel:+918828612183" className="hover:text-[#FF8A00] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">call</span>
                    +91 88286 12183
                  </a>
                  <a href="mailto:contact@saurengineering.in" className="hover:text-[#FF8A00] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">mail</span>
                    contact@saurengineering.in
                  </a>
                </div>
              </div>

              <div className="lg:w-[40%] min-h-[320px] relative bg-slate-100">
                <img
                  src="/media/page-training-hero.png"
                  alt="Chennai Academy Classrooms"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           5. ACTION CTA
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-[#0b233a] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
            <div className="w-8 h-1 bg-[#FF8A00] mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Equip your engineers with proven delivery skills
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base font-light leading-relaxed">
              We offer bespoke corporate training packages tailored to your engineering team&apos;s active project tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>Request Corporate Training Plan</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <Link
                href="/company#certificates"
                className="border border-white/40 hover:bg-white/10 text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>View Certifications</span>
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
    </div>
  );
}
