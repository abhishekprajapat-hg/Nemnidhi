// Shared by every authenticated app/api/portal/* route: middleware.ts already gates these
// paths on a valid portal_session cookie before the request reaches here, but the route
// handler still needs to read+verify it itself to get the actual clientUserId - never
// accept clientUserId from the request body/query, or the shared-secret trust model with
// Vega collapses (Vega trusts whatever identity the website asserts).

import { cookies } from "next/headers";
import { PORTAL_COOKIE_NAME, verifyPortalToken, type PortalSessionPayload } from "@/lib/portal-session";

export async function requirePortalSession(): Promise<PortalSessionPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_COOKIE_NAME)?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  const session = await verifyPortalToken(token);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
