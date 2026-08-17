// Server-to-server calls into Vega's /api/client-portal/* surface - sibling to
// lib/vega-proxy.ts's callVegaPublic, but for authenticated per-client data instead of
// anonymous public submissions. Vega has no Bearer-token auth anywhere; this mirrors the
// one server-to-server trust pattern that already exists there (the Dashboard->Vega event
// feed's shared-secret header), not the origin-allowlist callVegaPublic uses - that
// allowlist is for requests that need to look like they came from a browser, which these
// don't.
//
// The browser never talks to vega.nemnidhi.com directly - every portal page/API route
// here calls this from the website's own backend, same "Vega hard boundary" callVegaPublic
// already documents.

export class VegaClientPortalProxyError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getVegaClientPortalBase() {
  return (process.env.VEGA_CLIENT_PORTAL_API_BASE || "https://vega.nemnidhi.com/api/client-portal").replace(
    /\/$/,
    "",
  );
}

function getClientPortalSecret() {
  const secret = process.env.CLIENT_PORTAL_INTEGRATION_SECRET;
  if (!secret) {
    throw new VegaClientPortalProxyError("CLIENT_PORTAL_INTEGRATION_SECRET is not configured", 503);
  }
  return secret;
}

/** GET/POST/PUT a Vega /api/client-portal/* route, server-to-server. */
export async function callVegaClientPortal(
  path: string,
  init: { method: "GET" | "POST" | "PUT"; body?: unknown; timeoutMs?: number },
) {
  const endpoint = `${getVegaClientPortalBase()}${path}`;
  const secret = getClientPortalSecret();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), init.timeoutMs ?? 12000);

  try {
    const response = await fetch(endpoint, {
      method: init.method,
      headers: {
        "Content-Type": "application/json",
        "x-client-portal-secret": secret,
      },
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        data && typeof data === "object" && "error" in data && typeof (data as { error?: { message?: unknown } }).error?.message === "string"
          ? (data as { error: { message: string } }).error.message
          : `Vega responded with status ${response.status}`;
      throw new VegaClientPortalProxyError(message, response.status);
    }

    return data as { success: true; data: unknown };
  } finally {
    clearTimeout(timeout);
  }
}

/** For binary/HTML document proxying (audit-report, proposal-document) - returns the raw Response. */
export async function fetchVegaClientPortalDocument(path: string, timeoutMs = 20000) {
  const endpoint = `${getVegaClientPortalBase()}${path}`;
  const secret = getClientPortalSecret();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(endpoint, {
      method: "GET",
      headers: { "x-client-portal-secret": secret },
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }
}
