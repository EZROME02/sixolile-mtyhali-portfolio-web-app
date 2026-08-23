export type IntelligenceDomain = "technology" | "ai-workplace" | "football";

export interface IntelligenceItem {
  code: string;
  domain: IntelligenceDomain;
  title: string;
  detail: string;
  outcome: string;
}

export const EZROME_INTELLIGENCE: readonly IntelligenceItem[] = [
  {
    code: "TECH-01",
    domain: "technology",
    title: "Practical Technology Intelligence",
    detail: "Translate real workplace problems into useful digital workflows, tools and measurable improvements.",
    outcome: "A technology choice connected to a real operational outcome.",
  },
  {
    code: "AI-01",
    domain: "ai-workplace",
    title: "AI Workplace Intelligence",
    detail: "Use AI for research, planning, communication, summarisation and repetitive workplace tasks while keeping people accountable.",
    outcome: "Faster work without surrendering human judgement.",
  },
  {
    code: "FT-02",
    domain: "football",
    title: "Football Tactical Intelligence",
    detail: "Structure match information around tactical patterns, decision points and evidence rather than unsupported predictions.",
    outcome: "Analysis that helps a person understand the game and make informed decisions.",
  },
  {
    code: "HC-03",
    domain: "technology",
    title: "Human Control",
    detail: "Technology assists decisions; people remain accountable for sensitive, high-impact actions.",
    outcome: "Responsible automation with a clear human decision boundary.",
  },
  {
    code: "PO-04",
    domain: "technology",
    title: "Practical Outcomes",
    detail: "Every intelligence workflow is tied to a problem, an action and a usable result.",
    outcome: "Less technology theatre and more measurable usefulness.",
  },
];

export function getIntelligenceByDomain(domain: IntelligenceDomain): IntelligenceItem[] {
  return EZROME_INTELLIGENCE.filter((item) => item.domain === domain);
}
