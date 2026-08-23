export const experience = [
  {
    company: "Northwind Systems",
    role: "Staff Software Engineer",
    period: "2024 — Present",
    location: "Lisbon (remote)",
    summary:
      "Own the edge and caching layer behind a multi-tenant analytics product serving 4,000+ organisations.",
    points: [
      "Designed and shipped Atlas Edge Cache, cutting p95 API latency from 480ms to 62ms and origin load by 81%.",
      "Led a four-engineer platform pod; introduced RFC-first design reviews now used org-wide.",
      "Reduced infrastructure spend by $14k/month while doubling request volume.",
    ],
    stack: ["TypeScript", "Rust", "Cloudflare Workers", "Postgres"],
  },
  {
    company: "Loom Notes",
    role: "Founding Engineer",
    period: "2022 — 2024",
    location: "Berlin",
    summary:
      "First engineering hire at a local-first note-taking startup; built the sync engine and editor.",
    points: [
      "Built a CRDT sync engine on Yjs with a stateless relay, reaching 3.1ms p99 keystroke latency.",
      "Shipped the web, macOS and iOS clients from a shared TypeScript core.",
      "Grew from 0 to 42,000 weekly active users with zero data-loss incidents.",
    ],
    stack: ["React", "TypeScript", "Yjs", "Electron"],
  },
  {
    company: "Carto Labs",
    role: "Senior Frontend Engineer",
    period: "2020 — 2022",
    location: "Berlin",
    summary:
      "Built data-visualisation tooling for geospatial teams working with very large datasets.",
    points: [
      "Wrote Meridian Charts, a canvas rendering layer handling 1M points at 60fps in 14KB gzipped.",
      "Cut initial bundle size by 46% through route-level code splitting and dependency audits.",
      "Mentored three engineers, two of whom were promoted within the year.",
    ],
    stack: ["TypeScript", "Canvas", "WebGL", "D3"],
  },
  {
    company: "Bright Harbor",
    role: "Software Engineer",
    period: "2018 — 2020",
    location: "Dublin",
    summary: "Full-stack product work on a logistics scheduling platform.",
    points: [
      "Rebuilt the dispatch scheduler, reducing average plan computation from 90s to 4s.",
      "Introduced the first end-to-end test suite; release rollbacks dropped by 70%.",
    ],
    stack: ["Python", "React", "Postgres"],
  },
];

export const education = [
  {
    school: "Trinity College Dublin",
    degree: "BA (Mod) Computer Science",
    period: "2014 — 2018",
    note: "First class honours. Thesis on conflict resolution in replicated documents.",
  },
];

export const skillGroups = [
  {
    group: "Languages",
    items: ["TypeScript", "Rust", "Go", "Python", "SQL", "Swift"],
  },
  {
    group: "Frontend",
    items: ["React", "TanStack", "Tailwind", "Canvas", "Framer Motion"],
  },
  {
    group: "Backend & data",
    items: ["Postgres", "ClickHouse", "Redis", "Kafka", "Cloudflare Workers"],
  },
  {
    group: "Practice",
    items: [
      "Systems design",
      "Performance profiling",
      "Design systems",
      "Mentoring",
      "Technical writing",
    ],
  },
];

export const speaking = [
  { title: "Caching at the edge without lying to users", event: "EdgeConf Seoul", year: "2024" },
  { title: "Local-first is a latency decision", event: "React Summit", year: "2025" },
  { title: "Alert budgets: fewer, truer pages", event: "SREday Lisbon", year: "2026" },
];
