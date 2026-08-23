# Release Gate Operations

The release gate is enforced in GitHub, not Lovable. Lovable remains the development/sync environment.

## Workflows

- `Release Gate`: verifies the exact PR head SHA with Bun lint, TypeScript typecheck, tests, and production build.
- `Release Gate Staleness Guard`: runs when a PR receives a new commit and intentionally marks the old release state stale. A fresh Release Gate must pass for the new SHA.
- `CI Debug Agent`: reads failed GitHub Actions logs and reports diagnostics. It has no source/ref write permission.
- `Human Release Approval`: manual, SHA-specific approval. It checks that the PR is open, the supplied SHA is still the current head, and a successful Release Gate exists for that SHA before marking a draft PR ready for review.

## Exact-SHA rule

Never treat a green check from an earlier commit as proof for a later commit. The authoritative release SHA is the current PR head. Any new commit requires a new Release Gate run and a new human approval.

## Normal release sequence

1. Push or synchronize the PR branch.
2. Let `Release Gate` run against the exact head SHA.
3. If it fails, use `CI Debug Agent` to inspect the failing run. The debug workflow does not modify code.
4. After a code change, repeat the gate because the SHA has changed.
5. When the current SHA has a successful Release Gate, a human manually runs `Human Release Approval` with the PR number and exact SHA.
6. The approval workflow may mark the draft PR ready for review. It never merges or enables auto-merge.
7. A human deliberately performs the final merge into `main` in GitHub.

## Tests

The current `package.json` declares `test: bun test`, so tests are configured for this project. If a future repository revision removes the test script, the Release Gate reports tests as `not configured` rather than treating them as passed.

## Security boundaries

- Release Gate: `contents: read`, `pull-requests: read`.
- Staleness Guard: `contents: read`, `pull-requests: read`.
- CI Debug Agent: `actions: read`, `contents: read`, `pull-requests: read`.
- Human Release Approval: `contents: read`, `actions: read`, `pull-requests: write`.
- No workflow requires production secrets.
- No workflow force-pushes, deletes branches, merges PRs, or enables auto-merge.

## Important GitHub configuration

If branch protection is configured, make `Release Gate` the required release check. Do not make the intentionally failing Staleness Guard a required check; it exists to make stale verification explicit and force operators to recognize that a new SHA needs a fresh gate.
