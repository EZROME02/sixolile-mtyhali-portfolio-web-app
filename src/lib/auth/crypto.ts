const PBKDF2_ITERATIONS = 210_000;
const HASH_BYTES = 32;
const SALT_BYTES = 16;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - (normalized.length % 4)) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function derive(password: string, salt: Uint8Array): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const saltBuffer = salt.slice().buffer;
  return crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltBuffer, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    key,
    HASH_BYTES * 8,
  );
}

export async function hashPassword(password: string): Promise<string> {
  if (password.length < 12 || password.length > 128) {
    throw new Error("Invalid password length");
  }
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const digest = new Uint8Array(await derive(password, salt));
  return `pbkdf2-sha256$${PBKDF2_ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(digest)}`;
}

export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  try {
    const parts = encoded.split("$");
    if (parts.length !== 4) return false;
    const [algorithm, iterationsText, saltText, digestText] = parts;
    if (!algorithm || !iterationsText || !saltText || !digestText) return false;
    if (algorithm !== "pbkdf2-sha256" || Number(iterationsText) !== PBKDF2_ITERATIONS) {
      return false;
    }
    const salt = fromBase64Url(saltText);
    const expected = fromBase64Url(digestText);
    const actual = new Uint8Array(await derive(password, salt));
    if (actual.length !== expected.length) return false;
    let difference = 0;
    for (let index = 0; index < actual.length; index += 1) {
      difference |= (actual[index] ?? 0) ^ (expected[index] ?? 0);
    }
    return difference === 0;
  } catch {
    return false;
  }
}
