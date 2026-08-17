import { NextResponse } from "next/server";
import { fetchVegaClientPortalDocument, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { requirePortalSession } from "@/lib/portal-request";

export async function GET(request: Request) {
  try {
    const session = await requirePortalSession();
    const leadId = new URL(request.url).searchParams.get("leadId");
    if (!leadId) {
      return NextResponse.json({ success: false, error: { message: "leadId is required" } }, { status: 400 });
    }

    const upstream = await fetchVegaClientPortalDocument(
      `/audit-report/${leadId}?clientUserId=${encodeURIComponent(session.clientUserId)}`,
    );

    if (!upstream.ok) {
      const data = await upstream.json().catch(() => null);
      const message =
        data && typeof data === "object" && "error" in data && typeof (data as { error?: { message?: unknown } }).error?.message === "string"
          ? (data as { error: { message: string } }).error.message
          : "Failed to load audit report";
      return NextResponse.json({ success: false, error: { message } }, { status: upstream.status });
    }

    const buffer = await upstream.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="audit-report-${leadId}.pdf"`,
      },
    });
  } catch (error) {
    const status = error instanceof VegaClientPortalProxyError ? error.status : error instanceof Error && error.message === "Unauthorized" ? 401 : 502;
    const message = error instanceof Error ? error.message : "Failed to load audit report";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
