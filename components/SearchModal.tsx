"use client";

import { useState } from "react";
import { useModalDismiss } from "@/lib/useModalDismiss";
import { disciplinesData, type Discipline } from "./PrecisionDisciplines";
import { whitepapersData, type Whitepaper } from "./TechnicalWhitepapers";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDiscipline: (d: Discipline) => void;
  onSelectWhitepaper: (w: Whitepaper) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectDiscipline,
  onSelectWhitepaper,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  useModalDismiss(isOpen, onClose);

  if (!isOpen) return null;

  const matchedDisciplines = disciplinesData.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.description.toLowerCase().includes(query.toLowerCase())
  );

  const matchedPapers = whitepapersData.filter(
    (w) =>
      w.title.toLowerCase().includes(query.toLowerCase()) ||
      w.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="modal-surface bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-[#c3c5d9]/40 relative overflow-hidden"
      >
        {/* Header & Input */}
        <div className="flex items-center justify-between border-b border-[#eeeeec] pb-4 mb-4">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <span className="material-symbols-outlined text-2xl text-[#FF8A00]">
              search
            </span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search disciplines, whitepapers, specs..."
              className="w-full text-base font-sans text-[#1a1c1b] placeholder-[#737687] focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-lg text-[#737687] hover:text-[#1a1c1b] hover:bg-[#eeeeec]"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Quick Search Results */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6">
          {query.trim() === "" ? (
            <div className="text-center py-8 text-[#737687] font-sans text-xs">
              Type keywords such as <span className="font-mono text-[#FF8A00]">&quot;Piping&quot;</span>, <span className="font-mono text-[#FF8A00]">&quot;Instrumentation&quot;</span>, <span className="font-mono text-[#FF8A00]">&quot;3D Modeling&quot;</span>, or <span className="font-mono text-[#FF8A00]">&quot;ETAP&quot;</span> to search disciplines and courses.
            </div>
          ) : (
            <>
              {/* Disciplines */}
              {matchedDisciplines.length > 0 && (
                <div>
                  <div className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-wider mb-2">
                    Disciplines ({matchedDisciplines.length})
                  </div>
                  <div className="space-y-2">
                    {matchedDisciplines.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          onClose();
                          onSelectDiscipline(d);
                        }}
                        className="p-3 rounded-xl hover:bg-[#f4f4f2] cursor-pointer flex items-center justify-between border border-transparent hover:border-[#c3c5d9]/30 transition-all"
                      >
                        <div>
                          <div className="font-sans text-sm font-bold text-[#1a1c1b]">
                            {d.title}
                          </div>
                          <div className="font-sans text-xs text-[#424656] line-clamp-1">
                            {d.description}
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-sm text-[#FF8A00]">
                          east
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Whitepapers */}
              {matchedPapers.length > 0 && (
                <div>
                  <div className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-wider mb-2">
                    Whitepapers ({matchedPapers.length})
                  </div>
                  <div className="space-y-2">
                    {matchedPapers.map((w) => (
                      <div
                        key={w.id}
                        onClick={() => {
                          onClose();
                          onSelectWhitepaper(w);
                        }}
                        className="p-3 rounded-xl hover:bg-[#f4f4f2] cursor-pointer flex items-center justify-between border border-transparent hover:border-[#c3c5d9]/30 transition-all"
                      >
                        <div>
                          <div className="font-sans text-sm font-bold text-[#1a1c1b]">
                            {w.title}
                          </div>
                          <div className="font-mono text-[10px] text-[#565f70]">
                            {w.category} {"//"} {w.readTime}
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-sm text-[#FF8A00]">
                          download
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedDisciplines.length === 0 && matchedPapers.length === 0 && (
                <div className="text-center py-8 text-[#737687] font-sans text-xs">
                  No matching telemetry found for &quot;{query}&quot;. Try another term.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
