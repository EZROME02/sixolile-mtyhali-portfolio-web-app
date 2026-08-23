import { describe, expect, test } from "bun:test";
import { handleWorkspaceRequest } from "./api";

describe("workspace API", () => {
  test("rejects unauthenticated workspace access", async () => {
    const response = await handleWorkspaceRequest(
      new Request("https://ezrome.co.za/api/workspace", { method: "GET" }),
      {},
    );
    expect(response.status).toBe(401);
  });
});
