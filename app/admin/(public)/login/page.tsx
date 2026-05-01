// app/admin/(public)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type LoginResponse = {
  message?: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data: LoginResponse | null = null;
      if (contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="admin-theme-v2 min-h-screen text-zinc-50">
      <Container className="flex min-h-screen items-center py-10">
        <div className="grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="admin-login-hero">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">CRM Workspace</p>
            <h1 className="mt-2 text-2xl font-semibold text-zinc-100 md:text-3xl">
              Control your complete sales lifecycle from one command center.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
              Advanced pipeline movement, follow-up intelligence, task orchestration, and team-level accountability
              designed for fast-moving revenue teams.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-700 bg-zinc-950/65 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">Pipeline visibility</p>
                <p className="mt-1 text-sm font-semibold text-zinc-100">Live stage + deal value tracking</p>
              </div>
              <div className="rounded-xl border border-zinc-700 bg-zinc-950/65 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">Execution speed</p>
                <p className="mt-1 text-sm font-semibold text-zinc-100">Bulk actions and workflow automation</p>
              </div>
            </div>
          </div>

          <div className="admin-login-card p-6">
            <div className="mb-5 space-y-2 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">Admin</p>
              <h2 className="text-xl font-semibold text-zinc-100">Sign in to continue</h2>
              <p className="text-[12px] text-zinc-400">Restricted access. Authorized Nemnidhi team only.</p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-200">Admin email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@nemnidhi.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-200">Password</label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="********"
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-6 py-2 text-[11px] font-semibold text-zinc-950 disabled:opacity-60"
                  disabled={submitting}
                >
                  {submitting ? "Signing in..." : "Enter CRM"}
                </Button>
              </div>

              <p className="pt-2 text-center text-[10px] text-zinc-500">
                Access is monitored for internal operations.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
