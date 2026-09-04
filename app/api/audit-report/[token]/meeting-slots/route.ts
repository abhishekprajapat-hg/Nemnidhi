import { NextResponse } from "next/server";
import { callVegaPublic, VegaProxyError } from "@/lib/vega-proxy";

type Params = Promise<{ token: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { token } = await params;
  try {
    const result = await callVegaPublic(request, `/audit-report/${token}/meeting-slots`, {
      method: "GET",
      refererPath: `/audit-report/${token}`,
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof VegaProxyError ? error.status : 502;
    const message = error instanceof Error ? error.message : "Failed to load available slots";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
