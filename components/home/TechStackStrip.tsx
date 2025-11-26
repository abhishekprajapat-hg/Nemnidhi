"use client";

import Container from "@/components/layout/Container";
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiAmazondocumentdb,
  SiPostgresql,
  SiStripe,
  SiVercel,
  SiPrisma,
  SiCloudflare,
  SiDocker,
  SiFigma,
} from "react-icons/si";

const STACK_GROUPS = [
  {
    label: "Frontend",
    description: "Beautiful, fast user interfaces built for conversion & performance.",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TailwindCSS", icon: SiTailwindcss },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    label: "Backend",
    description: "Scalable, API-first architecture engineered for growth.",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Prisma", icon: SiPrisma },
      { name: "Stripe", icon: SiStripe },
    ],
  },
  {
    label: "Database",
    description: "Reliable storage with powerful query performance and security.",
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "DocumentDB", icon: SiAmazondocumentdb },
    ],
  },
  {
    label: "DevOps & Hosting",
    description: "Automated deployments built for uptime, speed & trust.",
    items: [
      { name: "Vercel", icon: SiVercel },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Docker", icon: SiDocker },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
];

export default function TechStackStrip() {
  const primaryIcons = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: SiReact },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "TypeScript", icon: SiTypescript },
  ];

  return (
    <section className="border-b border-zinc-900 bg-[#050509]">
      <Container className="py-14 md:py-18">
        {/* Header */}
        <div
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1">
              <span className="h-1 w-1 rounded-full bg-amber-300" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                Tech Stack
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-zinc-50 md:text-3xl">
              Built on a{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                modern, battle-tested stack.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-300">
            Tools selected for reliability, scale and deep ecosystem compatibility —
            no unnecessary complexity.
          </p>
        </div>

        {/* Top tech strip */}
        <div
          className="mb-6 flex flex-wrap items-center gap-3 text-[12px]"
          data-aos="fade-up"
          data-aos-delay={80}
        >
          {primaryIcons.map(({ name, icon: Icon }) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-black/80 px-3 py-1 text-zinc-200 hover:border-amber-400/60"
            >
              <Icon className="h-3.5 w-3.5 text-amber-300" />
              {name}
            </span>
          ))}
        </div>

        {/* Group cards */}
        <div
          className="grid gap-6 md:grid-cols-2"
          data-aos="fade-up"
          data-aos-delay={120}
        >
          {STACK_GROUPS.map((group) => (
            <article
              key={group.label}
              className="rounded-2xl border border-zinc-900 bg-gradient-to-br from-black via-[#050509] to-zinc-950/80 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.85)] transition duration-200 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-[0_26px_70px_rgba(0,0,0,0.95)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-50">{group.label}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-200">
                  Core
                </span>
              </div>

              <p className="mb-4 text-xs text-zinc-300">{group.description}</p>

              <div className="flex flex-wrap gap-2 text-[11px]">
                {group.items.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-black/80 px-2.5 py-1 text-zinc-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-amber-300" />
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
