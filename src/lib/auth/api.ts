import { hashPassword, verifyPassword } from "./crypto";
import type { AuthEnv, AuthUser } from "./contracts";
import { createRepositories } from "../db/repositories";
import { applySecurityHeaders } from "../security/http";
import { createRateLimiter } from "../security/rate-limit";
import { parseJsonBody } from "../security/request";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(12).max(128),
});

const limiter = createRateLimiter({ limit: 10, windowMs: 60_000 });
const SESSION_COOKIE = "ezrome_session";
const DEFAULT_SESSION_TTL = 60 * 60 * 24 * 30;

export async function handleAuthRequest(request: Request, env: AuthEnv): Promise<Response> {
  if (!env.DB) return json({ error: "Authentication storage unavailable" }, 503);
  if (!isSameOrigin(request)) return json({ error: "Origin not allowed" }, 403);

  const pathname = new URL(request.url).pathname;
  const repositories = createRepositories(env.DB);
  const clientKey = request.headers.get("cf-connecting-ip") ?? "anonymous";
  if (!limiter.allow(clientKey)) return json({ error: "Too many requests" }, 429);

  if (pathname === "/api/auth/signup" && request.method === "POST") {
    const parsed = await parseJsonBody(request, credentialsSchema);
    if (parsed.response) return applySecurityHeaders(parsed.response);
    const email = parsed.data!.email.toLowerCase();
    if (await repositories.users.findByEmail(email)) {
      return json({ error: "Account already exists" }, 409);
    }
    const user: AuthUser = await repositories.users.create(
      crypto.randomUUID(),
      email,
      await hashPassword(parsed.data!.password),
    );
    return createSessionResponse(user, repositories.sessions, env);
  }

  if (pathname === "/api/auth/login" && request.method === "POST") {
    const parsed = await parseJsonBody(request, credentialsSchema);
    if (parsed.response) return applySecurityHeaders(parsed.response);
    const account = await repositories.users.findByEmail(parsed.data!.email);
    if (!account || !(await verifyPassword(parsed.data!.password, account.passwordHash))) {
      return json({ error: "Invalid email or password" }, 401);
    }
    return createSessionResponse(
      { id: account.id, email: account.email },
      repositories.sessions,
      env,
    );
  }

  if (pathname === "/api/auth/logout" && request.method === "POST") {
    const sessionId = getCookie(request, SESSION_COOKIE);
    if (sessionId) await repositories.sessions.delete(sessionId);
    return json({ ok: true }, 200, clearSessionCookie());
  }

  if (pathname === "/api/auth/me" && request.method === "GET") {
    const user = await resolveSession(request, repositories.sessions, repositories.users);
    return user ? json({ user }, 200) : json({ user: null }, 200);
  }

  return json({ error: "Not found" }, 404);
}

async function createSessionResponse(
  user: AuthUser,
  sessions: ReturnType<typeof createRepositories>["sessions"],
  env: AuthEnv,
): Promise<Response> {
  const sessionId = crypto.randomUUID();
  const ttl = Number(env.EZROME_SESSION_TTL_SECONDS) || DEFAULT_SESSION_TTL;
  await sessions.create(sessionId, user.id, Date.now() + ttl * 1000);
  return json({ user }, 200, sessionCookie(sessionId, ttl));
}

export async function resolveSession(
  request: Request,
  sessions: ReturnType<typeof createRepositories>["sessions"],
  users: ReturnType<typeof createRepositories>["users"],
): Promise<AuthUser | null> {
  const sessionId = getCookie(request, SESSION_COOKIE);
  if (!sessionId) return null;
  const session = await sessions.find(sessionId);
  if (!session) return null;
  const user = await users.findById(session.userId);
  return user ? { id: user.id, email: user.email } : null;
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function getCookie(request: Request, name: string): string | null {
  const cookie = request.headers.get("cookie") ?? "";
  const value = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
  return value ? decodeURIComponent(value) : null;
}

function sessionCookie(value: string, maxAge: number): string {
  return `${SESSION_COOKIE}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`;
}

function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`;
}

function json(body: unknown, status: number, setCookie?: string): Response {
  const response = new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(setCookie ? { "set-cookie": setCookie } : {}),
    },
  });
  return applySecurityHeaders(response);
}
