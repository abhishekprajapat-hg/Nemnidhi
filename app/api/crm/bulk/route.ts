import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import { CrmLead, LeadPriority, LeadStatus } from "@/models/CrmLead";
import { isAdminAuthorizedRequest } from "@/lib/adminAuth";

type BulkAction = "status" | "priority" | "assignee" | "archive" | "delete" | "add-tags" | "remove-tags" | "score";

type BulkBody = {
  ids?: string[];
  action?: BulkAction;
  value?: string | number | boolean | null;
  tags?: string[] | string;
};

const VALID_LEAD_STATUSES: LeadStatus[] = ["new", "qualified", "proposal", "won", "lost"];

function normalizeStatus(value: unknown): LeadStatus | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (VALID_LEAD_STATUSES.includes(normalized as LeadStatus)) return normalized as LeadStatus;

  if (normalized === "in-progress" || normalized === "in progress" || normalized === "contacted") return "qualified";
  if (normalized === "closed" || normalized === "completed" || normalized === "converted") return "won";
  if (normalized === "cancelled" || normalized === "canceled" || normalized === "rejected") return "lost";

  return null;
}

function normalizePriority(value: unknown): LeadPriority | null {
  if (value === "low" || value === "medium" || value === "high") return value;
  return null;
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

function normalizeScore(value: unknown) {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return null;
  return Math.min(100, Math.max(0, Math.round(numberValue)));
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

export async function PATCH(req: Request) {
  try {
    const isAuthorized = await isAdminAuthorizedRequest(req);
    if (!isAuthorized) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as BulkBody;
    const ids = Array.isArray(body.ids)
      ? body.ids.filter((id): id is string => typeof id === "string" && id.trim().length > 0)
      : [];
    const action = body.action;

    if (!ids.length) {
      return NextResponse.json({ message: "At least one lead id is required." }, { status: 400 });
    }

    if (!action) {
      return NextResponse.json({ message: "Bulk action is required." }, { status: 400 });
    }

    await dbConnect();
    const now = new Date();

    if (action === "delete") {
      const result = await CrmLead.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({ success: true, updatedCount: result.deletedCount || 0 });
    }

    if (action === "status") {
      const status = normalizeStatus(body.value);
      if (!status) return NextResponse.json({ message: "Invalid status." }, { status: 400 });

      const leads = await CrmLead.find({ _id: { $in: ids } });
      let updatedCount = 0;

      for (const lead of leads) {
        lead.stageHistory = sanitizeStageHistory(lead.stageHistory) as typeof lead.stageHistory;

        const currentStatus = normalizeStatus(lead.status) || "new";
        const stageChanged = currentStatus !== status;
        const needsPersist = lead.status !== status;

        if (!stageChanged && !needsPersist) continue;

        if (stageChanged) {
          lead.stageHistory.push({
            from: currentStatus,
            to: status,
            changedAt: now,
            actor: "admin",
          });
          lead.activities.push({
            activityId: crypto.randomUUID(),
            type: "status-change",
            note: `Bulk stage move from ${currentStatus} to ${status}`,
            actor: "admin",
            createdAt: now,
          });
          lead.lastActivityAt = now;
        }

        lead.status = status;
        await lead.save();
        updatedCount += 1;
      }

      return NextResponse.json({ success: true, updatedCount });
    }

    if (action === "priority") {
      const priority = normalizePriority(body.value);
      if (!priority) return NextResponse.json({ message: "Invalid priority." }, { status: 400 });

      const result = await CrmLead.updateMany({ _id: { $in: ids } }, { $set: { priority } });
      return NextResponse.json({ success: true, updatedCount: result.modifiedCount || 0 });
    }

    if (action === "assignee") {
      const assignee = typeof body.value === "string" ? body.value.trim() : "";
      const result = await CrmLead.updateMany({ _id: { $in: ids } }, { $set: { assignee: assignee || undefined } });
      return NextResponse.json({ success: true, updatedCount: result.modifiedCount || 0 });
    }

    if (action === "archive") {
      if (typeof body.value !== "boolean") {
        return NextResponse.json({ message: "Archive value must be true or false." }, { status: 400 });
      }
      const result = await CrmLead.updateMany({ _id: { $in: ids } }, { $set: { archived: body.value } });
      return NextResponse.json({ success: true, updatedCount: result.modifiedCount || 0 });
    }

    if (action === "add-tags" || action === "remove-tags") {
      const tags = normalizeTags(body.tags ?? body.value);
      if (!tags.length) {
        return NextResponse.json({ message: "At least one valid tag is required." }, { status: 400 });
      }

      const leads = await CrmLead.find({ _id: { $in: ids } });
      let updatedCount = 0;

      for (const lead of leads) {
        const current = new Set(lead.tags || []);
        if (action === "add-tags") {
          for (const tag of tags) current.add(tag);
        } else {
          for (const tag of tags) current.delete(tag);
        }
        lead.tags = [...current].slice(0, 30);
        await lead.save();
        updatedCount += 1;
      }

      return NextResponse.json({ success: true, updatedCount });
    }

    if (action === "score") {
      const score = normalizeScore(body.value);
      if (score === null) return NextResponse.json({ message: "Invalid score." }, { status: 400 });

      const result = await CrmLead.updateMany({ _id: { $in: ids } }, { $set: { score } });
      return NextResponse.json({ success: true, updatedCount: result.modifiedCount || 0 });
    }

    return NextResponse.json({ message: "Unsupported bulk action." }, { status: 400 });
  } catch (error: unknown) {
    console.error("PATCH /api/crm/bulk error:", getErrorMessage(error));
    return NextResponse.json({ message: "Failed to apply bulk action." }, { status: 500 });
  }
}
