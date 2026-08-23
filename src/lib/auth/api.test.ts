import { describe, expect, test } from "bun:test";
import { handleAuthRequest } from "./api";

describe("authentication API", () => {
  test("fails closed when durable database storage is not configured", async () => {
    const response = await handleAuthRequest(
      new Request("https://ezrome.co.za/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://ezrome.co.za" },
        body: JSON.stringify({ email: "owner@example.com", password: "Correct-Horse-Battery-Staple-42" }),
      }),
      {},
    );
    expect(response.status).toBe(503);
  });
});
