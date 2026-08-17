"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { S, inputStyle, labelStyle, buttonStyle, cardStyle, formatInr } from "../portal-styles";

type Segment = { key: string; label: string; description: string };
type Industry = { key: string; label: string; segments: Segment[] };

type QuestionOption = { value: string; label: string };
type Question = {
  code: string;
  question: string;
  helpText?: string;
  kind: "single" | "multi" | "text";
  options?: QuestionOption[];
};

type RecommendedComponentLine = {
  code: string;
  title: string;
  rationale: string;
  oneTimePrice: number;
  monthlyPrice: number;
};

type SubmitResult = {
  leadId: string;
  blueprint: {
    components: RecommendedComponentLine[];
    estimate: { oneTimeMin: number; oneTimeMax: number; monthlyMin: number; monthlyMax: number; currency: string };
    assumptions: string[];
  };
};

type Step = "industry" | "questions" | "result";

export default function PortalAuditPage() {
  const [step, setStep] = useState<Step>("industry");
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [industryKey, setIndustryKey] = useState("");
  const [segmentKey, setSegmentKey] = useState("");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadyLinked, setAlreadyLinked] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    fetch("/api/questionnaire/industries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setIndustries(data.data as Industry[]);
        else setError(data?.error?.message ?? "Failed to load industries");
      })
      .catch(() => setError("Failed to load industries"))
      .finally(() => setLoadingIndustries(false));
  }, []);

  const selectedIndustry = industries.find((i) => i.key === industryKey) ?? null;

  async function goToQuestions() {
    if (!industryKey) return;
    setLoadingQuestions(true);
    setError(null);
    try {
      const params = new URLSearchParams({ industry: industryKey, ...(segmentKey ? { segment: segmentKey } : {}) });
      const res = await fetch(`/api/questionnaire/questions?${params.toString()}`);
      const data = await res.json();
      if (!data.success) throw new Error(data?.error?.message ?? "Failed to load questions");
      setQuestions(data.data as Question[]);
      setStep("questions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setLoadingQuestions(false);
    }
  }

  function setSingleAnswer(code: string, value: string) {
    setAnswers((prev) => ({ ...prev, [code]: [value] }));
  }

  function toggleMultiAnswer(code: string, value: string) {
    setAnswers((prev) => {
      const current = prev[code] ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [code]: next };
    });
  }

  function setTextAnswer(code: string, value: string) {
    setAnswers((prev) => ({ ...prev, [code]: [value] }));
  }

  async function submitQuestionnaire(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setAlreadyLinked(false);
    try {
      const payloadAnswers = questions
        .filter((q) => answers[q.code]?.length)
        .map((q) => ({ questionCode: q.code, values: answers[q.code] }));

      const res = await fetch("/api/portal/questionnaire/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry: industryKey, segment: segmentKey || undefined, answers: payloadAnswers }),
      });
      const data = await res.json();
      if (!data.success) {
        if (res.status === 409) {
          setAlreadyLinked(true);
          return;
        }
        throw new Error(data?.error?.message ?? "Failed to submit. Please try again.");
      }
      setResult(data.data as SubmitResult);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (alreadyLinked) {
    return (
      <Container size="sm" as="section" style={{ padding: "4rem 0", minHeight: "60vh" }}>
        <div style={{ ...cardStyle, maxWidth: 480, margin: "0 auto" }}>
          <p style={{ color: S.white, fontSize: "0.95rem", marginBottom: "1rem" }}>
            A project is already linked to your account.
          </p>
          <Link href="/portal" style={{ color: S.accent }}>
            Go to your dashboard
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container as="section" style={{ padding: "3rem 0", maxWidth: "42rem" }}>
      <h1 style={{ fontFamily: S.heading, fontSize: "1.75rem", color: S.white, marginBottom: "0.5rem" }}>
        Get an instant estimate
      </h1>
      <p style={{ color: S.muted, fontSize: "0.875rem", marginBottom: "2rem" }}>
        Answer a few questions about how your business runs today - we&apos;ll show you what&apos;s worth building
        and an indicative price.
      </p>

      {error ? (
        <div style={{ marginBottom: "1.5rem", padding: "0.85rem 1rem", border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", fontFamily: S.mono, fontSize: "0.7rem" }}>
          {error}
        </div>
      ) : null}

      {step === "industry" && (
        <div style={cardStyle}>
          {loadingIndustries ? (
            <p style={{ color: S.muted, fontSize: "0.875rem" }}>Loading industries...</p>
          ) : (
            <div style={{ display: "grid", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle} htmlFor="pa-industry">Industry</label>
                <select
                  id="pa-industry"
                  value={industryKey}
                  onChange={(e) => {
                    setIndustryKey(e.target.value);
                    setSegmentKey("");
                  }}
                  style={inputStyle}
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry.key} value={industry.key}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedIndustry && selectedIndustry.segments.length > 0 ? (
                <div>
                  <label style={labelStyle} htmlFor="pa-segment">Which best describes you?</label>
                  <select id="pa-segment" value={segmentKey} onChange={(e) => setSegmentKey(e.target.value)} style={inputStyle}>
                    <option value="">Select one</option>
                    {selectedIndustry.segments.map((segment) => (
                      <option key={segment.key} value={segment.key}>
                        {segment.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <button
                type="button"
                onClick={goToQuestions}
                disabled={!industryKey || loadingQuestions}
                style={{ ...buttonStyle, opacity: !industryKey || loadingQuestions ? 0.6 : 1, alignSelf: "flex-start" }}
              >
                {loadingQuestions ? "Loading..." : "Continue"}
              </button>
            </div>
          )}
        </div>
      )}

      {step === "questions" && (
        <form onSubmit={submitQuestionnaire} style={cardStyle}>
          <div style={{ display: "grid", gap: "2rem" }}>
            {questions.map((question) => (
              <div key={question.code}>
                <p style={{ color: S.white, fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.4rem" }}>{question.question}</p>
                {question.helpText ? (
                  <p style={{ color: S.faint, fontSize: "0.75rem", marginBottom: "0.75rem" }}>{question.helpText}</p>
                ) : null}

                {question.kind === "text" ? (
                  <textarea
                    rows={3}
                    value={answers[question.code]?.[0] ?? ""}
                    onChange={(e) => setTextAnswer(question.code, e.target.value)}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                ) : (
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    {question.options?.map((option) => {
                      const checked = (answers[question.code] ?? []).includes(option.value);
                      return (
                        <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", color: S.muted, cursor: "pointer" }}>
                          <input
                            type={question.kind === "multi" ? "checkbox" : "radio"}
                            name={question.code}
                            checked={checked}
                            onChange={() =>
                              question.kind === "multi"
                                ? toggleMultiAnswer(question.code, option.value)
                                : setSingleAnswer(question.code, option.value)
                            }
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <button type="submit" disabled={submitting} style={{ ...buttonStyle, opacity: submitting ? 0.6 : 1, alignSelf: "flex-start" }}>
              {submitting ? "Building your recommendation..." : "See my recommendation"}
            </button>
          </div>
        </form>
      )}

      {step === "result" && result && (
        <div>
          <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
            <p style={{ color: S.faint, fontSize: "0.7rem", fontFamily: S.mono, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              Estimated setup
            </p>
            <p style={{ color: S.white, fontSize: "1.6rem", fontWeight: 700, marginBottom: "1rem" }}>
              {formatInr(result.blueprint.estimate.oneTimeMin)} – {formatInr(result.blueprint.estimate.oneTimeMax)}
            </p>
            <p style={{ color: S.faint, fontSize: "0.7rem", fontFamily: S.mono, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              Estimated monthly
            </p>
            <p style={{ color: S.white, fontSize: "1.2rem", fontWeight: 700 }}>
              {formatInr(result.blueprint.estimate.monthlyMin)} – {formatInr(result.blueprint.estimate.monthlyMax)}
            </p>
          </div>

          <div style={{ ...cardStyle, display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
            {result.blueprint.components.map((component) => (
              <div key={component.code} style={{ borderBottom: `1px solid ${S.line}`, paddingBottom: "1rem" }}>
                <p style={{ color: S.white, fontWeight: 600, fontSize: "0.9rem" }}>{component.title}</p>
                <p style={{ color: S.muted, fontSize: "0.8rem", marginTop: "0.3rem" }}>{component.rationale}</p>
              </div>
            ))}
          </div>

          {result.blueprint.assumptions.map((assumption, i) => (
            <p key={i} style={{ color: S.faint, fontSize: "0.75rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
              {assumption}
            </p>
          ))}

          <Link href={`/portal/book?leadId=${result.leadId}`} style={{ ...buttonStyle, display: "inline-block", textDecoration: "none", marginTop: "1rem" }}>
            Book a meeting to discuss this
          </Link>
        </div>
      )}
    </Container>
  );
}
