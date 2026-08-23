export type Metric = { label: string; value: string; note?: string };

export type CodeBlock = {
  title: string;
  language: string;
  code: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  timeline: string;
  stack: string[];
  tags: string[];
  featured: boolean;
  accentWord: string;
  problem: string[];
  architecture: string[];
  architectureDiagram: string;
  features: { title: string; description: string; code: CodeBlock }[];
  metrics: Metric[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "atlas-edge-cache",
    title: "Atlas Edge Cache",
    tagline:
      "A globally distributed read-through cache that cut p95 API latency from 480ms to 62ms.",
    year: "2026",
    role: "Lead engineer",
    timeline: "5 months",
    stack: ["TypeScript", "Rust", "Cloudflare Workers", "Redis", "Postgres"],
    tags: ["Infrastructure", "TypeScript", "Performance"],
    featured: true,
    accentWord: "Edge",
    problem: [
      "The product API served a read-heavy workload from a single primary region. Users in APAC paid a 300ms transatlantic penalty on every dashboard load, and traffic spikes routinely saturated the primary Postgres replica.",
      "Naive CDN caching was not an option: 70% of responses were user-scoped, and stale permission data was a hard security boundary we could not cross.",
    ],
    architecture: [
      "A Worker sits in front of the origin and resolves a cache key from the route, the tenant id, and a permissions epoch stored in Redis.",
      "Invalidation is push-based: any write emits a versioned epoch bump, so a stale key can never be served after a permission change — it simply misses.",
      "Origin responses are compressed and stored in a per-region KV namespace with a soft TTL for stale-while-revalidate and a hard TTL for safety.",
    ],
    architectureDiagram: `client ──► edge worker ──► KV (region)
              │              ▲
              │ miss         │ warm
              ▼              │
          origin API ──► Postgres
              │
              └─► epoch bump ──► Redis (global)`,
    features: [
      {
        title: "Permission-aware cache keys",
        description:
          "Every key embeds a monotonically increasing epoch per tenant, making invalidation a single integer write instead of a fan-out purge.",
        code: {
          title: "cache-key.ts",
          language: "typescript",
          code: `export async function cacheKey(req: Request, tenant: string) {
  const epoch = await redis.get(\`epoch:\${tenant}\`) ?? "0";
  const url = new URL(req.url);
  return \`v2:\${tenant}:\${epoch}:\${url.pathname}\${url.search}\`;
}`,
        },
      },
      {
        title: "Stale-while-revalidate at the edge",
        description:
          "Soft-expired entries are served immediately while a background fetch refreshes them, so a cold origin never becomes user-visible latency.",
        code: {
          title: "swr.ts",
          language: "typescript",
          code: `const hit = await kv.get(key, "json");
if (hit && hit.softExpiresAt < Date.now()) {
  ctx.waitUntil(revalidate(key, req));
  return json(hit.body, { headers: { "x-cache": "STALE" } });
}`,
        },
      },
      {
        title: "Deterministic load shedding",
        description:
          "Under origin pressure the worker degrades to cached-only mode for non-critical routes rather than queueing requests.",
        code: {
          title: "shed.rs",
          language: "rust",
          code: `if origin.inflight() > MAX_INFLIGHT && route.is_soft() {
    return Response::from_cache_or(503, "cache-only mode");
}`,
        },
      },
    ],
    metrics: [
      { label: "p95 latency", value: "62ms", note: "down from 480ms" },
      { label: "Origin load", value: "-81%", note: "requests to Postgres" },
      { label: "Cache hit rate", value: "94.2%", note: "30-day rolling" },
      { label: "Infra spend", value: "-$14k/mo" },
    ],
    links: [
      { label: "Case study", href: "#" },
      { label: "Source", href: "#" },
    ],
  },
  {
    slug: "loom-notes",
    title: "Loom Notes",
    tagline:
      "Local-first note taking with CRDT sync, offline editing, and sub-frame keystroke latency.",
    year: "2025",
    role: "Founding engineer",
    timeline: "8 months",
    stack: ["React", "TypeScript", "Yjs", "IndexedDB", "WebSockets"],
    tags: ["Product", "TypeScript", "React"],
    featured: true,
    accentWord: "Local-first",
    problem: [
      "Existing note apps treated the network as the source of truth. Every keystroke round-tripped, which made writing on a train genuinely unpleasant.",
      "We wanted a document model where the local replica is authoritative, sync is a background detail, and conflicts resolve without a merge UI.",
    ],
    architecture: [
      "Documents are Yjs CRDTs persisted to IndexedDB on every transaction and replicated over a thin WebSocket relay.",
      "The relay is stateless: it fans out binary updates and appends them to an object-store log used for cold-start snapshots.",
      "The editor renders from an in-memory ProseMirror view bound to the CRDT, so typing never awaits IO.",
    ],
    architectureDiagram: `┌ device A ┐          ┌ relay ┐          ┌ device B ┐
│ ProseMirror│◄──►│ fan-out │◄──►│ ProseMirror│
│   Yjs doc  │      │ + log   │      │   Yjs doc  │
│ IndexedDB  │      └────┬────┘      │ IndexedDB  │
└────────────┘           ▼           └────────────┘
                    object store`,
    features: [
      {
        title: "Zero-await keystrokes",
        description:
          "Persistence and sync are both post-commit side effects; the editor state updates synchronously.",
        code: {
          title: "doc.ts",
          language: "typescript",
          code: `doc.on("update", (update: Uint8Array, origin) => {
  queueMicrotask(() => idb.append(docId, update));
  if (origin !== "remote") socket.send(update);
});`,
        },
      },
      {
        title: "Snapshot compaction",
        description:
          "Update logs are compacted into snapshots after 500 entries, keeping cold loads under 200ms even for year-old documents.",
        code: {
          title: "compact.ts",
          language: "typescript",
          code: `if (log.length > 500) {
  const snapshot = Y.encodeStateAsUpdate(doc);
  await store.put(\`snap:\${docId}\`, snapshot);
  await store.clearLog(docId);
}`,
        },
      },
    ],
    metrics: [
      { label: "Keystroke latency", value: "3.1ms", note: "p99, 10k-word doc" },
      { label: "Offline sessions", value: "38%", note: "of all edit sessions" },
      { label: "Sync conflicts", value: "0", note: "resolved by CRDT" },
      { label: "Cold load", value: "180ms" },
    ],
    links: [{ label: "Live demo", href: "#" }],
  },
  {
    slug: "signal-garden",
    title: "Signal Garden",
    tagline:
      "A self-hosted observability pipeline that turns noisy logs into a small number of honest alerts.",
    year: "2025",
    role: "Backend + data",
    timeline: "3 months",
    stack: ["Go", "ClickHouse", "Grafana", "Kafka"],
    tags: ["Infrastructure", "Data"],
    featured: true,
    accentWord: "Signal",
    problem: [
      "The team received 400+ alerts a week and acknowledged roughly 6% of them. Alert fatigue had quietly become the primary reliability risk.",
      "The fix was not another dashboard — it was a pipeline that scores anomalies against seasonal baselines before anything reaches a human.",
    ],
    architecture: [
      "Ingest workers normalise events into a wide ClickHouse table partitioned by day and service.",
      "A rolling job computes per-metric seasonal baselines (hour-of-week) and writes z-scores back into a materialised view.",
      "Alert rules query the scored view, so thresholds are relative rather than absolute.",
    ],
    architectureDiagram: `services ──► kafka ──► ingest workers ──► clickhouse
                                             │
                          baseline job ◄─────┤
                                │            ▼
                                └──► scored view ──► alerts`,
    features: [
      {
        title: "Seasonal z-scoring",
        description:
          "Baselines are keyed by hour-of-week, so Monday 09:00 traffic is compared against other Monday mornings, not a flat average.",
        code: {
          title: "baseline.sql",
          language: "sql",
          code: `SELECT service, metric,
       toHour(ts) AS h, toDayOfWeek(ts) AS d,
       avg(value) AS mu, stddevPop(value) AS sigma
FROM events
WHERE ts > now() - INTERVAL 28 DAY
GROUP BY service, metric, h, d;`,
        },
      },
      {
        title: "Alert budget",
        description:
          "Each service has a weekly alert budget; low-score anomalies are batched into a digest instead of paging.",
        code: {
          title: "budget.go",
          language: "go",
          code: `if budget.Remaining(svc) <= 0 && score < CriticalScore {
    digest.Append(alert)
    return nil
}
return pager.Page(alert)`,
        },
      },
    ],
    metrics: [
      { label: "Alerts / week", value: "23", note: "down from 400+" },
      { label: "Ack rate", value: "88%" },
      { label: "MTTD", value: "4.5 min" },
      { label: "Events / day", value: "1.2B" },
    ],
    links: [{ label: "Write-up", href: "#" }],
  },
  {
    slug: "kite-design-tokens",
    title: "Kite Tokens",
    tagline:
      "One token pipeline feeding Figma, web, iOS and Android from a single source of truth.",
    year: "2024",
    role: "Design systems",
    timeline: "4 months",
    stack: ["TypeScript", "Style Dictionary", "Figma API", "Swift", "Kotlin"],
    tags: ["Design Systems", "TypeScript"],
    featured: false,
    accentWord: "Tokens",
    problem: [
      "Four platforms maintained four colour palettes that drifted apart within weeks of every rebrand.",
      "Designers edited Figma styles, engineers edited constants, and nobody owned the diff.",
    ],
    architecture: [
      "Tokens live in a typed TS source file, validated by Zod and versioned in git.",
      "A build step emits CSS custom properties, a Swift enum, a Kotlin object, and a Figma variables payload.",
      "CI opens a PR into each platform repo whenever the token source changes.",
    ],
    architectureDiagram: `tokens.ts ──► validate ──► emit ──┬──► css vars
                                  ├──► Colors.swift
                                  ├──► Colors.kt
                                  └──► figma variables`,
    features: [
      {
        title: "Typed token source",
        description:
          "Every token is a semantic name mapped to an OKLCH value, so contrast checks run at build time.",
        code: {
          title: "tokens.ts",
          language: "typescript",
          code: `export const color = {
  "surface/base": oklch(0.145, 0.007, 285),
  "text/primary": oklch(0.985, 0, 0),
  "accent/default": oklch(0.75, 0.16, 162),
} satisfies Record<TokenName, Oklch>;`,
        },
      },
      {
        title: "Contrast gate in CI",
        description:
          "A build fails if any documented text/surface pairing drops below WCAG AA.",
        code: {
          title: "contrast.test.ts",
          language: "typescript",
          code: `for (const [fg, bg] of pairings) {
  expect(contrast(color[fg], color[bg])).toBeGreaterThanOrEqual(4.5);
}`,
        },
      },
    ],
    metrics: [
      { label: "Platforms in sync", value: "4" },
      { label: "Rebrand time", value: "2 days", note: "was 6 weeks" },
      { label: "Contrast failures", value: "0", note: "shipped since launch" },
      { label: "Tokens", value: "312" },
    ],
    links: [{ label: "Docs", href: "#" }],
  },
  {
    slug: "harbor-cli",
    title: "Harbor CLI",
    tagline:
      "A developer CLI that turns a 40-minute environment setup into a single command.",
    year: "2024",
    role: "Developer experience",
    timeline: "6 weeks",
    stack: ["Rust", "Docker", "SQLite"],
    tags: ["Developer Tools", "Rust"],
    featured: false,
    accentWord: "Harbor",
    problem: [
      "New engineers spent their first day fighting Docker, seed data and secrets before writing a line of code.",
      "The onboarding doc had 47 steps and was wrong in three places at any given moment.",
    ],
    architecture: [
      "A declarative harbor.toml describes services, seeds and required secrets.",
      "The CLI reconciles the declared state against running containers and only touches what drifted.",
      "Seed snapshots are content-addressed in SQLite so repeated setups are near-instant.",
    ],
    architectureDiagram: `harbor.toml ──► planner ──► reconciler ──► docker
                     │                        │
                     └──► secret resolver ────┘`,
    features: [
      {
        title: "Idempotent reconcile",
        description:
          "Running the command twice is a no-op; running it after a config change touches only the affected services.",
        code: {
          title: "reconcile.rs",
          language: "rust",
          code: `for svc in plan.services() {
    match runtime.state(&svc)? {
        State::Matches(hash) if hash == svc.hash => continue,
        _ => runtime.recreate(&svc)?,
    }
}`,
        },
      },
    ],
    metrics: [
      { label: "Setup time", value: "3 min", note: "was ~40 min" },
      { label: "Adoption", value: "100%", note: "of the eng org" },
      { label: "Support tickets", value: "-92%" },
      { label: "Binary size", value: "8.4 MB" },
    ],
    links: [{ label: "Source", href: "#" }],
  },
  {
    slug: "meridian-charts",
    title: "Meridian Charts",
    tagline:
      "A canvas charting layer that renders 1M points at 60fps without a WebGL dependency.",
    year: "2023",
    role: "Frontend",
    timeline: "3 months",
    stack: ["TypeScript", "Canvas 2D", "Web Workers"],
    tags: ["Performance", "TypeScript", "React"],
    featured: false,
    accentWord: "60fps",
    problem: [
      "SVG charts collapsed past 20k points, and the WebGL alternative added 300KB plus a class of GPU bugs we could not debug remotely.",
      "The data was dense but the visual requirement was simple: lines, bands, and a crosshair.",
    ],
    architecture: [
      "A worker downsamples series with the largest-triangle-three-buckets algorithm into a fixed pixel budget.",
      "The main thread draws to an offscreen canvas and blits, keeping layout and paint off the critical path.",
      "Interaction state (crosshair, tooltip) lives in a separate overlay canvas that redraws independently.",
    ],
    architectureDiagram: `raw series ──► worker (LTTB) ──► typed array
                                    │
                       offscreen canvas ──► blit ──► screen
                                    │
                          overlay canvas (crosshair)`,
    features: [
      {
        title: "Pixel-budget downsampling",
        description:
          "Never draw more points than the chart has horizontal pixels; the reduction runs off the main thread.",
        code: {
          title: "lttb.ts",
          language: "typescript",
          code: `export function lttb(data: Float64Array, threshold: number) {
  if (threshold >= data.length / 2) return data;
  const bucket = (data.length - 2) / (threshold - 2);
  // pick the point forming the largest triangle per bucket
  return reduceBuckets(data, bucket);
}`,
        },
      },
    ],
    metrics: [
      { label: "Points rendered", value: "1M" },
      { label: "Frame time", value: "12ms", note: "p95" },
      { label: "Bundle cost", value: "14KB", note: "gzipped" },
      { label: "Devices supported", value: "All", note: "no GPU requirement" },
    ],
    links: [{ label: "Source", href: "#" }],
  },
];

export const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags)),
).sort();

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
