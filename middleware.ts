import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-replace-in-production";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isApiDashboardRoute = pathname.startsWith("/api/dashboard");
  const isLoginRoute = pathname === "/dashboard/login";

  if (!isDashboardRoute && !isApiDashboardRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  let isValid = false;
  if (token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      isValid = true;
    } catch (e) {
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

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
