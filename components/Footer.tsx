import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const navCol1 = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/company" },
    { label: "Services", href: "/services" },
    { label: "Expertise", href: "/expertise" },
    { label: "Projects", href: "/projects" },
  ];

  const navCol2 = [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Training", href: "/training" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="bg-[#05080c] relative w-full overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Brand & Credibility */}
        <div className="md:col-span-12 lg:col-span-4">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <img
              alt="Saur Engineering Logo"
              className="h-11 w-11 sm:h-12 sm:w-12 object-cover rounded-xl border border-white/10"
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
          <p className="font-sans text-xs sm:text-sm text-white/60 mb-6 pr-0 lg:pr-8 leading-relaxed font-light">
            Reliable Engineering. Sustainable Design. Proven Results. IMS Certified (ISO 9001 · 14001 · 45001) &amp; DPIIT Recognized engineering delivery partner.
          </p>

          <p className="font-sans text-xs text-white/40">
            © {new Date().getFullYear()} Saur Engineering &amp; Consultancy. All rights reserved.
          </p>
        </div>

        {/* Navigation (Clean 2-Column Grid) */}
        <div className="md:col-span-6 lg:col-span-4">
          <h4 className="font-sans text-xs font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider">
            Navigation
          </h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <ul className="space-y-3">
              {navCol1.map((item) => (
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
            <ul className="space-y-3">
              {navCol2.map((item) => (
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
        </div>

        {/* Contact Details */}
        <div className="md:col-span-6 lg:col-span-4">
          <h4 className="font-sans text-xs font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider">
            Contact Details
          </h4>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Phone numbers */}
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#FF8A00] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block mb-0.5">
                  Direct Inquiries
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <a
                    href="tel:+919967112295"
                    className="text-white/80 hover:text-[#FF8A00] transition-colors font-medium font-mono text-xs"
                  >
                    +91 99671 12295
                  </a>
                  <span className="text-white/20">|</span>
                  <a
                    href="tel:+918828612183"
                    className="text-white/80 hover:text-[#FF8A00] transition-colors font-medium font-mono text-xs"
                  >
                    +91 88286 12183
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#FF8A00] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block mb-0.5">
                  Email
                </span>
                <a
                  href="mailto:contact@saurengineering.in"
                  className="text-white/80 hover:text-[#FF8A00] transition-colors font-medium text-xs break-all"
                >
                  contact@saurengineering.in
                </a>
              </div>
            </div>

            {/* Offices */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#FF8A00] shrink-0 mt-0.5" />
              <div className="space-y-2.5">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block mb-0.5">
                    Navi Mumbai Delivery Centre
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    507, Real Tech Park, Sector 30A, Vashi, Navi Mumbai - 400703
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block mb-0.5">
                    Chennai Delivery Hub
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    No. 31, Kumaran Colony, 2nd St, Vadapalani, Chennai - 600026
                  </p>
                </div>
              </div>
            </div>
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
