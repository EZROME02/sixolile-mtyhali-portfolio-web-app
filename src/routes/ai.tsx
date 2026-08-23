import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "EZROME AI | Intelligence & Productivity Workspace" },
      {
        name: "description",
        content:
          "EZROME AI is a source-aware intelligence and productivity workspace by Sixolile Ezrome Mtyhali.",
      },
      { property: "og:url", content: "https://ezrome.co.za/ai" },
    ],
  }),
  component: AiWorkspace,
});

const modes = ["Intelligence", "Research", "Productivity"] as const;

function AiWorkspace() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<(typeof modes)[number]>("Intelligence");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const normalized = useMemo(() => query.trim(), [query]);

  function run() {
    if (!normalized) return;
    setRunning(true);
    setResult(null);
    window.setTimeout(() => {
      setRunning(false);
      setResult(
        `EZROME is ready to research “${normalized}”. This interface is intentionally source-aware: live facts, reported information, and AI analysis will be separated when a production retrieval provider is connected.`,
      );
    }, 650);
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="eyebrow">EZROME.CO.ZA</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-5xl">EZROME AI</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Intelligence, research and productivity in one electric workspace.
            </p>
          </div>
          <a
            href="/"
            className="rounded-lg border border-primary/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/10"
          >
            Portfolio
          </a>
        </header>

        <section className="mt-8 panel grid-lines p-5 shadow-panel sm:p-8">
          <div className="flex flex-wrap gap-2">
            {modes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  mode === item
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Ask by name, topic, company, project or question
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) run();
              }}
              rows={4}
              placeholder="e.g. Premier League, a person, a company, my weekly plan..."
              className="mt-2 w-full resize-y rounded-xl border border-input bg-navy-deep/80 p-4 text-sm text-foreground outline-none ring-primary/40 placeholder:text-muted-foreground focus:ring-2"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={run}
              disabled={!normalized || running}
              className="rounded-lg bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-glow disabled:cursor-not-allowed disabled:opacity-50"
            >
              {running ? "Running…" : `Run ${mode}`}
            </button>
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                setResult(null);
              }}
              className="rounded-lg border border-border px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary"
            >
              Stop / Clear
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Verified facts", "Future retrieval results will carry source and freshness metadata."],
            ["Reported information", "News and public reports stay distinguishable from verified records."],
            ["AI analysis", "Inference is labelled clearly and never presented as established fact."],
          ].map(([title, detail]) => (
            <article key={title} className="panel p-5">
              <span className="size-2.5 rounded-full bg-primary shadow-glow" />
              <h2 className="mt-3 text-base font-bold">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
            </article>
          ))}
        </section>

        {result ? (
          <section className="mt-6 panel border-primary/40 p-6" aria-live="polite">
            <p className="eyebrow">EZROME intelligence brief</p>
            <p className="mt-3 text-sm leading-6 text-foreground">{result}</p>
            <p className="mt-5 text-[11px] text-muted-foreground">
              Production connector status: retrieval provider not configured. No live source result is claimed by this demo state.
            </p>
          </section>
        ) : null}

        <footer className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          <strong className="text-primary">EZROME</strong> · ezrome.co.za · Built by Sixolile Ezrome Mtyhali
        </footer>
      </div>
    </main>
  );
}
