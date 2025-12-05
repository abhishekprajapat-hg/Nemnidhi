// app/admin/(protected)/page.tsx
"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <section className="min-h-screen bg-[#050509] text-zinc-50">
      <Container className="py-10">
        {/* Top bar */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Admin
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Nemnidhi admin console
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Review leads, manage content, and keep your systems running calm.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="hidden rounded-full border border-zinc-800 bg-black/70 px-3 py-1 md:inline-flex">
              Signed in as <span className="ml-1 text-amber-300">Admin</span>
            </span>
            <Button
              type="button"
              variant="ghost"
              className="h-8 rounded-full border border-zinc-700 px-3 text-[11px]"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Contact enquiries */}
          <Link
            href="/admin/contact"
            className="group rounded-2xl border border-amber-500/50 bg-gradient-to-br from-black via-zinc-950 to-amber-900/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_26px_70px_rgba(0,0,0,0.95)]"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1 text-[10px] font-medium text-amber-100">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Primary pipeline
            </div>
            <h2 className="text-sm font-semibold text-zinc-50">
              Contact enquiries
            </h2>
            <p className="mt-1 text-[12px] text-zinc-400">
              View, search, and manage all enquiries from the contact page.
              Update status and reply directly.
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Go to leads board</span>
              <span className="text-amber-300 group-hover:translate-x-0.5 transition-transform">
                → Open
              </span>
            </div>
          </Link>

          

          {/* Services CMS (placeholder / future) */}
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-5 opacity-80">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black/70 px-3 py-1 text-[10px] font-medium text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
              Coming soon
            </div>
            <h2 className="text-sm font-semibold text-zinc-50">
              Services content
            </h2>
            <p className="mt-1 text-[12px] text-zinc-400">
              Manage the services shown on the homepage without touching code —
              titles, points, and ordering.
            </p>
            <p className="mt-4 text-[11px] text-zinc-500">
              We&apos;ll wire this up after Services CRUD.
            </p>
          </div>

          {/* Case studies (placeholder / future) */}
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-5 opacity-80">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black/70 px-3 py-1 text-[10px] font-medium text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
              Coming soon
            </div>
            <h2 className="text-sm font-semibold text-zinc-50">Case studies</h2>
            <p className="mt-1 text-[12px] text-zinc-400">
              Publish and update case studies that sync with the public site,
              including results and stack.
            </p>
            <p className="mt-4 text-[11px] text-zinc-500">
              We&apos;ll add this after services are in place.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
