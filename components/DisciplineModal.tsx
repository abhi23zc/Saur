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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="modal-surface bg-[#0a0f18] text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-white/20 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close discipline modal"
          className="absolute top-6 right-6 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#1FA67A]/20 border border-[#1FA67A]/40 text-[#1FA67A] font-mono text-xs font-bold uppercase tracking-wider">
            {discipline.badge}
          </span>
          <span className="font-mono text-xs text-white/50 uppercase">
            Domain Code: {discipline.id}
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          {discipline.title}
        </h2>
        <p className="font-sans text-base text-white/80 mb-8 leading-relaxed">
          {discipline.description}
        </p>

        {/* Hero Image inside modal */}
        <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-8 relative border border-white/15">
          <img
            src={discipline.image}
            alt={discipline.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-transparent to-transparent" />
        </div>

        {/* Detailed Technical Specs Matrix */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
          <div className="font-mono text-xs text-[#b5c4ff] font-bold uppercase tracking-widest border-b border-white/10 pb-2">
            Engineered Standards & Material Matrix
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <span className="font-mono text-white/50 block mb-0.5">Tolerances:</span>
              <span className="text-white font-semibold">{discipline.detailedSpecs.tolerances}</span>
            </div>
            <div>
              <span className="font-mono text-white/50 block mb-0.5">Materials Formulation:</span>
              <span className="text-white font-semibold">{discipline.detailedSpecs.materials}</span>
            </div>
            <div>
              <span className="font-mono text-white/50 block mb-0.5">Compliance Standard:</span>
              <span className="text-white font-semibold">{discipline.detailedSpecs.standards}</span>
            </div>
            <div>
              <span className="font-mono text-white/50 block mb-0.5">Benchmark Efficiency:</span>
              <span className="text-[#1FA67A] font-bold">{discipline.detailedSpecs.efficiency}</span>
            </div>
          </div>
        </div>

        {/* Deliverables List */}
        <div className="mb-8">
          <div className="font-mono text-xs text-white/70 font-bold uppercase tracking-wider mb-3">
            Core Technical Deliverables:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {discipline.detailedSpecs.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3 text-xs text-white/90"
              >
                <span className="material-symbols-outlined text-[#1FA67A] text-lg">
                  check_circle
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-4 border-t border-white/10 pt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-white/20 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
          >
            Close Spec
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="bg-[#0b5fff] text-white px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#0051e0] transition-colors"
          >
            Request Custom Spec Build
          </button>
        </div>
      </div>
    </div>
  );
}
