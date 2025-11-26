"use client";

import Container from "@/components/layout/Container";
import Link from "next/link";

export default function ContactStrip() {
  return (
    <section className="border-t border-b border-zinc-900 bg-gradient-to-r from-black via-[#050509] to-black">
      <Container className="py-5">
        <div
          className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between"
          data-aos="fade-up"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Ready when you are
            </p>
            <p className="text-sm text-zinc-200 md:text-[15px]">
              If you&apos;re serious about tightening your digital systems,
              we can usually spot 2–3 quick wins on a short call.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-4 py-1.5 text-[12px] font-semibold tracking-wide text-zinc-950 shadow-[0_12px_30px_rgba(180,120,20,0.9)] transition hover:-translate-y-0.5"
            >
              <span>Book a strategy call</span>
              <span className="text-[11px] text-zinc-900/80">→</span>
            </Link>
            <span className="text-[11px] text-zinc-500">
              No hard pitch. Just clarity on what to fix next.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
