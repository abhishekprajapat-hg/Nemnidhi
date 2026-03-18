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
    tagline: "Create a reliable stream of qualified conversations instead of vanity traffic.",
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
      <Container className="py-10 md:py-14">
        <header className="mb-10 space-y-4">
          <p className="section-eyebrow">Partners</p>
          <h1 className="section-title max-w-4xl">Integrated business systems designed to compound quietly.</h1>
          <p className="max-w-3xl section-copy">
            Instead of one-off tasks, we build integrated solutions across offer clarity, conversion flow, and
            operational reliability.
          </p>
        </header>

        <div className="space-y-5">
          {SOLUTIONS.map((solution) => (
            <section
              key={solution.id}
              className="theme-card grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-[#E9E9E9] bg-white px-2.5 py-1 text-xs text-[#505662]">
                    {solution.label}
                  </span>
                  <span className="rounded-md bg-[#EDF8FD] px-2.5 py-1 text-xs font-semibold text-[#003464]">
                    {solution.highlight}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-[#003464]">{solution.name}</h2>
                  <p className="text-sm font-semibold text-[#0D8AFD]">{solution.tagline}</p>
                </div>

                <div>
                  <p className="mb-2 section-eyebrow">Best For</p>
                  <ul className="space-y-1.5 text-sm text-[#333333]">
                    {solution.bestFor.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#0D8AFD]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="mt-2">
                  <a href={`/contact?from=solutions&solution=${encodeURIComponent(solution.id)}`}>
                    Explore this solution
                  </a>
                </Button>
              </div>

              <div className="space-y-5 border-t border-[#E9E9E9] pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <div>
                  <p className="mb-2 section-eyebrow">What We Build</p>
                  <ul className="space-y-1.5 text-sm text-[#333333]">
                    {solution.whatWeDo.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#A9B7BD]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 section-eyebrow">Expected Outcomes</p>
                  <ul className="space-y-1.5 text-sm text-[#333333]">
                    {solution.outcomes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#003464]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="theme-card mt-10 p-6 text-center">
          <p className="text-base text-[#333333]">Not sure which path fits your current stage?</p>
          <p className="mt-1 text-sm text-[#505662]">
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
