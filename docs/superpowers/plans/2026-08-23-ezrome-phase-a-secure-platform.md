# EZROME Phase A Secure Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a secure server-side AI boundary for EZROME without exposing provider credentials or claiming live retrieval when providers are not configured.

**Architecture:** Preserve the existing TanStack Start/Vite application and add a small server-side API boundary in `src/server.ts`. Security primitives live in focused `src/lib/security/*` modules; AI provider calls are isolated behind `src/lib/ai/*` and use server-only environment variables. The browser receives structured, source-aware responses and explicit provider-unavailable states.

**Tech Stack:** TypeScript, TanStack Start, Bun, Zod, native Fetch API.

**Spec:** `docs/EZROME_PLATFORM.md`, `docs/AI_DATA_SAFETY.md`, `docs/GOOGLE_PLAY_READINESS.md`.

## Global Constraints

- Never expose AI provider keys or other server secrets to browser JavaScript.
- Do not commit real credentials, tokens, signing keys, or database passwords.
- Preserve the existing EZROME UI/design language.
- AI output must be labelled and must not be represented as verified fact without provenance.
- Provider-unavailable states must be explicit; demo text must not masquerade as live research.
- `main` remains untouched; all implementation occurs on `feat/ezrome-ai-platform`.
- Every new security primitive must have a deterministic test.

---

### Task 1: Add server-side security primitives

**Files:**
- Create: `src/lib/security/http.ts`
- Create: `src/lib/security/rate-limit.ts`
- Create: `src/lib/security/request.ts`
- Test: `src/lib/security/security.test.ts`

**Interfaces:**
- `applySecurityHeaders(response: Response): Response`
- `createRateLimiter(options): { allow(key, now?): boolean }`
- `parseJsonBody(request, schema)` returns validated Zod data or a 400 response.

- [ ] Write tests covering security headers, bounded rate limiting, invalid JSON, oversized body rejection, and schema validation.
- [ ] Run `bun test src/lib/security/security.test.ts` and confirm the tests fail before implementation.
- [ ] Implement the minimal primitives using only Web APIs and Zod.
- [ ] Run the same test command and require all tests to pass.
- [ ] Commit with `feat: add server security primitives`.

### Task 2: Add source-aware AI contracts and provider adapter

**Files:**
- Create: `src/lib/ai/contracts.ts`
- Create: `src/lib/ai/provider.ts`
- Test: `src/lib/ai/provider.test.ts`

**Interfaces:**
- `AiRequestSchema` validates `query`, `mode`, and bounded input length.
- `AiResult` contains `answer`, `status`, `provenance`, and `generatedAt`.
- `runAiProvider(request, env)` performs a server-only Fetch call when `EZROME_AI_BASE_URL`, `EZROME_AI_API_KEY`, and `EZROME_AI_MODEL` are configured; otherwise returns `provider_unavailable` without making a network call.

- [ ] Write tests for provider-unavailable behavior, secret omission from returned data, and successful normalization of a provider response.
- [ ] Run `bun test src/lib/ai/provider.test.ts` and confirm failure before implementation.
- [ ] Implement provider isolation and structured provenance/status metadata.
- [ ] Run the tests and require all tests to pass.
- [ ] Commit with `feat: add source-aware ai provider boundary`.

### Task 3: Wire the secure `/api/ai` endpoint

**Files:**
- Modify: `src/server.ts`
- Test: `src/lib/ai/api.test.ts`

**Interfaces:**
- `POST /api/ai` accepts JSON matching `AiRequestSchema`.
- Responses are JSON with `status`, `answer`, `provenance`, and `generatedAt`.
- The endpoint applies security headers and per-client rate limiting.
- Non-POST requests return 405; malformed/oversized requests return 400/413; rate-limited requests return 429.

- [ ] Write endpoint-handler tests around method validation, request validation, rate limiting, and provider-unavailable behavior.
- [ ] Run tests and confirm failure before wiring the endpoint.
- [ ] Add the endpoint before delegating to the existing SSR handler; never put provider credentials in the route component.
- [ ] Run endpoint tests and lint.
- [ ] Commit with `feat: expose secure ezrome ai endpoint`.

### Task 4: Connect the existing AI workspace to the secure boundary

**Files:**
- Modify: `src/routes/ai.tsx`
- Test: `src/routes/ai.test.tsx` only if the repository already has a compatible component-test setup; otherwise verify through build/typecheck and endpoint tests.

**Interfaces:**
- The UI calls `POST /api/ai` and renders the returned status/provenance.
- The UI never reads `EZROME_AI_API_KEY` or any server environment variable.
- Provider-unavailable status is shown as configuration state, not as a research result.

- [ ] Replace the timer-based demo execution with the secure endpoint call.
- [ ] Preserve the existing controls and visual design.
- [ ] Add explicit labels for AI-generated, source-backed, and provider-unavailable states.
- [ ] Run lint and build.
- [ ] Commit with `feat: connect ai workspace to secure api`.

### Task 5: Add release/security documentation and verification workflow

**Files:**
- Modify: `docs/AI_DATA_SAFETY.md`
- Modify: `docs/GOOGLE_PLAY_READINESS.md`
- Create: `.github/workflows/ezrome-quality.yml`

**Interfaces:**
- CI runs lint, build, and Bun tests on pushes and pull requests.
- Documentation states that provider secrets are server-only and identifies the required production environment variables without containing values.

- [ ] Add the exact verification commands to CI.
- [ ] Add environment-variable names without secret values.
- [ ] Run the same CI commands locally where tooling permits.
- [ ] Commit with `ci: add ezrome phase a quality gates`.

### Final Verification

- [ ] `bun test`
- [ ] `bun run lint`
- [ ] `bun run build`
- [ ] Inspect the diff for accidental credentials or client-side secret references.
- [ ] Confirm `main` has not been modified.
- [ ] Confirm the branch remains `feat/ezrome-ai-platform` and the draft PR remains separate.
