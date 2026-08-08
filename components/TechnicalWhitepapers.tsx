"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    date: "ONGOING",
    tag: "TRAINING",
    title: "Piping Engineering & Design",
    summary:
      "Comprehensive training covering plant layout, piping routing, and material selection using industry-leading software like PDMS, SP3D, E3D & AutoCAD.",
    image:
      "https://ars.els-cdn.com/content/image/1-s2.0-S2352012425003649-gr1.jpg",
    readTime: "8 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "Mastery of 3D Modeling Software",
      "Piping isometric generation and checking",
      "Support selection and stress analysis basics",
    ],
  },
  {
    id: "course-instrumentation",
    category: "ENGINEERING & DESIGN",
    date: "ONGOING",
    tag: "TRAINING",
    title: "Instrumentation & Control Systems",
    summary:
      "Learn to design robust control networks and precise field instrumentation systems in compliance with international ISA and IEC standards.",
    image:
      "https://neometrixgroup.com/products/imgs/mwf-coolant-monitoring-skid.jpg",
    readTime: "6 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "P&ID development and review",
      "Instrument sizing and selection",
      "Control system architecture (DCS/PLC/SCADA)",
    ],
  },
  {
    id: "course-process",
    category: "ENGINEERING & DESIGN",
    date: "ONGOING",
    tag: "TRAINING",
    title: "Process Engineering & Simulation",
    summary:
      "Develop skills in process simulation, equipment sizing, and heat & mass balance calculations for Oil & Gas and Petrochemical plants.",
    image:
      "https://t3.ftcdn.net/jpg/19/42/33/00/360_F_1942330057_D050Umlm30cCrZ63tnbiqNjyMFPY2oGo.jpg",
    readTime: "6 Weeks",
    author: "Saur Training Division",
    takeaways: [
      "Process flow diagram (PFD) creation",
      "Relief and flare system design",
      "Process optimization using simulation tools",
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
    <section id="whitepapers" className="py-24 md:py-32 bg-[#f9f9f7]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#c3c5d9]/30 pb-6 gap-6"
        >
          <div>
            <span className="font-mono text-[10px] text-[#FF8A00] uppercase tracking-[0.2em] mb-3 block font-bold">
              Training &amp; Upskilling
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-[#1a1c1b] uppercase">
              Professional Courses
            </h2>
          </div>

          {/* Search bar inside section */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full bg-white border border-[#c3c5d9]/40 rounded-xl px-4 py-2.5 pl-10 text-xs font-sans text-[#1a1c1b] focus:outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/15 transition-shadow"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-lg text-[#737687]">
                search
              </span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredPapers.map((paper, idx) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectWhitepaper(paper)}
              className="group cursor-pointer bg-white rounded-2xl p-4 border border-[#c3c5d9]/30 shadow-sm hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden rounded-xl mb-6 relative bg-[#0a0f18]">
                  <img
                    alt={paper.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    src={paper.image}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 font-mono text-[10px] text-[#1a1c1b] font-bold rounded">
                    {paper.tag}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] text-white rounded">
                    {paper.readTime}
                  </div>
                </div>

                <div className="font-mono text-xs text-[#565f70] mb-2 font-semibold">
                  {paper.category} {"//"} {paper.date}
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-[#1a1c1b] group-hover:text-[#FF8A00] transition-colors leading-snug">
                  {paper.title}
                </h3>
                <p className="font-sans text-xs text-[#424656] mb-4 line-clamp-3 leading-relaxed">
                  {paper.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#eeeeec] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#737687]">
                  {paper.author.split(",")[0]}
                </span>
                <div className="inline-flex items-center text-[#FF8A00] font-sans text-xs font-bold group-hover:translate-x-1 transition-transform">
                  View Syllabus
                  <span className="material-symbols-outlined text-sm ml-1">
                    download
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
