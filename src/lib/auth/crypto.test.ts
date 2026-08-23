import { describe, expect, test } from "bun:test";
import { hashPassword, verifyPassword } from "./crypto";

describe("password security", () => {
  test("hashes a password without storing the plaintext and verifies the original", async () => {
    const encoded = await hashPassword("Correct-Horse-Battery-Staple-42");

    expect(encoded).not.toContain("Correct-Horse-Battery-Staple-42");
    expect(await verifyPassword("Correct-Horse-Battery-Staple-42", encoded)).toBe(true);
    expect(await verifyPassword("wrong-password", encoded)).toBe(false);
  });
});
