import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import HeroBlurTitle from "@/components/motion/HeroBlurTitle";
import TechStackIcons from "@/components/projects/TechStackIcons";
import { projects, getProjectBySlug } from "@/lib/data/projects";

const siteUrl = "https://www.nemnidhi.com";

import { S } from "@/lib/styleTokens";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.seoTitle,
    description: project.metaDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.seoTitle,
      description: project.metaDescription,
      url: `${siteUrl}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.seoTitle,
    description: project.metaDescription,
    url: `${siteUrl}/projects/${project.slug}`,
    creator: {
      "@type": "Organization",
      name: "Nemnidhi",
      url: siteUrl,
    },
    about: project.title,
    keywords: project.stack.join(", "),
  };

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div style={{ background: S.bg, minHeight: "100svh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      {/* ─── Hero ─── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 4rem", background: S.bg, borderBottom: `1px solid ${S.line}` }}>
        <Container size="wide">
          <Link
            href="/projects"
            style={{
              display: "inline-block",
              fontFamily: S.mono,
              fontSize: "0.7rem",
              fontWeight: 600,
              color: S.accent,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginBottom: "1.5rem",
            }}
          >
            ← Back to Work
          </Link>
          <p style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 500, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            [ NEMNIDHI.COM ] — CASE STUDY {project.id}
          </p>
          <HeroBlurTitle
            lines={[{ text: project.h1, color: S.white }]}
            style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-0.015em", marginBottom: "2rem" }}
            lineStyle={{ display: "block" }}
          />
          <p style={{ color: S.muted, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7, maxWidth: "40rem", marginBottom: "2rem" }}>
            {project.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: S.accent, color: "var(--color-bg)", fontFamily: S.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
            >
              VISIT LIVE PROJECT ↗
            </a>
            <span style={{ fontFamily: S.mono, fontSize: "0.68rem", color: S.faint }}>{project.domain} · {project.year}</span>
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── The Challenge ─── */}
      <section className="section-padding">
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.34fr) minmax(0, 0.66fr)", gap: "clamp(2rem, 6vw, 6rem)" }} className="case-detail-grid">
            <div>
              <h2 className="text-h2 uppercase">The challenge.</h2>
            </div>
            <p style={{ color: S.muted, fontSize: "0.95rem", lineHeight: 1.8 }}>{project.challenge}</p>
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── What We Built ─── */}
      <section className="section-padding">
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.34fr) minmax(0, 0.66fr)", gap: "clamp(2rem, 6vw, 6rem)" }} className="case-detail-grid">
            <div>
              <h2 className="text-h2 uppercase">What we built.</h2>
            </div>
            <div>
              <p style={{ color: S.muted, fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>{project.solution}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {project.highlights.map((h) => (
                  <span key={h} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.9rem", border: `1px solid ${S.line}`, background: S.bgCard, fontFamily: S.mono, fontSize: "0.7rem", color: S.muted }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: S.accent, flexShrink: 0, display: "inline-block" }} />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Technology Stack ─── */}
      <section className="section-padding">
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.34fr) minmax(0, 0.66fr)", gap: "clamp(2rem, 6vw, 6rem)" }} className="case-detail-grid">
            <div>
              <h2 className="text-h2 uppercase">Technology stack.</h2>
            </div>
            <TechStackIcons items={project.stack} size="md" />
          </div>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── Next Project ─── */}
      <section className="section-padding">
        <Container size="wide">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="next-project-link"
            style={{ display: "block", textDecoration: "none" }}
          >
            <span style={{ fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 600, color: S.accent, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Next Project →
            </span>
            <h2
              className="text-h2 uppercase"
              style={{ marginTop: "0.75rem" }}
            >
              {nextProject.title}
            </h2>
            <p style={{ color: S.muted, marginTop: "0.75rem", fontSize: "0.95rem", maxWidth: "40rem" }}>
              {nextProject.desc}
            </p>
          </Link>
        </Container>
      </section>

      <div style={{ width: "100%", height: "1px", background: S.line }} />

      {/* ─── CTA ─── */}
      <section className="section-padding">
        <Container size="wide">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <h2 style={{ fontFamily: S.heading, fontWeight: 900, fontStyle: "normal", fontSize: "clamp(1.65rem, 3vw, 2.65rem)", textTransform: "uppercase", color: S.white, lineHeight: 1.05 }}>
                A PROJECT LIKE THIS?
              </h2>
              <p style={{ color: S.muted, marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Tell us what you&apos;re building. We respond within 24 hours.
              </p>
            </div>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: S.accent, color: "var(--color-bg)", fontFamily: S.mono, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              DISCUSS A PROJECT →
            </Link>
          </div>
        </Container>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .case-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .next-project-link h2 {
          transition: color 0.15s;
        }
        .next-project-link:hover h2 {
          color: var(--color-accent);
        }
      `}</style>
    </div>
  );
}
