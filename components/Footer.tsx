"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#05080c] relative w-full overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand & Newsletter */}
        <div className="md:col-span-5 mb-8 md:mb-0">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <img
              alt="Saur Engineering Logo"
              className="h-12 w-12 object-cover rounded-xl"
              src="/images/saur.jpeg"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-white uppercase tracking-tight leading-tight">
                Saur Engineering
              </span>
              <span className="text-[9px] tracking-[0.2em] font-mono uppercase text-[#FF8A00] leading-tight">
                & Consultancy
              </span>
            </div>
          </Link>
          <p className="font-sans text-sm text-white/60 mb-6 pr-8 leading-relaxed">
            Reliable Engineering. Sustainable Design. Proven Results. IMS Certified (ISO 9001 · 14001 · 45001) &amp; DPIIT Recognized.
          </p>

          {/* Newsletter Input */}
          <div className="max-w-md">
            <span className="font-mono text-xs text-[#FF8A00] font-bold uppercase tracking-wider block mb-2">
              Subscribe to Saur Technical Dispatch
            </span>
            {subscribed ? (
              <div className="bg-[#FF8A00]/10 border border-[#FF8A00] text-[#FF8A00] px-4 py-2.5 rounded-xl font-sans text-xs font-semibold">
                ✓ Subscribed to quarterly engineering whitepapers.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter enterprise email..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-sans text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF8A00]"
                />
                <button
                  type="submit"
                  className="bg-[#FF8A00] text-white px-5 py-2 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffaa44] transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <p className="font-sans text-xs text-white/40 mt-8">
            © {new Date().getFullYear()} Saur Engineering & Consultancy. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { label: "About Us", href: "/company" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-white/60 hover:text-[#FF8A00] transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-4">
              {[
                { label: "FEED & Detail Engineering", href: "/services" },
                { label: "Workforce Solutions", href: "/digital-workforce#workforce" },
                { label: "Domain & SME Support", href: "/digital-workforce#domain" },
                { label: "Training & Development", href: "/training" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-white/60 hover:text-[#FF8A00] transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-wider">
              Capabilities
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Engineering Expertise", href: "/expertise" },
                { label: "Technology & Software", href: "/technology" },
                { label: "OT Security (IEC 62443)", href: "/digital-workforce#ot-security" },
                { label: "Company Profile (PDF)", href: "/media/saur-company-profile.pdf" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-white/60 hover:text-[#FF8A00] transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">Mumbai · Chennai</span>
            <a href="https://www.linkedin.com/company/saur-engineering-consultancy" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-white/30 uppercase tracking-wider hover:text-[#FF8A00] transition-colors">
              LinkedIn
            </a>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">www.saurengineering.in</span>
          </div>
          <Link href="/privacy" className="font-mono text-[10px] text-white/30 uppercase tracking-wider hover:text-[#FF8A00] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
