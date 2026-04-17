import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import HeroScene3D from "@/components/home/HeroScene3D";

type HeroContent = {
  headingMain?: string;
  headingHighlight?: string;
  headingSuffix?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

type HeroProps = {
  hero?: HeroContent | null;
};

export default function Hero({ hero }: HeroProps) {
  const content = hero || {
    headingMain: "Code. Deploy. Scale.",
    subheading:
      "Nemnidhi builds coding-first product systems, automation pipelines, and secure engineering workflows designed for long-term scale.",
    primaryCtaLabel: "Book Tech Demo",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "View Engineering Projects",
    secondaryCtaHref: "/projects",
  };

  const heading = [content.headingMain, content.headingHighlight, content.headingSuffix]
    .filter(Boolean)
    .join(" ");
  const primaryCtaHref = content.primaryCtaHref ?? "/contact";
  const primaryCtaLabel = content.primaryCtaLabel ?? "Book Tech Demo";
  const secondaryCtaHref = content.secondaryCtaHref ?? "/projects";
  const secondaryCtaLabel = content.secondaryCtaLabel ?? "View Engineering Projects";

  return (
    <section className="theme-section relative overflow-hidden border-b border-[#3A5675]/34 px-6 py-12 text-center md:px-0 md:text-left">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-10">
          <div className="z-10 space-y-6 md:col-span-4">
            <p className="theme-pill w-fit">Code-First Growth Architecture</p>
            <h1 className="text-4xl font-bold leading-[1.02] text-[#E7F0FF] md:text-6xl">{heading}</h1>
            <p className="text-base leading-8 text-[#AABFD4]">{content.subheading}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-2 md:justify-start">
              <Button asChild>
                <Link href={primaryCtaHref}>
                  {primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex w-full justify-end md:col-span-6">
            <HeroScene3D />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="theme-card p-5 text-center">
            <p className="text-4xl font-bold text-[#69AEFF]">150K+</p>
            <p className="mt-1 text-sm text-[#AABFD4]">Production commits shipped</p>
          </div>
          <div className="theme-card p-5 text-center">
            <p className="text-4xl font-bold text-[#69AEFF]">99.95%</p>
            <p className="mt-1 text-sm text-[#AABFD4]">Deployment uptime SLA</p>
          </div>
          <div className="theme-card p-5 text-center">
            <p className="text-4xl font-bold text-[#69AEFF]">240+</p>
            <p className="mt-1 text-sm text-[#AABFD4]">Automation modules deployed</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
