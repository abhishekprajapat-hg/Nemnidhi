// components/layout/Footer.tsx
"use client";

import Container from "./Container";
import Link from "next/link";
import { SiLinkedin, SiInstagram, SiGithub, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();

  const navPrimary = [
    { href: "/services", label: "Services" },
    { href: "/solutions", label: "Solutions" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const navSecondary = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  const socials = [
    { icon: SiLinkedin, url: "https://www.linkedin.com", label: "LinkedIn" },
    { icon: SiInstagram, url: "https://www.instagram.com", label: "Instagram" },
    { icon: SiGithub, url: "https://www.github.com", label: "GitHub" },
    { icon: SiX, url: "https://www.twitter.com", label: "X (Twitter)" },
  ];

  return (
    <footer className="relative border-t border-zinc-900 bg-[#050509]">
      {/* gold glow gradient bar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      <Container className="py-10 text-sm text-zinc-400">
        {/* Top row: brand + statement */}
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-base font-bold text-zinc-900 shadow-[0_0_22px_rgba(180,120,20,0.7)]">
              N
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-100">
                Nemnidhi — Business & Tech Studio
              </h3>
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Calm digital systems for serious founders
              </p>
            </div>
          </div>

          <p className="max-w-md text-xs text-zinc-500">
            We help SMEs and founders turn messy websites and scattered tools
            into clear, conversion-focused experiences and quiet, reliable systems.
          </p>
        </div>

        {/* Middle row: nav + contact + socials */}
        <div className="mb-7 flex flex-col gap-6 border-t border-zinc-900/80 pt-6 md:flex-row md:items-start md:justify-between">
          {/* Navigation */}
          <div className="flex flex-1 flex-wrap gap-6 text-xs">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Navigate
              </p>
              <div className="flex flex-wrap gap-3">
                {navPrimary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-zinc-400 transition hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Legal
              </p>
              <div className="flex flex-wrap gap-3">
                {navSecondary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-zinc-500 transition hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact + Socials */}
          <div className="flex flex-col items-start gap-3 text-xs md:items-end">
            <div className="space-y-1 text-right md:text-right">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Contact
              </p>
              <p className="text-zinc-300">
                Prefer email?{" "}
                <a
                  href="mailto:info@nemnidhi.com"
                  className="text-amber-300 hover:text-amber-200"
                >
                  info@nemnidhi.com
                </a>
              </p>
              <p className="text-[11px] text-zinc-500">
                Typically respond within 24 hours on weekdays.
              </p>
            </div>

            <div className="mt-2 flex items-center gap-3 text-zinc-500">
              {socials.map(({ icon: Icon, url, label }) => (
                <Link
                  key={url}
                  href={url}
                  target="_blank"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 text-[13px] transition hover:border-amber-400/60 hover:text-amber-300"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: meta */}
        <div className="flex flex-col gap-3 border-t border-zinc-900/80 pt-4 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Nemnidhi™. All rights reserved.
          </p>
          
        </div>

        {/* Bottom underline micro detail */}
        <div className="pointer-events-none mt-4 h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </Container>
    </footer>
  );
}
