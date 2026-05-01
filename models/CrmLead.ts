import mongoose, { Document, Model, Schema } from "mongoose";

export type LeadStatus = "new" | "qualified" | "proposal" | "won" | "lost";
export type LeadPriority = "low" | "medium" | "high";
export type LeadTaskStatus = "todo" | "done";
export type LeadActivityType = "note" | "call" | "email" | "meeting" | "whatsapp" | "status-change" | "task";

export interface ILeadTask {
  taskId: string;
  title: string;
  dueDate?: Date;
  priority: LeadPriority;
  status: LeadTaskStatus;
  createdAt: Date;
  completedAt?: Date;
}

export interface ILeadActivity {
  activityId: string;
  type: LeadActivityType;
  note: string;
  actor?: string;
  createdAt: Date;
}

export interface IStageHistory {
  from: LeadStatus;
  to: LeadStatus;
  changedAt: Date;
  actor?: string;
}

export interface ICrmLead extends Document {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  requirement?: string;
  source?: string;
  status: LeadStatus;
  priority: LeadPriority;
  value?: number;
  nextFollowUp?: Date;
  expectedCloseDate?: Date;
  score: number;
  tags: string[];
  notes?: string;
  assignee?: string;
  lastContactedAt?: Date;
  lastActivityAt?: Date;
  stageHistory: IStageHistory[];
  activities: ILeadActivity[];
  tasks: ILeadTask[];
  archived: boolean;
  closeReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadTaskSchema = new Schema<ILeadTask>(
  {
    taskId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "done"],
      default: "todo",
    },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { _id: false }
);

const LeadActivitySchema = new Schema<ILeadActivity>(
  {
    activityId: { type: String, required: true },
    type: {
      type: String,
      enum: ["note", "call", "email", "meeting", "whatsapp", "status-change", "task"],
      default: "note",
    },
    note: { type: String, required: true, trim: true },
    actor: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const StageHistorySchema = new Schema<IStageHistory>(
  {
    from: {
      type: String,
      enum: ["new", "qualified", "proposal", "won", "lost"],
      required: true,
    },
    to: {
      type: String,
      enum: ["new", "qualified", "proposal", "won", "lost"],
      required: true,
    },
    changedAt: { type: Date, default: Date.now },
    actor: { type: String, trim: true },
  },
  { _id: false }
);

const CrmLeadSchema = new Schema<ICrmLead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    requirement: { type: String, trim: true },
    source: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "qualified", "proposal", "won", "lost"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    value: { type: Number, min: 0 },
    nextFollowUp: { type: Date },
    expectedCloseDate: { type: Date },
    score: { type: Number, min: 0, max: 100, default: 50 },
    tags: { type: [String], default: [] },
    notes: { type: String, trim: true },
    assignee: { type: String, trim: true },
    lastContactedAt: { type: Date },
    lastActivityAt: { type: Date },
    stageHistory: { type: [StageHistorySchema], default: [] },
    activities: { type: [LeadActivitySchema], default: [] },
    tasks: { type: [LeadTaskSchema], default: [] },
    archived: { type: Boolean, default: false },
    closeReason: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

CrmLeadSchema.index({ status: 1, updatedAt: -1 });
CrmLeadSchema.index({ archived: 1, updatedAt: -1 });
CrmLeadSchema.index({ nextFollowUp: 1 });
CrmLeadSchema.index({ tags: 1 });
CrmLeadSchema.index({ score: -1 });

export const CrmLead: Model<ICrmLead> =
  mongoose.models.CrmLead ||
  mongoose.model<ICrmLead>("CrmLead", CrmLeadSchema);
