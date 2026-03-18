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
    <footer className="deferred-section border-t border-[#E7DEC9] bg-[linear-gradient(180deg,#FDFBF7_0%,#F6EFE3_100%)]">
      <Container className="py-12 md:py-14">
        <div className="mb-7 rounded-2xl border border-[#E6D7BC] bg-[linear-gradient(140deg,#092D52_0%,#0F4678_60%,#155A96_100%)] p-6 text-white shadow-[0_20px_40px_rgba(9,34,61,0.24)] md:flex md:items-end md:justify-between md:gap-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F8EACB]">
              <Sparkles className="h-3.5 w-3.5" />
              Strategic Delivery
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight text-[#F8EACB] md:text-3xl">
              Build an elite digital presence with systems that scale quietly.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#DCEEFF]">
              Strategy, product, engineering, and growth execution in one premium delivery loop.
            </p>
          </div>

          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D2B177] bg-[#F8EACB] px-5 py-2.5 text-sm font-semibold text-[#0A2D4E] transition hover:bg-[#F3DFC0] md:mt-0"
          >
            Start Discussion
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.2fr_0.85fr_0.85fr_1fr]">
          <article className="rounded-2xl border border-[#E7DEC9] bg-white/85 p-5 shadow-[0_10px_24px_rgba(10,31,56,0.06)]">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#D8BE8A]/80 bg-[linear-gradient(155deg,#082D54_0%,#0A3A69_55%,#12508D_100%)] text-sm font-bold text-[#F8EACB]">
                N
                <span className="absolute inset-0 rounded-lg border border-white/20" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#0A2D4E]">Nemnidhi</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#8D7443]">Digital Systems Studio</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#364656]">
              The future of work, today. We design premium digital ecosystems for founder-led teams ready to scale with
              clarity.
            </p>
          </article>

          <article className="rounded-2xl border border-[#E7DEC9] bg-white/85 p-5 shadow-[0_10px_24px_rgba(10,31,56,0.06)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8D7443]">Company</p>
            <ul className="space-y-2.5 text-sm text-[#2F3F4F]">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-[#0A2D4E]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#E7DEC9] bg-white/85 p-5 shadow-[0_10px_24px_rgba(10,31,56,0.06)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8D7443]">Resources</p>
            <ul className="space-y-2.5 text-sm text-[#2F3F4F]">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-[#0A2D4E]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#E7DEC9] bg-white/85 p-5 shadow-[0_10px_24px_rgba(10,31,56,0.06)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8D7443]">Contact</p>
            <ul className="space-y-3 text-sm text-[#2F3F4F]">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-[#9C7B44]" />
                <a href="tel:+917000455463" className="hover:text-[#0A2D4E]">
                  +91 70004 55463
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-[#9C7B44]" />
                <a href="mailto:info@nemnidhi.com" className="hover:text-[#0A2D4E]">
                  info@nemnidhi.com
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-[#9C7B44]" />
                <span>B20, 5th Floor Gravity Mall, Mechanic Nagar, Indore, MP 452011</span>
              </li>
            </ul>
          </article>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#E7DEC9] pt-5 text-sm text-[#5E6B79] md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>Copyright {year} Nemnidhi. All rights reserved.</p>
            <p className="text-xs uppercase tracking-[0.08em] text-[#8D7443]">GSTIN: 23CGZPB7175E1Z5</p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, url, label }) => (
              <Link
                key={url}
                href={url}
                target="_blank"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCC59A] bg-white text-[#2F3F4F] transition hover:border-[#9C7B44] hover:text-[#0A2D4E]"
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
