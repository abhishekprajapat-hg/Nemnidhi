"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { S, inputStyle, labelStyle, buttonStyle, cardStyle } from "../portal-styles";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data?.error?.message ?? "Failed to log in");
        return;
      }
      router.push("/portal");
      router.refresh();
    } catch {
      setError("Failed to log in - please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container size="sm" as="section" style={{ padding: "4rem 0", minHeight: "70vh" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h1 style={{ fontFamily: S.heading, fontSize: "1.75rem", color: S.white, marginBottom: "0.5rem" }}>
          Client Portal
        </h1>
        <p style={{ color: S.muted, fontSize: "0.875rem", marginBottom: "2rem" }}>
          Sign in to review your audit, blueprint, and project requirements.
        </p>

        <form onSubmit={handleSubmit} style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {error ? <p style={{ color: S.danger, fontSize: "0.8rem" }}>{error}</p> : null}

          <button type="submit" disabled={submitting} style={{ ...buttonStyle, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          <p style={{ fontSize: "0.8rem", color: S.faint }}>
            New here?{" "}
            <Link href="/signup" style={{ color: S.accent }}>
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
