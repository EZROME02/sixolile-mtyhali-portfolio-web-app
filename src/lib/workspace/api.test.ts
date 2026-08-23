import { describe, expect, test } from "bun:test";
import { handleWorkspaceRequest } from "./api";

describe("workspace API", () => {
  test("rejects unauthenticated workspace access", async () => {
    const response = await handleWorkspaceRequest(
      new Request("https://ezrome.co.za/api/workspace", { method: "GET" }),
      {
        DB: {
          prepare() {
            throw new Error("session lookup should not run without a cookie");
          },
        } as D1Database,
      },
    );
    expect(response.status).toBe(401);
  });
});
