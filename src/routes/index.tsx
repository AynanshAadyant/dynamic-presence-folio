import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section, SectionLabel } from "@/components/site-shell";
import { Panel, StatusPill, Tag } from "@/components/primitives";
import { site, rightNow } from "@/data/site";
import { projects } from "@/data/projects";
import { contributionStats, leetcode, spotify } from "@/data/dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ada Vance — Software Engineer & Systems Builder" },
      {
        name: "description",
        content:
          "Portfolio of Ada Vance, a software engineer working on edge infrastructure, local-first data and developer tooling. Projects, writing, and a live life dashboard.",
      },
      { property: "og:title", content: "Ada Vance — Software Engineer & Systems Builder" },
      {
        property: "og:description",
        content:
          "Edge infrastructure, local-first data and developer tooling. Case studies, writing and a life dashboard.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Section className="grid-noise border-b border-border py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatusPill label={site.status.label} />
          <h1 className="mt-8 max-w-4xl text-balance-tight text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
            I build fast systems
            <br />
            and the <span className="text-accent">interfaces</span>
            <br />
            that live on them.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {site.bio}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View projects <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent"
            >
              {site.email} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Section>

      <Section className="border-b border-border py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rightNow.map((r) => (
            <div key={r.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {r.label}
              </p>
              <p className="mt-1.5 text-sm">{r.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-20">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Three things I'm proud of
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
          >
            All projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {featured.map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }}>
              <Panel interactive className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.tagline}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <SectionLabel>Elsewhere on this site</SectionLabel>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link to="/dashboard" className="md:col-span-2">
            <Panel interactive className="h-full">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Life dashboard
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">
                {contributionStats.total.toLocaleString()} contributions ·{" "}
                {leetcode.solved} problems solved · {spotify.minutesThisWeek} min
                listened this week
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Coding activity, commits, LeetCode progress and music — in one bento
                grid.
              </p>
            </Panel>
          </Link>
          <Link to="/travel">
            <Panel interactive className="h-full">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Travel logs
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">27 countries</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Notes and photos from the road.
              </p>
            </Panel>
          </Link>
          <Link to="/blog">
            <Panel interactive className="h-full">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Writing
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">Essays</p>
              <p className="mt-3 text-sm text-muted-foreground">
                On caching, latency and alerting.
              </p>
            </Panel>
          </Link>
          <Link to="/resume" className="md:col-span-2">
            <Panel interactive className="h-full">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Resume
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">
                Eight years, four teams, one throughline
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Experience, skills and talks.
              </p>
            </Panel>
          </Link>
        </div>
      </Section>
    </>
  );
}
