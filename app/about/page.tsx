import Link from "next/link";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import HeroLightfall from "@/components/services/HeroLightfall";

const S = {
  bg: "#080a0c",
  bgCard: "#0d1117",
  line: "rgba(255,255,255,0.07)",
  accent: "#67e8f9",
  white: "#f0f4f8",
  muted: "#f0f4f8",
  faint: "#475569",
  mono: "var(--font-mono, monospace)",
  heading: "var(--font-display, var(--font-heading, sans-serif))",
};

function SectionLabel({ number, text }: { number: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
      <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 600, color: S.accent, letterSpacing: "0.1em" }}>{number}</span>
      <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: S.muted }}>{text}</span>
      <div style={{ flex: 1, height: "1px", background: S.line }} />
    </div>
  );
}

const stats = [
  { value: "6+", label: "YEARS OPERATING" },
  { value: "120+", label: "PROJECTS SHIPPED" },
  { value: "40+", label: "ENGINEERING TALENT" },
  { value: "98%", label: "CLIENT RETENTION" },
];

const principles = [
  { num: "01", title: "CLARITY OVER COMPLEXITY", desc: "We simplify architecture, flows, and tooling so your team can move faster with less friction. Every system we build is designed to be maintained." },
  { num: "02", title: "STRATEGY BEFORE CODE", desc: "We define outcomes and constraints first, then design and build around real business needs. No assumptions — only signal." },
  { num: "03", title: "COMPOUNDING SYSTEMS", desc: "We prioritize assets and workflows that stay useful after launch and improve with data. Built once, scaled forever." },
  { num: "04", title: "DIRECT COMMUNICATION", desc: "No buzzword theater. We explain tradeoffs clearly and make decisions with you in the room. Async-first, clear always." },
];

const process = [
  { num: "01", title: "DISCOVERY", desc: "We embed with your team to map requirements, constraints, and success metrics. No assumptions — only signal.", timeline: "WEEK 1–2" },
  { num: "02", title: "ARCHITECTURE", desc: "System design before a single line of code. We deliver a technical blueprint, risk assessment, and delivery roadmap.", timeline: "WEEK 2–4" },
  { num: "03", title: "BUILD & SHIP", desc: "Two-week sprint cycles with continuous delivery. Daily standups, weekly demos, and production deployments on a cadence.", timeline: "WEEK 4+" },
  { num: "04", title: "EVOLVE", desc: "After launch, we refine based on data and customer behavior, not assumptions. Systems that compound over time.", timeline: "ONGOING" },
];

export const metadata = {
  title: "About",
  description: "Nemnidhi is a software engineering studio building production-grade systems for startups and enterprises since 2025.",
};

