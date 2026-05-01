"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type LeadStatus = "new" | "qualified" | "proposal" | "won" | "lost";
type LeadPriority = "low" | "medium" | "high";
type LeadTaskStatus = "todo" | "done";
type LeadActivityType = "note" | "call" | "email" | "meeting" | "whatsapp" | "status-change" | "task";

type LeadTask = {
  taskId: string;
  title: string;
  dueDate?: string;
  priority: LeadPriority;
  status: LeadTaskStatus;
  createdAt?: string;
  completedAt?: string;
};

type LeadActivity = {
  activityId: string;
  type: LeadActivityType;
  note: string;
  actor?: string;
  createdAt: string;
};

type StageHistory = {
  from: LeadStatus;
  to: LeadStatus;
  changedAt: string;
  actor?: string;
};

type CrmLead = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  requirement?: string;
  source?: string;
  status: LeadStatus;
  priority: LeadPriority;
  value?: number;
  nextFollowUp?: string;
  expectedCloseDate?: string;
  score: number;
  tags: string[];
  notes?: string;
  assignee?: string;
  lastContactedAt?: string;
  lastActivityAt?: string;
  stageHistory: StageHistory[];
  activities: LeadActivity[];
  tasks: LeadTask[];
  archived: boolean;
  closeReason?: string;
  createdAt?: string;
  updatedAt?: string;
};

type CreateLeadForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  requirement: string;
  source: string;
  assignee: string;
  value: string;
  priority: LeadPriority;
  score: string;
  nextFollowUp: string;
  expectedCloseDate: string;
  tags: string;
  initialActivity: string;
};

type LeadEditor = {
  name: string;
  email: string;
  phone: string;
  company: string;
  requirement: string;
  source: string;
  assignee: string;
  status: LeadStatus;
  priority: LeadPriority;
  value: string;
  score: string;
  nextFollowUp: string;
  expectedCloseDate: string;
  notes: string;
  closeReason: string;
};

type SortKey = "updated-desc" | "value-desc" | "score-desc" | "followup-asc" | "created-desc" | "close-asc";
type BulkAction = "status" | "priority" | "assignee" | "add-tags" | "remove-tags" | "archive" | "unarchive" | "score" | "delete";

const STATUS_ORDER: LeadStatus[] = ["new", "qualified", "proposal", "won", "lost"];

const STATUS_META: Record<
  LeadStatus,
  {
    label: string;
    pill: string;
  }
> = {
  new: {
    label: "New",
    pill: "border-sky-400/50 bg-sky-500/10 text-sky-200",
  },
  qualified: {
    label: "Qualified",
    pill: "border-indigo-400/50 bg-indigo-500/10 text-indigo-200",
  },
  proposal: {
    label: "Proposal",
    pill: "border-amber-400/50 bg-amber-500/10 text-amber-200",
  },
  won: {
    label: "Won",
    pill: "border-emerald-400/50 bg-emerald-500/10 text-emerald-200",
  },
  lost: {
    label: "Lost",
    pill: "border-rose-400/50 bg-rose-500/10 text-rose-200",
  },
};

const EMPTY_CREATE_FORM: CreateLeadForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  requirement: "",
  source: "",
  assignee: "",
  value: "",
  priority: "medium",
  score: "50",
  nextFollowUp: "",
  expectedCloseDate: "",
  tags: "",
  initialActivity: "",
};

function normalizeTags(tags: string) {
  return [
    ...new Set(
      tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    ),
  ].slice(0, 30);
}

