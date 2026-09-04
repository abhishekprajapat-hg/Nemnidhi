"use client";

import type { ElementType } from "react";
import { MessageCircle, Tag, Zap, UserCheck, CalendarCheck, Clock3, Archive } from "lucide-react";
import type { FlowStepData } from "@/lib/audit-report";

type Tone = "teal" | "green" | "amber" | "muted";

const TONE_COLOR: Record<Tone, string> = {
  teal: "#0891b2",
  green: "#34d399",
  amber: "#f59e0b",
  muted: "#6b7f96",
};

function Connector({ tone, animated }: { tone: Tone; animated: boolean }) {
  const color = TONE_COLOR[tone];
  return (
    <svg width="22" height="34" viewBox="0 0 22 34" aria-hidden="true" style={{ display: "block", margin: "0 auto" }}>
      <path d="M11 1 V29 M6 24 L11 30 L16 24" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {animated ? (
        <circle r="2.4" fill={color}>
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M11 1 V29" />
        </circle>
      ) : null}
    </svg>
  );
}

function StepNode({
  icon: Icon,
  title,
  subtitle,
  tone,
  delay,
}: {
  icon: ElementType;
  title: string;
  subtitle?: string | null;
  tone: Tone;
  delay: number;
}) {
  const color = TONE_COLOR[tone];
  return (
    <div
      className="audit-flow-node"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px 14px",
        borderRadius: "var(--radius-md)",
        border: `1px solid ${color}55`,
        background: tone === "muted" ? "var(--color-bg-card)" : `${color}14`,
        animationDelay: `${delay}ms`,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: `${color}22`,
          color,
        }}
      >
        <Icon size={15} aria-hidden />
      </span>
      <span>
        <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "var(--color-heading)" }}>{title}</p>
        {subtitle ? (
          <p style={{ margin: "2px 0 0", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{subtitle}</p>
        ) : null}
      </span>
    </div>
  );
}

export function TodayFlow({ intro, stages }: { intro: string; stages: string[] }) {
  if (stages.length === 0) return null;
  return (
    <div>
      <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "12px" }}>{intro}</p>
      <div style={{ maxWidth: "26rem" }}>
        {stages.map((stage, i) => (
          <div key={stage}>
            <div
              className="audit-flow-node"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-line)",
                background: "var(--color-bg-card)",
                animationDelay: `${i * 90}ms`,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "var(--color-bg-elevated)",
                  color: "var(--color-text-muted)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--color-text)" }}>{stage}</p>
            </div>
            {i < stages.length - 1 ? <Connector tone="muted" animated={false} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AutomationFlow({
  entryChain,
  interested,
  noReply,
}: {
  entryChain: FlowStepData[];
  interested: { label: string; steps: FlowStepData[] };
  noReply: { label: string; steps: FlowStepData[] };
}) {
  const entryIcons = [MessageCircle, Tag, Zap];
  const interestedIcons = [UserCheck, CalendarCheck];
  const noReplyIcons = [Clock3, Archive];

  return (
    <div style={{ maxWidth: "28rem" }}>
      <style>{`
        @keyframes audit-flow-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .audit-flow-node {
          opacity: 0;
          animation: audit-flow-in 420ms ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .audit-flow-node { animation: none; opacity: 1; }
        }
      `}</style>

      {entryChain.map((step, i) => (
        <div key={step.title}>
          <StepNode icon={entryIcons[i] ?? MessageCircle} title={step.title} subtitle={step.subtitle} tone="teal" delay={i * 110} />
          {i < entryChain.length - 1 ? <Connector tone="teal" animated /> : null}
        </div>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginTop: "18px" }}>
        <div>
          <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--color-text-faint)", marginBottom: "8px" }}>
            {interested.label}
          </p>
          {interested.steps.map((step, i) => (
            <div key={step.title}>
              <StepNode icon={interestedIcons[i] ?? UserCheck} title={step.title} subtitle={step.subtitle} tone="green" delay={400 + i * 110} />
              {i < interested.steps.length - 1 ? <Connector tone="green" animated /> : null}
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--color-text-faint)", marginBottom: "8px" }}>
            {noReply.label}
          </p>
          {noReply.steps.map((step, i) => (
            <div key={step.title}>
              <StepNode icon={noReplyIcons[i] ?? Clock3} title={step.title} subtitle={step.subtitle} tone="amber" delay={400 + i * 110} />
              {i < noReply.steps.length - 1 ? <Connector tone="amber" animated /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
