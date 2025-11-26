// app/admin/contact/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type Submission = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
  status?: "new" | "in-progress" | "closed";
  createdAt?: string;
};

export default function ContactAdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<Submission | null>(null);

  // search + filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "new" | "in-progress" | "closed"
  >("all");
  const [statusUpdating, setStatusUpdating] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/contact");
      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("API did not return JSON. Check /api/contact GET.");
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch submissions");
      }

      const data = await res.json();
      setSubmissions(data);

      if (!selected && data.length > 0) {
        setSelected(data[0]);
      } else if (selected) {
        // refresh current selected from new list (e.g. status change)
        const fresh = data.find((s: Submission) => s._id === selected._id);
        if (fresh) setSelected(fresh);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusLabel = (status?: string) => {
    const s = status || "new";
    if (s === "in-progress") return "In progress";
    if (s === "closed") return "Closed";
    return "New";
  };

  const getStatusClasses = (status?: string) => {
    const s = status || "new";
    if (s === "in-progress")
      return "border-amber-400/50 bg-amber-500/10 text-amber-200";
    if (s === "closed")
      return "border-emerald-400/50 bg-emerald-500/10 text-emerald-200";
    return "border-sky-400/50 bg-sky-500/10 text-sky-200";
  };

  // filtered & searched submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const status = sub.status || "new";
      if (statusFilter !== "all" && status !== statusFilter) return false;

      if (!search.trim()) return true;

      const q = search.toLowerCase();
      const haystack = [
        sub.name,
        sub.email,
        sub.company,
        sub.message,
        sub.budget,
        sub.timeline,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [submissions, search, statusFilter]);

  const handleStatusChange = async (
    id: string,
    status: "new" | "in-progress" | "closed"
  ) => {
    try {
      setStatusUpdating(true);
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data: any = null;
      if (contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        console.error("Status update error:", res.status, data);
        return;
      }

      // Local state update
      setSubmissions((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status } : s))
      );

      if (selected && selected._id === id) {
        setSelected({ ...selected, status });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#050509] text-zinc-50">
      <Container className="py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Admin
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Contact enquiries
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              View, search, and manage submissions from your contact page.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
            {/* Search */}
            <input
              className="w-full rounded-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Search by name, email, company, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Status filter */}
            <select
              className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "all" | "new" | "in-progress" | "closed"
                )
              }
            >
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="in-progress">In progress</option>
              <option value="closed">Closed</option>
            </select>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-800 bg-black/70 px-3 py-1">
                Total:{" "}
                <span className="font-semibold text-amber-300">
                  {submissions.length}
                </span>
              </span>
              <Button
                type="button"
                variant="ghost"
                className="h-8 rounded-full border border-zinc-700 px-3 text-[11px]"
                onClick={fetchSubmissions}
              >
                Refresh
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-8 rounded-full border border-zinc-700 px-3 text-[11px]"
                onClick={async () => {
                  try {
                    await fetch("/api/admin/logout", { method: "POST" });
                    window.location.href = "/admin/login";
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Layout: list + detail */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
          {/* Left: list */}
          <div className="rounded-2xl border border-zinc-800 bg-black/70 p-3">
            <div className="mb-3 flex items-center justify-between text-[11px] text-zinc-500">
              <span>
                {filteredSubmissions.length} shown
                {statusFilter !== "all" && ` · ${getStatusLabel(statusFilter)}`}
                {search && " · filtered"}
              </span>
              {loading && <span>Loading...</span>}
            </div>

            {filteredSubmissions.length === 0 && !loading && (
              <p className="text-xs text-zinc-500">
                No submissions match your filters yet.
              </p>
            )}

            <div className="mt-1 max-h-[480px] space-y-2 overflow-auto pr-1">
              {filteredSubmissions.map((sub) => {
                const active = selected?._id === sub._id;
                const statusLabel = getStatusLabel(sub.status);
                const statusClass = getStatusClasses(sub.status);

                return (
                  <button
                    key={sub._id}
                    type="button"
                    onClick={() => setSelected(sub)}
                    className={[
                      "w-full rounded-xl border px-3 py-2 text-left text-xs transition",
                      active
                        ? "border-amber-400/70 bg-zinc-900/90"
                        : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="truncate">
                        <p className="truncate text-[13px] font-semibold text-zinc-50">
                          {sub.name}{" "}
                          <span className="text-[11px] text-zinc-400">
                            · {sub.email}
                          </span>
                        </p>
                        {sub.company && (
                          <p className="truncate text-[11px] text-zinc-400">
                            {sub.company}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 text-right">
                        <span
                          className={[
                            "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px]",
                            statusClass,
                          ].join(" ")}
                        >
                          {statusLabel}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {formatDate(sub.createdAt)}
                        </span>
                      </div>
                    </div>

                    {sub.message && (
                      <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400">
                        {sub.message}
                      </p>
                    )}

                    <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-zinc-500">
                      {sub.budget && (
                        <span className="rounded-full border border-zinc-700 bg-black/70 px-2 py-0.5">
                          Budget: {sub.budget}
                        </span>
                      )}
                      {sub.timeline && (
                        <span className="rounded-full border border-zinc-700 bg-black/70 px-2 py-0.5">
                          Timeline: {sub.timeline}
                        </span>
                      )}
                      {sub.source && (
                        <span className="rounded-full border border-zinc-700 bg-black/70 px-2 py-0.5">
                          {sub.source}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: detail view */}
          <div className="rounded-2xl border border-zinc-800 bg-black/75 p-4">
            {!selected ? (
              <p className="text-xs text-zinc-500">
                Select a submission on the left to see full details.
              </p>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Contact
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-50">
                      {selected.name}
                    </p>
                    <p className="mt-1 text-[11px] text-amber-200">
                      {selected.email}
                    </p>
                    {selected.company && (
                      <p className="mt-1 text-[11px] text-zinc-400">
                        {selected.company}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-[10px] text-zinc-500">
                    <p>{formatDate(selected.createdAt)}</p>
                    {selected.source && (
                      <p className="mt-1">
                        Source:{" "}
                        <span className="text-zinc-300">{selected.source}</span>
                      </p>
                    )}
                    <div className="mt-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px]",
                          getStatusClasses(selected.status),
                        ].join(" ")}
                      >
                        {getStatusLabel(selected.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pipeline controls */}
                <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    Pipeline
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className={[
                        "h-7 rounded-full border px-3 text-[11px]",
                        (selected.status || "new") === "new"
                          ? "border-sky-400/70 bg-sky-500/10 text-sky-100"
                          : "border-zinc-700 text-zinc-300",
                      ].join(" ")}
                      disabled={statusUpdating}
                      onClick={() => handleStatusChange(selected._id, "new")}
                    >
                      New
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className={[
                        "h-7 rounded-full border px-3 text-[11px]",
                        selected.status === "in-progress"
                          ? "border-amber-400/70 bg-amber-500/10 text-amber-100"
                          : "border-zinc-700 text-zinc-300",
                      ].join(" ")}
                      disabled={statusUpdating}
                      onClick={() =>
                        handleStatusChange(selected._id, "in-progress")
                      }
                    >
                      In progress
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className={[
                        "h-7 rounded-full border px-3 text-[11px]",
                        selected.status === "closed"
                          ? "border-emerald-400/70 bg-emerald-500/10 text-emerald-100"
                          : "border-zinc-700 text-zinc-300",
                      ].join(" ")}
                      disabled={statusUpdating}
                      onClick={() => handleStatusChange(selected._id, "closed")}
                    >
                      Closed
                    </Button>
                  </div>
                </div>

                {/* Budget / timeline */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      Budget
                    </p>
                    <p className="text-[12px] text-zinc-200">
                      {selected.budget || "Not specified"}
                    </p>
                  </div>
                  <div className="space-y-1 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      Timeline
                    </p>
                    <p className="text-[12px] text-zinc-200">
                      {selected.timeline || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    Project context
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-[12px] text-zinc-200">
                    {selected.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a
                    href={`mailto:${
                      selected.email
                    }?subject=Re:%20Nemnidhi%20enquiry&body=Hi%20${encodeURIComponent(
                      selected.name.split(" ")[0]
                    )},%0D%0A%0D%0A`}
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-5 py-2 text-[11px] font-semibold text-zinc-950"
                  >
                    Reply via email
                  </a>
                  <p className="text-[10px] text-zinc-500">
                    Tip: you can copy details from here into your CRM or task
                    system.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
