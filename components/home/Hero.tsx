"use client";

import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

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
    headingMain: "The future of Work, Today",
    subheading:
      "Nemnidhi builds enterprise software and growth systems that are intelligent, adaptive, and designed for long-term scale.",
    primaryCtaLabel: "Book Live Demo",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "View Projects",
    secondaryCtaHref: "/projects",
  };

  const heading = [content.headingMain, content.headingHighlight, content.headingSuffix]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="border-b border-[#E9E9E9] bg-[#F0F0F0] px-6 py-10 text-center md:px-0 md:text-left">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-10">
          <div className="z-10 space-y-6 md:col-span-4">
            <h1 className="text-4xl font-bold leading-tight text-[#003464] md:text-5xl">{heading}</h1>
            <p className="text-base leading-7 text-[#333333]">{content.subheading}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-2 md:justify-start">
              <Button asChild>
                <a href={content.primaryCtaHref}>
                  {content.primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={content.secondaryCtaHref}>{content.secondaryCtaLabel}</a>
              </Button>
            </div>
          </div>

          <div className="relative flex w-full justify-end md:col-span-6">
            <div className="relative w-full overflow-hidden rounded-xl border border-[#E9E9E9] bg-black pb-[60%] shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
              <video
                className="absolute left-0 top-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/videos/nemnidhi-hero-v3-poster.jpg"
                aria-label="Nemnidhi hero video"
              >
                <source src="/videos/nemnidhi-hero-v3.mp4" type="video/mp4" />
              </video>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b36]/85 via-[#001b36]/35 to-transparent" />

              <div className="absolute left-4 top-4 rounded-md border border-white/35 bg-[#003464]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white md:left-5 md:top-5">
                Live Project View
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-6">
                <p className="text-xl font-semibold leading-tight md:text-2xl">Website. Automation. Growth Stack.</p>
                <p className="mt-1 text-sm text-[#DCEEFF] md:text-base">
                  Built for founder-led teams that want clear execution and compounding systems.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md border border-white/30 bg-white/10 px-2.5 py-1 text-xs text-[#EAF5FF]">
                    Conversion Web
                  </span>
                  <span className="rounded-md border border-white/30 bg-white/10 px-2.5 py-1 text-xs text-[#EAF5FF]">
                    CRM Automation
                  </span>
                  <span className="rounded-md border border-white/30 bg-white/10 px-2.5 py-1 text-xs text-[#EAF5FF]">
                    Ops Dashboard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="theme-card p-5 text-center">
            <p className="text-4xl font-bold text-[#003464]">2000+</p>
            <p className="mt-1 text-sm text-[#333333]">Brands trust Nemnidhi</p>
          </div>
          <div className="theme-card p-5 text-center">
            <p className="text-4xl font-bold text-[#003464]">100%</p>
            <p className="mt-1 text-sm text-[#333333]">Go-live commitment rate</p>
          </div>
          <div className="theme-card p-5 text-center">
            <p className="text-4xl font-bold text-[#003464]">99%</p>
            <p className="mt-1 text-sm text-[#333333]">Retention across programs</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
