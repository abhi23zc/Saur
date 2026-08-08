"use client";

import { motion } from "framer-motion";

export default function StrategicPartnerships() {
  const tools = [
    "AUTOCAD",
    "REVIT",
    "TEKLA",
    "STAAD PRO",
    "PDMS",
    "SP3D / E3D",
    "ETAP",
    "INSTRUCALC",
    "MICROSTATION",
    "DIALUX",
    "CHAMLITE",
    "CYCLONE",
    "LFM",
  ];

  return (
    <section className="py-20 bg-[#f4f4f2] border-b border-[#c3c5d9]/30 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[9px] text-[#0049cc] uppercase tracking-[0.2em] font-bold block mb-2">
              Engineering Tech Stack
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-[#1a1c1b] tracking-tighter uppercase">
              Specialized Software
            </h3>
          </div>
          <div className="font-mono text-[10px] text-[#565f70] flex flex-wrap gap-8 border-l-2 border-[#0049cc] pl-6 py-2 uppercase tracking-widest">
            <div>
              <span className="text-[#424656] block mb-1">Expertise</span>
              <span className="text-[#1a1c1b] font-bold text-sm">2D / 3D Design</span>
            </div>
            <div>
              <span className="text-[#424656] block mb-1">Modeling</span>
              <span className="text-[#1a1c1b] font-bold text-sm">BIM / Plant Design</span>
            </div>
            <div>
              <span className="text-[#424656] block mb-1">Analysis</span>
              <span className="text-[#1FA67A] font-bold text-sm">Structural / E&I</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="relative w-full flex overflow-x-hidden py-10 bg-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] border-y border-[#c3c5d9]/20">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee flex items-center whitespace-nowrap gap-16 md:gap-24 px-12">
          {tools.concat(tools).map((tool, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 font-display text-2xl md:text-3xl font-bold text-[#c3c5d9] hover:text-[#0049cc] transition-all duration-300 cursor-pointer uppercase tracking-tighter"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3c5d9] group-hover:bg-[#0b5fff] transition-colors duration-300 shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_10px_#0b5fff]" />
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
