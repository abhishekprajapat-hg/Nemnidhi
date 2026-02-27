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
    subtitle: "Goals, constraints, leverage points",
    description:
      "We map what is broken, what is working, and what should improve first based on business impact.",
    bullets: [
      "Founder and team discovery workshop",
      "Audit of funnel, messaging, and systems",
      "Clear baseline and success criteria",
    ],
  },
  {
    label: "02",
    title: "Architect",
    subtitle: "Plan before pixels",
    description:
      "We convert insight into a practical execution plan covering IA, UX, stack choices, and milestones.",
    bullets: [
      "Offer and user journey architecture",
      "System and integration blueprint",
      "Delivery roadmap with weekly checkpoints",
    ],
  },
  {
    label: "03",
    title: "Ship",
    subtitle: "Design, build, integrate",
    description:
      "Focused sprints to launch the right product quickly while keeping room for iteration and feedback.",
    bullets: [
      "Responsive web build and QA",
      "Automation, CRM, and analytics setup",
      "Production-ready deployment workflow",
    ],
  },
  {
    label: "04",
    title: "Scale",
    subtitle: "Optimize with real behavior",
    description:
      "After launch, we improve based on data so your system gets stronger each month, not noisier.",
    bullets: [
      "Conversion and flow refinements",
      "Performance and reliability upgrades",
      "Priority backlog and support rhythm",
    ],
  },
];

export default function ProcessSection() {
  return (
    <section className="theme-section">
      <Container className="py-16 md:py-20">
        <div
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-3">
            <p className="theme-pill">Execution Rhythm</p>
            <h2 className="max-w-3xl text-3xl text-slate-50 md:text-4xl">
              A transparent four-stage path from strategy to outcomes.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            No hidden process and no long quiet gaps. You always know what we are
            doing this week and how it connects to revenue and efficiency.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {STEPS.map((step, index) => (
            <article
              key={step.label}
              className="theme-card rounded-3xl p-5 md:p-6"
              data-aos="fade-up"
              data-aos-delay={100 + index * 70}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/50 bg-cyan-200/10 text-xs font-semibold text-cyan-100">
                    {step.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Stage {index + 1}
                  </p>
                  <p className="text-sm font-semibold text-slate-100">{step.title}</p>
                </div>
              </div>

              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/85">
                {step.subtitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {step.description}
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-orange-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
