import { NextResponse } from "next/server";
import { callVegaPublic, VegaProxyError } from "@/lib/vega-proxy";

export async function GET(request: Request) {
  try {
    const result = await callVegaPublic(request, "/industries", {
      method: "GET",
      refererPath: "/business-audit",
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof VegaProxyError ? error.status : 502;
    const message = error instanceof Error ? error.message : "Failed to load industries";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
