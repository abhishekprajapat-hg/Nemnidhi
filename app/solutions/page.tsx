import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const SOLUTIONS = [
  {
    id: "conversion-site",
    label: "Solution 01",
    name: "Conversion-first website rebuild",
    tagline: "Turn your website into a calm, always-on sales channel.",
    bestFor: [
      "SMEs with outdated or slow websites",
      "Founders who rely on chats instead of site leads",
      "Brands ready to look premium in their category",
    ],
    whatWeDo: [
      "Clarify offers and re-map visitor flows",
      "Design and build in Next.js for speed and trust",
      "Connect analytics and capture high-intent actions",
      "Set up a simple content and update workflow",
    ],
    outcomes: [
      "Clear story and sharper first impression",
      "Better quality inbound conversations",
      "A site that actively supports sales",
    ],
    highlight: "Most requested",
  },
  {
    id: "growth-engine",
    label: "Solution 02",
    name: "Growth and lead-generation engine",
    tagline:
      "Create a reliable stream of qualified conversations instead of vanity traffic.",
    bestFor: [
      "Teams running campaigns without visibility",
      "Service brands that sell through calls",
      "Founders juggling too many disconnected tools",
    ],
    whatWeDo: [
      "Map ideal customer journeys and conversion steps",
      "Build focused landing pages and nurture routes",
      "Integrate CRM, calendars, and notification loops",
      "Set up dashboards for decision-making",
    ],
    outcomes: [
      "Steadier pipeline of qualified leads",
      "Less lead leakage and manual follow-up",
      "Clarity on channels that drive revenue",
    ],
    highlight: "Growth focused",
  },
  {
    id: "ops-os",
    label: "Solution 03",
    name: "Ops OS for scaling teams",
    tagline: "Replace scattered workflows with one reliable operating layer.",
    bestFor: [
      "Teams managing projects via chat and sheets",
      "Businesses facing repeated delivery delays",
      "Founder-led operations that need structure",
    ],
    whatWeDo: [
      "Audit tools and operational bottlenecks",
      "Design a lean internal workflow system",
      "Build custom dashboards and role-based views",
      "Document and train the team for adoption",
    ],
    outcomes: [
      "More predictable delivery and fewer escalations",
      "Shared visibility across teams",
      "Leadership decisions based on real-time signals",
    ],
    highlight: "Operational calm",
  },
];

export default function SolutionsPage() {
  return (
    <section className="theme-section min-h-screen">
      <Container className="py-16 md:py-22">
        <header className="mb-12 space-y-5">
          <p className="theme-pill">Solutions</p>
          <h1 className="max-w-4xl text-4xl text-slate-50 md:text-5xl">
            End-to-end business systems designed to compound quietly.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Instead of one-off tasks, we build integrated solutions: offer clarity,
            conversion flow, and operational reliability.
          </p>
        </header>

        <div className="space-y-6">
          {SOLUTIONS.map((solution) => (
            <section
              key={solution.id}
              className="theme-card grid gap-6 rounded-3xl p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-300">
                    {solution.label}
                  </span>
                  <span className="rounded-full border border-cyan-200/45 bg-cyan-200/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                    {solution.highlight}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-slate-100">
                    {solution.name}
                  </h2>
                  <p className="text-sm text-cyan-100">{solution.tagline}</p>
                </div>

                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Best For
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {solution.bestFor.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-orange-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="mt-2">
                  <a
                    href={`/contact?from=solutions&solution=${encodeURIComponent(
                      solution.id
                    )}`}
                  >
                    Explore this solution
                  </a>
                </Button>
              </div>

              <div className="space-y-5 border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0 [border-color:var(--line)]">
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    What We Build
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {solution.whatWeDo.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-slate-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Expected Outcomes
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {solution.outcomes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center [border-color:var(--line)]">
          <p className="text-sm text-slate-300">
            Not sure which path fits your current stage?
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Share your context and we will recommend the simplest starting point.
          </p>
          <Button asChild className="mt-4">
            <a href="/contact?from=solutions-undecided">Talk through your options</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
