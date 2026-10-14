"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const industries = [
  { title: "Oil & Gas (Onshore & Offshore)", desc: "Reliable production and pipeline systems for demanding onshore and offshore operations.", icon: "oil_barrel" },
  { title: "Petrochemical & Refining", desc: "Safe, efficient process upgrades for complex refining and chemical facilities.", icon: "factory" },
  { title: "EPC Projects & Heavy Infrastructure", desc: "Coordinated engineering that keeps large-scale projects buildable and on schedule.", icon: "construction" },
  { title: "Energy, Power & Geothermal", desc: "Resilient systems built for dependable power and geothermal generation.", icon: "bolt" },
  { title: "Industrial Plants & Manufacturing", desc: "Practical plant and structural solutions for safer, more efficient operations.", icon: "precision_manufacturing" },
];

export default function SectorInsights() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frameId: number | null = null;

    const updateActiveCard = () => {
      frameId = null;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // As the user scrolls down, advance active card through the 5 industries
      const enterPoint = viewportHeight * 0.65;
      const exitPoint = viewportHeight * 0.15 - rect.height;
      const scrollDistance = enterPoint - exitPoint;
      const scrolled = enterPoint - rect.top;

      if (scrollDistance <= 0) return;

      const progress = Math.max(0, Math.min(0.999, scrolled / scrollDistance));
      const targetIndex = Math.floor(progress * industries.length);

      setActiveIdx((currentIndex) =>
        currentIndex === targetIndex ? currentIndex : targetIndex,
      );
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveCard);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveCard();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const selectCard = (index: number) => {
    setActiveIdx(index);
  };

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-white py-12 text-slate-800 sm:py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 micro-grid opacity-25" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 md:px-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 sm:w-10 h-1 bg-[#FF8A00] rounded-full shrink-0" />
                <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.18em] font-extrabold text-[#FF8A00]">
                  INDUSTRIES &amp; SECTORS SERVED
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-[#0b233a] sm:text-3xl md:text-4xl">
                Powering Critical Global Infrastructure
              </h2>
            </div>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-slate-600">
              We combine deep technical expertise and international standards (ASME, API, IEC, ISO) to deliver cost-effective engineering solutions for operators and EPC contractors.
            </p>
            <div className="flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/projects"
                className="group inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#FF8A00] px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#E67C00] hover:shadow-md sm:w-auto"
              >
                <span>Explore track record</span>
                <span className="material-symbols-outlined text-xs transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#0b233a] hover:bg-[#143c61] px-5 py-2.5 text-center font-sans text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:shadow sm:w-auto"
              >
                Our services
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="space-y-5">
              {industries.map((industry, index) => {
                const isActive = activeIdx === index;

                return (
                  <button
                    key={industry.title}
                    type="button"
                    onClick={() => selectCard(index)}
                    aria-pressed={isActive}
                    className={`relative flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-all duration-300 ease-out sm:gap-4 sm:p-3.5 ${
                      isActive
                        ? "z-10 -translate-x-1 sm:-translate-x-2 border-[#FF8A00] bg-white shadow-lg shadow-orange-500/10 ring-1 ring-[#FF8A00]/25"
                        : "border-slate-200 bg-slate-50/70 opacity-60"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 sm:h-10 sm:w-10 ${
                        isActive
                          ? "border-[#FF8A00] bg-orange-50 text-[#FF8A00]"
                          : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg sm:text-xl">
                        {industry.icon}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors duration-300 ${
                            isActive
                              ? "bg-[#FF8A00]/15 text-[#FF8A00]"
                              : "bg-slate-200/70 text-slate-500"
                          }`}
                        >
                          0{index + 1}
                        </span>
                        <h3
                          className={`font-display text-sm font-bold transition-colors duration-300 sm:text-base ${
                            isActive ? "text-[#0b233a]" : "text-slate-700"
                          }`}
                        >
                          {industry.title}
                        </h3>
                      </div>
                      <p className="font-sans text-xs font-light leading-snug text-slate-600">
                        {industry.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
