// Session for nemnidhi.com/portal (Vega's client portal, moved onto the public website -
// see lib/vega-client-portal-proxy.ts for why). Deliberately separate cookie/secret/shape
// from lib/auth.ts's admin session: that one is a single hardcoded password with no real
// per-user identity, this one carries a specific Vega clientUserId per signed-in client.
//
// Unlike lib/auth.ts's JWT_SECRET, this throws rather than falling back to an insecure
// hardcoded default - a portal session directly gates access to another business's real
// account/audit/proposal data, so a silently-guessable secret is a real risk, not a
// convenience worth keeping.

import { jwtVerify, SignJWT } from "jose";

export const PORTAL_COOKIE_NAME = "portal_session";
const PORTAL_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type PortalSessionPayload = {
  clientUserId: string;
  email: string;
  fullName: string;
};

function getSecret() {
  const secret = process.env.PORTAL_JWT_SECRET;
  if (!secret) {
    throw new Error("PORTAL_JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export async function createPortalToken(payload: PortalSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${PORTAL_COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifyPortalToken(token: string): Promise<PortalSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      typeof payload.clientUserId !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.fullName !== "string"
    ) {
      return null;
    }
    return { clientUserId: payload.clientUserId, email: payload.email, fullName: payload.fullName };
  } catch {
    return null;
  }
}

export const portalCookieOptions = {
  name: PORTAL_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: PORTAL_COOKIE_MAX_AGE_SECONDS,
};
