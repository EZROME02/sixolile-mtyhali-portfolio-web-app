# EZROME Tech Intelligence + PWA + Android Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the Tech Slideshow portfolio experience with the existing portfolio functionality, shared EZROME intelligence, mobile swipe navigation, resilient PWA behavior, verified Android packaging, and end-to-end CV/navigation tests without weakening protected production release controls.

**Architecture:** Keep the existing portfolio route and Projects experience as the functional source of truth. Centralize intelligence data in a typed module, add navigation behavior at the root so existing section markup remains intact, and use a small first-party service worker for offline application-shell caching. Android production signing/release workflows remain unchanged and are verified only through GitHub Actions.

**Tech Stack:** React 19, TanStack Router/Start, Vite, TypeScript, Tailwind CSS, GitHub Actions, Android Gradle tooling, Bun.

**Spec:** Approved in-chat design on 2026-08-23.

## Global Constraints

- Tech Slideshow is the visual/design direction while existing portfolio functionality remains intact.
- Existing Projects behavior and layout must not be replaced by the navigation enhancement.
- Production signing/release workflows and secrets remain protected and untouched.
- Android debug/package verification must not be represented as a production release.
- Production artifacts may only be called released after real CI verification succeeds.
- The exact recruiter-facing CV action wording required by the current task is **Download CV**.
- Swipe navigation must distinguish horizontal swipes from normal vertical scrolling.

---

### Task 1: Central intelligence data model

**Files:**
- Create: `src/lib/intelligence.ts`
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Produces typed `IntelligenceItem`, `IntelligenceDomain`, `EZROME_INTELLIGENCE`, and `getIntelligenceByDomain`.
- The Technology Intelligence section consumes the centralized collection instead of a private route-local duplicate.

- [ ] Replace the route-local intelligence array with the shared module.
- [ ] Preserve AI workplace, football, human-control, and practical-outcome entries.
- [ ] Keep intelligence rendering resilient when the collection is empty.

### Task 2: Mobile-first swipe navigation

**Files:**
- Create: `src/hooks/useSwipeSectionNavigation.ts`
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- Consumes section elements matching `main section[id]`.
- Produces smooth adjacent-section navigation for horizontal swipes.

- [x] Add touch start/end tracking with a horizontal-distance threshold.
- [x] Ignore primarily vertical gestures.
- [x] Navigate only between existing sections so Projects markup is unchanged.
- [ ] Add automated E2E coverage for forward and backward swipes.

### Task 3: PWA offline support

**Files:**
- Create: `public/manifest.webmanifest`
- Create: `public/sw.js`
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- Browser consumes the manifest and service worker from the same origin.
- Service worker caches the application shell and falls back to cached content when network requests fail.

- [x] Add installable manifest metadata.
- [x] Register service worker from the root component.
- [x] Cache shell resources and successful same-origin GET responses.
- [x] Remove obsolete cache versions during activation.
- [ ] Add automated offline/loading/error verification.

### Task 4: Android packaging verification

**Files:**
- Inspect: `android/**`
- Verify: `.github/workflows/android-build-verify.yml`
- Verify: `.github/workflows/smtyhali-production-release-agent.yml`

**Interfaces:**
- Produces a confirmed debug/package build only after a real CI run verifies the artifact.
- Production signing remains behind the existing protected environment and secret gate.

- [ ] Verify Gradle/Android SDK/tool versions and package identity.
- [ ] Verify APK/AAB output exists and is non-empty.
- [ ] Verify artifact metadata and SHA-256 in CI.
- [ ] Confirm production signing remains fail-closed and untouched.

### Task 5: End-to-end navigation and CV behavior

**Files:**
- Create/modify: repository E2E test configuration and tests according to the existing test infrastructure.
- Modify: `src/routes/index.tsx`

**Interfaces:**
- E2E suite validates mobile swipe navigation and exact CV CTA wording/behavior.

- [ ] Use the exact visible text **Download CV**.
- [ ] Verify the CV action targets the canonical CV asset.
- [ ] Verify swipe navigation changes section without destroying Projects layout.
- [ ] Verify both forward and backward navigation.

### Task 6: Full verification and publication

**Files:**
- Verify only until a concrete test failure requires a source correction.

- [ ] Run lint.
- [ ] Run typecheck.
- [ ] Run unit/E2E tests.
- [ ] Run production build.
- [ ] Run Android package verification.
- [ ] Confirm the exact release SHA has a successful Actions gate.
- [ ] Require protected production approval before signing/publishing.
- [ ] Publish only after all gates succeed.
