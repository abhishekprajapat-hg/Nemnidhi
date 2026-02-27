"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import Container from "./Container";

const navPrimary = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
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
  { icon: SiX, url: "https://www.twitter.com", label: "X" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-section border-t border-white/10 bg-[#050b17]/85 [border-color:var(--line)]">
      <Container className="py-12 text-sm">
        <div className="mb-10 grid gap-8 border-b border-white/10 pb-8 [border-color:var(--line)] md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-100/45 bg-[linear-gradient(140deg,rgba(65,214,255,0.96),rgba(255,181,106,0.92))] text-sm font-black text-[#031326] shadow-[0_16px_34px_rgba(65,214,255,0.24)]">
                N
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-50">Nemnidhi</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  Strategy. Build. Growth.
                </p>
              </div>
            </div>

            <p className="max-w-xl text-[13px] leading-relaxed text-slate-300">
              We design conversion-ready websites, lead systems, and internal
              operations tools for founders who want long-term clarity instead of
              short-term noise.
            </p>
          </div>

          <div className="theme-card rounded-2xl p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100">
              Contact
            </p>
            <ul className="space-y-3 text-[13px] text-slate-300">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-cyan-200" />
                <a href="tel:+917000455463" className="hover:text-cyan-100">
                  +91 70004 55463
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-cyan-200" />
                <a
                  href="mailto:info@nemnidhi.com"
                  className="break-all hover:text-cyan-100"
                >
                  info@nemnidhi.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan-200" />
                <span className="text-slate-400">
                  B20, 5th Floor Gravity Mall, Mechanic Nagar, Indore, MP 452011
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-7 border-b border-white/10 pb-8 [border-color:var(--line)] md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-xs">
              {navPrimary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-slate-300 transition hover:border-cyan-200/55 hover:text-cyan-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 text-[12px] text-slate-400">
              {navSecondary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-slate-200"
                >
                  {item.label}
                </Link>
              ))}
              <span className="text-slate-500">GSTIN: 23CGZPB7175E1Z5</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, url, label }) => (
              <Link
                key={url}
                href={url}
                target="_blank"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-200/55 hover:text-cyan-100"
              >
                <Icon className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-5 text-xs text-slate-500">
          <p>Copyright {year} Nemnidhi. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
