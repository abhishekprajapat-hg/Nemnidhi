"use client";

import Container from "@/components/layout/Container";

const chapters = [
  {
    number: "01",
    kicker: "Strategy",
    title: "Map the moving parts before the sprint begins.",
    copy:
      "We turn loose ideas into product paths, release risks, architecture decisions, and a tight first build plan.",
  },
  {
    number: "02",
    kicker: "Execution",
    title: "Build with the same pressure as launch day.",
    copy:
      "Interfaces, APIs, data models, automations, and deployment paths move together so the product feels coherent fast.",
  },
  {
    number: "03",
    kicker: "Scale",
    title: "Keep the system calm when real users arrive.",
    copy:
      "Performance, observability, maintainability, and conversion details are treated as launch features, not cleanup work.",
  },
];

const heading = "Scroll through the way we turn software into momentum.";

function SplitWords({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="split-word" aria-hidden="true">
          <span className="split-word-inner">{word}</span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export default function ScrollStorySection() {
  return (
    <section
      id="protocol"
      data-scroll-chapter
      className="scroll-story-section"
      aria-labelledby="protocol-heading"
    >
      <Container size="wide" className="scroll-story-container">
        <div className="scroll-story-sticky">
          <p className="section-label">
            <span className="section-label-number">[ 00 ]</span>
            Delivery protocol
          </p>
          <h2 id="protocol-heading" data-split className="scroll-story-heading" aria-label={heading}>
            <SplitWords text={heading} />
          </h2>
          <p data-reveal className="scroll-story-copy">
            Inspired by the Raven-style motion language: large typography, pinned context, and sections that respond as you move.
          </p>
        </div>

        <div className="scroll-story-panels" data-panel-stack>
          {chapters.map((chapter) => (
            <article key={chapter.number} className="scroll-story-panel" data-panel-card>
              <span className="scroll-story-number">{chapter.number}</span>
              <p>{chapter.kicker}</p>
              <h3>{chapter.title}</h3>
              <span>{chapter.copy}</span>
            </article>
          ))}
        </div>
      </Container>
      <div className="scroll-story-marquee" aria-hidden="true">
        <div data-kinetic-text>
          BUILD FAST / SHIP CLEAN / SCALE STEADY / BUILD FAST / SHIP CLEAN / SCALE STEADY /
        </div>
      </div>
    </section>
  );
}
