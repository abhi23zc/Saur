"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface HubLocation {
  id: string;
  name: string;
  type: "HQ" | "Training & Delivery" | "Project Execution" | "Global Standards";
  coords: { x: number; y: number }; // Percentage relative position on the map
  city: string;
  country: string;
  gps: string;
  address: string;
  specialization: string;
  contact: string;
  image: string;
}

const hubs: HubLocation[] = [
  {
    id: "hq-mumbai",
    name: "Corporate Headquarters",
    type: "HQ",
    coords: { x: 68.2, y: 45.0 },
    city: "Navi Mumbai",
    country: "India",
    gps: "19.0760° N, 72.8777° E",
    address: "507, 5th Floor, Real Tech Park, Sector 30A, Vashi, Navi Mumbai - 400703",
    specialization: "FEED, Detailed Engineering & Global Project Management",
    contact: "+91 99671 12295 · contact@saurengineering.in",
    image: "/media/expertise-design-office.png",
  },
  {
    id: "hub-chennai",
    name: "Design & Training Academy",
    type: "Training & Delivery",
    coords: { x: 71.5, y: 53.5 },
    city: "Chennai",
    country: "India",
    gps: "13.0827° N, 80.2707° E",
    address: "No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai - 600026",
    specialization: "3D Plant Modeling, Technical Upskilling & Workforce Solutions",
    contact: "+91 88286 12183 · Training Hub",
    image: "/media/page-training-hero.png",
  },
  {
    id: "me-projects",
    name: "Middle East Delivery",
    type: "Project Execution",
    coords: { x: 59.5, y: 41.0 },
    city: "Abu Dhabi & Ruwais",
    country: "UAE & Saudi Arabia",
    gps: "24.4539° N, 54.3773° E",
    address: "ADNOC Ruwais, Bab & Buhasa, Das Island & Saudi Aramco CRPO",
    specialization: "Major EPC, Lifting Studies, Wellhead Instrumentation",
    contact: "Middle East Project Operations",
    image: "/media/saur-fabrication-projects.png",
  },
  {
    id: "sea-projects",
    name: "SE Asia Operations",
    type: "Project Execution",
    coords: { x: 80.5, y: 58.0 },
    city: "Jakarta & Tuban",
    country: "Indonesia (Pertamina)",
    gps: "0.7893° S, 113.9213° E",
    address: "Tanjung Miring Gas Station, Menggala & Lumut Balai II Geothermal",
    specialization: "Mechanical DED, Piping Stress & Pipeline DED",
    contact: "Pertamina & SE Asia Delivery",
    image: "/images/process.png",
  },
  {
    id: "europe-alliances",
    name: "European EPC Partners",
    type: "Project Execution",
    coords: { x: 48.5, y: 26.5 },
    city: "London & Madrid",
    country: "Europe / UK",
    gps: "51.5074° N, 0.1278° W",
    address: "Novargi Engineering & Avenir International Partner Collaboration",
    specialization: "Process Skid Engineering & Global EPC Alignment",
    contact: "contact@saurengineering.in",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "global-standards",
    name: "International Codes & QA",
    type: "Global Standards",
    coords: { x: 23.5, y: 34.0 },
    city: "Houston",
    country: "United States",
    gps: "29.7604° N, 95.3698° W",
    address: "ASME B31.3/B31.8, API 650, AISC 360 & ISO 9001 Regulatory Benchmarks",
    specialization: "International Compliance & ASME / API Standard Verification",
    contact: "Quality Assurance Hub",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
  },
];

// Connection routes between global hubs
const routes = [
  ["hq-mumbai", "hub-chennai"],
  ["hq-mumbai", "me-projects"],
  ["hq-mumbai", "sea-projects"],
  ["hq-mumbai", "europe-alliances"],
  ["europe-alliances", "global-standards"],
];

function hubById(id: string) {
  return hubs.find((h) => h.id === id)!;
}

function arcPath(a: HubLocation, b: HubLocation) {
  const mx = (a.coords.x + b.coords.x) / 2;
  const my = (a.coords.y + b.coords.y) / 2;
  const lift = 4 + Math.abs(a.coords.x - b.coords.x) * 0.14;
  return `M ${a.coords.x} ${a.coords.y} Q ${mx} ${my - lift} ${b.coords.x} ${b.coords.y}`;
}

