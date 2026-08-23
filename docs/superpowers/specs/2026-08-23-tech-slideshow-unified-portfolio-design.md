# Tech Slideshow Unified EZROME Portfolio Design

## Goal
Make the EZROME Tech Slideshow design system the primary visual/design source for one unified portfolio while preserving the canonical portrait, all established portfolio sections and functionality, AI Assistant, EZROME Intelligence, Android/release tooling, and protected production-signing workflows.

## Scope
- Tech Slideshow is the primary visual language; this is not a merge of a standalone PowerPoint into the application.
- Preserve CV/Contact, Experience, Skills, Projects, and Roadmap content and behavior.
- Preserve the single canonical portrait asset and reuse it consistently across applicable personal-image slots.
- Preserve AI Assistant and EZROME Intelligence functionality and their existing user-facing roles.
- Preserve Android application/release tooling and existing verification workflows.
- Preserve protected production-signing workflows and their fail-closed behavior when legitimate signing secrets are unavailable.
- Preserve the distinction between demonstrated/built work and the 2026 learning/development roadmap.
- Preserve the recruiter-facing “REQUEST MY CV” CTA rather than replacing it with a download CTA.
- Preserve “AI EZROME ARTIST BOT / AI Workplace Productivity Assistant” as “Built & Live” where currently established.
- No automatic publishing, deployment, merge, or release will be introduced by this work.

## Design Direction
The portfolio should feel like a single coherent Tech Slideshow experience rather than separate legacy pages with a new theme layered over them. Existing functionality remains authoritative; visual restructuring must adapt the existing features to the slideshow system instead of removing or weakening them.

The canonical portrait remains one source asset. Responsive presentation may use different containers/crops, but must not create alternate personal images.

## Functional Preservation
The unified portfolio must retain the existing routes, interactions, content, and integrations that implement:
- CV/contact workflow
- Experience, Skills, Projects, and Roadmap sections
- AI Assistant
- EZROME Intelligence
- Android application/build/release tooling
- CI verification and protected release controls

Any implementation that would remove, bypass, weaken, or silently replace one of these capabilities is out of scope.

## Release and Security Boundaries
- GitHub remains the authoritative release-control environment; Lovable remains a development/synchronization environment.
- Existing exact-SHA release gates remain authoritative for release readiness.
- Human release approval remains required for release readiness.
- No workflow may merge, force-push, delete branches, enable auto-merge, or expose production signing secrets.
- Production signing credentials are never generated, guessed, retrieved, copied into source, or printed into logs.
- New commits invalidate prior SHA-specific release verification.
- Portfolio design changes must not modify protected signing requirements merely to obtain a green build.

## Verification
Verification must cover visual integration and functional preservation, including lint/typecheck/tests/production build where configured, existing portfolio functionality, canonical portrait reuse, AI/Intelligence entry points, Android/release workflow integrity, and fail-closed signing behavior. The final state is not considered published or deployed by this task.

## Non-Goals
- No standalone PowerPoint import or merge.
- No automatic production deployment.
- No automatic PR merge.
- No creation or disclosure of production signing credentials.
- No replacement of the canonical portrait with generated or stock imagery.
- No removal of existing portfolio/platform functionality in favor of a purely visual slideshow.
