// app/api/services/[id]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";

type Params = {
  params: { id: string };
};

export async function PUT(req: Request, { params }: Params) {
  try {
    await dbConnect();
    const body = await req.json();

    const updated = await Service.findByIdAndUpdate(
      params.id,
      {
        title: body.title,
        description: body.description,
        points: body.points || [],
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/services/[id] error:", err);
    return NextResponse.json(
      { message: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await dbConnect();
    const deleted = await Service.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/services/[id] error:", err);
    return NextResponse.json(
      { message: "Failed to delete service" },
      { status: 500 }
    );
  }
}
