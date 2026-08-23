# EZROME AI Data Safety Contract

## Claim handling

Every production research answer should represent each important claim with:

1. claim text;
2. source/provider;
3. source URL when available;
4. publication or retrieval timestamp when available;
5. confidence/verification state;
6. whether the statement is sourced, reported, inferred or generated.

## Person and current-event research

A name-only query may trigger a structured public-information brief, but the system must not invent private plans, sensitive attributes, private contact details, precise location, or confidential information. Future plans should only be stated as plans when supported by reliable public sources.

## User content

User documents, notes, databases and prompts are private workspace data. Access must be authenticated and authorized. Do not expose one user's records to another user. Do not use user content for model training unless an explicit, lawful product consent flow exists.

## Third-party providers

AI/search provider requests must be routed through a server-side integration boundary. Secrets never ship to the browser. Provider failures must be visible to the user instead of being silently replaced with fabricated results.

## Reporting

The production AI interface must provide a visible way to report harmful, inaccurate or inappropriate output. Reports should enter a review/abuse workflow without unnecessarily retaining sensitive content.
