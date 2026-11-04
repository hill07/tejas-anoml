import { GoldFrame } from '../components/GoldFrame';
import { Page, PageHeader } from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { wardrobe, wardrobeIntro, type AttireSlug } from '../data/wedding';
import welcome480 from '../assets/attire-welcome-party-480.webp';
import welcome800 from '../assets/attire-welcome-party-800.webp';
import haldi480 from '../assets/attire-haldi-480.webp';
import haldi800 from '../assets/attire-haldi-800.webp';
import reception480 from '../assets/attire-reception-480.webp';
import reception800 from '../assets/attire-reception-800.webp';
import ceremony480 from '../assets/wedding-480.jpeg';
import ceremony800 from '../assets/wedding-800.jpeg';

const images: Record<AttireSlug, [string, string]> = {
  'welcome-party': [welcome480, welcome800],
  haldi: [haldi480, haldi800],
  ceremony: [ceremony480, ceremony800],
  reception: [reception480, reception800],
};

const jump = (slug: string) => document.getElementById(`attire-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Wardrobe() {
  return (
    <Page bg="crimson" wide>
      <PageHeader light eyebrow="Wardrobe planner" title="What to Wear" intro={wardrobeIntro} />

      <ul className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-10 sm:gap-x-10 md:grid-cols-3">
        {wardrobe.map((w, i) => (
          <li key={w.slug} className={i === wardrobe.length - 1 && wardrobe.length % 2 === 1 ? 'col-span-2 md:col-span-1' : ''}>
            <Reveal delay={i * 80}>
              <button type="button" onClick={() => jump(w.slug)} className="group flex flex-col items-center text-center">
                <GoldFrame className="h-52 w-40 transition-transform duration-500 group-hover:-translate-y-1 sm:h-64 sm:w-48">
                  <img
                    src={images[w.slug][0]}
                    srcSet={`${images[w.slug][0]} 480w, ${images[w.slug][1]} 800w`}
                    sizes="(min-width: 640px) 192px, 160px"
                    alt={`Outfit inspiration for the ${w.event}`}
                    width={480}
                    height={605}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </GoldFrame>
                <span
                  className="mt-5 max-w-[11rem] font-heading text-lg uppercase leading-snug tracking-[0.16em] text-ivory"
                  style={{ textShadow: '0 2px 8px hsl(345 70% 10% / .6)' }}
                >
                  {w.event}
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

    </Page>
  );
}
