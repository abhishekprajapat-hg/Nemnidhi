import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import HeroLightfall from "@/components/services/HeroLightfall";
import { services, getServiceBySlug } from "@/lib/data/services";

const siteUrl = "https://www.nemnidhi.com";

const S = {
  bg: "var(--color-bg)",
  bgCard: "var(--color-bg-elevated)",
  line: "var(--color-line)",
  accent: "var(--color-accent)",
  white: "var(--color-heading)",
  muted: "var(--color-text-muted)",
  faint: "var(--color-text-faint)",
  mono: "var(--font-mono, monospace)",
  heading: "var(--font-display, var(--font-heading, sans-serif))",
};

const processSteps = [
  { num: "01", title: "Discovery", desc: "We map requirements, constraints, success metrics, and the commercial outcome the software has to create." },
  { num: "02", title: "Design", desc: "We shape product flows, visual systems, data models, and technical architecture before heavy engineering begins." },
  { num: "03", title: "Development", desc: "Senior engineers build in focused sprints with frequent demos, clean handoffs, and deployable increments." },
  { num: "04", title: "Testing", desc: "We validate performance, responsive behavior, edge cases, integrations, and release readiness." },
  { num: "05", title: "Launch", desc: "We ship with monitoring, deployment confidence, documentation, and a clear plan for the next iteration." },
];

const whyChoose = [
  "Indore-based engineering studio delivering to startups and enterprises across India",
  "Senior engineers on every engagement — no outsourced junior bench",
  "Fixed-scope delivery with weekly demos and full source-code ownership",
  "Post-launch support included on every project, not sold as an upsell",
];

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
      url: `${siteUrl}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.seoTitle,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Nemnidhi",
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "B20, 5th Floor Gravity Mall, Mechanic Nagar",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452011",
        addressCountry: "IN",
      },
    },
    areaServed: ["Indore", "India"],
    url: `${siteUrl}/services/${service.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.miniFaq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ─── Hero ─── */}
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "7rem 0 4rem", background: "#05080b" }}>
        <HeroLightfall />
        <Container size="wide" className="hero-content-layer">
          <Link
            href="/services"
            style={{
              display: "inline-block",
              fontFamily: S.mono,
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#67e8f9",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginBottom: "1.5rem",
            }}
          >
            ← Back to Services
          </Link>
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: "#67e8f9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — SERVICE {service.num}
          </p>
          <HeroBlurTitle
            lines={[{ text: service.h1, color: "#f0f4f8" }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2rem, 4.6vw, 3.6rem)", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: "#94a3b8", fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "40rem" }}>
            {service.intro}
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── What We Offer ─── */}
      <section className="section-padding">
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.34fr) minmax(0, 0.66fr)", gap: "clamp(2rem, 6vw, 6rem)" }} className="svc-detail-grid">
            <div>
              <h2 className="text-h2 uppercase">What we offer.</h2>
              <p className="text-body text-prose mt-6" style={{ color: S.muted }}>
                {service.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                {service.tags.map((tag) => (
                  <span key={tag} style={{ padding: "0.3rem 0.7rem", border: "1px solid rgba(255,255,255,0.1)", fontFamily: S.mono, fontSize: "0.62rem", color: "#94a3b8" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ul style={{ display: "grid", gap: "0.9rem" }}>
              {service.details.map((detail) => (
                <li key={detail} style={{ display: "flex", alignItems: "center", gap: "0.9rem", padding: "1rem 1.25rem", border: `1px solid ${S.line}`, background: S.bgCard, fontFamily: S.mono, fontSize: "0.78rem", color: S.muted }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: S.accent, flexShrink: 0, display: "inline-block" }} />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Process ─── */}
      <section className="section-padding">
        <Container size="wide">
          <h2 className="text-h2 uppercase" style={{ marginBottom: "2.5rem" }}>Our development process.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {processSteps.map((step) => (
              <div key={step.num} style={{ border: `1px solid ${S.line}`, background: S.bgCard, padding: "1.5rem" }}>
                <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 700, color: S.accent }}>{step.num}</span>
                <h3 className="text-h4 uppercase" style={{ marginTop: "0.5rem" }}>{step.title}</h3>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: S.muted, marginTop: "0.5rem" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Why Choose / Industries / Deliverables ─── */}
      <section className="section-padding">
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(2rem, 5vw, 4rem)" }}>
            <div>
              <h2 className="text-h3 uppercase">Why choose Nemnidhi.</h2>
              <ul style={{ display: "grid", gap: "0.75rem", marginTop: "1.5rem" }}>
                {whyChoose.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem", lineHeight: 1.6, color: S.muted }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: S.accent, flexShrink: 0, marginTop: "0.5rem", display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-h3 uppercase">Industries we serve.</h2>
              <ul style={{ display: "grid", gap: "0.75rem", marginTop: "1.5rem" }}>
                {service.industries.map((ind) => (
                  <li key={ind} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem", lineHeight: 1.6, color: S.muted }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: S.faint, flexShrink: 0, marginTop: "0.5rem", display: "inline-block" }} />
                    {ind}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-h3 uppercase">Deliverables.</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                {service.deliverables.map((d) => (
                  <span key={d} style={{ padding: "0.4rem 0.85rem", border: `1px solid ${S.line}`, fontFamily: S.mono, fontSize: "0.68rem", color: S.muted }}>
                    {d}
                  </span>
                ))}
              </div>

              <p style={{ fontFamily: S.mono, fontSize: "0.62rem", fontWeight: 700, color: S.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
                Timeline
              </p>
              <p style={{ fontSize: "0.85rem", color: S.muted, lineHeight: 1.6 }}>{service.timeline}</p>

              <p style={{ fontFamily: S.mono, fontSize: "0.62rem", fontWeight: 700, color: S.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
                Pricing
              </p>
              <p style={{ fontSize: "0.85rem", color: S.muted, lineHeight: 1.6 }}>{service.pricing}</p>
            </div>
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── FAQ ─── */}
      <section className="section-padding">
        <Container size="default" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2 className="text-h2 uppercase" style={{ marginBottom: "2rem" }}>Frequently asked questions.</h2>
          <div style={{ display: "grid", gap: "1.75rem" }}>
            {service.miniFaq.map((faq) => (
              <div key={faq.q} style={{ borderTop: `1px solid ${S.line}`, paddingTop: "1.25rem" }}>
                <p style={{ fontFamily: S.mono, fontSize: "0.85rem", fontWeight: 600, color: S.white, marginBottom: "0.5rem" }}>{faq.q}</p>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: S.muted }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── CTA ─── */}
      <section className="section-padding">
        <Container size="wide">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <h2 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.65rem, 3vw, 2.65rem)", textTransform: "uppercase", color: S.white, lineHeight: 1.05 }}>
                READY TO START?
              </h2>
              <p style={{ color: S.muted, marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Tell us what you&apos;re building. We respond within 24 hours.
              </p>
            </div>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: S.accent, color: "#080a0c", fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              START A PROJECT →
            </Link>
          </div>
        </Container>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .svc-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
