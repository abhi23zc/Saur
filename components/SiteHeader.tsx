"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/company", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/expertise", label: "Expertise" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training" },
  { href: "/digital-workforce", label: "Digital Workforce" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return <header className="site-header">
    <div className="shell nav-row">
      <Link href="/" className="brand" aria-label="Saur Engineering & Consultancy home">
        <Image src="/images/saur.jpeg" alt="Saur Engineering & Consultancy" width={54} height={54} priority />
        <span><strong>SAUR</strong><small>Engineering & Consultancy</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
      </nav>
      <div className="nav-actions">
        <Link className="button button-primary desktop-only" href="/contact">Get a Quote <span>↗</span></Link>
        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav shell" aria-label="Mobile navigation">
      {[...links, { href: "/contact", label: "Contact" }].map((link) => <Link onClick={() => setOpen(false)} href={link.href} key={link.href}>{link.label}</Link>)}
    </nav>}
  </header>;
}
