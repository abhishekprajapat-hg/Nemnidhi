import { NextResponse } from "next/server";
import { callVegaClientPortal, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { requirePortalSession } from "@/lib/portal-request";

export async function POST(request: Request) {
  try {
    const session = await requirePortalSession();
    const { leadId, ...rest } = await request.json();
    if (!leadId) {
      return NextResponse.json({ success: false, error: { message: "leadId is required" } }, { status: 400 });
    }
    const result = await callVegaClientPortal(`/blueprint/${leadId}/respond`, {
      method: "POST",
      body: { ...rest, clientUserId: session.clientUserId },
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof VegaClientPortalProxyError ? error.status : error instanceof Error && error.message === "Unauthorized" ? 401 : 502;
    const message = error instanceof Error ? error.message : "Failed to respond to blueprint";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
