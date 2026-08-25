"use client";

import type { ElementType } from "react";
import { BrainCircuit, Cloud, Code2, Database, Settings, UsersRound } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

type DiagramNode = {
  className: string;
  title: string;
  copy: string;
  icon: ElementType;
  tone?: "green";
};

const nodes: DiagramNode[] = [
  {
    className: "node-ai",
    title: "AI AGENTS",
    copy: "Intelligent automation that learns and adapts.",
    icon: BrainCircuit,
  },
  {
    className: "node-whatsapp",
    title: "WHATSAPP",
    copy: "Business communication at scale.",
    icon: SiWhatsapp,
    tone: "green",
  },
  {
    className: "node-automation",
    title: "AUTOMATION",
    copy: "Workflows that run 24/7, error-free.",
    icon: Settings,
  },
  {
    className: "node-apis",
    title: "APIs",
    copy: "Connect and extend with any service.",
    icon: Code2,
  },
  {
    className: "node-crm",
    title: "CRM",
    copy: "Centralize customer data and interactions.",
    icon: UsersRound,
  },
  {
    className: "node-database",
    title: "DATABASE",
    copy: "Structured, secure, high-performance data.",
    icon: Database,
  },
  {
    className: "node-cloud",
    title: "CLOUD",
    copy: "Deploy, scale, and stay always available.",
    icon: Cloud,
  },
];

const connectorPaths = [
  { id: "ai", d: "M500 252 V162", sequence: 1 },
  { id: "whatsapp", d: "M350 318 H315 V242 H296", sequence: 2 },
  { id: "automation", d: "M650 318 H685 V242 H704", sequence: 2 },
  { id: "apis", d: "M350 432 H315 V452 H296", sequence: 3 },
  { id: "crm", d: "M650 432 H685 V452 H704", sequence: 3 },
  { id: "database", d: "M455 532 V558 H375 V588", sequence: 4 },
  { id: "cloud", d: "M545 532 V558 H660 V588", sequence: 4 },
];

const connectorDots = [
  { id: "ai-engine", cx: 500, cy: 252, sequence: 1 },
  { id: "ai-card", cx: 500, cy: 162, sequence: 1 },
  { id: "whatsapp-engine", cx: 350, cy: 318, sequence: 2 },
  { id: "whatsapp-card", cx: 296, cy: 242, sequence: 2 },
  { id: "automation-engine", cx: 650, cy: 318, sequence: 2 },
  { id: "automation-card", cx: 704, cy: 242, sequence: 2 },
  { id: "apis-engine", cx: 350, cy: 432, sequence: 3 },
  { id: "apis-card", cx: 296, cy: 452, sequence: 3 },
  { id: "crm-engine", cx: 650, cy: 432, sequence: 3 },
  { id: "crm-card", cx: 704, cy: 452, sequence: 3 },
  { id: "database-engine", cx: 455, cy: 532, sequence: 4 },
  { id: "database-card", cx: 375, cy: 588, sequence: 4 },
  { id: "cloud-engine", cx: 545, cy: 532, sequence: 4 },
  { id: "cloud-card", cx: 660, cy: 588, sequence: 4 },
];

