"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { S, inputStyle, labelStyle, buttonStyle, secondaryButtonStyle, cardStyle } from "../portal-styles";

type QueryRecord = {
  _id: string;
  projectName: string;
  subject: string;
  message: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
};

type Checklist = {
  accountSetup: boolean;
  businessProfile: boolean;
  requirementsShared: boolean;
  documentsShared: boolean;
  kickoffCallBooked: boolean;
};

type OnboardingRecord = {
  companyName: string;
  primaryGoal: string;
  kickoffDate: string | null;
  preferredCommunication: "email" | "phone" | "whatsapp" | "slack" | "meetings";
  billingContactEmail: string;
  projectBrief: string;
  onboardingNotes: string;
  checklist: Checklist;
};

const defaultOnboarding: OnboardingRecord = {
  companyName: "",
  primaryGoal: "",
  kickoffDate: null,
  preferredCommunication: "email",
  billingContactEmail: "",
  projectBrief: "",
  onboardingNotes: "",
  checklist: {
    accountSetup: false,
    businessProfile: false,
    requirementsShared: false,
    documentsShared: false,
    kickoffCallBooked: false,
  },
};

const CHECKLIST_LABELS: Record<keyof Checklist, string> = {
  accountSetup: "Account set up",
  businessProfile: "Business profile shared",
  requirementsShared: "Requirements shared",
  documentsShared: "Documents shared",
  kickoffCallBooked: "Kickoff call booked",
};

export default function PortalQueriesPage() {
  const [queries, setQueries] = useState<QueryRecord[]>([]);
  const [onboarding, setOnboarding] = useState<OnboardingRecord>(defaultOnboarding);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projectName, setProjectName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<QueryRecord["priority"]>("medium");
  const [raising, setRaising] = useState(false);
  const [raiseError, setRaiseError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  function load() {
    setLoading(true);
    Promise.all([
      fetch("/api/portal/queries").then((r) => r.json()),
      fetch("/api/portal/onboarding").then((r) => r.json()),
    ])
      .then(([queriesJson, onboardingJson]) => {
        if (queriesJson.success) setQueries(queriesJson.data as QueryRecord[]);
        else setError(queriesJson?.error?.message ?? "Failed to load queries");

        if (onboardingJson.success && onboardingJson.data) {
          setOnboarding({ ...defaultOnboarding, ...(onboardingJson.data as OnboardingRecord) });
        }
      })
      .catch(() => setError("Failed to load your data"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function raiseQuery(e: React.FormEvent) {
    e.preventDefault();
    setRaising(true);
    setRaiseError(null);
    try {
      const res = await fetch("/api/portal/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName, subject, message, priority }),
      });
      const json = await res.json();
      if (!json.success) {
        setRaiseError(json?.error?.message ?? "Failed to raise query");
        return;
      }
      setQueries((prev) => [json.data as QueryRecord, ...prev]);
      setProjectName("");
      setSubject("");
      setMessage("");
      setPriority("medium");
    } catch {
      setRaiseError("Failed to raise query - please try again.");
    } finally {
      setRaising(false);
    }
  }

  async function saveOnboarding(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/portal/onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(onboarding),
      });
      const json = await res.json();
      if (!json.success) {
        setSaveMessage(json?.error?.message ?? "Failed to save");
        return;
      }
      setOnboarding({ ...defaultOnboarding, ...(json.data as OnboardingRecord) });
      setSaveMessage("Saved.");
    } catch {
      setSaveMessage("Failed to save - please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Container as="section" style={{ padding: "4rem 0" }}>
        <p style={{ color: S.muted }}>Loading...</p>
      </Container>
    );
  }

  return (
    <Container as="section" style={{ padding: "3rem 0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: S.heading, fontSize: "1.75rem", color: S.white }}>Queries &amp; onboarding</h1>
        <Link href="/portal" style={{ ...secondaryButtonStyle, textDecoration: "none", display: "inline-block" }}>
          Back to dashboard
        </Link>
      </div>

      {error ? <p style={{ color: S.danger, fontSize: "0.8rem" }}>{error}</p> : null}

      {/* Onboarding */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: S.heading, fontSize: "1.1rem", color: S.white, marginBottom: "1rem" }}>
          Onboarding checklist
        </h2>
        <form onSubmit={saveOnboarding} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Company name</label>
              <input
                value={onboarding.companyName}
                onChange={(e) => setOnboarding((prev) => ({ ...prev, companyName: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Primary goal</label>
              <input
                value={onboarding.primaryGoal}
                onChange={(e) => setOnboarding((prev) => ({ ...prev, primaryGoal: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Billing contact email</label>
              <input
                type="email"
                value={onboarding.billingContactEmail}
                onChange={(e) => setOnboarding((prev) => ({ ...prev, billingContactEmail: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Kickoff date</label>
              <input
                type="date"
                value={onboarding.kickoffDate ?? ""}
                onChange={(e) => setOnboarding((prev) => ({ ...prev, kickoffDate: e.target.value || null }))}
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Project brief</label>
            <textarea
              rows={3}
              value={onboarding.projectBrief}
              onChange={(e) => setOnboarding((prev) => ({ ...prev, projectBrief: e.target.value }))}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          <div>
            <label style={labelStyle}>Checklist</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {(Object.keys(CHECKLIST_LABELS) as Array<keyof Checklist>).map((key) => (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: S.white, fontSize: "0.875rem" }}>
                  <input
                    type="checkbox"
                    checked={onboarding.checklist[key]}
                    onChange={(e) =>
                      setOnboarding((prev) => ({
                        ...prev,
                        checklist: { ...prev.checklist, [key]: e.target.checked },
                      }))
                    }
                  />
                  {CHECKLIST_LABELS[key]}
                </label>
              ))}
            </div>
          </div>
          {saveMessage ? <p style={{ color: S.muted, fontSize: "0.8rem" }}>{saveMessage}</p> : null}
          <button type="submit" disabled={saving} style={{ ...buttonStyle, alignSelf: "flex-start" }}>
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>

      {/* Raise a query */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: S.heading, fontSize: "1.1rem", color: S.white, marginBottom: "1rem" }}>
          Raise a query
        </h2>
        <form onSubmit={raiseQuery} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Project name</label>
              <input required value={projectName} onChange={(e) => setProjectName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Subject</label>
              <input required value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as QueryRecord["priority"])} style={inputStyle}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Message</label>
            <textarea
              required
              minLength={10}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          {raiseError ? <p style={{ color: S.danger, fontSize: "0.8rem" }}>{raiseError}</p> : null}
          <button type="submit" disabled={raising} style={{ ...buttonStyle, alignSelf: "flex-start" }}>
            {raising ? "Submitting..." : "Submit query"}
          </button>
        </form>
      </div>

      {/* Query list */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: S.heading, fontSize: "1.1rem", color: S.white, marginBottom: "1rem" }}>
          Your queries
        </h2>
        {queries.length === 0 ? (
          <p style={{ color: S.muted, fontSize: "0.875rem" }}>No queries yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {queries.map((q) => (
              <div key={q._id} style={{ borderBottom: `1px solid ${S.line}`, paddingBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: S.white, fontSize: "0.875rem", fontWeight: 600 }}>{q.subject}</span>
                  <span style={{ color: S.faint, fontSize: "0.75rem" }}>
                    {q.status} · {q.priority}
                  </span>
                </div>
                <div style={{ color: S.faint, fontSize: "0.75rem", marginBottom: "0.25rem" }}>{q.projectName}</div>
                <div style={{ color: S.muted, fontSize: "0.8rem" }}>{q.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
