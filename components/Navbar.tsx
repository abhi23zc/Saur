"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenSearch, onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#insights" },
    { name: "Services", href: "#disciplines" },
    { name: "Expertise", href: "#human-capital" },
    { name: "Projects", href: "#global-footprint" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 dark:bg-[#05080c]/80 backdrop-blur-2xl border-b border-[#c3c5d9]/30 dark:border-white/10 shadow-sm py-2"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex justify-between items-center h-14">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-4 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500 border border-white/10">
            <img
              alt="Saur Engineering Logo"
              className="h-full w-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg-eIOcYbNl5EtJBHCC8uYaSd0UU3u5xmzgOBdTHdYmLMlrRTM2W7N_Fv7Xgn4BvpNqnBPs7cyOjG6yWEhldnW8CJ1OP5zg4-LGayTW8ZJPUYRitVyPeJJnbTzvw1EvdOvhaqNrXZJV4DOCDSNvdya34ZEfmwAF9zVMQU30QXdFwbNNSi7VlYdc-R6O5U2uTU5y1zWDbPrADg9Woyb5ShGGhcyUkEZDxaBuyhEMJkubwObQ7KvOHA"
            />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-display text-lg font-bold tracking-tighter uppercase transition-colors duration-500",
              scrolled ? "text-[#1a1c1b] dark:text-white" : "text-white"
            )}>
              Saur Engineering
            </span>
            <span className={cn(
              "text-[9px] tracking-[0.2em] font-mono uppercase -mt-0.5 transition-colors duration-500",
              scrolled ? "text-[#FF8A00] dark:text-[#FF8A00]" : "text-[#FF8A00]"
            )}>
              & Consultancy
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "font-sans text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors duration-300 relative group",
                scrolled ? "text-[#424656] hover:text-[#0049cc] dark:text-white/70 dark:hover:text-white" : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8A00] dark:bg-[#FF8A00] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className={cn(
              "p-2.5 rounded-full transition-all duration-300 flex items-center justify-center border",
              scrolled 
                ? "text-[#1a1c1b] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 border-transparent" 
                : "text-white bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-md"
            )}
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="hidden md:flex relative overflow-hidden group bg-[#FF8A00] text-white px-7 py-3 rounded-md font-sans text-sm font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(255,138,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,138,0,0.4)] hover:-translate-y-0.5"
          >
            <span className="relative z-10">Get a Quote</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9A20] to-[#FF8A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={cn(
              "md:hidden p-2 rounded-full",
              scrolled ? "text-[#1a1c1b] dark:text-white" : "text-white"
            )}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: progressScaleX }}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#0049cc] via-[#0b5fff] to-[#1FA67A] transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#05080c] border-b border-[#c3c5d9]/30 dark:border-white/10 px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans text-xs font-bold uppercase tracking-widest text-[#1a1c1b] dark:text-white hover:text-[#0049cc] py-3 border-b border-[#eeeeec] dark:border-white/5"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#FF8A00] text-white px-6 py-4 rounded-md font-sans text-sm font-bold transition-colors mt-4"
            >
              Get a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
