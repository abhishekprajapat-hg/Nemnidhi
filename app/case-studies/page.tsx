import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const CASE_STUDIES = [
  {
    id: "d2c-revamp",
    client: "D2C skincare brand",
    industry: "D2C / Ecommerce",
    headline: "From pretty brochure site to a conversion-first Growth site.",
    context:
      "The brand had strong word-of-mouth and repeat buyers, but their website behaved like a brochure — slow, confusing flows, and most sales happening via WhatsApp.",
    challenge: [
      "Homepage and product pages weren’t telling a clear story.",
      "Most serious buyers ended up asking the same questions manually on WhatsApp.",
      "Founders had no clear view of which campaigns or creators were actually converting.",
    ],
    approach: [
      "Mapped their ideal buyer journeys and rewrote the information architecture.",
      "Rebuilt the site in Next.js with focused landing pages for each major use-case.",
      "Connected forms, UTM tracking, and basic marketing automation to centralise leads.",
      "Set up simple decision dashboards for the founder instead of complex reports.",
    ],
    outcomesIntro: "Within the first 90 days after launch:",
    outcomes: [
      "2.4x increase in add-to-cart rate across top products.",
      "36% more enquiries coming from high-intent landing pages vs generic traffic.",
      "Founders switched off 2 under-performing channels based on clear data.",
    ],
    stack: "Next.js, Tailwind, headless CMS, analytics + automation stack.",
    duration: "8 weeks from kickoff to go-live.",
  },
  {
    id: "b2b-services-leads",
    client: "B2B services firm",
    industry: "B2B / Services",
    headline: "Cleaning up a cluttered B2B site into a calm sales asset.",
    context:
      "A mid-size services firm with solid referrals but weak inbound. Their old website was copy-heavy, split across multiple microsites, and impossible to update without developers.",
    challenge: [
      "Leadership was unclear which offers to lead with online.",
      "Prospects couldn’t understand the difference between 3 similar services.",
      "No structured way to capture or qualify inbound leads from the site.",
    ],
    approach: [
      "Ran a quick positioning + offers workshop with the core team.",
      "Consolidated 16+ pages into 5 clear offers and 3 solution pathways.",
      "Designed a new site hierarchy around those offers, not internal departments.",
      "Implemented structured enquiry forms, routing, and light qualification logic.",
    ],
    outcomesIntro: "Over the next 6 months:",
    outcomes: [
      "Lead-to-call rate from the site increased by ~48%.",
      "Sales team reported ‘less random’ and more relevant enquiries.",
      "Marketing now updates pages and case studies without developer support.",
    ],
    stack: "Next.js, CMS, CRM + calendar integration.",
    duration: "10 weeks including content and stakeholder reviews.",
  },
  {
    id: "ops-os",
    client: "Regional logistics company",
    industry: "Logistics / Operations",
    headline: "Replacing WhatsApp chaos with a simple internal Ops OS.",
    context:
      "Dispatch, customer updates, and escalations were happening across WhatsApp groups, Excel sheets, and calls — leading to delays and repeated mistakes.",
    challenge: [
      "No single source of truth for active jobs and their status.",
      "Customer support was constantly chasing ops for updates.",
      "Leadership had to ‘call someone’ for basic visibility.",
    ],
    approach: [
      "Shadowed the team’s current workflows and mapped real bottlenecks.",
      "Designed a lightweight internal portal for jobs, status, and escalations.",
      "Built role-based views for ops, customer support, and leadership.",
      "Documented the new workflow and trained the team in short sprints.",
    ],
    outcomesIntro: "After rolling out in phases:",
    outcomes: [
      "Support team saw a drop in ‘where is my order?’ calls and chats.",
      "Ops meetings became shorter and more focused on exceptions, not basics.",
      "Leadership gets a clean daily view without jumping between tools.",
    ],
    stack: "Custom web app layer + integrations on top of existing tooling.",
    duration: "6 weeks from discovery to rollout in 2 branches.",
  },
];

