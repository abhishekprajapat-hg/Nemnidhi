"use client";

import Container from "@/components/layout/Container";
import {
  SiAmazondocumentdb,
  SiCloudflare,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const STACK_GROUPS = [
  {
    label: "Frontend",
    description:
      "Fast, expressive interfaces built for conversion and long-term maintainability.",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    label: "Backend",
    description:
      "API-first architecture with clear data contracts and flexible integration points.",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Prisma", icon: SiPrisma },
      { name: "Stripe", icon: SiStripe },
    ],
  },
  {
    label: "Data Layer",
    description:
      "Reliable storage choices aligned to scale, query complexity, and ops requirements.",
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "DocumentDB", icon: SiAmazondocumentdb },
    ],
  },
  {
    label: "Infra",
    description:
      "Deployment and reliability stack designed for speed, uptime, and predictable releases.",
    items: [
      { name: "Vercel", icon: SiVercel },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Docker", icon: SiDocker },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
];

export default function TechStackStrip() {
  return (
    <section className="theme-section">
      <Container className="py-16 md:py-20">
        <div
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-3">
            <p className="theme-pill">Tech Stack</p>
            <h2 className="max-w-3xl text-3xl text-slate-50 md:text-4xl">
              Modern tooling chosen for reliability, speed, and growth.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            We choose tools only after the business model and delivery needs are
            clear. The stack stays lean, proven, and easy to evolve.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {STACK_GROUPS.map((group, index) => (
            <article
              key={group.label}
              className="theme-card rounded-3xl p-5 md:p-6"
              data-aos="fade-up"
              data-aos-delay={100 + index * 70}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-100">{group.label}</h3>
                <span className="rounded-full border border-cyan-200/45 bg-cyan-200/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                  Core
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                {group.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-200" />
                    {name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
