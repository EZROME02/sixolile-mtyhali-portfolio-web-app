# EZROME Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved EZROME Android-first platform experience on top of the existing portfolio/PWA without replacing the existing application or weakening its release gates.

**Architecture:** Extend the existing TanStack React/Vite application with feature-oriented routes, shared EZROME UI primitives, typed local content models, and a mobile-first shell. Keep Android as the existing WebView/PWA wrapper; native code remains responsible for platform integration only.

**Tech Stack:** React 19, TanStack Router/Start, Vite, TypeScript, Tailwind CSS v4, Lucide React, existing Radix components, Bun tests, existing Android Gradle project.

**Spec:** `docs/superpowers/specs/2026-08-25-ezrome-platform-design.md`

## Global Constraints

- Preserve the existing Lovable-connected Git history; never force-push, rebase, amend, or squash published commits.
- Preserve the existing Android application ID, signing workflow, PWA behavior, and release gates.
- Keep `Built & Demonstrated`, `Currently Developing`, and roadmap states truthful.
- Use the canonical personal portrait only; do not generate substitute personal imagery.
- Reuse existing dependencies where possible; avoid adding state-management/backend infrastructure for the initial UI milestone.
- Mobile-first means Android-sized viewports are the primary acceptance target.

---

### Task 1: Establish EZROME content/domain models

**Files:**
- Create: `src/lib/ezrome/types.ts`
- Create: `src/lib/ezrome/content.ts`
- Test: `src/lib/ezrome/content.test.ts`

**Interfaces:**
- Produces typed models for `Project`, `Brainwork`, `IntelligenceArticle`, `Short`, `CommunityPost`, `Poll`, `AIWorkspaceTool`, `RoadmapItem`, and `ProfileLink`.
- Produces the initial truthful EZROME content registry.

- [ ] Step 1: Write failing tests for project statuses and Brainwork fields.
- [ ] Step 2: Run `bun test src/lib/ezrome/content.test.ts` and confirm failure.
- [ ] Step 3: Implement the types and initial content registry.
- [ ] Step 4: Run the focused test and then `bun test`.
- [ ] Step 5: Commit the domain-model milestone.

### Task 2: Build the EZROME visual system and app shell

**Files:**
- Modify: `src/styles.css`
- Modify: `src/routes/__root.tsx`
- Create: `src/components/ezrome/EzromeShell.tsx`
- Create: `src/components/ezrome/BottomNav.tsx`
- Create: `src/components/ezrome/SectionHeader.tsx`
- Create: `src/components/ezrome/GlowCard.tsx`
- Create: `src/components/ezrome/StatusBadge.tsx`
- Test: `src/components/ezrome/EzromeShell.test.tsx`

**Interfaces:**
- `EzromeShell` owns global mobile navigation and page chrome.
- `BottomNav` exposes primary tabs Home, Projects, Intelligence, Shorts, AI and a secondary destination surface for Community, Roadmap, Connect, Profile.

- [ ] Step 1: Add failing tests for active navigation and accessible labels.
- [ ] Step 2: Run the focused test and confirm failure.
- [ ] Step 3: Implement the shell and visual primitives using existing Tailwind/Radix/Lucide dependencies.
- [ ] Step 4: Update global styles for navy/cyan/glow tokens and mobile-safe spacing.
- [ ] Step 5: Run focused tests and lint.
- [ ] Step 6: Commit the shell milestone.

### Task 3: Rebuild Home as the professional front door

**Files:**
- Modify: `src/routes/index.tsx`
- Create: `src/components/ezrome/home/Hero.tsx`
- Create: `src/components/ezrome/home/FeaturedProjects.tsx`
- Create: `src/components/ezrome/home/ProfessionalStats.tsx`
- Create: `src/components/ezrome/home/RoadmapPreview.tsx`
- Test: `src/routes/index.test.tsx`

- [ ] Step 1: Write failing tests for tagline, project status labels, and roadmap preview.
- [ ] Step 2: Implement the recruiter-first Home composition.
- [ ] Step 3: Ensure canonical portrait and professional CTA hierarchy are preserved.
- [ ] Step 4: Run focused tests and lint.
- [ ] Step 5: Commit.

### Task 4: Expand Projects with Brainwork detail

**Files:**
- Modify: `src/routes/projects.tsx`
- Inspect/modify: `src/routes/projects/*`
- Create: `src/components/ezrome/projects/ProjectCard.tsx`
- Create: `src/components/ezrome/projects/BrainworkPanel.tsx`
- Create: `src/components/ezrome/projects/ProjectStatusFilter.tsx`
- Test: project route/component tests

- [ ] Step 1: Add failing tests for project filtering and the six Brainwork stages.
- [ ] Step 2: Implement project registry cards using typed content.
- [ ] Step 3: Implement project detail presentation using `PROBLEM → THINKING → SOLUTION → TECHNOLOGY → AI → IMPACT`.
- [ ] Step 4: Preserve links/statuses for existing EZROME projects.
- [ ] Step 5: Run focused tests and lint.
- [ ] Step 6: Commit.

### Task 5: Add Intelligence module

**Files:**
- Create: `src/routes/intelligence.tsx`
- Create: `src/components/ezrome/intelligence/IntelligenceCard.tsx`
- Create: `src/components/ezrome/intelligence/CategoryTabs.tsx`
- Create: `src/components/ezrome/intelligence/InsightDetail.tsx`
- Test: `src/routes/intelligence.test.tsx`

- [ ] Step 1: Test category filtering and empty states.
- [ ] Step 2: Implement Technology, AI, Football, Research, and Articles views using local typed content.
- [ ] Step 3: Add clear disclosure when content is AI-generated or placeholder/local.
- [ ] Step 4: Run tests and lint.
- [ ] Step 5: Commit.

