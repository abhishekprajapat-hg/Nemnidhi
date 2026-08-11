import Link from "next/link";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import HeroLightfall from "@/components/services/HeroLightfall";
import ServicesTimeline from "@/components/services/ServicesTimeline";

// ─── shared design tokens ───
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
    // PLACEHOLDER — confirm accuracy
    industries: ["SaaS & Startups", "E-commerce", "FinTech", "Real Estate"],
    // PLACEHOLDER — needs real estimate from team
    timeline: "6–14 weeks depending on scope and feature complexity",
    deliverables: [
      "Full source code (Git repo)",
      "Technical documentation",
      "Production deployment",
      "30-day post-launch support",
    ],
    // PLACEHOLDER — needs real business decision on pricing model
    pricing: "Scoped per project — fixed price agreed after discovery",
    miniFaq: [
      {
        q: "Can you take over an existing codebase?",
        a: "Yes, we audit and extend existing systems. We'll assess what's there before committing to timelines.",
      },
      {
        q: "Do you build with our in-house team or independently?",
        a: "Both. We work as the full team or alongside yours — whichever fits your structure.",
      },
    ],
    illustrationKey: "dashboard" as const,
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
    // PLACEHOLDER — confirm accuracy
    industries: ["HealthTech", "Real Estate", "Retail", "EdTech"],
    // PLACEHOLDER — needs real estimate from team
    timeline: "8–16 weeks depending on platform and feature scope",
    deliverables: [
      "Full source code (Git repo)",
      "App Store & Play Store submission",
      "API documentation",
      "30-day post-launch support",
    ],
    // PLACEHOLDER — needs real business decision on pricing model
    pricing: "Scoped per project — fixed price agreed after discovery",
    miniFaq: [
      {
        q: "Do you build for both iOS and Android?",
        a: "Yes. We use React Native for cross-platform or go native when platform-specific performance demands it.",
      },
      {
        q: "Can you publish the app to our existing developer account?",
        a: "Yes, we handle the full submission to your accounts on both stores.",
      },
    ],
    illustrationKey: "devices" as const,
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
    // PLACEHOLDER — confirm accuracy
    industries: ["SaaS", "FinTech", "Healthcare", "Media & Streaming"],
    // PLACEHOLDER — needs real estimate from team
    timeline: "4–10 weeks depending on existing infrastructure complexity",
    deliverables: [
      "Infrastructure-as-Code files",
      "CI/CD pipeline",
      "Monitoring dashboards",
      "Runbooks & documentation",
      "30-day post-launch support",
    ],
    // PLACEHOLDER — needs real business decision on pricing model
    pricing: "Scoped per project or retainer — agreed after discovery",
    miniFaq: [
      {
        q: "Do you manage cloud costs as part of the engagement?",
        a: "We architect with cost-efficiency in mind and document all resource usage. Ongoing management is available as a retainer.",
      },
      {
        q: "Which cloud providers do you work with?",
        a: "Primarily AWS, with GCP and Azure support depending on your stack.",
      },
    ],
    illustrationKey: "server" as const,
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
    // PLACEHOLDER — confirm accuracy
    industries: ["Legal Tech", "Healthcare", "E-commerce", "Business Operations"],
    // PLACEHOLDER — needs real estimate from team
    timeline: "6–12 weeks depending on model complexity and data availability",
    deliverables: [
      "Integration layer / API endpoints",
      "Model evaluation reports",
      "Deployment & handoff",
      "30-day post-launch support",
    ],
    // PLACEHOLDER — needs real business decision on pricing model
    pricing: "Scoped per project — fixed price agreed after discovery",
    miniFaq: [
      {
        q: "Do we need to provide training data?",
        a: "Depends on the use case. For RAG and LLM integration, your existing documents often suffice. For fine-tuning, we'll advise on data requirements upfront.",
      },
      {
        q: "Can AI be added to our existing product?",
        a: "Yes. Most of our AI work is embedded into existing products via API layers — we don't require a full rebuild.",
      },
    ],
    illustrationKey: "data" as const,
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
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "7rem 0 4rem", background: "#05080b" }}>
        <HeroLightfall />
        <Container size="wide" className="hero-content-layer">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: "#67e8f9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — CAPABILITIES
          </p>
          <HeroBlurTitle
            lines={[{ text: "WHAT WE", color: "#f0f4f8" }, { text: "BUILD.", color: "#67e8f9" }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.35rem, 5.8vw, 5.2rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: "#94a3b8", fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
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
