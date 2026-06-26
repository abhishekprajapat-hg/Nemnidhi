import Link from "next/link";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import HeroLightfall from "@/components/services/HeroLightfall";
import ServicesTimeline from "@/components/services/ServicesTimeline";

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
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "7rem 0 4rem" }}>
        <HeroLightfall />
        <Container size="wide" className="hero-content-layer">
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
        .service-page-card:hover { background: #0d1117 !important; }
      `}</style>
    </div>
  );
}
