"use client";

import { motion } from "framer-motion";

interface SectorInsightsProps {
  onOpenCaseStudy: () => void;
}

export default function SectorInsights({ onOpenCaseStudy }: SectorInsightsProps) {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="insights" className="relative py-32 overflow-hidden bg-[#05080c]">
      {/* Background Image with Premium Blend Modes */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          alt="Team Collaboration"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity filter grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGilywHHJWKX8_xH8PH0-KU7bj4qbyZppnHnxDo0U23bbFMfCUR41S16mbhdI136MrakXpNGOdKx8kiruKm2e25PfVCKDyWW6FgGXwy2hM_Qk9i9gJtnF2xfQCDonydx-2yaEmo0CuhkhRIkwg_KMuHKzzNKe9DwJNcJDrOnKMXJKgqFzUv1g1Airpk9l1_Dcyh_Qy6qhSHBtsDtzjAu322hTarK3MSeUJVJquxBk4idUo0YjY9_c"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080c] via-[#05080c]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#1FA67A]/10 via-transparent to-transparent opacity-60" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full h-full flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl bg-white/5 p-10 md:p-14 rounded-[2rem] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8A00]/20 blur-[80px] rounded-full pointer-events-none" />

          <span className="font-mono text-[9px] text-[#FF8A00] uppercase tracking-[0.2em] mb-4 block font-bold relative z-10">
            Industries Served
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 tracking-tighter leading-[1.1] uppercase relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">
            Powering Global Infrastructure & Energy
          </h2>
          <p className="font-sans text-base text-white/60 mb-10 leading-relaxed font-light relative z-10">
            We deliver specialized engineering solutions across critical sectors. Our multidisciplinary approach ensures safety, efficiency, and sustainability from FEED to final handover.
          </p>

          <motion.ul 
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5 mb-12 relative z-10"
          >
            {[
              "Petrochemical & Refining",
              "Oil & Gas (Onshore / Offshore)",
              "EPC Projects & Heavy Infrastructure",
              "Energy, Power & Renewables",
              "Industrial Plants & Manufacturing",
            ].map((item, idx) => (
              <motion.li variants={itemVariants} key={idx} className="flex items-start gap-4 text-white">
                <span className="material-symbols-outlined text-[#FF8A00] text-xl mt-0.5 drop-shadow-[0_0_10px_rgba(255,138,0,0.5)]">
                  check_circle
                </span>
                <span className="font-sans text-sm font-light leading-snug">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenCaseStudy}
            className="relative group bg-white text-[#1a1c1b] px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#FF8A00] hover:text-white transition-all duration-300 shadow-xl flex items-center gap-3 z-10 overflow-hidden"
          >
            <span className="relative z-10">Explore Our Work</span>
            <span className="material-symbols-outlined text-sm relative z-10 group-hover:translate-x-1 transition-transform">east</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-[#ffaa44] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
