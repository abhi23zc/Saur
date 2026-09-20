"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  Layers,
  Building2
} from "lucide-react";
import { CaseStudy } from "@/data/site";

interface CaseStudyQuickModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenConsultation: (caseStudyName?: string) => void;
}

export default function CaseStudyQuickModal({
  caseStudy,
  onClose,
  onOpenConsultation,
}: CaseStudyQuickModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [caseStudy, onClose]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl sm:max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-slate-200 z-10 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header (Clean Light Mode) */}
            <div className="p-4 sm:p-5 sm:px-7 border-b border-slate-100 bg-white relative shrink-0">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors border border-slate-200 cursor-pointer active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-slate-700" />
              </button>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 pr-10">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FF8A00] text-white font-mono text-[10px] font-bold">
                  CASE STUDY {caseStudy.number}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#0b233a] text-white font-mono text-[10px] font-bold">
                  {caseStudy.endUser}
                </span>
                {caseStudy.client && (
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[10px] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>Client: {caseStudy.client}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg sm:text-2xl font-extrabold text-[#0b233a] leading-tight mb-1 pr-10">
                {caseStudy.title}
              </h3>

              {/* Scope Summary */}
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pr-10">
                {caseStudy.scope}
              </p>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
              
              {/* Telemetry Metric Strip */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                <div className="p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-0.5">
                    <Clock className="w-3 h-3 text-[#FF8A00]" />
                    <span>VERIFIED EFFORT</span>
                  </div>
                  <span className="font-display text-sm sm:text-base font-bold text-[#FF8A00]">
                    {caseStudy.manHours ? `${caseStudy.manHours} hrs` : "Executed"}
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-0.5">
                    <FileText className="w-3 h-3 text-[#0b233a]" />
                    <span>DELIVERABLES</span>
                  </div>
                  <span className="font-display text-sm sm:text-base font-bold text-[#0b233a]">
                    {caseStudy.deliverableCount} Documents
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-0.5">
                    <Layers className="w-3 h-3 text-slate-500" />
                    <span>DISCIPLINES</span>
                  </div>
                  <span className="font-display text-xs sm:text-sm font-bold text-slate-800 truncate block">
                    {caseStudy.disciplines.join(", ")}
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>QA STANDARD</span>
                  </div>
                  <span className="font-display text-xs sm:text-sm font-bold text-emerald-700">
                    ISO 9001:2015
                  </span>
                </div>
              </div>

              {/* Categorized Deliverables Breakdown */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                  <span>Audited Engineering Deliverables Package</span>
                </h4>

                <div className="space-y-4">
                  {caseStudy.deliverables.map((group, gIdx) => (
                    <div
                      key={group.category || gIdx}
                      className="border border-slate-200 rounded-xl p-4 bg-white"
                    >
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                        <span className="font-mono text-xs font-bold text-[#FF8A00] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          {String(gIdx + 1).padStart(2, "0")}
                        </span>
                        <h5 className="font-display text-sm font-bold text-[#0b233a]">
                          {group.category}
                        </h5>
                        <span className="text-[11px] font-mono text-slate-400 ml-auto font-medium">
                          {group.items.length} items
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {group.items.map((item, iIdx) => (
                          <div
                            key={iIdx}
                            className="flex items-start gap-2 py-1 text-slate-700 text-xs font-sans leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disciplines Chips */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[10px] text-slate-500 uppercase font-bold mr-1">
                  Engaged Disciplines:
                </span>
                {caseStudy.disciplines.map((d) => (
                  <span
                    key={d}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 hover:border-[#0b233a] text-[#0b233a] font-sans text-xs uppercase tracking-wider font-bold transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>Open Full Case Study</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultation(caseStudy.title);
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
