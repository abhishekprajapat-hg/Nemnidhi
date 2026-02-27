import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const CASE_STUDIES = [
  {
    id: "d2c-revamp",
    client: "D2C skincare brand",
    industry: "D2C / Ecommerce",
    headline: "From brochure site to conversion-focused growth asset.",
    context:
      "The brand had strong repeat buying but the website did not convert high-intent traffic efficiently.",
    challenge: [
      "No clear narrative from homepage to product pages",
      "Founders answering repeated buying questions manually",
      "Weak campaign attribution and limited visibility",
    ],
    approach: [
      "Mapped customer journeys and rebuilt site architecture",
      "Shipped focused use-case pages in Next.js",
      "Connected form capture, UTM tracking, and automation",
      "Delivered founder dashboard with decision-ready metrics",
    ],
    outcomesIntro: "Within 90 days post launch:",
    outcomes: [
      "2.4x increase in add-to-cart rate on top products",
      "36% more high-intent enquiries from landing pages",
      "Eliminated two weak channels using clear data",
    ],
    stack: "Next.js, Tailwind, headless CMS, analytics automation",
    duration: "8 weeks",
  },
  {
    id: "b2b-services-leads",
    client: "B2B services firm",
    industry: "B2B / Services",
    headline: "Consolidated a cluttered site into a clear sales asset.",
    context:
      "A referral-driven business needed a website that could explain offers and qualify inbound leads.",
    challenge: [
      "Confusing overlap between service pages",
      "Fragmented microsites with inconsistent messaging",
      "No structured inbound qualification flow",
    ],
    approach: [
      "Ran positioning and offer-priority workshop",
      "Consolidated 16 plus pages into five core offers",
      "Built a cleaner hierarchy around buyer intent",
      "Implemented routing and qualification logic",
    ],
    outcomesIntro: "Over the next six months:",
    outcomes: [
      "Lead-to-call rate increased by around 48%",
      "Higher relevance of inbound conversations",
      "Marketing team gained direct publishing control",
    ],
    stack: "Next.js, CMS, CRM and calendar integration",
    duration: "10 weeks",
  },
  {
    id: "ops-os",
    client: "Regional logistics company",
    industry: "Logistics / Operations",
    headline: "Replaced operational chat chaos with a focused internal OS.",
    context:
      "Dispatch updates, escalations, and customer status were spread across chats, calls, and sheets.",
    challenge: [
      "No single source of truth for active jobs",
      "Support team chasing updates manually",
      "Leadership visibility dependent on calls",
    ],
    approach: [
      "Mapped existing workflows and recurring failure points",
      "Designed role-based views for ops and support",
      "Built lightweight internal portal and escalation flow",
      "Rolled out with documentation and sprint-based training",
    ],
    outcomesIntro: "After phased rollout:",
    outcomes: [
      "Noticeable reduction in status-chasing calls",
      "Shorter, exception-focused ops meetings",
      "Leadership gained daily visibility in one place",
    ],
    stack: "Custom web app layer with integrations",
    duration: "6 weeks",
  },
];

export default function CaseStudiesPage() {
  const featured = CASE_STUDIES[0];
  const remaining = CASE_STUDIES.slice(1);

  return (
    <section className="theme-section min-h-screen">
      <Container className="py-16 md:py-22">
        <header className="mb-12 space-y-5">
          <p className="theme-pill">Case Studies</p>
          <h1 className="max-w-4xl text-4xl text-slate-50 md:text-5xl">
            Real systems work, not cosmetic redesigns.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Each engagement started with practical constraints and ended with a
            clearer growth engine for the team.
          </p>
        </header>

        {featured && (
          <section className="theme-card-strong mb-12 grid gap-6 rounded-3xl p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/45 bg-cyan-200/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                  Featured
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-300">
                  {featured.industry}
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">
                {featured.headline}
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">{featured.context}</p>

              <div className="text-xs text-slate-400">
                <p className="font-medium text-slate-200">{featured.client}</p>
                <p className="mt-1">Duration: {featured.duration}</p>
                <p className="mt-1">Stack: {featured.stack}</p>
              </div>

              <Button asChild>
                <a href="/contact?from=case-study-featured">
                  Explore a similar engagement
                </a>
              </Button>
            </div>

            <div className="space-y-5 border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0 [border-color:var(--line)]">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Challenges
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {featured.challenge.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-slate-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Approach
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {featured.approach.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-orange-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Outcomes
                </p>
                <p className="mb-2 text-xs text-cyan-100">{featured.outcomesIntro}</p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {featured.outcomes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            More examples
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {remaining.map((cs) => (
              <article key={cs.id} className="theme-card rounded-3xl p-5 md:p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  {cs.industry}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-100">{cs.headline}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{cs.context}</p>

                <div className="mt-4 grid gap-4 text-xs text-slate-300">
                  <div>
                    <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      Challenges
                    </p>
                    <ul className="space-y-1.5">
                      {cs.challenge.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-slate-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      Outcomes
                    </p>
                    <p className="mb-2 text-xs text-cyan-100">{cs.outcomesIntro}</p>
                    <ul className="space-y-1.5">
                      {cs.outcomes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  {cs.client} | {cs.duration} | {cs.stack}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center [border-color:var(--line)]">
          <p className="text-sm text-slate-300">
            Want a deeper walkthrough relevant to your industry?
          </p>
          <p className="mt-1 text-xs text-slate-400">
            We can share related work privately and map what success should mean
            for your team.
          </p>
          <Button asChild className="mt-4">
            <a href="/contact?from=case-studies">Talk through a similar path</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
