"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const { error: signInError } = await createClient().auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }
    router.push("/admin");
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="admin@saurengineering.in"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-xs sm:text-sm font-sans text-slate-900 outline-none focus:border-[#0b233a] focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            required
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-xs sm:text-sm font-sans text-slate-900 outline-none focus:border-[#0b233a] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-mono text-red-700 border border-red-200"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        disabled={loading}
        className="w-full rounded-xl bg-[#FF8A00] hover:bg-[#E67C00] active:scale-[0.98] px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[44px]"
      >
        <span>{loading ? "Verifying Credentials..." : "Sign In to Dashboard"}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

