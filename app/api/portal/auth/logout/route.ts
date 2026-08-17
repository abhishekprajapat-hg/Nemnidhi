import { NextResponse } from "next/server";
import { PORTAL_COOKIE_NAME } from "@/lib/portal-session";

export async function POST() {
  const response = NextResponse.json({ success: true, data: null });
  response.cookies.delete(PORTAL_COOKIE_NAME);
  return response;
}
