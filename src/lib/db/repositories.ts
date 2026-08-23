import type { AuthUser, Session } from "../auth/contracts";
import type { WorkspaceRecord } from "../workspace/contracts";

type UserRow = { id: string; email: string; password_hash: string };
type SessionRow = { id: string; user_id: string; expires_at: number };
type WorkspaceRow = {
  id: string;
  owner_id: string;
  name: string;
  data: string;
  updated_at: string;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function toUser(row: UserRow): AuthUser & { passwordHash: string } {
  return { id: row.id, email: row.email, passwordHash: row.password_hash };
}

export function createRepositories(db: D1Database) {
  return {
    users: {
      async create(id: string, email: string, passwordHash: string): Promise<AuthUser> {
        const normalized = normalizeEmail(email);
        await db
          .prepare("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)")
          .bind(id, normalized, passwordHash)
          .run();
        return { id, email: normalized };
      },
      async findById(id: string): Promise<(AuthUser & { passwordHash: string }) | null> {
        const row = await db
          .prepare("SELECT id, email, password_hash FROM users WHERE id = ? LIMIT 1")
          .bind(id)
          .first<UserRow>();
        return row ? toUser(row) : null;
      },
      async findByEmail(email: string): Promise<(AuthUser & { passwordHash: string }) | null> {
        const row = await db
          .prepare("SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1")
          .bind(normalizeEmail(email))
          .first<UserRow>();
        return row ? toUser(row) : null;
      },
    },
    sessions: {
      async create(id: string, userId: string, expiresAt: number): Promise<void> {
        await db
          .prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)")
          .bind(id, userId, expiresAt)
          .run();
      },
      async find(id: string): Promise<Session | null> {
        const row = await db
          .prepare("SELECT id, user_id, expires_at FROM sessions WHERE id = ? LIMIT 1")
          .bind(id)
          .first<SessionRow>();
        if (!row || row.expires_at <= Date.now()) return null;
        return { id: row.id, userId: row.user_id, expiresAt: row.expires_at };
      },
      async delete(id: string): Promise<void> {
        await db.prepare("DELETE FROM sessions WHERE id = ?").bind(id).run();
      },
    },
    workspaces: {
      async findOwned(id: string, ownerId: string): Promise<WorkspaceRecord | null> {
        const row = await db
          .prepare(
            "SELECT id, owner_id, name, data, updated_at FROM workspaces WHERE id = ? AND owner_id = ? LIMIT 1",
          )
          .bind(id, ownerId)
          .first<WorkspaceRow>();
        return row
          ? {
              id: row.id,
              ownerId: row.owner_id,
              name: row.name,
              data: row.data,
              updatedAt: row.updated_at,
            }
          : null;
      },
      async upsert(
        id: string,
        ownerId: string,
        name: string,
        data: string,
        updatedAt: string,
      ): Promise<void> {
        await db
          .prepare(
            "INSERT INTO workspaces (id, owner_id, name, data, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET name = excluded.name, data = excluded.data, updated_at = excluded.updated_at WHERE workspaces.owner_id = excluded.owner_id",
          )
          .bind(id, ownerId, name, data, updatedAt)
          .run();
      },
    },
  };
}
