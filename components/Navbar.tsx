"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/company" },
    { name: "Services", href: "/services" },
    { name: "Expertise", href: "/expertise" },
    { name: "Projects", href: "/projects" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Training", href: "/training" },
    // { name: "Blog", href: "/blog" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 transition-all duration-300"
    >
      {/* Main Solid White Navbar */}
      <div className="w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs py-2">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 flex justify-between items-center h-14">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-xs border border-slate-200">
              <img
                alt="Saur Engineering Logo"
                className="h-full w-full object-cover"
                src="/images/saur.jpeg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-extrabold tracking-tight uppercase transition-colors duration-300 leading-tight text-[#0b233a]">
                SAUR
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.16em] font-sans font-semibold uppercase leading-tight text-slate-600">
                Engineering &amp; Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-sans text-xs uppercase tracking-[0.15em] font-bold transition-colors duration-200 relative py-1",
                  isActive(link.href)
                    ? "text-[#FF8A00]"
                    : "text-[#0b233a] hover:text-[#FF8A00]"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-[#FF8A00] transition-all duration-200",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-2 bg-[#FF8A00] hover:bg-[#E67C00] text-white px-5 py-2.5 rounded-md font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow"
            >
              Request Consultation
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 lg:hidden border border-slate-200"
              aria-label="Toggle Mobile Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Page Scroll Indicator */}
      <motion.div
        className="h-[2px] bg-[#FF8A00] origin-left"
        style={{ scaleX: progressScaleX }}
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-y-auto max-h-[calc(100vh-4.5rem)]"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block font-sans text-sm font-bold uppercase tracking-wider py-2 border-b border-slate-100",
                    isActive(link.href) ? "text-[#FF8A00]" : "text-[#0b233a] hover:text-[#FF8A00]"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full bg-[#FF8A00] text-white text-center py-3 rounded-md font-sans text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
