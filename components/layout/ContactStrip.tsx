"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/layout/Container";

export default function ContactStrip() {
  return (
    <section className="theme-section border-y border-white/10 [border-color:var(--line)]">
      <Container className="py-8">
        <div
          className="theme-card-strong flex flex-col gap-5 rounded-3xl px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7"
          data-aos="fade-up"
        >
          <div className="space-y-2">
            <p className="theme-pill w-fit">Ready To Build</p>
            <p className="max-w-2xl text-sm text-slate-200 md:text-base">
              If your website and systems are slowing growth, we can usually spot
              two or three high-leverage fixes on a short call.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className="cta-primary">
              Book a strategy call
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-xs text-slate-400">
              No hard pitch. Just a clear plan for what to fix first.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
