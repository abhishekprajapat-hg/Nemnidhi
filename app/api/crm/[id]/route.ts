import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import { CrmLead, LeadActivityType, LeadPriority, LeadStatus, LeadTaskStatus } from "@/models/CrmLead";
import { isAdminAuthorizedRequest } from "@/lib/adminAuth";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

type NewTaskPayload = {
  title?: string;
  dueDate?: string;
  priority?: LeadPriority;
};

type UpdateTaskPayload = {
  taskId?: string;
  title?: string;
  dueDate?: string | null;
  priority?: LeadPriority;
  status?: LeadTaskStatus;
};

type NewActivityPayload = {
  type?: LeadActivityType;
  note?: string;
  actor?: string;
};

type TagOperationPayload = {
  action?: "add" | "remove" | "set";
  tags?: string[] | string;
};

type UpdateLeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  requirement?: string;
  source?: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  value?: number | string | null;
  nextFollowUp?: string | null;
  expectedCloseDate?: string | null;
  notes?: string;
  assignee?: string;
  lastContactedAt?: string | null;
  score?: number | string;
  tags?: string[] | string;
  tagOperation?: TagOperationPayload;
  closeReason?: string | null;
  archived?: boolean;
  addTask?: NewTaskPayload;
  updateTask?: UpdateTaskPayload;
  deleteTaskId?: string;
  addActivity?: NewActivityPayload;
};

function toOptionalString(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function toOptionalDate(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string") return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

function toOptionalPositiveNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num) || num < 0) return undefined;
  return num;
}

const VALID_LEAD_STATUSES: LeadStatus[] = ["new", "qualified", "proposal", "won", "lost"];

function normalizeStatus(value: unknown) {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  if (VALID_LEAD_STATUSES.includes(normalized as LeadStatus)) return normalized as LeadStatus;

  if (normalized === "in-progress" || normalized === "in progress" || normalized === "contacted") return "qualified";
  if (normalized === "closed" || normalized === "completed" || normalized === "converted") return "won";
  if (normalized === "cancelled" || normalized === "canceled" || normalized === "rejected") return "lost";

  return undefined;
}

function normalizePriority(value: unknown) {
  if (value === "low" || value === "medium" || value === "high") return value;
  return undefined;
}

function normalizeTaskStatus(value: unknown) {
  if (value === "todo" || value === "done") return value;
  return undefined;
}

function normalizeActivityType(value: unknown): LeadActivityType {
  if (value === "call" || value === "email" || value === "meeting" || value === "whatsapp" || value === "status-change" || value === "task") {
    return value;
  }
  return "note";
}

function normalizeScore(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return undefined;
  return Math.min(100, Math.max(0, Math.round(num)));
}

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) {
    return [...new Set(value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean))].slice(0, 30);
  }

  if (typeof value === "string") {
    return [
      ...new Set(
        value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      ),
    ].slice(0, 30);
  }

  return [];
}

