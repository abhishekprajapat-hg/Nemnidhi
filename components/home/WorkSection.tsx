"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useHorizontalScroll, useSectionLabel } from "@/lib/useGsapAnimations";

const projects = [
  {
    id: "01",
    title: "NEMNIDHI.COM",
    tags: ["Marketing", "SaaS"],
    year: "2024",
    href: "https://www.nemnidhi.com",
    domain: "www.nemnidhi.com",
    desc: "Primary marketing site with clarity-led positioning, conversion-ready flow, and premium brand communication.",
  },
  {
    id: "02",
    title: "SAMVID-OS",
    tags: ["Cloud", "SaaS"],
    year: "2024",
    href: "https://nemnidhi.cloud",
    domain: "nemnidhi.cloud",
    desc: "Cloud-native operating system for secure workspace delivery and infrastructure orchestration.",
  },
  {
    id: "03",
    title: "NEMNIDHI GLAM",
    tags: ["E-Commerce", "Fashion"],
    year: "2024",
    href: "https://glam.nemnidhi.com",
    domain: "glam.nemnidhi.com",
    desc: "Modern ethnic atelier platform for handloom and artisan fashion with campaign-focused commerce.",
  },
  {
    id: "04",
    title: "FINEDGE ACADEMY",
    tags: ["Fintech", "EdTech"],
    year: "2023",
    href: "https://finedge.nemnidhi.com",
    domain: "finedge.nemnidhi.com",
    desc: "Financial education platform with structured courses, risk profiling, and high-intent lead capture.",
  },
  {
    id: "05",
    title: "PUNYANIDHI",
    tags: ["NGO", "Community"],
    year: "2023",
    href: "https://nemnidhi.tech",
    domain: "nemnidhi.tech",
    desc: "Digital home for darshan, transparent giving, event calendars, and community resources.",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useHorizontalScroll(sectionRef);

  return (
    <section
      id="work"
      ref={sectionRef}
      data-scroll-chapter
      style={{
        background: "#080a0c",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
      className="project-showcase-section"
    >
      <Container size="wide">
        <div
          data-section-label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#67e8f9",
              letterSpacing: "0.1em",
            }}
          >
            [ 02 ]
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "#f0f4f8",
            }}
          >
            PROJECT SHOWCASE
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
        </div>
      </Container>

      <div
        data-hscroll-track
        className="project-hscroll-track"
        style={{
          display: "flex",
          gap: "1rem",
          width: "max-content",
          paddingInline: "max(var(--space-page-x), calc((100vw - var(--container-wide)) / 2 + var(--space-page-x)))",
          willChange: "transform",
        }}
      >
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-showcase-card magic-bento-card"
            style={{
              display: "flex",
              minHeight: "30rem",
              width: "min(72vw, 34rem)",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(255,255,255,0.08)",
              background:
                "linear-gradient(145deg, rgba(13,17,23,0.98), rgba(8,10,12,0.98))",
              padding: "2rem",
              textDecoration: "none",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "3rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#67e8f9",
                    letterSpacing: "0.08em",
                  }}
                >
                  {project.id}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.7rem",
                    color: "#f0f4f8",
                    letterSpacing: "0.08em",
                  }}
                >
                  {project.year}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display, var(--font-heading, sans-serif))",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 3.8vw, 3.1rem)",
                  textTransform: "uppercase" as const,
                  color: "#f0f4f8",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.92,
                  fontStyle: "normal",
                  marginBottom: "1rem",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.68rem",
                  color: "#475569",
                  letterSpacing: "0.06em",
                }}
              >
                {project.domain}
              </p>
            </div>

            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#94a3b8",
                      padding: "0.35rem 0.75rem",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ color: "#f0f4f8", fontSize: "0.92rem", lineHeight: 1.7 }}>{project.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .project-showcase-card {
          transition: border-color 180ms var(--ease-out), background 180ms var(--ease-out);
        }
        .project-showcase-card:hover {
          border-color: rgba(103,232,249,0.35) !important;
          background: linear-gradient(145deg, rgba(17,24,32,0.98), rgba(8,10,12,0.98)) !important;
        }
        @media (max-width: 767px) {
          .project-showcase-section {
            min-height: auto !important;
            overflow: visible !important;
          }
          .project-hscroll-track {
            display: grid !important;
            width: auto !important;
            padding-inline: var(--space-page-x) !important;
            will-change: auto !important;
          }
          .project-showcase-card {
            width: 100% !important;
            min-height: 24rem !important;
          }
        }
      `}</style>
    </section>
  );
}
