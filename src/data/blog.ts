export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "the-cache-is-not-the-hard-part",
    title: "The cache is not the hard part",
    excerpt:
      "Everyone can store a response. Deciding when it stops being true is the entire job.",
    date: "2026-07-14",
    readingTime: "7 min",
    tags: ["Infrastructure", "Performance"],
    body: [
      "Caching gets taught backwards. The tutorials start with storage — pick Redis, pick a TTL, wrap the function — and treat invalidation as an appendix. In practice the storage layer is a weekend and invalidation is the rest of the year.",
      "The useful reframe is that a cache entry is a claim about the world: 'as of moment T, this was true'. A TTL is a guess about how long that claim survives. If you can replace the guess with a fact — a version, an epoch, a write log offset — you stop reasoning probabilistically about correctness.",
      "On Atlas, the fact was a per-tenant epoch integer. Any write bumps it, every cache key embeds it, and stale entries become unreachable rather than wrong. Purging became a no-op: we never delete, we just stop addressing. Storage is cheap; certainty is not.",
      "The trade is memory and a small write-path cost. That trade is almost always worth it, because the failure mode it removes — serving data a user is no longer allowed to see — is the one failure mode you cannot apologise your way out of.",
    ],
  },
  {
    slug: "local-first-is-a-latency-decision",
    title: "Local-first is a latency decision, not an offline feature",
    excerpt:
      "Offline support is the marketing. The real payoff is that nothing you type ever waits for a server.",
    date: "2026-05-02",
    readingTime: "6 min",
    tags: ["Product", "React"],
    body: [
      "When people hear local-first they picture airplanes. The airplane case is real but rare — roughly a third of our edit sessions had an offline window, and most were elevators, not flights.",
      "The thing users actually notice is that the cursor never stutters. Once the local replica is authoritative, every interaction resolves in a frame and the network becomes a background reconciliation problem.",
      "That inversion changes your architecture more than it changes your feature list. Persistence moves post-commit. Loading states mostly disappear. Error handling becomes about convergence, not retries.",
      "The cost is that you now own a distributed system on the client. CRDTs handle text well and structured data less well, and you will spend real time on schema migrations that must run on a device you cannot reach.",
    ],
  },
  {
    slug: "alert-budgets",
    title: "Give every service an alert budget",
    excerpt:
      "If a human cannot read all of your alerts in a week, you do not have alerting — you have logging with a pager attached.",
    date: "2026-02-19",
    readingTime: "5 min",
    tags: ["Reliability", "Data"],
    body: [
      "We were sending 400 alerts a week to a team of six and acknowledging about 25 of them. The other 375 were not signals; they were ambient noise that trained everyone to ignore the channel.",
      "The fix that worked was embarrassingly blunt: each service got a weekly budget of pages. Anything above the budget goes into a digest unless its anomaly score clears a critical threshold.",
      "Budgets force a conversation that thresholds never do. When a team blows through its budget twice, the discussion stops being 'raise the threshold' and starts being 'why is this service unstable'.",
      "Six months in we send 23 alerts a week and acknowledge 88% of them. Nothing important got quieter — we just stopped shouting about everything else.",
    ],
  },
  {
    slug: "reading-a-flamegraph",
    title: "How I read a flamegraph in ninety seconds",
    excerpt:
      "A small, repeatable routine for turning a wall of coloured rectangles into one specific thing to fix.",
    date: "2025-11-08",
    readingTime: "8 min",
    tags: ["Performance"],
    body: [
      "Start at the widest frame, not the tallest stack. Width is time; height is only nesting depth. A tall thin tower is architecture, a wide flat plateau is your bill.",
      "Second, look for repetition at the same depth. Identical siblings almost always mean an N+1: a loop doing IO, a serializer re-resolving the same relation, a validator recompiling a schema.",
      "Third, check what fraction of total time sits under framework frames you do not own. If it is above a third, the fix is usually to call the framework less often, not to make it faster.",
      "Only then zoom in. The temptation is to start with the leaf that looks slow, but leaves are where micro-optimisations live, and micro-optimisations rarely move a p95.",
    ],
  },
  {
    slug: "design-tokens-are-an-api",
    title: "Design tokens are an API, so version them like one",
    excerpt:
      "Renaming a colour is a breaking change. Treat it that way and the drift problem mostly disappears.",
    date: "2025-08-21",
    readingTime: "4 min",
    tags: ["Design Systems"],
    body: [
      "Every platform team that maintains its own palette will drift, because there is no mechanism telling them they diverged. The mechanism is a released, versioned artifact.",
      "Once tokens ship as a package with a changelog, deprecations, and a semver contract, the conversation moves from taste to compatibility. 'We renamed accent to accent/default' becomes a major bump with a codemod, not a Slack message.",
      "The unglamorous half of this is CI. Generate the platform files, open the PRs automatically, and gate on contrast tests. Humans should review the diff, never produce it.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
