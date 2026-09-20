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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="bg-white text-[#0b233a] rounded-2xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[88vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header info */}
        <div className="flex items-center gap-2 mb-2 pr-6">
          <span className="bg-[#FF8A00]/10 text-[#FF8A00] px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase">
            {whitepaper.tag}
          </span>
          <span className="font-mono text-xs text-slate-500">
            {whitepaper.category} · {whitepaper.date}
          </span>
        </div>

        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#0b233a] mb-2 leading-snug">
          {whitepaper.title}
        </h2>
        <div className="font-mono text-xs text-slate-500 mb-4 sm:mb-5">
          Conducted by: {whitepaper.author} | Duration: {whitepaper.readTime}
        </div>

        {/* Image */}
        <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 sm:mb-5 bg-[#07131e]">
          <img
            src={whitepaper.image}
            alt={whitepaper.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Summary */}
        <div className="mb-4 sm:mb-5">
          <h4 className="font-mono text-xs text-[#FF8A00] uppercase font-bold tracking-wider mb-1.5">
            Course Overview
          </h4>
          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            {whitepaper.summary}
          </p>
        </div>

        {/* Takeaways */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 mb-5 sm:mb-6">
          <h4 className="font-mono text-xs text-[#0b233a] uppercase font-bold tracking-wider mb-2">
            Key Learning Outcomes &amp; Skills:
          </h4>
          <ul className="space-y-1.5">
            {whitepaper.takeaways.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2 font-sans text-xs text-slate-700">
                <span className="material-symbols-outlined text-[#FF8A00] text-sm mt-0.5 shrink-0">
                  check_circle
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action button
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="font-mono text-[11px] sm:text-xs text-slate-500 text-center sm:text-left">
            Delivery: Classroom &amp; Hands-on Software Labs
          </div>
         <button
            onClick={handleDownload}
            className="bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">
              {downloaded ? "check" : "download"}
            </span> 
            {downloaded ? "Syllabus Downloaded!" : "Download Syllabus"}
          </button>
        </div> */}
      </div>
    </div>
  );
}
