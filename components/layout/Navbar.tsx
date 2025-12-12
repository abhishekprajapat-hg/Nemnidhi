// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import Container from "./Container";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "ervices" },
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-[#050509]/95 backdrop-blur-md transition-shadow">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-sm font-bold text-zinc-950 shadow-[0_0_22px_rgba(180,120,20,0.7)]">
            N
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-zinc-50">
              Nemnidhi
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Business &amp; Tech Studio
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative pb-0.5 text-[13px] tracking-wide transition-colors duration-150 hover:text-amber-200",
                  isActive && "text-amber-200"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_12px_rgba(250,204,21,0.7)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-4 py-1.5 text-[12px] font-semibold tracking-wide text-zinc-950 shadow-[0_16px_40px_rgba(180,120,20,0.9)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(180,120,20,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050509]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-zinc-900" />
            </span>
            <span>Book a strategy call</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-200"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-[#050509]/98 backdrop-blur-md">
          <nav className="flex flex-col space-y-3 px-6 py-3 text-sm text-zinc-300">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "py-2 text-[13px] tracking-wide transition-colors hover:text-amber-200",
                    isActive && "font-medium text-amber-200"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-4 py-2 text-[12px] font-semibold tracking-wide text-zinc-950 shadow-[0_14px_36px_rgba(180,120,20,0.95)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-zinc-900" />
              </span>
              <span>Book a strategy call</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
