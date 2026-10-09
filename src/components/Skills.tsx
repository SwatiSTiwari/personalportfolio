"use client";

import Icon from "./Icon";
import { filterProjects, projectTech } from "./Projects";
import { skills } from "@/data/profile";

// Chips for tools used in a project jump to the filtered project list
export default function Skills() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((s, i) => (
        <div
          key={s.group}
          style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
          className="reveal rounded-[28px] bg-surface-low p-6"
        >
          <h3 className="mb-4 text-lg font-semibold">{s.group}</h3>
          <ul className="flex flex-wrap gap-2">
            {s.items.map((item) => {
              const linked = projectTech.includes(item);
              return (
                <li key={item}>
                  {linked ? (
                    <button
                      type="button"
                      onClick={() => filterProjects(item)}
                      title={`Show projects built with ${item}`}
                      className="state flex h-9 items-center gap-1.5 rounded-lg bg-secondary-container pr-3 pl-2.5 text-sm font-medium text-on-secondary-container"
                    >
                      <Icon name="code" className="h-4 w-4" />
                      {item}
                    </button>
                  ) : (
                    <span className="flex h-9 items-center rounded-lg border border-outline-variant px-3 text-sm text-on-surface-variant">
                      {item}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
