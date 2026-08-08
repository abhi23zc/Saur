"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HubLocation {
  id: string;
  name: string;
  type: "HQ" | "Active Operation";
  coords: { x: number; y: number }; // Percentage relative position
  city: string;
  engineers: number;
  activeProjects: number;
  specialization: string;
}

const hubs: HubLocation[] = [
  {
    id: "hq-mumbai",
    name: "Corporate Headquarters",
    type: "HQ",
    coords: { x: 70, y: 42 },
    city: "Mumbai, India",
    engineers: 150,
    activeProjects: 45,
    specialization: "Engineering & Management",
  },
  {
    id: "hub-chennai",
    name: "Design & Training Center",
    type: "Active Operation",
    coords: { x: 72, y: 48 },
    city: "Chennai, India",
    engineers: 120,
    activeProjects: 30,
    specialization: "Detailed Design & Workforce",
  },
  {
    id: "me-projects",
    name: "Middle East Deployments",
    type: "Active Operation",
    coords: { x: 60, y: 44 },
    city: "Dubai, UAE (Projects)",
    engineers: 80,
    activeProjects: 15,
    specialization: "On-site Commissioning",
  },
  {
    id: "sea-projects",
    name: "SE Asia Deployments",
    type: "Active Operation",
    coords: { x: 78, y: 50 },
    city: "Singapore (Projects)",
    engineers: 45,
    activeProjects: 12,
    specialization: "Subsea & EPC Support",
  },
];

// Ordered connection routes between hubs (great-circle style arcs)
const routes = [
  ["hq-mumbai", "hub-chennai"],
  ["hq-mumbai", "me-projects"],
  ["hub-chennai", "sea-projects"],
];

function hubById(id: string) {
  return hubs.find((h) => h.id === id)!;
}

function arcPath(a: HubLocation, b: HubLocation) {
  const mx = (a.coords.x + b.coords.x) / 2;
  const my = (a.coords.y + b.coords.y) / 2;
  // Bow the control point upward for a satellite-route feel
  const lift = 10 + Math.abs(a.coords.x - b.coords.x) * 0.12;
  return `M ${a.coords.x} ${a.coords.y} Q ${mx} ${my - lift} ${b.coords.x} ${b.coords.y}`;
}

