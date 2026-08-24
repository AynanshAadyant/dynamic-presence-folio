import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site-shell";
import { Panel } from "@/components/primitives";
import {
  heatmap,
  contributionStats,
  commits,
  leetcode,
  languages,
  spotify,
  reading,
} from "@/data/dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Life Dashboard — Ada Vance" },
      {
        name: "description",
        content:
          "A living dashboard: GitHub contribution heatmap, recent commits, LeetCode progress, listening habits and current reading.",
      },
      { property: "og:title", content: "Life Dashboard — Ada Vance" },
      {
        property: "og:description",
        content:
          "GitHub activity, LeetCode progress, listening habits and reading — updated continuously.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const LEVELS = [
  "bg-surface-2",
  "bg-accent/20",
  "bg-accent/40",
  "bg-accent/65",
  "bg-accent",
];

function Heatmap() {
  const weeks: (typeof heatmap)[] = [];
  for (let i = 0; i < heatmap.length; i += 7) weeks.push(heatmap.slice(i, i + 7));

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((d) => (
              <span
                key={d.date}
                title={`${d.date}: ${d.count} contributions`}
                className={`h-[10px] w-[10px] rounded-[2px] ${LEVELS[d.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Bar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  );
}

function DashboardPage() {
  return (
    <>
      <PageHeader
        label="Life dashboard"
        title="What I'm actually doing"
        description="Code, problems, music and books — the ambient signal behind the CV. Numbers are illustrative mock data for now."
      />

      <Section className="grid gap-4 py-12 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight">Coding activity</h2>
            <p className="font-mono text-xs text-muted-foreground">
              {contributionStats.total.toLocaleString()} contributions · last 12 months
            </p>
          </div>
          <div className="mt-6">
            <Heatmap />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
            <div>
              <p className="text-2xl font-semibold text-accent">
                {contributionStats.currentStreak}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Current streak
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{contributionStats.longestStreak}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Longest streak
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{contributionStats.bestDay}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Best day
              </p>
            </div>
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold tracking-tight">Languages</h2>
          <div className="mt-6 space-y-4">
            {languages.map((l) => (
              <div key={l.name}>
                <div className="mb-1.5 flex justify-between font-mono text-xs">
                  <span>{l.name}</span>
                  <span className="text-muted-foreground">{l.pct}%</span>
                </div>
                <Bar pct={l.pct} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <h2 className="text-lg font-semibold tracking-tight">Recent commits</h2>
          <ul className="mt-5 divide-y divide-border">
            {commits.map((c) => (
              <li key={c.sha} className="flex flex-wrap gap-x-4 gap-y-1 py-3">
                <span className="font-mono text-xs text-accent">{c.sha}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{c.message}</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {c.repo} · {c.when}
                </span>
                <span className="font-mono text-[11px]">
                  <span className="text-accent">+{c.additions}</span>{" "}
                  <span className="text-destructive">-{c.deletions}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">LeetCode</h2>
            <span className="font-mono text-xs text-muted-foreground">
              rank {leetcode.rank}
            </span>
          </div>
          <p className="mt-5 text-3xl font-semibold">
            {leetcode.solved}
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / {leetcode.total}
            </span>
          </p>
          <div className="mt-5 space-y-3">
            {(
              [
                ["Easy", leetcode.easy],
                ["Medium", leetcode.medium],
                ["Hard", leetcode.hard],
              ] as const
            ).map(([label, d]) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between font-mono text-xs">
                  <span>{label}</span>
                  <span className="text-muted-foreground">
                    {d.solved}/{d.total}
                  </span>
                </div>
                <Bar pct={Math.round((d.solved / d.total) * 100)} />
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
            {leetcode.streak}-day streak · contest {leetcode.contestRating}
          </div>
          <ul className="mt-4 space-y-2">
            {leetcode.recent.map((r) => (
              <li key={r.title} className="flex justify-between gap-3 text-sm">
                <span className="truncate">{r.title}</span>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {r.difficulty} · {r.when}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold tracking-tight">Now playing</h2>
          <p className="mt-5 text-xl font-semibold tracking-tight">
            {spotify.nowPlaying.track}
          </p>
          <p className="text-sm text-muted-foreground">
            {spotify.nowPlaying.artist} — {spotify.nowPlaying.album}
          </p>
          <div className="mt-4">
            <Bar pct={Math.round(spotify.nowPlaying.progress * 100)} />
          </div>
          <p className="mt-5 font-mono text-xs text-muted-foreground">
            {spotify.minutesThisWeek} minutes this week
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {spotify.topArtists.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold tracking-tight">Top tracks</h2>
          <ol className="mt-5 space-y-3">
            {spotify.topTracks.map((t, i) => (
              <li key={t.title} className="flex items-baseline gap-3 text-sm">
                <span className="font-mono text-xs text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {t.title}{" "}
                  <span className="text-muted-foreground">— {t.artist}</span>
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {t.plays}
                </span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold tracking-tight">Reading</h2>
          <div className="mt-5 space-y-5">
            {reading.map((b) => (
              <div key={b.title}>
                <p className="text-sm">{b.title}</p>
                <p className="mb-2 font-mono text-[11px] text-muted-foreground">
                  {b.author} · {Math.round(b.progress * 100)}%
                </p>
                <Bar pct={Math.round(b.progress * 100)} />
              </div>
            ))}
          </div>
        </Panel>
      </Section>
    </>
  );
}
