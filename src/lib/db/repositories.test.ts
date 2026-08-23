import { describe, expect, test } from "bun:test";
import { createRepositories } from "./repositories";

function database() {
  const rows = new Map<string, Record<string, unknown>>();
  return {
    prepare(query: string) {
      let values: unknown[] = [];
      return {
        bind(...bound: unknown[]) {
          values = bound;
          return this;
        },
        async first<T>() {
          if (query.includes("FROM users WHERE email")) {
            return (rows.get(`user:${values[0]}`) ?? null) as T | null;
          }
          if (query.includes("FROM sessions")) {
            return (rows.get(`session:${values[0]}`) ?? null) as T | null;
          }
          if (query.includes("FROM workspaces")) {
            const row = rows.get(`workspace:${values[0]}`);
            return row && row.owner_id === values[1] ? (row as T) : null;
          }
          return null;
        },
        async run() {
          if (query.startsWith("INSERT INTO users")) {
            rows.set(`user:${values[1]}`, {
              id: values[0],
              email: values[1],
              password_hash: values[2],
            });
          }
          if (query.startsWith("INSERT INTO sessions")) {
            rows.set(`session:${values[0]}`, {
              id: values[0],
              user_id: values[1],
              expires_at: values[2],
            });
          }
          if (query.startsWith("INSERT INTO workspaces")) {
            rows.set(`workspace:${values[0]}`, {
              id: values[0],
              owner_id: values[1],
              name: values[2],
              data: values[3],
              updated_at: values[4],
            });
          }
          return {};
        },
      };
    },
  } as D1Database;
}

describe("durable repositories", () => {
  test("creates users, sessions and owner-scoped workspaces", async () => {
    const repos = createRepositories(database());
    const user = await repos.users.create("user-1", "owner@example.com", "hash");
    expect(user.email).toBe("owner@example.com");
    await repos.sessions.create("session-1", "user-1", Date.now() + 60_000);
    expect((await repos.sessions.find("session-1"))?.userId).toBe("user-1");
    await repos.workspaces.upsert(
      "workspace-1",
      "user-1",
      "My Workspace",
      "{}",
      new Date().toISOString(),
    );
    expect((await repos.workspaces.findOwned("workspace-1", "user-1"))?.ownerId).toBe("user-1");
    expect(await repos.workspaces.findOwned("workspace-1", "user-2")).toBeNull();
  });
});
