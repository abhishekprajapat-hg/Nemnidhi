"use client";

import Link from "next/link";
import { useRef } from "react";
import {
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
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { useStaggerScale } from "@/lib/useGsapAnimations";

const stackGroups = [
  {
    label: "Interface systems",
    description: "Reusable product surfaces, design foundations, and responsive public experiences.",
    href: "/services",
    items: [SiNextdotjs, SiReact, SiTailwindcss, SiFigma],
  },
  {
    label: "Business logic",
    description: "Application workflows, payments, data handoffs, and operational automation.",
    href: "/solutions",
    items: [SiNodedotjs, SiTypescript, SiPrisma, SiStripe],
  },
  {
    label: "Data layer",
    description: "Flexible persistence and reporting foundations for evolving product teams.",
    href: "/projects",
    items: [SiMongodb, SiPostgresql],
  },
  {
    label: "Reliability",
    description: "Cloud platforms and deployment patterns chosen for release speed and uptime.",
    href: "/about",
    items: [SiVercel, SiCloudflare, SiDocker, SiFirebase],
  },
];

export default function TechStackStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useStaggerScale(sectionRef, { stagger: 0.08 });

  return (
    <Section ref={sectionRef} size="wide">
      <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
        <div>
          <Badge tone="blue">Technology layer</Badge>
          <p className="mt-4 section-copy">Modern tooling, selected for maintainable delivery rather than novelty.</p>
        </div>
        <Heading>Reusable foundations for product, data, cloud, and conversion workflows.</Heading>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stackGroups.map((group) => (
          <Card key={group.label} className="tech-stack-card p-6">
            {/* Icon row */}
            <div className="flex flex-wrap gap-3" style={{ color: "var(--color-text-muted)" }}>
              {group.items.map((Icon, index) => (
                <span
                  key={index}
                  data-scale-reveal
                  className="tech-icon-pill grid h-11 w-11 place-items-center rounded-[var(--radius-sm)]"
                  style={{
                    border: "1px solid var(--color-line)",
                    background: "var(--color-bg-elevated)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              ))}
            </div>

            {/* Label */}
            <h3
              className="mt-8 text-xl font-semibold"
              style={{ color: "var(--color-heading)" }}
            >
              {group.label}
            </h3>

            {/* Description */}
            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "var(--color-text-muted)" }}
            >
              {group.description}
            </p>

            {/* CTA link */}
            <Link
              href={group.href}
              className="tech-explore-link mt-6 inline-flex items-center gap-1.5 text-sm font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              Explore section
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </Card>
        ))}
      </div>

      <style>{`
        /* Light mode: give cards elevation so they stand out from ivory bg */
        [data-theme="light"] .tech-stack-card {
          background: #FFFFFF !important;
          border: 1px solid rgba(15,15,10,0.10) !important;
          box-shadow: 0 2px 12px rgba(15,15,10,0.06) !important;
        }
        [data-theme="light"] .tech-icon-pill {
          background: #F0EDE7 !important;
          border-color: rgba(15,15,10,0.10) !important;
          color: #3D3A31 !important;
        }
        .tech-explore-link:hover {
          opacity: 0.75;
        }
        /* Dark mode icon pill hover */
        [data-theme="dark"] .tech-icon-pill:hover,
        :root:not([data-theme]) .tech-icon-pill:hover {
          border-color: var(--color-accent) !important;
          color: var(--color-accent) !important;
        }
      `}</style>
    </Section>
  );
}
