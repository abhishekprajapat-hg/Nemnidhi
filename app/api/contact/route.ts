// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { ContactSubmission } from "@/models/ContactSubmission";

// GET – list all submissions
export async function GET() {
  try {
    await dbConnect();

    const submissions = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(submissions);
  } catch (err) {
    console.error("GET /api/contact error:", err);
    return NextResponse.json(
      { message: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

// POST – create new submission
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, company, budget, timeline, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await ContactSubmission.create({
      name,
      email,
      company,
      budget,
      timeline,
      message,
      source,
      status: "new",
    });

    return NextResponse.json(
      { success: true, message: "Thank you. We’ll get back to you shortly." },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      { message: "Failed to submit form. Please try again later." },
      { status: 500 }
    );
  }
}

// PATCH – update status
export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, status } = body as {
      id?: string;
      status?: "new" | "in-progress" | "closed";
    };

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

    if (!status || !["new", "in-progress", "closed"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const updated = await ContactSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { message: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PATCH /api/contact error:", err?.message || err);
    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 }
    );
  }
}
