"use client";

import Container from "@/components/layout/Container";

type CaseStudy = {
  client: string;
  industry: string;
  summary: string;
  result: string;
  metrics: string[];
  tag: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    client: "D2C Skincare Brand",
    industry: "E-commerce",
    summary:
      "Rebuilt their marketing site and offer pages around a tighter funnel with clearer positioning.",
    result: "30.4% uplift in add-to-cart within 6 weeks.",
    metrics: ["+30.4% add-to-cart", "+18% session to PDP", "-23% page load time"],
    tag: "Website + funnel cleanup",
  },
  {
    client: "B2B SaaS Tool",
    industry: "SaaS",
    summary:
      "Designed a new marketing site and simple product demo flow that connects directly to their CRM.",
    result: "2.1x increase in qualified demo requests.",
    metrics: ["2.1x demo requests", "+41% form completion", "HubSpot + Stripe integration"],
    tag: "Next.js + CRM integration",
  },
  {
    client: "Local Service Business",
    industry: "Services",
    summary:
      "Turned a brochure site into a lead machine with clear service pages, FAQs and automated follow-ups.",
    result: "3–4 extra booked calls per week.",
    metrics: ["+67% organic leads", "Automated follow-ups", "Call tracking & analytics"],
    tag: "Lead gen revamp",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="border-b border-zinc-900 bg-[#050509]">
      <Container className="py-16 md:py-20">
        {/* Header */}
        <div
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1">
              <span className="h-1 w-1 rounded-full bg-amber-300" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                Case Studies
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-zinc-50 md:text-3xl">
                A few examples of{" "}
                <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  what this actually looks like in practice.
                </span>
              </h2>
              <div className="mt-3 h-px w-24 bg-gradient-to-r from-amber-400 via-yellow-300 to-transparent" />
            </div>
          </div>

          <p className="max-w-md text-sm text-zinc-300">
            Every project has different constraints, but the pattern stays the same:
            sharpen the offer, simplify the flows, then wire everything into metrics
            that actually matter.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((cs, index) => (
            <article
              key={cs.client}
              className="relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-900 bg-gradient-to-b from-black via-[#050509] to-zinc-950/80 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.85)] transition duration-200 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-[0_26px_70px_rgba(0,0,0,0.95)]"
              data-aos="fade-up"
              data-aos-delay={80 + index * 80}
            >
              {/* Gold overlay on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {cs.industry}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-zinc-50">
                    {cs.client}
                  </h3>
                </div>
                <span className="rounded-full border border-amber-400/40 bg-black/80 px-2 py-1 text-[10px] font-medium text-amber-100">
                  {cs.tag}
                </span>
              </div>

              <p className="text-xs text-zinc-300">{cs.summary}</p>

              <div className="mt-1 rounded-2xl border border-zinc-800 bg-black/70 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200">
                  Outcome
                </p>
                <p className="mt-1 text-xs text-zinc-100">{cs.result}</p>
              </div>

              <ul className="mt-2 space-y-1.5 text-[11px] text-zinc-400">
                {cs.metrics.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="mt-[6px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500">
                <span>Available for a deeper breakdown on call.</span>
                <span className="text-amber-200">Walk me through this →</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
