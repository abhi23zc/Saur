"use client";

import { motion } from "framer-motion";

export default function StrategicPartnerships() {
  const tools = [
    "Smart 3D (S3D)",
    "AVEVA E3D / PDMS",
    "Smart Instrumentation (SPI)",
    "Smart Electrical (SEL)",
    "SmartPID",
    "CAESAR II",
    "PVElite",
    "STAAD.Pro",
    "ETAP",
    "AutoCAD Plant 3D",
    "Tekla Structures",
    "InstruCalc",
    "Dialux",
    "Bentley OpenPlant",
    "Revit & BIM",
    "MicroStation",
    "Cyclone / LFM",
  ];

  return (
    <section className="py-10 md:py-14 bg-white border-b border-slate-200 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/20 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
              Industry Standard Platforms
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#0b233a] tracking-tight">
              Specialized Engineering Software
            </h3>
            <p className="font-sans text-xs md:text-sm text-slate-500 mt-1">
              Executing multi-discipline projects with advanced industry tools and licensed platforms.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-600">
            <div className="border-l-2 border-[#FF8A00] pl-3">
              <span className="text-slate-400 block text-[10px] uppercase">3D Plant</span>
              <span className="font-bold text-slate-800">S3D / AVEVA E3D</span>
            </div>
            <div className="border-l-2 border-[#FF8A00] pl-3">
              <span className="text-slate-400 block text-[10px] uppercase">E&I Design</span>
              <span className="font-bold text-slate-800">SPI / SEL / ETAP</span>
            </div>
            <div className="border-l-2 border-[#FF8A00] pl-3">
              <span className="text-slate-400 block text-[10px] uppercase">Stress & Analysis</span>
              <span className="font-bold text-slate-800">CAESAR II / STAAD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="relative w-full flex overflow-x-hidden py-6 bg-slate-50 border-y border-slate-200">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center whitespace-nowrap gap-12 md:gap-16 px-6">
          {tools.concat(tools).map((tool, index) => (
            <div
              key={index}
              className="flex items-center gap-3 font-display text-base md:text-lg font-bold text-slate-400 hover:text-[#FF8A00] transition-colors duration-200 cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF8A00]" />
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