export default function GlobalFootprintMap() {
  const [selectedHub, setSelectedHub] = useState<HubLocation | null>(null);

  return (
    <section
      id="global-footprint"
      className="py-16 md:py-24 bg-white border-t border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
              <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
                FIG. 08 — GLOBAL NETWORK &amp; HUBS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0b233a] leading-tight">
              Global Operations &amp; Office Locations
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed font-light">
              Operating from registered headquarters in Navi Mumbai and our training center in Chennai, delivering multidisciplinary engineering across the Middle East, Europe, and SE Asia.
            </p>
          </div>

          {/* Legend Badges */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A00]" />
              <span>HQ &amp; Training Hubs</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0b233a]" />
              <span>Project Execution</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
           Clean Dot-Matrix World Map Container (Pure Reference Aesthetic)
           ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[2.2/1] rounded-3xl  overflow-hidden ">

          {/* Subtle Technical Dot Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: "radial-gradient(#94a3b8 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Clean Light Gray World Map Silhouette Graphic */}
          <img
            src="/images/world-map-light.png"
            alt="Global Footprint World Map"
            className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none opacity-85 select-none"
          />

          {/* Interactive Circular Photo Avatar Hub Bubbles (Clean, White-Bordered, No Yellow Rings) */}
          {hubs.map((hub) => {
            const isSelected = selectedHub?.id === hub.id;

            return (
              <div
                key={hub.id}
                style={{
                  left: `${hub.coords.x}%`,
                  top: `${hub.coords.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={cn(
                  "absolute group cursor-pointer transition-transform duration-300",
                  isSelected ? "z-30 scale-115" : "z-20 hover:scale-110 hover:z-30"
                )}
                onClick={() => setSelectedHub(isSelected ? null : hub)}
              >
                {/* Circular Photo Bubble with Pure White Border & Drop Shadow */}
                <div
                  className={cn(
                    "relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-[3px] border-white shadow-[0_12px_28px_-6px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-200",
                    isSelected && "ring-2 ring-slate-400 shadow-2xl"
                  )}
                >
                  <img
                    src={hub.image}
                    alt={hub.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
           Synchronized Hub Information Cards Below
           ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {hubs.slice(0, 6).map((hub) => {
            const isHQ = hub.type === "HQ";
            const isSelected = selectedHub?.id === hub.id;

            return (
              <div
                key={hub.id}
                onClick={() => setSelectedHub(isSelected ? null : hub)}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group",
                  isSelected
                    ? "bg-[#0b233a] border-[#FF8A00] text-white shadow-xl ring-2 ring-[#FF8A00]/30 scale-[1.01]"
                    : "bg-slate-50 border-slate-200 hover:border-[#FF8A00]/50 hover:bg-white shadow-2xs"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded",
                        isHQ
                          ? "bg-[#FF8A00]/20 text-[#FF8A00]"
                          : isSelected
                            ? "bg-white/15 text-white"
                            : "bg-slate-200 text-slate-700"
                      )}
                    >
                      {hub.type}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[9px]",
                        isSelected ? "text-slate-300" : "text-slate-400"
                      )}
                    >
                      {hub.gps.split(",")[0]}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "font-display text-base font-bold mb-1 transition-colors",
                      isSelected ? "text-white" : "text-[#0b233a] group-hover:text-[#FF8A00]"
                    )}
                  >
                    {hub.name}
                  </h3>

                  <p
                    className={cn(
                      "font-sans text-xs mb-3 leading-relaxed font-light",
                      isSelected ? "text-slate-200" : "text-slate-600"
                    )}
                  >
                    {hub.address}
                  </p>
                </div>

                <div
                  className={cn(
                    "pt-2.5 border-t text-[11px] font-mono",
                    isSelected ? "border-white/15 text-[#FF8A00]" : "border-slate-200 text-slate-500"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#FF8A00]">
                      location_on
                    </span>
                    <span className="truncate">{hub.specialization}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}




