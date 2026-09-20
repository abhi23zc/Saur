import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const reason = (await searchParams).reason;

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0b233a] p-4 sm:p-6 overflow-hidden">
      {/* Blueprint Grid Backdrop */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      <section className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-200">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF8A00] text-white flex items-center justify-center font-display font-extrabold text-base shadow-sm">
              S
            </div>
            <span className="font-display text-base font-extrabold tracking-tight text-[#0b233a]">
              SAUR <span className="text-[#FF8A00]">EDITORIAL</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs font-mono text-slate-500 hover:text-[#0b233a] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Site</span>
          </Link>
        </div>

        {/* Title & Eyebrow */}
        <div className="pt-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
            <span className="font-mono text-[10px] text-[#FF8A00] font-bold uppercase tracking-[0.2em]">
              ADMINISTRATIVE ACCESS
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0b233a] tracking-tight">
            Sign in to publish.
          </h1>
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            Authorized Saur engineering editors and content leads only.
          </p>
        </div>

        {/* Alerts */}
        {reason === "not-configured" && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-orange-50 p-3 text-xs font-mono text-[#a45200] border border-orange-200"
          >
            Supabase credentials have not been configured for this deployment.
          </p>
        )}

        {reason === "unauthorized" && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-mono text-red-700 border border-red-200"
          >
            Your account is not authorized to access the editorial dashboard.
          </p>
        )}

        {/* Login Form */}
        <LoginForm />

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Role-Based Access Control Protected</span>
        </div>

      </section>
    </main>
  );
}

