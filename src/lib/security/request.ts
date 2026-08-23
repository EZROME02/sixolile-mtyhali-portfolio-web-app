import { z } from "zod";

export async function parseJsonBody<T extends z.ZodTypeAny>(request: Request, schema: T, maxBytes = 16_384): Promise<{ data?: z.infer<T>; response?: Response }> {
  const length = request.headers.get("content-length");
  if (length && Number(length) > maxBytes) {
    return { response: new Response(JSON.stringify({ error: "Request too large" }), { status: 413, headers: { "content-type": "application/json" } }) };
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    return { response: new Response(JSON.stringify({ error: "Request too large" }), { status: 413, headers: { "content-type": "application/json" } }) };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const result = schema.safeParse(parsed);
    if (!result.success) {
      return { response: new Response(JSON.stringify({ error: "Invalid request", issues: result.error.flatten() }), { status: 400, headers: { "content-type": "application/json" } }) };
    }
    return { data: result.data as z.infer<T> };
  } catch {
    return { response: new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { "content-type": "application/json" } }) };
  }
}
