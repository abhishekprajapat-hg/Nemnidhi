import { NextResponse } from "next/server";
import { callVegaPublic, VegaProxyError } from "@/lib/vega-proxy";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get("industry") ?? "";
    const segment = searchParams.get("segment") ?? "";
    const query = new URLSearchParams({ industry, ...(segment ? { segment } : {}) }).toString();

    const result = await callVegaPublic(request, `/questionnaire?${query}`, {
      method: "GET",
      refererPath: "/business-audit",
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof VegaProxyError ? error.status : 502;
    const message = error instanceof Error ? error.message : "Failed to load questions";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
