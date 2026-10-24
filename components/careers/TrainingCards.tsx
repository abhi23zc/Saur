"use client";

import { useState } from "react";
import { ArrowRight, Boxes, Compass, Cpu, FileSpreadsheet, Layers, Zap } from "lucide-react";
import { trainingProgrammes, type TrainingProgramme } from "@/lib/careers/training";
import CourseDialog from "./CourseDialog";

const icons = [Layers, Compass, Boxes, Cpu, Zap, FileSpreadsheet];
const tones = [
  "bg-[#0b233a] text-white", "bg-[#f3f5f7] text-[#0b233a]", "bg-[#d98a16] text-[#0b233a]",
  "bg-[#eef2f6] text-[#0b233a]", "bg-[#0b233a] text-white", "bg-[#f3f5f7] text-[#0b233a]",
];

export default function TrainingCards() {
  const [selected, setSelected] = useState<TrainingProgramme | null>(null);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trainingProgrammes.map((course, index) => {
          const Icon = icons[index];
          return (
            <button
              type="button"
              key={course.id}
              onClick={() => setSelected(course)}
              aria-haspopup="dialog"
              aria-label={`View ${course.title} course details`}
              className={`${tones[index]} group relative flex min-h-[245px] flex-col overflow-hidden border border-[#0b233a]/15 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b5000] motion-reduce:transform-none`}
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-7 text-9xl font-bold opacity-[0.07]">{course.number}</span>
              <span className="relative flex w-full items-center justify-between">
                <span className="font-mono text-[11px] font-bold tracking-[.18em] opacity-80">{course.number}</span>
                <Icon className="h-7 w-7 opacity-80" aria-hidden="true" />
              </span>
              <span className="relative mb-3 mt-10 block max-w-[19rem] text-2xl font-bold leading-tight">{course.title}</span>
              <span className="relative mt-auto flex w-full items-end justify-between gap-5 border-t border-current/25 pt-4">
                <span className="max-w-[18rem] text-sm leading-relaxed opacity-90">{course.description}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-current/40 transition group-hover:bg-current/10"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </span>
            </button>
          );
        })}
      </div>
      {selected && <CourseDialog key={selected.id} course={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
