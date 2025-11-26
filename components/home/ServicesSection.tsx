// components/home/ServicesSection.tsx
"use client";

import Container from "@/components/layout/Container";

type Service = {
  _id?: string;
  title: string;
  description: string;
  points: string[];
};

type ServicesSectionProps = {
  services: Service[];
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="border-b border-zinc-900 bg-[#050509]">
      <Container className="py-16 md:py-20">
        {/* Header */}
        <div
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/60 px-3 py-1">
              <span className="h-1 w-1 rounded-full bg-amber-300" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                Services
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-zinc-50 md:text-3xl">
                Business &amp; tech services,
                <span className="block bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  crafted as one premium stack.
                </span>
              </h2>
              <div className="mt-3 h-px w-20 bg-gradient-to-r from-amber-400 via-yellow-300 to-transparent" />
            </div>
          </div>

          <p className="max-w-md text-sm text-zinc-300">
            We partner with SMEs and startups who want more than <em>“just a
            website”</em>. Each engagement is built around measurable outcomes:
            better leads, cleaner processes, and systems that compound quietly
            in the background.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service._id ?? service.title}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-900 bg-gradient-to-br from-black via-[#050509] to-zinc-950/80 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.75)] transition duration-200 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-[0_26px_70px_rgba(0,0,0,0.9)]"
              data-aos="fade-up"
              data-aos-delay={100 + index * 80}
            >
              {/* Top subtle gold overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
              </div>

              {/* Label row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-base font-semibold text-zinc-50">
                    {service.title}
                  </h3>
                </div>

                <div className="rounded-full border border-amber-400/40 bg-black/80 px-2 py-1 text-[10px] font-medium text-amber-100">
                  Core Offer
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300">{service.description}</p>

              {/* Points */}
              <ul className="mt-1 space-y-1.5 text-[11px] text-zinc-400">
                {service.points?.map((point, idx) => (
                  <li key={idx + point} className="flex gap-2">
                    <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 group-hover:scale-110 group-hover:brightness-110" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom meta */}
              <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1 w-6 rounded-full bg-gradient-to-r from-amber-400 to-transparent" />
                  <span>Strategy + Execution</span>
                </span>
                <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-amber-200">
                  Tailored for your stage →
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
