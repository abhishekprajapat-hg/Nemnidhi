"use client";

import { ArrowUpRight } from "lucide-react";
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
      "Rebuilt marketing pages around a tighter offer narrative and cleaner high-intent journeys.",
    result: "30.4% uplift in add-to-cart within six weeks.",
    metrics: ["+30.4% add-to-cart", "+18% session to PDP", "-23% page load time"],
    tag: "Website + funnel rebuild",
  },
  {
    client: "B2B SaaS Platform",
    industry: "SaaS",
    summary:
      "Designed a new demo flow and integrated the full lead handoff into CRM and billing tools.",
    result: "2.1x increase in qualified demo requests.",
    metrics: ["2.1x demo requests", "+41% form completion", "HubSpot + Stripe sync"],
    tag: "Next.js + CRM integration",
  },
  {
    client: "Regional Service Brand",
    industry: "Services",
    summary:
      "Turned a brochure site into a lead system with clearer pages, trust signals, and automation.",
    result: "Three to four extra booked calls each week.",
    metrics: ["+67% organic leads", "Automated follow-ups", "Call tracking enabled"],
    tag: "Lead generation revamp",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="theme-section">
      <Container className="py-16 md:py-20">
        <div
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-3">
            <p className="theme-pill">Case Studies</p>
            <h2 className="max-w-3xl text-3xl text-slate-50 md:text-4xl">
              Quiet wins that compound after launch.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            Different industries, same pattern: sharpen the offer, simplify the
            flow, and wire every decision to measurable business impact.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {CASE_STUDIES.map((cs, index) => (
            <article
              key={cs.client}
              className="theme-card group flex h-full flex-col rounded-3xl p-5"
              data-aos="fade-up"
              data-aos-delay={80 + index * 70}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    {cs.industry}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-slate-100">
                    {cs.client}
                  </h3>
                </div>
                <span className="rounded-full border border-cyan-200/45 bg-cyan-200/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                  {cs.tag}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-300">{cs.summary}</p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Outcome
                </p>
                <p className="mt-1 text-sm font-medium text-cyan-100">{cs.result}</p>
              </div>

              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {cs.metrics.map((metric) => (
                  <li key={metric} className="flex gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-orange-300" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 text-cyan-100 opacity-80 transition group-hover:opacity-100">
                  Ask for the full breakdown
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
