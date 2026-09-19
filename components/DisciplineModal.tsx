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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="bg-[#0b233a] text-white rounded-2xl max-w-4xl w-full shadow-2xl border border-white/15 relative max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Side: Hero Image Cover */}
        <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/10">
          <img
            src={discipline.image}
            alt={discipline.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0b233a] via-[#0b233a]/50 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end">
            <span className="inline-block w-max px-2.5 py-1 mb-2 rounded bg-black/60 backdrop-blur-md border border-white/15 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-wider">
              {discipline.badge}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
              {discipline.category}
            </h3>
          </div>
        </div>

        {/* Right Side: Specifications */}
        <div className="flex-1 flex flex-col p-6 sm:p-8 overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close discipline modal"
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          <div className="pr-8">
            <span className="font-mono text-[10px] text-[#FF8A00] uppercase tracking-wider font-bold mb-1 block">
              Saur Engineering Discipline
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
              {discipline.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              {discipline.description}
            </p>
          </div>

          <div className="mb-6 bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-wider mb-3">
              Technical Specifications &amp; Tools
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Software Tools:</span>
                <span className="text-white font-medium">{discipline.detailedSpecs.tolerances}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Materials / Scope:</span>
                <span className="text-white font-medium">{discipline.detailedSpecs.materials}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Applicable Standards:</span>
                <span className="text-white font-medium">{discipline.detailedSpecs.standards}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Quality Standard:</span>
                <span className="text-[#FF8A00] font-medium">{discipline.detailedSpecs.efficiency}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
              Key Engineering Deliverables:
            </div>
            <div className="space-y-1.5">
              {discipline.detailedSpecs.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg flex items-center gap-2 text-xs text-slate-200"
                >
                  <span className="material-symbols-outlined text-[#FF8A00] text-sm shrink-0">
                    check_circle
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg font-sans text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Consult on this Discipline</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
