"use client";

import { useState } from "react";
import Icon from "./Icon";
import { experience } from "@/data/profile";

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ol className="space-y-3">
      {experience.map((job, i) => {
        const isOpen = open === i;
        const current = job.end === "Present";
        return (
          <li
            key={job.company}
            style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            className={`reveal overflow-hidden rounded-[28px] transition-colors duration-300 ${
              isOpen ? "bg-surface-high" : "bg-surface-low"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`job-${i}`}
              className="state flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-7"
            >
              <span
                className={`display grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-bold ${
                  current ? "bg-primary text-on-primary" : "bg-secondary-container text-on-secondary-container"
                }`}
                aria-hidden
              >
                {job.company[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold sm:text-xl">{job.role}</span>
                <span className="block text-on-surface-variant">
                  {job.company}
                  <span className="sm:hidden">
                    , {job.start} – {job.end}
                  </span>
                </span>
              </span>
              <span className="hidden shrink-0 text-sm text-on-surface-variant tabular-nums sm:block">
                {job.start} – {job.end}
              </span>
              {current && (
                <span className="hidden shrink-0 rounded-lg bg-tertiary-container px-2.5 py-1 text-xs font-medium text-on-tertiary-container lg:block">
                  Current
                </span>
              )}
              <Icon
                name="expand"
                className={`h-6 w-6 shrink-0 text-on-surface-variant transition-transform duration-300 ease-emphasized ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* grid-rows trick animates height to auto */}
            <div
              id={`job-${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-emphasized ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2.5 px-5 pb-6 sm:pl-[6.25rem] sm:pr-7">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-on-surface-variant">
                      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
