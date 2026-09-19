"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCase {
  id: string;
  title: string;
  client: string;
  endUser: string;
  location: string;
  manHours: string;
  deliverables: string;
  year: string;
  category: string;
  summary: string;
  highlights: string[];
  image: string;
}

const realProjects: ProjectCase[] = [
  {
    id: "adnoc-ruwais",
    title: "Train-3 Reflux Pumps Lifting System",
    client: "Avenir",
    endUser: "ADNOC",
    location: "Ruwais, UAE",
    manHours: "1,200+ Hours",
    deliverables: "12 Deliverables",
    year: "2026",
    category: "Structural & Piping",
    summary:
      "Detailed engineering for lifting arrangements of Train-3 Reflux Pumps & Motors at ADNOC Ruwais, covering structural, piping, and electrical deliverables for safe maintenance.",
    highlights: [
      "Rigging & Handling Study",
      "Structural Calculations & Drawings",
      "Piping Stress Analysis & GADs",
      "Electrical & Instrumentation Drawings",
    ],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkhErjNQUcUeDVSPQNKKfFvm-nrxzUy1Lan7GwyCy7yIBYvA16Scgtfc&s=10",
  },
  {
    id: "jindal-gas-heater",
    title: "Process Gas Heater 3D Modeling & E&I",
    client: "Novargi Engineering",
    endUser: "Jindal Steel & Power",
    location: "India",
    manHours: "600+ Hours",
    deliverables: "44+ Deliverables",
    year: "2026",
    category: "Electrical & 3D Model",
    summary:
      "Electrical 3D modeling, equipment layout development, cable tray routing, lighting simulation, vendor document reviews, and 2D drawing extractions.",
    highlights: [
      "Electrical 3D Model & Layouts",
      "Cable Tray Sizing & Routing",
      "Lighting Calculation Report",
      "BOQ & MTO Support",
    ],
    image:
      "https://t3.ftcdn.net/jpg/19/42/33/00/360_F_1942330057_D050Umlm30cCrZ63tnbiqNjyMFPY2oGo.jpg",
  },
  {
    id: "adnoc-aip5",
    title: "AiP5 Onshore 132 Wellhead Instrumentation",
    client: "Petrocon Engineers",
    endUser: "ADNOC",
    location: "Bab & Buhasa, UAE",
    manHours: "7,000 Hours",
    deliverables: "269 Deliverables",
    year: "2024",
    category: "Instrumentation & SPI",
    summary:
      "Instrumentation detail engineering for 132 onshore well pads including ESP, GLW, WIW, WAG, OPW, and PWDW wells with full 3D modeling and cable schedules.",
    highlights: [
      "3D Instrumentation Modeling",
      "Cable & JB Schedules",
      "Hydraulic Tubing Schedules",
      "Interconnection & Hook-Up Drawings",
    ],
    image:
      "https://neometrixgroup.com/products/imgs/mwf-coolant-monitoring-skid.jpg",
  },
  {
    id: "emarat-pipeline",
    title: "6km Natural Gas Pipeline EPC",
    client: "Tekzone",
    endUser: "EMARAT",
    location: "UAE",
    manHours: "12,500 Hours",
    deliverables: "Full EPC DED",
    year: "2024-2026",
    category: "Pipeline Engineering",
    summary:
      "Complete engineering design from concept to commissioning for a 6km cross-country natural gas pipeline, including alignment sheets and crossing details.",
    highlights: [
      "Concept to Commissioning Engineering",
      "Route Alignment & Crossing Drawings",
      "Pipeline Stress & Wall Thickness",
      "Material Take-Off & BOM",
    ],
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function MajorProjects() {
  const [activeProject, setActiveProject] = useState<ProjectCase>(realProjects[0]);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#0b233a] text-white relative overflow-hidden">
      <div className="absolute inset-0 micro-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
              Proven Project Execution
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Major Projects Executed
            </h2>
            <p className="font-sans text-sm md:text-base text-slate-300 mt-2 leading-relaxed">
              Delivering multi-discipline engineering, 3D modeling, and field support for premier operators worldwide.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF8A00] hover:text-[#ffaa44] transition-colors"
          >
            <span>View All Projects in Registry</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* 4 Compact Cards Grid with Hover Slide-Up Drawer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {realProjects.map((p) => (
            <div
              key={p.id}
              className="group relative h-[360px] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-[#07131e] border border-white/10 hover:border-[#FF8A00]/50 transition-all duration-300"
            >
              {/* Image */}
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07131e] via-[#07131e]/70 to-transparent" />

              {/* Top Tags */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[#FF8A00] text-[10px] font-mono font-bold uppercase border border-white/10">
                  {p.endUser}
                </span>
                <span className="text-slate-300 text-[10px] font-mono font-medium">
                  {p.year}
                </span>
              </div>

              {/* Bottom Info Drawer */}
              <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end">
                <div className="text-[10px] font-mono text-[#FF8A00] uppercase font-bold mb-1">
                  {p.category}
                </div>
                <h3 className="font-display text-base font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-[#FF8A00] transition-colors">
                  {p.title}
                </h3>

                {/* Rest View: Man Hours & Deliverables */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300 mb-1 group-hover:hidden">
                  <span className="px-2 py-0.5 rounded bg-white/10">{p.manHours}</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">{p.deliverables}</span>
                </div>

                {/* Hover Drawer Extended View */}
                <div className="hidden group-hover:block transition-all duration-300 space-y-2 pt-1">
                  <p className="font-sans text-xs text-slate-200 leading-relaxed line-clamp-3">
                    {p.summary}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#FF8A00]">
                    <span>{p.deliverables} · {p.manHours}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
