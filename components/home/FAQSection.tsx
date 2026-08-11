"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

const faqs = [
  {
    q: "What services does Nemnidhi offer?",
    a: "We build custom web applications, mobile apps, WhatsApp automation, AI automation, real estate CRMs, business workflow solutions, cloud infrastructure, and AI-integrated systems. From idea to deployment, every project is scoped around what your business actually needs — not a generic service package.",
  },
  {
    q: "How long does a typical software project take?",
    a: "Most projects run between 6 and 16 weeks depending on scope and complexity. We'll give you a clear timeline estimate in the first scoping conversation — no vague \"it depends\" answers.",
  },
  {
    q: "How much does a custom software project cost?",
    a: "Project cost depends entirely on your scope, complexity, and timeline. Share your requirements and we'll send a straightforward estimate — no hidden fees, no surprises.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We offer post-launch support and maintenance agreements for every project we ship. Whether you need bug fixes, feature iterations, or performance monitoring, we stay available after go-live.",
  },
  {
    q: "Do you sign NDAs before discussing project details?",
    a: "Absolutely. We sign NDAs before any substantive project discussion. Your idea and business details stay confidential — reach out and we'll have an NDA ready before the first call.",
  },
  {
    q: "How do we get started with a project?",
    a: "Fill out the contact form or drop us a message directly. We'll schedule a 30-minute discovery call, understand what you're building, and follow up with a clear scope and estimate within 48 hours.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section
        id="faq"
        className="section-padding"
        style={{
          background: "transparent",
          borderTop: "1px solid var(--color-line)",
        }}
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
              [ 05 ]
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-text)",
              }}
            >
              FREQUENTLY ASKED
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-line)" }} />
          </div>

          {/* Heading + accordion two-col on desktop */}
          <div className="faq-layout">
            <div className="faq-heading-col">
              <h2 className="faq-heading">
                Questions we<br />
                get asked <span style={{ color: "var(--color-accent)" }}>a lot.</span>
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-muted)",
                  marginTop: "1.25rem",
                  maxWidth: "26rem",
                }}
              >
                Can&apos;t find your answer here? Reach out directly — we reply within one business day.
              </p>
            </div>

            <div className="faq-accordion-col">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="faq-item">
                    <button
                      className="faq-trigger"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-btn-${i}`}
                    >
                      <span className="faq-question">{faq.q}</span>
                      <span
                        className="faq-icon"
                        aria-hidden="true"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="faq-answer"
                      style={{
                        maxHeight: isOpen ? "20rem" : "0",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