### Task 6: Add Shorts module

**Files:**
- Create: `src/routes/shorts.tsx`
- Create: `src/components/ezrome/shorts/ShortsFeed.tsx`
- Create: `src/components/ezrome/shorts/ShortCard.tsx`
- Create: `src/components/ezrome/shorts/ShortActions.tsx`
- Test: `src/components/ezrome/shorts/ShortsFeed.test.tsx`

- [ ] Step 1: Write failing tests for item navigation, like state, and keyboard/accessibility fallback.
- [ ] Step 2: Implement mobile-first vertical feed with CSS scroll snapping rather than a heavyweight dependency.
- [ ] Step 3: Add like/comment/share/follow UI with local state.
- [ ] Step 4: Add AI caption/summary fields from content models.
- [ ] Step 5: Verify no third-party platform branding is copied.
- [ ] Step 6: Run tests and lint.
- [ ] Step 7: Commit.

### Task 7: Add Community module

**Files:**
- Create: `src/routes/community.tsx`
- Create: `src/components/ezrome/community/PostCard.tsx`
- Create: `src/components/ezrome/community/PollCard.tsx`
- Create: `src/components/ezrome/community/ReactionBar.tsx`
- Test: `src/routes/community.test.tsx`

- [ ] Step 1: Test local reaction/poll behavior.
- [ ] Step 2: Implement posts, polls, discussions, comments, and creator cards with explicit local/demo state.
- [ ] Step 3: Keep production backend integration out of this milestone.
- [ ] Step 4: Run tests and lint.
- [ ] Step 5: Commit.

### Task 8: Expand EZROME AI workspace

**Files:**
- Modify: `src/routes/ai.tsx`
- Modify: `src/routes/workspace.tsx`
- Create: `src/components/ezrome/ai/AIToolGrid.tsx`
- Create: `src/components/ezrome/ai/AIToolCard.tsx`
- Create: `src/components/ezrome/ai/ToolWorkspace.tsx`
- Test: AI route/component tests

- [ ] Step 1: Test that all six AI tools are discoverable and correctly named.
- [ ] Step 2: Refactor existing AI/workspace UI behind reusable tool interfaces.
- [ ] Step 3: Implement Chat, Research, Summarizer, Tasks, Email, and Content Assistant entry points.
- [ ] Step 4: Keep actual model/API integration behind replaceable adapters; do not hard-code provider secrets.
- [ ] Step 5: Run tests and lint.
- [ ] Step 6: Commit.

### Task 9: Add Roadmap and Connect/Profile modules

**Files:**
- Create: `src/routes/roadmap.tsx`
- Create: `src/routes/connect.tsx`
- Create: `src/routes/profile.tsx`
- Create: `src/components/ezrome/roadmap/RoadmapTrack.tsx`
- Create: `src/components/ezrome/connect/ContactCard.tsx`
- Create: `src/components/ezrome/profile/ProfileHeader.tsx`
- Test: route/component tests

- [ ] Step 1: Test roadmap categories/statuses and profile link destinations.
- [ ] Step 2: Implement Foundations, Full-stack Development, and AI Development roadmap sections.
- [ ] Step 3: Implement LinkedIn/GitHub/WhatsApp/email/CV connect cards using approved profile data.
- [ ] Step 4: Implement professional Profile with portrait, skills, experience, certifications, and projects.
- [ ] Step 5: Run tests and lint.
- [ ] Step 6: Commit.

### Task 10: Wire routing and mobile navigation

**Files:**
- Modify: `src/router.tsx`
- Modify: generated `src/routeTree.gen.ts` only if required by the router generation process
- Modify: `src/routes/__root.tsx`
- Test: route navigation tests

- [ ] Step 1: Add route tests for `/`, `/projects`, `/intelligence`, `/shorts`, `/community`, `/ai`, `/roadmap`, `/connect`, and `/profile`.
- [ ] Step 2: Add route modules and navigation links without breaking existing `/login`, `/privacy`, `/terms`, and project detail routes.
- [ ] Step 3: Verify deep-link behavior and fallback behavior.
- [ ] Step 4: Run tests, lint, and production build.
- [ ] Step 5: Commit.

### Task 11: Preserve and verify PWA/Android wrapper behavior

**Files:**
- Inspect/modify existing PWA manifest/service-worker files only where required
- Inspect/modify `android/app/**` only where required for navigation/origin/error handling
- Inspect existing Android workflow under `.github/workflows/**`
- Test: existing PWA/Android verification workflow plus relevant web tests

- [ ] Step 1: Confirm the Android wrapper still targets the canonical web/PWA experience.
- [ ] Step 2: Verify Web Storage, offline/error fallback, and mobile viewport behavior.
- [ ] Step 3: Confirm application ID/signing configuration is unchanged.
- [ ] Step 4: Run the existing Android debug/release verification workflow.
- [ ] Step 5: Do not declare a production release unless signing identity and checksum gates pass.
- [ ] Step 6: Commit only if Android changes were required.

### Task 12: Full verification and release candidate

**Files:**
- No new application files unless verification reveals a defect.
- Inspect: `.github/workflows/*`, `docs/RELEASE_GATE.md`, Android build configuration.

- [ ] Step 1: Run `bun test`.
- [ ] Step 2: Run `bun run lint`.
- [ ] Step 3: Run `bun run build`.
- [ ] Step 4: Run the existing browser/E2E verification if configured.
- [ ] Step 5: Run Android assemble/debug/release verification.
- [ ] Step 6: Verify APK artifacts are non-empty and hashes/signing identity satisfy the protected release gate.
- [ ] Step 7: Review the diff for accidental portrait/branding/status changes.
- [ ] Step 8: Open a pull request from `feat/ezrome-platform-architecture` after the branch is independently verified.