function formatDate(iso?: string) {
  if (!iso) return "Not set";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Not set";
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDateShort(iso?: string) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function toDateInputValue(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function mapLeadToEditor(lead: CrmLead): LeadEditor {
  return {
    name: lead.name || "",
    email: lead.email || "",
    phone: lead.phone || "",
    company: lead.company || "",
    requirement: lead.requirement || "",
    source: lead.source || "",
    assignee: lead.assignee || "",
    status: lead.status || "new",
    priority: lead.priority || "medium",
    value: lead.value !== undefined ? String(lead.value) : "",
    score: String(lead.score ?? 50),
    nextFollowUp: toDateInputValue(lead.nextFollowUp),
    expectedCloseDate: toDateInputValue(lead.expectedCloseDate),
    notes: lead.notes || "",
    closeReason: lead.closeReason || "",
  };
}

function isActiveStatus(status: LeadStatus) {
  return status !== "won" && status !== "lost";
}

function isOverdue(iso?: string) {
  if (!iso) return false;
  const date = new Date(iso);
  return !Number.isNaN(date.getTime()) && date.getTime() < Date.now();
}

function isTaskDueToday(iso?: string) {
  if (!iso) return false;
  const due = new Date(iso);
  if (Number.isNaN(due.getTime())) return false;
  const now = new Date();
  return due.getFullYear() === now.getFullYear() && due.getMonth() === now.getMonth() && due.getDate() === now.getDate();
}

function toCurrency(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export default function AdminCrmPage() {
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | LeadPriority>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<"all" | "unassigned" | string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("updated-desc");
  const [showArchived, setShowArchived] = useState(false);
  const [onlyOverdue, setOnlyOverdue] = useState(false);
  const [hotOnly, setHotOnly] = useState(false);
  const [noOwnerOnly, setNoOwnerOnly] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editor, setEditor] = useState<LeadEditor | null>(null);
  const [tagInput, setTagInput] = useState("");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<BulkAction>("status");
  const [bulkValue, setBulkValue] = useState<LeadStatus | LeadPriority | string>("qualified");
  const [bulkTags, setBulkTags] = useState("");
  const [applyingBulk, setApplyingBulk] = useState(false);

  const [createForm, setCreateForm] = useState<CreateLeadForm>(EMPTY_CREATE_FORM);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [activityType, setActivityType] = useState<LeadActivityType>("note");
  const [activityNote, setActivityNote] = useState("");
  const [addingActivity, setAddingActivity] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState<LeadPriority>("medium");
  const [addingTask, setAddingTask] = useState(false);

  const setFlashError = (message: string) => {
    setNotice(null);
    setError(message);
  };

  const setFlashNotice = (message: string) => {
    setError(null);
    setNotice(message);
  };

  const clearFlash = () => {
    setError(null);
    setNotice(null);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (logoutError) {
      console.error("Logout failed", logoutError);
    }
  };

  const upsertLead = (updated: CrmLead) => {
    setLeads((prev) => prev.map((lead) => (lead._id === updated._id ? updated : lead)));
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (showArchived) params.set("includeArchived", "true");

      const response = await fetch(`/api/crm${params.toString() ? `?${params.toString()}` : ""}`);
      const contentType = response.headers.get("content-type") || "";
      let data: unknown = null;
      if (contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        const message =
          data && typeof data === "object" && "message" in data && typeof data.message === "string"
            ? data.message
            : "Failed to load CRM leads.";
        throw new Error(message);
      }

      const list = Array.isArray(data) ? (data as CrmLead[]) : [];
      setLeads(list);

      setSelectedIds((prev) => prev.filter((id) => list.some((lead) => lead._id === id)));

      if (!selectedId && list.length > 0) {
        setSelectedId(list[0]._id);
      } else if (selectedId) {
        const stillExists = list.some((lead) => lead._id === selectedId);
        if (!stillExists) {
          setSelectedId(list[0]?._id || null);
        }
      }
    } catch (fetchError: unknown) {
      setFlashError(fetchError instanceof Error ? fetchError.message : "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showArchived]);

  useEffect(() => {
    if (bulkAction === "status") {
      setBulkValue((prev) =>
        prev === "new" || prev === "qualified" || prev === "proposal" || prev === "won" || prev === "lost"
          ? prev
          : "qualified"
      );
      return;
    }

    if (bulkAction === "priority") {
      setBulkValue((prev) => (prev === "low" || prev === "medium" || prev === "high" ? prev : "medium"));
      return;
    }

    if (bulkAction === "score") {
      setBulkValue((prev) => (typeof prev === "string" && prev.trim() ? prev : "50"));
      return;
    }

    if (bulkAction === "assignee") {
      setBulkValue("");
    }
  }, [bulkAction]);

  const assigneeOptions = useMemo(() => {
    return [...new Set(leads.map((lead) => lead.assignee || "").filter(Boolean))].sort();
  }, [leads]);

  const filteredLeads = useMemo(() => {
    let list = [...leads];

    list = list.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (priorityFilter !== "all" && lead.priority !== priorityFilter) return false;
      if (assigneeFilter === "unassigned" && lead.assignee) return false;
      if (assigneeFilter !== "all" && assigneeFilter !== "unassigned" && (lead.assignee || "") !== assigneeFilter) {
        return false;
      }
      if (onlyOverdue && !isOverdue(lead.nextFollowUp)) return false;
      if (hotOnly && (lead.score || 0) < 75) return false;
      if (noOwnerOnly && lead.assignee) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      const haystack = [
        lead.name,
        lead.company,
        lead.email,
        lead.phone,
        lead.requirement,
        lead.notes,
        lead.source,
        lead.assignee,
        ...(lead.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    list.sort((a, b) => {
      if (sortBy === "value-desc") return (b.value || 0) - (a.value || 0);
      if (sortBy === "score-desc") return (b.score || 0) - (a.score || 0);
      if (sortBy === "followup-asc") {
        const aDate = a.nextFollowUp ? new Date(a.nextFollowUp).getTime() : Number.POSITIVE_INFINITY;
        const bDate = b.nextFollowUp ? new Date(b.nextFollowUp).getTime() : Number.POSITIVE_INFINITY;
        return aDate - bDate;
      }
      if (sortBy === "created-desc") {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate;
      }
      if (sortBy === "close-asc") {
        const aDate = a.expectedCloseDate ? new Date(a.expectedCloseDate).getTime() : Number.POSITIVE_INFINITY;
        const bDate = b.expectedCloseDate ? new Date(b.expectedCloseDate).getTime() : Number.POSITIVE_INFINITY;
        return aDate - bDate;
      }

      const aUpdated = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bUpdated = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bUpdated - aUpdated;
    });

    return list;
  }, [
    leads,
    statusFilter,
    priorityFilter,
    assigneeFilter,
    onlyOverdue,
    hotOnly,
    noOwnerOnly,
    search,
    sortBy,
  ]);

  const groupedLeads = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      status,
      items: filteredLeads.filter((lead) => lead.status === status),
    }));
  }, [filteredLeads]);

  const selectedLead = useMemo(
    () => leads.find((lead) => lead._id === selectedId) || null,
    [leads, selectedId]
  );

  useEffect(() => {
    if (!selectedLead) {
      setEditor(null);
      setTagInput("");
      return;
    }
    setEditor(mapLeadToEditor(selectedLead));
    setTagInput("");
  }, [selectedLead]);

  const totalLeads = leads.length;
  const activeLeads = leads.filter((lead) => isActiveStatus(lead.status) && !lead.archived).length;
  const wonLeads = leads.filter((lead) => lead.status === "won").length;
  const lostLeads = leads.filter((lead) => lead.status === "lost").length;
  const winRate = wonLeads + lostLeads > 0 ? Math.round((wonLeads / (wonLeads + lostLeads)) * 100) : 0;
  const pipelineValue = leads.reduce((sum, lead) => {
    if (!isActiveStatus(lead.status) || lead.archived) return sum;
    return sum + (lead.value || 0);
  }, 0);
  const wonValueTotal = leads
    .filter((lead) => lead.status === "won")
    .reduce((sum, lead) => sum + (lead.value || 0), 0);
  const avgWonDeal = wonLeads > 0 ? Math.round(wonValueTotal / wonLeads) : 0;
  const overdueFollowUps = leads.filter((lead) => isActiveStatus(lead.status) && !lead.archived && isOverdue(lead.nextFollowUp)).length;
  const pendingTasks = leads.reduce(
    (sum, lead) => sum + (lead.tasks || []).filter((task) => task.status === "todo").length,
    0
  );
  const dueTodayTasks = leads.reduce(
    (sum, lead) =>
      sum + (lead.tasks || []).filter((task) => task.status === "todo" && isTaskDueToday(task.dueDate)).length,
    0
  );
  const avgScore =
    leads.length > 0
      ? Math.round(leads.reduce((sum, lead) => sum + (lead.score || 0), 0) / leads.length)
      : 0;
  const avgCloseDays = (() => {
    const wonWithDates = leads.filter((lead) => lead.status === "won" && lead.createdAt && lead.updatedAt);
    if (!wonWithDates.length) return 0;
    const totalDays = wonWithDates.reduce((sum, lead) => {
      const created = new Date(lead.createdAt || "");
      const closed = new Date(lead.updatedAt || "");
      if (Number.isNaN(created.getTime()) || Number.isNaN(closed.getTime())) return sum;
      const days = Math.max(1, Math.round((closed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)));
      return sum + days;
    }, 0);
    return Math.round(totalDays / wonWithDates.length);
  })();

  const selectedLeadTasks = selectedLead?.tasks || [];
  const selectedLeadActivities = selectedLead?.activities || [];
  const selectedLeadStageHistory = selectedLead?.stageHistory || [];

  const patchLead = async (leadId: string, payload: Record<string, unknown>, successMessage?: string) => {
    const response = await fetch(`/api/crm/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await response.json() : null;

    if (!response.ok) {
      const message = data && typeof data.message === "string" ? data.message : "Failed to update lead.";
      throw new Error(message);
    }

    const updated = data as CrmLead;
    upsertLead(updated);
    if (successMessage) setFlashNotice(successMessage);
    return updated;
  };

  const handleCreateLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!createForm.name.trim()) {
      setFlashError("Lead name is required.");
      return;
    }

    try {
      setCreating(true);
      clearFlash();

      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: createForm.name,
          email: createForm.email || undefined,
          phone: createForm.phone || undefined,
          company: createForm.company || undefined,
          requirement: createForm.requirement || undefined,
          source: createForm.source || undefined,
          assignee: createForm.assignee || undefined,
          value: createForm.value ? Number(createForm.value) : undefined,
          priority: createForm.priority,
          score: createForm.score ? Number(createForm.score) : 50,
          nextFollowUp: createForm.nextFollowUp || undefined,
          expectedCloseDate: createForm.expectedCloseDate || undefined,
          tags: normalizeTags(createForm.tags),
          initialActivity: createForm.initialActivity || undefined,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok) {
        const message = data && typeof data.message === "string" ? data.message : "Could not create CRM lead.";
        throw new Error(message);
      }

      const created = data as CrmLead;
      setLeads((prev) => [created, ...prev]);
      setSelectedId(created._id);
      setCreateForm(EMPTY_CREATE_FORM);
      setFlashNotice("Lead created and added to pipeline.");
    } catch (createError: unknown) {
      setFlashError(createError instanceof Error ? createError.message : "Failed to create lead.");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveLead = async () => {
    if (!selectedLead || !editor) return;
    if (!editor.name.trim()) {
      setFlashError("Lead name is required.");
      return;
    }

    try {
      setSaving(true);
      clearFlash();
      await patchLead(
        selectedLead._id,
        {
          name: editor.name,
          email: editor.email || "",
          phone: editor.phone || "",
          company: editor.company || "",
          requirement: editor.requirement || "",
          source: editor.source || "",
          assignee: editor.assignee || "",
          status: editor.status,
          priority: editor.priority,
          value: editor.value === "" ? null : Number(editor.value),
          score: editor.score === "" ? 50 : Number(editor.score),
          nextFollowUp: editor.nextFollowUp || null,
          expectedCloseDate: editor.expectedCloseDate || null,
          notes: editor.notes || "",
          closeReason: editor.closeReason || null,
        },
        "Lead details saved."
      );
    } catch (saveError: unknown) {
      setFlashError(saveError instanceof Error ? saveError.message : "Failed to save lead.");
    } finally {
      setSaving(false);
    }
  };

  const handleMarkContacted = async () => {
    if (!selectedLead) return;
    try {
      setSaving(true);
      clearFlash();
      await patchLead(
        selectedLead._id,
        {
          lastContactedAt: new Date().toISOString(),
          addActivity: {
            type: "call",
            note: "Lead marked contacted by admin.",
            actor: "admin",
          },
        },
        "Lead marked as contacted."
      );
    } catch (markError: unknown) {
      setFlashError(markError instanceof Error ? markError.message : "Failed to mark contacted.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!selectedLead) return;
    const confirmed = window.confirm(`Delete lead "${selectedLead.name}"? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      setDeleting(true);
      clearFlash();
      const response = await fetch(`/api/crm/${selectedLead._id}`, { method: "DELETE" });
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok) {
        const message = data && typeof data.message === "string" ? data.message : "Failed to delete lead.";
        throw new Error(message);
      }

      setLeads((prev) => prev.filter((lead) => lead._id !== selectedLead._id));
      setSelectedIds((prev) => prev.filter((id) => id !== selectedLead._id));
      setSelectedId((current) => {
        if (current !== selectedLead._id) return current;
        const remaining = leads.filter((lead) => lead._id !== selectedLead._id);
        return remaining[0]?._id || null;
      });
      setFlashNotice("Lead deleted.");
    } catch (deleteError: unknown) {
      setFlashError(deleteError instanceof Error ? deleteError.message : "Failed to delete lead.");
    } finally {
      setDeleting(false);
    }
  };

  const handleQuickStageMove = async (status: LeadStatus) => {
    if (!selectedLead) return;
    try {
      setSaving(true);
      clearFlash();
      await patchLead(selectedLead._id, { status }, `Lead moved to ${STATUS_META[status].label}.`);
      setEditor((prev) => (prev ? { ...prev, status } : prev));
    } catch (stageError: unknown) {
      setFlashError(stageError instanceof Error ? stageError.message : "Failed to move stage.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = async () => {
    if (!selectedLead || !tagInput.trim()) return;
    try {
      setSaving(true);
      clearFlash();
      await patchLead(
        selectedLead._id,
        {
          tagOperation: {
            action: "add",
            tags: normalizeTags(tagInput),
          },
        },
        "Tag added."
      );
      setTagInput("");
    } catch (tagError: unknown) {
      setFlashError(tagError instanceof Error ? tagError.message : "Failed to add tag.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveTag = async (tag: string) => {
    if (!selectedLead) return;
    try {
      setSaving(true);
      clearFlash();
      await patchLead(
        selectedLead._id,
        {
          tagOperation: {
            action: "remove",
            tags: [tag],
          },
        },
        "Tag removed."
      );
    } catch (tagError: unknown) {
      setFlashError(tagError instanceof Error ? tagError.message : "Failed to remove tag.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddActivity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedLead) return;
    if (!activityNote.trim()) {
      setFlashError("Activity note is required.");
      return;
    }

    try {
      setAddingActivity(true);
      clearFlash();
      await patchLead(
        selectedLead._id,
        {
          addActivity: {
            type: activityType,
            note: activityNote.trim(),
            actor: "admin",
          },
        },
        "Activity logged."
      );
      setActivityNote("");
      setActivityType("note");
    } catch (activityError: unknown) {
      setFlashError(activityError instanceof Error ? activityError.message : "Failed to add activity.");
    } finally {
      setAddingActivity(false);
    }
  };

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedLead) return;
    if (!taskTitle.trim()) {
      setFlashError("Task title is required.");
      return;
    }

    try {
      setAddingTask(true);
      clearFlash();
      await patchLead(
        selectedLead._id,
        {
          addTask: {
            title: taskTitle.trim(),
            dueDate: taskDueDate || undefined,
            priority: taskPriority,
          },
        },
        "Task added."
      );
      setTaskTitle("");
      setTaskDueDate("");
      setTaskPriority("medium");
    } catch (taskError: unknown) {
      setFlashError(taskError instanceof Error ? taskError.message : "Failed to add task.");
    } finally {
      setAddingTask(false);
    }
  };

  const handleToggleTask = async (task: LeadTask) => {
    if (!selectedLead) return;
    try {
      setSaving(true);
      clearFlash();
      await patchLead(
        selectedLead._id,
        {
          updateTask: {
            taskId: task.taskId,
            status: task.status === "todo" ? "done" : "todo",
          },
        },
        "Task updated."
      );
    } catch (taskError: unknown) {
      setFlashError(taskError instanceof Error ? taskError.message : "Failed to update task.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!selectedLead) return;
    try {
      setSaving(true);
      clearFlash();
      await patchLead(selectedLead._id, { deleteTaskId: taskId }, "Task removed.");
    } catch (taskError: unknown) {
      setFlashError(taskError instanceof Error ? taskError.message : "Failed to remove task.");
    } finally {
      setSaving(false);
    }
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedIds((prev) => (prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]));
  };

  const toggleSelectAllFiltered = () => {
    const ids = filteredLeads.map((lead) => lead._id);
    const allSelected = ids.length > 0 && ids.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...ids])]);
    }
  };

  const handleBulkApply = async () => {
    if (!selectedIds.length) {
      setFlashError("Select at least one lead for bulk action.");
      return;
    }

    try {
      setApplyingBulk(true);
      clearFlash();

      const body: Record<string, unknown> = {
        ids: selectedIds,
      };

      if (bulkAction === "archive") {
        body.action = "archive";
        body.value = true;
      } else if (bulkAction === "unarchive") {
        body.action = "archive";
        body.value = false;
      } else if (bulkAction === "add-tags" || bulkAction === "remove-tags") {
        body.action = bulkAction;
        body.tags = normalizeTags(bulkTags);
      } else if (bulkAction === "delete") {
        body.action = "delete";
      } else {
        body.action = bulkAction;
        body.value = bulkValue;
      }

      const response = await fetch("/api/crm/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok) {
        const message = data && typeof data.message === "string" ? data.message : "Failed to apply bulk action.";
        throw new Error(message);
      }

      await fetchLeads();
      setSelectedIds([]);
      setFlashNotice(
        `Bulk action applied on ${data && typeof data.updatedCount === "number" ? data.updatedCount : selectedIds.length} leads.`
      );
    } catch (bulkError: unknown) {
      setFlashError(bulkError instanceof Error ? bulkError.message : "Failed to apply bulk action.");
    } finally {
      setApplyingBulk(false);
    }
  };

  const handleExportCsv = () => {
    const headers = [
      "Name",
      "Company",
      "Email",
      "Phone",
      "Status",
      "Priority",
      "Score",
      "Value",
      "Assignee",
      "NextFollowUp",
      "ExpectedClose",
      "Source",
      "Tags",
      "TasksOpen",
      "CreatedAt",
      "UpdatedAt",
    ];

    const escapeCell = (value: string | number | undefined) => {
      const text = value === undefined ? "" : String(value);
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredLeads.map((lead) =>
      [
        lead.name,
        lead.company,
        lead.email,
        lead.phone,
        STATUS_META[lead.status].label,
        lead.priority,
        lead.score,
        lead.value || 0,
        lead.assignee,
        lead.nextFollowUp ? formatDateShort(lead.nextFollowUp) : "",
        lead.expectedCloseDate ? formatDateShort(lead.expectedCloseDate) : "",
        lead.source,
        (lead.tags || []).join(" | "),
        (lead.tasks || []).filter((task) => task.status === "todo").length,
        lead.createdAt ? formatDate(lead.createdAt) : "",
        lead.updatedAt ? formatDate(lead.updatedAt) : "",
      ]
        .map((cell) => escapeCell(cell as string | number | undefined))
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `crm-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const allFilteredIds = filteredLeads.map((lead) => lead._id);
  const allFilteredSelected =
    allFilteredIds.length > 0 && allFilteredIds.every((leadId) => selectedIds.includes(leadId));

  return (
    <section className="admin-theme-v2 min-h-screen text-zinc-50">
      <Container className="py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">Advanced CRM</p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Revenue operating system</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Full pipeline control with lead scoring, tasks, activity timeline, bulk actions, and conversion insights.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              className="h-8 rounded-full border border-zinc-700 px-3 text-[11px]"
              onClick={fetchLeads}
            >
              Refresh
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-8 rounded-full border border-zinc-700 px-3 text-[11px]"
              onClick={handleExportCsv}
            >
              Export CSV
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-8 rounded-full border border-zinc-700 px-3 text-[11px]"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-4 rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
            {notice}
          </div>
        )}

        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Total leads</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-100">{totalLeads}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Pipeline value</p>
            <p className="mt-1 text-xl font-semibold text-amber-200">{toCurrency(pipelineValue)}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Win rate</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-200">{winRate}%</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Avg won deal</p>
            <p className="mt-1 text-xl font-semibold text-sky-200">{toCurrency(avgWonDeal)}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Avg score</p>
            <p className="mt-1 text-2xl font-semibold text-indigo-200">{avgScore}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Overdue follow-ups</p>
            <p className="mt-1 text-2xl font-semibold text-rose-200">{overdueFollowUps}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Open tasks</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-100">{pendingTasks}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Tasks due today</p>
            <p className="mt-1 text-2xl font-semibold text-amber-200">{dueTodayTasks}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Avg close cycle</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-100">{avgCloseDays || "-"}d</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Active leads</p>
            <p className="mt-1 text-2xl font-semibold text-sky-100">{activeLeads}</p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-zinc-800 bg-black/70 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-100">Quick lead capture</h2>
            <span className="text-[11px] text-zinc-500">Add full context from first touch itself</span>
          </div>
          <form onSubmit={handleCreateLead} className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Lead name *"
              value={createForm.name}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Company"
              value={createForm.company}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, company: event.target.value }))}
            />
            <input
              type="email"
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Email"
              value={createForm.email}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, email: event.target.value }))}
            />
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Phone"
              value={createForm.phone}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, phone: event.target.value }))}
            />
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Owner / assignee"
              value={createForm.assignee}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, assignee: event.target.value }))}
            />
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Lead source"
              value={createForm.source}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, source: event.target.value }))}
            />
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              type="number"
              min={0}
              placeholder="Expected value (INR)"
              value={createForm.value}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, value: event.target.value }))}
            />
            <select
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              value={createForm.priority}
              onChange={(event) =>
                setCreateForm((prev) => ({ ...prev, priority: event.target.value as LeadPriority }))
              }
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              type="number"
              min={0}
              max={100}
              placeholder="Lead score (0-100)"
              value={createForm.score}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, score: event.target.value }))}
            />
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              type="date"
              value={createForm.nextFollowUp}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, nextFollowUp: event.target.value }))}
            />
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              type="date"
              value={createForm.expectedCloseDate}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, expectedCloseDate: event.target.value }))}
            />
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400 xl:col-span-2"
              placeholder="Tags (comma separated)"
              value={createForm.tags}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, tags: event.target.value }))}
            />
            <textarea
              className="xl:col-span-3 min-h-[78px] rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Requirement summary"
              value={createForm.requirement}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, requirement: event.target.value }))}
            />
            <textarea
              className="xl:col-span-2 min-h-[78px] rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
              placeholder="Initial activity log (optional)"
              value={createForm.initialActivity}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, initialActivity: event.target.value }))}
            />
            <Button
              type="submit"
              disabled={creating}
              className="h-[42px] rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-4 text-xs font-semibold text-zinc-950 disabled:opacity-60"
            >
              {creating ? "Creating..." : "Create lead"}
            </Button>
          </form>
        </div>

        <div className="mb-6 rounded-2xl border border-zinc-800 bg-black/65 p-4">
          <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <input
                className="w-full rounded-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] text-zinc-50 outline-none focus:border-amber-400 md:w-[300px]"
                placeholder="Search by name, company, tag, source..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <select
                className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "all" | LeadStatus)}
              >
                <option value="all">All stages</option>
                {STATUS_ORDER.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_META[status].label}
                  </option>
                ))}
              </select>
              <select
                className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value as "all" | LeadPriority)}
              >
                <option value="all">All priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select
                className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                value={assigneeFilter}
                onChange={(event) => setAssigneeFilter(event.target.value as "all" | "unassigned" | string)}
              >
                <option value="all">All owners</option>
                <option value="unassigned">Unassigned</option>
                {assigneeOptions.map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>
              <select
                className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortKey)}
              >
                <option value="updated-desc">Sort: Recently updated</option>
                <option value="created-desc">Sort: Newest created</option>
                <option value="value-desc">Sort: Highest value</option>
                <option value="score-desc">Sort: Highest score</option>
                <option value="followup-asc">Sort: Follow-up due first</option>
                <option value="close-asc">Sort: Close date nearest</option>
              </select>
            </div>
            <p className="text-[11px] text-zinc-500">{filteredLeads.length} leads shown</p>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setOnlyOverdue((prev) => !prev)}
              className={`rounded-full border px-3 py-1 ${onlyOverdue ? "border-rose-400/60 bg-rose-500/15 text-rose-200" : "border-zinc-700 bg-zinc-900/70 text-zinc-300"}`}
            >
              Overdue follow-ups
            </button>
            <button
              type="button"
              onClick={() => setHotOnly((prev) => !prev)}
              className={`rounded-full border px-3 py-1 ${hotOnly ? "border-amber-400/60 bg-amber-500/15 text-amber-200" : "border-zinc-700 bg-zinc-900/70 text-zinc-300"}`}
            >
              Hot leads (score 75+)
            </button>
            <button
              type="button"
              onClick={() => setNoOwnerOnly((prev) => !prev)}
              className={`rounded-full border px-3 py-1 ${noOwnerOnly ? "border-indigo-400/60 bg-indigo-500/15 text-indigo-200" : "border-zinc-700 bg-zinc-900/70 text-zinc-300"}`}
            >
              No owner
            </button>
            <button
              type="button"
              onClick={() => setShowArchived((prev) => !prev)}
              className={`rounded-full border px-3 py-1 ${showArchived ? "border-zinc-500/60 bg-zinc-700/30 text-zinc-100" : "border-zinc-700 bg-zinc-900/70 text-zinc-300"}`}
            >
              {showArchived ? "Viewing archived + active" : "Active only"}
            </button>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleSelectAllFiltered}
                className="rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1 text-[11px] text-zinc-300"
              >
                {allFilteredSelected ? "Unselect all shown" : "Select all shown"}
              </button>
              <span className="text-[11px] text-zinc-500">{selectedIds.length} selected</span>
              <select
                className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                value={bulkAction}
                onChange={(event) => setBulkAction(event.target.value as BulkAction)}
              >
                <option value="status">Bulk: Change stage</option>
                <option value="priority">Bulk: Set priority</option>
                <option value="assignee">Bulk: Set owner</option>
                <option value="score">Bulk: Set score</option>
                <option value="add-tags">Bulk: Add tags</option>
                <option value="remove-tags">Bulk: Remove tags</option>
                <option value="archive">Bulk: Archive</option>
                <option value="unarchive">Bulk: Unarchive</option>
                <option value="delete">Bulk: Delete</option>
              </select>

              {bulkAction === "status" && (
                <select
                  className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                  value={bulkValue}
                  onChange={(event) => setBulkValue(event.target.value as LeadStatus)}
                >
                  {STATUS_ORDER.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_META[status].label}
                    </option>
                  ))}
                </select>
              )}

              {bulkAction === "priority" && (
                <select
                  className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                  value={bulkValue}
                  onChange={(event) => setBulkValue(event.target.value as LeadPriority)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              )}

              {(bulkAction === "assignee" || bulkAction === "score") && (
                <input
                  className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                  placeholder={
                    bulkAction === "score" ? "0-100" : "Owner name"
                  }
                  value={bulkValue}
                  onChange={(event) => setBulkValue(event.target.value)}
                />
              )}

              {(bulkAction === "add-tags" || bulkAction === "remove-tags") && (
                <input
                  className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-[11px] text-zinc-50 outline-none focus:border-amber-400"
                  placeholder="tag1, tag2"
                  value={bulkTags}
                  onChange={(event) => setBulkTags(event.target.value)}
                />
              )}

              <Button
                type="button"
                disabled={applyingBulk || !selectedIds.length}
                className="h-8 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-3 text-[11px] font-semibold text-zinc-950 disabled:opacity-60"
                onClick={handleBulkApply}
              >
                {applyingBulk ? "Applying..." : "Apply bulk"}
              </Button>
            </div>
            <p className="text-[10px] text-zinc-500">
              Tip: use bulk actions to clean stale pipeline, assign owners, and standardize scoring in seconds.
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-zinc-800 bg-black/55 p-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {groupedLeads.map((group) => (
              <div key={group.status} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 shadow-[inset_0_1px_0_rgba(148,163,184,0.06)]">
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px]",
                      STATUS_META[group.status].pill,
                    ].join(" ")}
                  >
                    {STATUS_META[group.status].label}
                  </span>
                  <span className="rounded-full border border-zinc-700 bg-zinc-900/70 px-2 py-0.5 text-[10px] text-zinc-400">
                    {group.items.length}
                  </span>
                </div>
                <div className="mb-3 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>{toCurrency(group.items.reduce((sum, lead) => sum + (lead.value || 0), 0))}</span>
                  <span
                    className={[
                      "rounded-full border px-2 py-0.5",
                      group.items.filter((lead) => isActiveStatus(lead.status) && isOverdue(lead.nextFollowUp)).length > 0
                        ? "border-rose-500/50 bg-rose-500/10 text-rose-200"
                        : "border-zinc-700 text-zinc-500",
                    ].join(" ")}
                  >
                    {group.items.filter((lead) => isActiveStatus(lead.status) && isOverdue(lead.nextFollowUp)).length} overdue
                  </span>
                </div>

                <div className="space-y-2">
                  {group.items.length === 0 && (
                    <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/70 px-2 py-3 text-center text-[11px] text-zinc-500">
                      No leads in this stage.
                    </p>
                  )}

                  {group.items.map((lead) => {
                    const isSelected = lead._id === selectedId;
                    const isBulkSelected = selectedIds.includes(lead._id);
                    const openTasks = (lead.tasks || []).filter((task) => task.status === "todo").length;
                    const overdueFollowUp = isOverdue(lead.nextFollowUp);

                    return (
                      <div
                        key={lead._id}
                        className={[
                          "w-full rounded-xl border p-2.5 transition",
                          isSelected
                            ? "border-amber-400/80 bg-zinc-900/95 shadow-[0_0_0_1px_rgba(251,191,36,0.18)]"
                            : "border-zinc-800 bg-zinc-950/85 hover:border-zinc-600 hover:bg-zinc-900/80",
                        ].join(" ")}
                      >
                        <div className="mb-1 flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={isBulkSelected}
                            onChange={() => toggleLeadSelection(lead._id)}
                            className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-600 bg-zinc-900 text-amber-400"
                          />
                          <button type="button" onClick={() => setSelectedId(lead._id)} className="min-w-0 flex-1 text-left">
                            <p className="truncate text-[12px] font-semibold text-zinc-100">{lead.name}</p>
                            <p className="mt-0.5 truncate text-[11px] text-zinc-400">{lead.company || lead.email || "-"}</p>
                            {lead.requirement && (
                              <p className="mt-1 overflow-hidden text-[10px] text-zinc-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                                {lead.requirement}
                              </p>
                            )}
                          </button>
                        </div>
                        <div className="mb-1 flex flex-wrap gap-1">
                          {(lead.tags || []).slice(0, 2).map((tag) => (
                            <span key={`${lead._id}-${tag}`} className="rounded-full border border-zinc-700 px-2 py-0.5 text-[9px] text-zinc-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500">
                          <span>Score {lead.score ?? 50}</span>
                          <span>{lead.value ? toCurrency(lead.value) : "No value"}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-500">
                          <span>{openTasks} open {openTasks === 1 ? "task" : "tasks"}</span>
                          <span
                            className={[
                              "rounded-full border px-1.5 py-0.5",
                              overdueFollowUp
                                ? "border-rose-500/50 bg-rose-500/10 text-rose-200"
                                : "border-zinc-700 text-zinc-400",
                            ].join(" ")}
                          >
                            F/U {lead.nextFollowUp ? formatDateShort(lead.nextFollowUp) : "-"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
            {!selectedLead || !editor ? (
              <p className="text-xs text-zinc-500">
                {loading ? "Loading CRM leads..." : "Select a lead from the pipeline to unlock advanced controls."}
              </p>
            ) : (
              <>
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Lead control center</p>
                    <h2 className="mt-1 text-lg font-semibold text-zinc-100">{selectedLead.name}</h2>
                    <p className="text-[11px] text-zinc-500">
                      Created {formatDate(selectedLead.createdAt)} | Updated {formatDate(selectedLead.updatedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 rounded-full border border-zinc-700 px-3 text-[11px]"
                      disabled={saving}
                      onClick={handleMarkContacted}
                    >
                      Mark contacted
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 rounded-full border border-zinc-700 px-3 text-[11px]"
                      disabled={saving}
                      onClick={() => patchLead(selectedLead._id, { archived: !selectedLead.archived }, selectedLead.archived ? "Lead unarchived." : "Lead archived.")}
                    >
                      {selectedLead.archived ? "Unarchive" : "Archive"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 rounded-full border border-rose-700 bg-rose-600/15 px-3 text-[11px] text-rose-200"
                      disabled={deleting}
                      onClick={handleDeleteLead}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {STATUS_ORDER.map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={saving || editor.status === status}
                      onClick={() => handleQuickStageMove(status)}
                      className={[
                        "rounded-full border px-3 py-1 text-[11px] transition",
                        editor.status === status
                          ? `${STATUS_META[status].pill}`
                          : "border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:border-zinc-500",
                      ].join(" ")}
                    >
                      {STATUS_META[status].label}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.name}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, name: event.target.value } : prev))}
                    placeholder="Lead name"
                  />
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.company}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, company: event.target.value } : prev))}
                    placeholder="Company"
                  />
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.email}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, email: event.target.value } : prev))}
                    placeholder="Email"
                  />
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.phone}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, phone: event.target.value } : prev))}
                    placeholder="Phone"
                  />
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.source}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, source: event.target.value } : prev))}
                    placeholder="Lead source"
                  />
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.assignee}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, assignee: event.target.value } : prev))}
                    placeholder="Owner / assignee"
                  />
                  <select
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.priority}
                    onChange={(event) =>
                      setEditor((prev) => (prev ? { ...prev, priority: event.target.value as LeadPriority } : prev))
                    }
                  >
                    <option value="low">Low priority</option>
                    <option value="medium">Medium priority</option>
                    <option value="high">High priority</option>
                  </select>
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    type="number"
                    min={0}
                    value={editor.value}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, value: event.target.value } : prev))}
                    placeholder="Deal value (INR)"
                  />
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    type="number"
                    min={0}
                    max={100}
                    value={editor.score}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, score: event.target.value } : prev))}
                    placeholder="Lead score"
                  />
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    type="date"
                    value={editor.nextFollowUp}
                    onChange={(event) =>
                      setEditor((prev) => (prev ? { ...prev, nextFollowUp: event.target.value } : prev))
                    }
                  />
                  <input
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    type="date"
                    value={editor.expectedCloseDate}
                    onChange={(event) =>
                      setEditor((prev) => (prev ? { ...prev, expectedCloseDate: event.target.value } : prev))
                    }
                  />
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-400">
                    Last contacted: {formatDate(selectedLead.lastContactedAt)}
                  </div>
                  <textarea
                    className="xl:col-span-2 min-h-[96px] rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.requirement}
                    onChange={(event) =>
                      setEditor((prev) => (prev ? { ...prev, requirement: event.target.value } : prev))
                    }
                    placeholder="Requirement"
                  />
                  <textarea
                    className="min-h-[96px] rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.notes}
                    onChange={(event) => setEditor((prev) => (prev ? { ...prev, notes: event.target.value } : prev))}
                    placeholder="Internal notes"
                  />
                  <textarea
                    className="xl:col-span-3 min-h-[72px] rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                    value={editor.closeReason}
                    onChange={(event) =>
                      setEditor((prev) => (prev ? { ...prev, closeReason: event.target.value } : prev))
                    }
                    placeholder="Close reason (especially useful for won/lost)"
                  />
                </div>

                <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Tags</p>
                    <p className="text-[10px] text-zinc-500">Use tags for niche, service, urgency, geography</p>
                  </div>
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {(selectedLead.tags || []).length === 0 && (
                      <span className="text-[11px] text-zinc-500">No tags yet.</span>
                    )}
                    {(selectedLead.tags || []).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="rounded-full border border-zinc-700 bg-zinc-900/70 px-2.5 py-1 text-[10px] text-zinc-200 hover:border-rose-400/70 hover:text-rose-200"
                      >
                        {tag} ×
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                      value={tagInput}
                      onChange={(event) => setTagInput(event.target.value)}
                      placeholder="Add tags (comma separated)"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-9 rounded-lg border border-zinc-700 px-3 text-[11px]"
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <Button
                    type="button"
                    disabled={saving}
                    className="rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-6 py-2 text-[11px] font-semibold text-zinc-950 disabled:opacity-60"
                    onClick={handleSaveLead}
                  >
                    {saving ? "Saving..." : "Save lead updates"}
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-100">Task tracker</h3>
                <span className="text-[11px] text-zinc-500">
                  {selectedLeadTasks.filter((task) => task.status === "todo").length} open
                </span>
              </div>
              {selectedLead ? (
                <>
                  <form onSubmit={handleAddTask} className="mb-3 grid gap-2">
                    <input
                      className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                      value={taskTitle}
                      onChange={(event) => setTaskTitle(event.target.value)}
                      placeholder="New task title"
                    />
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                      <input
                        className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                        type="date"
                        value={taskDueDate}
                        onChange={(event) => setTaskDueDate(event.target.value)}
                      />
                      <select
                        className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                        value={taskPriority}
                        onChange={(event) => setTaskPriority(event.target.value as LeadPriority)}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <Button
                        type="submit"
                        disabled={addingTask}
                        className="rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-4 text-[11px] font-semibold text-zinc-950 disabled:opacity-60"
                      >
                        {addingTask ? "..." : "Add"}
                      </Button>
                    </div>
                  </form>
                  <div className="max-h-[260px] space-y-2 overflow-auto pr-1">
                    {selectedLeadTasks.length === 0 && (
                      <p className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-[11px] text-zinc-500">
                        No tasks added yet.
                      </p>
                    )}
                    {selectedLeadTasks.map((task) => (
                      <div key={task.taskId} className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-2">
                        <div className="flex items-start justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleTask(task)}
                            className="text-left"
                          >
                            <p className={`text-[12px] ${task.status === "done" ? "text-zinc-500 line-through" : "text-zinc-100"}`}>
                              {task.title}
                            </p>
                            <p className="mt-0.5 text-[10px] text-zinc-500">
                              {task.priority.toUpperCase()} | Due {task.dueDate ? formatDateShort(task.dueDate) : "-"}
                            </p>
                          </button>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleToggleTask(task)}
                              className={`rounded-full border px-2 py-0.5 text-[10px] ${task.status === "done" ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200" : "border-zinc-700 text-zinc-300"}`}
                            >
                              {task.status === "done" ? "Done" : "Todo"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.taskId)}
                              className="rounded-full border border-rose-700 bg-rose-600/15 px-2 py-0.5 text-[10px] text-rose-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xs text-zinc-500">Select a lead to manage tasks.</p>
              )}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <h3 className="mb-3 text-sm font-semibold text-zinc-100">Activity timeline</h3>
              {selectedLead ? (
                <>
                  <form onSubmit={handleAddActivity} className="mb-3 grid gap-2">
                    <div className="grid grid-cols-[auto_1fr] gap-2">
                      <select
                        className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                        value={activityType}
                        onChange={(event) => setActivityType(event.target.value as LeadActivityType)}
                      >
                        <option value="note">Note</option>
                        <option value="call">Call</option>
                        <option value="email">Email</option>
                        <option value="meeting">Meeting</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                      <input
                        className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-amber-400"
                        value={activityNote}
                        onChange={(event) => setActivityNote(event.target.value)}
                        placeholder="Log activity detail"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={addingActivity}
                      className="h-8 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-4 text-[11px] font-semibold text-zinc-950 disabled:opacity-60"
                    >
                      {addingActivity ? "Adding..." : "Add activity"}
                    </Button>
                  </form>

                  <div className="max-h-[240px] space-y-2 overflow-auto pr-1">
                    {selectedLeadActivities.length === 0 && (
                      <p className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-[11px] text-zinc-500">
                        No activity logged yet.
                      </p>
                    )}
                    {[...selectedLeadActivities]
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((activity) => (
                        <div key={activity.activityId} className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-2">
                          <p className="text-[11px] font-semibold text-zinc-100">{activity.type.toUpperCase()}</p>
                          <p className="mt-1 text-[11px] text-zinc-300">{activity.note}</p>
                          <p className="mt-1 text-[10px] text-zinc-500">
                            {formatDate(activity.createdAt)} {activity.actor ? `| ${activity.actor}` : ""}
                          </p>
                        </div>
                      ))}
                  </div>

                  <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Stage history</p>
                    <div className="max-h-[160px] space-y-1.5 overflow-auto pr-1">
                      {selectedLeadStageHistory.length === 0 && (
                        <p className="text-[11px] text-zinc-500">No stage movement recorded yet.</p>
                      )}
                      {[...selectedLeadStageHistory]
                        .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime())
                        .map((item, index) => (
                          <p key={`${item.changedAt}-${index}`} className="text-[11px] text-zinc-300">
                            {STATUS_META[item.from].label} {"->"} {STATUS_META[item.to].label} on {formatDate(item.changedAt)}
                          </p>
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-xs text-zinc-500">Select a lead to log activity.</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
