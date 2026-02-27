"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050a14]/75 backdrop-blur-xl [border-color:var(--line)]">
      <Container className="flex h-20 items-center justify-between gap-5">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-cyan-100/40 bg-[linear-gradient(135deg,rgba(65,214,255,0.95),rgba(255,181,106,0.95))] text-sm font-black text-[#051327] shadow-[0_16px_30px_rgba(65,214,255,0.24)]">
            N
            <span className="absolute inset-0 translate-x-[-120%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[130%]" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-100">Nemnidhi</p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
              Digital Growth Systems
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition",
                  isActive
                    ? "border-cyan-200/55 bg-cyan-200/10 text-cyan-100"
                    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-slate-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="cta-primary !px-4 !py-2">
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] p-2.5 text-slate-100 transition hover:bg-white/[0.08] md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#071126]/95 backdrop-blur-xl [border-color:var(--line)] md:hidden">
          <Container className="flex flex-col gap-2 py-4">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "rounded-xl border px-4 py-2.5 text-sm transition",
                    isActive
                      ? "border-cyan-200/55 bg-cyan-200/10 text-cyan-100"
                      : "border-white/10 bg-white/[0.02] text-slate-300 hover:text-slate-100"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="cta-primary mt-2 w-full justify-center"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
