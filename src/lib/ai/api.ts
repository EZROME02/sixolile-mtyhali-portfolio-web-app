import { resolveSession } from "../auth/api";
import { createRepositories } from "../db/repositories";
import { applySecurityHeaders } from "../security/http";
import { createRateLimiter } from "../security/rate-limit";
import { parseJsonBody } from "../security/request";
import { AiRequestSchema } from "./contracts";
import { runAiProvider, type AiProviderEnv } from "./provider";

const limiter = createRateLimiter({ limit: 20, windowMs: 60_000 });

type RequestEnv = AiProviderEnv & { clientKey?: string; DB?: D1Database };

export async function handleAiRequest(request: Request, env: RequestEnv): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const clientKey =
    env.clientKey ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";
  if (!limiter.allow(clientKey)) return json({ error: "Too many requests" }, 429);

  const parsed = await parseJsonBody(request, AiRequestSchema);
  if (parsed.response) return applySecurityHeaders(parsed.response);

  try {
    const result = await runAiProvider(parsed.data!, env);
    if (env.DB && request.headers.get("cookie")) {
      const repositories = createRepositories(env.DB);
      result.authenticated = Boolean(
        await resolveSession(request, repositories.sessions, repositories.users),
      );
    }
    return json(result, 200);
  } catch (error) {
    console.error("EZROME AI provider error", error);
    return json({ error: "AI provider unavailable" }, 503);
  }
}

function json(body: unknown, status: number): Response {
  return applySecurityHeaders(
    new Response(JSON.stringify(body), {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }),
  );
}
