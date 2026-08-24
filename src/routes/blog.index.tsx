import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site-shell";
import { Tag } from "@/components/primitives";
import { posts } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Writing — Ada Vance" },
      {
        name: "description",
        content:
          "Essays on caching, local-first architecture, alerting budgets, flamegraphs and versioned design tokens.",
      },
      { property: "og:title", content: "Writing — Ada Vance" },
      {
        property: "og:description",
        content:
          "Essays on caching, local-first architecture, alerting and design systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHeader
        label="Writing"
        title="Notes from the build"
        description="Longer-form thinking about the systems I work on. Fewer posts, more editing."
      />

      <Section className="py-10">
        <div className="divide-y divide-border border-b border-border">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group block py-8"
            >
              <p className="font-mono text-xs text-muted-foreground">
                {p.date} · {p.readingTime}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                {p.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
