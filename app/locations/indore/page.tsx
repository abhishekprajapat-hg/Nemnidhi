import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import HeroLightfall from "@/components/services/HeroLightfall";

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

const ADDRESS = {
  street: "B20, 5th Floor Gravity Mall, Mechanic Nagar",
  locality: "Indore",
  region: "Madhya Pradesh",
  postalCode: "452011",
  country: "IN",
};
const FULL_ADDRESS = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`;
const PHONE = "+91 70004 55463";
const EMAIL = "info@nemnidhi.com";

const napItems = [
  { label: "OFFICE", value: FULL_ADDRESS },
  { label: "PHONE", value: PHONE },
  { label: "EMAIL", value: EMAIL },
  { label: "SERVES", value: "Indore & clients across India" },
];

const whyIndore = [
  "Direct access to a growing senior engineering talent pool in Madhya Pradesh's largest tech hub",
  "Lower operating overhead than metro-tier studios, without compromising on senior-only delivery",
  "IST-aligned working hours for same-day communication with India-based teams",
  "In-person meetings available at our Gravity Mall office for local and visiting clients",
];

const localServices = [
  { label: "Web Development Company in Indore", slug: "web-engineering" },
  { label: "Mobile App Development in Indore", slug: "mobile-development" },
  { label: "Cloud & DevOps Consulting in Indore", slug: "cloud-devops" },
  { label: "AI Development Company in Indore", slug: "ai-integration" },
  { label: "Product Strategy Consulting in Indore", slug: "product-strategy" },
  { label: "UI/UX Design Agency in Indore", slug: "ui-ux-design" },
];

const localFaq = [
  {
    q: "Where is Nemnidhi's office located in Indore?",
    a: `Our office is at ${FULL_ADDRESS}.`,
  },
  {
    q: "Can we meet your team in person in Indore?",
    a: "Yes — we're happy to host in-person meetings at our Gravity Mall office for local clients, alongside remote collaboration for everyone else.",
  },
  {
    q: "Do you only work with companies based in Indore?",
    a: "No. We're headquartered in Indore but deliver software for startups and enterprises across India, coordinating remotely where an in-person meeting isn't practical.",
  },
  {
    q: "What services does Nemnidhi's Indore team offer?",
    a: "Web engineering, mobile development, cloud & DevOps, AI integration, product strategy, and UI/UX design — the same six capabilities we deliver nationwide, from our Indore studio.",
  },
];

export const metadata: Metadata = {
  title: "Software Development Company in Indore",
  description:
    "Nemnidhi is a software development company in Indore, India, offering web, mobile, cloud, and AI development. Visit our Gravity Mall office or work with us remotely.",
  alternates: { canonical: "/locations/indore" },
  openGraph: {
    title: "Software Development Company in Indore | Nemnidhi",
    description:
      "Nemnidhi is a software development company in Indore, India, offering web, mobile, cloud, and AI development.",
    url: `${siteUrl}/locations/indore`,
  },
};

export default function IndoreLocationPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nemnidhi",
    image: `${siteUrl}/images/logo.png`,
    url: `${siteUrl}/locations/indore`,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    areaServed: ["Indore", "India"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFaq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ─── Hero ─── */}
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "7rem 0 4rem", background: "#05080b" }}>
        <HeroLightfall />
        <Container size="wide" className="hero-content-layer">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: "#67e8f9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — INDORE, INDIA
          </p>
          <HeroBlurTitle
            lines={[{ text: "SOFTWARE DEVELOPMENT", color: "#f0f4f8" }, { text: "COMPANY IN INDORE.", color: "#67e8f9" }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2rem, 4.6vw, 3.8rem)", textTransform: "uppercase", lineHeight: 1.02, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: "#94a3b8", fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "38rem" }}>
            Nemnidhi is a software engineering studio headquartered in Indore, Madhya Pradesh, building production-grade web, mobile, cloud, and AI systems for startups and enterprises across India.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── NAP + Map ─── */}
      <section className="section-padding">
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.42fr) minmax(0, 0.58fr)", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "start" }} className="indore-nap-grid">
            <div style={{ display: "grid", gap: "1px", background: S.line, border: `1px solid ${S.line}` }}>
              {napItems.map((item) => (
                <div key={item.label} className="magic-bento-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem", background: S.bgCard }}>
                  <span style={{ fontFamily: S.mono, fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: S.faint, flexShrink: 0 }}>
                    {item.label}
                  </span>
                  <span style={{ color: S.white, fontSize: "0.875rem", fontWeight: 600, textAlign: "right" }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ border: `1px solid ${S.line}`, background: S.bgCard, minHeight: "280px", overflow: "hidden" }}>
              <iframe
                title="Nemnidhi Indore Office Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(FULL_ADDRESS)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px", display: "block", filter: "grayscale(0.4) contrast(1.1)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Why Indore ─── */}
      <section className="section-padding">
        <Container size="wide">
          <h2 className="text-h2 uppercase" style={{ marginBottom: "2rem" }}>Why an Indore-based software company.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {whyIndore.map((item, i) => (
              <div key={item} style={{ border: `1px solid ${S.line}`, background: S.bgCard, padding: "1.5rem" }}>
                <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 700, color: S.accent }}>{String(i + 1).padStart(2, "0")}</span>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: S.muted, marginTop: "0.75rem" }}>{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Services in Indore ─── */}
      <section className="section-padding">
        <Container size="wide">
          <h2 className="text-h2 uppercase" style={{ marginBottom: "2rem" }}>Services delivered from Indore.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: S.line, border: `1px solid ${S.line}` }}>
            {localServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="magic-bento-card"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: "1.5rem", background: S.bg, textDecoration: "none" }}
              >
                <span style={{ fontFamily: S.mono, fontSize: "0.8rem", fontWeight: 600, color: S.white }}>{svc.label}</span>
                <span style={{ color: S.accent, fontFamily: S.mono, fontSize: "0.85rem", flexShrink: 0 }}>→</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Local FAQ ─── */}
      <section className="section-padding">
        <Container size="default" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2 className="text-h2 uppercase" style={{ marginBottom: "2rem" }}>Questions about our Indore office.</h2>
          <div style={{ display: "grid", gap: "1.75rem" }}>
            {localFaq.map((faq) => (
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
                LET&apos;S BUILD FROM INDORE.
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
          .indore-nap-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
