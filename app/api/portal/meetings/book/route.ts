import { NextResponse } from "next/server";
import { callVegaClientPortal, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { requirePortalSession } from "@/lib/portal-request";

export async function POST(request: Request) {
  try {
    const session = await requirePortalSession();
    const body = await request.json();
    const result = await callVegaClientPortal("/meetings/book", {
      method: "POST",
      body: { ...body, clientUserId: session.clientUserId },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof VegaClientPortalProxyError ? error.status : error instanceof Error && error.message === "Unauthorized" ? 401 : 502;
    const message = error instanceof Error ? error.message : "Failed to book meeting";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
