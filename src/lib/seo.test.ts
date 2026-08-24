import { describe, expect, test } from "bun:test";
import {
  SEO_PROJECTS,
  SEO_SITE_DESCRIPTION,
  SEO_SITE_TITLE,
  SEO_SITE_URL,
  buildStructuredData,
} from "./seo";

describe("EZROME SEO identity", () => {
  test("uses the canonical identity and domain", () => {
    expect(SEO_SITE_URL).toBe("https://ezrome.co.za");
    expect(SEO_SITE_TITLE).toContain("EZROME");
    expect(SEO_SITE_TITLE).toContain("Sixolile Ezrome Mtyhali");
    expect(SEO_SITE_TITLE).toContain("AI Developer");
    expect(SEO_SITE_DESCRIPTION).toContain("Sixolile Ezrome Mtyhali");
  });

  test("registers the four canonical project identities with explicit status", () => {
    expect(SEO_PROJECTS.map((project) => project.name)).toEqual([
      "EZROME Assist Bot",
      "AI Productivity Assistant",
      "EZROME Android App",
      "EZROME Intelligence / Rated Opinionz",
    ]);
    expect(SEO_PROJECTS.every((project) => project.slug && project.status)).toBe(true);
    expect(SEO_PROJECTS.some((project) => project.status === "Built & Demonstrated")).toBe(true);
    expect(SEO_PROJECTS.some((project) => project.status === "Currently Developing")).toBe(true);
  });

  test("builds linked Schema.org identity data", () => {
    const graph = buildStructuredData()["@graph"] as Array<Record<string, unknown>>;
    const types = graph.map((node) => node["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Person", "Organization", "WebSite", "SoftwareApplication"]));
    expect(graph.find((node) => node["@type"] === "Person")?.name).toBe("Sixolile Ezrome Mtyhali");
    expect(graph.find((node) => node["@type"] === "Organization")?.name).toBe("EZROME");
  });
});
