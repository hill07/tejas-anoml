import type { ReactNode } from 'react';
import { Page, PageHeader } from '../components/Layout';
import { SectionRule } from '../components/Ornaments';
import { Reveal } from '../components/Reveal';
import { BusIcon, ExternalIcon, HotelIcon } from '../components/Icons';
import { events, travel } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import mdina640 from '../assets/malta-mdina-640.jpeg';
import mdina1280 from '../assets/malta-mdina-640.jpeg';

const GOOGLE_MAPS_DIRECTIONS = 'https://share.google/U9CajawgRXsCraFFy';

// Switch a section back on by changing false to true.
const SHOW_WHERE_TO_STAY: boolean = false;
const SHOW_WEDDING_COACHES: boolean = false;

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <SectionRule label={label} />
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function DirectionsLink({ children = 'Directions' }: { children?: ReactNode }) {
  return (
    <a href={GOOGLE_MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className="link-gold inline-flex items-center gap-1">
      {children} <ExternalIcon size={12} />
    </a>
  );
}

export default function Travel() {
  useDocumentTitle(
    'Travel & Stay in Malta',
    'Flights to Malta, hotel room blocks, coach timetable, parking, taxis and directions to every venue.',
  );
  const radissonVenue = {
    venue: 'Radisson Blu Resort & Spa, Malta Golden Sands',
    address: 'Radisson Blu Resort & Spa, Malta Golden Sands',
    mapUrl: 'https://share.google/cuwXvdo6XaaSmnVMY',
  };
  // Radisson first (where guests are staying), then one entry per event venue in schedule order.
  const venues = [
    radissonVenue,
    ...Array.from(new Map(events.map((e) => [e.venue, e])).values()).map((e) => ({
      venue: e.venue,
      address: e.address,
      mapUrl: GOOGLE_MAPS_DIRECTIONS,
    })),
  ];

  return (
    <Page bg="sky">
      <PageHeader eyebrow="Locations & travel" title="Getting to Malta" intro={travel.intro} />

      <Reveal className="overflow-hidden rounded-2xl shadow-elegant ring-1 ring-[hsl(var(--gold)/0.5)]">
        <img
          src={mdina1280}
          srcSet={`${mdina640} 640w, ${mdina1280} 1280w`}
          sizes="(min-width: 672px) 640px, 100vw"
          alt="Mdina, Malta"
          width={1280}
          height={960}
          loading="lazy"
          decoding="async"
          className="h-52 w-full object-cover object-top sm:h-72"
        />
      </Reveal>

      {/* <Section label="Arriving">
        <Reveal className="card">
          <div className="flex items-start gap-3">
            <PlaneIcon size={22} className="mt-1 shrink-0 text-gold" />
            <div>
              <h2 className="font-heading text-xl text-maroon-deep">{travel.airport.name}</h2>
              <p className="mt-1 text-lg leading-relaxed text-muted">{travel.airport.detail}</p>
            </div>
          </div>
          <a href={GOOGLE_MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className="btn-primary mt-5 w-full">
            Airport directions
          </a>
        </Reveal>
        <Reveal className="card">
          <p className="eyebrow">When to fly in</p>
          <p className="mt-2 text-lg leading-relaxed">{travel.arrivalAdvice}</p>
        </Reveal>
        <Reveal className="card">
          <h2 className="font-heading text-xl text-maroon-deep">{travel.ferry.name}</h2>
          <p className="mt-1 text-lg leading-relaxed text-muted">{travel.ferry.detail}</p>
        </Reveal>
      </Section> */}

      {/* <Section label="Flight routes">
        {travel.flights.map((f) => (
          <Reveal as="article" key={f.region} className="card">
            <h3 className="font-heading text-2xl text-maroon-deep">{f.region}</h3>
            {f.intro ? <p className="mt-1.5 text-lg leading-relaxed text-muted">{f.intro}</p> : null}
            <ul className="mt-3 space-y-2.5">
              {f.routes.map((r) => (
                <li key={r} className="flex gap-3 text-lg leading-relaxed">
                  <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            {f.note ? (
              <p className="mt-4 rounded-xl bg-[hsl(var(--ivory-deep)/0.55)] p-4 text-base leading-relaxed">{f.note}</p>
            ) : null}
          </Reveal>
        ))}
      </Section> */}

      {SHOW_WHERE_TO_STAY && (<Section label="Where to stay">
        {travel.hotels.map((h) => (
          <Reveal as="article" key={h.name} className="card">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="flex items-center gap-2 font-heading text-xl text-maroon-deep">
                <HotelIcon size={20} className="shrink-0 text-gold" />
                {h.name}
              </h3>
              <span className="rounded-full bg-maroon-deep px-3 py-1 font-serif text-sm font-semibold text-gold-light">{h.price}</span>
            </div>
            <p className="mt-2 text-lg leading-relaxed text-muted">{h.detail}</p>
            <div className="mt-3">
              <DirectionsLink />
            </div>
          </Reveal>
        ))}
        <Reveal className="card">
          <p className="eyebrow">Check-in &amp; check-out</p>
          <p className="mt-2 text-lg leading-relaxed">{travel.checkIn}</p>
        </Reveal>
      </Section>)}

      {SHOW_WEDDING_COACHES && (<Section label="Wedding coaches">
        <Reveal className="card">
          <ul className="divide-y divide-[hsl(var(--gold)/0.25)]">
            {travel.shuttles.map((s) => (
              <li key={`${s.day}-${s.time}`} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                <span className="w-24 shrink-0 font-heading text-base font-medium text-maroon-deep sm:w-32">{s.time}</span>
                <span className="text-lg leading-snug">
                  {s.route}
                  <span className="block text-sm italic text-muted">{s.day}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex gap-3 rounded-xl bg-[hsl(var(--ivory-deep)/0.55)] p-4 text-base leading-relaxed">
            <BusIcon size={20} className="mt-0.5 shrink-0 text-gold-deep" />
            {travel.pickup}
          </p>
        </Reveal>
      </Section>)}

      {/* <Section label="Getting around">
        <Reveal className="card">
          <p className="eyebrow">Taxis &amp; rideshare</p>
          <p className="mt-2 text-lg leading-relaxed">{travel.taxis}</p>
        </Reveal>
        <Reveal className="card">
          <p className="eyebrow">Parking</p>
          <p className="mt-2 text-lg leading-relaxed">{travel.parking}</p>
        </Reveal>
      </Section> */}

      <Section label="All venues">
        <div className="grid gap-3 sm:grid-cols-2">
          {venues.map((e) => (
            <a
              key={e.venue}
              href={e.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="card-link flex items-center justify-between gap-3 p-4"
            >
              <span>
                <span className="block font-heading text-base text-maroon-deep">{e.venue}</span>
                <span className="block text-sm text-muted">{e.address}</span>
              </span>
              <ExternalIcon size={16} className="shrink-0 text-gold" />
            </a>
          ))}
        </div>
      </Section>

      <Reveal className="card mt-8">
        <p className="eyebrow">Transport problems?</p>
        <p className="mt-2 text-lg">
          Call Joseph Camilleri, our transport coordinator, on{' '}
          <a href="tel:+35679004477" className="font-semibold text-maroon underline underline-offset-4">
            +356 7900 4477
          </a>
          .
        </p>
      </Reveal>
    </Page>
  );
}
