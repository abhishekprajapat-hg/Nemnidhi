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
          <Card key={group.label} className="p-6">
            <div className="flex flex-wrap gap-3 text-[#91A0B5]">
              {group.items.map((Icon, index) => (
                <span
                  key={index}
                  data-scale-reveal
                  className="grid h-11 w-11 place-items-center rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.035]"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              ))}
            </div>
            <h3 className="mt-8 text-xl font-semibold text-[#F8FBFF]">{group.label}</h3>
            <p className="mt-3 text-sm leading-7 text-[#AFC0D6]">{group.description}</p>
            <Link href={group.href} className="mt-6 inline-block text-sm font-extrabold text-[#F0D991]">
              Explore section
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
