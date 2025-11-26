// app/admin/(public)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data: any = null;
      if (contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#050509] text-zinc-50">
      <Container className="flex min-h-screen items-center justify-center py-10">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.85)]">
          <div className="mb-5 space-y-2 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Admin
            </p>
            <h1 className="text-xl font-semibold text-zinc-50">
              Sign in to Nemnidhi admin
            </h1>
            <p className="text-[12px] text-zinc-400">
              Restricted area. Use the credentials shared with you.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-200">
                Admin email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nemnidhi.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-200">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-6 py-2 text-[11px] font-semibold text-zinc-950 disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Signing in..." : "Sign in"}
              </Button>
            </div>

            <p className="pt-2 text-center text-[10px] text-zinc-500">
              This login is for internal Nemnidhi team use only.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
