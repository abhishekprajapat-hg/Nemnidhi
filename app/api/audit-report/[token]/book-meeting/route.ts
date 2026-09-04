import { NextResponse } from "next/server";
import { callVegaPublic, VegaProxyError } from "@/lib/vega-proxy";

type Params = Promise<{ token: string }>;

export async function POST(request: Request, { params }: { params: Params }) {
  const { token } = await params;
  try {
    const body = await request.json().catch(() => ({}));
    const result = await callVegaPublic(request, `/audit-report/${token}/book-meeting`, {
      method: "POST",
      body,
      refererPath: `/audit-report/${token}`,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof VegaProxyError ? error.status : 502;
    const message = error instanceof Error ? error.message : "Failed to book the call";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
