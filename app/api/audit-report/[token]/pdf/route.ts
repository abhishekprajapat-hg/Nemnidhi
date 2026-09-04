import { fetchVegaPublicBytes } from "@/lib/vega-proxy";

type Params = Promise<{ token: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { token } = await params;
  const upstream = await fetchVegaPublicBytes(`/audit-report/${token}/pdf`, `/audit-report/${token}`);

  if (!upstream.ok) {
    return new Response(upstream.status === 404 ? "Report not found" : "Failed to load report", {
      status: upstream.status,
    });
  }

  const buffer = await upstream.arrayBuffer();
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="audit-report-${token}.pdf"`,
    },
  });
}
