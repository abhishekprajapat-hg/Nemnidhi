import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { SiLinkedin, SiX } from "react-icons/si";
import Container from "./Container";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/solutions", label: "Solutions" },
];

const resourceLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { icon: SiLinkedin, url: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: SiX, url: "https://www.twitter.com", label: "X" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="deferred-section border-t border-[#3A5675]/38 bg-transparent">
      <Container className="py-12 md:py-14">
        <div className="surface-3d mb-7 overflow-hidden rounded-2xl border border-[#5b8ab4]/55 bg-[linear-gradient(145deg,#33DEC0,#004DC5)] p-6 text-white md:flex md:items-end md:justify-between md:gap-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EAF2FF]">
              <Sparkles className="h-3.5 w-3.5" />
              3D Digital Studio
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight text-white md:text-3xl">
              We blend strategy, software, and immersive design into one growth engine.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#e8f3ff]">
              Websites, automation, and operations designed as one connected layer that keeps compounding.
            </p>
          </div>

          <Link
            href="/contact"
            className="button-3d mt-5 inline-flex items-center gap-2 rounded-full border border-[#239B83]/75 bg-[linear-gradient(145deg,#33DEC0,#004DC5)] px-5 py-2.5 text-sm font-semibold text-[#EAF2FF] transition md:mt-0"
          >
            Start Discussion
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.2fr_0.85fr_0.85fr_1fr]">
          <article className="surface-3d-soft rounded-2xl border border-[#3A5675]/36 p-5">
            <div className="flex items-center gap-3">
              <div className="lift-3d relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#3A5675]/55 bg-[linear-gradient(145deg,#33DEC0,#004DC5)] text-sm font-bold text-[#EAF2FF]">
                N
                <span className="absolute inset-0 rounded-lg border border-white/30" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#E7F0FF]">Nemnidhi</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#8095AC]">Digital Systems Studio</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#AABFD4]">
              Future-facing teams choose us for high-clarity systems, rapid execution, and premium digital presence.
            </p>
          </article>

          <article className="surface-3d-soft rounded-2xl border border-[#3A5675]/36 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8095AC]">Company</p>
            <ul className="space-y-2.5 text-sm text-[#AABFD4]">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-[#69AEFF]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="surface-3d-soft rounded-2xl border border-[#3A5675]/36 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8095AC]">Resources</p>
            <ul className="space-y-2.5 text-sm text-[#AABFD4]">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-[#69AEFF]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="surface-3d-soft rounded-2xl border border-[#3A5675]/36 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8095AC]">Contact</p>
            <ul className="space-y-3 text-sm text-[#AABFD4]">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-[#24B89A]" />
                <a href="tel:+917000455463" className="hover:text-[#69AEFF]">
                  +91 70004 55463
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-[#24B89A]" />
                <a href="mailto:info@nemnidhi.com" className="hover:text-[#69AEFF]">
                  info@nemnidhi.com
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-[#24B89A]" />
                <span>B20, 5th Floor Gravity Mall, Mechanic Nagar, Indore, MP 452011</span>
              </li>
            </ul>
          </article>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#3A5675]/32 pt-5 text-sm text-[#8095AC] md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>Copyright {year} Nemnidhi. All rights reserved.</p>
            <p className="text-xs uppercase tracking-[0.08em] text-[#8095AC]">GSTIN: 23CGZPB7175E1Z5</p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, url, label }) => (
              <Link
                key={url}
                href={url}
                target="_blank"
                aria-label={label}
                className="button-3d flex h-9 w-9 items-center justify-center rounded-full border border-[#3A5675]/48 bg-[linear-gradient(150deg,rgba(20,31,46,0.95),rgba(13,23,35,0.86))] text-[#AABFD4] transition hover:border-[#24B89A] hover:text-[#69AEFF]"
              >
                <Icon className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
