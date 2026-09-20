"use client";

import { Discipline } from "./PrecisionDisciplines";
import { useModalDismiss } from "@/lib/useModalDismiss";

interface DisciplineModalProps {
  discipline: Discipline | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export default function DisciplineModal({
  discipline,
  onClose,
  onOpenConsultation,
}: DisciplineModalProps) {
  useModalDismiss(!!discipline, onClose);

  if (!discipline) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="bg-white text-slate-900 rounded-t-3xl sm:rounded-3xl max-w-xl sm:max-w-2xl w-full shadow-2xl border border-slate-200 relative max-h-[92vh] sm:max-h-[86vh] flex flex-col overflow-hidden overscroll-contain"
      >
        {/* Modal Header (Light Mode) */}
        <div className="p-4 sm:p-5 sm:px-7 border-b border-slate-100 bg-white relative shrink-0">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close discipline modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">close</span>
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 pr-10">
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
              {discipline.badge}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF8A00]">
              {discipline.category}
            </span>
          </div>

          <h2 className="font-display text-lg sm:text-2xl font-extrabold text-[#0b233a] tracking-tight leading-tight pr-10">
            {discipline.title}
          </h2>
          <p className="font-mono text-[11px] sm:text-xs text-[#FF8A00] font-bold uppercase tracking-wider mt-0.5">
            KPI: {discipline.kpi}
          </p>
        </div>

        {/* Modal Body (Light Mode) */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 bg-white">
          {/* Description */}
          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/80">
            {discipline.description}
          </p>

          {/* Technical Specs 4-cell Grid */}
          <div className="bg-slate-50/80 rounded-2xl p-3.5 sm:p-4.5 border border-slate-200">
            <div className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">settings_suggest</span>
              <span>Technical Specifications &amp; Tools</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs font-sans">
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-mono font-bold mb-0.5">Software Tools:</span>
                <span className="text-slate-900 font-medium">{discipline.detailedSpecs.tolerances}</span>
              </div>
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-mono font-bold mb-0.5">Materials / Scope:</span>
                <span className="text-slate-900 font-medium">{discipline.detailedSpecs.materials}</span>
              </div>
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-mono font-bold mb-0.5">Applicable Standards:</span>
                <span className="text-slate-900 font-medium">{discipline.detailedSpecs.standards}</span>
              </div>
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-mono font-bold mb-0.5">Quality Standard:</span>
                <span className="text-[#FF8A00] font-semibold">{discipline.detailedSpecs.efficiency}</span>
              </div>
            </div>
          </div>

          {/* Key Deliverables */}
          <div>
            <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#FF8A00]">task_alt</span>
              <span>Key Engineering Deliverables:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {discipline.detailedSpecs.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-700 hover:bg-white hover:border-[#FF8A00]/40 transition-colors"
                >
                  <span className="material-symbols-outlined text-[#FF8A00] text-sm shrink-0">
                    check_circle
                  </span>
                  <span className="font-medium text-[11px] sm:text-xs text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer (Light Mode) */}
        <div className="p-3.5 sm:p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-sans text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors text-center cursor-pointer min-h-[40px]"
          >
            Close Scope
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] text-white px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
          >
            <span>Consult on this Discipline</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}


