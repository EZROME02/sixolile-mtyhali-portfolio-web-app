import { z } from "zod";

export const AiRequestSchema = z.object({
  query: z.string().trim().min(1).max(4_000),
  mode: z.enum(["Intelligence", "Research", "Productivity"]),
});

export type AiRequest = z.infer<typeof AiRequestSchema>;

export type AiStatus = "provider_unavailable" | "generated";

export type AiResult = {
  answer: string;
  status: AiStatus;
  provenance: {
    kind: "ai-generated" | "source-backed";
    sources: string[];
    verified: boolean;
  };
  generatedAt: string;
};
