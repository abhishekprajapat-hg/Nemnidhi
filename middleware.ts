import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { PORTAL_COOKIE_NAME } from "@/lib/portal-session";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-replace-in-production";

const PORTAL_PUBLIC_PAGES = ["/portal/login", "/portal/signup", "/portal/activate"];
const PORTAL_PUBLIC_API_PREFIX = "/api/portal/auth/";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  // These three API surfaces were never behind the admin gate: /api/contact GET/PATCH exposed every
  // contact submission, /api/upload let anyone write files into public/images, and /api/services let
  // anyone edit or delete services. Only the public contact-form POST and read-only services GET stay open.
  const method = request.method.toUpperCase();
  const isAdminOnlyApi =
    pathname.startsWith("/api/upload") ||
    (pathname.startsWith("/api/contact") && method !== "POST") ||
    (pathname.startsWith("/api/services") && method !== "GET");
  const isApiDashboardRoute = pathname.startsWith("/api/dashboard") || isAdminOnlyApi;
  const isLoginRoute = pathname === "/dashboard/login";

  const isPortalRoute = pathname.startsWith("/portal") && !PORTAL_PUBLIC_PAGES.includes(pathname);
  const isApiPortalRoute = pathname.startsWith("/api/portal") && !pathname.startsWith(PORTAL_PUBLIC_API_PREFIX);

  if (isDashboardRoute || isApiDashboardRoute) {
    const token = request.cookies.get("auth_token")?.value;

    let isValid = false;
    if (token) {
      try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        await jwtVerify(token, secret);
        isValid = true;
      } catch {
        isValid = false;
      }
    }

    if (isLoginRoute) {
      if (isValid) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    }

    if (!isValid) {
      if (isApiDashboardRoute) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }

    return NextResponse.next();
  }

  if (isPortalRoute || isApiPortalRoute) {
    const token = request.cookies.get(PORTAL_COOKIE_NAME)?.value;

    let isValid = false;
    if (token && process.env.PORTAL_JWT_SECRET) {
      try {
        const secret = new TextEncoder().encode(process.env.PORTAL_JWT_SECRET);
        await jwtVerify(token, secret);
        isValid = true;
      } catch {
        isValid = false;
      }
    }

    if (!isValid) {
      if (isApiPortalRoute) {
        return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/dashboard/:path*",
    "/api/contact/:path*",
    "/api/upload/:path*",
    "/api/services/:path*",
    "/portal/:path*",
    "/api/portal/:path*",
  ],
};
