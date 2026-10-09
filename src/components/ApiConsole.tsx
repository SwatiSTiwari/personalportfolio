"use client";

import { useEffect, useState } from "react";
import { profile, skills } from "@/data/profile";

const endpoints = {
  "/about": {
    name: profile.name,
    role: profile.role,
    focus: ["web apps", "APIs", "databases", "real-time"],
  },
  "/now": {
    company: profile.company,
    status: profile.status,
    open_to: "freelance & full-time roles",
  },
  "/stack": Object.fromEntries(skills.slice(0, 4).map((s) => [s.group.toLowerCase(), s.items.slice(0, 3)])),
  "/contact": {
    email: profile.email,
    github: "SwatiSTiwari",
  },
} as const;

type Path = keyof typeof endpoints;
const paths = Object.keys(endpoints) as Path[];

// Colour a (possibly half-typed) JSON string: keys, string values, punctuation
function highlight(json: string) {
  const parts: React.ReactNode[] = [];
  const re = /("(?:[^"\\]|\\.)*"?)(\s*:)?/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(json))) {
    if (m.index > last) parts.push(json.slice(last, m.index));
    parts.push(
      <span key={m.index} className={m[2] ? "text-[#c5c0ff]" : "text-[#82d5c7]"}>
        {m[1]}
      </span>,
    );
    if (m[2]) parts.push(m[2]);
    last = re.lastIndex;
  }
  parts.push(json.slice(last));
  return parts;
}

function useTyped(text: string) {
  const [state, setState] = useState({ text, count: text.length });
  const count = state.text === text ? state.count : 0;

  useEffect(() => {
    const step = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? text.length : 3;
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(text.length, n + step);
      setState({ text, count: n });
      if (n >= text.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [text]);

  return text.slice(0, count);
}

export default function ApiConsole() {
  const [path, setPath] = useState<Path>("/about");
  const typed = useTyped(JSON.stringify(endpoints[path], null, 2));

  return (
    <div className="rounded-3xl bg-console text-[#e5e1eb] shadow-[0_24px_48px_-24px_rgba(40,30,140,0.5)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 font-mono text-xs">
        <span className="text-white/50">~/swati</span>
        <span className="flex items-center gap-2 text-[#82d5c7]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#82d5c7]" aria-hidden />
          200 OK
        </span>
      </div>

      <div role="tablist" aria-label="Endpoints" className="flex flex-wrap gap-1.5 px-4 pt-4">
        {paths.map((p) => {
          const active = p === path;
          return (
            <button
              key={p}
              role="tab"
              aria-selected={active}
              aria-controls="api-response"
              onClick={() => setPath(p)}
              className={`state rounded-full px-3 py-1.5 font-mono text-[13px] transition-colors duration-200 ${
                active ? "bg-[#c5c0ff] text-[#170065]" : "text-white/60 hover:text-white"
              }`}
            >
              <span className={active ? "text-[#4b3fd6]" : "text-white/40"}>GET</span> {p}
            </button>
          );
        })}
      </div>

      <pre
        id="api-response"
        role="tabpanel"
        aria-live="polite"
        className="min-h-[15.5rem] overflow-x-auto px-5 pt-4 pb-6 font-mono text-[13px] leading-6 whitespace-pre"
      >
        <span className="text-white/40">$ curl {path}</span>
        {"\n"}
        {highlight(typed)}
        <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-white/70" aria-hidden />
      </pre>
    </div>
  );
}
