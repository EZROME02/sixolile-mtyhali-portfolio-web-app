import { Link, createFileRoute } from "@tanstack/react-router";
import { SEO_PROJECTS, SEO_SITE_DESCRIPTION, SEO_SITE_TITLE, SEO_SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects | ${SEO_SITE_TITLE}` },
      {
        name: "description",
        content: `${SEO_SITE_DESCRIPTION} Explore the demonstrated EZROME projects and work still in development.`,
      },
    ],
    links: [{ rel: "canonical", href: `${SEO_SITE_URL}/projects` }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="min-h-screen grid-field px-6 py-16 text-foreground">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="label-mono text-cyan hover:underline">← EZROME home</Link>
        <p className="mt-10 label-mono text-violet">EZROME / PROJECT REGISTRY</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">Built & Developing</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          A crawlable index of Sixolile Ezrome Mtyhali's EZROME technology work. Status labels are intentionally explicit so demonstrated work is not confused with roadmap development.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SEO_PROJECTS.map((project) => (
            <article key={project.slug} className="glass-card rounded-lg p-6">
              <p className="label-mono text-cyan">{project.status}</p>
              <h2 className="mt-3 font-display text-2xl font-bold">{project.name}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="rounded-sm border border-cyan/50 bg-cyan/10 px-4 py-2 font-mono text-[10px] tracking-widest text-cyan uppercase hover:bg-cyan/20"
                >
                  View project
                </Link>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-sm border border-border px-4 py-2 font-mono text-[10px] tracking-widest uppercase hover:bg-primary/15">
                    GitHub proof
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
