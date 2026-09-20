import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#05080c] relative w-full overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Brand & Newsletter */}
        <div className="md:col-span-5 mb-4 md:mb-0">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <img
              alt="Saur Engineering Logo"
              className="h-11 w-11 sm:h-12 sm:w-12 object-cover rounded-xl"
              src="/images/saur.jpeg"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-white uppercase tracking-tight leading-tight">
                Saur Engineering
              </span>
              <span className="text-[9px] tracking-[0.2em] font-mono uppercase text-[#FF8A00] leading-tight">
                &amp; Consultancy
              </span>
            </div>
          </Link>
          <p className="font-sans text-xs sm:text-sm text-white/60 mb-6 pr-0 md:pr-8 leading-relaxed">
            Reliable Engineering. Sustainable Design. Proven Results. IMS Certified (ISO 9001 · 14001 · 45001) &amp; DPIIT Recognized.
          </p>

          <p className="font-sans text-xs text-white/40 mt-6 sm:mt-8">
            © {new Date().getFullYear()} Saur Engineering &amp; Consultancy. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { label: "About Us", href: "/company" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Projects", href: "/projects" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-xs sm:text-sm text-white/60 hover:text-[#FF8A00] transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "FEED & Detail Engineering",
                "Workforce Solutions",
                "Domain & SME Support",
                "Training & Development",
              ].map((label) => (
                <li key={label}>
                  <span className="font-sans text-xs sm:text-sm text-white/60 block cursor-default">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider">
              Capabilities
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Engineering Expertise",
                "Technology & Software",
                "OT Security (IEC 62443)",
                "Company Profile (PDF)",
              ].map((label) => (
                <li key={label}>
                  <span className="font-sans text-xs sm:text-sm text-white/60 block cursor-default">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 py-4 sm:py-6 flex flex-wrap justify-between items-center gap-3 sm:gap-4">
          <div className="flex flex-wrap gap-4 sm:gap-6">
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
