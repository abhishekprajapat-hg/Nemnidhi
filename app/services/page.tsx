import Link from "next/link";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import ServicesTimeline from "@/components/services/ServicesTimeline";
import { services } from "@/lib/data/services";

// ─── shared design tokens ───
import { S } from "@/lib/styleTokens";

export const metadata = {
  title: "Software Development Company in Indore & India",
  description:
    "Full-spectrum software engineering — web, mobile, cloud, AI, and product strategy — from a software development company in Indore, India, serving startups and enterprises nationwide.",
};

export default function ServicesPage() {
  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      {/* ─── Hero ─── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 4rem", background: S.bg, borderBottom: `1px solid ${S.line}` }}>
        <Container size="wide">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — CAPABILITIES
          </p>
          <HeroBlurTitle
            lines={[{ text: "WHAT WE", color: S.white }, { text: "BUILD.", color: S.accent }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.35rem, 5.8vw, 5.2rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Full-spectrum software engineering — from architecture to deployment. Six core capabilities, one integrated team.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Services Timeline ─── */}
      <ServicesTimeline services={services} />

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
        .service-page-card:hover { background: var(--color-bg-elevated) !important; }
      `}</style>
    </div>
  );
}
