"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SERVICE_PLANS } from "@/lib/plans";

export default function ServicesPage() {
  return (
    <section className="theme-section min-h-screen">
      <Container className="py-16 md:py-22">
        <header className="mb-12 space-y-5">
          <p className="theme-pill">Service Plans</p>
          <h1 className="max-w-4xl text-4xl text-slate-50 md:text-5xl">
            Structured plans for founders who want clear execution, not random
            projects.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Choose a level based on where your business is today. Each plan is
            built around outcomes, decision speed, and system clarity.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICE_PLANS.map((plan, index) => (
            <motion.article
              key={plan.id}
              className="theme-card rounded-3xl p-5 md:p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    {plan.badge ?? "Plan"}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-100">
                    {plan.name}
                  </h2>
                  <p className="mt-1 text-sm text-cyan-100">{plan.tagline}</p>
                </div>
                <span className="rounded-full border border-cyan-200/45 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  {plan.price}
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Best For
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {plan.bestFor.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-orange-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Includes
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-slate-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Outcomes
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {plan.outcomes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild>
                  <a href={`/contact?plan=${encodeURIComponent(plan.id)}`}>
                    {plan.highlight === "custom"
                      ? "Discuss a custom engagement"
                      : "Discuss this plan"}
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
