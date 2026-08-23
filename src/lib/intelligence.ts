export type IntelligenceDomain = "technology" | "ai-workplace" | "football";

export type IntelligenceItem = {
  code: string;
  domain: IntelligenceDomain;
  title: string;
  detail: string;
};

export const EZROME_INTELLIGENCE: readonly IntelligenceItem[] = [
  {
    code: "AI-01",
    domain: "ai-workplace",
    title: "AI Workflow Intelligence",
    detail: "Prompt-driven workplace automation, research, planning and communication workflows.",
  },
  {
    code: "FT-02",
    domain: "football",
    title: "Football Tactical Intelligence",
    detail: "A future-facing intelligence layer for structured match analysis, tactical patterns and decision support.",
  },
  {
    code: "HC-03",
    domain: "technology",
    title: "Human Control",
    detail: "Technology assists decisions; people remain accountable for sensitive, high-impact actions.",
  },
  {
    code: "PO-04",
    domain: "technology",
    title: "Practical Outcomes",
    detail: "Every workflow is connected to a real problem, measurable action and usable result.",
  },
];

export function getIntelligenceByDomain(domain: IntelligenceDomain) {
  return EZROME_INTELLIGENCE.filter((item) => item.domain === domain);
}
