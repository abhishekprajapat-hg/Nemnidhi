"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#080a0c" : "#f0f4f8",
    cardBg: isDark ? "#0d1117" : "#ffffff",
    cardBorder: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)",
    heading: isDark ? "#f0f4f8" : "#0A0907",
    inputBg: isDark ? "transparent" : "#f8f8f8",
    inputBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.18)",
    inputText: isDark ? "#f0f4f8" : "#0A0907",
    accent: isDark ? "#67e8f9" : "#076D87",
    accentText: isDark ? "#080a0c" : "#ffffff",
    muted: isDark ? "#94a3b8" : "#555",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: colors.bg, transition: "background 0.3s ease", position: "relative" }}>
      {/* Theme toggle top-right */}
      <button
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "transparent", border: `1px solid ${colors.cardBorder}`, color: colors.muted, padding: "0.6rem", cursor: "pointer", borderRadius: "8px", display: "flex" }}
      >
        {isDark ? <Sun style={{ width: "1.1rem", height: "1.1rem" }} /> : <Moon style={{ width: "1.1rem", height: "1.1rem" }} />}
      </button>

      <form
        onSubmit={handleLogin}
        style={{ background: colors.cardBg, padding: "3rem", borderRadius: "12px", border: `1px solid ${colors.cardBorder}`, width: "100%", maxWidth: "400px", boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.4)" : "0 8px 40px rgba(0,0,0,0.08)", transition: "background 0.3s" }}
      >
        <h1 style={{ fontFamily: "var(--font-display, var(--font-heading, sans-serif))", fontSize: "1.5rem", color: colors.heading, marginBottom: "0.5rem", textAlign: "center" }}>
          Nemnidhi Admin
        </h1>
        <p style={{ textAlign: "center", color: colors.muted, fontSize: "0.8rem", fontFamily: "var(--font-mono, monospace)", marginBottom: "2rem" }}>
          Enter your admin password to continue
        </p>

        {error && <div style={{ color: "#ef4444", marginBottom: "1rem", fontSize: "0.85rem", fontFamily: "var(--font-mono, monospace)", textAlign: "center" }}>{error}</div>}

        <label style={{ display: "block", marginBottom: "0.5rem", fontFamily: "var(--font-mono, monospace)", fontSize: "0.75rem", color: colors.muted, fontWeight: 600 }}>
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "0.85rem 1rem", background: colors.inputBg, border: `1px solid ${colors.inputBorder}`, color: colors.inputText, marginBottom: "1.5rem", outline: "none", borderRadius: "6px", fontFamily: "inherit", transition: "background 0.3s, color 0.3s" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "1rem", background: colors.accent, color: colors.accentText, border: "none", fontFamily: "var(--font-mono, monospace)", fontWeight: 700, cursor: "pointer", borderRadius: "6px", fontSize: "0.9rem" }}
        >
          {loading ? "LOGGING IN..." : "LOGIN →"}
        </button>
      </form>
    </div>
  );
}
