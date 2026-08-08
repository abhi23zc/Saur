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
    <footer className="bg-[#eeeeec] dark:bg-[#1a1c1b] relative w-full overflow-hidden border-t border-[#c3c5d9]/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand & Newsletter */}
        <div className="md:col-span-5 mb-8 md:mb-0">
          <span className="font-display text-2xl font-bold text-[#1a1c1b] mb-4 block uppercase tracking-tighter">
            AXON ENGINEERING
          </span>
          <p className="font-sans text-sm text-[#424656] mb-6 pr-8 leading-relaxed">
            Architecting the backbone of global industry through technical excellence and relentless innovation.
          </p>

          {/* Newsletter Input */}
          <div className="max-w-md">
            <span className="font-mono text-xs text-[#0049cc] font-bold uppercase tracking-wider block mb-2">
              Subscribe to Axon Technical Dispatch
            </span>
            {subscribed ? (
              <div className="bg-[#1FA67A]/10 border border-[#1FA67A] text-[#1FA67A] px-4 py-2.5 rounded-xl font-sans text-xs font-semibold">
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
                  className="flex-1 bg-white border border-[#c3c5d9]/60 rounded-xl px-4 py-2 text-xs font-sans text-[#1a1c1b] focus:outline-none focus:border-[#0049cc]"
                />
                <button
                  type="submit"
                  className="bg-[#0049cc] text-white px-5 py-2 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#0b5fff] transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <p className="font-sans text-xs text-[#737687] mt-8">
            © {new Date().getFullYear()} Axon Global Consulting. Engineering Excellence Defined.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-sans text-xs font-bold text-[#1a1c1b] mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-4">
              {["Global Offices", "Legal Compliance", "Privacy Architecture", "Careers & Fellows"].map((item) => (
                <li key={item}>
                  <a
                    href="#global-footprint"
                    className="font-sans text-sm text-[#565f70] hover:text-[#0049cc] transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold text-[#1a1c1b] mb-6 uppercase tracking-wider">
              Capabilities
            </h4>
            <ul className="space-y-4">
              {["Mechanical Systems", "Subsea Robotics", "Process Engineering", "Digital Twin Lab"].map((item) => (
                <li key={item}>
                  <a
                    href="#disciplines"
                    className="font-sans text-sm text-[#565f70] hover:text-[#0049cc] transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold text-[#1a1c1b] mb-6 uppercase tracking-wider">
              Intelligence
            </h4>
            <ul className="space-y-4">
              {["Technical Whitepapers", "Case Studies", "Lifecycle Framework", "Safety Protocols"].map((item) => (
                <li key={item}>
                  <a
                    href="#whitepapers"
                    className="font-sans text-sm text-[#565f70] hover:text-[#0049cc] transition-colors block"
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
