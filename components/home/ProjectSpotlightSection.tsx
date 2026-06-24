import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { AnimatedDivider } from "@/components/motion/AnimatedDivider";

const TRUSTED = ["NEM", "OS", "CRM", "WEB"];

export default function ProjectSpotlightSection() {
  return (
    <Section size="wide" containerClassName="pt-10 md:pt-16">
      <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
        <div>
          <Badge>Enterprise product studio</Badge>
          <Heading className="mt-5">We design digital systems that make businesses look credible and operate sharper.</Heading>
        </div>
        <div>
          <p className="section-copy">
            Nemnidhi combines strategy, interface design, engineering, and automation into one connected delivery layer for growth-focused teams.
          </p>
          <div className="mt-6 flex flex-wrap gap-5">
            <Link href="/contact" className="text-arrow-link">
              Discuss partnership <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/projects" className="text-arrow-link text-[#D9E2EF]">
              View work
            </Link>
          </div>
        </div>
      </div>

      <AnimatedDivider className="mt-12" />

      <div className="mt-12 grid gap-4 lg:grid-cols-[0.72fr_0.28fr]">
        <Card className="p-6 md:p-8">
          <p className="section-eyebrow">Operating belief</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="section-copy">
              Premium fintech websites win when they feel clear, stable, and trustworthy from the first interaction. The foundation must do the quiet work before motion is layered in.
            </p>
            <p className="section-copy">
              This system is built around accessible contrast, reusable primitives, conservative spacing, and surfaces that can scale across landing pages, dashboards, and product workflows.
            </p>
          </div>
        </Card>

        <Card variant="plain" className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] bg-white/10 p-0">
          {TRUSTED.map((item) => (
            <div key={item} className="grid min-h-28 place-items-center bg-[#07111F] font-mono text-xl font-semibold text-[#91A0B5]">
              {item}
            </div>
          ))}
        </Card>
      </div>
    </Section>
  );
}
