import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site-shell";
import { Panel } from "@/components/primitives";
import { trips, travelStats } from "@/data/travel";

export const Route = createFileRoute("/travel")({
  head: () => ({
    meta: [
      { title: "Travel Logs — Ada Vance" },
      {
        name: "description",
        content:
          "Field notes from Kyoto, Lofoten, Lisbon, Patagonia, Seoul and the Dolomites — where I worked, walked and stopped commiting.",
      },
      { property: "og:title", content: "Travel Logs — Ada Vance" },
      {
        property: "og:description",
        content: "Field notes from Kyoto, Lofoten, Lisbon, Patagonia, Seoul and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TravelPage,
});

function TravelPage() {
  return (
    <>
      <PageHeader
        label="Travel logs"
        title="Places that changed the code"
        description="A running log of the trips worth writing down — what I did, what I learned, and how much of it happened at 6am."
      />

      <Section className="py-10">
        <div className="grid grid-cols-2 gap-6 border-b border-border pb-10 sm:grid-cols-4">
          {travelStats.map((s) => (
            <div key={s.label} className="border-l border-border pl-4">
              <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-4">
          {trips.map((t) => (
            <Panel key={t.slug} interactive>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  <span className="mr-2">{t.emoji}</span>
                  {t.city}
                  <span className="text-muted-foreground">, {t.country}</span>
                </h2>
                <p className="font-mono text-xs text-muted-foreground">
                  {t.dates} · {t.coords}
                </p>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {t.summary}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {t.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm">
                    <span className="text-accent">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {t.photoCount} photos
              </p>
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}
