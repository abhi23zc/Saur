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
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    let frameId: number | null = null;

    const updateActiveCard = () => {
      frameId = null;
      const focusLine = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const { top, height } = card.getBoundingClientRect();
        const distance = Math.abs(top + height / 2 - focusLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIdx((currentIndex) =>
        currentIndex === closestIndex ? currentIndex : closestIndex,
      );
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveCard);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const previewCard = (index: number) => {
    setActiveIdx((currentIndex) =>
      currentIndex === index ? currentIndex : index,
    );
  };

  return (
    <section id="insights" className="relative overflow-hidden border-t border-slate-200 bg-white py-12 text-slate-800 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 micro-grid opacity-25" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 md:px-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5">
            <div>
              <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#FF8A00]/20 bg-[#FF8A00]/10 px-2.5 py-0.5"><span className="h-1.5 w-1.5 rounded-full bg-[#FF8A00]" /><span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8A00]">Industries &amp; sector matrix</span></div>
              <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-[#0b233a] sm:text-3xl md:text-4xl">Powering Critical Global Infrastructure</h2>
            </div>
            <p className="font-sans text-xs font-light leading-relaxed text-slate-600 sm:text-sm">We combine deep technical expertise and international standards (ASME, API, IEC, ISO) to deliver cost-effective engineering solutions for operators and EPC contractors.</p>
            <div className="flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center">
              <Link href="/projects" className="group inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#FF8A00] px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#E67C00] hover:shadow-md sm:w-auto"><span>Explore track record</span><span className="material-symbols-outlined text-xs transition-transform group-hover:translate-x-1">arrow_forward</span></Link>
              <Link href="/services" className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center font-sans text-xs font-bold uppercase tracking-wider text-[#0b233a] shadow-2xs transition-colors hover:bg-slate-50 sm:w-auto">Our services</Link>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="space-y-5">
              {industries.map((industry, index) => {
                const isActive = activeIdx === index;

                return (
                  <button
                    key={industry.title}
                    ref={(card) => {
                      cardRefs.current[index] = card;
                    }}
                    type="button"
                    onMouseEnter={() => previewCard(index)}
                    onFocus={() => previewCard(index)}
                    onClick={() => previewCard(index)}
                    aria-pressed={isActive}
                    className={`relative flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none sm:gap-4 sm:p-3.5 ${isActive ? "z-10 -translate-x-1 border-[#FF8A00] bg-white shadow-xl shadow-orange-500/10 sm:-translate-x-2" : "border-slate-200 bg-slate-50/90 opacity-85"}`}
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 motion-reduce:transition-none sm:h-10 sm:w-10 ${isActive ? "border-[#FF8A00] bg-orange-50 text-[#FF8A00]" : "border-slate-200 bg-white text-slate-500"}`}>
                      <span className="material-symbols-outlined text-lg sm:text-xl">{industry.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors duration-200 motion-reduce:transition-none ${isActive ? "bg-[#FF8A00]/15 text-[#FF8A00]" : "bg-slate-200/70 text-slate-500"}`}>0{index + 1}</span>
                        <h3 className={`font-display text-sm font-bold transition-colors duration-200 motion-reduce:transition-none sm:text-base ${isActive ? "text-[#0b233a]" : "text-slate-700"}`}>{industry.title}</h3>
                      </div>
                      <p className="font-sans text-xs font-light leading-snug text-slate-600">{industry.desc}</p>
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
