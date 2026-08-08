"use client";

import { useState } from "react";
import { Whitepaper } from "./TechnicalWhitepapers";
import { useModalDismiss } from "@/lib/useModalDismiss";

interface WhitepaperModalProps {
  whitepaper: Whitepaper | null;
  onClose: () => void;
}

export default function WhitepaperModal({
  whitepaper,
  onClose,
}: WhitepaperModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  useModalDismiss(!!whitepaper, onClose);

  if (!whitepaper) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="modal-surface bg-white text-[#1a1c1b] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#c3c5d9]/40 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close whitepaper modal"
          className="absolute top-6 right-6 p-2 rounded-full text-[#737687] hover:text-[#1a1c1b] hover:bg-[#eeeeec] transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Header info */}
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-[#FF8A00]/10 text-[#FF8A00] px-3 py-1 rounded-full font-mono text-xs font-bold uppercase">
            {whitepaper.tag}
          </span>
          <span className="font-mono text-xs text-[#565f70]">
            {whitepaper.category} {"//"} {whitepaper.date}
          </span>
        </div>

        <h2 className="font-display text-3xl font-bold text-[#1a1c1b] mb-3 leading-snug">
          {whitepaper.title}
        </h2>
        <div className="font-mono text-xs text-[#737687] mb-6">
          Author: {whitepaper.author} | {whitepaper.readTime}
        </div>

        {/* Image */}
        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-[#0a0f18]">
          <img
            src={whitepaper.image}
            alt={whitepaper.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h4 className="font-mono text-xs text-[#FF8A00] uppercase font-bold tracking-wider mb-2">
            Executive Abstract
          </h4>
          <p className="font-sans text-sm text-[#424656] leading-relaxed">
            {whitepaper.summary}
          </p>
        </div>

        {/* Takeaways */}
        <div className="bg-[#f9f9f7] border border-[#c3c5d9]/40 rounded-2xl p-6 mb-8">
          <h4 className="font-mono text-xs text-[#FF8A00] uppercase font-bold tracking-wider mb-3">
            Key Empirical Takeaways:
          </h4>
          <ul className="space-y-2">
            {whitepaper.takeaways.map((t, idx) => (
              <li key={idx} className="flex items-start gap-3 font-sans text-xs text-[#1a1c1b]">
                <span className="material-symbols-outlined text-[#FF8A00] text-base mt-0.5">
                  task_alt
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Download action */}
        <div className="flex items-center justify-between border-t border-[#eeeeec] pt-6">
          <div className="font-mono text-xs text-[#737687]">
            Format: PDF (High-Res 300 DPI) | Size: 4.8 MB
          </div>
          <button
            onClick={handleDownload}
            className="bg-[#FF8A00] text-white px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffaa44] transition-colors shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">
              {downloaded ? "check" : "download"}
            </span>
            {downloaded ? "PDF Package Generated!" : "Download Research PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