export default function GlobalFootprintMap() {
  const [selectedHub, setSelectedHub] = useState<HubLocation | null>(null);

  return (
    <section
      id="global-footprint"
      className="py-24 md:py-32 bg-[#ffffff] border-t border-[#c3c5d9]/30"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-mono text-[10px] text-[#FF8A00] uppercase tracking-[0.2em] block font-bold mb-3">
            Global Operations
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-[#1a1c1b] uppercase">
            Global Footprint
          </h2>
          <p className="font-sans text-base text-[#565f70] leading-relaxed font-light">
            Strategically positioned to deliver critical infrastructure across
            every major industrial continent. Select a node to view live hub
            telemetry.
          </p>
        </motion.div>

        {/* Map Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9] mt-12 rounded-3xl border border-white/10 overflow-hidden bg-[#05080c] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute inset-0 blueprint-grid-dark opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,138,0,0.12),transparent_65%)] pointer-events-none" />

          {/* Graticule + connection arcs */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Parallels */}
            {[20, 35, 50, 65, 80].map((y) => (
              <line
                key={`p-${y}`}
                x1="4"
                x2="96"
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.15"
              />
            ))}
            {/* Meridians (subtly bowed for a globe feel) */}
            {[15, 30, 45, 60, 75, 90].map((x) => (
              <path
                key={`m-${x}`}
                d={`M ${x} 12 Q ${x + (x < 50 ? 3 : -3)} 50 ${x} 88`}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.15"
              />
            ))}

            {/* Connection routes */}
            {routes.map(([aId, bId], i) => {
              const a = hubById(aId);
              const b = hubById(bId);
              return (
                <motion.path
                  key={`route-${i}`}
                  d={arcPath(a, b)}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="0.28"
                  strokeDasharray="1.4 1.4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.3 + i * 0.25, ease: "easeInOut" }}
                />
              );
            })}

            <defs>
              <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF9A20" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#FF8A00" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FF9A20" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          {hubs.map((hub) => {
            const isHQ = hub.type === "HQ";
            const isSelected = selectedHub?.id === hub.id;
            return (
              <button
                key={hub.id}
                style={{ top: `${hub.coords.y}%`, left: `${hub.coords.x}%` }}
                onClick={() => setSelectedHub(isSelected ? null : hub)}
                aria-label={`View ${hub.name} details`}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
              >
                {/* Pulsing ring */}
                <span
                  className={cn(
                    "node-ring absolute -inset-2 rounded-full",
                    isHQ ? "text-[#FF9A20]" : "text-[#FF8A00]"
                  )}
                />
                <span
                  className={cn(
                    "relative block rounded-full border-2 border-white/90 shadow-lg transition-transform duration-300 group-hover:scale-125",
                    isHQ
                      ? "w-4 h-4 bg-[#FF9A20] shadow-[0_0_18px_rgba(255,154,32,0.9)]"
                      : "w-3.5 h-3.5 bg-[#FF8A00] shadow-[0_0_18px_rgba(255,138,0,0.9)]",
                    isSelected && "scale-125"
                  )}
                />

                {/* Hover / active badge (desktop only) */}
                <div
                  className={cn(
                    "absolute top-6 left-1/2 -translate-x-1/2 hidden md:block glass-panel-light px-4 py-2.5 rounded-xl text-left border border-white/60 shadow-xl w-56 transition-all duration-200",
                    isSelected
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 group-hover:opacity-100 scale-95 pointer-events-none"
                  )}
                >
                  <div className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase mb-0.5">
                    {hub.type} {"//"} {hub.city}
                  </div>
                  <div className="font-sans text-xs font-bold text-[#1a1c1b] leading-snug">
                    {hub.name}
                  </div>
                  <div className="font-sans text-[11px] text-[#424656] mt-1">
                    Engineers: <span className="font-bold">{hub.engineers}</span> · Projects:{" "}
                    <span className="font-bold">{hub.activeProjects}</span>
                  </div>
                  <div className="font-mono text-[9px] text-[#FF8A00] mt-1 font-semibold leading-snug">
                    {hub.specialization}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-4 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF9A20]" />
              <span className="font-mono text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                Executive HQ
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF8A00] animate-pulse" />
              <span className="font-mono text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                Active Hub
              </span>
            </div>
          </div>
        </motion.div>

        {/* Responsive hub cards (primary interaction on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {hubs.map((hub) => {
            const isHQ = hub.type === "HQ";
            const isSelected = selectedHub?.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() =>
                  setSelectedHub(isSelected ? null : hub)
                }
                className={cn(
                  "text-left p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.2)]",
                  isSelected
                    ? "bg-[#05080c] border-[#05080c] text-white"
                    : "bg-white border-[#c3c5d9]/40 hover:border-[#FF8A00]/40"
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={cn(
                      "w-2.5 h-2.5 rounded-full",
                      isHQ ? "bg-[#FF9A20]" : "bg-[#FF8A00]"
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase tracking-[0.15em] font-bold",
                      isSelected ? "text-white/60" : "text-[#737687]"
                    )}
                  >
                    {hub.type}
                  </span>
                </div>
                <div
                  className={cn(
                    "font-display text-base font-bold leading-tight mb-1",
                    isSelected ? "text-white" : "text-[#1a1c1b]"
                  )}
                >
                  {hub.city}
                </div>
                <div
                  className={cn(
                    "font-sans text-xs leading-snug mb-4",
                    isSelected ? "text-white/60" : "text-[#565f70]"
                  )}
                >
                  {hub.specialization}
                </div>
                <div
                  className={cn(
                    "flex items-center gap-4 pt-3 border-t",
                    isSelected ? "border-white/10" : "border-[#eeeeec]"
                  )}
                >
                  <div>
                    <div
                      className={cn(
                        "font-display text-lg font-bold",
                        isSelected ? "text-[#ffaa44]" : "text-[#FF8A00]"
                      )}
                    >
                      {hub.engineers}
                    </div>
                    <div
                      className={cn(
                        "font-mono text-[8px] uppercase tracking-widest",
                        isSelected ? "text-white/40" : "text-[#737687]"
                      )}
                    >
                      Engineers
                    </div>
                  </div>
                  <div>
                    <div
                      className={cn(
                        "font-display text-lg font-bold",
                        isSelected ? "text-white" : "text-[#1a1c1b]"
                      )}
                    >
                      {hub.activeProjects}
                    </div>
                    <div
                      className={cn(
                        "font-mono text-[8px] uppercase tracking-widest",
                        isSelected ? "text-white/40" : "text-[#737687]"
                      )}
                    >
                      Projects
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
