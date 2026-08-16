import { NextResponse } from "next/server";
import { callVegaPublic, VegaProxyError } from "@/lib/vega-proxy";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await callVegaPublic(request, "/questionnaire/submit", {
      method: "POST",
      body,
      refererPath: "/business-audit",
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof VegaProxyError ? error.status : 502;
    const message = error instanceof Error ? error.message : "Failed to submit questionnaire";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
