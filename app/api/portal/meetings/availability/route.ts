import { NextResponse } from "next/server";
import { callVegaClientPortal, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { requirePortalSession } from "@/lib/portal-request";

export async function GET(request: Request) {
  try {
    await requirePortalSession();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") ?? "";
    const days = searchParams.get("days") ?? "";
    const result = await callVegaClientPortal(
      `/meetings/availability?type=${encodeURIComponent(type)}&days=${encodeURIComponent(days)}`,
      { method: "GET" },
    );
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof VegaClientPortalProxyError ? error.status : error instanceof Error && error.message === "Unauthorized" ? 401 : 502;
    const message = error instanceof Error ? error.message : "Failed to load availability";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
