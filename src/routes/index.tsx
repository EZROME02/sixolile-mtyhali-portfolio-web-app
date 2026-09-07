import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AtSign, Check, CircleAlert, Cloud, Copy, Github, Globe2, Linkedin, LockKeyhole, Mail, MessageCircle, Radio, Server, Share2, Workflow } from "lucide-react";
import { Portrait } from "@/components/Portrait";
import cvAsset from "@/assets/cv.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sixolile Ezrome Mtyhali — EZROME | Full-Stack AI Developer" },
      {
        name: "description",
        content:
          "EZROME portfolio of Sixolile Ezrome Mtyhali: AI applications, web/PWA and Android development, GitHub engineering, and a 2026 Full-Stack AI Developer roadmap.",
      },
      { property: "og:title", content: "Sixolile Ezrome Mtyhali — EZROME" },
      {
        property: "og:description",
        content:
          "Emerging Full-Stack AI Developer building practical AI, web/PWA and Android projects under the EZROME brand.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EMAIL = "xillahwethu87@gmail.com";
const PHONE = "069 144 7275";
const CV_URL = cvAsset.url;
const AI_PROJECT_URL = "https://sixolile-mtyhali-ai-assistant.lovable.app";
const GITHUB_ACTIONS_URL = "https://github.com/EZROME02/sixolile-mtyhali-portfolio-web-app/actions";
const GITHUB_URL = "https://github.com/EZROME02";
const LINKEDIN_URL = "https://www.linkedin.com/in/xillah-wethu-385aa63b4";
const X_URL = "https://x.com/XillahW37827";
const WHATSAPP_URL = "https://wa.me/27691447275";
const SIGNATURE = "EZROME";
const SOCIAL_ICON_CLASS = "size-5";
const recruiterLinks = [
  { rank: "01", label: "Connect on LinkedIn", note: "Primary professional channel", href: LINKEDIN_URL, tone: "cyan", icon: Linkedin },
  { rank: "02", label: "Download my CV", note: "Recruiter-facing CV", href: CV_URL, tone: "cyan", icon: Copy },
  { rank: "03", label: "GitHub — proof of work", note: "Source, builds and release tooling", href: GITHUB_URL, tone: "violet", icon: Github },
  { rank: "04", label: "Follow on X", note: "Public updates and build progress", href: X_URL, tone: "violet", icon: AtSign },
  { rank: "05", label: "Professional email", note: EMAIL, href: `mailto:${EMAIL}`, tone: "violet", icon: Mail },
  { rank: "06", label: "WhatsApp — direct contact", note: PHONE, href: WHATSAPP_URL, tone: "signal", icon: MessageCircle },
];

const edgeApps = [
  { name: "EZROME public site", repo: "sixolile-mtyhali-portfolio-web-app", worker: "ezrome-public-site", state: "BUILD VERIFIED", tone: "cyan" },
  { name: "AI Productivity Assistant", repo: "AI-Productivity-Assistant", worker: "ezrome-ai-productivity-assistant", state: "BUILD VERIFIED", tone: "violet" },
];

const edgeRuns = [
  { label: "Portfolio Worker", commit: "27d67a6", detail: "Build verified · deploy credentials pending", state: "READY" },
  { label: "AI Assistant Worker", commit: "92ee91d", detail: "Build verified · deploy credentials pending", state: "READY" },
  { label: "Cloudflare deploy", commit: "6015311", detail: "Dependency cache expected package-lock.json", state: "FAILED" },
];

const registrarGuides = {
  "Hostinger / Afrihost": ["Log in and open Domains.", "Select ezrome.co.za → Nameservers.", "Choose custom nameservers.", "Replace both entries with the Cloudflare pair below and save."],
  GoDaddy: ["Open Domain Portfolio.", "Select ezrome.co.za → Nameservers.", "Choose your own nameservers.", "Paste the Cloudflare pair below and confirm."],
  Namecheap: ["Open Domain List → Manage.", "Choose CustomDNS.", "Enter the Cloudflare pair below.", "Save and allow propagation."],
  "Other registrar": ["Open your domain management area.", "Find Nameservers or DNS delegation.", "Choose custom / external nameservers.", "Enter the Cloudflare pair below and save."],
};

const jobs = [
  {
    date: "Feb 2022 — Nov 2022",
    company: "Food Lovers' Meat Market",
    role: "Order Picker & Stock Tracker",
    points: ["Order picking and customer orders", "Stock tracking and inventory support", "Accurate product handling in a fast-paced retail environment"],
  },
  {
    date: "Dec 2022 — Jun 2023",
    company: "Albany Bakeries / Tiger Brands",
    role: "Assistant Machine Operator",
    points: ["Assisted production operations", "Supported machine operators", "Followed workplace and safety procedures"],
  },
  {
    date: "Jun 2023 — Nov 2023",
    company: "StageZero",
    role: "Picker",
    points: ["Order picking and product handling", "Accuracy and quality of picked items", "Supported fulfilment processes under pressure"],
  },
  {
    date: "Dec 2023 — Aug 2024",
    company: "Simba",
    role: "Picker & Sales Merchandiser",
    points: ["Picked and handled products", "Sales merchandising and shelf execution", "Stock availability and presentation"],
  },
  {
    date: "Most recent role",
    company: "Freightmore Ltd Pty",
    role: "Checker / Van Assistant",
    points: ["Checking goods and items", "Van and delivery support", "Logistics team support"],
  },
];

const skills = [
  { title: "Built & Demonstrated", items: ["AI Applications", "JavaScript", "React", "Git & GitHub", "PWA / Web Development", "Android WebView"] },
  { title: "AI Development", items: ["AI Productivity Workflows", "AI Chat", "Prompting", "AI API Integration", "Responsible AI", "AI Project Development"] },
  { title: "Engineering Workflow", items: ["GitHub Actions", "Automated Testing", "CI/CD", "APK Build Verification", "SHA-256 Artifact Checks", "Release Gates"] },
  { title: "Currently Developing", items: ["Python", "Next.js", "Tailwind CSS", "FastAPI", "Supabase", "AI Agents / RAG / Vector Databases"] },
];

const roadmap = [
  { period: "FOUNDATIONS", title: "Python + Web Fundamentals", detail: "Developing Python, HTML, CSS, JavaScript and stronger Git/GitHub foundations." },
  { period: "FULL-STACK", title: "Modern Application Development", detail: "Developing React, Next.js, Tailwind CSS, FastAPI, Supabase and Vercel workflows." },
  { period: "AI DEVELOPMENT", title: "AI APIs + RAG + Agents", detail: "Building capability with AI APIs, retrieval-augmented generation, embeddings, vector databases, agents and tools." },
  { period: "GOAL", title: "Full-Stack AI Developer", detail: "Turn practical AI, web and Android project work into a stronger full-stack engineering capability." },
];

const projects = [
  {
    code: "AI-01",
    title: "EZROME ASSIST BOT",
    status: "Built & Demonstrated",
    detail: "AI productivity-oriented assistant exploring practical workflows such as AI chat, email generation, notes summarization, task planning and research assistance.",
    href: AI_PROJECT_URL,
    label: "Open AI project ↗",
  },
  {
    code: "AI-02",
    title: "AI Productivity Assistant",
    status: "Built & Demonstrated",
    detail: "Practical AI application work focused on integrating AI into useful everyday workplace and productivity workflows.",
    href: AI_PROJECT_URL,
    label: "View project ↗",
  },
  {
    code: "FT-03",
    title: "Rated Opinionz Bot",
    status: "Project / Intelligence Exploration",
    detail: "Football intelligence project exploring AI-assisted football information, analysis and opinion without overstating its current capabilities.",
    href: "#intelligence",
    label: "View intelligence work →",
  },
];

const intelligence = [
  { code: "EZ-01", title: "Build, Don't Just Claim", detail: "EZROME presents technology through working projects, repository evidence, testing and development progress." },
  { code: "EZ-02", title: "Practical AI", detail: "AI is approached as a tool for real workflows: communication, planning, research, summarization and productivity." },
  { code: "EZ-03", title: "Human-Controlled Releases", detail: "Android release workflows use protected production signing gates; private signing credentials are never exposed in the portfolio." },
  { code: "EZ-04", title: "Football Intelligence", detail: "Rated Opinionz Bot explores structured football information, analysis and opinion as an AI project direction." },
];

function Index() {
  const [shareStatus, setShareStatus] = useState("");
  const [registrar, setRegistrar] = useState<keyof typeof registrarGuides>("Hostinger / Afrihost");

  async function sharePortfolio() {
    const shareData = { title: "EZROME — Sixolile Ezrome Mtyhali", text: "Explore my AI, web and Android development portfolio.", url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Shared");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copied");
      }
    } catch {
      setShareStatus("");
    }
    window.setTimeout(() => setShareStatus(""), 2400);
  }

  return (
    <div id="top" className="min-h-screen grid-field">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <Portrait className="size-10 shrink-0 rounded-sm ring-1 ring-primary/60" priority />
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold tracking-[0.18em]">EZROME</span>
              <span className="block label-mono text-cyan">Sixolile Ezrome Mtyhali · Full-Stack AI Developer</span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 text-[10px] font-mono uppercase tracking-widest lg:flex">
            {["about", "experience", "skills", "projects", "roadmap", "cv", "contact"].map((id) => (
              <a key={id} href={`#${id}`} className="text-muted-foreground transition hover:text-cyan">{id}</a>
            ))}
          </nav>
          <a href={CV_URL} target="_blank" rel="noreferrer" className="rounded-sm border border-cyan/60 bg-cyan/10 px-4 py-2 font-mono text-[10px] tracking-widest text-cyan uppercase transition hover:bg-cyan/20">
            Download CV
          </a>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-6xl pb-24">
        <section className="grid items-center gap-8 py-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.42em] text-cyan sm:text-sm">EZROME</p>
            <p className="mt-2 label-mono text-muted-foreground">AI APPLICATIONS · WEB/PWA · ANDROID · GITHUB · AUTOMATION</p>
            <h1 className="mt-4 font-display text-4xl leading-[0.98] font-bold sm:text-6xl lg:text-7xl">
              Sixolile Ezrome <span className="block text-cyan">Mtyhali</span>
            </h1>
            <div className="mt-5 h-px w-40 rule-line" />
            <p className="mt-5 font-mono text-xs tracking-widest text-violet uppercase">
              Emerging Full-Stack AI Developer · AI Application Builder · Web & Android Developer
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              I build practical technology under the EZROME brand — combining AI applications, web/PWA experiences,
              Android development and GitHub-based engineering while developing toward a Full-Stack AI Developer career.
            </p>
            <p className="mt-6 border-l-2 border-cyan/60 pl-4 font-display text-lg text-foreground/90">
              “I don't just want to learn technology. I want to build with it.”
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="w-full rounded-sm border border-cyan/60 bg-cyan/15 px-5 py-3 text-center font-mono text-[11px] tracking-widest text-cyan uppercase transition hover:bg-cyan/25 sm:w-auto">Connect on LinkedIn</a>
              <a href={CV_URL} target="_blank" rel="noreferrer" className="w-full rounded-sm border border-cyan/60 bg-cyan/10 px-5 py-3 text-center font-mono text-[11px] tracking-widest text-cyan uppercase transition hover:bg-cyan/20 sm:w-auto">Download CV</a>
              <a href="#projects" className="rounded-sm border border-border px-5 py-3 font-mono text-[11px] tracking-widest uppercase transition hover:bg-primary/15">View AI projects</a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="rounded-sm border border-violet/50 px-5 py-3 font-mono text-[11px] tracking-widest text-violet uppercase transition hover:bg-violet/10">GitHub ↗</a>
              <button type="button" onClick={sharePortfolio} className="inline-flex items-center justify-center gap-2 rounded-sm border border-signal/60 px-5 py-3 font-mono text-[11px] tracking-widest text-signal uppercase transition hover:bg-signal/10" aria-label="Share this portfolio">
                <Share2 className="size-4" /> {shareStatus || "Share portfolio"}
              </button>
            </div>
          </div>

          <figure className="glass-card overflow-hidden rounded-lg">
            <Portrait className="h-full min-h-[28rem] w-full" priority />
            <figcaption className="border-t border-border px-5 py-4">
              <p className="label-mono text-cyan">EZROME</p>
              <p className="mt-1 text-xs text-muted-foreground">AI · Web/PWA · Android · Automation</p>
            </figcaption>
          </figure>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          {[
            ["AI", "Practical AI application projects"],
            ["WEB + ANDROID", "PWA and Android development work"],
            ["2026", "Full-Stack AI Developer roadmap"],
          ].map(([value, label]) => (
            <div key={label} className="glass-card rounded-lg px-5 py-5">
              <p className="font-display text-3xl font-bold text-cyan">{value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </section>

        <section id="edge-ops" className="edge-ops-shell mt-16 overflow-hidden rounded-xl border border-cyan/20">
          <div className="edge-ops-hero">
            <div>
              <p className="label-mono text-cyan">EZROME / EDGE OPS · 07 SEP 2026</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-none sm:text-6xl">Ship the work.<br /><span className="text-cyan">Own the edge.</span></h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">A deployment companion for the portfolio and AI Productivity Assistant—moving from verified code to a resolvable domain without guesswork.</p>
              <div className="mt-6 flex flex-wrap gap-3"><a href="#edge-deploy" className="rounded-sm bg-cyan px-4 py-3 font-mono text-[10px] font-bold tracking-widest text-navy uppercase transition hover:translate-y-[-2px]">See the path →</a><a href="#edge-dns" className="rounded-sm border border-cyan/40 px-4 py-3 font-mono text-[10px] tracking-widest text-cyan uppercase transition hover:bg-cyan/10">Inspect DNS</a></div>
            </div>
            <div className="edge-architecture" aria-label="Interactive EZROME Cloudflare architecture visualization">
              <div className="edge-orbit edge-orbit-one" /><div className="edge-orbit edge-orbit-two" />
              <div className="edge-node edge-node-cloud"><Cloud className="size-5" /><span>Cloudflare edge</span><b>CONNECTED</b><i>Traffic terminates here</i></div>
              <div className="edge-node edge-node-portfolio"><span>01</span><strong>Portfolio</strong><b>BUILD READY</b><i>SSR + static assets</i></div>
              <div className="edge-node edge-node-ai"><span>02</span><strong>AI Assistant</strong><b>BUILD READY</b><i>Independent rollback</i></div>
            </div>
          </div>
          <div className="edge-summary-grid"><div><span>ACCOUNT</span><strong>Xillahwethu87&apos;s Account</strong></div><div><span>ZONE</span><strong>ezrome.co.za</strong></div><div><span>WORKERS</span><strong>2 planned targets</strong></div><div><span>NEXT BLOCKER</span><strong className="text-signal">Registrar delegation</strong></div></div>

          <div id="edge-apps" className="edge-block"><div className="edge-heading"><div><span className="label-mono text-cyan">01 / APPLICATIONS</span><h3>Two apps. One deployment language.</h3></div><p>Each repository owns its own Worker, build pipeline, and rollback surface.</p></div><div className="grid gap-3 md:grid-cols-2">{edgeApps.map((app) => <article key={app.worker} className={`edge-app-card edge-${app.tone}`}><div className="flex items-center justify-between"><span className="label-mono">{app.tone === "cyan" ? "PORTFOLIO" : "PRODUCTIVITY"}</span><span className="edge-ready"><span />{app.state}</span></div><h4>{app.name}</h4><p className="mt-2 text-xs text-muted-foreground">{app.repo}</p><div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-muted-foreground"><Server className="size-3 text-cyan" />{app.worker}</div></article>)}</div></div>

          <div id="edge-dns" className="edge-block edge-dns"><div className="edge-heading"><div><span className="label-mono text-cyan">02 / DOMAIN HEALTH</span><h3>The edge is ready.<br /><span className="text-cyan">The address is not.</span></h3></div><p>Cloudflare has the zone, but public DNS still returns NXDOMAIN. This is a registrar-side delegation step.</p></div><div className="edge-dns-panel"><div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[10px] tracking-widest"><span className="flex items-center gap-2"><Radio className="size-3" /> RESOLUTION TRACE</span><span className="text-signal">ACTION REQUIRED</span></div>{[["DOMAIN","ezrome.co.za","NXDOMAIN"],["CLOUDFLARE ZONE","Pending","UNRESOLVABLE"],["DNS RECORDS","0 records","EMPTY"]].map(([label,value,state]) => <div key={label} className="edge-trace-row"><span>{label}</span><strong>{value}</strong><b>{state}</b></div>)}<div className="mt-4 rounded-sm bg-navy-deep p-3"><span className="label-mono">ASSIGNED NAMESERVERS</span><button className="edge-copy-row" onClick={() => navigator.clipboard?.writeText("kristina.ns.cloudflare.com")}>kristina.ns.cloudflare.com <Copy className="size-3" /></button><button className="edge-copy-row" onClick={() => navigator.clipboard?.writeText("troy.ns.cloudflare.com")}>troy.ns.cloudflare.com <Copy className="size-3" /></button></div><p className="mt-4 flex gap-2 text-xs leading-5 text-signal"><CircleAlert className="mt-0.5 size-3 shrink-0" />Update these nameservers wherever the domain was purchased. Cloudflare cannot publish delegation at the .co.za registry.</p></div></div>

          <div id="edge-deploy" className="edge-block"><div className="edge-heading"><div><span className="label-mono text-cyan">03 / DEPLOYMENT HISTORY</span><h3>Every release leaves a trail.</h3></div><p>A visual snapshot of recent GitHub Actions workflows. Live polling can be connected once secrets are available.</p></div><div className="edge-history"><div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[10px] tracking-widest"><span className="flex items-center gap-2"><Workflow className="size-3" /> RECENT RUNS</span><span className="text-cyan">● SNAPSHOT</span></div>{edgeRuns.map((run) => <div key={run.commit} className="edge-run-row"><span className={`edge-run-icon ${run.state === "FAILED" ? "edge-run-fail" : "edge-run-ok"}`}>{run.state === "FAILED" ? <CircleAlert className="size-3" /> : <Check className="size-3" />}</span><div><strong>{run.label}</strong><p>{run.detail} · <code>{run.commit}</code></p></div><b className={run.state === "FAILED" ? "text-signal" : "text-cyan"}>{run.state}</b></div>)}</div></div>

          <div id="edge-dns-guide" className="edge-block edge-dns-guide"><div className="edge-heading"><div><span className="label-mono text-cyan">04 / REGISTRAR PLAYBOOK</span><h3>Tell the registrar<br /><span className="text-cyan">where to point.</span></h3></div><p>Choose where your domain is registered for a short, targeted nameserver checklist.</p></div><div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="flex flex-wrap content-start gap-2">{Object.keys(registrarGuides).map((name) => <button key={name} onClick={() => setRegistrar(name as keyof typeof registrarGuides)} className={`rounded-sm border px-3 py-2 font-mono text-[10px] transition ${registrar === name ? "border-cyan bg-cyan text-navy" : "border-border text-muted-foreground hover:border-cyan/50"}`}>{name}</button>)}</div><div className="edge-guide-card"><div className="flex items-start justify-between"><div><span className="label-mono text-cyan">SELECTED GUIDE</span><h4 className="mt-2 text-xl">{registrar}</h4></div><Globe2 className="size-5 text-cyan" /></div><ol className="mt-4 space-y-2">{registrarGuides[registrar].map((step, index) => <li key={step} className="flex gap-3 border-b border-border py-2 text-xs"><span className="font-mono text-cyan">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol><div className="mt-4 rounded-sm bg-navy-deep px-3 py-2 font-mono text-[11px] text-cyan">kristina.ns.cloudflare.com<br />troy.ns.cloudflare.com</div></div></div></div>
        </section>

        <Section id="about" eyebrow="01 / Professional identity" title="About me">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass-card p-5 md:col-span-2">
              <p className="text-sm leading-7 text-muted-foreground">
                I am Sixolile Ezrome Mtyhali, an emerging Full-Stack AI Developer building practical technology under EZROME.
                My background includes retail, warehousing, manufacturing, sales and logistics, while my current direction is focused on
                AI applications, web/PWA development, Android and software-development workflows.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                I use real projects to turn learning into evidence: building, testing, debugging, working with GitHub and CI/CD,
                and documenting what is still developing. My goal is to become a Full-Stack AI Developer by continuously building useful software.
              </p>
            </div>
            <div className="glass-card p-5">
              <p className="label-mono text-violet">Core message</p>
              <p className="mt-3 font-display text-lg">BUILD → DEMONSTRATE → LEARN → IMPROVE → BUILD AGAIN</p>
            </div>
          </div>
        </Section>

        <Section id="experience" eyebrow="02 / Field record" title="Professional experience">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {jobs.map((job) => (
              <article key={job.company} className="glass-card p-5">
                <span className="block size-2 rounded-full bg-cyan shadow-glow" />
                <p className="mt-3 font-mono text-[10px] tracking-widest text-cyan uppercase">{job.date}</p>
                <h3 className="mt-2 text-sm font-bold">{job.company}</h3>
                <p className="text-xs text-violet">{job.role}</p>
                <ul className="mt-3 space-y-2 text-[11px] text-muted-foreground">
                  {job.points.map((point) => <li key={point} className="flex gap-2"><span className="text-cyan">▸</span>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">These roles are presented as real operations, manufacturing, retail and logistics experience — not as software employment. The transferable strengths are process discipline, teamwork, accuracy, adaptability and problem solving.</p>
        </Section>

        <Section id="skills" eyebrow="03 / Capability matrix" title="Skills & development status">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <article key={group.title} className="glass-card p-5">
                <p className="label-mono text-violet">{group.title}</p>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  {group.items.map((item) => <li key={item} className="flex gap-2"><span className="text-cyan">✓</span>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="04 / Project evidence" title="EZROME projects" subtitle="Built and demonstrated work is separated from technologies still being developed.">
          <div className="grid gap-3 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.code} className="glass-card relative overflow-hidden p-6">
                <div className="absolute inset-x-0 top-0 h-px rule-line" />
                <div className="flex items-center justify-between gap-3">
                  <p className="label-mono text-cyan">{project.code}</p>
                  <span className="text-[9px] font-mono tracking-widest text-signal uppercase">{project.status}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.detail}</p>
                <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-5 inline-block rounded-sm border border-cyan/60 bg-cyan/10 px-4 py-2 font-mono text-[10px] tracking-widest text-cyan uppercase">{project.label}</a>
              </article>
            ))}
          </div>

          <div className="mt-4 glass-card overflow-hidden md:grid md:grid-cols-[0.38fr_0.62fr]">
            <div className="grid min-h-64 place-items-center border-b border-border bg-gradient-to-br from-primary/10 via-background to-violet/10 p-8 md:border-b-0 md:border-r">
              <div className="w-full max-w-xs space-y-3 font-mono text-[10px] uppercase tracking-widest">
                <div className="border border-cyan/30 bg-cyan/5 p-4"><span className="text-cyan">INPUT</span><p className="mt-2 text-muted-foreground">task / notes / research / communication</p></div>
                <div className="text-center text-cyan">↓ EZROME AI WORKFLOW ↓</div>
                <div className="border border-violet/30 bg-violet/5 p-4"><span className="text-violet">OUTPUT</span><p className="mt-2 text-muted-foreground">draft · summary · plan · research support</p></div>
              </div>
            </div>
            <div className="p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-signal/40 bg-signal/5 px-3 py-1 font-mono text-[10px] tracking-widest text-signal uppercase"><span className="size-1.5 rounded-full bg-signal" />Built & Demonstrated</span>
                <span className="label-mono text-muted-foreground">EZROME ASSIST BOT</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">AI Productivity Assistant</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">A practical AI application focused on useful productivity workflows such as communication support, summarization, task planning and research assistance.</p>
              <a href={AI_PROJECT_URL} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-sm border border-cyan/60 bg-cyan/10 px-4 py-2 font-mono text-[10px] tracking-widest text-cyan uppercase">Open live project ↗</a>
            </div>
          </div>
        </Section>

        <Section id="intelligence" eyebrow="05 / EZROME Intelligence" title="Technology intelligence">
          <div className="grid gap-3 sm:grid-cols-2">
            {intelligence.map((item) => (
              <article key={item.code} className="glass-card relative overflow-hidden p-6">
                <div className="absolute inset-x-0 top-0 h-px rule-line" />
                <p className="label-mono text-cyan">{item.code}</p>
                <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="roadmap" eyebrow="06 / Development trajectory" title="2026 Full-Stack AI Developer roadmap">
          <div className="grid gap-3 md:grid-cols-4">
            {roadmap.map((item) => (
              <article key={item.period} className="glass-card p-5">
                <p className="label-mono text-violet">{item.period}</p>
                <h3 className="mt-3 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="cv" eyebrow="07 / Recruiter access" title="CV & professional profile">
          <div className="glass-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Recruiter-facing CV for Sixolile Ezrome Mtyhali, connected to the canonical EZROME portfolio.</p>
              <p className="mt-2 label-mono text-cyan">Canonical portfolio → canonical CV asset</p>
            </div>
            <a href={CV_URL} target="_blank" rel="noreferrer" className="rounded-sm border border-cyan/60 bg-cyan/10 px-5 py-3 font-mono text-[10px] tracking-widest text-cyan uppercase">Download CV</a>
          </div>
        </Section>

        <Section id="platform" eyebrow="08 / Platform engineering" title="Android, PWA & verification">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["ANDROID", "EZROME Android application using application ID com.ezrome.app, Android SDK 35, Java 17 and a WebView-based architecture."],
              ["PWA / WEB", "Responsive web/PWA experience with offline/error handling, Web Storage and mobile navigation work."],
              ["CI / RELEASE", "GitHub Actions workflows support builds, automated verification, APK artifact checks, SHA-256 verification and protected production signing gates."],
            ].map(([title, detail]) => (
              <article key={title} className="glass-card p-5">
                <p className="label-mono text-cyan">{title}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">Production signing and Google Play publication are not claimed here unless independently verified. Private signing credentials remain protected and are never displayed in the portfolio.</p>
          <a href={GITHUB_ACTIONS_URL} target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono text-[10px] tracking-widest text-cyan uppercase hover:underline">Open GitHub Actions ↗</a>
        </Section>

        <Section id="contact" eyebrow="09 / Human connection" title="Professional identity & contact" subtitle="Recruiter funnel: LinkedIn → EZROME portfolio → projects & GitHub → CV → contact.">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass-card flex flex-col gap-4 p-6">
              <div className="flex items-center gap-4">
                <Portrait className="size-16 shrink-0 rounded-sm ring-1 ring-cyan/50" />
                <div>
                  <p className="font-display text-sm font-bold tracking-[0.28em] text-cyan">EZROME</p>
                  <p className="mt-1 text-sm font-bold">Sixolile Ezrome Mtyhali</p>
                  <p className="label-mono text-muted-foreground">Emerging Full-Stack AI Developer</p>
                </div>
              </div>
              <div className="h-px w-full rule-line" />
              <p className="text-xs leading-6 text-muted-foreground">AI applications · Web/PWA · Android · GitHub · Automation</p>
              <p className="label-mono text-signal">Status · Building toward Full-Stack AI Development</p>
            </div>

            <ol className="grid gap-3">
              {recruiterLinks.map((link) => (
                <li key={link.rank}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="glass-card flex min-h-14 items-center gap-4 px-5 py-4 transition hover:bg-primary/10"
                  >
                    <link.icon className="size-5 shrink-0 text-cyan" aria-hidden="true" />
                    <span className={`font-mono text-[10px] tracking-widest text-${link.tone}`}>{link.rank}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">{link.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{link.note}</span>
                    </span>
                    <span className="text-cyan">→</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 glass-card p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-violet/40 bg-violet/5 px-3 py-1 font-mono text-[10px] tracking-widest text-violet uppercase">Approval-first</span>
              <span className="label-mono text-muted-foreground">LinkedIn Career Agent</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The career agent can prepare profile copy, recruiter outreach drafts and content suggestions. Nothing is published or sent to LinkedIn automatically — every item requires explicit human approval before publication.
            </p>
          </div>
        </Section>

        <footer className="border-t border-border py-10 text-center">
          <p className="font-display text-xs font-bold tracking-[0.42em] text-cyan">EZROME</p>
          <p className="mt-2 label-mono text-muted-foreground">SIXOLILE EZROME MTYHALI · FULL-STACK AI DEVELOPER</p>
          <p className="mt-3 text-xs text-muted-foreground">I don't just want to learn technology. I want to build with it.</p>
          <p className="mt-2 text-[10px] text-muted-foreground">Built for a responsive desktop and mobile experience.</p>
        </footer>
      </main>
    </div>
  );
}

function Section({ id, eyebrow, title, subtitle, children }: { id: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      <div className="mb-6">
        <p className="label-mono text-cyan">{eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
