# EZROME Platform Foundation

**Canonical domain:** https://ezrome.co.za  
**Brand:** EZROME  
**Flagship product:** EZROME AI  
**Founder:** Sixolile Ezrome Mtyhali

## Phase A secure boundary

The browser calls `POST /api/ai`; provider credentials remain server-only. Requests are schema-validated, size-limited, rate-limited, and returned with baseline security headers. Provider responses are normalized into explicit AI/provenance states.

Server-only configuration names:

- `EZROME_AI_BASE_URL`
- `EZROME_AI_API_KEY`
- `EZROME_AI_MODEL`

Secret values must never be committed or exposed through `VITE_*` client variables.

When provider configuration is absent, EZROME returns `provider_unavailable` rather than fabricating a live research result.

## Product surfaces

- EZROME AI — source-aware intelligence and productivity workspace.
- WWW Intelligence — planned live web retrieval, citations, freshness and saved research.
- Run Mode — planned persistent jobs with start, stop, pause, retry and status.
- EZROME Office — planned documents, spreadsheets, structured databases and file workflows.
- Business — planned invoicing, payroll, accounting, expenses and audit trails.
- Learning Hub — security, copyright, licensing, data protection, malware awareness, development, data representation and binary fundamentals.
- Portfolio — professional identity and project showcase.

## AI trust model

EZROME must distinguish verified facts, reported information and AI analysis. The UI must never imply that a demo response is a live search result. Production retrieval must attach source, publication/freshness metadata and provider status to claims.

For people and current events, EZROME is a public-information research assistant. It must not aggregate or expose sensitive private data, infer private intentions as facts, or present predictions as confirmed plans.

## Security baseline

- Keep provider API keys and billing secrets server-side.
- Validate server inputs with schemas.
- Apply authentication and authorization to private workspaces.
- Protect state-changing requests with CSRF defenses where applicable.
- Rate-limit expensive AI/search operations.
- Log security-relevant events without storing unnecessary personal data.
- Provide account deletion and data export flows where accounts are implemented.
- Scan and constrain uploaded files before processing.
- Add abuse reporting and AI-output feedback/reporting.
- Maintain dependency and secret scanning in CI.

## Google Play readiness

This repository is a web/PWA foundation and is not itself a completed Play release. Before production Android publication, complete native packaging, current target API requirements, Play Console verification, privacy policy, Data Safety declarations, AI content reporting, account/data controls, billing implementation, closed testing requirements where applicable, store listing disclosures, and release signing.

Never claim Google approval until the Play Console review has actually completed successfully.

## Monetization architecture

Free, Pro and Business are product entitlements. Digital features distributed through Google Play should use the applicable Play billing mechanism unless a documented Google program/exception applies. Entitlements must be verified server-side and never granted solely from a client-side flag.

## Next release-gated phases

Authentication/workspaces, persistent storage, retrieval/source adapters, business tools, billing, and Android packaging remain separate phases and must not be treated as complete merely because the Phase A API boundary is implemented.
