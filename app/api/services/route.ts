// app/api/services/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find().sort({ createdAt: 1 });
    return NextResponse.json(services);
  } catch (err) {
    console.error("GET /api/services error:", err);
    return NextResponse.json(
      { message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const service = await Service.create({
      title: body.title,
      description: body.description,
      points: body.points || [],
    });

    return NextResponse.json(service, { status: 201 });
  } catch (err) {
    console.error("POST /api/services error:", err);
    return NextResponse.json(
      { message: "Failed to create service" },
      { status: 500 }
    );
  }
}
