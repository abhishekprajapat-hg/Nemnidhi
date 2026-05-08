// app/api/contact/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import { ContactSubmission } from "@/models/ContactSubmission";
import { CrmLead, LeadPriority } from "@/models/CrmLead";

type HrmsLeadCategory =
  | "software_request"
  | "infrastructure"
  | "legal_automation"
  | "retainer_enterprise"
  | "other";

type HrmsLeadUrgency = "low" | "medium" | "high" | "critical";

type HrmsLeadPayload = {
  title: string;
  contactName: string;
  email: string;
  source: "website";
  category: HrmsLeadCategory;
  urgency: HrmsLeadUrgency;
  budget?: {
    min: number;
    max: number;
    currency: "INR";
  };
  description: string;
  tags: string[];
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function toOptionalString(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function normalizeOrigin(raw: string | null | undefined) {
  if (!raw) return null;

  try {
    const candidate = raw.includes("://") ? raw : `https://${raw}`;
    const parsed = new URL(candidate);
    return `${parsed.protocol}//${parsed.host}`.toLowerCase();
  } catch {
    return null;
  }
}

function getOriginForHrmsForward(request: Request) {
  const directOrigin = normalizeOrigin(request.headers.get("origin"));
  if (directOrigin) {
    return directOrigin;
  }

  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = request.headers.get("host")?.split(",")[0]?.trim();

  if (forwardedProto && forwardedHost) {
    const fromForwarded = normalizeOrigin(`${forwardedProto}://${forwardedHost}`);
    if (fromForwarded) {
      return fromForwarded;
    }
  }

  if (host) {
    const fromHost = normalizeOrigin(`https://${host}`);
    if (fromHost) {
      return fromHost;
    }
  }

  return normalizeOrigin(process.env.HRMS_LEAD_ORIGIN) ?? "https://nemnidhi.com";
}

function getHrmsEndpoint() {
  const endpoint = process.env.HRMS_LEAD_ENDPOINT?.trim();
  if (!endpoint) {
    return null;
  }

  try {
    return new URL(endpoint).toString();
  } catch {
    console.error("HRMS_LEAD_ENDPOINT is invalid. Skipping HRMS lead sync.");
    return null;
  }
}

function normalizeBudgetValue(rawBudget?: string) {
  if (!rawBudget) return undefined;
  const budget = rawBudget.trim().toLowerCase();

  const knownRanges: Record<string, number> = {
    "below-50k": 40000,
    "50k-1l": 75000,
    "1l-3l": 200000,
    "3l-plus": 350000,
    "below inr 50,000": 40000,
    "inr 50,000 to inr 1,00,000": 75000,
    "inr 1,00,000 to inr 3,00,000": 200000,
    "inr 3,00,000+": 350000,
  };

  if (budget in knownRanges) {
    return knownRanges[budget];
  }

  const numericOnly = budget.replace(/,/g, "");
  const matches = [...numericOnly.matchAll(/(\d+(?:\.\d+)?)(k|l|lac|lakh)?/g)];
  if (!matches.length) return undefined;

  const toNumber = (num: string, unit?: string) => {
    const base = Number(num);
    if (!Number.isFinite(base)) return undefined;
    if (unit === "k") return base * 1000;
    if (unit === "l" || unit === "lac" || unit === "lakh") return base * 100000;
    return base;
  };

  const values = matches
    .map((match) => toNumber(match[1], match[2]))
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));

  if (!values.length) return undefined;
  if (values.length === 1) return Math.round(values[0]);

  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.round(avg);
}

function mapBudgetToHrmsRange(rawBudget?: string) {
  if (!rawBudget) return undefined;

  const normalized = rawBudget.trim().toLowerCase();
  if (normalized.includes("below") && normalized.includes("50")) {
    return { min: 0, max: 50000, currency: "INR" as const };
  }
  if (normalized.includes("50k-1l") || (normalized.includes("50,000") && normalized.includes("1,00,000"))) {
    return { min: 50000, max: 100000, currency: "INR" as const };
  }
  if (normalized.includes("1l-3l") || (normalized.includes("1,00,000") && normalized.includes("3,00,000"))) {
    return { min: 100000, max: 300000, currency: "INR" as const };
  }
  if (
    normalized.includes("3l-plus") ||
    normalized.includes("3,00,000+") ||
    normalized.includes("3,00,000 and above")
  ) {
    return { min: 300000, max: 500000, currency: "INR" as const };
  }

  const center = normalizeBudgetValue(rawBudget);
  if (!center) return undefined;

  const min = Math.max(0, Math.round(center * 0.8));
  const max = Math.max(min, Math.round(center * 1.2));
  return { min, max, currency: "INR" as const };
}

