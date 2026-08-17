import { NextResponse } from "next/server";
import { callVegaClientPortal, VegaClientPortalProxyError } from "@/lib/vega-client-portal-proxy";
import { createPortalToken, portalCookieOptions } from "@/lib/portal-session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await callVegaClientPortal("/auth/signup", { method: "POST", body });
    const client = (result.data as { client: { id: string; email: string; fullName: string } }).client;

    const token = await createPortalToken({
      clientUserId: client.id,
      email: client.email,
      fullName: client.fullName,
    });

    const response = NextResponse.json({ success: true, data: { client } }, { status: 201 });
    response.cookies.set({ ...portalCookieOptions, value: token });
    return response;
  } catch (error) {
    const status = error instanceof VegaClientPortalProxyError ? error.status : 502;
    const message = error instanceof Error ? error.message : "Failed to sign up";
    return NextResponse.json({ success: false, error: { message } }, { status });
  }
}
