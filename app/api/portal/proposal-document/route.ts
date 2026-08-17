import { NextResponse } from "next/server";
import { fetchVegaClientPortalDocument, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { requirePortalSession } from "@/lib/portal-request";

export async function GET(request: Request) {
  try {
    const session = await requirePortalSession();
    const proposalId = new URL(request.url).searchParams.get("proposalId");
    if (!proposalId) {
      return NextResponse.json({ success: false, error: { message: "proposalId is required" } }, { status: 400 });
    }

    const upstream = await fetchVegaClientPortalDocument(
      `/proposal-document/${proposalId}?clientUserId=${encodeURIComponent(session.clientUserId)}`,
    );

    if (!upstream.ok) {
      const data = await upstream.json().catch(() => null);
      const message =
        data && typeof data === "object" && "error" in data && typeof (data as { error?: { message?: unknown } }).error?.message === "string"
          ? (data as { error: { message: string } }).error.message
          : "Failed to load proposal document";
      return NextResponse.json({ success: false, error: { message } }, { status: upstream.status });
    }

    const html = await upstream.text();
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename=proposal-${proposalId}.html`,
      },
    });
  } catch (error) {
    const status = error instanceof VegaClientPortalProxyError ? error.status : error instanceof Error && error.message === "Unauthorized" ? 401 : 502;
    const message = error instanceof Error ? error.message : "Failed to load proposal document";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
