export type AuthUser = {
  id: string;
  email: string;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: number;
};

export type AuthEnv = {
  DB?: D1Database;
  EZROME_SESSION_TTL_SECONDS?: string;
};

declare global {
  interface D1Database {
    prepare(query: string): D1PreparedStatement;
  }

  interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    first<T = unknown>(): Promise<T | null>;
    run(): Promise<unknown>;
  }
}
