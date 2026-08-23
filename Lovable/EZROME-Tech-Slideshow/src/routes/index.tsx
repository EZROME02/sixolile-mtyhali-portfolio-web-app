import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/site-chrome";
import { profile, skillGroups } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Sixolile Ezrome Mtyhali — Technology Professional Portfolio" },
    { name: "description", content: "Portfolio of Sixolile Ezrome Mtyhali: operations, logistics and customer service experience with growing AI and digital capability." },
    { property: "og:title", content: "Sixolile Ezrome Mtyhali — Portfolio" },
    { property: "og:description", content: "Practical operations experience plus a 2026 technology roadmap and a live AI Productivity Assistant." },
    { property: "og:type", content: "profile" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});

const highlights = [
  { value: "5", label: "Roles across retail, production & logistics" },
  { value: "AI", label: "Google AI Essentials certified" },
  { value: "2026", label: "Technology roadmap in progress" },
];

function Home() {
  return <Page>
    <section className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <p className="label-mono text-cyan">{profile.identity}</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold sm:text-6xl">Sixolile Ezrome <span className="text-cyan">Mtyhali</span></h1>
        <div className="mt-5 h-px w-32 rule-line" />
        <p className="mt-5 font-mono text-xs tracking-widest text-violet uppercase">{profile.subtitle}</p>
        <p className="mt-6 max-w-xl text-muted-foreground">{profile.lead}</p>
        <p className="mt-6 border-l-2 border-cyan/60 pl-4 font-display text-lg text-foreground/90">“{profile.quote}”</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={profile.cv} target="_blank" rel="noopener" className="rounded-sm border border-cyan/60 bg-cyan/10 px-5 py-3 font-mono text-[11px] tracking-widest text-cyan uppercase transition-colors hover:bg-cyan/20">View my CV</a>
          <Link to="/projects" className="rounded-sm border border-border px-5 py-3 font-mono text-[11px] tracking-widest uppercase transition-colors hover:bg-primary/15">View AI project</Link>
        </div>
      </div>
      <figure className="glass-card overflow-hidden rounded-lg"><img src={profile.portrait} alt="Professional portrait of Sixolile Ezrome Mtyhali" width={520} height={700} className="h-full w-full object-cover" /><figcaption className="border-t border-border px-5 py-4"><p className="label-mono text-cyan">Nova Technological</p><p className="mt-1 text-xs text-muted-foreground">AI · Cloud · Innovation · Technology</p></figcaption></figure>
    </section>
    <section className="mt-14 grid gap-3 sm:grid-cols-3">{highlights.map((h) => <div key={h.label} className="glass-card rounded-lg px-5 py-5"><p className="font-display text-3xl font-bold text-cyan">{h.value}</p><p className="mt-2 text-sm text-muted-foreground">{h.label}</p></div>)}</section>
    <section className="mt-14"><h2 className="font-display text-2xl font-bold">Professional snapshot</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{skillGroups.map((g) => <article key={g.title} className="glass-card rounded-lg p-5"><p className="label-mono text-violet">{g.title}</p><ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">{g.items.slice(0, 4).map((i) => <li key={i}>{i}</li>)}</ul></article>)}</div><Link to="/skills" className="mt-6 inline-block font-mono text-[11px] tracking-widest text-cyan uppercase hover:underline">All skills →</Link></section>
  </Page>;
}
