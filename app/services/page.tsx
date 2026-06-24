import Link from "next/link";
import Container from "@/components/layout/Container";

// ─── shared design tokens ───
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

// ─── section label component (inline helper) ───
function SectionLabel({ number, text }: { number: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
      <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 600, color: S.accent, letterSpacing: "0.1em" }}>
        {number}
      </span>
      <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: S.muted }}>
        {text}
      </span>
      <div style={{ flex: 1, height: "1px", background: S.line }} />
    </div>
  );
}

const services = [
  {
    num: "01",
    title: "WEB ENGINEERING",
    desc: "Full-stack web applications built for scale and performance. From architecture to deployment — React, Next.js, Node, and the modern web stack.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    details: [
      "Custom SaaS platforms & dashboards",
      "High-performance marketing sites",
      "E-commerce & payment integrations",
      "API design & backend systems",
      "Database architecture & optimization",
    ],
  },
  {
    num: "02",
    title: "MOBILE DEVELOPMENT",
    desc: "Native and cross-platform mobile applications that ship on time, perform under load, and hold up in production.",
    tags: ["React Native", "iOS", "Android", "Expo", "Firebase"],
    details: [
      "iOS & Android native apps",
      "Cross-platform with React Native",
      "App Store & Play Store deployment",
      "Push notifications & real-time features",
      "Offline-first architecture",
    ],
  },
  {
    num: "03",
    title: "CLOUD & DEVOPS",
    desc: "Infrastructure that scales with your business. CI/CD pipelines, container orchestration, zero-downtime deployments, and full observability.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    details: [
      "Cloud architecture & migration",
      "CI/CD pipeline setup",
      "Container orchestration (Docker/K8s)",
      "Infrastructure as Code",
      "Monitoring & alerting systems",
    ],
  },
  {
    num: "04",
    title: "AI INTEGRATION",
    desc: "Intelligent systems embedded directly into your product. LLM pipelines, RAG architectures, vector search, and custom model fine-tuning.",
    tags: ["LLMs", "RAG", "Python", "Vector DBs", "OpenAI"],
    details: [
      "LLM pipeline development",
      "RAG (Retrieval-Augmented Generation)",
      "Custom AI assistants & chatbots",
      "Document intelligence pipelines",
      "Model fine-tuning & evaluation",
    ],
  },
  {
    num: "05",
    title: "PRODUCT STRATEGY",
    desc: "Technical strategy before a single line of code. We map your requirements, constraints, and success metrics — no assumptions, only signal.",
    tags: ["Discovery", "Architecture", "Roadmap", "Sprint Planning"],
    details: [
      "Product discovery & scoping",
      "Technical architecture design",
      "MVP definition & prioritization",
      "Engineering team augmentation",
      "Technical due diligence",
    ],
  },
  {
    num: "06",
    title: "UI/UX DESIGN",
    desc: "Design systems and interfaces built for conversion, clarity, and production. Every pixel earned, every interaction intentional.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    details: [
      "Product UI/UX design",
      "Design system creation",
      "Interactive prototyping",
      "Accessibility (WCAG) compliance",
      "Usability testing & iteration",
    ],
  },
];

export const metadata = {
  title: "Services",
  description: "Full-spectrum software engineering — web, mobile, cloud, AI, and product strategy for startups and enterprises.",
};

export default function ServicesPage() {
  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      {/* ─── Hero ─── */}
      <section style={{ padding: "7rem 0 4rem" }}>
        <Container size="wide">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — CAPABILITIES
          </p>
          <h1 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.35rem, 5.8vw, 5.2rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}>
            <span style={{ color: S.white, display: "block" }}>WHAT WE</span>
            <span style={{ color: S.accent, display: "block" }}>BUILD.</span>
          </h1>
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Full-spectrum software engineering — from architecture to deployment. Six core capabilities, one integrated team.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Services Grid ─── */}
      <section style={{ padding: "5rem 0" }}>
        <Container size="wide">
          <SectionLabel number="[ 01 ]" text="OUR CAPABILITIES" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: S.line, border: `1px solid ${S.line}` }} className="services-page-grid">
            {services.map((svc) => (
              <div
                key={svc.num}
                className="service-page-card"
                style={{ padding: "2.5rem", background: S.bg, transition: "background 0.2s" }}
              >
                {/* header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: S.mono, fontSize: "0.75rem", fontWeight: 600, color: S.accent }}>{svc.num}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: S.faint }}>
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h2 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.15rem, 1.55vw, 1.45rem)", textTransform: "uppercase", color: S.white, letterSpacing: "-0.005em", lineHeight: 1.15, marginBottom: "1rem" }}>
                  {svc.title}
                </h2>
                <p style={{ color: S.muted, fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                  {svc.desc}
                </p>

                {/* details */}
                <ul style={{ marginBottom: "1.5rem", display: "grid", gap: "0.5rem" }}>
                  {svc.details.map((d) => (
                    <li key={d} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: S.mono, fontSize: "0.7rem", color: S.muted, letterSpacing: "0.02em" }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: S.accent, flexShrink: 0, display: "inline-block" }} />
                      {d}
                    </li>
                  ))}
                </ul>

                {/* tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {svc.tags.map((tag) => (
                    <span key={tag} style={{ padding: "0.3rem 0.7rem", border: "1px solid rgba(255,255,255,0.1)", fontFamily: S.mono, fontSize: "0.62rem", color: "#94a3b8" }}>
                      {tag}
                    </span>
                  ))}
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
        .services-page-grid { grid-template-columns: repeat(2, 1fr); }
        .service-page-card:hover { background: #0d1117 !important; }
        @media (max-width: 768px) {
          .services-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
