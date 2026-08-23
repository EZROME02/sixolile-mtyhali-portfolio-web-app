import { createFileRoute } from "@tanstack/react-router";
import { Portrait } from "@/components/Portrait";
import { EZROME_INTELLIGENCE } from "@/lib/intelligence";
import cvAsset from "@/assets/cv.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sixolile Ezrome Mtyhali — EZROME Technology Intelligence" },
      { name: "description", content: "EZROME technology portfolio: operations, logistics, customer service, applied AI, workplace productivity and technology intelligence." },
      { property: "og:title", content: "Sixolile Ezrome Mtyhali — EZROME Technology Intelligence" },
      { property: "og:description", content: "A practical technology portfolio combining real-world professional experience with AI, digital innovation and a 2026 technology roadmap." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EMAIL = "xillahwethu87@gmail.com";
const PHONE = "069 144 7275";
const CV_REQUEST = `mailto:${EMAIL}?subject=${encodeURIComponent("CV Request — Sixolile Ezrome Mtyhali")}&body=${encodeURIComponent("Hi Sixolile,\n\nI'd like to request a copy of your CV.\n\nCompany:\nRole:\nContact:\n\nThank you.")}`;
const AI_PROJECT_URL = "https://sixolile-mtyhali-ai-assistant.lovable.app";
const GITHUB_ACTIONS_URL = "https://github.com/EZROME02/sixolile-mtyhali-portfolio-web-app/actions";

const jobs = [
  { date: "Feb 2022 — Nov 2022", company: "Food Lovers' Meat Market", role: "Order Picker & Stock Tracker", points: ["Order picking and customer orders", "Stock tracking and inventory support", "Accurate product handling in a fast-paced retail environment"] },
  { date: "Dec 2022 — Jun 2023", company: "Albany Bakeries / Tiger Brands", role: "Assistant Machine Operator", points: ["Assisted production operations", "Supported machine operators", "Followed workplace and safety procedures"] },
  { date: "Jun 2023 — Nov 2023", company: "StageZero", role: "Picker", points: ["Order picking and product handling", "Accuracy and quality of picked items", "Supported fulfilment processes under pressure"] },
  { date: "Dec 2023 — Aug 2024", company: "Simba", role: "Picker & Sales Merchandiser", points: ["Picked and handled products", "Sales merchandising and shelf execution", "Stock availability and presentation"] },
  { date: "Most recent role", company: "Freightmore Ltd Pty", role: "Checker / Van Assistant", points: ["Checking goods and items", "Van and delivery support", "Logistics team support"] },
];

const skills = [
  { title: "Operations & Logistics", items: ["Order Picking", "Stock Tracking", "Checking & Packing", "Warehouse Operations", "Logistics Support"] },
  { title: "Customer & Sales", items: ["Customer Service", "Sales Merchandising", "Retail Support", "Communication", "Team Collaboration"] },
  { title: "Workplace Strengths", items: ["Reliability", "Time Management", "Adaptability", "Attention to Detail", "Working Under Pressure"] },
  { title: "Digital & AI", items: ["AI Literacy", "Prompting", "Responsible AI", "AI Productivity Tools", "AI Project Development"] },
];

const roadmap = [
  { period: "Q1 2026", title: "Data & Spreadsheet Fluency", detail: "Advanced spreadsheets, reporting and dashboarding for operations data." },
  { period: "Q2 2026", title: "Web Fundamentals", detail: "HTML, CSS and JavaScript foundations to build and maintain practical tools." },
  { period: "Q3 2026", title: "Applied AI Workflows", detail: "Automating repetitive workplace tasks with AI assistants and integrations." },
  { period: "Q4 2026", title: "Supply Chain Tech", detail: "Warehouse systems, inventory software and digital logistics tooling." },
];

function Index() {
  return (
    <div id="top" className="min-h-screen grid-field">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-4 py-3">
          <a href="#top" className="flex items-center gap-3"><Portrait className="size-10 shrink-0 rounded-sm ring-1 ring-primary/60" priority /><span className="leading-tight"><span className="block font-display text-sm font-bold tracking-tight">EZROME</span><span className="block label-mono text-cyan">Technology Intelligence</span></span></a>
          <nav className="hidden items-center gap-5 text-[10px] font-mono uppercase tracking-widest lg:flex">{["about", "experience", "skills", "projects", "roadmap", "cv", "contact"].map((id) => <a key={id} href={`#${id}`} className="text-muted-foreground transition hover:text-cyan">{id}</a>)}</nav>
          <a href={CV_REQUEST} className="rounded-sm border border-cyan/60 bg-cyan/10 px-4 py-2 font-mono text-[10px] tracking-widest text-cyan uppercase transition hover:bg-cyan/20">Download CV</a>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-6xl pb-24">
        <section className="grid items-center gap-8 py-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="label-mono text-cyan">Technology Professional & Digital Innovator</p>
            <h1 className="mt-4 font-display text-4xl leading-[0.98] font-bold sm:text-6xl lg:text-7xl">Sixolile Ezrome <span className="block text-cyan">Mtyhali</span></h1>
            <div className="mt-5 h-px w-40 rule-line" />
            <p className="mt-5 font-mono text-xs tracking-widest text-violet uppercase">Customer Service · Warehouse Operations · Sales Merchandising · Applied AI</p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">Hardworking and adaptable professional with hands-on experience across retail, warehousing, manufacturing, sales and logistics — now building practical AI and digital technology solutions.</p>
            <p className="mt-6 border-l-2 border-cyan/60 pl-4 font-display text-lg text-foreground/90">“Build smarter. Work harder. Create impact.”</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={CV_REQUEST} className="rounded-sm border border-cyan/60 bg-cyan/10 px-5 py-3 font-mono text-[11px] tracking-widest text-cyan uppercase transition hover:bg-cyan/20">Download CV</a>
              <a href="#projects" className="rounded-sm border border-border px-5 py-3 font-mono text-[11px] tracking-widest uppercase transition hover:bg-primary/15">View AI project</a>
              <a href="#intelligence" className="rounded-sm border border-violet/50 px-5 py-3 font-mono text-[11px] tracking-widest text-violet uppercase transition hover:bg-violet/10">EZROME Intelligence</a>
            </div>
          </div>
          <figure className="glass-card overflow-hidden rounded-lg"><Portrait className="h-full min-h-[28rem] w-full" priority /><figcaption className="border-t border-border px-5 py-4"><p className="label-mono text-cyan">Nova Technological</p><p className="mt-1 text-xs text-muted-foreground">AI · Cloud · Innovation · Technology</p></figcaption></figure>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">{[["05", "Professional roles across retail, production & logistics"], ["AI", "Google AI Essentials + applied AI project work"], ["2026", "Technology learning and development roadmap"]].map(([value, label]) => <div key={label} className="glass-card rounded-lg px-5 py-5"><p className="font-display text-3xl font-bold text-cyan">{value}</p><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}</section>

        <Section id="about" eyebrow="01 / Human context" title="About me"><div className="grid gap-4 md:grid-cols-3"><div className="glass-card p-5 md:col-span-2"><p className="text-sm leading-7 text-muted-foreground">Motivated and reliable, with hands-on experience across retail, manufacturing, warehousing, sales and logistics. I bring a practical mindset to technology: understand the real problem, choose the right tool, keep the human in control, and measure the outcome.</p></div><div className="glass-card p-5"><p className="label-mono text-violet">Operating principle</p><p className="mt-3 font-display text-lg">REAL PROBLEM → TECHNOLOGY → HUMAN CONTROL → PRACTICAL OUTCOME</p></div></div></Section>

        <Section id="experience" eyebrow="02 / Field record" title="Professional experience"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{jobs.map((job) => <article key={job.company} className="glass-card p-5"><span className="block size-2 rounded-full bg-cyan shadow-glow" /><p className="mt-3 font-mono text-[10px] tracking-widest text-cyan uppercase">{job.date}</p><h3 className="mt-2 text-sm font-bold">{job.company}</h3><p className="text-xs text-violet">{job.role}</p><ul className="mt-3 space-y-2 text-[11px] text-muted-foreground">{job.points.map((point) => <li key={point} className="flex gap-2"><span className="text-cyan">▸</span>{point}</li>)}</ul></article>)}</div></Section>

        <Section id="skills" eyebrow="03 / Capability matrix" title="Skills"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{skills.map((group) => <article key={group.title} className="glass-card p-5"><p className="label-mono text-violet">{group.title}</p><ul className="mt-3 space-y-2 text-xs text-muted-foreground">{group.items.map((item) => <li key={item} className="flex gap-2"><span className="text-cyan">✓</span>{item}</li>)}</ul></article>)}</div></Section>

        <Section id="projects" eyebrow="04 / Built & live" title="AI Workplace Productivity Assistant" subtitle="Demonstrated work — a working project rather than a concept."><div className="glass-card overflow-hidden md:grid md:grid-cols-[0.38fr_0.62fr]"><div className="grid min-h-64 place-items-center border-b border-border bg-gradient-to-br from-primary/10 via-background to-violet/10 p-8 md:border-b-0 md:border-r"><div className="w-full max-w-xs space-y-3 font-mono text-[10px] uppercase tracking-widest"><div className="border border-cyan/30 bg-cyan/5 p-4"><span className="text-cyan">INPUT</span><p className="mt-2 text-muted-foreground">workplace task / notes / research</p></div><div className="text-center text-cyan">↓ AI WORKFLOW ↓</div><div className="border border-violet/30 bg-violet/5 p-4"><span className="text-violet">OUTPUT</span><p className="mt-2 text-muted-foreground">draft · summary · plan · insight</p></div></div></div><div className="p-7"><div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-2 border border-signal/40 bg-signal/5 px-3 py-1 font-mono text-[10px] tracking-widest text-signal uppercase"><span className="size-1.5 rounded-full bg-signal" />Built & Live</span><span className="label-mono text-muted-foreground">Responsible AI</span></div><h3 className="mt-4 font-display text-2xl font-bold">AI EZROME ARTIST BOT / Workplace Productivity Assistant</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A practical assistant for professional communication, meeting notes, task planning, research and interactive workplace support, with responsible-AI guardrails.</p><div className="mt-5 flex flex-wrap gap-3"><a href={AI_PROJECT_URL} target="_blank" rel="noreferrer" className="rounded-sm border border-cyan/60 bg-cyan/10 px-4 py-2 font-mono text-[10px] tracking-widest text-cyan uppercase">Open live project ↗</a><a href="/ai" className="rounded-sm border border-border px-4 py-2 font-mono text-[10px] tracking-widest uppercase">Open AI workspace</a></div></div></div></Section>

        <Section id="intelligence" eyebrow="05 / EZROME Intelligence" title="Technology intelligence"><div className="grid gap-3 sm:grid-cols-2">{EZROME_INTELLIGENCE.map((item) => <article key={item.code} className="glass-card relative overflow-hidden p-6"><div className="absolute inset-x-0 top-0 h-px rule-line" /><p className="label-mono text-cyan">{item.code}</p><h3 className="mt-3 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p></article>)}</div></Section>

        <Section id="roadmap" eyebrow="06 / Development trajectory" title="2026 technology roadmap"><div className="grid gap-3 md:grid-cols-4">{roadmap.map((item) => <article key={item.period} className="glass-card p-5"><p className="label-mono text-violet">{item.period}</p><h3 className="mt-3 text-base font-bold">{item.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.detail}</p></article>)}</div></Section>

        <Section id="cv" eyebrow="07 / Recruiter access" title="CV & professional profile"><div className="glass-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-muted-foreground">Download the current recruiter-facing CV from the canonical portfolio asset.</p><p className="mt-2 label-mono text-cyan">Canonical portfolio profile → canonical CV asset</p></div><div className="flex flex-wrap gap-3"><a href={cvAsset.url} download="Sixolile_Ezrome_Mtyhali_CV.pdf" className="rounded-sm border border-cyan/60 bg-cyan/10 px-5 py-3 font-mono text-[10px] tracking-widest text-cyan uppercase">Download CV</a><a href={cvAsset.url} target="_blank" rel="noreferrer" className="rounded-sm border border-border px-5 py-3 font-mono text-[10px] tracking-widest uppercase">View CV asset</a></div></div></Section>

        <Section id="platform" eyebrow="08 / Platform engineering" title="Android, release & verification tooling"><div className="grid gap-3 md:grid-cols-3">{[["APK DEBUG", "Debug APK build, diagnostics, verification and SHA-256 artifact hashing."], ["RELEASE GATE", "Production signing remains behind the protected human approval environment."], ["ARTIFACT VERIFY", "Release signer fingerprint and final APK integrity are independently checked before publishing."]].map(([title, detail]) => <article key={title} className="glass-card p-5"><p className="label-mono text-cyan">{title}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p></article>)}</div><a href={GITHUB_ACTIONS_URL} target="_blank" rel="noreferrer" className="mt-5 inline-block font-mono text-[10px] tracking-widest text-cyan uppercase hover:underline">Open release & build actions ↗</a></Section>

        <Section id="contact" eyebrow="09 / Human connection" title="Contact"><div className="glass-card grid gap-4 p-6 sm:grid-cols-3"><div><p className="label-mono text-violet">Email</p><a className="mt-2 block text-sm text-cyan hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></div><div><p className="label-mono text-violet">Phone</p><a className="mt-2 block text-sm text-cyan hover:underline" href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a></div><div><p className="label-mono text-violet">Status</p><p className="mt-2 text-sm text-muted-foreground">Open to opportunities</p></div></div></Section>

        <footer className="border-t border-border py-10 text-center"><p className="label-mono text-cyan">EZROME TECHNOLOGY INTELLIGENCE</p><p className="mt-3 text-xs text-muted-foreground">REAL PROBLEM → TECHNOLOGY → HUMAN CONTROL → PRACTICAL OUTCOME</p><p className="mt-2 text-[10px] text-muted-foreground">Built for a responsive desktop and mobile experience.</p></footer>
      </main>
    </div>
  );
}

function Section({ id, eyebrow, title, subtitle, children }: { id: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24 py-12"><div className="mb-6"><p className="label-mono text-cyan">{eyebrow}</p><h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{title}</h2>{subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}</div>{children}</section>;
}
