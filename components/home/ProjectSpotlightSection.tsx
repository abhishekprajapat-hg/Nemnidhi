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
    <section className="plain-section deferred-section border-t border-[#3A5675]/30">
      <Container className="py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
          <article className="surface-3d-soft rounded-2xl border border-[#3A5675]/34 p-6 md:p-8">
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
                  <div key={item.title} className="surface-3d-soft rounded-xl border border-[#3A5675]/26 p-3.5">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[linear-gradient(150deg,#152338,#132334)] text-[#76B5FF]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#E7F0FF]">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-[#8095AC]">{item.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="button-3d inline-flex items-center gap-2 rounded-lg border border-[#66A8EA]/65 bg-[linear-gradient(145deg,#33DEC0,#004DC5)] px-4 py-2.5 text-sm font-semibold text-[#EAF2FF]"
              >
                View all projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?from=home-ecosystem"
                className="button-3d inline-flex items-center gap-2 rounded-lg border border-[#3A5675]/56 bg-[linear-gradient(160deg,rgba(21,33,49,0.95),rgba(14,24,37,0.9)_60%,rgba(22,17,16,0.86))] px-4 py-2.5 text-sm font-semibold text-[#D6E5FF] transition hover:border-[#24B89A] hover:text-[#66AAFF]"
              >
                Build your ecosystem
              </Link>
            </div>
          </article>

          <article className="surface-3d rounded-2xl border border-[#3A5675]/34 bg-[linear-gradient(165deg,rgba(23,35,51,0.86)_0%,rgba(15,26,39,0.82)_62%,rgba(23,18,16,0.74)_100%)] p-6 md:p-8">
            <p className="section-eyebrow">Execution Snapshot</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {METRICS.map((item) => (
                <div key={item.label} className="surface-3d-soft rounded-xl border border-[#3A5675]/28 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[#8095AC]">{item.label}</p>
                  <p className="mt-1 text-base font-semibold text-[#E7F0FF]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="surface-3d-soft mt-4 rounded-xl border border-[#3A5675]/28 p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-[#8095AC]">System Principle</p>
              <p className="mt-2 text-sm leading-7 text-[#AABFD4]">
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
              className="group theme-card p-4"
            >
              <p className="text-[11px] uppercase tracking-[0.08em] text-[#8095AC]">
                Property {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[#E7F0FF]">{project.name}</h3>
              <p className="mt-1 text-sm text-[#8095AC]">{project.domain}</p>
              <p className="mt-3 text-sm leading-7 text-[#AABFD4]">{project.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="button-3d inline-flex items-center gap-1.5 rounded-lg border border-[#3A5675]/58 bg-[linear-gradient(162deg,rgba(21,33,49,0.95),rgba(14,24,37,0.9)_60%,rgba(22,17,16,0.84))] px-3 py-1.5 text-xs font-semibold text-[#D6E5FF] transition hover:border-[#24B89A] hover:text-[#66AAFF]"
                >
                  Open Live
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  href={`/projects#${project.id}`}
                  className="button-3d inline-flex items-center gap-1.5 rounded-lg border border-[#3A5675]/38 bg-[linear-gradient(165deg,rgba(20,31,46,0.9),rgba(13,22,34,0.84))] px-3 py-1.5 text-xs font-semibold text-[#8095AC] transition group-hover:text-[#D6E5FF]"
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
