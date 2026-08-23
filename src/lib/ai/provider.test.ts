import { describe, expect, test } from "bun:test";
import { runAiProvider } from "./provider";

const request = { query: "What is EZROME?", mode: "Research" as const };

describe("AI provider boundary", () => {
  test("does not call a provider when secrets are missing", async () => {
    let calls = 0;
    const result = await runAiProvider(request, {}, async () => {
      calls += 1;
      return new Response();
    });
    expect(calls).toBe(0);
    expect(result.status).toBe("provider_unavailable");
    expect(result.provenance.verified).toBe(false);
  });

  test("normalizes a provider response without exposing the key", async () => {
    let authorization = "";
    const result = await runAiProvider(request, {
      EZROME_AI_BASE_URL: "https://provider.example",
      EZROME_AI_API_KEY: "secret-test-key",
      EZROME_AI_MODEL: "test-model",
    }, async (_input, init) => {
      authorization = new Headers(init?.headers).get("authorization") ?? "";
      return new Response(JSON.stringify({ choices: [{ message: { content: "Generated answer" } }] }), { status: 200, headers: { "content-type": "application/json" } });
    });
    expect(result.answer).toBe("Generated answer");
    expect(result.status).toBe("generated");
    expect(JSON.stringify(result)).not.toContain("secret-test-key");
    expect(authorization).toBe("Bearer secret-test-key");
  });
});
