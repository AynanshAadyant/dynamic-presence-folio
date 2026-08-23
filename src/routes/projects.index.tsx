import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, Section } from "@/components/site-shell";
import { Panel, Tag } from "@/components/primitives";
import { projects, allTags } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Ada Vance" },
      {
        name: "description",
        content:
          "Case studies on edge caching, local-first sync, observability pipelines, design token systems and high-performance charting.",
      },
      { property: "og:title", content: "Projects — Ada Vance" },
      {
        property: "og:description",
        content:
          "Case studies on edge caching, local-first sync, observability and developer tooling.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  return (
    <>
      <PageHeader
        label="Work"
        title="Projects"
        description="Six builds, each with the problem it solved and the numbers that came out the other side. Filter by discipline."
      />

      <Section className="py-10">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActive(null)} type="button">
            <Tag active={active === null}>All ({projects.length})</Tag>
          </button>
          {allTags.map((t) => (
            <button key={t} onClick={() => setActive(t)} type="button">
              <Tag active={active === t}>{t}</Tag>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {visible.map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }}>
              <Panel interactive className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight">{p.title}</h2>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {p.year} · {p.role}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.tagline}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                  {p.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <p className="text-xl font-semibold text-accent">{m.value}</p>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
