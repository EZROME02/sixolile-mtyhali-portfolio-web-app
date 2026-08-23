# Release Gate Design

## Goal
Provide a repository-level release gate that evaluates the exact pull-request head SHA, detects staleness when the head changes, supports human-controlled release readiness, and never merges automatically.

## Scope
- GitHub Actions is the authoritative CI/release-control environment.
- Lovable remains the development/synchronization environment.
- The gate runs Bun dependency installation, lint, TypeScript typecheck, tests when configured, and production build.
- A missing test runner is reported as not configured rather than passed; this repository currently declares `bun test` in `package.json`.
- CI debugging is diagnostic only and must not edit source files.
- Any new PR commit invalidates the prior gate result for release purposes.
- Human release approval requires the supplied SHA to equal the current PR head SHA.
- No workflow may merge, force-push, delete branches, or access production secrets.

## Components

### Release Gate
Triggered for pull-request activity and manual dispatch. It records the exact `github.event.pull_request.head.sha` for PR events, checks out that SHA, installs with Bun using the lockfile when present, runs lint, typecheck, tests, and production build. The result is tied to that SHA.

### CI Debug Agent
Triggered manually or after a failed release-gate run. It reads GitHub Actions metadata/logs with the workflow token and emits a diagnosis summary. It has read-only repository permissions and does not modify code or refs.

### Staleness Guard
Triggered when a PR head changes. It creates an explicit failed/stale signal for the old gate and explains that a fresh Release Gate run is required for the new SHA. The gate's documentation treats only the latest-head run as releasable.

### Human Release Approval
Manual dispatch accepts a PR number and expected head SHA. It queries GitHub for the current PR head and refuses to mark the PR ready unless the expected SHA exactly matches the current head and the latest release-gate workflow for that SHA succeeded. It only changes draft/readiness state; it never merges.

## Security Boundaries
- `contents: read` by default.
- `pull-requests: read` for gate/debug/staleness workflows.
- `pull-requests: write` only for the explicit human approval workflow.
- No repository or production secrets are required.
- No automatic merge or auto-merge enablement.
- No force-pushes or branch deletion.
- Debug output must not print secret values.

## Release Rule
A PR is release-ready only when the current PR head SHA has a successful Release Gate run and a human explicitly confirms that same SHA through the approval workflow. Any subsequent commit invalidates that approval and requires a new gate and human confirmation.