function mapTimelineToHrmsUrgency(timeline?: string): HrmsLeadUrgency {
  const normalizedTimeline = (timeline || "").toLowerCase();

  if (normalizedTimeline.includes("asap")) return "critical";
  if (normalizedTimeline.includes("1-3")) return "high";
  if (normalizedTimeline.includes("3+")) return "medium";
  if (normalizedTimeline.includes("exploring")) return "low";

  return "medium";
}

function mapToHrmsCategory(source?: string, message?: string): HrmsLeadCategory {
  const combined = `${source || ""} ${message || ""}`.toLowerCase();

  if (/(infra|infrastructure|cloud|devops|server|hosting|aws|gcp|azure)/.test(combined)) {
    return "infrastructure";
  }

  if (/(legal|law|advocate|court|case|compliance)/.test(combined)) {
    return "legal_automation";
  }

  if (/(retainer|monthly|ongoing|long[\s-]?term)/.test(combined)) {
    return "retainer_enterprise";
  }

  if (/(website|web app|dashboard|automation|crm|software|app)/.test(combined)) {
    return "software_request";
  }

  return "other";
}

function buildHrmsTags(source?: string, timeline?: string, category?: HrmsLeadCategory) {
  const tags = new Set<string>(["nemnidhi", "website"]);
  const sourceLower = (source || "").toLowerCase();
  const timelineLower = (timeline || "").toLowerCase();

  if (sourceLower.includes("chatbot")) tags.add("chatbot");
  if (sourceLower.includes("contact")) tags.add("contact-form");
  if (timelineLower.includes("asap")) tags.add("urgent");
  if (category === "retainer_enterprise") tags.add("retainer");
  if (category === "infrastructure") tags.add("infrastructure");

  return [...tags].slice(0, 8);
}

function buildHrmsTitle(name: string, company?: string, source?: string) {
  const cleanedCompany = company?.trim();
  const cleanedName = name.trim();
  const sourceLabel = source?.trim() || "Website";

  const base = cleanedCompany ? `${cleanedCompany} enquiry` : `${cleanedName} enquiry`;
  const title = `${base} (${sourceLabel})`;

  return title.length > 190 ? title.slice(0, 190) : title;
}

function buildHrmsDescription(input: {
  message: string;
  phone?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  source?: string;
}) {
  const lines = [input.message.trim()];
  if (input.phone) lines.push(`Mobile: ${input.phone}`);
  if (input.company) lines.push(`Company: ${input.company}`);
  if (input.budget) lines.push(`Budget: ${input.budget}`);
  if (input.timeline) lines.push(`Timeline: ${input.timeline}`);
  if (input.source) lines.push(`Source: ${input.source}`);

  return lines.join("\n\n");
}

function derivePriority(budget?: string, timeline?: string): LeadPriority {
  const normalizedBudget = (budget || "").toLowerCase();
  const normalizedTimeline = (timeline || "").toLowerCase();

  if (normalizedTimeline.includes("asap")) return "high";
  if (normalizedBudget.includes("3l") || normalizedBudget.includes("3,00,000")) return "high";
  if (normalizedBudget.includes("1l") || normalizedBudget.includes("1,00,000")) return "medium";
  if (normalizedBudget.includes("50k")) return "medium";

  return "medium";
}

function buildLeadTags(source?: string, budget?: string, timeline?: string) {
  const tags = new Set<string>(["website-contact"]);

  const sourceLower = (source || "").toLowerCase();
  const budgetLower = (budget || "").toLowerCase();
  const timelineLower = (timeline || "").toLowerCase();

  if (sourceLower.includes("chatbot")) tags.add("chatbot");
  if (sourceLower.includes("contact page")) tags.add("contact-page");
  if (timelineLower.includes("asap")) tags.add("urgent");
  if (budgetLower.includes("3l") || budgetLower.includes("3,00,000")) tags.add("high-budget");

  return [...tags].slice(0, 20);
}

function buildNextFollowUp(timeline?: string) {
  const now = Date.now();
  const normalizedTimeline = (timeline || "").toLowerCase();

  if (normalizedTimeline.includes("asap")) {
    return new Date(now + 12 * 60 * 60 * 1000);
  }

  return new Date(now + 24 * 60 * 60 * 1000);
}

