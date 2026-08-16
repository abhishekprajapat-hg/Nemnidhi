// Server-to-server calls into Vega's /api/public/* surface, mirroring the
// existing app/api/contact/route.ts -> HRMS_LEAD_ENDPOINT pattern: this
// website's own backend calls Vega directly, spoofing a real Origin/Referer
// so Vega's origin-allowlist (LEAD_CAPTURE_ALLOWED_ORIGINS) accepts the
// request. The browser never talks to vega.nemnidhi.com directly - Vega's
// own hard boundary is that nobody outside Nemnidhi's team logs into it, and
// keeping every call server-side is what keeps that true here too.

function normalizeOrigin(raw: string | null | undefined) {
  if (!raw) return null;
  try {
    const candidate = raw.includes("://") ? raw : `https://${raw}`;
    const parsed = new URL(candidate);
    return `${parsed.protocol}//${parsed.host}`.toLowerCase();
  } catch {
    return null;
  }
}

export function getOwnOrigin(request: Request) {
  const directOrigin = normalizeOrigin(request.headers.get("origin"));
  if (directOrigin) return directOrigin;

  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = request.headers.get("host")?.split(",")[0]?.trim();

  if (forwardedProto && forwardedHost) {
    const fromForwarded = normalizeOrigin(`${forwardedProto}://${forwardedHost}`);
    if (fromForwarded) return fromForwarded;
  }
  if (host) {
    const fromHost = normalizeOrigin(`https://${host}`);
    if (fromHost) return fromHost;
  }

  return normalizeOrigin(process.env.HRMS_LEAD_ORIGIN) ?? "https://nemnidhi.com";
}

function getVegaPublicBase() {
  return (process.env.VEGA_PUBLIC_API_BASE || "https://vega.nemnidhi.com/api/public").replace(/\/$/, "");
}

export class VegaProxyError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/** GET/POST a Vega /api/public/* route, forwarding this request's real path as the spoofed Referer. */
export async function callVegaPublic(
  request: Request,
  path: string,
  init: { method: "GET" | "POST"; body?: unknown; refererPath: string; timeoutMs?: number },
) {
  const origin = getOwnOrigin(request);
  const endpoint = `${getVegaPublicBase()}${path}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), init.timeoutMs ?? 12000);

  try {
    const response = await fetch(endpoint, {
      method: init.method,
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Referer: `${origin.replace(/\/$/, "")}${init.refererPath}`,
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        data && typeof data === "object" && "error" in data && typeof (data as { error?: { message?: unknown } }).error?.message === "string"
          ? (data as { error: { message: string } }).error.message
          : `Vega responded with status ${response.status}`;
      throw new VegaProxyError(message, response.status);
    }

    return data as { success: true; data: unknown };
  } finally {
    clearTimeout(timeout);
  }
}
