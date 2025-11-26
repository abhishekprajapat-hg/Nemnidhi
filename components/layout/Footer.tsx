// components/layout/Footer.tsx
"use client";

import Container from "./Container";
import Link from "next/link";
import { SiLinkedin, SiInstagram, SiGithub, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-900 bg-[#050509]">
      {/* gold glow gradient bar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      <Container className="flex flex-col gap-8 py-10 text-sm text-zinc-400">
        {/* Top branding row */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-base font-bold text-zinc-900 shadow-[0_0_22px_rgba(180,120,20,0.7)]">
              N
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-100">
                Nemnidhi — Business & Tech Studio
              </h3>
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Premium digital systems & strategy
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-zinc-400">
            {[
              { icon: SiLinkedin, url: "https://www.linkedin.com" },
              { icon: SiInstagram, url: "https://www.instagram.com" },
              { icon: SiGithub, url: "https://www.github.com" },
              { icon: SiX, url: "https://www.twitter.com" },
            ].map(({ icon: Icon, url }) => (
              <Link
                key={url}
                href={url}
                target="_blank"
                className="transition hover:text-amber-300"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Links / Info */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-zinc-500">
            © {year} Nemnidhi™. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link
              href="/privacy"
              className="transition hover:text-amber-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-amber-300"
            >
              Terms & Conditions
            </Link>
            <span className="text-zinc-500">
              Built with Next.js · MERN · Precision
            </span>
          </div>
        </div>

        {/* Bottom underline micro detail */}
        <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </Container>
    </footer>
  );
}
