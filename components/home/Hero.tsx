"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-zinc-900 bg-[#050509]"
      data-aos="fade-up"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft gold glows */}
        <div className="absolute -left-32 -top-10 h-72 w-72 rounded-full bg-amber-500/12 blur-3xl" />
        <div className="absolute right-[-60px] top-10 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute bottom-[-80px] left-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        {/* subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.12),_transparent_55%)]" />

        {/* hairline grid */}
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,#27272a_1px,transparent_0)] [background-size:22px_22px]" />

        {/* bottom gold line */}
        <div className="absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
      </div>

      <Container className="relative flex flex-col items-center gap-12 py-16 md:flex-row md:py-24">
        {/* Left */}
        <div
          className="flex-1 space-y-7"
          data-aos="fade-right"
          data-aos-delay="80"
        >
          {/* Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-100 shadow-[0_0_26px_rgba(245,158,11,0.55)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300/80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-200" />
            </span>
            <span>Business · Strategy · Technology</span>
          </div>

          {/* Heading + Subheading */}
          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold leading-tight text-zinc-50 md:text-5xl lg:text-[3.4rem]">
              We architect{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                black-label digital systems
              </span>{" "}
              for brands that refuse to look average.
            </h1>

            <p className="max-w-xl text-sm text-zinc-300/95 md:text-base">
              Nemnidhi blends senior-level strategy with full-stack MERN
              execution — crafting websites and platforms that feel
              meticulously designed, convert quietly, and scale like a serious
              business asset, not just a pretty brochure.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {/* Primary CTA – gold pill */}
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-6 py-2 text-[13px] font-semibold tracking-wide text-zinc-950 shadow-[0_18px_45px_rgba(180,120,20,0.75)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(180,120,20,0.95)]"
            >
              <a href="/contact" className="inline-flex items-center gap-2">
                <span>Book a private strategy call</span>
                <span className="text-[11px] text-zinc-900/80">
                  → Limited slots
                </span>
              </a>
            </Button>

            {/* Secondary CTA – outline */}
            <Button
              asChild
              variant="ghost"
              className="rounded-full border border-zinc-700/80 bg-black/70 px-5 py-2 text-[13px] text-zinc-100 hover:border-amber-300/80 hover:bg-zinc-950/90"
            >
              <a href="/case-studies" className="inline-flex items-center gap-2">
                <span>View case studies</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              </a>
            </Button>
          </div>

          {/* Micro trust line */}
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            No templates. No noise. Just calm, compound growth engineered in
            black & gold.
          </p>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-4 pt-4 text-xs md:gap-6"
            data-aos="fade-up"
            data-aos-delay="220"
          >
            <div className="min-w-[150px] rounded-2xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-3">
              <div className="text-[11px] uppercase tracking-wide text-zinc-400">
                Lead Quality
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-semibold text-amber-300">
                  30%+
                </span>
                <span className="text-[11px] text-amber-100/90">
                  avg uplift
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-amber-400 to-yellow-300" />
              </div>
            </div>

            <div className="min-w-[150px] rounded-2xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-3">
              <div className="text-[11px] uppercase tracking-wide text-zinc-400">
                Projects Shipped
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-semibold text-zinc-50">
                  10+
                </span>
                <span className="text-[11px] text-zinc-400">
                  web builds
                </span>
              </div>
              <div className="mt-2 text-[11px] text-zinc-400">
                From boutique brands to growth-stage teams.
              </div>
            </div>

            <div className="min-w-[150px] rounded-2xl border border-amber-500/40 bg-gradient-to-br from-zinc-950 via-black to-amber-900/20 p-3">
              <div className="text-[11px] uppercase tracking-wide text-amber-100">
                Response Time
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-semibold text-amber-200">
                  &lt;24h
                </span>
                <span className="text-[11px] text-zinc-200/80">
                  on weekdays
                </span>
              </div>
              <div className="mt-2 text-[11px] text-zinc-300">
                Direct access, founder-level thinking, no agency fog.
              </div>
            </div>
          </div>
        </div>

        {/* Right – Premium dashboard card */}
        <div
          className="flex-1 w-full max-w-md md:max-w-lg"
          data-aos="fade-left"
          data-aos-delay="140"
        >
          <div className="mx-auto w-full rounded-3xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            {/* Top bar */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400/90" />
                <span className="h-2 w-2 rounded-full bg-zinc-500/90" />
                <span className="h-2 w-2 rounded-full bg-zinc-700/90" />
              </div>
              <span className="rounded-full border border-amber-400/40 bg-black/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-100">
                Signature View
              </span>
            </div>

            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-medium text-zinc-400">
                    Nemnidhi Performance Suite
                  </div>
                  <div className="text-sm font-semibold text-zinc-50">
                    Black & Gold acquisition board
                  </div>
                </div>
                <div className="rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-300/20 px-2.5 py-1 text-[10px] font-medium text-amber-100">
                  +32.8% vs last month
                </div>
              </div>

              {/* Metric cards */}
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div className="rounded-2xl border border-zinc-800 bg-black/80 p-2.5">
                  <div className="text-[10px] text-zinc-400">
                    Website Leads
                  </div>
                  <div className="mt-1 text-sm font-semibold text-zinc-50">
                    184
                  </div>
                  <div className="mt-1 text-[10px] text-amber-200">
                    ↑ 27% this week
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-black/80 p-2.5">
                  <div className="text-[10px] text-zinc-400">
                    Booking Rate
                  </div>
                  <div className="mt-1 text-sm font-semibold text-zinc-50">
                    18.6%
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
                    <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-amber-300 to-yellow-300" />
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/45 bg-gradient-to-br from-black via-zinc-950 to-amber-900/35 p-2.5">
                  <div className="text-[10px] text-amber-100">
                    Avg. Response
                  </div>
                  <div className="mt-1 text-sm font-semibold text-amber-200">
                    2h 14m
                  </div>
                  <div className="mt-1 text-[10px] text-amber-100/90">
                    SLA on track
                  </div>
                </div>
              </div>

              {/* Funnel */}
              <div className="space-y-2 rounded-2xl border border-zinc-800 bg-black/80 p-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-zinc-100">
                    Funnel snapshot
                  </span>
                  <span className="text-zinc-500">Last 14 days</span>
                </div>
                <div className="flex flex-col gap-2 text-[10px] text-zinc-200">
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-zinc-400">Visitors</span>
                    <div className="h-1.5 flex-1 rounded-full bg-zinc-900">
                      <div className="h-full w-[88%] rounded-full bg-zinc-500" />
                    </div>
                    <span>8.1k</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-zinc-400">Leads</span>
                    <div className="h-1.5 flex-1 rounded-full bg-zinc-900">
                      <div className="h-full w-[46%] rounded-full bg-amber-300" />
                    </div>
                    <span>374</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-zinc-400">Booked</span>
                    <div className="h-1.5 flex-1 rounded-full bg-zinc-900">
                      <div className="h-full w-[21%] rounded-full bg-yellow-300" />
                    </div>
                    <span>79</span>
                  </div>
                </div>
              </div>

              {/* Bottom strip */}
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/90 px-3 py-2.5 text-[10px] text-zinc-200">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <span>Curated & monitored by Nemnidhi&apos;s core team</span>
                </span>
                <span className="bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
                  View full breakdown →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
