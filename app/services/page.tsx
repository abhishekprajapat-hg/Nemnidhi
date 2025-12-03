"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SERVICE_PLANS } from "@/lib/plans";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <section className="bg-[#050509] text-zinc-50 min-h-screen">
      <Container className="py-16 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">
            Signature Plans
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Nemnidhi Digital Service Plans
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              built for calm, compound growth.
            </span>
          </h1>
        </div>

        {/* Timeline */}
        <div className="relative ml-5 space-y-16 border-l border-zinc-700/50">
          {SERVICE_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="relative pl-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              {/* Timeline node */}
              <motion.div
                className="absolute -left-[13px] top-3 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 shadow-[0_0_25px_rgba(251,191,36,0.45)]"
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05 + 0.05,
                  ease: [0.24, 0.8, 0.25, 1],
                }}
              >
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-500 border border-zinc-950" />
              </motion.div>

              {/* Glassy header block */}
              <div className="flex items-stretch justify-between gap-3">
                <div className="inline-flex w-full items-start justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
                  <div>
                    <div className="mb-1 inline-flex items-center gap-2 text-[10px] text-zinc-300">
                      <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black/70 px-2.5 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                        {plan.badge}
                      </span>
                    </div>
                    <h2 className="text-sm md:text-base font-semibold text-white">
                      {plan.name}
                    </h2>
                    <p className="mt-1 text-[11px] md:text-[12px] text-amber-200">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <p className="text-xs md:text-sm font-bold text-amber-300 whitespace-nowrap">
                      {plan.price}
                    </p>
                    <span className="mt-2 hidden text-[10px] uppercase tracking-[0.16em] text-zinc-400 md:block">
                      Plan {index + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 space-y-4 text-[12px] text-zinc-400">
                <div>
                  <p className="mb-1 text-[11px] font-medium text-zinc-300">
                    Best for
                  </p>
                  <ul className="space-y-1">
                    {plan.bestFor.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-[5px] w-[5px] rounded-full bg-amber-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-medium text-zinc-300">
                    Includes
                  </p>
                  <ul className="space-y-1">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-zinc-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-medium text-zinc-300">
                    Outcomes
                  </p>
                  <ul className="space-y-1">
                    {plan.outcomes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-6 py-2 text-[11px] font-semibold text-black"
                >
                  <a href={`/contact?plan=${encodeURIComponent(plan.id)}`}>
                    {plan.highlight === "custom"
                      ? "Custom Build Discussion"
                      : "Discuss this Plan"}
                  </a>
                </Button>
              </div>

              {/* Soft divider between steps */}
              {index < SERVICE_PLANS.length - 1 && (
                <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-zinc-800/70 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
