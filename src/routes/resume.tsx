import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site-shell";
import { Panel, Tag } from "@/components/primitives";
import { experience, education, skillGroups, speaking } from "@/data/resume";
import { site } from "@/data/site";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Ada Vance, Staff Software Engineer" },
      {
        name: "description",
        content:
          "Eight years building edge infrastructure, local-first sync engines and data-visualisation tooling. Experience, skills, education and talks.",
      },
      { property: "og:title", content: "Resume — Ada Vance" },
      {
        property: "og:description",
        content:
          "Staff engineer: edge infrastructure, local-first sync and developer tooling.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <>
      <PageHeader
        label="Resume"
        title={`${site.role} — ${site.name}`}
        description={site.bio}
      />

      <Section className="py-12">
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
          <span>{site.location}</span>
          <span>{site.timezone}</span>
          <a href={`mailto:${site.email}`} className="hover:text-accent">
            {site.email}
          </a>
        </div>

        <h2 className="mt-14 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Experience
        </h2>
        <div className="mt-6 space-y-4">
          {experience.map((e) => (
            <Panel key={e.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold tracking-tight">
                  {e.role}{" "}
                  <span className="text-muted-foreground">· {e.company}</span>
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {e.period} · {e.location}
                </p>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {e.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <span className="text-accent">—</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                {e.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </Panel>
          ))}
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Panel>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Skills
            </h2>
            <div className="mt-6 space-y-5">
              {skillGroups.map((g) => (
                <div key={g.group}>
                  <p className="text-sm font-medium">{g.group}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <Tag key={i}>{i}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="space-y-4">
            <Panel>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Education
              </h2>
              {education.map((ed) => (
                <div key={ed.school} className="mt-5">
                  <p className="text-lg font-semibold tracking-tight">{ed.school}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {ed.degree} · {ed.period}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{ed.note}</p>
                </div>
              ))}
            </Panel>

            <Panel>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Speaking
              </h2>
              <ul className="mt-5 space-y-4">
                {speaking.map((s) => (
                  <li key={s.title}>
                    <p className="text-sm">{s.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {s.event} · {s.year}
                    </p>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </Section>
    </>
  );
}
