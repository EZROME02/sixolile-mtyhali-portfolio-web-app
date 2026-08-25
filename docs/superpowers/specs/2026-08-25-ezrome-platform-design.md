# EZROME Platform Design Specification

**Date:** 2026-08-25  
**Status:** Approved by user  
**Scope:** EZROME portfolio-to-platform architecture for web/PWA/Android

## Goal

Evolve the existing EZROME professional portfolio into a single Android-first platform that preserves the recruiter-facing portfolio while adding intelligence, AI productivity, short-form content, community, roadmap, and profile experiences.

## Existing Repository Context

The canonical repository is `EZROME02/sixolile-mtyhali-portfolio-web-app`. It is a Vite/TanStack React application with an existing `android/` project, PWA/release tooling, and a Lovable-connected workflow. The existing repository must remain the source of truth for the web/PWA experience and Android wrapper.

The current public identity distinguishes built/demonstrated work from the 2026 learning/development roadmap. That distinction must remain intact.

## Product Information Architecture

### 1. Home

Purpose: recruiter-first professional entry point.

Content:
- EZROME branding
- Canonical portrait/hero
- Tagline: `I build intelligent solutions that drive real impact`
- Featured projects
- Operations → technology → AI journey
- Professional statistics
- 2026 technology roadmap preview
- Primary CTAs for projects, AI workspace, and CV/connect

### 2. Projects

Project registry cards must support:
- Name
- Short outcome-oriented description
- Status: Built & Demonstrated / Currently Developing / Roadmap
- Brainwork summary
- Technology tags
- AI role
- Impact
- GitHub/live links when available

Initial projects:
- EZROME Assist Bot
- AI Workplace Productivity Assistant / AI Productivity Assistant
- EZROME Android App
- EZROME Intelligence / Rated Opinionz
- Future projects

### 3. Intelligence

A knowledge/content area for:
- Technology Intelligence
- AI & Intelligence
- Football Intelligence
- Research
- AI-generated insights
- Articles/posts

The initial release may use structured mock/local content; backend persistence and automated AI generation are later capabilities.

### 4. Shorts

Mobile-first vertical content experience with:
- Swipe/scroll between items
- Like
- Comment
- Share
- Follow
- AI-generated caption/summary presentation

The experience must use EZROME visual identity and interaction patterns, not copy another platform's branding or proprietary UI.

### 5. Community

Social layer with:
- Posts
- Polls
- Discussions
- Reactions
- Comments
- Creator/profile cards

Initial implementation should define UI/state interfaces without requiring a production social backend unless one already exists.

### 6. EZROME AI

AI workspace containing:
- AI Chat
- Research Assistant
- Notes Summarizer
- Task Planner
- Email Generator
- Content Assistant

Tools must be modular so real AI/API integrations can be added without redesigning navigation.

### 7. Roadmap

Preserve the 2026 roadmap:
- Foundations: Python, Git + GitHub, HTML/CSS/JavaScript
- Full-stack Development: React, Next.js, Tailwind CSS, FastAPI, Supabase, Vercel
- AI Development: AI APIs, RAG, Embeddings + Vector Databases, Agents + Tools
- Goal: Full-stack AI Developer

Clearly separate `Built & Demonstrated` from `Currently Developing` and future learning/roadmap items.

### 8. Connect

Professional contact hub:
- LinkedIn
- GitHub
- WhatsApp
- Email
- CV
- Other approved profiles

The existing repository identity uses the canonical EZROME external profiles already documented in README.

### 9. Profile

Personal professional profile containing:
- Canonical portrait
- EZROME/Sixolile Ezrome Mtyhali identity
- Skills
- Experience
- Certifications
- Projects
- Professional links

## Brainwork Framework

Every major project presentation uses:

`PROBLEM → THINKING → SOLUTION → TECHNOLOGY → AI → IMPACT`

Each project detail view should answer:
1. What problem was identified?
2. Why was the solution worth building?
3. How was the problem approached?
4. Which technology was used?
5. Where does AI fit?
6. What was learned or demonstrated?
7. What impact can the solution create?

This framework is a first-class content model, not just decorative copy.

## Visual System

- Base: dark navy
- Accent: electric cyan / turquoise-blue
- Text: white with restrained secondary contrast
- Subtle blue glow and technology-grid motifs
- Rounded cards and panels
- Strong but accessible CTA hierarchy
- Canonical personal portrait only; no generated substitute portrait
- Android-first responsive layouts
- Persistent bottom navigation on mobile
- Desktop/tablet layouts may use expanded navigation while preserving information architecture
- Motion should be purposeful and lightweight; avoid animation that harms accessibility or performance

## Navigation

Mobile bottom navigation should prioritize the highest-frequency areas and use a More/Profile surface for lower-frequency destinations if nine visible destinations become crowded. The information architecture remains nine modules even when the physical navigation condenses them.

Recommended primary mobile tabs:
- Home
- Projects
- Intelligence
- Shorts
- AI

Secondary destinations:
- Community
- Roadmap
- Connect
- Profile

## Technical Architecture

Reuse the existing React/TanStack/Vite application rather than creating a second web application. Add feature-oriented route and component boundaries under the existing `src/routes` and `src/components` structure. Keep data/content models separate from presentation.

The Android application remains a WebView-based wrapper around the responsive web/PWA experience, with offline/error handling and Web Storage preserved. Native Android code should only own wrapper/platform responsibilities unless a future requirement genuinely needs native APIs.

Use the existing dependency set where possible. Do not add a state-management framework or backend solely for the first UI implementation.

## Data Boundaries

Define typed content models for:
- Project
- Brainwork
- IntelligenceArticle
- Short
- CommunityPost
- Poll
- AIWorkspaceTool
- RoadmapItem
- ProfileLink

Initial data can be static/local and testable. Backend persistence/authentication/real-time social behavior is a later phase.

## Release Constraints

- Do not rewrite published Git history because the repository is Lovable-connected.
- Preserve existing CI/release gates.
- Preserve Android application ID and existing signing protections.
- Do not claim production signing or release readiness without actual verification.
- Existing built/demonstrated versus roadmap status must remain accurate.

## Acceptance Criteria

The first platform UI milestone is successful when:
- All nine information areas have routable, coherent screens.
- Mobile navigation is usable on Android-sized viewports.
- The EZROME visual system is consistent across modules.
- Existing project content remains accessible.
- The Brainwork framework appears on project detail views.
- AI workspace tools have clear entry points and modular interfaces.
- Shorts and Community provide demonstrable UI/state interactions without pretending that a production backend exists.
- Roadmap status is explicit and honest.
- Existing PWA/Android wrapper behavior is not regressed.
- Lint, tests, production build, and Android verification are required before release claims.