export default function AboutPage() {
  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      {/* ─── Hero ─── */}
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "7rem 0 4rem" }}>
        <HeroLightfall />
        <Container size="wide" className="hero-content-layer">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — EST. 2025
          </p>
          <HeroBlurTitle
            lines={[{ text: "WHO", color: S.white }, { text: "WE ARE.", color: S.accent }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.35rem, 5.8vw, 5.2rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            A focused software engineering studio building production-grade systems for startups and enterprises. Precision engineering, zero compromise.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Stats ─── */}
      <section>
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: `1px solid ${S.line}` }} className="about-stats-grid">
            {stats.map((s, i) => (
              <div key={s.label} className="magic-bento-card" style={{ padding: "2.5rem 2rem", borderRight: i < stats.length - 1 ? `1px solid ${S.line}` : "none", background: S.bgCard }}>
                <p style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.5rem,4vw,3.5rem)", color: S.white, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.6rem" }}>{s.value}</p>
                <p style={{ fontFamily: S.mono, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: S.muted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Studio Model ─── */}
      <section style={{ padding: "5rem 0" }}>
        <Container size="wide">
          <SectionLabel number="[ 01 ]" text="STUDIO MODEL" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="about-two-col">
            <div>
              <h2 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.5rem,2.35vw,2.15rem)", textTransform: "uppercase", color: S.white, lineHeight: 1.05, marginBottom: "1.5rem" }}>
                INTENTIONALLY LEAN. RELENTLESSLY SENIOR.
              </h2>
              <p style={{ color: S.muted, fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "1rem" }}>
                Nemnidhi stays lean by design — senior strategy and engineering at the core, with specialist collaborators engaged only when the project demands it.
              </p>
              <p style={{ color: S.muted, fontSize: "0.9rem", lineHeight: 1.75 }}>
                No bloated teams, no junior handoffs, no account managers as middlemen. You work directly with the people building your system.
              </p>
            </div>
            <div style={{ display: "grid", gap: "1px", background: S.line, border: `1px solid ${S.line}` }}>
              {[
                { label: "BASE", value: "Bangalore, India" },
                { label: "MODEL", value: "Remote-first" },
                { label: "CLIENTS", value: "Startups & Enterprises" },
                { label: "FOCUS", value: "Production systems" },
              ].map((item) => (
                <div key={item.label} className="magic-bento-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", background: S.bgCard }}>
                  <span style={{ fontFamily: S.mono, fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: S.faint }}>{item.label}</span>
                  <span style={{ color: S.white, fontSize: "0.875rem", fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Principles ─── */}
      <section style={{ padding: "5rem 0" }}>
        <Container size="wide">
          <SectionLabel number="[ 02 ]" text="OUR PRINCIPLES" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: S.line, border: `1px solid ${S.line}` }} className="about-principles-grid">
            {principles.map((p) => (
              <div key={p.num} className="magic-bento-card" style={{ padding: "2.5rem", background: S.bg }}>
                <span style={{ fontFamily: S.mono, fontSize: "0.75rem", fontWeight: 600, color: S.accent, display: "block", marginBottom: "1.25rem" }}>{p.num}</span>
                <h3 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.2rem,2vw,1.6rem)", textTransform: "uppercase", color: S.white, lineHeight: 1.1, marginBottom: "1rem" }}>{p.title}</h3>
                <p style={{ color: S.muted, fontSize: "0.875rem", lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Process ─── */}
      <section style={{ padding: "5rem 0" }}>
        <Container size="wide">
          <SectionLabel number="[ 03 ]" text="HOW WE ENGAGE" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: `1px solid ${S.line}` }} className="about-process-grid">
            {process.map((step, i) => (
              <div key={step.num} className="magic-bento-card" style={{ padding: "2rem 1.75rem", background: S.bgCard, borderRight: i < process.length - 1 ? `1px solid ${S.line}` : "none" }}>
                <p style={{ fontFamily: S.mono, fontSize: "0.75rem", fontWeight: 600, color: S.accent, marginBottom: "1.25rem" }}>{step.num}</p>
                <h3 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.1rem,1.6vw,1.4rem)", textTransform: "uppercase", color: S.white, lineHeight: 1.1, marginBottom: "1rem" }}>{step.title}</h3>
                <p style={{ color: S.muted, fontSize: "0.8rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>{step.desc}</p>
                <div style={{ paddingTop: "1rem", borderTop: `1px solid ${S.line}`, fontFamily: S.mono, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: S.faint }}>
                  TIMELINE: {step.timeline}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── CTA ─── */}
      <section style={{ padding: "5rem 0" }}>
        <Container size="wide">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <h2 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.65rem,3vw,2.65rem)", textTransform: "uppercase", color: S.white, lineHeight: 1.05 }}>
                START A CONVERSATION.
              </h2>
              <p style={{ color: S.muted, marginTop: "0.75rem", fontSize: "0.9rem" }}>
                We respond within 24 hours and move fast from there.
              </p>
            </div>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: S.accent, color: "#080a0c", fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              LET&apos;S TALK →
            </Link>
          </div>
        </Container>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .about-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .about-process-grid { grid-template-columns: repeat(2,1fr) !important; }
          .about-process-grid > div:nth-child(2) { border-right: none !important; }
          .about-process-grid > div:nth-child(1),
          .about-process-grid > div:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.07); }
        }
        @media (max-width: 768px) {
          .about-two-col { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .about-principles-grid { grid-template-columns: 1fr !important; }
          .about-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .about-stats-grid { grid-template-columns: 1fr !important; }
          .about-process-grid { grid-template-columns: 1fr !important; }
          .about-process-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
        }
      `}</style>
    </div>
  );
}
