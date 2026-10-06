import { ExternalIcon } from '../components/Icons';
import { Page, PageHeader } from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { mapsUrl } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const places = [
  'Popeye Village',
  "St John's Co-Cathedral",
  'Upper Barrakka & Fort St. Elmo',
  "Grand Master's Palace",
  'Blue Grotto',
  'The Valletta Waterfront',
  'Saluting Battery',
  'Ħal Saflieni Hypogeum',
  'Mdina & Mdina Old City Fortress',
  'Blue Lagoon',
];

export default function ThingsToDo() {
  useDocumentTitle(
    'Things to Do in Malta',
    'Places and attractions to visit while you are in Malta.',
  );

  return (
    <Page bg="sky">
      <PageHeader
        eyebrow="Explore Malta"
        title="Things to Do"
        intro="Make the most of your time in Malta with these places and attractions."
      />

      <div className="space-y-3">
        {places.map((place, index) => (
          <Reveal key={place} delay={index * 45}>
            <a
              href={mapsUrl(place + ', Malta')}
              target="_blank"
              rel="noreferrer"
              className="card-link group flex items-center gap-4 p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-maroon-deep font-heading text-lg text-gold-light ring-1 ring-[hsl(var(--gold-light)/0.6)]">
                {index + 1}
              </span>
              <span className="flex-1 font-heading text-lg text-maroon-deep sm:text-xl">
                {place}
              </span>
              <ExternalIcon size={17} className="shrink-0 text-gold transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        ))}
      </div>
    </Page>
  );
}
