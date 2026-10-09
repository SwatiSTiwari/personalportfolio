"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";
import { projectFilters, projects } from "@/data/profile";

export function filterProjects(tech: string) {
  window.dispatchEvent(new CustomEvent("filter-projects", { detail: tech }));
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}

const techCounts = (() => {
  const counts = new Map<string, number>();
  for (const p of projects) for (const t of p.stack) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1]);
})();

export const projectTech = techCounts.map(([t]) => t);

// A short, hand-picked chip row; any other tag still filters from card tags or skill chips
const chipTech = projectFilters.filter((t) => projectTech.includes(t));

export default function Projects() {
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<string>).detail);
    window.addEventListener("filter-projects", onFilter);
    return () => window.removeEventListener("filter-projects", onFilter);
  }, []);

  const shown = useMemo(() => (filter ? projects.filter((p) => p.stack.includes(filter)) : projects), [filter]);

  return (
    <>
      <div role="group" aria-label="Filter projects by technology" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[null, ...chipTech, ...(filter && !chipTech.includes(filter) ? [filter] : [])].map((t) => {
          const on = filter === t;
          return (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(t)}
              className={`state flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors duration-200 ${
                on
                  ? "border-transparent bg-secondary-container pl-2 text-on-secondary-container"
                  : "border-outline-variant text-on-surface-variant"
              }`}
            >
              {on && <Icon name="check" className="h-[18px] w-[18px]" />}
              {t ?? "All"}
            </button>
          );
        })}
      </div>

      <ul key={filter ?? "all"} className="grid gap-4 md:grid-cols-2">
        {shown.map((p, i) => {
          const featured = !!p.featured;
          const regular = shown.filter((x) => !x.featured);
          const orphan = !featured && regular.length % 2 === 1 && p === regular[regular.length - 1];
          const tone =
            p.name === projects[0].name
              ? "bg-primary-container text-on-primary-container"
              : "bg-tertiary-container text-on-tertiary-container";
          return (
            <li
              key={p.name}
              className={`rise flex flex-col rounded-[28px] p-6 transition-transform duration-500 ease-spring hover:-translate-y-1 sm:p-8 ${
                featured ? `${tone} md:col-span-2 md:min-h-[20rem]` : `bg-surface-high ${orphan ? "md:col-span-2" : ""}`
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {p.label && (
                <span className="mb-4 w-fit rounded-lg bg-surface/70 px-2.5 py-1 text-xs font-medium">{p.label}</span>
              )}
              <h3
                className={`display font-bold tracking-tight ${
                  featured ? "text-[clamp(2.5rem,6vw,4.5rem)] leading-none" : "text-2xl sm:text-3xl"
                }`}
              >
                {p.name}
              </h3>
              <p className={`mt-3 max-w-xl ${featured ? "text-lg" : "text-on-surface-variant"}`}>{p.summary}</p>
              {p.highlights && (
                <ul className="mt-6 grid gap-x-8 gap-y-2.5 md:grid-cols-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                <ul className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <li key={t}>
                      <button
                        type="button"
                        onClick={() => setFilter(t)}
                        className={`state rounded-lg px-2.5 py-1 text-xs font-medium ${
                          featured ? "bg-surface/60" : "bg-surface"
                        } ${t === filter ? "ring-2 ring-primary" : ""}`}
                      >
                        {t}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="state flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-on-primary"
                    >
                      <Icon name="open" className="h-[18px] w-[18px]" />
                      Live site
                    </a>
                  )}
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      className={`state flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium ${
                        featured ? "border-current/30" : "border-outline"
                      }`}
                    >
                      <Icon name="code" className="h-[18px] w-[18px]" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
