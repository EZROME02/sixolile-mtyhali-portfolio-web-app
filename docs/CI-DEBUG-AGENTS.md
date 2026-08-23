# CI Debug Agents

The repository contains an `EZROME Debug Agents` workflow alongside the release quality gate.

The debug workflow runs lint and production build independently so a lint failure does not prevent build diagnostics. Both jobs capture their command output in the GitHub Actions step summary and classify common signatures such as Prettier, React Hooks, module resolution, and TypeScript failures.

The debug workflow is diagnostic-only. The separate `EZROME Quality Gates` workflow remains the release gate and must pass before Phase B can be considered verified.
