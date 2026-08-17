"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import { S, inputStyle, labelStyle, buttonStyle, secondaryButtonStyle, cardStyle } from "../portal-styles";

const OFFICE_LOCATION = "B20 - 5th Floor, Gravity Mall, Mechanic Nagar, Indore";

type MeetingType = "online" | "in_person";
type Slot = { dateKey: string; timeKey: string };

type BookedMeeting = {
  type: MeetingType;
  startAt: string;
  location: string;
};

function formatDateKey(dateKey: string) {
  return new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function BookForm() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId") ?? undefined;

  const [type, setType] = useState<MeetingType>("online");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [timeKey, setTimeKey] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booked, setBooked] = useState<BookedMeeting | null>(null);

  useEffect(() => {
    setLoading(true);
    setDateKey(null);
    setTimeKey(null);
    fetch(`/api/portal/meetings/availability?type=${type}&days=21`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSlots(data.data.slots as Slot[]);
        else setError(data?.error?.message ?? "Failed to load availability");
      })
      .catch(() => setError("Failed to load availability"))
      .finally(() => setLoading(false));
  }, [type]);

  const dateKeys = Array.from(new Set(slots.map((s) => s.dateKey)));
  const timesForDate = slots.filter((s) => s.dateKey === dateKey).map((s) => s.timeKey);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dateKey || !timeKey) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/meetings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, dateKey, timeKey, notes: notes || undefined, leadId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data?.error?.message ?? "Failed to book that slot.");
      setBooked(data.data.meeting as BookedMeeting);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book that slot.");
      // The slot may have just been taken - refresh the list so the picker reflects reality.
      fetch(`/api/portal/meetings/availability?type=${type}&days=21`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setSlots(data.data.slots as Slot[]);
        })
        .catch(() => {});
    } finally {
      setSubmitting(false);
    }
  }

  if (booked) {
    return (
      <div style={cardStyle}>
        <h2 style={{ fontFamily: S.heading, fontSize: "1.3rem", color: S.white, marginBottom: "1rem" }}>
          Meeting confirmed
        </h2>
        <p style={{ color: S.white, fontSize: "0.95rem", marginBottom: "0.5rem" }}>
          {new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" }).format(
            new Date(booked.startAt),
          )}
        </p>
        <p style={{ color: S.muted, fontSize: "0.85rem" }}>{booked.location}</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => setType("online")}
          style={type === "online" ? buttonStyle : secondaryButtonStyle}
        >
          Online call
        </button>
        <button
          type="button"
          onClick={() => setType("in_person")}
          style={type === "in_person" ? buttonStyle : secondaryButtonStyle}
        >
          In person (Indore)
        </button>
      </div>

      {type === "in_person" ? (
        <p style={{ color: S.muted, fontSize: "0.8rem", marginBottom: "1.5rem" }}>{OFFICE_LOCATION}</p>
      ) : null}

      {error ? (
        <div style={{ marginBottom: "1.5rem", padding: "0.85rem 1rem", border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", fontFamily: S.mono, fontSize: "0.7rem" }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <p style={{ color: S.muted, fontSize: "0.875rem" }}>Loading available times...</p>
      ) : dateKeys.length === 0 ? (
        <p style={{ color: S.muted, fontSize: "0.875rem" }}>No slots available right now - please check back later.</p>
      ) : (
        <form onSubmit={handleSubmit} style={cardStyle}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={labelStyle}>Pick a date</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {dateKeys.map((dk) => (
                <button
                  key={dk}
                  type="button"
                  onClick={() => {
                    setDateKey(dk);
                    setTimeKey(null);
                  }}
                  style={dk === dateKey ? buttonStyle : secondaryButtonStyle}
                >
                  {formatDateKey(dk)}
                </button>
              ))}
            </div>
          </div>

          {dateKey ? (
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle}>Pick a time (IST)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {timesForDate.map((tk) => (
                  <button
                    key={tk}
                    type="button"
                    onClick={() => setTimeKey(tk)}
                    style={tk === timeKey ? buttonStyle : secondaryButtonStyle}
                  >
                    {tk}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={labelStyle}>Anything you&apos;d like us to know? (optional)</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          <button type="submit" disabled={!dateKey || !timeKey || submitting} style={{ ...buttonStyle, opacity: !dateKey || !timeKey || submitting ? 0.6 : 1 }}>
            {submitting ? "Booking..." : "Confirm meeting"}
          </button>
        </form>
      )}
    </>
  );
}

export default function PortalBookPage() {
  return (
    <Container as="section" style={{ padding: "3rem 0", maxWidth: "42rem" }}>
      <h1 style={{ fontFamily: S.heading, fontSize: "1.75rem", color: S.white, marginBottom: "0.5rem" }}>
        Book a meeting
      </h1>
      <p style={{ color: S.muted, fontSize: "0.875rem", marginBottom: "2rem" }}>
        Pick a time that works for you - online or in person at our Indore office.
      </p>
      <Suspense fallback={null}>
        <BookForm />
      </Suspense>
    </Container>
  );
}
