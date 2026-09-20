"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface Whitepaper {
  id: string;
  category: string;
  date: string;
  tag: string;
  title: string;
  summary: string;
  image: string;
  readTime: string;
  author: string;
  takeaways: string[];
}

export const whitepapersData: Whitepaper[] = [
  {
    id: "course-piping",
    category: "ENGINEERING & DESIGN",
    date: "ADMISSIONS OPEN",
    tag: "COURSE",
    title: "Piping Engineering & Design",
    summary:
      "Comprehensive training covering plant layout, piping routing, CAESAR II stress analysis, and isometric generation using PDMS, SP3D, and AutoCAD.",
    image: "/media/saur-fabrication-projects.png",
    readTime: "8 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "Mastery of Smart 3D (S3D) and AVEVA E3D",
      "Piping isometric generation and checking",
      "Support selection and CAESAR II stress analysis basics",
    ],
  },
  {
    id: "course-instrumentation",
    category: "ENGINEERING & DESIGN",
    date: "ADMISSIONS OPEN",
    tag: "COURSE",
    title: "Instrumentation Engineering & Design",
    summary:
      "Learn to design robust control networks, instrument datasheets, and loop diagrams using SmartPlant Instrumentation (SPI / INtools).",
    image: "/media/ot-security-control-room.png",
    readTime: "6 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "P&ID development and review",
      "SmartPlant Instrumentation (SPI) database setup",
      "Control system architecture (DCS/PLC/SCADA)",
    ],
  },
  {
    id: "course-process",
    category: "ENGINEERING & DESIGN",
    date: "ADMISSIONS OPEN",
    tag: "COURSE",
    title: "Process Engineering & Simulation",
    summary:
      "Develop practical skills in process simulation, equipment sizing, and heat & mass balance calculations for Oil & Gas and chemical plants.",
    image: "/images/process.png",
    readTime: "6 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "Process Flow Diagram (PFD) and P&ID creation",
      "Pump NPSH and relief valve sizing calculations",
      "Operating and control philosophy formulation",
    ],
  },
  {
    id: "course-electrical",
    category: "ENGINEERING & DESIGN",
    date: "ADMISSIONS OPEN",
    tag: "COURSE",
    title: "Electrical Engineering & Design",
    summary:
      "Master Single Line Diagrams (SLD), ETAP power studies, substation layout design, and industrial lighting calculations.",
    image: "/images/electrical.png",
    readTime: "6 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "Single Line Diagram (SLD) preparation",
      "ETAP load flow and short-circuit analysis",
      "Cable tray sizing and Dialux lighting design",
    ],
  },
  {
    id: "course-mechanical",
    category: "ENGINEERING & DESIGN",
    date: "ADMISSIONS OPEN",
    tag: "COURSE",
    title: "Mechanical Equipment Design",
    summary:
      "Design static equipment, pressure vessels, and storage tanks in compliance with ASME Section VIII and API 650 using PVElite.",
    image: "/images/mechanical.png",
    readTime: "6 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "Static equipment GA and fabrication drawings",
      "PVElite pressure vessel thickness calculations",
      "API 650 atmospheric storage tank sizing",
    ],
  },
  {
    id: "course-plant3d",
    category: "PLANT DESIGN TOOLS",
    date: "ADMISSIONS OPEN",
    tag: "TOOLS",
    title: "Plant 3D Modeling (SP3D / E3D)",
    summary:
      "Hands-on industry modeling in Intergraph Smart 3D (S3D), AVEVA E3D, PDMS, and AutoCAD Plant 3D with multi-discipline clash resolution.",
    image: "/media/page-training-hero.png",
    readTime: "4 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "Multi-discipline 3D modeling from P&IDs",
      "Clash detection & Navisworks review",
      "Automated extraction of fabrication drawings",
    ],
  },
];

interface TechnicalWhitepapersProps {
  onSelectWhitepaper: (whitepaper: Whitepaper) => void;
}

export default function TechnicalWhitepapers({
  onSelectWhitepaper,
}: TechnicalWhitepapersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPapers = whitepapersData.filter(
    (wp) =>
      wp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wp.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="whitepapers" className="py-14 sm:py-20 md:py-28 bg-[#f8fafc] border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 pb-6 border-b border-slate-200 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
              Saur Training &amp; Upskilling
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0b233a]">
              Engineering Professional Courses
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-600 mt-1">
              &ldquo;We don&apos;t just teach. We prepare you to lead.&rdquo; Practical industry training conducted at our Chennai &amp; Mumbai centers.
            </p>
          </div>

          {/* Search bar inside section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 pl-9 text-xs font-sans text-[#0b233a] focus:outline-none focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00]"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-base text-slate-400">
                search
              </span>
            </div>
            <Link
              href="/training"
              className="text-xs font-bold text-[#0b233a] hover:text-[#FF8A00] shrink-0 text-center sm:text-left py-2 sm:py-0"
            >
              All Courses →
            </Link>
          </div>
        </div>

        {/* 6 Courses Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              onClick={() => onSelectWhitepaper(paper)}
              className="group cursor-pointer bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden rounded-xl mb-4 relative bg-[#07131e]">
                  <img
                    alt={paper.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    src={paper.image}
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-0.5 font-mono text-[10px] text-[#FF8A00] font-bold rounded">
                    {paper.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] text-white rounded">
                    {paper.readTime}
                  </div>
                </div>

                <div className="font-mono text-[10px] text-[#FF8A00] mb-1 font-bold">
                  {paper.category}
                </div>
                <h3 className="font-display text-base font-bold mb-2 text-[#0b233a] group-hover:text-[#FF8A00] transition-colors leading-snug">
                  {paper.title}
                </h3>
                <p className="font-sans text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                  {paper.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-slate-400">
                  {paper.date}
                </span>
                <span className="text-[#FF8A00] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Syllabus
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
