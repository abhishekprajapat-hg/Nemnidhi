import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { AdminSession } from "@/models/AdminSession";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "admin_session";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await dbConnect();

  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return redirect("/admin/login");

  const session = await AdminSession.findOne({ token }).lean();
  if (!session) return redirect("/admin/login");

  return <>{children}</>;
}
