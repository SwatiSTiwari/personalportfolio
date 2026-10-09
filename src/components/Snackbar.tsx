"use client";

import { useEffect, useState } from "react";

export function showSnackbar(message: string) {
  window.dispatchEvent(new CustomEvent("snackbar", { detail: message }));
}

export default function Snackbar() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onShow = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 3000);
    };
    window.addEventListener("snackbar", onShow);
    return () => {
      window.removeEventListener("snackbar", onShow);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-inverse-surface px-4 py-3.5 text-sm text-inverse-on-surface shadow-lg transition-all duration-300 ease-emphasized md:bottom-8 ${
        message ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
