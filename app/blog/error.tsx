"use client";
export default function BlogError({ reset }: { reset: () => void }) {
  return <main className="journal"><div className="journal-shell"><h1 className="text-3xl font-bold">Insights are temporarily unavailable.</h1><p className="my-6">Please try again in a moment.</p><button className="journal-text-link" onClick={reset}>Try again ↗</button></div></main>;
}
