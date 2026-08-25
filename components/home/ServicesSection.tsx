"use client";

import { useRef } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import TechStackIcons from "@/components/projects/TechStackIcons";
import { useScrollReveal, useSectionLabel } from "@/lib/useGsapAnimations";

const SERVICE_ILLUSTRATION_KEYS = ["coding", "mobile", "cloud", "ai"] as const;
type IllustrationKey = typeof SERVICE_ILLUSTRATION_KEYS[number];

const SERVICE_IMAGES: Record<IllustrationKey, string> = {
  coding: "/images/illustrations/web-engineering-local-20260825.png",
  mobile: "/images/illustrations/mobile-development-local-20260825.png",
  cloud: "/images/illustrations/cloud-devops-local-20260825.png",
  ai: "/images/illustrations/ai-integration-local-20260825.png",
};

function ServiceCardIllustration({ index }: { index: number }) {
  const key: IllustrationKey = SERVICE_ILLUSTRATION_KEYS[index % SERVICE_ILLUSTRATION_KEYS.length];

  return (
    <div className="service-card-mark" aria-hidden="true">
      <Image
        src={SERVICE_IMAGES[key]}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}

const BRAND_CYAN = "#67e8f9";

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
      "Full-stack web applications, architected before they're coded. React, Next.js, Node — from database design to production deployment.",
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
      "CI/CD pipelines, container orchestration, and zero-downtime deployments — infrastructure your team can operate, not just deploy once.",
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
      suppressHydrationWarning
      className="section-padding"
    >
      <Container size="wide">
        {/* Section label */}
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

        {/* Editorial alternating rows — not a uniform card grid */}
        <div className="services-rows">
          {items.map((service, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={service._id ?? i}
                data-reveal
                className={`service-row${reversed ? " service-row-reversed" : ""}`}
              >
                <div className="service-row-visual">
                  <ServiceCardIllustration index={i} />
                </div>

                <div className="service-row-copy">
                  <div className="service-row-index">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="service-row-index-line" />
                  </div>

                  <h3 className="text-h3">
                    {service.title.replace(/^0\d\s*/, "")}
                  </h3>

                  <p className="text-prose mb-6" style={{ color: "var(--color-text-muted)" }}>
                    {service.description}
                  </p>

                  {service.points && service.points.length > 0 && (
                    <TechStackIcons items={service.points} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <style>{`
        .services-rows {
          display: flex;
          flex-direction: column;
        }
        .service-row {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 3rem;
          align-items: center;
          padding: 3rem 0;
          border-top: 1px solid var(--color-line);
        }
        .service-row-reversed {
          grid-template-columns: 1.1fr 0.9fr;
        }
        .service-row-reversed .service-row-visual {
          order: 2;
        }
        .service-row-visual {
          position: relative;
        }
        .service-row-index {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .service-row-index span:first-child {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-accent);
          letter-spacing: 0.06em;
        }
        .service-row-index-line {
          flex: 1;
          height: 1px;
          background: var(--color-line);
          max-width: 3rem;
        }
        .service-card-mark {
          position: relative;
          overflow: hidden;
          min-height: 220px;
          border-radius: 12px;
          border: 1px solid color-mix(in srgb, ${BRAND_CYAN} 32%, transparent);
          background: #F7F5F0;
          box-shadow: 0 12px 32px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.02);
        }
        @media (max-width: 768px) {
          .service-row,
          .service-row-reversed {
            grid-template-columns: 1fr !important;
            gap: 1.5rem;
            padding: 2.25rem 0;
          }
          .service-row-reversed .service-row-visual {
            order: 0;
          }
        }
      `}</style>
    </section>
  );
}
