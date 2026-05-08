"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  message: string;
};

type ContactApiResponse = {
  message?: string;
};

const DEFAULT_PHONE_PREFIX = "+91 ";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: DEFAULT_PHONE_PREFIX,
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
      let data: ContactApiResponse | null = null;

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
        phone: DEFAULT_PHONE_PREFIX,
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="theme-section min-h-screen">
      <Container className="py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="space-y-6">
            <p className="section-eyebrow">Contact Us</p>
            <h1 className="section-title max-w-3xl">Tell us your bottleneck and we will map the next move.</h1>
            <p className="max-w-xl section-copy">
              Share where your website, growth flow, or operations are blocked and what success looks like in the next
              6 to 12 months.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="theme-card p-4">
                <p className="section-eyebrow">Typical response</p>
                <p className="mt-1 text-lg font-semibold text-[#E7F0FF]">Under 24 hours</p>
                <p className="mt-2 text-sm text-[#AABFD4]">We reply with direct feedback, not a template pitch.</p>
              </div>
              <div className="theme-card p-4">
                <p className="section-eyebrow">Best fit</p>
                <p className="mt-1 text-lg font-semibold text-[#E7F0FF]">SMEs and founder-led teams</p>
                <p className="mt-2 text-sm text-[#AABFD4]">Especially teams planning a serious rebuild or system upgrade.</p>
              </div>
            </div>

            <p className="text-sm text-[#8095AC]">
              Prefer email:{" "}
              <a className="text-[#66AAFF] hover:text-[#E7F0FF]" href="mailto:hello@nemnidhi.com">
                hello@nemnidhi.com
              </a>
            </p>
          </div>

          <div className="theme-card-strong p-5 md:p-6">
            <p className="mb-5 section-eyebrow">Intake Form</p>

            {error && (
              <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#8095AC]">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full rounded-lg border border-[#2A3E56] bg-[#111a28] px-3 py-2.5 text-sm text-[#AABFD4] outline-none transition placeholder:text-[#8095AC] focus:border-[#66AAFF]"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#8095AC]">
                    Work email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-[#2A3E56] bg-[#111a28] px-3 py-2.5 text-sm text-[#AABFD4] outline-none transition placeholder:text-[#8095AC] focus:border-[#66AAFF]"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8095AC]">
                  Mobile number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-[#2A3E56] bg-[#111a28] px-3 py-2.5 text-sm text-[#AABFD4] outline-none transition placeholder:text-[#8095AC] focus:border-[#66AAFF]"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#8095AC]">Indicative budget</label>
                  <select
                    className="w-full rounded-lg border border-[#2A3E56] bg-[#111a28] px-3 py-2.5 text-sm text-[#AABFD4] outline-none transition focus:border-[#66AAFF]"
                    value={form.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                  >
                    <option value="">Select range</option>
                    <option value="below-50k">Below INR 50,000</option>
                    <option value="50k-1l">INR 50,000 to INR 1,00,000</option>
                    <option value="1l-3l">INR 1,00,000 to INR 3,00,000</option>
                    <option value="3l-plus">INR 3,00,000 and above</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#8095AC]">Ideal timeline</label>
                  <select
                    className="w-full rounded-lg border border-[#2A3E56] bg-[#111a28] px-3 py-2.5 text-sm text-[#AABFD4] outline-none transition focus:border-[#66AAFF]"
                    value={form.timeline}
                    onChange={(e) => handleChange("timeline", e.target.value)}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP (2-4 weeks)</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-plus-months">3+ months</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8095AC]">
                  What are you looking to build or improve? <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="min-h-[130px] w-full rounded-lg border border-[#2A3E56] bg-[#111a28] px-3 py-2.5 text-sm text-[#AABFD4] outline-none transition placeholder:text-[#8095AC] focus:border-[#66AAFF]"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Share your current bottleneck and what success would look like."
                  required
                />
              </div>

              <div className="flex flex-col gap-2 border-t border-[#2A3E56] pt-4 text-xs text-[#8095AC] sm:flex-row sm:items-center sm:justify-between">
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
