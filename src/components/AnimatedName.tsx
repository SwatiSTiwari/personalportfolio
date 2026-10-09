"use client";

import { useRef } from "react";

// Each letter is its own span so the variable font's weight/width axes can react to the cursor
export default function AnimatedName({ text }: { text: string }) {
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  const onMove = (e: React.PointerEvent) => {
    for (const el of letters.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const dist = Math.abs(e.clientX - (r.left + r.width / 2)) + Math.abs(e.clientY - (r.top + r.height / 2)) * 0.5;
      const pull = Math.max(0, 1 - dist / 220);
      el.style.setProperty("--w", String(800 + pull * 200));
      el.style.setProperty("--x", String(100 + pull * 25));
    }
  };

  const onLeave = () => {
    for (const el of letters.current) {
      el?.style.removeProperty("--w");
      el?.style.removeProperty("--x");
    }
  };

  let n = 0;
  return (
    <span onPointerMove={onMove} onPointerLeave={onLeave} aria-label={text} className="block">
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {[...word].map((ch) => {
            const i = n++;
            return (
              <span
                key={i}
                ref={(el) => {
                  letters.current[i] = el;
                }}
                className="name-letter"
                style={{ animationDelay: `${120 + i * 45}ms` }}
              >
                {ch}
              </span>
            );
          })}
          {wi < text.split(" ").length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
