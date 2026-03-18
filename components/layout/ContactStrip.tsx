"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";

export default function ContactStrip() {
  return (
    <section className="enterprise-strip px-6 py-8 md:px-0 md:py-10">
      <Container>
        <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="w-full md:w-[50%]">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Make better a reality</h2>
          </div>
          <div className="w-full md:w-[34%]">
            <p className="text-base text-white/90">
              Driving creativity in product development and business operations.
            </p>
          </div>
          <div className="w-full md:flex md:w-[16%] md:justify-end">
            <Link href="/contact" className="cta-primary w-full justify-center bg-[#0D8AFD] hover:bg-[#0066CC] md:w-auto">
              Book Live Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
