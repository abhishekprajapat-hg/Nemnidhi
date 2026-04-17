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
      <Container className="py-10 md:py-14">
        <header className="mb-10 space-y-4">
          <p className="section-eyebrow">About Nemnidhi</p>
          <h1 className="section-title max-w-4xl">
            A focused innovation partner for teams building for long-term growth.
          </h1>
          <p className="max-w-3xl section-copy">
            We help companies replace fragmented websites and internal workflows with clear digital systems that
            improve trust, conversion, and execution quality.
          </p>
        </header>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="theme-card p-5">
            <p className="section-eyebrow">Base</p>
            <p className="mt-2 text-lg font-semibold text-[#E7F0FF]">India</p>
            <p className="mt-2 text-sm text-[#AABFD4]">Remote-first collaboration across time zones.</p>
          </div>
          <div className="theme-card p-5">
            <p className="section-eyebrow">Typical clients</p>
            <p className="mt-2 text-lg font-semibold text-[#E7F0FF]">SMEs and founder-led teams</p>
            <p className="mt-2 text-sm text-[#AABFD4]">
              Businesses that need senior execution without enterprise overhead.
            </p>
          </div>
          <div className="theme-card p-5">
            <p className="section-eyebrow">What we bring</p>
            <p className="mt-2 text-lg font-semibold text-[#E7F0FF]">Strategy + build continuity</p>
            <p className="mt-2 text-sm text-[#AABFD4]">
              Product thinking, UX, engineering, and systems under one delivery arc.
            </p>
          </div>
        </div>

        <section className="mb-10">
          <p className="mb-4 section-eyebrow">Principles</p>
          <div className="grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((item, index) => (
              <article key={item.title} className="theme-card p-5">
                <p className="section-eyebrow">Principle {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-xl font-semibold text-[#E7F0FF]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#AABFD4]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <p className="mb-4 section-eyebrow">Engagement Flow</p>
          <div className="grid gap-5 md:grid-cols-2">
            {PROCESS.map((step) => (
              <article key={step.step} className="theme-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#152338] text-xs font-semibold text-[#CFE3FF]">
                    {step.step}
                  </span>
                  <p className="section-eyebrow">{step.label}</p>
                </div>
                <h3 className="text-lg font-semibold text-[#E7F0FF]">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#AABFD4]">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="theme-card p-6">
          <p className="section-eyebrow">Studio model</p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#AABFD4] md:text-base">
            Nemnidhi stays intentionally lean: senior strategy and engineering at the core, with specialist
            collaborators engaged only when needed.
          </p>
          <Button asChild className="mt-5">
            <a href="/contact?from=about">Start a conversation</a>
          </Button>
        </section>
      </Container>
    </section>
  );
}
