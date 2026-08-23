import { describe, expect, test } from "bun:test";
import { handleAiRequest } from "./api";

describe("AI identity boundary", () => {
  test("marks anonymous AI results as non-persistent", async () => {
    const response = await handleAiRequest(
      new Request("https://ezrome.co.za/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: "test", mode: "Intelligence" }),
      }),
      {},
    );
    const payload = (await response.json()) as { authenticated?: boolean };
    expect(payload.authenticated).toBe(false);
  });
});
