# Release Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build four GitHub Actions workflows that make release verification SHA-specific, stale-safe, diagnostically useful, and human-approved without automatic merging.

**Architecture:** GitHub Actions is the authoritative release-control layer. The Release Gate checks the exact PR head SHA and runs Bun lint, typecheck, tests, and build; the Staleness Guard invalidates release readiness on every new PR commit; CI Debug is read-only; Human Release Approval verifies the current SHA and successful gate before marking a draft PR ready.

**Tech Stack:** GitHub Actions, Bun, TypeScript, GitHub CLI, repository `GITHUB_TOKEN`.

**Spec:** `docs/superpowers/specs/2026-08-23-release-gate-design.md`

## Global Constraints

- Release verification is valid only for the exact current PR head SHA.
- No automatic merge or auto-merge enablement.
- No force-pushes or branch deletion.
- No production-secret access.
- Missing test infrastructure is reported as not configured, never as passed.
- CI Debug Agent is diagnostic-only and cannot modify source code.
- Human approval must match the current PR head SHA and a successful gate for that SHA.

---

### Task 1: Release Gate workflow

**Files:**
- Create: `.github/workflows/release-gate.yml`

**Interfaces:**
- Consumes: pull-request SHA, repository source, `package.json`, Bun lockfile when present.
- Produces: successful/failed GitHub check for the exact PR head SHA.

- [ ] **Step 1: Create the workflow with pull-request triggers and manual dispatch.**
- [ ] **Step 2: Check out the exact event PR head SHA, not a moving branch ref.**
- [ ] **Step 3: Install Bun and dependencies using the lockfile when present.**
- [ ] **Step 4: Run `bun run lint`.**
- [ ] **Step 5: Run `bunx tsc --noEmit` because the current package scripts do not expose a typecheck script.**
- [ ] **Step 6: Run `bun test` and explicitly report `not configured` if no test runner exists.**
- [ ] **Step 7: Run `bun run build`.**
- [ ] **Step 8: Verify the workflow syntax and inspect the resulting commit.**

### Task 2: Staleness Guard

**Files:**
- Create: `.github/workflows/staleness-guard.yml`

**Interfaces:**
- Consumes: `pull_request.synchronize` and current PR SHA.
- Produces: an explicit stale/invalidation check requiring a fresh release gate.

- [ ] **Step 1: Trigger on PR synchronization.**
- [ ] **Step 2: Emit the current SHA and state that previous approval is invalid.**
- [ ] **Step 3: Fail the stale signal intentionally so branch protection cannot treat the old approval as current.**
- [ ] **Step 4: Keep permissions read-only.**

### Task 3: CI Debug Agent

**Files:**
- Create: `.github/workflows/ci-debug.yml`

**Interfaces:**
- Consumes: failed workflow-run metadata and GitHub Actions logs.
- Produces: diagnostic output only.

- [ ] **Step 1: Trigger manually and on failed Release Gate workflow runs.**
- [ ] **Step 2: Grant only `actions: read`, `contents: read`, and `pull-requests: read`.**
- [ ] **Step 3: Use `gh run view --log-failed` to summarize failing steps without editing files.**
- [ ] **Step 4: Explicitly state that the workflow has no write capability over repository content or refs.**

### Task 4: Human Release Approval

**Files:**
- Create: `.github/workflows/human-release-approval.yml`

**Interfaces:**
- Consumes: manually supplied PR number and expected head SHA.
- Produces: PR readiness transition only after exact SHA and gate verification.

- [ ] **Step 1: Trigger only with `workflow_dispatch`.**
- [ ] **Step 2: Query the PR and compare its current head SHA with the supplied SHA.**
- [ ] **Step 3: Query Actions runs for the Release Gate and require a successful run for that exact SHA.**
- [ ] **Step 4: Require `pull-requests: write` only in this workflow.**
- [ ] **Step 5: Mark the PR ready for review through `gh pr ready` only after all checks pass.**
- [ ] **Step 6: Never call merge or enable auto-merge.**

### Task 5: Release Gate documentation

**Files:**
- Create: `docs/RELEASE_GATE.md`

**Interfaces:**
- Consumes: workflow behavior and release rules.
- Produces: operator instructions for running and interpreting the gate.

- [ ] **Step 1: Document the four workflows and their permissions.**
- [ ] **Step 2: Document exact-SHA verification and staleness behavior.**
- [ ] **Step 3: Document manual human approval and the deliberate final GitHub merge.**
- [ ] **Step 4: Document that no production secrets are required.**

### Task 6: Final verification

**Files:**
- Verify only; no source changes expected unless a workflow failure identifies a concrete defect.

- [ ] **Step 1: Fetch the latest `feat/ezrome-ai-platform` head SHA.**
- [ ] **Step 2: Inspect workflow files at that SHA.**
- [ ] **Step 3: Confirm GitHub Actions runs exist for the new commit.**
- [ ] **Step 4: Inspect each run's conclusion and logs.**
- [ ] **Step 5: If CI fails, diagnose the reported failure and change only the failing workflow/code.**
- [ ] **Step 6: Re-run until the latest SHA has a verified gate or report the concrete blocker without claiming success.**
