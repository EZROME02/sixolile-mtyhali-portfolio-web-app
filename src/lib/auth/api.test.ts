import { describe, expect, test } from "bun:test";
import { handleAuthRequest } from "./api";

function emptyDatabase(): D1Database {
  return {
    prepare() {
      const statement = {
        bind() {
          return statement;
        },
        async first() {
          return null;
        },
        async run() {
          return {};
        },
      };
      return statement;
    },
  } as D1Database;
}

describe("authentication API", () => {
  test("fails closed when durable database storage is not configured", async () => {
    const response = await handleAuthRequest(
      new Request("https://ezrome.co.za/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://ezrome.co.za" },
        body: JSON.stringify({
          email: "owner@example.com",
          password: "Correct-Horse-Battery-Staple-42",
        }),
      }),
      {},
    );
    expect(response.status).toBe(503);
  });

  test("sets an opaque secure session cookie after signup", async () => {
    const response = await handleAuthRequest(
      new Request("https://ezrome.co.za/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://ezrome.co.za" },
        body: JSON.stringify({
          email: "owner@example.com",
          password: "Correct-Horse-Battery-Staple-42",
        }),
      }),
      { DB: emptyDatabase() },
    );
    const cookie = response.headers.get("set-cookie") ?? "";
    expect(response.status).toBe(200);
    expect(cookie).toContain("ezrome_session=");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain("SameSite=Strict");
  });
});
