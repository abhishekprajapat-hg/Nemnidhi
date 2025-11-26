// models/Service.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  points: string[];
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: [{ type: String }],
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
