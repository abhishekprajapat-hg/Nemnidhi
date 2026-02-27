"use client";

import { ArrowUpRight } from "lucide-react";
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
    <section className="theme-section">
      <Container className="py-16 md:py-20">
        <div
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-3">
            <p className="theme-pill">Core Services</p>
            <h2 className="max-w-3xl text-3xl text-slate-50 md:text-4xl">
              Strategy, product, and engineering in one execution layer.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            We work with founders who need measurable progress: stronger lead
            flow, cleaner operations, and digital assets that keep compounding
            after launch.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service._id ?? service.title}
              className="theme-card group rounded-3xl p-5 md:p-6"
              data-aos="fade-up"
              data-aos-delay={100 + index * 70}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-100">
                    {service.title}
                  </h3>
                </div>
                <span className="rounded-full border border-cyan-200/45 bg-cyan-200/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                  Delivery
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-300">
                {service.description}
              </p>

              <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
                {service.points?.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-orange-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] [border-color:var(--line)]">
                <span className="text-slate-400">Strategy + execution partner</span>
                <span className="inline-flex items-center gap-1 text-cyan-100 opacity-80 transition group-hover:opacity-100">
                  Tailored scope
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
