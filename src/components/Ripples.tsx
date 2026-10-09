"use client";

import { useEffect } from "react";

// One document listener gives every `.state` element a Material ripple,
// so server-rendered links and buttons get it without becoming client components.
export default function Ripples() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onDown = (e: PointerEvent) => {
      const host = (e.target as Element | null)?.closest<HTMLElement>(".state");
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const size = Math.hypot(rect.width, rect.height) * 2;
      const wave = document.createElement("span");
      wave.className = "ripple-wave";
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${e.clientX - rect.left - size / 2}px`;
      wave.style.top = `${e.clientY - rect.top - size / 2}px`;
      host.appendChild(wave);
      wave.addEventListener("animationend", () => wave.remove());
    };

    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return null;
}
