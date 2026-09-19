"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HubLocation {
  id: string;
  name: string;
  type: "HQ" | "Training & Delivery" | "Project Execution";
  coords: { x: number; y: number }; // Percentage relative position
  city: string;
  address: string;
  specialization: string;
  contact: string;
}

const hubs: HubLocation[] = [
  {
    id: "hq-mumbai",
    name: "Corporate Headquarters",
    type: "HQ",
    coords: { x: 70, y: 44 },
    city: "Navi Mumbai, India",
    address: "507, 5th Floor, Real Tech Park, Sector 30A, Vashi, Navi Mumbai - 400703",
    specialization: "FEED, Detailed Engineering & Project Management",
    contact: "+91 99671 12295 / contact@saurengineering.in",
  },
  {
    id: "hub-chennai",
    name: "Design & Training Hub",
    type: "Training & Delivery",
    coords: { x: 72, y: 52 },
    city: "Chennai, India",
    address: "No. 31, Kumaran Colony, 2nd Street, Vadapalani, Chennai - 600026",
    specialization: "3D Plant Modeling, Academy & Workforce Deputation",
    contact: "+91 88286 12183",
  },
  {
    id: "me-projects",
    name: "Middle East Delivery",
    type: "Project Execution",
    coords: { x: 62, y: 45 },
    city: "UAE & Saudi Arabia",
    address: "ADNOC Ruwais, Bab & Buhasa, Das Island & Saudi Aramco CRPO",
    specialization: "Major EPC, Lifting Studies, Wellhead Instrumentation",
    contact: "saurengineering.in",
  },
  {
    id: "sea-projects",
    name: "SE Asia Operations",
    type: "Project Execution",
    coords: { x: 80, y: 58 },
    city: "Indonesia (Pertamina)",
    address: "Tanjung Miring Gas Station, Menggala & Lumut Balai II Geothermal",
    specialization: "Mechanical DED, Piping Stress & Pipeline DED",
    contact: "saurengineering.in",
  },
];

// Connection arcs between hubs
const routes = [
  ["hq-mumbai", "hub-chennai"],
  ["hq-mumbai", "me-projects"],
  ["hq-mumbai", "sea-projects"],
];

function hubById(id: string) {
  return hubs.find((h) => h.id === id)!;
}

function arcPath(a: HubLocation, b: HubLocation) {
  const mx = (a.coords.x + b.coords.x) / 2;
  const my = (a.coords.y + b.coords.y) / 2;
  const lift = 8 + Math.abs(a.coords.x - b.coords.x) * 0.12;
  return `M ${a.coords.x} ${a.coords.y} Q ${mx} ${my - lift} ${b.coords.x} ${b.coords.y}`;
}

export default function GlobalFootprintMap() {
  const [selectedHub, setSelectedHub] = useState<HubLocation | null>(null);

  return (
    <section
      id="global-footprint"
      className="py-20 md:py-28 bg-[#ffffff] border-t border-slate-200"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
            Delivery Centers &amp; Project Footprint
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#0b233a]">
            Global Operations &amp; Office Locations
          </h2>
          <p className="font-sans text-xs md:text-sm text-slate-600 mt-1">
            Operating from registered headquarters in Navi Mumbai and our training center in Chennai, delivering engineering solutions across the Middle East and SE Asia.
          </p>
        </div>

        {/* Map Box */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[2.2/1] rounded-2xl border border-slate-300 overflow-hidden bg-[#07131e] shadow-xl">
          <div className="absolute inset-0 micro-grid opacity-20 pointer-events-none" />

          {/* SVG Map Lines & Arcs */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Parallels & Meridians */}
            {[25, 45, 65, 85].map((y) => (
              <line
                key={`p-${y}`}
                x1="4"
                x2="96"
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.2"
              />
            ))}
            {[20, 40, 60, 80].map((x) => (
              <line
                key={`m-${x}`}
                x1={x}
                x2={x}
                y1="10"
                y2="90"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.2"
              />
            ))}

            {/* Routes */}
            {routes.map(([fromId, toId]) => {
              const a = hubById(fromId);
              const b = hubById(toId);
              return (
                <path
                  key={`${fromId}-${toId}`}
                  d={arcPath(a, b)}
                  fill="none"
                  stroke="#FF8A00"
                  strokeWidth="0.6"
                  strokeDasharray="2 1.5"
                  opacity="0.75"
                />
              );
            })}
          </svg>

          {/* Interactive Hub Markers */}
          {hubs.map((hub) => {
            const isHQ = hub.type === "HQ";
            const isSelected = selectedHub?.id === hub.id;

            return (
              <div
                key={hub.id}
                style={{
                  left: `${hub.coords.x}%`,
                  top: `${hub.coords.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20 group"
              >
                <button
                  onClick={() => setSelectedHub(isSelected ? null : hub)}
                  className="relative flex items-center justify-center p-2 focus:outline-none"
                  aria-label={`Select ${hub.name}`}
                >
                  <span className="absolute w-6 h-6 rounded-full bg-[#FF8A00]/30 animate-ping" />
                  <span
                    className={cn(
                      "relative w-3.5 h-3.5 rounded-full border-2 border-white transition-transform duration-200",
                      isHQ ? "bg-[#FF8A00]" : "bg-[#FF9A20]",
                      isSelected && "scale-150 ring-4 ring-[#FF8A00]/50"
                    )}
                  />
                </button>

                {/* City Tag */}
                <div
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap font-bold shadow-md transition-all",
                    isSelected
                      ? "bg-[#FF8A00] text-white"
                      : "bg-black/75 text-slate-200 border border-white/10"
                  )}
                >
                  {hub.city}
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive Hub Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {hubs.map((hub) => {
            const isHQ = hub.type === "HQ";
            const isSelected = selectedHub?.id === hub.id;

            return (
              <div
                key={hub.id}
                onClick={() => setSelectedHub(isSelected ? null : hub)}
                className={cn(
                  "p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between",
                  isSelected
                    ? "bg-[#0b233a] border-[#FF8A00] text-white shadow-lg"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded",
                        isHQ ? "bg-[#FF8A00]/20 text-[#FF8A00]" : "bg-slate-200 text-slate-700"
                      )}
                    >
                      {hub.type}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "font-display text-base font-bold mb-1",
                      isSelected ? "text-white" : "text-[#0b233a]"
                    )}
                  >
                    {hub.name}
                  </h3>
                  <p
                    className={cn(
                      "font-sans text-xs mb-3 leading-relaxed",
                      isSelected ? "text-slate-300" : "text-slate-600"
                    )}
                  >
                    {hub.address}
                  </p>
                </div>

                <div
                  className={cn(
                    "pt-3 border-t text-[11px] font-mono",
                    isSelected ? "border-white/15 text-[#FF8A00]" : "border-slate-200 text-slate-500"
                  )}
                >
                  {hub.contact}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
