import { NextResponse } from "next/server";
import { callVegaClientPortal, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { requirePortalSession } from "@/lib/portal-request";

function statusFor(error: unknown) {
  if (error instanceof VegaClientPortalProxyError) return error.status;
  if (error instanceof Error && error.message === "Unauthorized") return 401;
  return 502;
}

export async function GET() {
  try {
    const session = await requirePortalSession();
    const result = await callVegaClientPortal(
      `/queries?clientUserId=${encodeURIComponent(session.clientUserId)}`,
      { method: "GET" },
    );
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load queries";
    return NextResponse.json({ success: false, error: { message } }, { status: statusFor(error) });
  }
}

export async function POST(request: Request) {
  try {
    const session = await requirePortalSession();
    const body = await request.json();
    const result = await callVegaClientPortal("/queries", {
      method: "POST",
      body: { ...body, clientUserId: session.clientUserId },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to raise query";
    return NextResponse.json({ success: false, error: { message } }, { status: statusFor(error) });
  }
}
