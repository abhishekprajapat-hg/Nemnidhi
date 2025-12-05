// models/Project.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  client: string;
  industry?: string;
  websiteUrl: string;
  githubUrl?: string;
  period?: string;
  summary: string;
  contributions: string[];
  stack: string[];
  isFeatured: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    industry: { type: String },
    websiteUrl: { type: String, required: true },
    githubUrl: { type: String },
    period: { type: String },
    summary: { type: String, required: true },
    contributions: { type: [String], default: [] },
    stack: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
