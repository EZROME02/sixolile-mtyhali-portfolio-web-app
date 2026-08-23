import type { AiRequest, AiResult } from "./contracts";

export type AiProviderEnv = {
  EZROME_AI_BASE_URL?: string;
  EZROME_AI_API_KEY?: string;
  EZROME_AI_MODEL?: string;
};

type ProviderPayload = { answer?: unknown };

export async function runAiProvider(
  request: AiRequest,
  env: AiProviderEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<AiResult> {
  const generatedAt = new Date().toISOString();
  const baseUrl = env.EZROME_AI_BASE_URL?.trim();
  const apiKey = env.EZROME_AI_API_KEY?.trim();
  const model = env.EZROME_AI_MODEL?.trim();

  if (!baseUrl || !apiKey || !model) {
    return {
      answer: "The live AI provider is not configured yet. No live research result is being claimed.",
      status: "provider_unavailable",
      provenance: { kind: "ai-generated", sources: [], verified: false },
      generatedAt,
    };
  }

  const response = await fetchImpl(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are EZROME AI. Distinguish generated analysis from verified facts. Do not invent sources or private information.",
        },
        { role: "user", content: `[${request.mode}] ${request.query}` },
      ],
    }),
  });

  if (!response.ok) throw new Error(`AI provider request failed: ${response.status}`);
  const payload = (await response.json()) as ProviderPayload & {
    choices?: Array<{ message?: { content?: unknown } }>;
  };
  const answer =
    typeof payload.answer === "string"
      ? payload.answer
      : typeof payload.choices?.[0]?.message?.content === "string"
        ? payload.choices[0].message.content
        : null;

  if (!answer) throw new Error("AI provider returned no usable answer");

  return {
    answer,
    status: "generated",
    provenance: { kind: "ai-generated", sources: [], verified: false },
    generatedAt,
  };
}
