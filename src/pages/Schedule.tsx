import { Link } from 'react-router-dom';
import { Page, PageHeader } from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { ChevronRightIcon, ExternalIcon } from '../components/Icons';
import { events, invitedLabels, mapsUrl, type WeddingEvent } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

function groupByDay(list: WeddingEvent[]) {
  const days: { label: string; items: WeddingEvent[] }[] = [];
  for (const e of list) {
    const day = days.find((d) => d.label === e.dateLabel);
    if (day) day.items.push(e);
    else days.push({ label: e.dateLabel, items: [e] });
  }
  return days;
}

export default function Schedule() {
  useDocumentTitle(
    'Wedding Schedule',
    'Every event from Ganesh Puja to the farewell brunch, with times, venues, dress codes and directions.',
  );
  return (
    <Page>
      <PageHeader
        eyebrow="27 – 30 June 2027"
        title="The Celebrations"
        intro="Four days across Attard, Naxxar, St Paul's Bay, St Julian's and Mdina. Tap any event for the full details."
      />
      <div className="space-y-10">
        {groupByDay(events).map((day) => (
          <section key={day.label} aria-label={day.label}>
            <h2 className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[hsl(var(--gold)/0.7)]" />
              <span className="font-heading text-sm uppercase tracking-[0.24em] text-gold-deep">{day.label}</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[hsl(var(--gold)/0.7)]" />
            </h2>
            <ol className="relative space-y-5 border-l border-[hsl(var(--gold)/0.45)] pl-5 sm:pl-7">
              {day.items.map((e) => (
                <Reveal as="li" key={e.slug} className="relative">
                  <span
                    className="absolute -left-[26px] top-7 h-3 w-3 rotate-45 bg-gold ring-4 ring-[hsl(var(--background))] sm:-left-[34px]"
                    aria-hidden="true"
                  />
                  <Link to={`/schedule/${e.slug}`} className="card-link group">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-heading text-xl text-maroon-deep">{e.name}</h3>
                        <p className="font-serif italic text-muted">{e.subtitle}</p>
                        <p className="mt-1 text-base text-ink/80">{e.venue}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-maroon-deep px-3 py-1 font-heading text-sm tracking-wider text-gold-light">
                        {e.startTime}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="chip">{e.dressCode}</span>
                      <span className="chip">{e.setting}</span>
                      {e.invited !== 'all' ? (
                        <span className="chip bg-[hsl(var(--gold-light)/0.35)]">{invitedLabels[e.invited]}</span>
                      ) : null}
                      <ChevronRightIcon size={18} className="ml-auto text-gold transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                  <a
                    href={mapsUrl(e.mapQuery)}
                    target="_blank"
                    rel="noreferrer"
                    className="link-gold mt-2 inline-flex items-center gap-1"
                  >
                    Open directions <ExternalIcon size={12} />
                  </a>
                </Reveal>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </Page>
  );
}
