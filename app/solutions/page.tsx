import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const SOLUTIONS = [
  {
    id: "conversion-site",
    label: "Solution 01",
    name: "Conversion-first website rebuild",
    tagline: "Turn your website into a calm, always-on sales asset.",
    bestFor: [
      "SMEs with dated, slow, or DIY websites",
      "Founders who get leads from WhatsApp but not from their site",
      "Brands ready to look and feel premium in their category",
    ],
    whatWeDo: [
      "Re-architect your site around clear offers & user journeys",
      "Design a fast, premium front-end in Next.js + Tailwind",
      "Plug in analytics, form tracking, and basic automations",
      "Set up a simple system to ship updates without chaos",
    ],
    outcomes: [
      "Cleaner story: visitors finally ‘get’ what you do",
      "Higher quality inbound leads vs random enquiries",
      "Website that actually supports sales, not just looks nice",
    ],
    highlight: "Most requested",
  },
  {
    id: "growth-engine",
    label: "Solution 02",
    name: "Growth & lead-generation engine",
    tagline: "Build a reliable flow of qualified conversations, not vanity traffic.",
    bestFor: [
      "Teams who tried ads but don’t know what’s working",
      "Agencies and service brands who sell on calls",
      "Founders tired of juggling 10 tools with no clear view",
    ],
    whatWeDo: [
      "Map your ideal customer journeys and key conversion points",
      "Set up landing pages, lead magnets, and nurture flows",
      "Integrate CRM, calendars, and notifications for your team",
      "Create simple dashboards to track what really matters",
    ],
    outcomes: [
      "Steady pipeline of conversations with the right people",
      "Less manual follow-up and lead leakage",
      "Clarity on which channels actually move revenue",
    ],
    highlight: "For growth-focused teams",
  },
  {
    id: "ops-os",
    label: "Solution 03",
    name: "Ops OS for growing teams",
    tagline: "Replace scattered spreadsheets and chats with one calm operating layer.",
    bestFor: [
      "Founders running projects from WhatsApp + Excel",
      "Teams with repeated delivery mistakes or delays",
      "Businesses scaling beyond founder-only coordination",
    ],
    whatWeDo: [
      "Audit your current tools, bottlenecks, and workflows",
      "Design a lean internal system (dashboards, tasks, requests)",
      "Build custom portals / tools where off-the-shelf falls short",
      "Document the new way of working so it sticks",
    ],
    outcomes: [
      "Less fire-fighting, more predictable delivery",
      "Everyone knows where work lives and what’s next",
      "Leadership gets a single view instead of chasing updates",
    ],
    highlight: "Operational calm",
  },
];

export default function SolutionsPage() {
  return (
    <section className="min-h-screen bg-[#050509] text-zinc-50">
      <Container className="py-16 md:py-24">
        {/* Header */}
        <header className="mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1">
            <span className="h-1 w-1 rounded-full bg-amber-300" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
              Solutions
            </p>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl font-semibold md:text-4xl lg:text-[2.6rem]">
              Business & tech solutions
              <span className="block bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                built to compound quietly in the background.
              </span>
            </h1>
            <p className="text-sm text-zinc-300 md:text-base max-w-2xl">
              Instead of one-off projects, Nemnidhi designs end-to-end solutions:
              clear offers, calm systems, and digital experiences that actually
              support your sales and operations — not fight them.
            </p>
          </div>

          <div className="grid gap-4 text-[12px] text-zinc-400 md:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                How we think
              </p>
              <p className="mt-1">
                Strategy first, stack second. We pick tools and tech only after
                your business model is clear.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Who it&apos;s for
              </p>
              <p className="mt-1">
                SMEs, founders, and lean teams who want compound growth — not
                noisy dashboards and more chaos.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Next step
              </p>
              <p className="mt-1">
                Pick the solution that feels closest to your reality and we&apos;ll
                calibrate it together on a call.
              </p>
            </div>
          </div>
        </header>

        {/* Solutions list – big sections, no cards */}
        <div className="space-y-12 border-t border-zinc-900/80 pt-10">
          {SOLUTIONS.map((solution, index) => (
            <section
              key={solution.id}
              className="relative grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)]"
            >
              {/* Left column – name / meta */}
              <div className="space-y-3 pr-4">
                <div className="inline-flex items-center gap-2 text-[11px] text-zinc-500">
                  <span className="rounded-full border border-zinc-700 bg-zinc-950/80 px-2.5 py-1 uppercase tracking-[0.18em]">
                    {solution.label}
                  </span>
                  {solution.highlight && (
                    <span className="rounded-full border border-amber-400/60 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-100">
                      {solution.highlight}
                    </span>
                  )}
                </div>

                <h2 className="text-lg md:text-xl font-semibold text-zinc-50">
                  {solution.name}
                </h2>
                <p className="text-[12px] md:text-[13px] text-amber-200">
                  {solution.tagline}
                </p>

                <div className="mt-3 space-y-1 text-[11px] text-zinc-400">
                  <p className="font-medium text-zinc-300">Best suited for</p>
                  <ul className="space-y-1">
                    {solution.bestFor.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-[5px] w-[5px] rounded-full bg-gradient-to-br from-amber-300 to-yellow-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3">
                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-5 py-2 text-[11px] font-semibold text-zinc-950"
                  >
                    <a
                      href={`/contact?from=solutions&solution=${encodeURIComponent(
                        solution.id
                      )}`}
                    >
                      Explore this solution for your brand
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right column – what we do / outcomes */}
              <div className="space-y-5 border-l border-zinc-900/80 pl-5 md:pl-7">
                <div className="space-y-2 text-[11px] md:text-[12px] text-zinc-400">
                  <p className="font-medium text-zinc-300">
                    What we typically design and build
                  </p>
                  <ul className="space-y-1.5">
                    {solution.whatWeDo.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-zinc-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 text-[11px] md:text-[12px] text-zinc-400">
                  <p className="font-medium text-zinc-300">
                    What this should feel like in 6–12 months
                  </p>
                  <ul className="space-y-1.5">
                    {solution.outcomes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* subtle index / progression hint */}
                <p className="pt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Path {index + 1} of {SOLUTIONS.length}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 border-t border-zinc-900/80 pt-8 text-center space-y-3">
          <p className="text-[12px] text-zinc-400">
            Not sure which solution you fit into?
          </p>
          <p className="text-sm text-zinc-300">
            Share your current situation and we&apos;ll suggest the simplest
            starting point — even if it&apos;s not with us.
          </p>
          <Button
            asChild
            className="mt-2 rounded-full bg-zinc-100 px-6 py-2 text-[11px] font-semibold text-zinc-950"
          >
            <a href="/contact?from=solutions-undecided">
              Talk through where you are today
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
