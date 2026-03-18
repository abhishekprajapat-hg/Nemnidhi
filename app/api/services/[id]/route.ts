// app/api/services/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await Promise.resolve(context.params);

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/services/[id] error:", getErrorMessage(error));
    return NextResponse.json(
      { message: "Failed to fetch service", error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const body = await req.json();
    await dbConnect();
    const { id } = await Promise.resolve(context.params);

    const service = await Service.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error: unknown) {
    console.error("PUT /api/services/[id] error:", getErrorMessage(error));
    return NextResponse.json(
      { message: "Failed to update service", error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await Promise.resolve(context.params);

    const deleted = await Service.findByIdAndDelete(id);

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
  } catch (error: unknown) {
    console.error("DELETE /api/services/[id] error:", getErrorMessage(error));
    return NextResponse.json(
      { message: "Failed to delete service", error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
