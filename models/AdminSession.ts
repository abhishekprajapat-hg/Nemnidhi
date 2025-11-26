// models/AdminSession.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IAdminSession extends Document {
  token: string;
  createdAt: Date;
}

const AdminSessionSchema = new Schema<IAdminSession>(
  {
    token: { type: String, required: true, unique: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const AdminSession: Model<IAdminSession> =
  mongoose.models.AdminSession ||
  mongoose.model<IAdminSession>("AdminSession", AdminSessionSchema);
