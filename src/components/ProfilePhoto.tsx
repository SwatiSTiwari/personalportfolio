"use client";

import { useEffect, useState } from "react";

// Material 3 Expressive shapes as polar curves on a 100×100 box.
// Every shape uses the same point count so the browser can interpolate between them.
const POINTS = 144;
function polar(r: (t: number) => number) {
  let d = "";
  for (let i = 0; i < POINTS; i++) {
    const t = (i / POINTS) * Math.PI * 2;
    const x = 50 + r(t) * Math.cos(t);
    const y = 50 + r(t) * Math.sin(t);
    d += `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d + "Z";
}

const shapes = [
  { name: "cookie", d: polar((t) => 45 + 4 * Math.cos(9 * t)) },
  { name: "clover", d: polar((t) => 40 + 9 * Math.cos(4 * t + Math.PI / 4)) },
  { name: "sunny", d: polar((t) => 45.5 + 3 * Math.cos(12 * t)) },
  { name: "circle", d: polar(() => 48) },
];

export default function ProfilePhoto({ src, name }: { src: string | null; name: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % shapes.length), 3500);
    return () => clearInterval(id);
  }, [paused]);
  const shape = shapes[i];
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      {/* Slow-turning tonal shape behind the photo */}
      <svg viewBox="0 0 100 100" aria-hidden className="spin-slow absolute inset-0 h-full w-full scale-[1.08] text-tertiary-container">
        <path d={shapes[0].d} fill="currentColor" />
      </svg>

      <button
        type="button"
        onClick={() => setI((n) => (n + 1) % shapes.length)}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-label={`Photo of ${name}. Change frame shape (now ${shape.name})`}
        className="group relative block h-full w-full rounded-full transition-transform duration-500 ease-spring hover:scale-[1.03] active:scale-95"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <clipPath id="photo-shape">
              <path
                d={shape.d}
                style={{ d: `path("${shape.d}")`, transition: "d 700ms cubic-bezier(0.34, 1.3, 0.5, 1)" } as React.CSSProperties}
              />
            </clipPath>
          </defs>
          <g clipPath="url(#photo-shape)">
            {src ? (
              <image href={src} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
            ) : (
              <>
                <rect width="100" height="100" className="fill-primary-container" />
                <text
                  x="50"
                  y="50"
                  dominantBaseline="central"
                  textAnchor="middle"
                  className="display fill-on-primary-container text-[30px] font-bold"
                >
                  {initials}
                </text>
              </>
            )}
          </g>
        </svg>
      </button>

      <span className="float pointer-events-none absolute right-2 bottom-6 flex items-center gap-2 rounded-full bg-surface-low px-3.5 py-2 text-sm font-medium shadow-md ring-1 ring-outline-variant sm:-right-4">
        <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden />
        Tap to reshape
      </span>
    </div>
  );
}
