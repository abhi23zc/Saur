"use client";

import { useModalDismiss } from "@/lib/useModalDismiss";
import { Course } from "@/data/site";
import {
  X,
  Clock,
  Laptop,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  FileSpreadsheet,
  Check,
  Building2,
  GraduationCap
} from "lucide-react";

interface CourseSyllabusModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquireBatch: (course: Course) => void;
}

export default function CourseSyllabusModal({
  course,
  isOpen,
  onClose,
  onEnquireBatch,
}: CourseSyllabusModalProps) {
  useModalDismiss(isOpen, onClose);

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0b233a] text-white p-5 sm:p-6 border-b border-slate-800 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#FF8A00] bg-[#FF8A00]/15 border border-[#FF8A00]/30 px-2.5 py-0.5 rounded">
                  PROGRAM {course.number}
                </span>
                <span className="font-mono text-xs text-slate-300 uppercase tracking-wider font-semibold">
                  {course.category}
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                {course.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {course.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar inside Header */}
          <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
              <span className="text-amber-300 font-semibold">{course.duration}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Mode</span>
              <span className="text-white font-semibold">Classroom &amp; Workstations</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Batches</span>
              <span className="text-white font-semibold">Weekend &amp; Evening</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Lab Center</span>
              <span className="text-emerald-400 font-semibold">Vadapalani, Chennai</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 max-h-[calc(90vh-190px)] divide-y divide-slate-100">
          
          {/* Software & Governing Codes Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Hands-on Software Taught</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {course.software.map((sw) => (
                  <span
                    key={sw}
                    className="px-2.5 py-1 rounded bg-white text-[#0b233a] border border-slate-200 font-mono text-xs font-semibold"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Governing Codes &amp; Standards</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {course.governingCodes.map((code) => (
                  <span
                    key={code}
                    className="px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-200 font-mono text-xs font-medium"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed 4-Phase Curriculum Modules */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#0b233a] font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FF8A00]" />
                <span>Structured Curriculum Modules</span>
              </h3>
              <span className="font-mono text-[11px] text-slate-500">
                4 Comprehensive Phases
              </span>
            </div>

            <div className="space-y-3.5">
              {course.modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl p-4 bg-white hover:border-[#0b233a]/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="font-mono text-xs font-bold text-[#FF8A00] bg-[#FF8A00]/10 px-2 py-0.5 rounded">
                      {mod.phase}
                    </span>
                    <h4 className="font-display text-sm sm:text-base font-bold text-[#0b233a]">
                      {mod.title}
                    </h4>
                  </div>
                  
                  <ul className="space-y-2 pl-1">
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience & Deliverables Generated */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] mb-2.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#0b233a]" />
                <span>Target Engineering Profiles</span>
              </h4>
              <ul className="space-y-2">
                {course.targetAudience.map((aud, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] mt-1.5 shrink-0" />
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b233a] mb-2.5 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Portfolio Deliverables Mastered</span>
              </h4>
              <ul className="space-y-2">
                {course.deliverablesLearned.map((del, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-mono text-center sm:text-left">
            <span>Location: Vadapalani Hub, Chennai · Flexible Corporate Packages Available</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-sans text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onEnquireBatch(course);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-lg bg-[#FF8A00] hover:bg-[#E67C00] text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Enquire for Next Batch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