function sanitizeStageHistory(
  entries: unknown
): Array<{
  from: LeadStatus;
  to: LeadStatus;
  changedAt: Date;
  actor?: string;
}> {
  if (!Array.isArray(entries)) return [];

  return entries.reduce<Array<{ from: LeadStatus; to: LeadStatus; changedAt: Date; actor?: string }>>((acc, item) => {
    if (!item || typeof item !== "object") return acc;

    const from = normalizeStatus((item as { from?: unknown }).from);
    const to = normalizeStatus((item as { to?: unknown }).to);
    if (!from || !to) return acc;

    const rawDate = (item as { changedAt?: unknown }).changedAt;
    const parsedDate =
      rawDate instanceof Date ? rawDate : typeof rawDate === "string" || typeof rawDate === "number" ? new Date(rawDate) : new Date();
    const changedAt = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

    const actorRaw = (item as { actor?: unknown }).actor;
    const actor = typeof actorRaw === "string" && actorRaw.trim() ? actorRaw.trim() : undefined;

    acc.push({ from, to, changedAt, actor });
    return acc;
  }, []);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const isAuthorized = await isAdminAuthorizedRequest(req);
    if (!isAuthorized) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await Promise.resolve(context.params);
    const body = (await req.json()) as UpdateLeadBody;

    await dbConnect();
    const lead = await CrmLead.findById(id);
    if (!lead) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    lead.stageHistory = sanitizeStageHistory(lead.stageHistory) as typeof lead.stageHistory;

    let hasActivityUpdate = false;
    const now = new Date();

    if ("name" in body) {
      const name = toOptionalString(body.name);
      if (!name) {
        return NextResponse.json({ message: "Lead name is required." }, { status: 400 });
      }
      lead.name = name;
    }
    if ("email" in body) lead.email = toOptionalString(body.email);
    if ("phone" in body) lead.phone = toOptionalString(body.phone);
    if ("company" in body) lead.company = toOptionalString(body.company);
    if ("requirement" in body) lead.requirement = toOptionalString(body.requirement);
    if ("source" in body) lead.source = toOptionalString(body.source);
    if ("notes" in body) lead.notes = toOptionalString(body.notes);
    if ("assignee" in body) lead.assignee = toOptionalString(body.assignee);

    if ("priority" in body) {
      const priority = normalizePriority(body.priority);
      if (!priority) return NextResponse.json({ message: "Invalid priority." }, { status: 400 });
      lead.priority = priority;
    }

    if ("status" in body) {
      const status = normalizeStatus(body.status);
      if (!status) return NextResponse.json({ message: "Invalid status." }, { status: 400 });

      const currentStatus = normalizeStatus(lead.status) || "new";
      if (currentStatus !== status) {
        lead.stageHistory.push({
          from: currentStatus,
          to: status,
          changedAt: now,
          actor: "admin",
        });
        lead.activities.push({
          activityId: crypto.randomUUID(),
          type: "status-change",
          note: `Stage moved from ${currentStatus} to ${status}`,
          actor: "admin",
          createdAt: now,
        });
        hasActivityUpdate = true;
      }

      lead.status = status;
    }

    if ("value" in body) {
      const value = toOptionalPositiveNumber(body.value);
      if (value === undefined) return NextResponse.json({ message: "Invalid value." }, { status: 400 });
      lead.value = value ?? undefined;
    }

    if ("nextFollowUp" in body) {
      const nextFollowUp = toOptionalDate(body.nextFollowUp);
      if (nextFollowUp === undefined) return NextResponse.json({ message: "Invalid follow-up date." }, { status: 400 });
      lead.nextFollowUp = nextFollowUp ?? undefined;
    }

    if ("expectedCloseDate" in body) {
      const expectedCloseDate = toOptionalDate(body.expectedCloseDate);
      if (expectedCloseDate === undefined) {
        return NextResponse.json({ message: "Invalid expected close date." }, { status: 400 });
      }
      lead.expectedCloseDate = expectedCloseDate ?? undefined;
    }

    if ("lastContactedAt" in body) {
      const lastContactedAt = toOptionalDate(body.lastContactedAt);
      if (lastContactedAt === undefined) {
        return NextResponse.json({ message: "Invalid last-contacted date." }, { status: 400 });
      }
      lead.lastContactedAt = lastContactedAt ?? undefined;
    }

    if ("score" in body) {
      const score = normalizeScore(body.score);
      if (score === undefined) return NextResponse.json({ message: "Invalid lead score." }, { status: 400 });
      lead.score = score;
    }

    if ("closeReason" in body) {
      lead.closeReason = toOptionalString(body.closeReason) || undefined;
    }

    if ("archived" in body && typeof body.archived === "boolean") {
      lead.archived = body.archived;
    }

    if ("tags" in body) {
      lead.tags = normalizeTags(body.tags);
    }

    if (body.tagOperation && body.tagOperation.action) {
      const operation = body.tagOperation.action;
      const tags = normalizeTags(body.tagOperation.tags);
      if (operation === "set") {
        lead.tags = tags;
      } else if (operation === "add") {
        lead.tags = [...new Set([...(lead.tags || []), ...tags])].slice(0, 30);
      } else if (operation === "remove") {
        const removeSet = new Set(tags);
        lead.tags = (lead.tags || []).filter((tag) => !removeSet.has(tag));
      }
    }

    if (body.addTask && typeof body.addTask.title === "string" && body.addTask.title.trim()) {
      const taskDueDate = toOptionalDate(body.addTask.dueDate);
      if (taskDueDate === undefined) {
        return NextResponse.json({ message: "Invalid task due date." }, { status: 400 });
      }

      const taskPriority = normalizePriority(body.addTask.priority) || "medium";
      lead.tasks.push({
        taskId: crypto.randomUUID(),
        title: body.addTask.title.trim(),
        dueDate: taskDueDate ?? undefined,
        priority: taskPriority,
        status: "todo",
        createdAt: now,
      });

      lead.activities.push({
        activityId: crypto.randomUUID(),
        type: "task",
        note: `Task added: ${body.addTask.title.trim()}`,
        actor: "admin",
        createdAt: now,
      });
      hasActivityUpdate = true;
    }

    if (body.updateTask && body.updateTask.taskId) {
      const task = lead.tasks.find((item) => item.taskId === body.updateTask?.taskId);
      if (!task) {
        return NextResponse.json({ message: "Task not found on this lead." }, { status: 404 });
      }

      if ("title" in body.updateTask && typeof body.updateTask.title === "string" && body.updateTask.title.trim()) {
        task.title = body.updateTask.title.trim();
      }

      if ("dueDate" in body.updateTask) {
        const dueDate = toOptionalDate(body.updateTask.dueDate);
        if (dueDate === undefined) return NextResponse.json({ message: "Invalid task due date." }, { status: 400 });
        task.dueDate = dueDate ?? undefined;
      }

      if ("priority" in body.updateTask) {
        const priority = normalizePriority(body.updateTask.priority);
        if (!priority) return NextResponse.json({ message: "Invalid task priority." }, { status: 400 });
        task.priority = priority;
      }

      if ("status" in body.updateTask) {
        const status = normalizeTaskStatus(body.updateTask.status);
        if (!status) return NextResponse.json({ message: "Invalid task status." }, { status: 400 });
        if (task.status !== status) {
          task.status = status;
          task.completedAt = status === "done" ? now : undefined;
          lead.activities.push({
            activityId: crypto.randomUUID(),
            type: "task",
            note: `Task "${task.title}" marked ${status}`,
            actor: "admin",
            createdAt: now,
          });
          hasActivityUpdate = true;
        }
      }
    }

    if (body.deleteTaskId) {
      const before = lead.tasks.length;
      lead.tasks = lead.tasks.filter((task) => task.taskId !== body.deleteTaskId);
      if (lead.tasks.length !== before) {
        lead.activities.push({
          activityId: crypto.randomUUID(),
          type: "task",
          note: "Task removed from this lead",
          actor: "admin",
          createdAt: now,
        });
        hasActivityUpdate = true;
      }
    }

    if (body.addActivity) {
      const note = toOptionalString(body.addActivity.note);
      if (!note) {
        return NextResponse.json({ message: "Activity note is required." }, { status: 400 });
      }

      lead.activities.push({
        activityId: crypto.randomUUID(),
        type: normalizeActivityType(body.addActivity.type),
        note,
        actor: toOptionalString(body.addActivity.actor) || "admin",
        createdAt: now,
      });
      hasActivityUpdate = true;
    }

    if (hasActivityUpdate) {
      lead.lastActivityAt = now;
    }

    await lead.save();
    return NextResponse.json(lead.toObject());
  } catch (error: unknown) {
    console.error("PATCH /api/crm/[id] error:", getErrorMessage(error));
    return NextResponse.json({ message: "Failed to update CRM lead." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const isAuthorized = await isAdminAuthorizedRequest(req);
    if (!isAuthorized) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await Promise.resolve(context.params);
    await dbConnect();
    const deleted = await CrmLead.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("DELETE /api/crm/[id] error:", getErrorMessage(error));
    return NextResponse.json({ message: "Failed to delete CRM lead." }, { status: 500 });
  }
}
