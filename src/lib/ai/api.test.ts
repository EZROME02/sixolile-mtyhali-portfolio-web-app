import { describe, expect, test } from "bun:test";
import { handleAiRequest } from "./api";

describe("secure AI endpoint", () => {
  test("rejects non-POST requests", async () => {
    const response = await handleAiRequest(
      new Request("https://ezrome.co.za/api/ai", { method: "GET" }),
      {},
    );
    expect(response.status).toBe(405);
    expect(response.headers.get("x-frame-options")).toBe("DENY");
  });

  test("returns explicit provider-unavailable state", async () => {
    const response = await handleAiRequest(
      new Request("https://ezrome.co.za/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json", "cf-connecting-ip": "test-client" },
        body: JSON.stringify({ query: "hello", mode: "Research" }),
      }),
      {},
    );
    const body = (await response.json()) as {
      status: string;
      provenance: { verified: boolean };
    };
    expect(response.status).toBe(200);
    expect(body.status).toBe("provider_unavailable");
    expect(body.provenance.verified).toBe(false);
  });
});
