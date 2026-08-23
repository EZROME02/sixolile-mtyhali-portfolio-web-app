# EZROME PR Agent

The EZROME PR Agent is a GitHub Actions automation layer for phone-first development.

## Responsibilities

- Observe pull request lifecycle events.
- Identify the exact current PR head SHA.
- Monitor the Release Gate workflow for that same SHA.
- Report PASS, FAIL, or STALE status in the PR conversation.
- Require fresh verification after every new commit.
- Keep release decisions visible to the human maintainer.

## Safety boundary

The agent MUST NOT:

- merge pull requests;
- approve its own release;
- force-push;
- delete branches;
- bypass required checks;
- treat missing tests as passing;
- reuse a green result from an older SHA;
- modify application code to repair CI failures;
- access production secrets.

## Release authority

The Release Gate is the authoritative technical verification. A green result is valid only for the exact current PR head SHA. Human approval remains the final release decision, and merging into `main` remains a deliberate GitHub action.

## CI failure handling

The PR Agent reports failures. The CI Debug Agent may diagnose failures, but diagnosis does not grant permission to modify application code or bypass the gate.

## Phone-first operation

The maintainer can use GitHub from a phone to review PR comments, inspect workflow results, and make the final release decision. No desktop environment is required for normal PR-agent operation.
