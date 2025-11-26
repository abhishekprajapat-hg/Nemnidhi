// components/home/ProcessSection.tsx
"use client";

import Container from "@/components/layout/Container";

type Step = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
};

const STEPS: Step[] = [
  {
    label: "01",
    title: "Discover",
    subtitle: "Your goals & bottlenecks",
    description:
      "We start with a strategy call to understand your business, current funnel, and what growth looks like for you.",
    bullets: [
      "30–45 min discovery call",
      "Audit of current website / systems",
      "Clear definition of success metrics",
    ],
  },
  {
    label: "02",
    title: "Plan",
    subtitle: "Roadmap & architecture",
    description:
      "We turn insights into a practical roadmap: wireframes, tech decisions, and a realistic timeline.",
    bullets: [
      "Site map & core user flows",
      "Tech stack and integrations",
      "Timeline & milestone breakdown",
    ],
  },
  {
    label: "03",
    title: "Build",
    subtitle: "Design, develop, integrate",
    description:
      "We design and build your solution using the MERN stack, keeping you in the loop with regular check-ins.",
    bullets: [
      "Responsive UI in Next.js",
      "APIs & database setup",
      "QA, testing & refinements",
    ],
  },
  {
    label: "04",
    title: "Grow",
    subtitle: "Launch, measure, improve",
    description:
      "Once live, we track performance and continue optimising for more leads and smoother operations.",
    bullets: [
      "Analytics & event tracking",
      "Performance optimisation",
      "Ongoing support options",
    ],
  },
];

export default function ProcessSection() {
  return (
    <section className="border-b border-zinc-900 bg-[#050509]">
      <Container className="py-16 md:py-20">
        {/* Header */}
        <div
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1">
              <span className="h-1 w-1 rounded-full bg-amber-300" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                Process
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-zinc-50 md:text-3xl">
                A clear, 4-step process
                <span className="block bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  from first call to measurable impact.
                </span>
              </h2>
              <div className="mt-3 h-px w-24 bg-gradient-to-r from-amber-400 via-yellow-300 to-transparent" />
            </div>
          </div>

          <p className="max-w-md text-sm text-zinc-300">
            No vague promises or endless delays. You get a transparent,
            battle-tested sequence — so you always know what&apos;s happening,
            what&apos;s next, and how it ties back to revenue and efficiency.
          </p>
        </div>

        {/* Timeline grid */}
        <div className="relative">
          {/* Vertical line for larger screens */}
          <div className="pointer-events-none absolute left-[28px] top-0 hidden h-full border-l border-dashed border-zinc-800 md:block" />

          {/* Glow accents on desktop */}
          <div className="pointer-events-none absolute left-[22px] top-0 hidden h-10 w-10 -translate-x-1/2 rounded-full bg-amber-500/10 blur-2xl md:block" />
          <div className="pointer-events-none absolute left-[22px] bottom-0 hidden h-10 w-10 -translate-x-1/2 rounded-full bg-amber-500/10 blur-2xl md:block" />

          <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            {STEPS.map((step, index) => (
              <article
                key={step.label}
                className="relative flex gap-4 rounded-2xl border border-zinc-900 bg-gradient-to-br from-black via-[#050509] to-zinc-950/80 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.85)] transition duration-200 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-[0_26px_70px_rgba(0,0,0,0.95)]"
                data-aos="fade-up"
                data-aos-delay={100 + index * 80}
              >
                {/* Subtle gold overlay on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
                </div>

                {/* Timeline dot for desktop */}
                <div className="relative hidden md:block">
                  <div className="absolute -left-[30px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/60 bg-black text-[11px] font-semibold text-amber-100 shadow-[0_0_18px_rgba(245,158,11,0.7)]">
                    {step.label}
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Mobile step label */}
                  <div className="flex items-center gap-2 md:hidden">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/60 bg-black text-[11px] font-semibold text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                      {step.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-50 md:text-base">
                      {step.title}
                    </h3>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200/90">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-300">{step.description}</p>

                  {/* Bullets */}
                  <ul className="mt-2 space-y-1.5 text-[11px] text-zinc-400">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-[6px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Meta line */}
                  <div className="pt-2 text-[10px] text-zinc-500">
                    {index === 0 && "Ideal for aligning expectations & priorities."}
                    {index === 1 && "You see the map before we touch a single line of code."}
                    {index === 2 && "Design, dev, and integration handled under one roof."}
                    {index === 3 && "Launch is the start — we keep optimising alongside you."}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
