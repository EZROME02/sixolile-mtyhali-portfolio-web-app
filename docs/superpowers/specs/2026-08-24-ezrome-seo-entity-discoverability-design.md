# EZROME SEO Entity Discoverability Design

## Goal
Establish a coherent, crawlable public identity connecting Sixolile Ezrome Mtyhali, EZROME, ezrome.co.za, the portfolio, and the portfolio's public software projects without keyword stuffing or unsupported claims.

## Current State
- The portfolio already uses TanStack Start and has route-level head metadata in `src/routes/__root.tsx`.
- The root metadata already names Sixolile Ezrome Mtyhali, uses `https://ezrome.co.za` as the canonical URL, and exposes the PWA manifest.
- Public project code exists for EZROME Intelligence, the EZROME Tech Slideshow, the AI route, and the Android app.
- The repository has an existing PWA foundation and production/release quality gates.

## Design

### 1. Canonical identity
Use the public identity consistently as:
**EZROME — Sixolile Ezrome Mtyhali | AI Developer**

Use `https://ezrome.co.za` as the canonical site URL. The homepage should clearly associate the person, brand, role, and website in visible copy and metadata.

### 2. Search metadata
Strengthen the root and route metadata with:
- precise page titles;
- unique descriptions for indexable pages;
- canonical URLs;
- Open Graph metadata;
- Twitter/X card metadata;
- author and application identity where appropriate.

Avoid repetitive keyword lists or hidden text.

### 3. Structured entity signals
Add JSON-LD for the entities that are genuinely represented by the site:
- `Person` for Sixolile Ezrome Mtyhali;
- `Organization` for EZROME where the site presents EZROME as the brand/project organization;
- `WebSite` for ezrome.co.za;
- `SoftwareApplication` only for applications that have corresponding public project evidence.

Connect entities using stable URLs and `sameAs` links where the linked profile is actually controlled by the user or the repository/project is public.

### 4. Crawlable project architecture
Create a public `/projects` route that acts as the crawlable index for the portfolio's work. It should link to dedicated, indexable project pages for:
- EZROME Assist Bot;
- AI Productivity Assistant;
- EZROME Android App;
- EZROME Intelligence / Rated Opinionz.

Project pages must distinguish live/built work from work still being developed and must link back to the portfolio and relevant public GitHub repositories where applicable.

### 5. Crawl controls
Add:
- `/robots.txt` permitting normal crawling and pointing to the sitemap;
- `/sitemap.xml` containing the canonical homepage and public project pages;
- noindex handling for private/authenticated or utility pages that should not become search landing pages.

The sitemap must not claim URLs that are not routable in production.

### 6. Internal linking and external authority
Make the homepage and project pages link naturally among the identity, projects, GitHub, LinkedIn, and canonical domain. Update the relevant public GitHub README/profile documentation to link back to `https://ezrome.co.za` where the repository is clearly part of the EZROME portfolio ecosystem.

### 7. Accuracy constraints
Do not claim that a product is launched, commercially available, or production-verified unless the repository/site contains evidence for that claim. Preserve the portfolio's existing distinction between **Built & Demonstrated** and **Currently Developing**.

### 8. Verification
Before merge:
- run Bun tests;
- run lint;
- run the production build;
- verify the generated/crawlable sitemap and robots endpoints;
- verify route metadata and JSON-LD;
- verify that all sitemap URLs resolve through the router;
- run the existing mobile/quality gates available in the repository.

After the canonical domain is actually serving this release, submit the sitemap and canonical homepage through Google Search Console. Search Console submission is an external deployment/ownership step, not something to fake or encode into the site.

## Non-Goals
- No visual redesign of the existing EZROME Tech Slideshow.
- No keyword stuffing.
- No fake backlinks or fabricated third-party endorsements.
- No claims that Google has indexed or ranked the site before Search Console/web verification confirms it.
