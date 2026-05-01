import { dbConnect } from "@/lib/mongodb";
import { AdminSession } from "@/models/AdminSession";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "admin_session";

function readCookieToken(req: Request) {
  return req.headers
    .get("cookie")
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
}

export async function isAdminAuthorizedRequest(req: Request) {
  const token = readCookieToken(req);
  if (!token) return false;

  await dbConnect();
  const session = await AdminSession.findOne({ token }).lean();
  return Boolean(session);
}
