"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: string;
  timeline: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "Contact page",
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data: any = null;

      if (contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong.");
      }

      setSuccess(data?.message || "Thanks. We will reply within 24 hours.");
      setForm({
        name: "",
        email: "",
        company: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="theme-section min-h-screen">
      <Container className="py-16 md:py-22">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="space-y-6">
            <p className="theme-pill">Contact</p>
            <h1 className="max-w-3xl text-4xl text-slate-50 md:text-5xl">
              Share your current bottleneck. We will map the next move.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              Tell us where your website, growth flow, or operations are stuck and
              what success looks like in the next 6 to 12 months.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="theme-card rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Typical response
                </p>
                <p className="mt-1 text-lg font-semibold text-cyan-100">
                  Under 24 hours
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  We reply with direct feedback, not a template pitch.
                </p>
              </div>
              <div className="theme-card rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Best fit
                </p>
                <p className="mt-1 text-lg font-semibold text-cyan-100">
                  SMEs and founder-led teams
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  Especially teams planning a serious rebuild or system upgrade.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400">
              Prefer email:{" "}
              <a className="text-cyan-100 hover:text-cyan-50" href="mailto:hello@nemnidhi.com">
                hello@nemnidhi.com
              </a>
            </p>
          </div>

          <div className="theme-card-strong rounded-3xl p-5 md:p-6">
            <p className="mb-5 text-xs uppercase tracking-[0.16em] text-slate-400">
              Intake Form
            </p>

            {error && (
              <div className="mb-4 rounded-xl border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-100">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-100">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Name <span className="text-red-300">*</span>
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-200/70"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Work email <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-200/70"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Company / brand
                </label>
                <input
                  className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-200/70"
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Your company"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Indicative budget
                  </label>
                  <select
                    className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-200/70"
                    value={form.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                  >
                    <option value="" className="bg-slate-900">
                      Select range
                    </option>
                    <option value="below-50k" className="bg-slate-900">
                      Below INR 50,000
                    </option>
                    <option value="50k-1l" className="bg-slate-900">
                      INR 50,000 to INR 1,00,000
                    </option>
                    <option value="1l-3l" className="bg-slate-900">
                      INR 1,00,000 to INR 3,00,000
                    </option>
                    <option value="3l-plus" className="bg-slate-900">
                      INR 3,00,000 and above
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Ideal timeline
                  </label>
                  <select
                    className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-200/70"
                    value={form.timeline}
                    onChange={(e) => handleChange("timeline", e.target.value)}
                  >
                    <option value="" className="bg-slate-900">
                      Select timeline
                    </option>
                    <option value="asap" className="bg-slate-900">
                      ASAP (2-4 weeks)
                    </option>
                    <option value="1-3-months" className="bg-slate-900">
                      1-3 months
                    </option>
                    <option value="3-plus-months" className="bg-slate-900">
                      3+ months
                    </option>
                    <option value="exploring" className="bg-slate-900">
                      Just exploring
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  What are you looking to build or improve?{" "}
                  <span className="text-red-300">*</span>
                </label>
                <textarea
                  className="min-h-[130px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-200/70"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Share your current bottleneck and what success would look like."
                  required
                />
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-slate-400 [border-color:var(--line)] sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : "Submit enquiry"}
                </Button>
                <p>We only use your details to respond to this request.</p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
