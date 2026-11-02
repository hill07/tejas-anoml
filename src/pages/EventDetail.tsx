import { Link, useParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import { GoldCorners, OrnamentDivider } from '../components/Ornaments';
import { ArrowLeftIcon, MapPinIcon } from '../components/Icons';
import { attireForEvent, events } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import NotFound from './NotFound';

const GOOGLE_MAPS_DIRECTIONS = 'https://share.google/U9CajawgRXsCraFFy';

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-[10px]">{label}</dt>
      <dd className="mt-1 text-lg leading-snug text-ink">{value}</dd>
    </div>
  );
}

export default function EventDetail() {
  const { slug } = useParams();
  const index = events.findIndex((e) => e.slug === slug);
  const event = events[index];
  const attire = event ? attireForEvent(event.slug) : undefined;
  useDocumentTitle(
    event ? event.name : 'Event not found',
    event ? `${event.dateLabel}, ${event.startTime} at ${event.venue}. ${event.dressCode}.` : undefined,
  );
  if (!event) return <NotFound />;

  const prev = events[index - 1];
  const next = events[index + 1];

  return (
    <Page>
      <header className="animate-rise pb-6 pt-12 text-center sm:pt-16">
        <p className="eyebrow">{event.dateLabel}</p>
        <h1 className="mt-3 font-heading text-3xl uppercase leading-tight tracking-[0.12em] text-maroon-deep sm:text-5xl">
          {event.name}
        </h1>
        <p className="mt-1 font-script text-4xl text-maroon">{event.subtitle}</p>
        <OrnamentDivider className="mt-4" />
      </header>

      <section className="card px-6 py-8 sm:px-10" aria-label="Event details">
        <GoldCorners />
        <dl className="grid grid-cols-2 gap-x-5 gap-y-5">
          <Fact label="Starts" value={event.startTime} />
          <Fact label="Expected finish" value={event.finishTime} />
        </dl>
        <div className="mt-6 border-t border-[hsl(var(--gold)/0.3)] pt-5">
          <p className="eyebrow text-[10px]">Attire</p>
          <p className="mt-1 text-lg font-semibold leading-snug text-maroon-deep">{event.dressCode}</p>
          {attire ? (
            <>
              <p className="mt-2 text-lg leading-relaxed text-ink">{attire.guidance}</p>
              <p className="mt-2 text-base leading-relaxed text-muted">{attire.detail}</p>
              <Link
                to={`/wardrobe#attire-${attire.slug}`}
                className="link-gold mt-3 inline-block font-heading text-sm uppercase tracking-[0.14em]"
              >
                See outfit inspiration
              </Link>
            </>
          ) : null}
        </div>
      </section>

      <section className="card mt-4">
        <p className="eyebrow text-[10px]">Venue</p>
        <h2 className="mt-1 font-heading text-2xl text-maroon-deep">{event.venue}</h2>
        <p className="mt-1 flex items-start gap-2 text-muted">
          <MapPinIcon size={18} className="mt-1 shrink-0 text-gold" />
          {event.address}
        </p>
        <a href={GOOGLE_MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className="btn-primary mt-5 w-full">
          Map &amp; directions
        </a>
      </section>

      <section className="card mt-4">
        <p className="eyebrow text-[10px]">Good to know</p>
        <p className="mt-2 text-lg leading-relaxed text-ink">{event.notes}</p>
      </section>

      <nav className="mt-6 grid grid-cols-2 gap-3" aria-label="Other events">
        {prev ? (
          <Link to={`/schedule/${prev.slug}`} className="card-link p-4 text-left">
            <span className="eyebrow text-[10px]">← Previous</span>
            <span className="mt-1 block font-heading text-base text-maroon-deep">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/schedule/${next.slug}`} className="card-link p-4 text-right">
            <span className="eyebrow text-[10px]">Next →</span>
            <span className="mt-1 block font-heading text-base text-maroon-deep">{next.name}</span>
          </Link>
        ) : null}
      </nav>

      <Link to="/schedule" className="btn-ghost mt-5 w-full">
        <ArrowLeftIcon size={16} /> Back to the full schedule
      </Link>
    </Page>
  );
}
