// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { AdminSession } from "@/models/AdminSession";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "admin_session";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const token = req.headers
      .get("cookie")
      ?.split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(COOKIE_NAME + "="))
      ?.split("=")[1];

    if (token) {
      await AdminSession.deleteOne({ token });
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (err) {
    console.error("POST /api/admin/logout error:", err);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}
