import { describe, expect, test } from "bun:test";
import { canAccessWorkspace } from "./contracts";

describe("workspace ownership", () => {
  test("allows the owner and rejects a different user", () => {
    expect(canAccessWorkspace({ ownerId: "user-a" }, "user-a")).toBe(true);
    expect(canAccessWorkspace({ ownerId: "user-a" }, "user-b")).toBe(false);
  });
});
