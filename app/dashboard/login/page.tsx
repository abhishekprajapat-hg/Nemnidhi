"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <form onSubmit={handleLogin} style={{ background: "#0d1117", padding: "3rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)", width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontFamily: "var(--font-display, var(--font-heading, sans-serif))", fontSize: "1.5rem", color: "#f0f4f8", marginBottom: "1.5rem", textAlign: "center" }}>Admin Login</h1>
        
        {error && <div style={{ color: "#ef4444", marginBottom: "1rem", fontSize: "0.85rem", fontFamily: "var(--font-mono, monospace)", textAlign: "center" }}>{error}</div>}

        <input 
          type="password" 
          placeholder="Enter Admin Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "0.85rem 1rem", background: "transparent", border: "1px solid rgba(255,255,255,0.07)", color: "#f0f4f8", marginBottom: "1.5rem", outline: "none" }}
        />

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "1rem", background: "#67e8f9", color: "#080a0c", border: "none", fontFamily: "var(--font-mono, monospace)", fontWeight: 700, cursor: "pointer" }}>
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
}
