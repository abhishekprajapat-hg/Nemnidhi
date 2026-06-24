import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    // In a real app, verify against a DB. For now, simple password check.
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = await createToken({ role: "admin" });
    
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
