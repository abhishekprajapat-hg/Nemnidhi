import Link from "next/link";
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
    label: "Product Engineering",
    description: "Modern frontend foundations for fast, resilient, and conversion-driven digital products.",
    href: "/services",
    items: [SiNextdotjs, SiReact, SiTailwindcss, SiFigma],
  },
  {
    label: "Business Systems",
    description: "Backend and integration architecture that keeps teams aligned and operations predictable.",
    href: "/solutions",
    items: [SiNodedotjs, SiTypescript, SiPrisma, SiStripe],
  },
  {
    label: "Data Operations",
    description: "Flexible data layers designed for evolving products, workflows, and analytics maturity.",
    href: "/projects",
    items: [SiMongodb, SiPostgresql, SiAmazondocumentdb],
  },
  {
    label: "Cloud and Reliability",
    description: "Infrastructure choices optimized for release speed, uptime, and future expansion.",
    href: "/about",
    items: [SiVercel, SiCloudflare, SiDocker, SiFirebase],
  },
];

export default function TechStackStrip() {
  return (
    <section className="theme-section deferred-section">
      <Container className="py-10 md:py-14">
        <div className="mb-8 space-y-4 text-center md:text-left">
          <p className="section-eyebrow">Resources</p>
          <h2 className="section-title">Build with proven systems and enterprise tooling</h2>
          <p className="mx-auto max-w-3xl section-copy md:mx-0">
            Everything we deliver is shaped by maintainability, measurable outcomes, and the practical realities of
            growing teams.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STACK_GROUPS.map((group) => (
            <Link
              key={group.label}
              href={group.href}
              className="theme-card flex h-full flex-col p-5 transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-[#003464]">{group.label}</h3>
              <p className="mt-3 text-sm leading-7 text-[#333333]">{group.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((Icon, iconIndex) => (
                  <span
                    key={`${group.label}-${iconIndex}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#E9E9E9] bg-white text-[#0D8AFD]"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>

              <span className="mt-auto pt-5 text-sm font-semibold text-[#0D8AFD]">Explore section</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
