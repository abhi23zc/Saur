"use client";

import { useState } from "react";

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
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand & Newsletter */}
        <div className="md:col-span-5 mb-8 md:mb-0">
          <span className="font-display text-2xl font-bold text-white mb-4 block uppercase tracking-tighter">
            SAUR ENGINEERING & CONSULTANCY
          </span>
          <p className="font-sans text-sm text-white/60 mb-6 pr-8 leading-relaxed">
            Architecting the backbone of global industry through technical excellence and relentless innovation.
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
            © {new Date().getFullYear()} Saur Engineering & Consultancy. Engineering Excellence Defined.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-4">
              {["Global Offices", "Legal Compliance", "Privacy Architecture", "Careers & Fellows"].map((item) => (
                <li key={item}>
                  <a
                    href="#global-footprint"
                    className="font-sans text-sm text-white/60 hover:text-[#FF8A00] transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-wider">
              Capabilities
            </h4>
            <ul className="space-y-4">
              {["Mechanical Systems", "Subsea Robotics", "Process Engineering", "Digital Twin Lab"].map((item) => (
                <li key={item}>
                  <a
                    href="#disciplines"
                    className="font-sans text-sm text-white/60 hover:text-[#FF8A00] transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-wider">
              Intelligence
            </h4>
            <ul className="space-y-4">
              {["Technical Whitepapers", "Case Studies", "Lifecycle Framework", "Safety Protocols"].map((item) => (
                <li key={item}>
                  <a
                    href="#whitepapers"
                    className="font-sans text-sm text-white/60 hover:text-[#FF8A00] transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
