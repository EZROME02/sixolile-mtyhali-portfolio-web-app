import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import footballIntel from "@/assets/football-intel.jpg";
import aiWorkflow from "@/assets/ai-workflow.jpg";

export const Route = createFileRoute("/ezrome-intelligence")({
  head: () => ({
    meta: [
      { title: "EZROME Technology Intelligence — Sixolile Mtyhali" },
      { name: "description", content: "A futuristic slideshow on EZROME football intelligence and the AI Productivity Assistant board pitch: real problem, technology, human control, practical outcome." },
      { property: "og:title", content: "EZROME Technology Intelligence" },
      { property: "og:description", content: "Football tactical intelligence and human-controlled AI workflows, presented as a technical slideshow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

type Narrative = { problem: string; technology: string; control: string; outcome: string };
type Slide = { kicker: string; title: string; lead: string; bullets?: string[]; image?: { src: string; alt: string }; narrative?: Narrative; metrics?: { value: string; label: string }[]; finale?: boolean };

const slides: Slide[] = [
  { kicker: "EZROME // 01", title: "EZROME TECHNOLOGY INTELLIGENCE", lead: "Where football instinct meets engineered intelligence. A working system, not a concept deck.", metrics: [{ value: "04", label: "Intelligence layers" }, { value: "100%", label: "Human sign-off" }, { value: "01", label: "Shared narrative" }] },
  { kicker: "EZROME // 02", title: "FOOTBALL INTELLIGENCE", lead: "Match data turned into decisions coaches can act on before the next whistle.", image: { src: footballIntel, alt: "Tactical football intelligence dashboard with player data nodes" }, bullets: ["Positional heatmaps and pass networks per fixture", "Opponent pattern detection across rolling windows", "Player load and availability signals", "Session plans generated from what the data shows"], narrative: { problem: "Analysis arrives days after it can change anything.", technology: "Automated ingestion, tagging and pattern models over match feeds.", control: "Coaching staff accept, edit or reject every recommendation.", outcome: "Tactical briefings ready the same evening as the match." } },
  { kicker: "EZROME // 03", title: "AI PRODUCTIVITY ASSISTANT — BOARD PITCH", lead: "One assistant across intake, drafting, review and reporting, wired to human checkpoints.", image: { src: aiWorkflow, alt: "AI workflow architecture with human-in-the-loop checkpoints" }, bullets: ["Ingest: email, documents, systems of record", "Reason: retrieval, rules and model inference", "Checkpoint: mandatory human review before action", "Act & learn: execute, log, measure, improve"], narrative: { problem: "Skilled staff spend their day on repeatable admin.", technology: "A governed assistant that drafts, routes and summarises work.", control: "Nothing leaves the system without a named human approver.", outcome: "Hours returned per person, per week, with a full audit trail." } },
  { kicker: "EZROME // 04", title: "HUMAN CONTROL BY DESIGN", lead: "Automation is only useful when someone stays accountable for the output.", bullets: ["Every automated action has an owner and a reversible path", "Decisions logged with the evidence that produced them", "Confidence thresholds escalate instead of guessing", "No silent writes to production systems"], metrics: [{ value: "0", label: "Unreviewed actions" }, { value: "100%", label: "Auditable decisions" }, { value: "<1s", label: "Escalation latency" }] },
  { kicker: "EZROME // 05", title: "LET'S BUILD THE NEXT IDEA", lead: "Bring the problem. We shape the technology around the people who have to live with it.", finale: true },
];

const narrativeSteps: { key: keyof Narrative; label: string }[] = [
  { key: "problem", label: "Real problem" }, { key: "technology", label: "Technology" }, { key: "control", label: "Human control" }, { key: "outcome", label: "Practical outcome" },
];

function Deck() {
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0]!;
  const go = useCallback((delta: number) => setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + delta))), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight" || e.key === "PageDown") go(1); if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 grid-field opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rule-line opacity-70" style={{ animation: "scan 9s linear infinite" }} aria-hidden="true" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 sm:py-10">
        <header className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-signal" /><span className="label-mono text-muted-foreground">Sixolile Mtyhali · EZROME</span></div><span className="label-mono text-cyan">{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span></header>
        <section key={index} className="flex flex-1 flex-col justify-center py-10" style={{ animation: "slide-enter 0.5s ease-out both" }}>
          <p className="label-mono text-cyan">{slide.kicker}</p><h1 className="mt-4 max-w-4xl text-3xl leading-[1.05] font-bold text-foreground sm:text-5xl lg:text-6xl">{slide.title}</h1><div className="mt-5 h-px w-32 rule-line" /><p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{slide.lead}</p>
          {slide.image && <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start"><figure className="glass-card overflow-hidden rounded-lg"><img src={slide.image.src} alt={slide.image.alt} width={1536} height={864} loading="lazy" className="h-full w-full object-cover" /></figure>{slide.bullets && <BulletList items={slide.bullets} />}</div>}
          {!slide.image && slide.bullets && <div className="mt-8 max-w-3xl"><BulletList items={slide.bullets} /></div>}
          {slide.narrative && <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{narrativeSteps.map((step, i) => <article key={step.key} className="glass-card rounded-lg p-4"><p className="label-mono text-violet">0{i + 1} · {step.label}</p><p className="mt-3 text-sm text-foreground/85">{slide.narrative![step.key]}</p></article>)}</div>}
          {slide.metrics && <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">{slide.metrics.map((m) => <div key={m.label} className="glass-card rounded-lg px-5 py-4"><p className="font-display text-3xl font-bold text-cyan">{m.value}</p><p className="label-mono mt-2 text-muted-foreground">{m.label}</p></div>)}</div>}
          {slide.finale && <div className="mt-10 flex flex-wrap gap-3"><a href="mailto:hello@ezrome.tech" className="rounded-md border border-cyan/60 bg-cyan/10 px-6 py-3 font-mono text-sm tracking-widest text-cyan uppercase">Start a conversation</a></div>}
        </section>
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5"><div className="flex gap-1.5" role="tablist" aria-label="Slides">{slides.map((s, i) => <button key={s.title} role="tab" aria-selected={i === index} aria-label={s.title} onClick={() => setIndex(i)} className={`h-1 rounded-full transition-all ${i === index ? "w-12 bg-cyan" : "w-6 bg-border hover:bg-primary/60"}`} />)}</div><div className="flex gap-2"><NavButton onClick={() => go(-1)} disabled={index === 0} label="Prev" /><NavButton onClick={() => go(1)} disabled={index === slides.length - 1} label="Next" /></div></footer>
      </div>
    </main>
  );
}

function BulletList({ items }: { items: string[] }) { return <ul className="glass-card space-y-3 rounded-lg p-5">{items.map((item) => <li key={item} className="flex gap-3 text-sm text-foreground/85"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{item}</li>)}</ul>; }
function NavButton({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) { return <button onClick={onClick} disabled={disabled} className="rounded-md border border-border px-5 py-2 font-mono text-xs tracking-widest uppercase transition-colors hover:bg-primary/15 disabled:opacity-30">{label}</button>; }
