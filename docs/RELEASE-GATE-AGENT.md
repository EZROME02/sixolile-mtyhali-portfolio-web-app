# EZROME Release Gate Agent

## Purpose

The Release Gate Agent is a controlled CI/release orchestrator. It is designed to prevent an old green CI run from being treated as proof for a newer commit.

## Rules

1. PR #1 stays open and draft while release verification is incomplete.
2. Every quality result is tied to an exact commit SHA.
3. A later commit invalidates the earlier verification.
4. The final gate runs `bun install --frozen-lockfile`, `bun test`, `bun run lint`, and `bun run build`.
5. Lint/build failures are diagnosed by the dedicated debug workflows before release is reconsidered.
6. The release workflow does not merge automatically after an ordinary CI pass.
7. A controlled `workflow_dispatch` release requires an explicit `release=true` input and the exact expected PR head SHA.
8. Immediately before merge, the agent re-checks the PR head SHA and reruns the full quality gate against that exact SHA.
9. Only then may the PR be marked ready for review and merged into `main`.
10. The feature branch is not force-pushed or deleted by the release agent.

## Why this solves the current blocker

The previous release-gate problem was that CI could be green for one commit while the repository had moved forward. This workflow makes the SHA the source of truth. Documentation-only commits are therefore tested just like code commits, and stale verification cannot authorize a merge.

## Human control

The release action is intentionally opt-in. No workflow triggered by a normal push or pull request can merge `main`. A human must deliberately dispatch the release workflow and provide the exact SHA they intend to release.
