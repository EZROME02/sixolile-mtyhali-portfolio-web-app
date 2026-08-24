export const SEO_SITE_URL = "https://ezrome.co.za";
export const SEO_SITE_TITLE = "EZROME — Sixolile Ezrome Mtyhali | AI Developer";
export const SEO_SITE_DESCRIPTION =
  "EZROME — Sixolile Ezrome Mtyhali's portfolio of applied AI, web technology, productivity tools and demonstrated digital projects.";

export type ProjectStatus = "Built & Demonstrated" | "Currently Developing";

export type ProjectSeoEntry = {
  slug: string;
  name: string;
  description: string;
  url: string;
  status: ProjectStatus;
  githubUrl?: string;
};

const GITHUB_BASE = "https://github.com/EZROME02/sixolile-mtyhali-portfolio-web-app";

export const SEO_PROJECTS: readonly ProjectSeoEntry[] = [
  {
    slug: "ezrome-assist-bot",
    name: "EZROME Assist Bot",
    description: "EZROME's AI assistant concept and applied productivity interface, presented as part of the portfolio's demonstrated AI work.",
    url: `${SEO_SITE_URL}/projects/ezrome-assist-bot`,
    status: "Built & Demonstrated",
    githubUrl: GITHUB_BASE,
  },
  {
    slug: "ai-productivity-assistant",
    name: "AI Productivity Assistant",
    description: "A practical AI productivity project for workplace communication, notes, task planning, research and interactive assistance.",
    url: `${SEO_SITE_URL}/projects/ai-productivity-assistant`,
    status: "Built & Demonstrated",
    githubUrl: "https://github.com/EZROME02/AI-Productivity-Assistant",
  },
  {
    slug: "ezrome-android-app",
    name: "EZROME Android App",
    description: "The Android application wrapper for the EZROME portfolio experience, maintained in the public portfolio repository.",
    url: `${SEO_SITE_URL}/projects/ezrome-android-app`,
    status: "Built & Demonstrated",
    githubUrl: `${GITHUB_BASE}/tree/main/android`,
  },
  {
    slug: "ezrome-intelligence-rated-opinionz",
    name: "EZROME Intelligence / Rated Opinionz",
    description: "EZROME's intelligence layer for structured technology and football analysis, with further capability development continuing.",
    url: `${SEO_SITE_URL}/projects/ezrome-intelligence-rated-opinionz`,
    status: "Currently Developing",
    githubUrl: `${GITHUB_BASE}/tree/main/src/routes/ezrome-intelligence.tsx`,
  },
];

export function buildStructuredData() {
  const personId = `${SEO_SITE_URL}/#person`;
  const organizationId = `${SEO_SITE_URL}/#organization`;
  const websiteId = `${SEO_SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Sixolile Ezrome Mtyhali",
        url: SEO_SITE_URL,
        jobTitle: "AI Developer",
        sameAs: [
          "https://github.com/EZROME02",
          "https://www.linkedin.com/in/xillah-wethu-385aa63b4",
          "https://x.com/XillahW37827",
        ],
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "EZROME",
        url: SEO_SITE_URL,
        founder: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SEO_SITE_TITLE,
        url: SEO_SITE_URL,
        publisher: { "@id": organizationId },
      },
      ...SEO_PROJECTS
        .filter((project) => project.status === "Built & Demonstrated")
        .map((project) => ({
          "@type": "SoftwareApplication",
          "@id": `${project.url}/#software`,
          name: project.name,
          description: project.description,
          url: project.url,
          applicationCategory: "BusinessApplication",
          operatingSystem: project.name === "EZROME Android App" ? "Android" : "Web",
          creator: { "@id": personId },
          isPartOf: { "@id": websiteId },
        })),
    ],
  } satisfies Record<string, unknown>;
}
