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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="modal-surface bg-[#05080c] text-white rounded-2xl md:rounded-3xl max-w-5xl w-full shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Side: Hero Image Cover */}
        <div className="w-full md:w-2/5 h-56 md:h-auto relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/10">
          <img
            src={discipline.image}
            alt={discipline.title}
            className="w-full h-full object-cover"
          />
          {/* Gradients and Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#05080c] via-[#05080c]/40 to-transparent" />
          <div className="absolute inset-0 blueprint-grid-dark opacity-40 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-[#FF8A00]/10 mix-blend-color pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 md:top-auto md:bottom-12 md:left-10 md:right-10 flex flex-col justify-end h-full md:h-auto">
             <span className="inline-block w-max px-3 py-1.5 mb-3 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[#FF8A00] font-mono text-[10px] font-bold uppercase tracking-widest shadow-xl">
               {discipline.badge}
             </span>
             <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase leading-none opacity-90 md:block drop-shadow-lg hidden">
               {discipline.category}
             </h3>
          </div>
        </div>

        {/* Right Side: Scrollable Specs */}
        <div className="flex-1 flex flex-col p-6 sm:p-10 md:p-12 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 relative">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close discipline modal"
            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <div className="pr-12 md:pr-16">
            <span className="font-mono text-[10px] text-[#FF8A00] uppercase tracking-widest mb-2 block">
              Domain Code: {discipline.id}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight leading-none">
              {discipline.title}
            </h2>
            <p className="font-sans text-sm md:text-base text-white/60 mb-10 leading-relaxed font-light">
              {discipline.description}
            </p>
          </div>

          <div className="mb-12">
            <div className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-widest border-b border-white/10 pb-3 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">memory</span>
              Engineered Standards & Material Matrix
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm font-sans">
              <div>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-1">Tolerances:</span>
                <span className="text-white/90 font-medium">{discipline.detailedSpecs.tolerances}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-1">Materials Formulation:</span>
                <span className="text-white/90 font-medium">{discipline.detailedSpecs.materials}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-1">Compliance Standard:</span>
                <span className="text-white/90 font-medium">{discipline.detailedSpecs.standards}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#FF8A00] uppercase tracking-widest block mb-1">Benchmark Efficiency:</span>
                <span className="text-[#FF8A00] font-bold text-lg">{discipline.detailedSpecs.efficiency}</span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="font-mono text-[10px] text-white/50 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">architecture</span>
              Core Technical Deliverables:
            </div>
            <div className="grid grid-cols-1 gap-3">
              {discipline.detailedSpecs.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 text-sm text-white/80 transition-colors hover:bg-white/10 hover:border-white/20 group"
                >
                  <span className="material-symbols-outlined text-[#FF8A00] text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                    check_circle
                  </span>
                  <span className="font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-8 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 transition-colors text-center"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full sm:w-auto bg-[#FF8A00] text-white px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffaa44] transition-all shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] text-center flex justify-center items-center gap-2"
            >
              Request Custom Spec Build
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
