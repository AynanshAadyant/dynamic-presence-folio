import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Section, SectionLabel } from "@/components/site-shell";
import { CodeCard, Panel, Stat, Tag } from "@/components/primitives";
import { getProject } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — Ada Vance" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — Case study by Ada Vance` },
        { name: "description", content: project.tagline },
        { property: "og:title", content: `${project.title} — Case study` },
        { property: "og:description", content: project.tagline },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <>
      <Section className="border-b border-border py-16">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>
        <h1 className="mt-8 max-w-4xl text-balance-tight text-4xl font-semibold sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>
        <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3 lg:grid-cols-4">
          <Meta label="Role" value={project.role} />
          <Meta label="Timeline" value={project.timeline} />
          <Meta label="Year" value={project.year} />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-b border-border py-16">
        <SectionLabel>01 — The problem</SectionLabel>
        <div className="mt-6 max-w-3xl space-y-5">
          {project.problem.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section className="border-b border-border py-16">
        <SectionLabel>02 — Architecture</SectionLabel>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            {project.architecture.map((a, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
          <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-6 font-mono text-xs leading-relaxed text-muted-foreground">
            {project.architectureDiagram}
          </pre>
        </div>
      </Section>

      <Section className="border-b border-border py-16">
        <SectionLabel>03 — Key features</SectionLabel>
        <div className="mt-8 space-y-12">
          {project.features.map((f) => (
            <div key={f.title} className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
              <CodeCard {...f.code} />
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-16">
        <SectionLabel>04 — Impact</SectionLabel>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((m) => (
            <Stat key={m.label} {...m} />
          ))}
        </div>
        <Panel className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Want the longer version, or the parts that didn't work?
          </p>
          <a
            href="mailto:hello@adavance.dev"
            className="rounded-sm border border-border px-4 py-2 text-sm transition-colors hover:border-accent/60 hover:text-accent"
          >
            Ask me about {project.accentWord}
          </a>
        </Panel>
      </Section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm">{value}</p>
    </div>
  );
}
