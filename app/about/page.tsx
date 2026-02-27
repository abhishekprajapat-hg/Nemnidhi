import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const PRINCIPLES = [
  {
    title: "Clarity over complexity",
    body: "We simplify offers, flows, and tooling so your team can move faster with less friction.",
  },
  {
    title: "Strategy before interface",
    body: "We define outcomes and constraints first, then design and build around real business needs.",
  },
  {
    title: "Compounding systems",
    body: "We prioritize assets and workflows that stay useful after launch and improve with data.",
  },
  {
    title: "Direct communication",
    body: "No buzzword theater. We explain tradeoffs clearly and make decisions with you in the room.",
  },
];

const PROCESS = [
  {
    step: "01",
    label: "Discover",
    title: "Map current reality",
    body: "We audit your site, messaging, and operations to identify where leverage is hiding.",
  },
  {
    step: "02",
    label: "Architect",
    title: "Design the right system",
    body: "We align offers, user journeys, and implementation priorities before writing production code.",
  },
  {
    step: "03",
    label: "Build",
    title: "Ship in focused cycles",
    body: "We move in tight iterations with transparent weekly progress and fast feedback loops.",
  },
  {
    step: "04",
    label: "Evolve",
    title: "Improve with real behavior",
    body: "After launch, we refine based on data and customer behavior, not assumptions.",
  },
];

export default function AboutPage() {
  return (
    <section className="theme-section min-h-screen">
      <Container className="py-16 md:py-22">
        <header className="mb-12 space-y-5">
          <p className="theme-pill">About Nemnidhi</p>
          <h1 className="max-w-4xl text-4xl text-slate-50 md:text-5xl">
            A compact digital partner for founders building for the long term.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            We help teams replace messy websites and fragmented systems with
            focused experiences that increase trust, improve conversion, and reduce
            operational noise.
          </p>
        </header>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="theme-card rounded-3xl p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
              Base
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-100">India</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Remote-first collaboration across time zones.
            </p>
          </div>
          <div className="theme-card rounded-3xl p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
              Typical clients
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-100">
              SMEs and founder-led teams
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Businesses that need senior execution without enterprise overhead.
            </p>
          </div>
          <div className="theme-card rounded-3xl p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
              What we bring
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-100">
              Strategy + build continuity
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Product thinking, UX, development, and systems under one delivery arc.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Principles
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((item, index) => (
              <article key={item.title} className="theme-card rounded-3xl p-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100">
                  Principle {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-100">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Engagement Flow
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {PROCESS.map((step) => (
              <article key={step.step} className="theme-card rounded-3xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/50 bg-cyan-200/10 text-xs font-semibold text-cyan-100">
                    {step.step}
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    {step.label}
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="theme-card rounded-3xl p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
            Studio model
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            Nemnidhi stays intentionally lean: senior strategy and engineering at
            the center, with specialist collaborators engaged when needed. You get
            direct access to decision-makers, clear priorities, and faster delivery.
          </p>
          <Button asChild className="mt-5">
            <a href="/contact?from=about">Start a conversation</a>
          </Button>
        </section>
      </Container>
    </section>
  );
}
