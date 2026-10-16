"use client";
export default function AdminError({ reset }: { reset: () => void }) {
  return <main className="mx-auto max-w-xl px-6 py-24 text-[#0b233a]"><h1 className="text-3xl font-bold">The workspace could not load.</h1><p className="my-6 text-slate-600">Please check your connection and try again. Your saved articles are still in the database.</p><button className="cms-primary" onClick={reset}>Try again</button></main>;
}
