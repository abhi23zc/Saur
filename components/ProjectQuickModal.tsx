"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  Cpu
} from "lucide-react";
import { Project } from "@/data/site";

interface ProjectQuickModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConsultation: (projectName?: string) => void;
}

export default function ProjectQuickModal({
  project,
  onClose,
  onOpenConsultation,
}: ProjectQuickModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-slate-300 z-10 flex flex-col"
          >
            {/* Header with High-Impact Background Hero Image (Increased Height for Balanced Proportions) */}
            <div className="relative h-64 sm:h-80 md:h-[350px] lg:h-[380px] w-full overflow-hidden bg-[#0b233a] shrink-0">
              <img
                src={project.image || "/media/saur-industrial-hero.png"}
                alt={project.title}
                className="w-full h-full object-cover object-center brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b233a] via-[#0b233a]/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-black/60 hover:bg-[#FF8A00] text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Badges inside Hero */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white text-[#0b233a] font-mono text-[11px] font-bold border border-slate-200">
                  {project.endUser}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#FF8A00] text-white font-mono text-[11px] font-bold">
                  {project.year}
                </span>
                {project.sector && (
                  <span className="px-2 py-0.5 rounded-md bg-black/60 text-amber-300 border border-white/15 font-mono text-[10px] uppercase font-semibold">
                    {project.sector}
                  </span>
                )}
              </div>

              {/* Title inside bottom of Hero */}
              <div className="absolute bottom-4 left-5 right-5 z-20">
                <div className="font-mono text-[10px] text-[#FF8A00] uppercase font-bold tracking-wider mb-1">
                  CLIENT: {project.client}
                </div>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-7 space-y-5">
              
              {/* Telemetry Metric Strip (Flat Integrated Strip with Hairline Dividers) */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                <div className="p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-0.5">
                    <Clock className="w-3 h-3 text-[#FF8A00]" />
                    <span>MAN-HOURS</span>
                  </div>
                  <span className="font-display text-sm sm:text-base font-bold text-[#FF8A00]">
                    {project.manHours ? `${project.manHours} hrs` : "Turnkey"}
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-0.5">
                    <FileText className="w-3 h-3 text-[#0b233a]" />
                    <span>DELIVERABLES</span>
                  </div>
                  <span className="font-display text-sm sm:text-base font-bold text-[#0b233a]">
                    {project.deliverables || "Complete Package"}
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>LOCATION</span>
                  </div>
                  <span className="font-display text-xs sm:text-sm font-bold text-slate-800 truncate block">
                    {project.location || "Global Execution"}
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>QA AUDIT</span>
                  </div>
                  <span className="font-display text-xs sm:text-sm font-bold text-emerald-700">
                    ISO 9001:2015
                  </span>
                </div>
              </div>

              {/* Scope Description */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                  <span>Engineering Scope of Work</span>
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {project.scope}
                </p>
              </div>

              {/* Key Highlights / Deliverables (Open Checklist - No Boxes) */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                    <span>Verified Execution Highlights</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 py-1 border-b border-slate-100 text-slate-800 font-sans"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium text-xs text-slate-800 leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disciplines & Software Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Disciplines Involved
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.disciplines.map((d) => (
                      <span
                        key={d}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-mono font-medium border border-slate-200"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {project.software && project.software.length > 0 && (
                  <div>
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-[#FF8A00]" />
                      <span>CAD / CAE Platforms</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.software.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-orange-50 text-[#FF8A00] border border-orange-200 text-[11px] font-mono font-semibold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 hover:border-[#0b233a] text-[#0b233a] font-sans text-xs uppercase tracking-wider font-bold transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>Open Full Project Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultation(project.title);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#FF8A00] hover:bg-[#E67C00] text-white font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire Similar Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
