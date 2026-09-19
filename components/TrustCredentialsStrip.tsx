import Link from "next/link";

export default function TrustCredentialsStrip() {
  return (
    <section className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 1 */}
          <Link
            href="/company#certificates"
            className="group flex items-center gap-3.5 lg:border-r lg:border-slate-200 lg:pr-6 hover:opacity-90 transition-opacity"
          >
            <div className="w-11 h-11 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 text-[#0b233a] bg-slate-50 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <div className="font-display text-sm font-bold tracking-wide uppercase text-[#0b233a] group-hover:text-[#FF8A00] transition-colors">
                ISO 9001:2015
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                QUALITY MANAGEMENT (IAF)
              </div>
            </div>
          </Link>

          {/* Item 2 */}
          <Link
            href="/company#certificates"
            className="group flex items-center gap-3.5 lg:border-r lg:border-slate-200 lg:pr-6 hover:opacity-90 transition-opacity"
          >
            <div className="w-11 h-11 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 text-[#0b233a] bg-slate-50 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
            <div>
              <div className="font-display text-sm font-bold tracking-wide uppercase text-[#0b233a] group-hover:text-[#FF8A00] transition-colors">
                ISO 14001 &amp; 45001
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                ENVIRONMENT &amp; HSE (UK)
              </div>
            </div>
          </Link>

          {/* Item 3 */}
          <Link
            href="/company#certificates"
            className="group flex items-center gap-3.5 lg:border-r lg:border-slate-200 lg:pr-6 hover:opacity-90 transition-opacity"
          >
            <div className="w-11 h-11 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 text-[#0b233a] bg-slate-50 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors">
              <span className="material-symbols-outlined text-2xl">flag</span>
            </div>
            <div>
              <div className="font-display text-sm font-bold tracking-wide uppercase text-[#0b233a] group-hover:text-[#FF8A00] transition-colors">
                DPIIT RECOGNIZED
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                GOVT. OF INDIA #STARTUPINDIA
              </div>
            </div>
          </Link>

          {/* Item 4 */}
          <Link
            href="/company#locations"
            className="group flex items-center gap-3.5 hover:opacity-90 transition-opacity"
          >
            <div className="w-11 h-11 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 text-[#0b233a] bg-slate-50 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] transition-colors">
              <span className="material-symbols-outlined text-2xl">public</span>
            </div>
            <div>
              <div className="font-display text-sm font-bold tracking-wide uppercase text-[#0b233a] group-hover:text-[#FF8A00] transition-colors">
                11 DISCIPLINES
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                MUMBAI HQ &amp; CHENNAI DELIVERY
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
