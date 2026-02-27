"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const smoothEase: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

const phrases = [
  "high-conversion websites",
  "scalable growth systems",
  "calm operations platforms",
];

export default function Hero({ hero }: any) {
  const content = hero || {
    badgeText: "Digital Systems Studio",
    headingMain: "We design",
    headingSuffix: "for brands that want steady, compounding growth.",
    subheading:
      "Senior strategy plus full-stack execution for founders and SMEs that are done with confusing websites and scattered tools.",
    primaryCtaLabel: "Book a strategy call",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "View projects",
    secondaryCtaHref: "/projects",
  };

  const secondaryHref =
    content.secondaryCtaHref === "/case-studies"
      ? "/projects"
      : content.secondaryCtaHref;
  const secondaryLabel =
    typeof content.secondaryCtaLabel === "string" &&
    content.secondaryCtaLabel.toLowerCase().includes("case studies")
      ? "View projects"
      : content.secondaryCtaLabel;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="theme-section overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-[100px]" />
        <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-orange-300/20 blur-[120px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-72 w-72 rounded-full bg-emerald-300/10 blur-[120px]" />
      </div>

      <Container className="relative z-10 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="space-y-7"
          >
            <div className="theme-pill">
              <Sparkles className="h-3.5 w-3.5" />
              {content.badgeText}
            </div>

            <h1 className="max-w-4xl text-4xl leading-[1.05] text-slate-50 md:text-6xl">
              {content.headingMain}{" "}
              <span className="inline-block bg-[linear-gradient(120deg,#7de7ff,#ffd39f)] bg-clip-text text-transparent">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phrases[index]}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {phrases[index]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              {content.headingSuffix}
            </h1>

            <p className="max-w-2xl text-[15px] leading-relaxed text-slate-300 md:text-[17px]">
              {content.subheading}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild>
                <a href={content.primaryCtaHref}>
                  {content.primaryCtaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={secondaryHref}>
                  {secondaryLabel}
                  <Compass className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>

            <div className="grid gap-3 pt-2 text-xs text-slate-300 sm:grid-cols-3">
              <div className="theme-card rounded-2xl px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Typical launch
                </p>
                <p className="mt-1 text-base font-semibold text-cyan-100">
                  6-10 weeks
                </p>
              </div>
              <div className="theme-card rounded-2xl px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Focus
                </p>
                <p className="mt-1 text-base font-semibold text-cyan-100">
                  Revenue outcomes
                </p>
              </div>
              <div className="theme-card rounded-2xl px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Team model
                </p>
                <p className="mt-1 text-base font-semibold text-cyan-100">
                  Senior-led delivery
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: smoothEase, delay: 0.1 }}
            className="theme-card-strong rounded-[2rem] p-6 md:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Growth Snapshot
              </p>
              <span className="rounded-full border border-cyan-200/55 bg-cyan-200/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                Live Plan
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Lead quality score
                </p>
                <p className="mt-1 text-3xl font-semibold text-slate-100">82 / 100</p>
                <div className="mt-3 h-2 rounded-full bg-slate-900/70">
                  <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-orange-300" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Conversion lift
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-200">+31%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Ops time saved
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-200">11 hrs/wk</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