export default function CaseStudiesPage() {
  return (
    <section className="min-h-screen bg-[#050509] text-zinc-50">
      <Container className="py-16 md:py-24">
        {/* Header */}
        <header className="mb-12 space-y-6" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1">
            <span className="h-1 w-1 rounded-full bg-amber-300" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
              Case Studies
            </p>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl font-semibold md:text-4xl lg:text-[2.6rem]">
              Quiet, compounding wins
              <span className="block bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                for founders who didn&apos;t want more chaos.
              </span>
            </h1>
            <p className="text-sm text-zinc-300 md:text-base max-w-2xl">
              These aren&apos;t vanity redesigns. Each engagement started with
              real bottlenecks — slow sites, scattered tools, unclear offers —
              and ended in calm systems that support revenue, not just aesthetics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-400">
            <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1">
              D2C, B2B services, ops-heavy businesses
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1">
              Strategy → Systems → Ongoing support
            </span>
          </div>
        </header>

        {/* Featured case study */}
        {CASE_STUDIES[0] && (
          <section
            className="mb-14 grid gap-8 rounded-3xl border border-zinc-900 bg-gradient-to-br from-black via-zinc-950 to-zinc-900/90 p-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)] md:p-8"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <div className="space-y-4 pr-2">
              <div className="inline-flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="rounded-full border border-amber-400/60 bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium text-amber-100">
                  Featured case study
                </span>
                <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1">
                  {CASE_STUDIES[0].industry}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-zinc-50 md:text-2xl">
                {CASE_STUDIES[0].headline}
              </h2>

              <p className="text-[13px] text-zinc-300">
                {CASE_STUDIES[0].context}
              </p>

              <div className="text-[11px] text-zinc-400">
                <p className="font-medium text-zinc-300">Client</p>
                <p className="mt-0.5">{CASE_STUDIES[0].client}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Duration: {CASE_STUDIES[0].duration}
                </p>
              </div>

              <Button
                asChild
                className="mt-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-5 py-2 text-[11px] font-semibold text-zinc-950"
              >
                <a href="/contact?from=case-study-featured">
                  Explore a similar path for your brand
                </a>
              </Button>
            </div>

            <div className="space-y-4 border-l border-zinc-800/80 pl-5 md:pl-7 text-[12px] text-zinc-400">
              <div>
                <p className="font-medium text-zinc-300 mb-1">Challenges</p>
                <ul className="space-y-1.5">
                  {CASE_STUDIES[0].challenge.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-zinc-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium text-zinc-300 mb-1">Approach</p>
                <ul className="space-y-1.5">
                  {CASE_STUDIES[0].approach.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-amber-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium text-zinc-300 mb-1">Outcomes</p>
                <p className="mb-1 text-[11px] text-zinc-500">
                  {CASE_STUDIES[0].outcomesIntro}
                </p>
                <ul className="space-y-1.5">
                  {CASE_STUDIES[0].outcomes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="pt-1 text-[10px] text-zinc-500">
                Stack: {CASE_STUDIES[0].stack}
              </p>
            </div>
          </section>
        )}

        {/* Timeline of other case studies */}
        <section className="space-y-10 border-t border-zinc-900/80 pt-10">
          <div className="space-y-2" data-aos="fade-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              More quiet wins
            </p>
            <p className="text-[12px] text-zinc-400 max-w-xl">
              Different industries, same pattern: clarify the offer, simplify
              the stack, and ship systems that keep working long after launch.
            </p>
          </div>

          <div className="relative ml-5 space-y-10">
            <div className="absolute left-[7px] top-1 h-full w-px bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900" />
            {CASE_STUDIES.slice(1).map((cs, index) => (
              <article
                key={cs.id}
                className="relative pl-8"
                data-aos="fade-up"
                data-aos-delay={60 + index * 40}
              >
                {/* node */}
                <div className="absolute -left-[5px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950">
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-500" />
                </div>

                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                      {cs.industry}
                    </p>
                    <h2 className="text-sm md:text-base font-semibold text-zinc-50">
                      {cs.headline}
                    </h2>
                    <p className="text-[12px] text-zinc-300 max-w-xl">
                      {cs.context}
                    </p>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 md:mt-0">
                    {cs.client} • {cs.duration}
                  </p>
                </div>

                <div className="mt-4 grid gap-6 text-[11px] text-zinc-400 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="font-medium text-zinc-300">Challenges</p>
                    <ul className="space-y-1.5">
                      {cs.challenge.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-zinc-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-zinc-300">Outcomes</p>
                    <p className="text-[11px] text-zinc-500">
                      {cs.outcomesIntro}
                    </p>
                    <ul className="space-y-1.5">
                      {cs.outcomes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-zinc-500">
                  Stack: {cs.stack}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="mt-14 border-t border-zinc-900/80 pt-8 text-center space-y-3">
          <p className="text-[12px] text-zinc-400">
            Want to see something closer to your industry?
          </p>
          <p className="text-sm text-zinc-300">
            We can walk you through relevant work privately, under NDA if
            needed, and talk through what &quot;success&quot; would mean for you.
          </p>
          <Button
            asChild
            className="mt-2 rounded-full bg-zinc-100 px-6 py-2 text-[11px] font-semibold text-zinc-950"
          >
            <a href="/contact?from=case-studies">
              Talk through a similar engagement
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
