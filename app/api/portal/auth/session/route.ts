import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PORTAL_COOKIE_NAME, verifyPortalToken } from "@/lib/portal-session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_COOKIE_NAME)?.value;
  const session = token ? await verifyPortalToken(token) : null;

  return NextResponse.json({
    authenticated: Boolean(session),
    client: session
      ? {
          email: session.email,
          fullName: session.fullName,
        }
      : null,
  });
}
