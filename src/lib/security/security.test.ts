import { describe, expect, test } from "bun:test";
import { applySecurityHeaders } from "./http";
import { createRateLimiter } from "./rate-limit";
import { parseJsonBody } from "./request";
import { z } from "zod";

describe("security primitives", () => {
  test("adds baseline security headers", () => {
    const response = applySecurityHeaders(new Response("ok"));
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-frame-options")).toBe("DENY");
    expect(response.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
  });

  test("limits requests within a window", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(limiter.allow("client", 0)).toBe(true);
    expect(limiter.allow("client", 1)).toBe(true);
    expect(limiter.allow("client", 2)).toBe(false);
    expect(limiter.allow("client", 1001)).toBe(true);
  });

  test("rejects malformed JSON", async () => {
    const result = await parseJsonBody(new Request("https://ezrome.co.za/api/ai", { method: "POST", body: "{" }), z.object({ query: z.string() }));
    expect(result.response?.status).toBe(400);
  });

  test("rejects invalid schema", async () => {
    const result = await parseJsonBody(new Request("https://ezrome.co.za/api/ai", { method: "POST", body: JSON.stringify({ query: 42 }) }), z.object({ query: z.string() }));
    expect(result.response?.status).toBe(400);
  });
});
