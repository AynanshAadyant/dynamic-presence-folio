// Deterministic mock data — generated from a fixed seed so SSR and the client
// render identical markup.

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ANCHOR = new Date("2026-08-23T00:00:00Z");

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

function buildHeatmap(): Day[] {
  const rand = mulberry32(20260823);
  const days: Day[] = [];
  for (let i = 363; i >= 0; i--) {
    const d = new Date(ANCHOR.getTime() - i * 86400000);
    const dow = d.getUTCDay();
    const weekendPenalty = dow === 0 || dow === 6 ? 0.35 : 1;
    const r = rand();
    const raw = Math.floor(r * r * 18 * weekendPenalty);
    const count = r > 0.93 ? raw + 9 : raw;
    const level: Day["level"] =
      count === 0 ? 0 : count < 3 ? 1 : count < 7 ? 2 : count < 13 ? 3 : 4;
    days.push({ date: d.toISOString().slice(0, 10), count, level });
  }
  return days;
}

export const heatmap = buildHeatmap();

export const contributionStats = {
  total: heatmap.reduce((sum, d) => sum + d.count, 0),
  currentStreak: 18,
  longestStreak: 64,
  bestDay: 27,
};

export const commits = [
  {
    repo: "northwind/atlas-edge",
    message: "feat(cache): epoch-scoped keys for tenant permission changes",
    sha: "9f4c1ab",
    when: "2h ago",
    additions: 214,
    deletions: 68,
  },
  {
    repo: "northwind/atlas-edge",
    message: "perf: skip revalidation when soft TTL is within jitter window",
    sha: "3ce77d0",
    when: "6h ago",
    additions: 41,
    deletions: 12,
  },
  {
    repo: "adavance/loom-notes",
    message: "fix(sync): compact update log before snapshot upload",
    sha: "b21e990",
    when: "Yesterday",
    additions: 96,
    deletions: 141,
  },
  {
    repo: "adavance/kite-tokens",
    message: "chore: bump contrast gate to WCAG AA for all text pairings",
    sha: "77a0d5e",
    when: "Yesterday",
    additions: 33,
    deletions: 4,
  },
  {
    repo: "northwind/signal-garden",
    message: "feat(alerts): weekly alert budget per service",
    sha: "c40b8f2",
    when: "2 days ago",
    additions: 302,
    deletions: 55,
  },
  {
    repo: "adavance/harbor-cli",
    message: "refactor(reconcile): content-address seed snapshots",
    sha: "1de6a44",
    when: "3 days ago",
    additions: 128,
    deletions: 210,
  },
];

export const leetcode = {
  rank: "18,402",
  solved: 612,
  total: 3450,
  easy: { solved: 208, total: 862 },
  medium: { solved: 321, total: 1794 },
  hard: { solved: 83, total: 794 },
  streak: 41,
  contestRating: 1987,
  recent: [
    { title: "Minimum Window Substring", difficulty: "Hard", when: "Today" },
    { title: "LRU Cache", difficulty: "Medium", when: "Yesterday" },
    { title: "Course Schedule II", difficulty: "Medium", when: "2 days ago" },
    { title: "Word Ladder", difficulty: "Hard", when: "4 days ago" },
  ],
};

export const languages = [
  { name: "TypeScript", pct: 46 },
  { name: "Rust", pct: 24 },
  { name: "Go", pct: 13 },
  { name: "SQL", pct: 9 },
  { name: "Other", pct: 8 },
];

export const spotify = {
  nowPlaying: {
    track: "Otomo",
    artist: "Bonobo, O'Flynn",
    album: "Fragments",
    progress: 0.42,
  },
  topTracks: [
    { title: "Otomo", artist: "Bonobo", plays: 184 },
    { title: "Ilium", artist: "Jon Hopkins", plays: 149 },
    { title: "Terra", artist: "Kiasmos", plays: 132 },
    { title: "An Eagle in Your Mind", artist: "Boards of Canada", plays: 118 },
    { title: "Nightcall", artist: "Kavinsky", plays: 97 },
    { title: "Rounds", artist: "Four Tet", plays: 91 },
  ],
  topArtists: ["Bonobo", "Jon Hopkins", "Kiasmos", "Floating Points"],
  minutesThisWeek: 918,
};

export const reading = [
  { title: "Designing Data-Intensive Applications", author: "Kleppmann", progress: 0.72 },
  { title: "The Rust Programming Language", author: "Klabnik & Nichols", progress: 0.41 },
  { title: "A Philosophy of Software Design", author: "Ousterhout", progress: 1 },
];
