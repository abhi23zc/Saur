"use client";

import { useModalDismiss } from "@/lib/useModalDismiss";
import { Course } from "@/data/site";
import {
  X,
  Clock,
  Laptop,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  GraduationCap,
  FileSpreadsheet
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
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Modal Header */}
        <div className="bg-[#0b233a] text-white px-5 sm:px-6 py-4 border-b border-slate-800 relative">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              {/* Category & Program Number */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#FF8A00] bg-[#FF8A00]/15 border border-[#FF8A00]/30 px-2 py-0.5 rounded">
                  PROGRAM {course.number}
                </span>
                <span className="font-mono text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                  {course.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                {course.title}
              </h2>

              {/* Inline Metadata */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-slate-300 pt-0.5">
                <span className="flex items-center gap-1 text-amber-300 font-medium">
                  <Clock className="w-3 h-3 text-[#FF8A00]" />
                  <span>{course.duration}</span>
                </span>
                <span>•</span>
                <span>Vadapalani Hub, Chennai</span>
                <span>•</span>
                <span>Live CAD Workstations</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(88vh-130px)] divide-y divide-slate-100">
          
          {/* Software & Governing Codes Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono text-[9px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5 flex items-center gap-1">
                <Laptop className="w-3 h-3 text-[#FF8A00]" />
                <span>CAD / CAE Tools Taught</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {course.software.map((sw) => (
                  <span
                    key={sw}
                    className="px-2 py-0.5 rounded bg-white text-[#0b233a] border border-slate-200 font-mono text-[10px] font-semibold"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono text-[9px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Governing Design Codes</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {course.governingCodes.map((code) => (
                  <span
                    key={code}
                    className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-mono text-[10px] font-medium"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Phase Curriculum Roadmap */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#0b233a] font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>4-Phase Curriculum Modules</span>
              </h3>
              <span className="font-mono text-[10px] text-slate-500">
                100% Practical Workflow
              </span>
            </div>

            <div className="space-y-2.5">
              {course.modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl p-3 bg-white hover:border-[#0b233a]/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#FF8A00] bg-[#FF8A00]/10 px-1.5 py-0.5 rounded">
                      {mod.phase}
                    </span>
                    <h4 className="font-display text-xs sm:text-sm font-bold text-[#0b233a]">
                      {mod.title}
                    </h4>
                  </div>
                  
                  <ul className="space-y-1.5 pl-0.5">
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience & Mastered Deliverables */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0b233a] mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#0b233a]" />
                <span>Target Profiles</span>
              </h4>
              <ul className="space-y-1.5">
                {course.targetAudience.map((aud, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] mt-1.5 shrink-0" />
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0b233a] mb-2 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mastered Deliverables</span>
              </h4>
              <ul className="space-y-1.5">
                {course.deliverablesLearned.map((del, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Compact Modal Footer */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Flexible Corporate Batches Available
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-sans text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onEnquireBatch(course);
              }}
              className="px-4 py-2 rounded-lg bg-[#FF8A00] hover:bg-[#E67C00] text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Enquire for Batch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
