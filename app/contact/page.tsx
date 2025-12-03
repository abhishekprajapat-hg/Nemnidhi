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

      setSuccess(
        data?.message || "Thank you. We’ll get back to you within 24 hours."
      );
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
    <section className="min-h-screen border-b border-zinc-900 bg-[#050509] text-zinc-50">
      <Container className="py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Left – narrative / reassurance */}
          <div
            className="space-y-6"
            data-aos="fade-right"
            data-aos-delay="80"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1">
              <span className="h-1 w-1 rounded-full bg-amber-300" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                Contact
              </p>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold md:text-4xl lg:text-[2.6rem]">
                Share where you{" "}
                <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  want to be
                </span>{" "}
                — we&apos;ll architect the path.
              </h1>

              <p className="max-w-xl text-sm text-zinc-300 md:text-base">
                Give us a clear picture of your brand, current bottlenecks, and
                what a “win” looks like for the next 6–12 months. You&apos;ll
                hear back with senior-level thinking — not a generic sales
                script.
              </p>
            </div>

            {/* Micro stats / reassurance – less card-y, more inline */}
            <div className="grid gap-4 text-xs text-zinc-300 sm:grid-cols-2">
              <div className="space-y-1 rounded-2xl border border-zinc-900 bg-white/[0.02] p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Typical response
                </p>
                <p className="mt-1 text-sm font-semibold text-amber-200">
                  &lt; 24 hours on weekdays
                </p>
                <p className="mt-1 text-[12px] text-zinc-400">
                  No spam, no pressure. If we&apos;re not the right fit,
                  we&apos;ll tell you upfront.
                </p>
              </div>

              <div className="space-y-1 rounded-2xl border border-zinc-900 bg-white/[0.02] p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Ideal for
                </p>
                <ul className="mt-2 space-y-1.5 text-[12px] text-zinc-400">
                  <li>• SMEs planning a serious website revamp</li>
                  <li>• Founders validating a new digital product</li>
                  <li>• Teams stuck with slow, fragmented systems</li>
                </ul>
              </div>
            </div>

            {/* Direct email */}
            <div className="pt-2 text-[12px] text-zinc-500">
              Prefer email? Reach out at{" "}
              <span className="text-amber-300">hello@nemnidhi.com</span>{" "}
              and we&apos;ll pick up the thread there.
            </div>
          </div>

          {/* Right – stepped intake form (timeline-ish) */}
          <div
            className="relative"
            data-aos="fade-left"
            data-aos-delay="120"
          >
            {/* subtle background panel */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl border border-zinc-900 bg-gradient-to-br from-black via-zinc-950 to-zinc-900/90 shadow-[0_26px_80px_rgba(0,0,0,0.9)]" />

            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <p className="text-xs font-medium text-zinc-400">
                A short intake to see if we&apos;re the right fit.
              </p>
              <span className="rounded-full border border-amber-400/40 bg-black/80 px-2.5 py-1 text-[10px] text-amber-100">
                Strategy-first intake
              </span>
            </div>

            {/* Status messages */}
            <div className="px-5">
              {error && (
                <div className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-200">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-200">
                  {success}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-5 pb-6 pt-1 text-xs"
            >
              <div className="relative ml-4 flex gap-6">
                {/* vertical line for steps */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute left-[7px] top-3 h-[90%] w-px bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900" />
                  {["1", "2", "3"].map((step, i) => (
                    <div
                      key={step}
                      className={`relative z-10 mb-16 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
                        i === 0
                          ? "border-amber-400 bg-amber-400/10 text-amber-100"
                          : "border-zinc-700 bg-zinc-900 text-zinc-400"
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>

                {/* fields area */}
                <div className="flex-1 space-y-10">
                  {/* Step 1 */}
                  <section className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Step 1 — About you
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        Who should we address in our reply, and where should it
                        land?
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300">
                          Name<span className="text-red-400"> *</span>
                        </label>
                        <input
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300">
                          Work email<span className="text-red-400"> *</span>
                        </label>
                        <input
                          type="email"
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-300">
                        Company / brand
                      </label>
                      <input
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                        value={form.company}
                        onChange={(e) =>
                          handleChange("company", e.target.value)
                        }
                        placeholder="e.g. Nemnidhi Ventures"
                      />
                    </div>
                  </section>

                  {/* Step 2 */}
                  <section className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Step 2 — Shape of the project
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        Rough range is enough. This just helps us think in the
                        right tier.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300">
                          Indicative budget
                        </label>
                        <select
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                          value={form.budget}
                          onChange={(e) =>
                            handleChange("budget", e.target.value)
                          }
                        >
                          <option value="">Select range</option>
                          <option value="below-50k">Below ₹50,000</option>
                          <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                          <option value="1l-3l">₹1,00,000 – ₹3,00,000</option>
                          <option value="3l-plus">₹3,00,000+</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300">
                          Ideal timeline
                        </label>
                        <select
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                          value={form.timeline}
                          onChange={(e) =>
                            handleChange("timeline", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="asap">ASAP (next 2–4 weeks)</option>
                          <option value="1-3-months">1–3 months</option>
                          <option value="3-plus-months">3+ months</option>
                          <option value="exploring">Just exploring options</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* Step 3 */}
                  <section className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Step 3 — Context
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        What&apos;s not working today, and what would make this
                        project an obvious success?
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-300">
                        What are you looking to build or improve?
                        <span className="text-red-400"> *</span>
                      </label>
                      <textarea
                        className="min-h-[110px] w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                        value={form.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        placeholder="Share context: your current site / stack, what’s broken or slow, and what a win in 6–12 months would look like."
                        required
                      />
                    </div>
                  </section>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-2 border-t border-zinc-900 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-6 py-2 text-[11px] font-semibold text-zinc-950 disabled:opacity-60"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Submit enquiry"}
                </Button>
                <p className="text-[10px] text-zinc-500">
                  No spam. We&apos;ll only use your details to respond to this
                  enquiry.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