export default function HeroSystemDiagram() {
  return (
    <div className="hero-engine-diagram" aria-label="Nemnidhi software engine architecture">
      <div className="blueprint-field" aria-hidden="true">
        <span className="diagram-corner corner-tl" />
        <span className="diagram-corner corner-tr" />
        <span className="diagram-corner corner-bl" />
        <span className="diagram-corner corner-br" />
        <span className="diagram-plus plus-top">+</span>
        <span className="diagram-plus plus-right">+</span>
        <span className="diagram-plus plus-left">+</span>
        <span className="dot-matrix matrix-left" />
        <span className="dot-matrix matrix-right" />
      </div>

      <p className="diagram-note note-left">ARCHITECTED<br />FOR GROWTH</p>
      <p className="diagram-note note-right">BUILT TO SOLVE<br />REAL PROBLEMS</p>
      <p className="diagram-note note-bottom-left">MODULAR BY DESIGN<br />FLEXIBLE BY NATURE</p>
      <p className="diagram-note note-bottom-right">SECURE &bull; SCALABLE<br />RELIABLE &bull; FAST</p>

      <svg className="connector-map" viewBox="0 0 1000 780" role="presentation" aria-hidden="true">
        {connectorPaths.map(({ id, d, sequence }) => (
          <path
            key={id}
            className={`connector-path connector-${id}`}
            data-sequence={sequence}
            d={d}
            pathLength="1"
          />
        ))}
        {connectorDots.map(({ id, cx, cy, sequence }) => (
          <circle
            key={id}
            className={`connector-dot connector-dot-${id}`}
            data-sequence={sequence}
            cx={cx}
            cy={cy}
            r="5.5"
          />
        ))}
        {connectorPaths.map(({ id, d, sequence }) => (
          <circle key={`signal-${id}`} className={`signal-dot signal-${id}`} data-sequence={sequence} r="4">
            <animateMotion dur="7s" begin={`${2.65 + sequence * 0.18}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
      </svg>

      <div className="engine-core">
        <span className="engine-brand">NEMNIDHI</span>
        <span className="engine-mark">N</span>
        <strong>NEMNIDHI<br />ENGINE</strong>
        <span className="engine-tagline">YOUR BUSINESS. BUILT BETTER.</span>
        <div className="engine-badges">
          <span><i className="status-dot" aria-hidden="true" />SECURE</span>
          <span><i className="status-dot" aria-hidden="true" />SCALABLE</span>
          <span><i className="status-dot" aria-hidden="true" />RELIABLE</span>
        </div>
      </div>

      {nodes.map(({ className, title, copy, icon: Icon, tone }) => (
        <article key={title} className={`diagram-node ${className}`}>
          <span className={`node-icon${tone === "green" ? " is-green" : ""}`}>
            <Icon aria-hidden />
          </span>
          <span className="node-copy">
            <strong>{title}</strong>
            <span>{copy}</span>
          </span>
          <span className="node-dot" />
        </article>
      ))}

      <style>{`
        .hero-engine-diagram {
          --architecture-line: color-mix(in srgb, var(--color-text-faint) 42%, var(--color-accent) 16%);
          --architecture-blueprint: color-mix(in srgb, var(--color-accent) 20%, transparent);
          position: relative;
          width: min(100%, 47.5rem);
          aspect-ratio: 1.28 / 1;
          color: var(--color-heading);
          isolation: isolate;
          padding-top: 1rem;
        }

        .hero-engine-diagram * {
          box-sizing: border-box;
        }

        .blueprint-field,
        .connector-map,
        .engine-core,
        .diagram-node,
        .diagram-note {
          position: absolute;
        }

        .blueprint-field {
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 48%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent 44%),
            linear-gradient(color-mix(in srgb, var(--color-accent) 6%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 6%, transparent) 1px, transparent 1px);
          background-size: auto, 2.75rem 2.75rem, 2.75rem 2.75rem;
          opacity: 0.15;
          animation: blueprint-base 900ms ease 2.7s forwards;
        }

        .blueprint-field::before,
        .blueprint-field::after {
          content: "";
          position: absolute;
          pointer-events: none;
        }

        .blueprint-field::before {
          inset: 9% 4%;
          border: 1px dashed color-mix(in srgb, var(--color-accent) 18%, transparent);
        }

        .blueprint-field::after {
          inset: 24% 25%;
          border: 1px solid color-mix(in srgb, var(--color-line) 72%, transparent);
        }

        .connector-map {
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .connector-map path {
          fill: none;
          stroke: var(--architecture-line);
          stroke-width: 1.45;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          transition: stroke 180ms ease, stroke-width 180ms ease, opacity 180ms ease;
          animation: connector-grow 360ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .connector-map circle {
          fill: var(--color-accent);
        }

        .connector-dot {
          opacity: 0.72;
          transform-box: fill-box;
          transform-origin: center;
          animation: dot-online 260ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .connector-path[data-sequence="1"] { animation-delay: 1.3s; }
        .connector-path[data-sequence="2"] { animation-delay: 1.55s; }
        .connector-path[data-sequence="3"] { animation-delay: 1.9s; }
        .connector-path[data-sequence="4"] { animation-delay: 2.25s; }

        .connector-dot[data-sequence="1"] { animation-delay: 1.58s; }
        .connector-dot[data-sequence="2"] { animation-delay: 1.83s; }
        .connector-dot[data-sequence="3"] { animation-delay: 2.18s; }
        .connector-dot[data-sequence="4"] { animation-delay: 2.53s; }

        .signal-dot {
          fill: var(--color-accent);
          opacity: 0;
          filter: drop-shadow(0 0 0.22rem rgba(47, 145, 174, 0.34));
          animation: signal-visible 7s ease-out infinite both;
        }

        .signal-dot[data-sequence="1"] { animation-delay: 2.83s; }
        .signal-dot[data-sequence="2"] { animation-delay: 3.01s; }
        .signal-dot[data-sequence="3"] { animation-delay: 3.19s; }
        .signal-dot[data-sequence="4"] { animation-delay: 3.37s; }

        .engine-core {
          left: 50%;
          top: 48%;
          z-index: 2;
          display: grid;
          width: clamp(13.75rem, 31%, 15rem);
          aspect-ratio: 0.96 / 1;
          place-items: center;
          padding: 1.65rem 1.2rem;
          transform: translate(-50%, -50%);
          border: 1px solid color-mix(in srgb, var(--color-line-strong) 40%, var(--color-line));
          border-radius: 0.8rem;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--color-bg-elevated) 96%, transparent), color-mix(in srgb, var(--color-bg) 88%, transparent));
          box-shadow:
            0 0.8rem 2.2rem rgba(0, 0, 0, 0.45),
            0 0 1.5rem rgba(103, 232, 249, 0.03),
            inset 0 0 0 0.48rem color-mix(in srgb, var(--color-bg) 70%, transparent);
          opacity: 0;
          animation: engine-boot 600ms cubic-bezier(0.16, 1, 0.3, 1) 300ms forwards;
        }

        [data-theme="light"] .engine-core {
          border: 1px solid color-mix(in srgb, var(--color-text-faint) 36%, transparent);
          box-shadow:
            0 0.8rem 1.8rem rgba(10, 9, 7, 0.07),
            inset 0 0 0 0.48rem color-mix(in srgb, var(--color-bg) 70%, transparent);
        }

        .engine-core::before,
        .engine-core::after {
          content: "";
          position: absolute;
          left: 0.72rem;
          right: 0.72rem;
          height: 0.48rem;
          border: 1px solid color-mix(in srgb, var(--color-text-faint) 24%, transparent);
          border-left: 0;
          border-right: 0;
        }

        .engine-core::before { top: 0.54rem; }
        .engine-core::after { bottom: 0.54rem; }

        .engine-brand,
        .engine-tagline,
        .engine-badges {
          font-family: var(--font-mono, monospace);
          color: var(--color-accent);
          letter-spacing: 0.1em;
        }

        .engine-brand {
          position: absolute;
          left: 1.65rem;
          top: 2rem;
          font-size: 0.48rem;
          font-weight: 700;
        }

        .engine-mark {
          position: absolute;
          top: 1.78rem;
          display: grid;
          width: 1.6rem;
          height: 1.6rem;
          place-items: center;
          border: 1px solid color-mix(in srgb, var(--color-accent) 48%, transparent);
          border-radius: 50%;
          color: var(--color-accent);
          font-family: var(--font-mono, monospace);
          font-size: 0.8rem;
          font-weight: 800;
        }

        .engine-core strong {
          margin-top: 1.35rem;
          text-align: center;
          font-family: var(--font-mono, monospace);
          font-size: clamp(1.32rem, 2.9vw, 1.8rem);
          line-height: 1.08;
          letter-spacing: 0.03em;
        }

        .engine-tagline {
          margin-top: -0.55rem;
          font-size: 0.52rem;
          font-weight: 800;
          white-space: nowrap;
        }

        .engine-badges {
          display: flex;
          gap: 0.72rem;
          font-size: 0.42rem;
          color: var(--color-text-muted);
        }

        .engine-badges span {
          display: inline-flex;
          align-items: center;
        }

        .status-dot {
          display: inline-block;
          width: 0.42rem;
          height: 0.42rem;
          margin-right: 0.27rem;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 0.34rem rgba(47, 145, 174, 0.22);
          opacity: 0;
          transform: scale(0.5);
          animation: status-online 260ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .engine-badges span:nth-child(1) .status-dot { animation-delay: 0.95s; }
        .engine-badges span:nth-child(2) .status-dot { animation-delay: 1.08s; }
        .engine-badges span:nth-child(3) .status-dot { animation-delay: 1.21s; }

        .engine-badges span:nth-child(1) { animation: badge-text-ready 160ms ease 0.95s both; }
        .engine-badges span:nth-child(2) { animation: badge-text-ready 160ms ease 1.08s both; }
        .engine-badges span:nth-child(3) { animation: badge-text-ready 160ms ease 1.21s both; }

        .diagram-node {
          z-index: 2;
          display: grid;
          grid-template-columns: 2.35rem 1fr 0.42rem;
          align-items: center;
          gap: 0.72rem;
          width: clamp(10.9rem, 25%, 12.3rem);
          min-height: 5.2rem;
          padding: 0.72rem 0.82rem;
          transform: translate(-50%, -50%);
          border: 1px solid color-mix(in srgb, var(--color-line-strong) 25%, var(--color-line));
          border-radius: 0.72rem;
          background: color-mix(in srgb, var(--color-bg-elevated) 94%, transparent);
          box-shadow: 0 0.55rem 1.35rem rgba(0, 0, 0, 0.35);
          transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
          opacity: 0;
          animation: module-online 360ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        [data-theme="light"] .diagram-node {
          border: 1px solid color-mix(in srgb, var(--color-text-faint) 34%, transparent);
          box-shadow: 0 0.55rem 1.35rem rgba(10, 9, 7, 0.045);
        }

        .diagram-node:hover {
          border-color: color-mix(in srgb, var(--color-accent) 52%, transparent);
          box-shadow: 0 0.7rem 1.55rem color-mix(in srgb, var(--color-accent) 20%, transparent);
          transform: translate(-50%, -50%) scale(1.015);
        }

        .node-ai { left: 50%; top: 13%; width: clamp(11.6rem, 26%, 13rem); }
        .node-whatsapp { left: 17%; top: 31%; }
        .node-automation { left: 83%; top: 31%; }
        .node-apis { left: 17%; top: 58%; }
        .node-crm { left: 83%; top: 58%; }
        .node-database { left: 37.5%; top: 83%; }
        .node-cloud { left: 66%; top: 83%; }

        .node-ai { animation-delay: 1.6s; }
        .node-whatsapp,
        .node-automation { animation-delay: 1.85s; }
        .node-apis,
        .node-crm { animation-delay: 2.2s; }
        .node-database,
        .node-cloud { animation-delay: 2.55s; }

        .node-icon {
          display: grid;
          place-items: center;
          color: var(--color-accent);
        }

        .node-icon svg {
          width: 1.85rem;
          height: 1.85rem;
          stroke-width: 1.65;
        }

        .node-icon.is-green { color: #25d366; }

        .node-copy {
          display: grid;
          gap: 0.32rem;
          min-width: 0;
        }

        .node-copy strong {
          font-family: var(--font-mono, monospace);
          font-size: 0.63rem;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .node-copy span {
          color: var(--color-text-muted);
          font-size: 0.6rem;
          line-height: 1.42;
        }

        .node-dot {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 0.35rem rgba(47, 145, 174, 0.22);
        }

        .diagram-note,
        .diagram-plus {
          z-index: 3;
          font-family: var(--font-mono, monospace);
          color: var(--color-accent);
          opacity: 0.58;
          pointer-events: none;
          animation: blueprint-note-in 560ms ease 2.7s both;
        }

        .diagram-note {
          font-size: 0.48rem;
          font-weight: 700;
          line-height: 1.48;
          letter-spacing: 0.1em;
        }

        .note-left { left: 27%; top: 17%; }
        .note-right { right: 7%; top: 17%; }
        .note-bottom-left { left: 5%; bottom: 4%; }
        .note-bottom-right { right: 3%; bottom: 4%; }

        .diagram-plus {
          position: absolute;
          font-size: 1.4rem;
          font-weight: 300;
          color: color-mix(in srgb, var(--color-accent) 52%, transparent);
        }

        .plus-top { left: 43%; top: 4%; }
        .plus-right { right: 27%; top: 4%; }
        .plus-left { left: 1.5%; top: 47%; }

        .diagram-corner {
          position: absolute;
          z-index: 3;
          width: 0.85rem;
          height: 0.85rem;
          border-color: color-mix(in srgb, var(--color-text-faint) 52%, transparent);
          opacity: 0;
          animation: blueprint-note-in 560ms ease 2.7s both;
        }

        .corner-tl { left: 1%; top: 7%; border-left: 1px solid; border-top: 1px solid; }
        .corner-tr { right: 1%; top: 7%; border-right: 1px solid; border-top: 1px solid; }
        .corner-bl { left: 1%; bottom: 7%; border-left: 1px solid; border-bottom: 1px solid; }
        .corner-br { right: 1%; bottom: 7%; border-right: 1px solid; border-bottom: 1px solid; }

        .dot-matrix {
          position: absolute;
          z-index: 1;
          width: 5.2rem;
          height: 3.4rem;
          opacity: 0.45;
          background-image: radial-gradient(color-mix(in srgb, var(--color-accent) 24%, transparent) 1px, transparent 1px);
          background-size: 0.46rem 0.46rem;
          animation: blueprint-note-in 560ms ease 2.7s both;
        }

        .matrix-left { left: 4%; top: 23%; }
        .matrix-right { right: 4%; bottom: 19%; }

        @media (hover: hover) and (pointer: fine) {
          .hero-engine-diagram:has(.node-ai:hover) .connector-ai,
          .hero-engine-diagram:has(.node-whatsapp:hover) .connector-whatsapp,
          .hero-engine-diagram:has(.node-automation:hover) .connector-automation,
          .hero-engine-diagram:has(.node-apis:hover) .connector-apis,
          .hero-engine-diagram:has(.node-crm:hover) .connector-crm,
          .hero-engine-diagram:has(.node-database:hover) .connector-database,
          .hero-engine-diagram:has(.node-cloud:hover) .connector-cloud {
            stroke: var(--color-accent);
            stroke-width: 1.9;
            opacity: 0.95;
          }

          .diagram-node:hover .node-icon {
            filter: drop-shadow(0 0 0.18rem rgba(47, 145, 174, 0.28));
          }
        }

        @keyframes engine-boot {
          from {
            opacity: 0;
            transform: translate(-50%, calc(-50% + 8px)) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes status-online {
          0% {
            opacity: 0;
            transform: scale(0.5);
            box-shadow: 0 0 0 rgba(47, 145, 174, 0);
          }
          72% {
            opacity: 1;
            transform: scale(1.2);
            box-shadow: 0 0 0.56rem rgba(47, 145, 174, 0.3);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 0.34rem rgba(47, 145, 174, 0.22);
          }
        }

        @keyframes badge-text-ready {
          from { color: var(--color-text-muted); }
          to { color: var(--color-text-muted); }
        }

        @keyframes connector-grow {
          from {
            opacity: 0;
            stroke-dashoffset: 1;
          }
          to {
            opacity: 0.82;
            stroke-dashoffset: 0;
          }
        }

        @keyframes dot-online {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          70% {
            opacity: 0.78;
            transform: scale(1.18);
          }
          100% {
            opacity: 0.72;
            transform: scale(1);
          }
        }

        @keyframes module-online {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes signal-visible {
          0%, 1% { opacity: 0; }
          3%, 9% { opacity: 0.86; }
          12%, 100% { opacity: 0; }
        }

        @keyframes blueprint-base {
          to { opacity: 0.42; }
        }

        @keyframes blueprint-note-in {
          from { opacity: 0; }
          to { opacity: 0.58; }
        }

        @media (max-width: 1080px) {
          .hero-engine-diagram {
            width: min(100%, 43rem);
          }

          .diagram-node {
            min-height: 4.9rem;
            gap: 0.58rem;
            padding-inline: 0.72rem;
          }
        }

        @media (max-width: 900px) {
          .hero-engine-diagram {
            width: min(100%, 47.5rem);
          }
        }

        @media (max-width: 640px) {
          .hero-engine-diagram {
            width: min(100%, 24rem);
            min-height: 58rem;
            aspect-ratio: auto;
          }

          .connector-map,
          .diagram-note,
          .diagram-plus {
            display: none;
          }

          .blueprint-field::before,
          .blueprint-field::after {
            inset: 5%;
          }

          .engine-core {
            top: 45%;
            width: min(100%, 15rem);
            aspect-ratio: 0.96 / 1;
          }

          .engine-core strong {
            font-size: 1.38rem;
          }

          .engine-brand {
            left: 1.35rem;
          }

          .engine-badges {
            gap: 0.52rem;
            font-size: 0.4rem;
          }

          .diagram-node,
          .node-ai {
            width: min(100%, 18rem);
            left: 50%;
            grid-template-columns: 2.2rem 1fr 0.42rem;
            min-height: 4.9rem;
          }

          .node-ai { top: 6%; }
          .node-whatsapp { top: 16%; }
          .node-automation { top: 26%; }
          .node-apis { top: 64%; }
          .node-crm { top: 74%; }
          .node-database { top: 84%; }
          .node-cloud { top: 94%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .blueprint-field,
          .engine-core,
          .diagram-node,
          .diagram-note,
          .diagram-plus,
          .diagram-corner,
          .dot-matrix,
          .connector-map path,
          .connector-dot,
          .status-dot {
            animation: none !important;
            opacity: revert;
          }

          .blueprint-field { opacity: 0.42; }
          .engine-core,
          .diagram-node {
            opacity: 1;
          }
          .connector-map path {
            opacity: 0.82;
            stroke-dashoffset: 0;
          }
          .connector-dot { opacity: 0.72; }
          .status-dot { opacity: 1; transform: scale(1); }
          .signal-dot { display: none; }
        }
      `}</style>
    </div>
  );
}