async function forwardLeadToHrms(
  request: Request,
  input: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    budget?: string;
    timeline?: string;
    message: string;
    source?: string;
  },
) {
  const endpoint = getHrmsEndpoint();
  if (!endpoint) {
    console.warn("HRMS lead sync skipped because HRMS_LEAD_ENDPOINT is not configured.");
    return false;
  }

  const origin = getOriginForHrmsForward(request);
  const category = mapToHrmsCategory(input.source, input.message);

  const payload: HrmsLeadPayload = {
    title: buildHrmsTitle(input.name, input.company, input.source),
    contactName: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    source: "website",
    category,
    urgency: mapTimelineToHrmsUrgency(input.timeline),
    budget: mapBudgetToHrmsRange(input.budget),
    description: buildHrmsDescription({
      message: input.message,
      phone: input.phone,
      company: input.company,
      budget: input.budget,
      timeline: input.timeline,
      source: input.source,
    }),
    tags: buildHrmsTags(input.source, input.timeline, category),
  };

  const timeoutMs = Number(process.env.HRMS_LEAD_TIMEOUT_MS || "12000");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number.isFinite(timeoutMs) ? timeoutMs : 12000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Referer: `${origin.replace(/\/$/, "")}/contact`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    let data: unknown = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message =
        typeof data === "object" &&
        data &&
        "error" in data &&
        typeof (data as { error?: { message?: unknown } }).error?.message === "string"
          ? (data as { error: { message: string } }).error.message
          : `status ${response.status}`;

      throw new Error(`HRMS_SYNC_FAILED:${message}`);
    }

    return Boolean(data || response.ok);
  } finally {
    clearTimeout(timeout);
  }
}

// GET - list all submissions
export async function GET() {
  try {
    await dbConnect();

    const submissions = await ContactSubmission.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(submissions);
  } catch (error: unknown) {
    console.error("GET /api/contact error:", getErrorMessage(error));
    return NextResponse.json({ message: "Failed to fetch submissions" }, { status: 500 });
  }
}

// POST - create new submission
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, mobile, company, budget, timeline, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Name, email, and message are required." }, { status: 400 });
    }

    const cleanSource = toOptionalString(source) || "Website contact form";
    const cleanBudget = toOptionalString(budget);
    const cleanTimeline = toOptionalString(timeline);
    const cleanPhone = toOptionalString(phone) || toOptionalString(mobile);
    const cleanCompany = toOptionalString(company);
    const cleanMessage = String(message).trim();
    const leadValue = normalizeBudgetValue(cleanBudget);
    const leadPriority = derivePriority(cleanBudget, cleanTimeline);
    const nextFollowUp = buildNextFollowUp(cleanTimeline);
    const now = new Date();

    let hrmsSynced = false;
    try {
      hrmsSynced = await forwardLeadToHrms(req, {
        name: String(name),
        email: String(email),
        phone: cleanPhone,
        company: cleanCompany,
        budget: cleanBudget,
        timeline: cleanTimeline,
        message: cleanMessage,
        source: cleanSource,
      });
    } catch (hrmsError: unknown) {
      console.error("HRMS sync failed. Falling back to local lead capture:", getErrorMessage(hrmsError));
    }

    let localSaved = false;
    try {
      await dbConnect();

      await ContactSubmission.create({
        name,
        email,
        phone: cleanPhone,
        company: cleanCompany,
        budget: cleanBudget,
        timeline: cleanTimeline,
        message: cleanMessage,
        source: cleanSource,
        status: "new",
      });

      await CrmLead.create({
        name: String(name).trim(),
        email: String(email).trim(),
        phone: cleanPhone,
        company: cleanCompany,
        requirement: cleanMessage,
        source: cleanSource,
        status: "new",
        priority: leadPriority,
        value: leadValue,
        nextFollowUp,
        score: 58,
        tags: buildLeadTags(cleanSource, cleanBudget, cleanTimeline),
        notes: [
          "Auto-captured from website contact form.",
          cleanPhone ? `Mobile: ${cleanPhone}` : null,
          cleanBudget ? `Budget: ${cleanBudget}` : null,
          cleanTimeline ? `Timeline: ${cleanTimeline}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        activities: [
          {
            activityId: crypto.randomUUID(),
            type: "note",
            note: `Lead captured from ${cleanSource}.`,
            actor: "system",
            createdAt: now,
          },
        ],
        lastActivityAt: now,
      });
      localSaved = true;
    } catch (localError: unknown) {
      console.error("Local contact persistence failed after HRMS sync:", getErrorMessage(localError));
    }

    if (!hrmsSynced && !localSaved) {
      return NextResponse.json({ message: "Failed to submit form. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Thank you. We'll get back to you shortly." }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/contact error:", getErrorMessage(error));
    return NextResponse.json({ message: "Failed to submit form. Please try again later." }, { status: 500 });
  }
}

// PATCH - update status
export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, status } = body as {
      id?: string;
      status?: "new" | "in-progress" | "closed";
    };

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    if (!status || !["new", "in-progress", "closed"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const updated = await ContactSubmission.findByIdAndUpdate(id, { status }, { new: true }).lean();

    if (!updated) {
      return NextResponse.json({ message: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("PATCH /api/contact error:", getErrorMessage(error));
    return NextResponse.json({ message: "Failed to update status" }, { status: 500 });
  }
}
