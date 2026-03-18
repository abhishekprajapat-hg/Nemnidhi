import Link from "next/link";
import { ArrowUpRight, Network, Orbit, Workflow } from "lucide-react";
import Container from "@/components/layout/Container";
import { PROJECTS } from "@/lib/projects";

const OUTCOME_PILLARS = [
  {
    icon: Orbit,
    title: "Multi-surface strategy",
    body: "Different web surfaces for different intent stages.",
  },
  {
    icon: Workflow,
    title: "Operational continuity",
    body: "Shared systems across marketing, sales, and delivery.",
  },
  {
    icon: Network,
    title: "Compounding architecture",
    body: "Assets designed to keep improving after launch.",
  },
];

const METRICS = [
  { label: "Live Properties", value: String(PROJECTS.length) },
  { label: "Go-live Focus", value: "Fast + Stable" },
  { label: "Execution", value: "Senior-led" },
  { label: "Model", value: "Build + Operate" },
];

export default function ProjectSpotlightSection() {
  return (
    <section className="plain-section border-t border-[#E9E9E9]">
      <Container className="py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
          <article className="rounded-2xl border border-[#E9E9E9] bg-white p-6 md:p-8">
            <p className="section-eyebrow">Unique Delivery Model</p>
            <h2 className="mt-3 section-title max-w-3xl">
              Not a single website. A connected digital ecosystem.
            </h2>
            <p className="mt-4 max-w-2xl section-copy">
              We design each property with a clear role in your growth journey, then connect everything with one
              coherent execution layer.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {OUTCOME_PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-[#E9E9E9] bg-[#F9F9F9] p-3.5">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#EDF8FD] text-[#0D8AFD]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#003464]">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-[#505662]">{item.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0D8AFD] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003464]"
              >
                View all projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?from=home-ecosystem"
                className="inline-flex items-center gap-2 rounded-lg border border-[#A9B7BD] px-4 py-2.5 text-sm font-semibold text-[#003464] transition hover:border-[#0D8AFD] hover:text-[#0D8AFD]"
              >
                Build your ecosystem
              </Link>
            </div>
          </article>

          <article className="rounded-2xl border border-[#E9E9E9] bg-[linear-gradient(165deg,#F9FCFF_0%,#EDF8FD_100%)] p-6 md:p-8">
            <p className="section-eyebrow">Execution Snapshot</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {METRICS.map((item) => (
                <div key={item.label} className="rounded-xl border border-[#D8EEF9] bg-white px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[#5B6A77]">{item.label}</p>
                  <p className="mt-1 text-base font-semibold text-[#003464]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[#D8EEF9] bg-white p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-[#5B6A77]">System Principle</p>
              <p className="mt-2 text-sm leading-7 text-[#333333]">
                Every property should pull its own weight: one clear audience, one clear action, one measurable business
                outcome.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="group rounded-2xl border border-[#E9E9E9] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(2,21,37,0.1)]"
            >
              <p className="text-[11px] uppercase tracking-[0.08em] text-[#5B6A77]">
                Property {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[#003464]">{project.name}</h3>
              <p className="mt-1 text-sm text-[#505662]">{project.domain}</p>
              <p className="mt-3 text-sm leading-7 text-[#333333]">{project.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#A9B7BD] px-3 py-1.5 text-xs font-semibold text-[#003464] transition hover:border-[#0D8AFD] hover:text-[#0D8AFD]"
                >
                  Open Live
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  href={`/projects#${project.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E9E9E9] bg-[#F9F9F9] px-3 py-1.5 text-xs font-semibold text-[#505662] transition group-hover:text-[#003464]"
                >
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
