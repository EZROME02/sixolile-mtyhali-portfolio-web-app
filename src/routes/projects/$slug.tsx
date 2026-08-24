import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SEO_PROJECTS, SEO_SITE_TITLE, SEO_SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = SEO_PROJECTS.find((entry) => entry.slug === params.slug);
    return {
      meta: [
        { title: project ? `${project.name} | ${SEO_SITE_TITLE}` : `Project not found | ${SEO_SITE_TITLE}` },
        ...(project ? [{ name: "description", content: project.description }] : []),
      ],
      links: project ? [{ rel: "canonical", href: project.url }] : [],
    };
  },
  loader: ({ params }) => {
    const project = SEO_PROJECTS.find((entry) => entry.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();

  return (
    <main className="min-h-screen grid-field px-6 py-16 text-foreground">
      <article className="mx-auto max-w-4xl">
        <div className="flex flex-wrap gap-4">
          <Link to="/projects" className="label-mono text-cyan hover:underline">← All projects</Link>
          <Link to="/" className="label-mono text-muted-foreground hover:text-cyan">EZROME home</Link>
        </div>
        <p className="mt-12 label-mono text-violet">EZROME / PROJECT</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-bold sm:text-6xl">{project.name}</h1>
          <span className="border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-[10px] tracking-widest text-cyan uppercase">
            {project.status}
          </span>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">{project.description}</p>

        <section className="mt-10 glass-card rounded-lg p-6">
          <h2 className="font-display text-xl font-bold">About this project</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This page is part of the canonical EZROME project registry. It connects the public project identity to its supporting source material without claiming capabilities that are not represented in the repository.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-sm border border-cyan/50 bg-cyan/10 px-4 py-2 font-mono text-[10px] tracking-widest text-cyan uppercase hover:bg-cyan/20">
                View source on GitHub
              </a>
            )}
            <a href={`${SEO_SITE_URL}/projects`} className="rounded-sm border border-border px-4 py-2 font-mono text-[10px] tracking-widest uppercase hover:bg-primary/15">
              Project registry
            </a>
          </div>
        </section>
      </article>
    </main>
  );
}
