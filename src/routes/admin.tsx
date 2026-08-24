import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { PageHeader, Section } from "@/components/site-shell";
import { Panel, Tag } from "@/components/primitives";
import { projects } from "@/data/projects";
import { posts } from "@/data/blog";
import { trips } from "@/data/travel";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Ada Vance" },
      { name: "description", content: "Private content management panel." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — Ada Vance" },
      { property: "og:description", content: "Private content management panel." },
    ],
  }),
  component: AdminPage,
});

const PASSCODE = "livingcanvas";

function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (!unlocked) {
    return (
      <Section className="py-24">
        <div className="mx-auto max-w-sm">
          <Panel>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-accent" />
              <h1 className="text-lg font-semibold tracking-tight">Restricted</h1>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              This panel manages site content. Enter the passcode to continue.
            </p>
            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (value === PASSCODE) {
                  setUnlocked(true);
                  setError(false);
                } else {
                  setError(true);
                }
              }}
            >
              <input
                type="password"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Passcode"
                className="w-full rounded-sm border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent/60"
              />
              <button
                type="submit"
                className="w-full rounded-sm border border-accent/50 bg-accent/10 px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
              >
                Unlock
              </button>
              {error ? (
                <p className="font-mono text-xs text-destructive">Incorrect passcode.</p>
              ) : null}
              <p className="font-mono text-[11px] text-muted-foreground/70">
                Demo passcode: {PASSCODE}
              </p>
            </form>
          </Panel>
        </div>
      </Section>
    );
  }

  return (
    <>
      <PageHeader
        label="Admin"
        title="Content panel"
        description="Read-only overview of everything published on the site. Editing is wired to mock data until a backend is connected."
      />

      <Section className="grid gap-4 py-12 lg:grid-cols-3">
        <Panel>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {projects.length}
            </span>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {projects.map((p) => (
              <li key={p.slug} className="py-3">
                <p className="text-sm">{p.title}</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  /projects/{p.slug} · {p.year}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Posts</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {posts.length}
            </span>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {posts.map((p) => (
              <li key={p.slug} className="py-3">
                <p className="text-sm">{p.title}</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {p.date} · {p.readingTime}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Trips</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {trips.length}
            </span>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {trips.map((t) => (
              <li key={t.slug} className="flex items-baseline justify-between py-3">
                <span className="text-sm">
                  {t.city}, {t.country}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {t.dates}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="lg:col-span-3">
          <h2 className="text-lg font-semibold tracking-tight">Status</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag active>Mock data</Tag>
            <Tag>No backend connected</Tag>
            <Tag>Client-side gate only</Tag>
          </div>
          <button
            type="button"
            onClick={() => setUnlocked(false)}
            className="mt-6 rounded-sm border border-border px-3 py-1.5 text-xs transition-colors hover:border-accent/60 hover:text-accent"
          >
            Lock panel
          </button>
        </Panel>
      </Section>
    </>
  );
}
