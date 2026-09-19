"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustCredentialsStrip from "@/components/TrustCredentialsStrip";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";
import { services } from "@/data/site";

const servicePhotos: Record<string, string> = {
  "01": "/media/saur-refinery-complex.png",
  "02": "/media/saur-workforce-engineers.png",
  "03": "/media/saur-engineering-coordination.png",
  "04": "/media/page-training-hero.png",
};

const serviceIcons: Record<string, string> = {
  "01": "architecture",
  "02": "engineering",
  "03": "psychology",
  "04": "school",
};

export default function ServicesPage() {
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
              src="/media/page-services-hero.png"
              alt="Industrial Engineering Services"
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
                  SERVICES &amp; EXECUTION
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Engineering services <br />
                <span className="text-[#FF8A00]">built for critical industry.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-8 max-w-xl">
                From conceptual FEED and multidisciplinary detailed engineering to high-caliber workforce deputation
                and professional engineering academy programs.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <span>Request Service Proposal</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>

                <a
                  href="#offerings"
                  className="border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2"
                >
                  <span>Explore Offerings</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           2. TRUST CREDENTIALS STRIP (ISO 9001, 14001, 45001, DPIIT)
           ══════════════════════════════════════════════════════════════════════ */}
        <TrustCredentialsStrip />

        {/* ══════════════════════════════════════════════════════════════════════
           3. CORE OFFERINGS: Signature Split Cards (62% Info / 38% Photo)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-slate-50 border-b border-slate-200" id="offerings">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="max-w-2xl mb-14">
              <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                OUR FOUR SERVICE PILLARS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight">
                Technical depth across the project lifecycle
              </h2>
            </div>

            {/* Split Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.number}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-[#FF8A00]/50 hover:shadow-md transition-all flex flex-col sm:flex-row group"
                >
                  {/* Left Side: 62% Content */}
                  <div className="p-8 sm:w-[62%] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded border border-slate-200 flex items-center justify-center text-[#0b233a] group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors">
                          <span className="material-symbols-outlined text-2xl">
                            {serviceIcons[service.number] || "settings"}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#FF8A00] font-bold tracking-wider">
                          SERVICE {service.number}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-[#0b233a] mb-2 group-hover:text-[#FF8A00] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {service.text}
                      </p>

                      {/* Deliverables Bullet List */}
                      {service.details && (
                        <div className="space-y-2 border-t border-slate-100 pt-4 mb-4">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                            Key Deliverables:
                          </span>
                          {service.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                              <span className="material-symbols-outlined text-sm text-[#FF8A00] shrink-0 mt-0.5">
                                check
                              </span>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0b233a] group-hover:text-[#FF8A00] transition-colors"
                      >
                        <span>Learn More</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Side: 38% Photography */}
                  <div className="sm:w-[38%] h-52 sm:h-auto relative bg-slate-100 overflow-hidden">
                    <img
                      src={servicePhotos[service.number] || "/media/saur-refinery-complex.png"}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
           4. DELIVERY METHODOLOGY: 4 Classical Quality Gates
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="max-w-2xl mb-12">
              <div className="w-8 h-1 bg-[#FF8A00] mb-3" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                QUALITY ASSURANCE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b233a] tracking-tight">
                Our ISO 9001:2015 Engineering Quality Process
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Basis of Design",
                  desc: "Clear alignment on project design criteria, client specifications, codes & international standards.",
                  icon: "description",
                },
                {
                  step: "02",
                  title: "Multidisciplinary Modeling",
                  desc: "Integrated 3D design in SP3D, E3D, PDMS, and AutoCAD with real-time clash resolution.",
                  icon: "view_in_ar",
                },
                {
                  step: "03",
                  title: "Checker & Approver Gate",
                  desc: "Two-tier peer review and Senior SME approval on all calculations, layouts, and MTO submittals.",
                  icon: "verified_user",
                },
                {
                  step: "04",
                  title: "Issued For Construction",
                  desc: "Final package delivery with complete documentation, revision audit trail, and field support.",
                  icon: "task_alt",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white border border-slate-200 rounded-xl p-7 hover:border-[#FF8A00]/50 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#FF8A00]">{item.step}</span>
                      <span className="material-symbols-outlined text-2xl text-slate-400">{item.icon}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0b233a] mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
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
              Need multidisciplinary engineering support?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base font-light leading-relaxed">
              Connect with our Navi Mumbai and Chennai delivery leads to review project scopes, timelines, and resourcing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-8 py-3.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>Request Consultation</span>
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
