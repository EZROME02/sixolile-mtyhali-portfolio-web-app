# EZROME SEO Entity Discoverability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the EZROME portfolio a coherent, crawlable public identity connecting Sixolile Ezrome Mtyhali, EZROME, ezrome.co.za, and the portfolio's demonstrated projects.

**Architecture:** Extend the existing TanStack Start root metadata rather than replacing the current app shell. Add small, testable SEO helpers/data for JSON-LD and project metadata, static robots/sitemap assets, and crawlable project routes while preserving the existing EZROME Tech Slideshow UI and current PWA/mobile behavior.

**Tech Stack:** TanStack Start, TanStack Router, React 19, TypeScript, Bun tests, static public assets, Schema.org JSON-LD.

**Spec:** `docs/superpowers/specs/2026-08-24-ezrome-seo-entity-discoverability-design.md`

## Global Constraints

- Canonical identity: `EZROME — Sixolile Ezrome Mtyhali | AI Developer`.
- Canonical domain: `https://ezrome.co.za`.
- Do not keyword-stuff or make unsupported claims about project status.
- Preserve the existing EZROME visual design and mobile/PWA behavior.
- Clearly distinguish Built & Demonstrated work from Currently Developing roadmap items.
- Use `Person`, `Organization`, `WebSite`, and relevant `SoftwareApplication` structured data only for factual entities represented by the portfolio.
- Maintain crawlable internal links between identity, projects, and external GitHub resources.

---

### Task 1: Establish failing SEO metadata tests

**Files:**
- Create: `src/lib/seo.test.ts`
- Test: `src/lib/seo.test.ts`

**Interfaces:**
- Produces tests for the SEO constants/helpers used by the root route and project pages.

- [ ] **Step 1: Write the failing test**

Test that the canonical URL is `https://ezrome.co.za`, the primary title contains `EZROME`, `Sixolile Ezrome Mtyhali`, and `AI Developer`, and the project metadata contains the four canonical project names.

- [ ] **Step 2: Run the test to verify it fails**

Run: `bun test src/lib/seo.test.ts`
Expected: FAIL because the SEO helper/constants do not yet exist.

- [ ] **Step 3: Commit the failing test**

Commit: `test: define EZROME SEO identity contract`

---

### Task 2: Implement centralized SEO identity and structured data

**Files:**
- Create: `src/lib/seo.ts`
- Modify: `src/routes/__root.tsx`
- Test: `src/lib/seo.test.ts`

**Interfaces:**
- `SEO_SITE_URL: string`
- `SEO_SITE_TITLE: string`
- `SEO_SITE_DESCRIPTION: string`
- `SEO_PROJECTS: readonly ProjectSeoEntry[]`
- `buildStructuredData(): Record<string, unknown>`

- [ ] **Step 1: Implement the minimal constants/data required by the failing tests**

Use the canonical identity and factual project descriptions from the existing repository. Keep project status explicit.

- [ ] **Step 2: Implement `buildStructuredData()`**

Return a Schema.org graph containing a `Person` for Sixolile Ezrome Mtyhali, an `Organization` for EZROME, a `WebSite` for `https://ezrome.co.za`, and `SoftwareApplication` nodes only for applications actually represented in the repository.

- [ ] **Step 3: Wire the root route metadata to the centralized SEO values**

Replace duplicated title/description/canonical values in `src/routes/__root.tsx` with the centralized values and expose the JSON-LD graph through the document head.

- [ ] **Step 4: Run the focused test**

Run: `bun test src/lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit: `feat: centralize EZROME SEO identity`

---

### Task 3: Add crawlable project metadata and routes

**Files:**
- Create: `src/routes/projects.tsx`
- Create: `src/routes/projects/$slug.tsx`
- Modify: `src/lib/seo.ts`
- Test: `src/lib/seo.test.ts`

**Interfaces:**
- `ProjectSeoEntry` includes `slug`, `name`, `description`, `url`, `status`, and `githubUrl` where factual.
- `/projects` lists all canonical projects.
- `/projects/$slug` renders an indexable project page for a known slug.

- [ ] **Step 1: Add failing tests for the canonical project slugs and status labels**

Assert that the four canonical project entries have stable slugs and that Built & Demonstrated versus Currently Developing is explicit.

- [ ] **Step 2: Run focused tests and confirm failure**

Run: `bun test src/lib/seo.test.ts`
Expected: FAIL until the project registry is populated.

- [ ] **Step 3: Add the project registry**

Register EZROME Assist Bot, AI Productivity Assistant, EZROME Android App, and EZROME Intelligence / Rated Opinionz only where supported by the repository. Do not label roadmap-only work as live.

- [ ] **Step 4: Add `/projects` and `/projects/$slug` routes**

Make each page crawlable with descriptive headings, canonical links, internal links, and relevant GitHub links. Unknown slugs should return a not-found response rather than fabricated content.

- [ ] **Step 5: Run tests**

Run: `bun test src/lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

