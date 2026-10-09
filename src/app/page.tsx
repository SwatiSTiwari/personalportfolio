import ApiConsole from "@/components/ApiConsole";
import CopyEmail from "@/components/CopyEmail";
import Experience from "@/components/Experience";
import AnimatedName from "@/components/AnimatedName";
import Fab from "@/components/Fab";
import Marquee from "@/components/Marquee";
import Icon from "@/components/Icon";
import Navigation from "@/components/Navigation";
import ProfilePhoto from "@/components/ProfilePhoto";
import Projects from "@/components/Projects";
import Reveals from "@/components/Reveals";
import Ripples from "@/components/Ripples";
import Skills from "@/components/Skills";
import Snackbar from "@/components/Snackbar";
import profilePhoto from "@/assets/profile.jpg";
import { profile, services } from "@/data/profile";

// Each service card gets its own tonal container so the grid doesn't read as four identical boxes
const serviceTones = [
  "bg-primary-container text-on-primary-container",
  "bg-tertiary-container text-on-tertiary-container",
  "bg-secondary-container text-on-secondary-container",
  "bg-surface-highest text-on-surface",
];

function SectionHeading({ id, title, note }: { id: string; title: string; note?: string }) {
  return (
    <div className="reveal mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <h2 id={id} className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-bold tracking-tight">
        {title}
      </h2>
      {note && <p className="max-w-sm text-on-surface-variant">{note}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Ripples />
      <Reveals />
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 pb-32 sm:px-6 md:pb-16">
        {/* Hero */}
        <section
          id="top"
          aria-label="Introduction"
          className="grid items-center gap-12 pt-10 pb-20 md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-28 [&>*]:min-w-0"
        >
          <div className="order-2 lg:order-1">
            <p className="rise mb-6 inline-flex items-center gap-2 rounded-lg border border-outline-variant py-1.5 pr-3 pl-2.5 text-sm text-on-surface-variant">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inset-0 animate-ping rounded-full bg-tertiary opacity-60 motion-reduce:hidden" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-tertiary" />
              </span>
              {profile.status}
            </p>
            <h1 className="display text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.035em]">
              <AnimatedName text={profile.name} />
            </h1>
            <p
              className="rise mt-6 max-w-[36ch] text-xl leading-snug text-on-surface-variant sm:text-2xl"
              style={{ animationDelay: "160ms" }}
            >
              {profile.intro}
            </p>
            <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <a
                href={`mailto:${profile.email}`}
                className="state flex h-12 items-center gap-2 rounded-full bg-primary pr-6 pl-5 font-medium text-on-primary"
              >
                <Icon name="mail" />
                Email me
              </a>
            </div>
          </div>

          <div className="pop-in order-1 px-6 sm:px-12 lg:order-2 lg:px-0" style={{ animationDelay: "200ms" }}>
            <ProfilePhoto src={profilePhoto.src} name={profile.name} />
          </div>
        </section>

        <Marquee />

        {/* API console */}
        <section
          aria-labelledby="api"
          className="reveal mt-12 grid items-center gap-8 rounded-[32px] bg-surface-low p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr] [&>*]:min-w-0"
        >
          <div>
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-tertiary-container text-on-tertiary-container">
              <Icon name="terminal" className="h-6 w-6" />
            </span>
            <h2 id="api" className="display text-3xl font-bold tracking-tight sm:text-4xl">
              Query me like an API
            </h2>
            <p className="mt-3 max-w-sm text-on-surface-variant">
              Most of my day is spent designing endpoints. Pick one to see what it returns.
            </p>
          </div>
          <ApiConsole />
        </section>

        {/* Experience */}
        <section aria-labelledby="work-title" id="work" className="pt-24">
          <SectionHeading id="work-title" title="Experience" note="Tap a role to see what I worked on." />
          <Experience />
        </section>

        {/* Projects */}
        <section aria-labelledby="projects-title" id="projects" className="pt-24">
          <SectionHeading id="projects-title" title="Projects" note="Filter by technology, or tap a tag on any card." />
          <Projects />
        </section>

        {/* Services */}
        <section aria-labelledby="services" className="pt-24">
          <SectionHeading id="services" title="What I can help with" />
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => (
              <div
                key={s.title}
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                className={`reveal rounded-[28px] p-7 transition-[border-radius] duration-500 ease-emphasized hover:rounded-[48px] sm:p-9 ${serviceTones[i]}`}
              >
                <h3 className="display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 max-w-md opacity-85">{s.body}</p>
                <p className="mt-6 text-sm font-medium opacity-70">{s.tools.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section aria-labelledby="skills-title" id="skills" className="pt-24">
          <SectionHeading id="skills-title" title="Skills" note="Filled chips link to projects that use them." />
          <Skills />
        </section>

        {/* Contact */}
        <section aria-labelledby="contact-title" id="contact" className="pt-24">
          <div className="reveal rounded-[40px] bg-primary-container p-8 text-on-primary-container sm:p-14">
            <h2
              id="contact-title"
              className="display max-w-[14ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-tight"
            >
              Have a project or a role in mind?
            </h2>
            <p className="mt-5 max-w-md text-lg opacity-85">Send me an email and tell me what you&apos;re building.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="state flex h-12 max-w-full items-center gap-2 rounded-full bg-primary pr-6 pl-5 font-medium text-on-primary"
              >
                <Icon name="send" className="h-5 w-5 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </a>
              <CopyEmail email={profile.email} />
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="state flex h-10 items-center gap-2 rounded-lg bg-surface/50 px-4 text-sm font-medium"
                  >
                    {s.label}
                    <Icon name="open" className="h-4 w-4 opacity-70" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pt-4 pb-32 text-sm text-on-surface-variant sm:flex-row sm:justify-between sm:px-6 md:pb-10">
        <p>© 2026 Swati Tiwari</p>
      </footer>

      <Fab />
      <Snackbar />
    </>
  );
}
