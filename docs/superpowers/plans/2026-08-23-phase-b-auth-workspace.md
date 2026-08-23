# Phase B Authentication & Persistent Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a secure server-side account boundary and a durable, ownership-scoped EZROME workspace without merging into `main`.

**Architecture:** Use Cloudflare-compatible Web Crypto password hashing and opaque server-side sessions stored in a D1-compatible database binding. Workspace records are accessed only after the authenticated user is resolved server-side; browser code never receives password hashes, session tokens, provider credentials, or database credentials. If the production database binding is absent, account/workspace endpoints fail closed with a clear `503` rather than falling back to insecure in-memory persistence.

**Tech Stack:** TanStack Start, React, TypeScript, Bun tests, Zod, Cloudflare-compatible Web Crypto, D1-compatible SQL binding.

**Spec:** Approved Phase B design in the conversation: authentication boundary, persistent workspace, authenticated AI integration, authorization/security tests, and full Bun quality gate.

## Global Constraints

- Keep `feat/ezrome-ai-platform` separate from `main`.
- Do not merge the PR automatically.
- Provider credentials remain server-side.
- Missing production infrastructure must fail closed; never silently use insecure persistence.
- Every authenticated workspace operation must enforce ownership server-side.
- Passwords are never stored or logged in plaintext.
- Session cookies must be `HttpOnly`, `Secure`, `SameSite=Strict`, and path-scoped.
- AI responses retain explicit provenance and `provider_unavailable` behavior.
- Run Bun tests, lint, and production build before declaring Phase B verified.

---

### Task 1: Authentication and workspace security contracts

**Files:**
- Create: `src/lib/auth/contracts.ts`
- Create: `src/lib/auth/crypto.ts`
- Create: `src/lib/workspace/contracts.ts`
- Create: `src/lib/auth/crypto.test.ts`
- Create: `src/lib/workspace/contracts.test.ts`

**Interfaces:**
- `hashPassword(password: string): Promise<string>`
- `verifyPassword(password: string, encoded: string): Promise<boolean>`
- Workspace ownership checks accept an authenticated `userId` and record `userId`.

- [ ] **Step 1: Write failing tests** for password hashing/verification and ownership predicates.
- [ ] **Step 2: Run the focused tests** and confirm they fail because the new modules do not exist.
- [ ] **Step 3: Implement the minimal contracts and Web Crypto PBKDF2 implementation.**
- [ ] **Step 4: Re-run focused tests** and confirm green.
- [ ] **Step 5: Commit** `feat: add Phase B auth security primitives`.

### Task 2: Durable database schema and repositories

**Files:**
- Create: `database/schema.sql`
- Create: `src/lib/db/types.ts`
- Create: `src/lib/db/repositories.ts`
- Create: `src/lib/db/repositories.test.ts`

**Interfaces:**
- `UserRepository` creates and finds users by normalized email.
- `SessionRepository` creates, finds, and deletes opaque sessions.
- `WorkspaceRepository` reads/writes a workspace only when the supplied owner ID matches.

- [ ] **Step 1: Write failing repository tests** using an in-memory test double implementing the D1 statement interface.
- [ ] **Step 2: Run focused repository tests** and verify expected failures.
- [ ] **Step 3: Implement SQL schema and repository functions.**
- [ ] **Step 4: Re-run repository tests** and confirm green.
- [ ] **Step 5: Commit** `feat: add durable auth and workspace repositories`.

### Task 3: Server-side authentication API

**Files:**
- Create: `src/lib/auth/api.ts`
- Modify: `src/server.ts`
- Create: `src/lib/auth/api.test.ts`

**Interfaces:**
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

- [ ] **Step 1: Write failing API tests** for signup, login, logout, missing DB fail-closed behavior, and secure cookie attributes.
- [ ] **Step 2: Run focused tests** and confirm failures.
- [ ] **Step 3: Implement the API using repositories, rate limiting, origin checks, secure opaque cookies, and generic login errors.**
- [ ] **Step 4: Re-run focused tests** and confirm green.
- [ ] **Step 5: Commit** `feat: add secure account session API`.

### Task 4: Authenticated workspace API

**Files:**
- Create: `src/lib/workspace/api.ts`
- Modify: `src/server.ts`
- Create: `src/lib/workspace/api.test.ts`

**Interfaces:**
- `GET /api/workspace`
- `PUT /api/workspace`

- [ ] **Step 1: Write failing authorization tests** proving unauthenticated requests are rejected and one user cannot access another user's workspace.
- [ ] **Step 2: Run focused tests** and verify failure.
- [ ] **Step 3: Implement session resolution followed by owner-scoped repository access.**
- [ ] **Step 4: Re-run focused tests** and confirm green.
- [ ] **Step 5: Commit** `feat: add owner-scoped workspace API`.

### Task 5: Authenticated workspace UI and AI identity boundary

**Files:**
- Create: `src/routes/login.tsx`
- Create: `src/routes/workspace.tsx`
- Modify: `src/routes/ai.tsx`
- Modify: `src/lib/ai/api.ts`
- Create: `src/lib/ai/auth-boundary.test.ts`

**Interfaces:**
- Login UI consumes `/api/auth/login` and `/api/auth/me`.
- Workspace UI consumes `/api/workspace`.
- AI requests resolve the authenticated user before allowing future persistence hooks; anonymous AI remains explicitly non-persistent.

- [ ] **Step 1: Write failing AI identity-boundary tests.**
- [ ] **Step 2: Run tests and verify failure.**
- [ ] **Step 3: Implement the minimal authenticated boundary and UI.**
- [ ] **Step 4: Run all tests, lint, and build.**
- [ ] **Step 5: Commit** `feat: connect authenticated EZROME workspace`.

### Task 6: Release-gate verification

**Files:**
- Modify: `docs/superpowers/plans/2026-08-23-phase-b-auth-workspace.md`
- Modify: `README.md` if production database setup needs documentation.

- [ ] **Step 1: Run `bun test`.**
- [ ] **Step 2: Run `bun run lint`.**
- [ ] **Step 3: Run `bun run build`.**
- [ ] **Step 4: Inspect the GitHub Actions result and confirm no secrets are exposed.**
- [ ] **Step 5: Leave PR #1 open and unmerged; report the exact gate status.**
