export const site = {
  name: "Ada Vance",
  role: "Software engineer",
  location: "Lisbon, Portugal",
  timezone: "WEST (UTC+1)",
  status: {
    available: true,
    label: "Open to staff-level roles — Q3 2026",
  },
  bio: "I build fast, durable systems and the interfaces that sit on top of them. Currently focused on edge infrastructure, local-first data, and developer tooling.",
  email: "hello@adavance.dev",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Email", href: "mailto:hello@adavance.dev" },
  ],
};

export const rightNow = [
  { label: "Building", value: "Atlas Edge Cache v3" },
  { label: "Reading", value: "Designing Data-Intensive Applications" },
  { label: "Listening", value: "Bonobo — Fragments" },
  { label: "Learning", value: "Rust async internals" },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/travel", label: "Travel" },
  { to: "/blog", label: "Blog" },
  { to: "/resume", label: "Resume" },
] as const;
