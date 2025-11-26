// app/api/services/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";

export async function GET(req: NextRequest, { params }: any) {
  try {
    await dbConnect();

    const service = await Service.findById(params.id);

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/services/[id] error:", error?.message || error);
    return NextResponse.json(
      { message: "Failed to fetch service", error: error?.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const body = await req.json();
    await dbConnect();

    const service = await Service.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/services/[id] error:", error?.message || error);
    return NextResponse.json(
      { message: "Failed to update service", error: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    await dbConnect();

    const deleted = await Service.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/services/[id] error:", error?.message || error);
    return NextResponse.json(
      { message: "Failed to delete service", error: error?.message },
      { status: 500 }
    );
  }
}
