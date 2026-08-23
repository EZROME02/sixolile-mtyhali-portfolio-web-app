import { resolveSession } from "../auth/api";
import type { AuthEnv } from "../auth/contracts";
import { createRepositories } from "../db/repositories";
import { applySecurityHeaders } from "../security/http";
import { parseJsonBody } from "../security/request";
import { z } from "zod";

const workspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  data: z.string().max(100_000),
});

export async function handleWorkspaceRequest(request: Request, env: AuthEnv): Promise<Response> {
  if (!env.DB) return json({ error: "Workspace storage unavailable" }, 503);
  if (!isSameOrigin(request)) return json({ error: "Origin not allowed" }, 403);

  const repositories = createRepositories(env.DB);
  const user = await resolveSession(request, repositories.sessions, repositories.users);
  if (!user) return json({ error: "Authentication required" }, 401);

  if (request.method === "GET") {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return json({ error: "Workspace id required" }, 400);
    const workspace = await repositories.workspaces.findOwned(id, user.id);
    return workspace ? json({ workspace }, 200) : json({ error: "Workspace not found" }, 404);
  }

  if (request.method === "PUT") {
    const parsed = await parseJsonBody(request, workspaceSchema, 110_000);
    if (parsed.response) return applySecurityHeaders(parsed.response);
    const workspace = parsed.data!;
    await repositories.workspaces.upsert(
      workspace.id,
      user.id,
      workspace.name,
      workspace.data,
      new Date().toISOString(),
    );
    return json({ workspace: await repositories.workspaces.findOwned(workspace.id, user.id) }, 200);
  }

  return json({ error: "Method not allowed" }, 405);
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function json(body: unknown, status: number): Response {
  return applySecurityHeaders(
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    }),
  );
}
