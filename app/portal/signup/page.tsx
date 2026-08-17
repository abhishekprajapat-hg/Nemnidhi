"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { S, inputStyle, labelStyle, buttonStyle, cardStyle } from "../portal-styles";

const COMMUNICATION_OPTIONS = ["email", "phone", "whatsapp", "slack", "meetings"] as const;

export default function PortalSignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [legalName, setLegalName] = useState("");
  const [preferredCommunication, setPreferredCommunication] = useState<(typeof COMMUNICATION_OPTIONS)[number]>("email");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [requirementSummary, setRequirementSummary] = useState("");
  const [requirementDetails, setRequirementDetails] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/portal/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          legalName,
          preferredCommunication,
          primaryGoal,
          requirementSummary,
          requirementDetails,
          password,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data?.error?.message ?? "Failed to create account");
        return;
      }
      router.push("/portal");
      router.refresh();
    } catch {
      setError("Failed to create account - please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container size="sm" as="section" style={{ padding: "4rem 0", minHeight: "70vh" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 style={{ fontFamily: S.heading, fontSize: "1.75rem", color: S.white, marginBottom: "0.5rem" }}>
          Create your account
        </h1>
        <p style={{ color: S.muted, fontSize: "0.875rem", marginBottom: "2rem" }}>
          Tell us a bit about your business so we can plan the right engagement.
        </p>

        <form onSubmit={handleSubmit} style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Your name</label>
            <input required value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Company name</label>
            <input required value={legalName} onChange={(e) => setLegalName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Preferred communication</label>
            <select
              value={preferredCommunication}
              onChange={(e) => setPreferredCommunication(e.target.value as typeof preferredCommunication)}
              style={inputStyle}
            >
              {COMMUNICATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option[0].toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Primary goal</label>
            <input required value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>What do you need help with?</label>
            <textarea
              required
              minLength={10}
              rows={3}
              value={requirementSummary}
              onChange={(e) => setRequirementSummary(e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          <div>
            <label style={labelStyle}>Anything else? (optional)</label>
            <textarea
              rows={3}
              value={requirementDetails}
              onChange={(e) => setRequirementDetails(e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Confirm password</label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {error ? <p style={{ color: S.danger, fontSize: "0.8rem" }}>{error}</p> : null}

          <button type="submit" disabled={submitting} style={{ ...buttonStyle, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Creating account..." : "Create account"}
          </button>

          <p style={{ fontSize: "0.8rem", color: S.faint }}>
            Already have an account?{" "}
            <Link href="/portal/login" style={{ color: S.accent }}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
