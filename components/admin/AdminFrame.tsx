import Link from "next/link";
import { LogOut, ExternalLink, FileText, LayoutDashboard, Globe } from "lucide-react";

export default function AdminFrame({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 flex flex-col justify-between">
      {/* Executive Admin Header */}
      <header className="sticky top-0 z-40 border-b border-[#0b233a]/80 bg-[#0b233a] text-white shadow-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-3.5 sm:px-6 md:px-8 lg:px-12 py-3">
          
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <Link href="/admin" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#FF8A00] text-white flex items-center justify-center font-display font-extrabold text-base shadow-sm">
                S
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1 truncate">
                  SAUR <span className="text-[#FF8A00] font-normal">EDITORIAL</span>
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-slate-300 truncate">
                  Insights Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-white/15">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/10 flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/blog"
                target="_blank"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Public Blog</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
              <Link
                href="/"
                target="_blank"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Main Site</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </nav>
          </div>

          {/* Right User Capsule & Sign Out */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono shrink-0">
            {/* User Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate max-w-[160px] font-semibold">{email}</span>
            </div>

            {/* Sign Out Button */}
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-white border border-red-500/30 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                title="Sign out of administration"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">Sign Out</span>
              </button>
            </form>
          </div>

        </div>

        {/* Mobile Navigation Sub-Bar */}
        <div className="md:hidden flex items-center justify-between border-t border-white/10 px-3.5 py-2 bg-black/20 text-[11px] font-mono">
          <Link
            href="/admin"
            className="flex items-center gap-1 text-white font-bold"
          >
            <LayoutDashboard className="w-3 h-3 text-[#FF8A00]" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center gap-1 text-slate-300 hover:text-white"
          >
            <FileText className="w-3 h-3 text-slate-400" />
            <span>Public Blog</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1 text-slate-300 hover:text-white"
          >
            <Globe className="w-3 h-3 text-slate-400" />
            <span>Main Site</span>
          </Link>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="mx-auto w-full max-w-[1440px] px-3 sm:px-6 md:px-8 lg:px-12 py-5 sm:py-8 flex-1">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs font-mono text-slate-500">
        <div className="mx-auto max-w-[1440px] px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Saur Engineering &amp; Consultancy • Internal Editorial Suite</span>
          <span className="text-slate-400">ISO 9001:2015 Verified Delivery Systems</span>
        </div>
      </footer>
    </div>
  );
}
