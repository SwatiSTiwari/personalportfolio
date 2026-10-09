"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Icon, { type IconName } from "./Icon";

const items: { id: string; label: string; icon: IconName }[] = [
  { id: "top", label: "Home", icon: "home" },
  { id: "work", label: "Work", icon: "work" },
  { id: "projects", label: "Projects", icon: "code" },
  { id: "skills", label: "Skills", icon: "build" },
  { id: "contact", label: "Contact", icon: "mail" },
];

function useActiveSection() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

function subscribeTheme(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  mq.addEventListener("change", cb);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", cb);
  };
}

function getTheme() {
  const set = document.documentElement.dataset.theme;
  if (set === "dark" || set === "light") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "light");
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
      aria-label={`Switch to ${next} theme`}
      className="state grid h-10 w-10 place-items-center rounded-full text-on-surface-variant"
    >
      <Icon name={theme === "dark" ? "light" : "dark"} />
    </button>
  );
}

export default function Navigation() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top app bar: tints to surface-container once content scrolls under it */}
      <header
        className={`sticky top-0 z-30 transition-colors duration-300 ${scrolled ? "bg-surface-mid/90 backdrop-blur-lg" : "bg-surface"}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="display text-lg font-semibold">
            Swati Tiwari
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 rounded-full bg-surface-high p-1 md:flex">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`state rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-emphasized ${
                  active === item.id
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
        <div className="progress h-[3px] rounded-r-full bg-primary" aria-hidden />
      </header>

      {/* Bottom navigation bar on phones */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 bg-surface-mid/95 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-lg md:hidden"
      >
        {items.map((item) => {
          const on = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={on ? "true" : undefined}
              className="group flex flex-col items-center gap-1 text-xs font-medium"
            >
              <span
                className={`state grid h-8 w-16 place-items-center rounded-full transition-all duration-300 ease-emphasized ${
                  on ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
                }`}
              >
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <span className={on ? "text-on-surface" : "text-on-surface-variant"}>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
