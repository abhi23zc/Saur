"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-slate-200/50">
      <div
        className="h-full bg-gradient-to-r from-[#0b233a] via-[#FF8A00] to-[#FF8A00] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ArticleToc({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -60% 0%" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-28 space-y-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0b233a]">
          On This Page
        </p>
        <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={
                  (isActive
                    ? "text-[#e67c00] font-bold bg-orange-50/80 border-l-2 border-[#FF8A00] pl-2.5"
                    : "text-slate-600 hover:text-[#0b233a] hover:bg-slate-50") +
                  ` block py-1 text-xs leading-snug rounded-md transition-all ${
                    heading.level === 3 ? "pl-4 text-[11px]" : "pl-2 font-medium"
                  }`
                }
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export function ShareControls({ title }: { title?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function shareLinkedin() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "width=600,height=600");
  }

  function shareTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title || document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "width=600,height=600");
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/80 px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-700 transition-all cursor-pointer"
        title="Copy article link"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>
      <button
        onClick={shareLinkedin}
        className="p-2 rounded-full bg-slate-100 hover:bg-[#0077B5] hover:text-white border border-slate-200/80 text-slate-600 transition-all cursor-pointer"
        title="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63s1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z" />
        </svg>
      </button>
      <button
        onClick={shareTwitter}
        className="p-2 rounded-full bg-slate-100 hover:bg-black hover:text-white border border-slate-200/80 text-slate-600 transition-all cursor-pointer"
        title="Share on X (Twitter)"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
    </div>
  );
}

export function ViewReporter({ id }: { id: string }) {
  useEffect(() => {
    fetch(`/api/articles/${id}/view`, { method: "POST", keepalive: true }).catch(() => undefined);
  }, [id]);
  return null;
}
