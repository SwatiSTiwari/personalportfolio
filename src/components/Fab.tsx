"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

// Extended FAB: shows its label at the top or while scrolling up, collapses to an icon while scrolling down
export default function Fab() {
  const [extended, setExtended] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setExtended(y < 80 || y < last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#contact"
      aria-label="Hire me"
      className="state fixed right-4 bottom-28 z-40 flex h-14 items-center rounded-2xl bg-primary-container pl-4 text-on-primary-container shadow-[0_6px_16px_-4px_rgba(40,30,140,0.35)] transition-[padding] duration-300 ease-emphasized sm:right-6 md:bottom-6"
      style={{ paddingRight: extended ? "1.25rem" : "1rem" }}
    >
      <Icon name="send" className="h-6 w-6 shrink-0" />
      <span
        className="overflow-hidden font-medium whitespace-nowrap transition-all duration-300 ease-emphasized"
        style={{ maxWidth: extended ? "7rem" : 0, marginLeft: extended ? "0.75rem" : 0, opacity: extended ? 1 : 0 }}
      >
        Hire me
      </span>
    </a>
  );
}
