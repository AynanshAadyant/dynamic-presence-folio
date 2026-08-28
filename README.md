# Living Canvas Portfolio

Build a portfolio website in React + TypeScript (Vite, Tailwind, shadcn/ui) — NOT Next.js, NOT TanStack Start. Recreate this design system and page structure:

DESIGN SYSTEM "Living Canvas" — Minimal-Bold aesthetic: high-contrast typography, generous whitespace, sharp 1px borders (border-white/10) instead of shadows, subtle micro-interactions.

Colors (dark mode default): background #0A0A0C, surface cards #121216, text #FAFAFA, muted labels #A1A1AA, accent emerald #10B981 (live/active status), cyan for tech tags.

Typography: Headings bold sans-serif tight tracking (Geist Sans/Syne/Inter Display). Body/UI monospace-sans blend (Geist Mono/Fira Code for stats, metadata, dates).

Layout: Bento-grid for dense data, Framer Motion micro-animations (hover-lift, layout transitions, pulse signals).

PAGES:
1. Home (/) — massive hero headline ("Full-Stack Engineer & AI Agent Developer"), dynamic status pill badge, CTA buttons (View Projects / Download Resume), "Right Now" live activity strip (Spotify now-playing w/ animated equalizer, GitHub latest commit, LeetCode streak), featured project cards, quick-nav grid to Dashboard/Travel/Blog.
2. Projects (/projects, /projects/:slug) — filterable grid by tech tag, case study pages with Problem / Architecture / Key Features (syntax-highlighted code blocks) / Impact & Metrics.
3. Life Dashboard (/dashboard) — bento grid: coding activity (GitHub heatmap + commit feed + LeetCode stats), music (Spotify top tracks).
4. Travel Logs, Blog, Resume pages.
5. Private admin panel for content management.

Use React Router, TypeScript throughout, Tailwind + shadcn/ui, Framer Motion. Use mock/static data for now (no live API integrations yet) so the UI works out of the box.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ced2347a-0bb1-4e83-8ccc-5c1ff96d35ae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
