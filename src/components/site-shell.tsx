import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navLinks.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          onClick={onNavigate}
          activeOptions={{ exact: l.to === "/" }}
          className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
        >
          {l.label}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full group-data-[status=active]:w-full" />
        </Link>
      ))}
    </>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-sm border border-border bg-surface font-mono text-xs font-semibold text-accent transition-colors group-hover:border-accent/50">
              AV
            </span>
            <span className="text-sm font-medium tracking-tight">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <NavItems />
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="hidden rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent sm:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-8 w-8 place-items-center rounded-sm border border-border text-muted-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border md:hidden"
            >
              <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5">
                <NavItems onNavigate={() => setOpen(false)} />
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>

      <footer className="mt-24 border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium">{site.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">{site.bio}</p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {site.location} · {site.timezone}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              © {new Date().getUTCFullYear()} — built with care
            </p>
            <Link
              to="/admin"
              className="font-mono text-xs text-muted-foreground/60 transition-colors hover:text-accent"
            >
              admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-6xl px-5", className)}>{children}</section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </p>
  );
}

export function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <Section className="border-b border-border py-16 sm:py-20">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="mt-4 text-balance-tight text-4xl font-semibold sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Section>
  );
}
