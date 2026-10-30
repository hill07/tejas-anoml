import { GoldFrame } from '../components/GoldFrame';
import { Page, PageHeader } from '../components/Layout';
import { SectionRule } from '../components/Ornaments';
import { Reveal } from '../components/Reveal';
import { pleaseAvoid, wardrobe, wardrobeIntro, type AttireSlug } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import mehndi480 from '../assets/attire-mehndi-480.webp';
import mehndi800 from '../assets/attire-mehndi-800.webp';
import haldi480 from '../assets/attire-haldi-480.webp';
import haldi800 from '../assets/attire-haldi-800.webp';
import sangeet480 from '../assets/attire-sangeet-480.webp';
import sangeet800 from '../assets/attire-sangeet-800.webp';
import reception480 from '../assets/attire-reception-480.webp';
import reception800 from '../assets/attire-reception-800.webp';
import ceremony480 from '../assets/attire-ceremony-480.webp';
import ceremony800 from '../assets/attire-ceremony-800.webp';

const images: Record<AttireSlug, [string, string]> = {
  mehndi: [mehndi480, mehndi800],
  haldi: [haldi480, haldi800],
  sangeet: [sangeet480, sangeet800],
  ceremony: [ceremony480, ceremony800],
  reception: [reception480, reception800],
};

const jump = (slug: string) => document.getElementById(`attire-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Wardrobe() {
  useDocumentTitle(
    'What to Wear',
    "Dress codes and outfit inspiration for every event, with Western alternatives for guests who don't own Indian clothing.",
  );
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

      <p className="mt-12 text-center font-heading text-sm uppercase tracking-[0.3em] text-ivory">Tap the frames</p>
      <p className="mt-1 text-center font-heading text-[11px] uppercase tracking-[0.2em] text-ivory/80">
        &amp; let the outfit planning begin
      </p>

      <div className="mx-auto mt-14 max-w-2xl space-y-5">
        {wardrobe.map((w) => (
          <Reveal as="article" key={w.slug} id={`attire-${w.slug}`} className="card scroll-mt-6">
            <p className="eyebrow">{w.event}</p>
            <h2 className="mt-1 font-heading text-2xl leading-snug text-maroon-deep">{w.guidance}</h2>
            <p className="mt-2 text-lg leading-relaxed">{w.detail}</p>
            <p className="mt-4 rounded-xl bg-[hsl(var(--ivory-deep)/0.55)] p-4 text-base leading-relaxed">
              <span className="font-semibold text-maroon">Not got Indian clothes? </span>
              {w.western}
            </p>
          </Reveal>
        ))}

        <section className="pt-6">
          <SectionRule label="Please avoid" light />
          <Reveal className="card mt-4">
            <ul className="space-y-3">
              {pleaseAvoid.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-relaxed">
                  <span className="text-gold" aria-hidden="true">
                    ❖
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* <Reveal className="card">
          <p className="eyebrow">Where to shop</p>
          <p className="mt-2 text-lg leading-relaxed">{whereToShop}</p>
        </Reveal> */}
      </div>
    </Page>
  );
}
