import { NextResponse } from "next/server";
import { callVegaPublic, VegaProxyError } from "@/lib/vega-proxy";

export async function GET(request: Request) {
  try {
    const result = await callVegaPublic(request, "/pricing-tiers", {
      method: "GET",
      refererPath: "/portal/audit",
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof VegaProxyError ? error.status : 502;
    const message = error instanceof Error ? error.message : "Failed to load pricing tiers";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