Commit: `feat: add crawlable EZROME project pages`

---

### Task 4: Add robots.txt and sitemap.xml

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Test: `src/lib/seo.test.ts`

**Interfaces:**
- `robots.txt` allows normal public crawling and points to `https://ezrome.co.za/sitemap.xml`.
- `sitemap.xml` contains the canonical homepage, `/projects`, and all canonical project URLs.

- [ ] **Step 1: Add failing tests for sitemap/robots requirements**

Read the static files in the test and assert the canonical host, sitemap location, and required routes.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `bun test src/lib/seo.test.ts`
Expected: FAIL because the static files are absent.

- [ ] **Step 3: Add the static files**

Use absolute canonical URLs and XML escaping where needed.

- [ ] **Step 4: Run tests**

Run: `bun test src/lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit: `feat: add EZROME crawler discovery files`

---

### Task 5: Strengthen GitHub and external identity links

**Files:**
- Modify: repository `README.md`
- Modify: relevant project READMEs identified during implementation
- Test: `src/lib/seo.test.ts` or repository content checks

**Interfaces:**
- Public project documentation points to `https://ezrome.co.za`.
- Website links back to the canonical GitHub repositories/projects where factual.

- [ ] **Step 1: Add failing repository-content assertions**

Assert the primary README contains the canonical domain and the Sixolile/EZROME identity wording.

- [ ] **Step 2: Run the check and verify failure**

Run the focused repository-content test/check and confirm the missing canonical identity link.

- [ ] **Step 3: Update README/project documentation**

Add a concise identity block and canonical website links without stuffing keywords.

- [ ] **Step 4: Re-run the check**

Expected: PASS.

- [ ] **Step 5: Commit**

Commit: `docs: connect GitHub and EZROME canonical identity`

---

### Task 6: Full verification and release handoff

**Files:**
- Modify only if verification exposes a concrete defect.

**Interfaces:**
- Existing quality/release gates remain intact.

- [ ] **Step 1: Run the focused SEO tests**

Run: `bun test src/lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 2: Run the full test suite**

Run: `bun test`
Expected: PASS.

- [ ] **Step 3: Run lint**

Run: `bun run lint`
Expected: PASS.

- [ ] **Step 4: Run the production build**

Run: `bun run build`
Expected: PASS.

- [ ] **Step 5: Inspect the generated route tree/build output**

Confirm `/projects`, project slugs, `robots.txt`, and `sitemap.xml` are included and that no existing Android/PWA assets were removed.

- [ ] **Step 6: Compare the SEO branch against main**

Confirm the diff is limited to the approved SEO/entity-discoverability scope plus tests/docs.

- [ ] **Step 7: Commit any verification-only fixes**

Use a focused `fix:` commit if required.

- [ ] **Step 8: Open a pull request**

Target: `main`.
Title: `feat: establish EZROME SEO entity discoverability`.
Include test/build evidence and explicitly state that search-engine indexing itself cannot be guaranteed by code changes alone.

---

## Self-Review Checklist

- [ ] Every requirement in the approved SEO specification maps to a task.
- [ ] No placeholder language remains in implementation steps.
- [ ] Project names/statuses match repository evidence.
- [ ] Canonical domain is exactly `https://ezrome.co.za`.
- [ ] Structured data does not claim unsupported credentials, products, or live services.
- [ ] Existing PWA, Android, mobile E2E, and release-gate behavior is preserved.
- [ ] Tests fail for the intended missing behavior before implementation and pass afterward.
