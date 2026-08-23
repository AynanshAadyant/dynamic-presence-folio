import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6",
        interactive &&
          "transition-colors duration-300 hover:border-accent/40 hover:bg-surface-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Tag({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide",
        active
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-border text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {label}
    </span>
  );
}

export function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="border-l border-border pl-4">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
    </div>
  );
}

const KEYWORDS =
  /\b(const|let|return|function|export|await|async|if|else|for|match|SELECT|FROM|WHERE|GROUP BY|INTERVAL|AS|fn|pub|struct|impl|use|nil|true|false|new|satisfies|of|in|continue)\b/g;

function highlight(line: string, key: number) {
  const parts: ReactNode[] = [];
  const comment = line.match(/(\/\/|--|#)\s.*$/);
  const codePart = comment ? line.slice(0, comment.index) : line;

  const tokens = codePart.split(/(".*?"|`.*?`|'.*?')/g);
  tokens.forEach((tok, i) => {
    if (/^(".*"|`.*`|'.*')$/.test(tok)) {
      parts.push(
        <span key={`s${i}`} className="text-chart-3">
          {tok}
        </span>,
      );
      return;
    }
    const sub = tok.split(KEYWORDS);
    sub.forEach((piece, j) => {
      if (KEYWORDS.test(piece)) {
        KEYWORDS.lastIndex = 0;
        parts.push(
          <span key={`k${i}-${j}`} className="text-accent">
            {piece}
          </span>,
        );
      } else {
        KEYWORDS.lastIndex = 0;
        parts.push(<span key={`t${i}-${j}`}>{piece}</span>);
      }
    });
  });

  if (comment) {
    parts.push(
      <span key="c" className="text-muted-foreground/70">
        {comment[0]}
      </span>,
    );
  }

  return (
    <div key={key} className="table-row">
      <span className="table-cell select-none pr-5 text-right text-muted-foreground/40">
        {key + 1}
      </span>
      <span className="table-cell whitespace-pre">{parts}</span>
    </div>
  );
}

export function CodeCard({
  title,
  language,
  code,
}: {
  title: string;
  language: string;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed">
        <code className="table w-full">
          {code.split("\n").map((line, i) => highlight(line, i))}
        </code>
      </pre>
    </div>
  );
}
