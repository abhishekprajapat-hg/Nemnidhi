"use client";

import { useState } from "react";
import { CalendarClock, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Slot = { dateKey: string; timeKey: string };

type SlotsResponse = { configured: boolean; slots: Slot[] };

function formatDateKey(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  return date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function groupByDate(slots: Slot[]) {
  const groups = new Map<string, Slot[]>();
  for (const slot of slots) {
    const existing = groups.get(slot.dateKey) ?? [];
    existing.push(slot);
    groups.set(slot.dateKey, existing);
  }
  return Array.from(groups.entries());
}

export function BookingWidget({ token, whatsappLink }: { token: string; whatsappLink: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [configured, setConfigured] = useState(true);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<Slot | null>(null);

  async function openWidget() {
    setOpen(true);
    if (slots) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/audit-report/${token}/meeting-slots`);
      const data = await res.json();
      if (!data.success) throw new Error(data?.error?.message ?? "Could not load available times.");
      const payload = data.data as SlotsResponse;
      setConfigured(payload.configured);
      setSlots(payload.slots);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load available times.");
    } finally {
      setLoading(false);
    }
  }

  async function submitBooking() {
    if (!selected || !contactName.trim() || !contactPhone.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/audit-report/${token}/book-meeting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName: contactName.trim(),
          contactPhone: contactPhone.trim(),
          contactEmail: contactEmail.trim() || undefined,
          dateKey: selected.dateKey,
          timeKey: selected.timeKey,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data?.error?.message ?? "That slot may have just been taken - try another.");
      setConfirmed(selected);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not book that slot. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" onClick={openWidget}>
        <CalendarClock className="h-4 w-4" aria-hidden /> Book a strategy call
      </Button>
    );
  }

  return (
    <div
      className="w-full rounded-[var(--radius-lg)] border p-5"
      style={{ borderColor: "var(--color-line)", background: "var(--color-bg-card)" }}
    >
      {confirmed ? (
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: "#34d399" }} aria-hidden />
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-heading)" }}>
              Call booked for {formatDateKey(confirmed.dateKey)} at {confirmed.timeKey} IST
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              We&apos;ll share the meeting link before the call. Questions in the meantime? Message us on WhatsApp.
            </p>
          </div>
        </div>
      ) : loading ? (
        <p className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading available times...
        </p>
      ) : !configured || !slots?.length ? (
        <div>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            No online slots are open right now - message us on WhatsApp and we&apos;ll find a time directly.
          </p>
          <Button href={whatsappLink} variant="solid" className="mt-3">
            Chat on WhatsApp instead
          </Button>
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm font-semibold" style={{ color: "var(--color-heading)" }}>
            Pick a time (all times IST)
          </p>
          <div className="flex flex-col gap-3">
            {groupByDate(slots).map(([dateKey, daySlots]) => (
              <div key={dateKey}>
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-text-faint)" }}>
                  {formatDateKey(dateKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {daySlots.map((slot) => (
                    <button
                      key={slot.timeKey}
                      type="button"
                      onClick={() => setSelected(slot)}
                      className="rounded-full border px-3 py-1.5 text-sm transition-colors"
                      style={
                        selected?.dateKey === slot.dateKey && selected?.timeKey === slot.timeKey
                          ? { borderColor: "var(--color-accent)", background: "var(--color-accent-bg)", color: "var(--color-heading)" }
                          : { borderColor: "var(--color-line)", color: "var(--color-text)" }
                      }
                    >
                      {slot.timeKey}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selected ? (
            <div className="mt-5 grid gap-2.5 border-t pt-4" style={{ borderColor: "var(--color-line)" }}>
              <input
                required
                placeholder="Your name"
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                className="h-10 w-full rounded-md border bg-transparent px-3 text-sm outline-none"
                style={{ borderColor: "var(--color-line)", color: "var(--color-text)" }}
              />
              <input
                required
                placeholder="Phone number"
                value={contactPhone}
                onChange={(event) => setContactPhone(event.target.value)}
                className="h-10 w-full rounded-md border bg-transparent px-3 text-sm outline-none"
                style={{ borderColor: "var(--color-line)", color: "var(--color-text)" }}
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                className="h-10 w-full rounded-md border bg-transparent px-3 text-sm outline-none"
                style={{ borderColor: "var(--color-line)", color: "var(--color-text)" }}
              />
              <Button
                variant="solid"
                disabled={submitting || !contactName.trim() || !contactPhone.trim()}
                onClick={submitBooking}
                className="mt-1"
              >
                {submitting ? "Booking..." : `Confirm ${formatDateKey(selected.dateKey)}, ${selected.timeKey}`}
              </Button>
            </div>
          ) : null}
        </>
      )}

      {error ? (
        <p className="mt-3 text-xs" style={{ color: "#ef4444" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
