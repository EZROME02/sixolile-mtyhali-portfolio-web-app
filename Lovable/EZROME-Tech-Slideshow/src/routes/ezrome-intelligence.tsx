import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import footballIntel from "@/assets/football-intel.jpg";
import aiWorkflow from "@/assets/ai-workflow.jpg";

export const Route = createFileRoute("/ezrome-intelligence")({
  head: () => ({
    meta: [
      { title: "EZROME Technology Intelligence — Sixolile Mtyhali" },
      { name: "description", content: "A visual overview of EZROME technology work, football intelligence, governed AI workflows, and human-in-the-loop design." },
      { property: "og:title", content: "EZROME Technology Intelligence" },
      { property: "og:description", content: "A visual overview of EZROME technology work and human-controlled AI workflows." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

type Narrative = { problem: string; technology: string; control: string; outcome: string };
type Slide = { kicker: string; title: string; lead: string; bullets?: string[]; image?: { src: string; alt: string }; narrative?: Narrative; metrics?: { value: string; label: string }[]; finale?: boolean };

const slides: Slide[] = [
  {
    kicker: "EZROME / TECHNOLOGY INTELLIGENCE",
    title: "DESIGNING INTELLIGENCE PEOPLE CAN USE",
    lead: "A visual tour of EZROME work across football intelligence, productivity systems, and human-controlled AI.",
    metrics: [
      { value: "04", label: "Intelligence layers" },
      { value: "01", label: "Human decision loop" },
      { value: "∞", label: "Problems worth solving" },
    ],
  },
  {
    kicker: "01 / FOOTBALL INTELLIGENCE",
    title: "FROM MATCH DATA TO A COACHABLE SIGNAL",
    lead: "A focused intelligence view that turns match information into material a coaching team can review and act on.",
    image: { src: footballIntel, alt: "Tactical football intelligence dashboard with player data nodes" },
    bullets: [
      "Positional heatmaps and pass networks per fixture",
      "Opponent pattern detection across rolling windows",
      "Player load and availability signals",
      "Session planning informed by observed patterns",
    ],
    narrative: {
      problem: "Analysis can arrive after the useful decision window.",
      technology: "Automated ingestion, tagging and pattern analysis over match data.",
      control: "Coaching staff review, edit or reject recommendations.",
      outcome: "A clearer tactical briefing for the next decision.",
    },
  },
  {
    kicker: "02 / AI PRODUCTIVITY ASSISTANT",
    title: "AUTOMATION WITH A HUMAN CHECKPOINT",
    lead: "An assistant model for intake, drafting, review and reporting, designed around explicit human approval.",
    image: { src: aiWorkflow, alt: "AI workflow architecture with human-in-the-loop checkpoints" },
    bullets: [
      "Ingest: email, documents and systems of record",
      "Reason: retrieval, rules and model inference",
      "Checkpoint: human review before consequential action",
      "Act and learn: execute, log, measure and improve",
    ],
    narrative: {
      problem: "Skilled staff lose time to repetitive administrative work.",
      technology: "A governed assistant that drafts, routes and summarises work.",
      control: "A named human remains responsible for consequential actions.",
      outcome: "More time for high-value work with an auditable trail.",
    },
  },
  {
    kicker: "03 / SYSTEM PRINCIPLES",
    title: "HUMAN CONTROL IS THE FEATURE",
    lead: "Automation becomes useful when accountability, evidence and reversibility are part of the interface.",
    bullets: [
      "Every automated action has an owner and a reversible path",
      "Decisions retain the evidence that informed them",
      "Low-confidence outputs escalate instead of guessing",
      "Production writes stay behind explicit control boundaries",
    ],
    metrics: [
      { value: "0", label: "Silent decisions" },
      { value: "100%", label: "Human accountability" },
      { value: "01", label: "Clear escalation path" },
    ],
  },
  {
    kicker: "04 / EZROME",
    title: "BUILD THE RIGHT SYSTEM FOR THE REAL PROBLEM",
    lead: "Bring the problem. EZROME shapes the technology around the people who have to use, review and trust it.",
    finale: true,
  },
];

const narrativeSteps: { key: keyof Narrative; label: string }[] = [
  { key: "problem", label: "Real problem" },
  { key: "technology", label: "Technology" },
  { key: "control", label: "Human control" },
  { key: "outcome", label: "Practical outcome" },
];

function Deck() {
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0]!;
  const go = useCallback((delta: number) => setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + delta))), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06111f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_88%_80%,rgba(139,92,246,0.15),transparent_32%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-300/70" style={{ animation: "scan 9s linear infinite" }} aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <a href="https://ezrome.co.za" className="group flex items-center gap-3" aria-label="EZROME home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
            </span>
            <span>
              <span className="block font-mono text-[10px] tracking-[0.28em] text-cyan-200/70 uppercase">Sixolile Ezrome Mtyhali</span>
              <span className="block text-sm font-semibold tracking-[0.18em] text-white transition-colors group-hover:text-cyan-200 uppercase">EZROME</span>
            </span>
          </a>

          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-[0.16em] text-slate-400 uppercase" aria-label="Project navigation">
            <a href="https://ezrome.co.za/projects" className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-cyan-300/40 hover:text-cyan-200">Projects</a>
            <a href="https://github.com/EZROME02" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-cyan-300/40 hover:text-cyan-200">GitHub</a>
            <a href="https://www.linkedin.com/in/xillah-wethu-385aa63b4" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-cyan-300/40 hover:text-cyan-200">LinkedIn</a>
          </nav>
        </header>

        <section key={index} className="flex flex-1 flex-col justify-center py-9 sm:py-12" style={{ animation: "slide-enter 0.5s ease-out both" }}>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-cyan-200 uppercase">Built &amp; Demonstrated</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          </div>

          <p className="font-mono text-[11px] tracking-[0.28em] text-cyan-300 uppercase">{slide.kicker}</p>
          <h1 className="mt-4 max-w-5xl text-4xl leading-[0.98] font-semibold tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">{slide.title}</h1>
          <div className="mt-6 flex items-center gap-3"><div className="h-px w-24 bg-cyan-300/70" /><div className="h-px w-8 bg-violet-300/50" /></div>
          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{slide.lead}</p>

          {slide.image && (
            <div className="mt-9 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
              <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/20">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#06111f]/60 via-transparent to-transparent opacity-70" aria-hidden="true" />
                <img src={slide.image.src} alt={slide.image.alt} width={1536} height={864} loading="lazy" className="aspect-video h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
                <figcaption className="absolute bottom-4 left-4 z-20 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-slate-200 uppercase backdrop-blur">EZROME / VISUAL SYSTEM</figcaption>
              </figure>
              {slide.bullets && <BulletList items={slide.bullets} />}
            </div>
          )}

          {!slide.image && slide.bullets && <div className="mt-9 max-w-4xl"><BulletList items={slide.bullets} /></div>}

          {slide.narrative && (
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {narrativeSteps.map((step, i) => (
                <article key={step.key} className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.065]">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-violet-300 uppercase">0{i + 1} · {step.label}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{slide.narrative![step.key]}</p>
                </article>
              ))}
            </div>
          )}

          {slide.metrics && (
            <div className="mt-9 grid max-w-4xl gap-3 sm:grid-cols-3">
              {slide.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-cyan-200">{m.value}</p>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {slide.finale && (
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="https://ezrome.co.za/projects" className="rounded-full border border-cyan-300/50 bg-cyan-300/10 px-6 py-3 font-mono text-[11px] tracking-[0.16em] text-cyan-100 uppercase transition hover:bg-cyan-300/20">Explore projects</a>
              <a href="https://github.com/EZROME02" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 font-mono text-[11px] tracking-[0.16em] text-slate-200 uppercase transition hover:border-white/30 hover:bg-white/5">View GitHub</a>
            </div>
          )}
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
            {slides.map((s, i) => (
              <button key={s.title} role="tab" aria-selected={i === index} aria-label={s.title} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? "w-12 bg-cyan-300" : "w-5 bg-white/15 hover:bg-white/30"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <NavButton onClick={() => go(-1)} disabled={index === 0} label="Prev" />
            <NavButton onClick={() => go(1)} disabled={index === slides.length - 1} label="Next" />
          </div>
        </footer>
      </div>
    </main>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.65)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NavButton({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <button onClick={onClick} disabled={disabled} className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 font-mono text-[10px] tracking-[0.18em] text-slate-300 uppercase transition hover:border-cyan-300/30 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-25">{label}</button>
  );
}
