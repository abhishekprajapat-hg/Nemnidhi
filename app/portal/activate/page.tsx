"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import { S, inputStyle, labelStyle, buttonStyle, cardStyle } from "../portal-styles";

function ActivateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <div style={cardStyle}>
        <p style={{ color: S.muted, fontSize: "0.875rem" }}>
          This invite link is missing its token - ask your Nemnidhi contact to resend it.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/auth/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, fullName: fullName || undefined }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data?.error?.message ?? "Failed to activate your account");
        return;
      }
      router.push("/portal");
      router.refresh();
    } catch {
      setError("Failed to activate your account - please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={labelStyle}>Your name (optional)</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Set a password</label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>

      {error ? <p style={{ color: S.danger, fontSize: "0.8rem" }}>{error}</p> : null}

      <button type="submit" disabled={submitting} style={{ ...buttonStyle, opacity: submitting ? 0.7 : 1 }}>
        {submitting ? "Activating..." : "Activate account"}
      </button>
    </form>
  );
}

export default function PortalActivatePage() {
  return (
    <Container size="sm" as="section" style={{ padding: "4rem 0", minHeight: "70vh" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h1 style={{ fontFamily: S.heading, fontSize: "1.75rem", color: S.white, marginBottom: "0.5rem" }}>
          Activate your portal access
        </h1>
        <p style={{ color: S.muted, fontSize: "0.875rem", marginBottom: "2rem" }}>
          Set a password to finish setting up your account.
        </p>
        <Suspense fallback={null}>
          <ActivateForm />
        </Suspense>
      </div>
    </Container>
  );
}
