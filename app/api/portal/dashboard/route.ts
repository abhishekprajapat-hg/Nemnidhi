import { NextResponse } from "next/server";
import { callVegaClientPortal, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { requirePortalSession } from "@/lib/portal-request";

export async function GET() {
  try {
    const session = await requirePortalSession();
    const result = await callVegaClientPortal(
      `/dashboard?clientUserId=${encodeURIComponent(session.clientUserId)}`,
      { method: "GET" },
    );
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof VegaClientPortalProxyError ? error.status : error instanceof Error && error.message === "Unauthorized" ? 401 : 502;
    const message = error instanceof Error ? error.message : "Failed to load dashboard";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
