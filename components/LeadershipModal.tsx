"use client";

import { useModalDismiss } from "@/lib/useModalDismiss";

interface LeadershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadershipModal({
  isOpen,
  onClose,
}: LeadershipModalProps) {
  useModalDismiss(isOpen, onClose);

  if (!isOpen) return null;

  const team = [
    {
      name: "Dr. Elena Rostova",
      role: "Chief Engineer & VP Systems",
      bio: "Ph.D. in Aerospace & Fluid Dynamics from MIT. 20+ years executing deepwater oil & gas and hypersonic turbine infrastructure.",
      specialty: "Fluid Dynamics & SCADA AI",
    },
    {
      name: "Marcus Vance",
      role: "Head of Materials Science",
      bio: "Former Lead Metallurgist at European Synchrotron Radiation Facility. Specialized in extreme temperature composite matrices.",
      specialty: "High-Load Metallurgy",
    },
    {
      name: "Aria Takahashi",
      role: "Global Operations Director",
      bio: "Over 15 years managing hyper-scale CapEx engineering builds across Singapore, UAE, and North Sea offshore sites.",
      specialty: "Global Infrastructure Execution",
    },
    {
      name: "Karl Lindqvist",
      role: "Principal Aerodynamics Fellow",
      bio: "Pioneer in computational fluid dynamics and biomimetic micro-turbine optimization algorithms.",
      specialty: "Turbine CFD Optimization",
    },
  ];

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
        <button
          onClick={onClose}
          aria-label="Close leadership modal"
          className="absolute top-6 right-6 p-2 rounded-full text-[#737687] hover:text-[#1a1c1b] hover:bg-[#eeeeec] transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="mb-6">
          <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-widest block mb-1">
            Saur Global Council
          </span>
          <h2 className="font-display text-3xl font-bold text-[#1a1c1b]">
            Engineering Leadership Team
          </h2>
          <p className="font-sans text-xs text-[#424656] mt-1">
            Over 1,000 engineers and 45 PhDs guided by world-class industry directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="p-5 rounded-2xl bg-[#f9f9f7] border border-[#c3c5d9]/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#FF8A00]/10 text-[#FF8A00] font-bold flex items-center justify-center font-display text-sm">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-[#1a1c1b]">
                      {member.name}
                    </h4>
                    <span className="font-mono text-[10px] text-[#FF8A00] font-semibold block">
                      {member.role}
                    </span>
                  </div>
                </div>
                <p className="font-sans text-xs text-[#424656] leading-relaxed mb-3">
                  {member.bio}
                </p>
              </div>
              <div className="pt-2 border-t border-[#eeeeec] font-mono text-[10px] text-[#FF8A00] font-bold">
                Domain: {member.specialty}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-[#eeeeec] pt-4">
          <button
            onClick={onClose}
            className="bg-[#FF8A00] text-white px-6 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffaa44] transition-colors"
          >
            Close Profile View
          </button>
        </div>
      </div>
    </div>
  );
}
