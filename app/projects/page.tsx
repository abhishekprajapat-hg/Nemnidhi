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

const projects = [
  {
    id: "01",
    title: "NEMNIDHI.COM",
    tags: ["Marketing", "SaaS"],
    year: "2024",
    href: "https://www.nemnidhi.com",
    domain: "www.nemnidhi.com",
    desc: "Primary marketing site built for clarity-led positioning, conversion-ready user flow, and premium brand communication.",
    highlights: [
      "Conversion-first architecture",
      "Premium brand positioning",
      "CMS-backed service pages",
      "Sub-1s page loads",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Vercel"],
  },
  {
    id: "02",
    title: "SAMVID-OS",
    tags: ["Cloud", "SaaS"],
    year: "2024",
    href: "https://nemnidhi.cloud",
    domain: "nemnidhi.cloud",
    desc: "Cloud-native operating system for internal platform delivery — secure workspace, infrastructure orchestration, and team collaboration.",
    highlights: [
      "Multi-tenant architecture",
      "Role-based access control",
      "Secure cloud workspace",
      "Infrastructure-backed delivery",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "03",
    title: "NEMNIDHI GLAM",
    tags: ["E-Commerce", "Fashion"],
    year: "2024",
    href: "https://glam.nemnidhi.com",
    domain: "glam.nemnidhi.com",
    desc: "Modern ethnic atelier — e-commerce platform for handloom & artisan fashion with campaign-focused growth execution and catalog management.",
    highlights: [
      "Full e-commerce catalog",
      "Handloom & artisan focus",
      "Campaign growth engine",
      "Mobile-first experience",
    ],
    stack: ["Next.js", "Shopify API", "Stripe", "Cloudinary"],
  },
  {
    id: "04",
    title: "FINEDGE ACADEMY",
    tags: ["Fintech", "EdTech"],
    year: "2023",
    href: "https://finedge.nemnidhi.com",
    domain: "finedge.nemnidhi.com",
    desc: "Financial services education platform — structured finance courses, risk profiling tools, and high-intent lead capture for wealth advisory.",
    highlights: [
      "Structured finance curriculum",
      "Risk profiling module",
      "High-intent lead capture",
      "Trust-first UX design",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Razorpay"],
  },
  {
    id: "05",
    title: "PUNYANIDHI",
    tags: ["NGO", "Community"],
    year: "2023",
    href: "https://nemnidhi.tech",
    domain: "nemnidhi.tech",
    desc: "Shri Jain Shwetambar Mandir — digital home for darshan, seva, transparent giving, upcoming observances, library access, and community life.",
    highlights: [
      "Digital darshan portal",
      "Transparent donation system",
      "Community event calendar",
      "Sacred library access",
    ],
    stack: ["Next.js", "MongoDB", "Node.js", "Razorpay"],
  },
];

export const metadata = {
  title: "Work",
  description: "Real projects built by Nemnidhi — marketing sites, SaaS platforms, e-commerce, fintech, and community platforms.",
};

export default function ProjectsPage() {
  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      {/* ─── Hero ─── */}
      <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "7rem 0 4rem" }}>
        <HeroLightfall />
        <Container size="wide" className="hero-content-layer">
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — LIVE BUILDS
          </p>
          <HeroBlurTitle
            lines={[{ text: "OUR", color: S.white }, { text: "WORK.", color: S.accent }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(2.35rem, 5.8vw, 5.2rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Live production builds across the Nemnidhi ecosystem — from marketing sites and SaaS platforms to e-commerce, fintech, and community platforms.
          </p>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Project List ─── */}
      <section style={{ padding: "5rem 0" }}>
        <Container size="wide">
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
            <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 600, color: S.accent, letterSpacing: "0.1em" }}>[ 01 ]</span>
            <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: S.muted }}>LIVE PROJECTS</span>
            <div style={{ flex: 1, height: "1px", background: S.line }} />
          </div>

          <div>
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-item-hover"
                style={{ borderBottom: `1px solid ${S.line}`, transition: "background 0.2s" }}
              >
                <div
                  style={{ display: "grid", gridTemplateColumns: "3rem 1fr auto", alignItems: "flex-start", gap: "1.5rem", padding: "2.5rem 0" }}
                  className="project-header-grid"
                >
                  {/* Number */}
                  <span style={{ fontFamily: S.mono, fontSize: "0.75rem", fontWeight: 600, color: S.accent, paddingTop: "0.35rem" }}>
                    {project.id}
                  </span>

                  {/* Content */}
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap" as const, gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <h2 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.25rem, 2.05vw, 1.7rem)", textTransform: "uppercase", color: S.white, letterSpacing: "-0.005em", lineHeight: 1.15, margin: 0 }}>
                        {project.title}
                      </h2>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
                        {project.tags.map((tag) => (
                          <span key={tag} style={{ fontFamily: S.mono, fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.08em", color: S.muted, textTransform: "uppercase" as const }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Domain */}
                    <p style={{ fontFamily: S.mono, fontSize: "0.65rem", color: S.faint, marginBottom: "0.75rem", letterSpacing: "0.04em" }}>
                      {project.domain}
                    </p>

                    <p style={{ color: S.muted, fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                      {project.desc}
                    </p>

                    {/* Highlights */}
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.75rem", marginBottom: "1rem" }}>
                      {project.highlights.map((h) => (
                        <span key={h} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: S.mono, fontSize: "0.62rem", color: S.muted }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: S.accent, display: "inline-block", flexShrink: 0 }} />
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Stack */}
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.4rem" }}>
                      {project.stack.map((t) => (
                        <span key={t} style={{ padding: "0.25rem 0.6rem", border: "1px solid rgba(255,255,255,0.08)", fontFamily: S.mono, fontSize: "0.6rem", color: "#94a3b8" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Year + Open link */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem", paddingTop: "0.35rem", flexShrink: 0 }}>
                    <span style={{ fontFamily: S.mono, fontSize: "0.7rem", color: S.muted }}>{project.year}</span>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-open-link"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: S.mono, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: S.accent, textDecoration: "none", border: `1px solid rgba(103,232,249,0.25)`, padding: "0.4rem 0.75rem", transition: "border-color 0.2s, background 0.2s" }}
                    >
                      OPEN ↗
                    </a>
                  </div>
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
                YOUR PROJECT NEXT?
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
        .project-item-hover:hover { background: rgba(255,255,255,0.018) !important; }
        .project-open-link:hover { border-color: #67e8f9 !important; background: rgba(103,232,249,0.08) !important; }
        @media (max-width: 640px) {
          .project-header-grid { grid-template-columns: 2.5rem 1fr !important; }
          .project-header-grid > div:last-child { grid-column: 2; flex-direction: row !important; justify-content: flex-start !important; }
        }
      `}</style>
    </div>
  );
}
