import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { CrmLead, LeadPriority, LeadStatus } from "@/models/CrmLead";
import { isAdminAuthorizedRequest } from "@/lib/adminAuth";
import crypto from "crypto";

type CreateLeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  requirement?: string;
  source?: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  value?: number | string;
  nextFollowUp?: string;
  expectedCloseDate?: string;
  notes?: string;
  assignee?: string;
  score?: number | string;
  tags?: string[] | string;
  closeReason?: string;
  archived?: boolean;
  initialActivity?: string;
  tasks?: Array<{
    title?: string;
    dueDate?: string;
    priority?: LeadPriority;
  }>;
};

function toOptionalString(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function toOptionalDate(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function toOptionalPositiveNumber(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num) || num < 0) return undefined;
  return num;
}

function normalizeStatus(value: unknown): LeadStatus {
  if (value === "qualified" || value === "proposal" || value === "won" || value === "lost") {
    return value;
  }
  return "new";
}

function normalizePriority(value: unknown): LeadPriority {
  if (value === "low" || value === "high") return value;
  return "medium";
}

function toNormalizedScore(value: unknown) {
  if (value === undefined || value === null || value === "") return 50;
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 50;
  return Math.min(100, Math.max(0, Math.round(numeric)));
}

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) {
    return [...new Set(value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean))].slice(0, 20);
  }

  if (typeof value === "string") {
    return [
      ...new Set(
        value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      ),
    ].slice(0, 20);
  }

  return [];
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function GET(req: Request) {
  try {
    const isAuthorized = await isAdminAuthorizedRequest(req);
    if (!isAuthorized) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const url = new URL(req.url);
    const includeArchived = url.searchParams.get("includeArchived") === "true";
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");
    const assignee = url.searchParams.get("assignee");
    const q = url.searchParams.get("q")?.trim();

    const query: Record<string, unknown> = {};

    if (!includeArchived) {
      query.archived = { $ne: true };
    }

    if (status && ["new", "qualified", "proposal", "won", "lost"].includes(status)) {
      query.status = status;
    }

    if (priority && ["low", "medium", "high"].includes(priority)) {
      query.priority = priority;
    }

    if (assignee) {
      query.assignee = assignee;
    }

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { requirement: { $regex: q, $options: "i" } },
        { source: { $regex: q, $options: "i" } },
        { notes: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
      ];
    }

    const leads = await CrmLead.find(query).sort({ updatedAt: -1 }).lean();
    return NextResponse.json(leads);
  } catch (error: unknown) {
    console.error("GET /api/crm error:", getErrorMessage(error));
    return NextResponse.json({ message: "Failed to fetch CRM leads." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuthorized = await isAdminAuthorizedRequest(req);
    if (!isAuthorized) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as CreateLeadBody;
    const name = toOptionalString(body.name);
    if (!name) {
      return NextResponse.json({ message: "Lead name is required." }, { status: 400 });
    }

    await dbConnect();

    const status = normalizeStatus(body.status);
    const requirement = toOptionalString(body.requirement);
    const notes = toOptionalString(body.notes);
    const initialActivity = toOptionalString(body.initialActivity);
    const activities: Array<{
      activityId: string;
      type: "note";
      note: string;
      actor: string;
      createdAt: Date;
    }> = [];

    const now = new Date();

    if (requirement) {
      activities.push({
        activityId: crypto.randomUUID(),
        type: "note",
        note: `Requirement captured: ${requirement}`,
        actor: "admin",
        createdAt: now,
      });
    }

    if (initialActivity) {
      activities.push({
        activityId: crypto.randomUUID(),
        type: "note",
        note: initialActivity,
        actor: "admin",
        createdAt: now,
      });
    }

    const tasks = (body.tasks || [])
      .filter((task) => typeof task?.title === "string" && task.title.trim())
      .slice(0, 30)
      .map((task) => ({
        taskId: crypto.randomUUID(),
        title: (task.title || "").trim(),
        dueDate: toOptionalDate(task.dueDate),
        priority: normalizePriority(task.priority),
        status: "todo" as const,
        createdAt: now,
      }));

    const lead = await CrmLead.create({
      name,
      email: toOptionalString(body.email),
      phone: toOptionalString(body.phone),
      company: toOptionalString(body.company),
      requirement,
      source: toOptionalString(body.source),
      status,
      priority: normalizePriority(body.priority),
      value: toOptionalPositiveNumber(body.value),
      nextFollowUp: toOptionalDate(body.nextFollowUp),
      expectedCloseDate: toOptionalDate(body.expectedCloseDate),
      score: toNormalizedScore(body.score),
      tags: normalizeTags(body.tags),
      notes,
      assignee: toOptionalString(body.assignee),
      closeReason: toOptionalString(body.closeReason),
      archived: Boolean(body.archived),
      stageHistory:
        status === "new"
          ? []
          : [
              {
                from: "new",
                to: status,
                changedAt: now,
                actor: "admin",
              },
            ],
      activities,
      tasks,
      lastActivityAt: activities.length > 0 ? now : undefined,
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/crm error:", getErrorMessage(error));
    return NextResponse.json({ message: "Failed to create CRM lead." }, { status: 500 });
  }
}
