import { createFileRoute } from "@tanstack/react-router";
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
const WHATSAPP_URL = "https://wa.me/27691447275";
const SIGNATURE = "EZROME";

const recruiterLinks = [
  { rank: "01", label: "Connect on LinkedIn", note: "Primary professional channel", href: LINKEDIN_URL, tone: "cyan" },
  { rank: "02", label: "Download my CV", note: "Recruiter-facing CV", href: CV_URL, tone: "cyan" },
  { rank: "03", label: "GitHub — proof of work", note: "Source, builds and release tooling", href: GITHUB_URL, tone: "violet" },
  { rank: "04", label: "Professional email", note: EMAIL, href: `mailto:${EMAIL}`, tone: "violet" },
  { rank: "05", label: "WhatsApp — direct contact", note: PHONE, href: WHATSAPP_URL, tone: "signal" },
];

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
