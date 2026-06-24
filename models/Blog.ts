import mongoose from "mongoose";

export interface IBlog extends mongoose.Document {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    date: { type: String, required: true }, // E.g. "June 24, 2026"
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    status: { type: String, enum: ["published", "draft"], default: "published" },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
