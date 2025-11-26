// app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { AdminSession } from "@/models/AdminSession";
import crypto from "crypto";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "admin_session";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password } = body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("ADMIN_EMAIL or ADMIN_PASSWORD not set");
      return NextResponse.json(
        { message: "Server auth not configured" },
        { status: 500 }
      );
    }

    // Simple check (for internal admin use only)
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate session token
    const token = crypto.randomBytes(32).toString("hex");

    await AdminSession.create({ token });

    const res = NextResponse.json({ success: true });

    const isProd = process.env.NODE_ENV === "production";

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("POST /api/admin/login error:", err);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
