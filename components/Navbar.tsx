"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenSearch, onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
    { name: "Home", href: "/" },
    { name: "About", href: "/company" },
    { name: "Services", href: "/services" },
    { name: "Expertise", href: "/expertise" },
    { name: "Projects", href: "/projects" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Training", href: "/training" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // On inner pages the navbar should always appear scrolled (opaque)
  const showScrolledStyle = scrolled || !isHome;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 transition-all duration-300"
    >

      {/* Main Navbar */}
      <div className={cn(
        "w-full transition-all duration-300",
        showScrolledStyle
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs py-2"
          : "bg-white/90 lg:bg-transparent py-4"
      )}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex justify-between items-center h-14">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-xs border border-slate-200">
              <img
                alt="Saur Engineering Logo"
                className="h-full w-full object-cover"
                src="/images/saur.jpeg"
              />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-display text-lg font-extrabold tracking-tight uppercase transition-colors duration-300 leading-tight",
                showScrolledStyle ? "text-[#0b233a]" : "text-[#0b233a] lg:text-white"
              )}>
                SAUR
              </span>
              <span className={cn(
                "text-[10px] tracking-[0.16em] font-sans font-semibold uppercase leading-tight",
                showScrolledStyle ? "text-slate-600" : "text-slate-600 lg:text-slate-200"
              )}>
                Engineering & Consultancy
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
                    : showScrolledStyle
                    ? "text-[#0b233a] hover:text-[#FF8A00]"
                    : "text-[#0b233a] lg:text-white/90 lg:hover:text-white"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-[#FF8A00] transition-all duration-200",
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className={cn(
                "p-2 rounded-lg transition-all duration-200 flex items-center justify-center border",
                showScrolledStyle
                  ? "text-slate-700 hover:bg-slate-100 border-slate-200 bg-white"
                  : "text-slate-800 lg:text-white bg-white/10 hover:bg-white/20 border-slate-200 lg:border-white/20 backdrop-blur-md"
              )}
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className={cn(
                "hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200",
                showScrolledStyle
                  ? "border border-[#0b233a] text-[#0b233a] hover:bg-[#0b233a] hover:text-white"
                  : "bg-[#FF8A00] text-white hover:bg-[#E67C00] shadow-xs"
              )}
            >
              Request Consultation
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                showScrolledStyle ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: progressScaleX }}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#FF9A20] via-[#FF8A00] to-[#ffaa44] transition-opacity duration-500",
          showScrolledStyle ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#05080c] border-b border-[#c3c5d9]/30 dark:border-white/10 px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "font-sans text-xs font-bold uppercase tracking-widest py-3 border-b border-[#eeeeec] dark:border-white/5",
                    isActive(link.href)
                      ? "text-[#FF8A00]"
                      : "text-[#1a1c1b] dark:text-white hover:text-[#FF8A00]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/digital-workforce"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-xs font-bold uppercase tracking-widest text-[#1a1c1b] dark:text-white hover:text-[#FF8A00] py-3 border-b border-[#eeeeec] dark:border-white/5"
              >
                Workforce & Domain
              </Link>
              <Link
                href="/technology"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-xs font-bold uppercase tracking-widest text-[#1a1c1b] dark:text-white hover:text-[#FF8A00] py-3 border-b border-[#eeeeec] dark:border-white/5"
              >
                Technology
              </Link>
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
