"use client";

import { useEffect } from "react";

// Adds `.in` to every `.reveal` element once it scrolls into view
export default function Reveals() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    const watch = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => observer.observe(el));
    watch();
    // Project cards re-render when filters change, so pick up new nodes too
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
