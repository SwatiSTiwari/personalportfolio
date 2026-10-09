const items = ["Next.js", "React", "Node.js", "Express", "TypeScript", "MongoDB", "PostgreSQL", "Socket.io", "Docker", "AWS", "Redis", "Tailwind CSS"];

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 shrink-0 text-primary sm:h-8 sm:w-8">
      <path
        fill="currentColor"
        d="M12 0c.7 5.8 3.6 10.3 12 12-8.4 1.7-11.3 6.2-12 12-.7-5.8-3.6-10.3-12-12C8.4 10.3 11.3 5.8 12 0z"
      />
    </svg>
  );
}

// Two identical halves slide by -50% for a seamless loop
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 sm:gap-10">
          <span className="display text-3xl font-bold whitespace-nowrap sm:text-5xl">{t}</span>
          <Star />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee group relative -mx-4 overflow-hidden py-6 sm:-mx-6" aria-label="Technologies I use">
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
