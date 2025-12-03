import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const PRINCIPLES = [
  {
    title: "Calm over chaos",
    body: "We don’t sell you more tools. We simplify your stack so your team actually breathes easier and ships faster.",
  },
  {
    title: "Strategy before screens",
    body: "We start with offers, positioning, and real constraints. Figma and code come later — not the other way around.",
  },
  {
    title: "Compounding > campaigns",
    body: "We focus on systems you can keep using for years, not just one flashy launch or campaign spike.",
  },
  {
    title: "Plain language, honest calls",
    body: "No buzzword soup. We explain tradeoffs, say no when needed, and tell you early if we’re not the right fit.",
  },
];

const PROCESS = [
  {
    step: "01",
    label: "Discovery",
    title: "Understand where you are",
    body: "We map your current site, tools, and bottlenecks — and define what a win in 6–12 months actually means.",
  },
  {
    step: "02",
    label: "Design",
    title: "Architect the path",
    body: "We sketch the offers, flows, and systems that will move the needle — before touching code or UI polish.",
  },
  {
    step: "03",
    label: "Build",
    title: "Ship the real thing",
    body: "We build in focused sprints, keep you close to decisions, and avoid surprise handovers at the end.",
  },
  {
    step: "04",
    label: "Evolve",
    title: "Refine with reality",
    body: "Once live, we watch how people actually use it and make small, sharp improvements instead of big, noisy rebuilds.",
  },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-[#050509] text-zinc-50">
      <Container className="py-16 md:py-24">
        {/* Hero */}
        <header
          className="mb-14 space-y-6"
          data-aos="fade-right"
          data-aos-delay="60"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1">
            <span className="h-1 w-1 rounded-full bg-amber-300" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
              About
            </p>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl font-semibold md:text-4xl lg:text-[2.6rem]">
              A calm digital partner
              <span className="block bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                for founders who think in years, not weeks.
              </span>
            </h1>
            <p className="text-sm text-zinc-300 md:text-base max-w-2xl">
              Nemnidhi helps SMEs and founders turn messy websites and scattered
              tools into clear, conversion-focused experiences and quiet, reliable
              systems. Less chaos, more compounding.
            </p>
          </div>

          <div className="grid gap-4 text-[12px] text-zinc-400 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Based in
              </p>
              <p className="text-zinc-200">India, collaborating with teams remotely.</p>
              <p className="text-zinc-500">
                Comfortable working across time zones, async-first communication.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Who we work with
              </p>
              <p>
                SMEs, founders, and lean teams who are serious about their brand,
                but don&apos;t want a giant agency circus.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                What we bring
              </p>
              <p>
                Full-stack product thinking: strategy, UX, dev, and systems — not
                just “make it look nice” design.
              </p>
            </div>
          </div>
        </header>

        {/* Philosophy / Principles */}
        <section
          className="mb-16 space-y-8 border-t border-zinc-900/80 pt-10"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              How we think
            </p>
            <p className="text-sm text-zinc-300">
              Under every project, there are a few non-negotiable principles.
              They keep us (and you) from drifting into busywork and shiny tools
              that don&apos;t actually move the business.
            </p>
          </div>

          <div className="space-y-6">
            {PRINCIPLES.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-3 border-b border-zinc-900/80 pb-5 last:border-b-0 md:grid-cols-[120px_minmax(0,1fr)]"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Principle {String(index + 1).padStart(2, "0")}
                </div>
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold text-zinc-50">
                    {item.title}
                  </h2>
                  <p className="text-[12px] text-zinc-400">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process – linear, no cards */}
        <section
          className="mb-16 space-y-8 border-t border-zinc-900/80 pt-10"
          data-aos="fade-up"
          data-aos-delay="90"
        >
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              How engagements usually run
            </p>
            <p className="text-sm text-zinc-300">
              Every project is different, but the rhythm is similar: clarify,
              design, build, and then keep improving with real data.
            </p>
          </div>

          <div className="relative ml-4 flex gap-6">
            {/* vertical line / timeline */}
            <div className="relative flex flex-col items-center">
              <div className="absolute left-[7px] top-3 h-[88%] w-px bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900" />
              {PROCESS.map((step, i) => (
                <div
                  key={step.step}
                  className="relative z-10 mb-10 flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/10 text-[11px] font-semibold text-amber-100 last:mb-0"
                >
                  {step.step}
                </div>
              ))}
            </div>

            {/* content */}
            <div className="flex-1 space-y-8">
              {PROCESS.map((step) => (
                <div
                  key={step.step}
                  className="space-y-2 border-b border-zinc-900/80 pb-6 last:border-b-0 last:pb-0"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    {step.label}
                  </p>
                  <h3 className="text-sm font-semibold text-zinc-50">
                    {step.title}
                  </h3>
                  <p className="text-[12px] text-zinc-400">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Small founder / studio note (no photo, just text) */}
        <section
          className="mb-14 space-y-6 border-t border-zinc-900/80 pt-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Behind the studio
              </p>
              <p className="text-sm text-zinc-300 md:text-base">
                Nemnidhi is intentionally small — a core product / engineering
                brain with a network of specialist designers, writers, and
                implementers brought in as needed. You get senior thinking on
                the call, not just in slide decks.
              </p>
              <p className="text-[12px] text-zinc-400">
                We stay close to the work: mapping journeys, naming offers,
                sketching flows, and writing copy before we touch pixels and
                code. And we value long-term relationships over one-off gigs.
              </p>
            </div>

            <div className="space-y-3 text-[12px] text-zinc-400">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                What clients usually say
              </p>
              <p>
                “We finally know what our site is supposed to do.”  
                “The team actually uses the tools now.”  
                “We&apos;re not embarrassed to send people to our website anymore.”
              </p>
              <p className="text-[11px] text-zinc-500">
                That&apos;s the bar: clarity, calm, and confidence — not just a
                pretty UI.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div
          className="border-t border-zinc-900/80 pt-8 text-center space-y-3"
          data-aos="fade-up"
          data-aos-delay="110"
        >
          <p className="text-[12px] text-zinc-400">
            Want to see how this thinking applies to your brand?
          </p>
          <p className="text-sm text-zinc-300">
            Share where you are today, and we&apos;ll tell you honestly
            whether Nemnidhi is the right partner — and what we&apos;d do first.
          </p>
          <Button
            asChild
            className="mt-2 rounded-full bg-zinc-100 px-6 py-2 text-[11px] font-semibold text-zinc-950"
          >
            <a href="/contact?from=about">
              Start a conversation
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
