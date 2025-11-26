// models/ContactSubmission.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
  status: "new" | "in-progress" | "closed";
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    budget: { type: String },
    timeline: { type: String },
    message: { type: String, required: true },
    source: { type: String },
    status: {
      type: String,
      enum: ["new", "in-progress", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>(
    "ContactSubmission",
    ContactSubmissionSchema
  );
