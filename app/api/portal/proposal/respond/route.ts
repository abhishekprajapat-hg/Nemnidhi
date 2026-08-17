import { NextResponse } from "next/server";
import { callVegaClientPortal, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { requirePortalSession } from "@/lib/portal-request";

export async function POST(request: Request) {
  try {
    const session = await requirePortalSession();
    const { proposalId, ...rest } = await request.json();
    if (!proposalId) {
      return NextResponse.json({ success: false, error: { message: "proposalId is required" } }, { status: 400 });
    }
    const result = await callVegaClientPortal(`/proposal/${proposalId}/respond`, {
      method: "POST",
      body: { ...rest, clientUserId: session.clientUserId },
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof VegaClientPortalProxyError ? error.status : error instanceof Error && error.message === "Unauthorized" ? 401 : 502;
    const message = error instanceof Error ? error.message : "Failed to respond to proposal";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
