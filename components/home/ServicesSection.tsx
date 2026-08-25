"use client";

import { lazy, Suspense, useRef } from "react";
import type { FC } from "react";
import Container from "@/components/layout/Container";
import { useScrollReveal, useSectionLabel } from "@/lib/useGsapAnimations";

interface IllustrationProps {
  primaryColor?: string;
  height?: string;
}

const UndrawCoding = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawCoding").then((m) => ({
    default: (m.UndrawCoding ?? m.default) as FC<IllustrationProps>,
  }))
);
const UndrawMobileApps = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawMobileApps").then((m) => ({
    default: (m.UndrawMobileApps ?? m.default) as FC<IllustrationProps>,
  }))
);
const UndrawCloudHosting = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawCloudHosting").then((m) => ({
    default: (m.UndrawCloudHosting ?? m.default) as FC<IllustrationProps>,
  }))
);
const UndrawArtificialIntelligence = lazy(() =>
  import("react-undraw-illustrations/lib/components/UndrawArtificialIntelligence").then((m) => ({
    default: (m.UndrawArtificialIntelligence ?? m.default) as FC<IllustrationProps>,
  }))
);

const SERVICE_ILLUSTRATION_KEYS = ["coding", "mobile", "cloud", "ai"] as const;
type IllustrationKey = (typeof SERVICE_ILLUSTRATION_KEYS)[number];

const BRAND_CYAN = "#67e8f9";

function ServiceCardIllustration({ index }: { index: number }) {
  const key: IllustrationKey = SERVICE_ILLUSTRATION_KEYS[index % SERVICE_ILLUSTRATION_KEYS.length];
  const props: IllustrationProps = { primaryColor: BRAND_CYAN, height: "160px" };

  return (
    <Suspense fallback={<div style={{ height: "160px" }} />}>
      {key === "coding" && <UndrawCoding {...props} />}
      {key === "mobile" && <UndrawMobileApps {...props} />}
      {key === "cloud" && <UndrawCloudHosting {...props} />}
      {key === "ai" && <UndrawArtificialIntelligence {...props} />}
    </Suspense>
  );
}

type Service = {
  _id?: string;
  title: string;
  description: string;
  points?: string[];
};

const defaultServices = [
  {
    _id: "1",
    title: "WEB ENGINEERING",
    description:
      "Full-stack web applications built for scale. React, Next.js, Node - architected for performance from day one.",
    points: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    _id: "2",
    title: "MOBILE DEVELOPMENT",
    description:
      "Native and cross-platform mobile applications that ship on time and hold up in production.",
    points: ["React Native", "iOS", "Android", "Expo"],
  },
  {
    _id: "3",
    title: "CLOUD & DEVOPS",
    description:
      "Infrastructure that scales with your business. CI/CD pipelines, container orchestration, zero-downtime deployments.",
    points: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    _id: "4",
    title: "AI INTEGRATION",
    description:
      "Intelligent systems embedded into your product. LLM pipelines, RAG architectures, and custom model fine-tuning.",
    points: ["LLMs", "RAG", "Python", "Vector DBs"],
  },
];

export default function ServicesSection({
  services,
}: {
  services?: Service[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionLabel(sectionRef);
  useScrollReveal(sectionRef, { stagger: 0.15, startY: 80 });

  const items = services && services.length > 0 ? services : defaultServices;

  return (
    <section
      id="services"
      ref={sectionRef}
      data-scroll-chapter
      className="section-padding"
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
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
            }}
          >
            [ 01 ]
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "var(--color-text)",
            }}
          >
            WHAT WE BUILD
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "var(--color-line)",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "var(--color-line)",
            border: "1px solid var(--color-line)",
          }}
          className="services-grid-responsive"
        >
          {items.map((service, i) => (
            <div
              key={service._id ?? i}
              data-reveal
              className="service-card-hover magic-bento-card"
              style={{
                padding: "2.5rem",
                background: "var(--color-bg-card)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{ marginBottom: "1.5rem", opacity: 0.9 }}>
                <ServiceCardIllustration index={i} />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <path
                    d="M2 12L12 2M12 2H4M12 2V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="text-h3">
                {service.title.replace(/^0\d\s*/, "")}
              </h3>

              <p className="text-prose mb-6" style={{ color: "var(--color-text-muted)" }}>
                {service.description}
              </p>

              {service.points && service.points.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
                  {service.points.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-block",
                        padding: "0.3rem 0.7rem",
                        border: "1px solid var(--color-line)",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.62rem",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        .service-card-hover:hover {
          background: var(--color-bg-card-hover) !important;
        }
        @media (max-width: 768px) {
          .services-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
