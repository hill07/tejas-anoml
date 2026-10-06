import { Link } from 'react-router-dom';
import { Countdown } from '../components/Countdown';
import { DoorArt, type DoorArtKind } from '../components/DoorArt';
import { OrnateFrame } from '../components/OrnateFrame';
import { ChevronDownIcon } from '../components/Icons';
import { Monogram } from '../components/Monogram';
import { FloralSpray, GoldCorners, OrnamentDivider, SectionRule, TornEdge } from '../components/Ornaments';
import { Reveal } from '../components/Reveal';
import { ScratchCard } from '../components/ScratchCard';
import { couple } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import mdina640 from '../assets/malta-mdina-640.webp';
import mdina1280 from '../assets/malta-mdina-1280.webp';

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const doors: { to: string; label: string; art: DoorArtKind; icon?: string }[] = [
  { to: '/story', label: 'Our Story', art: 'story', icon: '/ourstory.png' },
  { to: '/schedule', label: 'Wedding Invite', art: 'invite', icon: '/weddinginvite.png' },
  { to: '/wardrobe', label: 'Wardrobe Planner', art: 'wardrobe', icon: '/wardroom.png' },
  { to: '/travel', label: 'Travel Info', art: 'travel', icon: '/travelinfo.png' },
  { to: '/guide', label: 'Wedding Guide', art: 'guide', icon: '/weddingguide.png' },
  { to: '/gallery', label: 'Gallery', art: 'gallery' },
  { to: '/rsvp', label: 'RSVP', art: 'rsvp' },
  { to: '/more', label: 'More', art: 'more', icon: '/more.png' },
  { to: '/things-to-do', label: 'Things to Do', art: 'travel', icon: '/thingstodo.png' },
];

function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 pb-28 pt-12 text-center"
      style={{ backgroundImage: "url('/background.jpeg')" }}
    >
      <Link to="/story" aria-label="Read our story" className="group relative mb-2 grid place-items-center rounded-full outline-offset-8">
        <span className="absolute -inset-6 animate-breathe rounded-full" style={{ background: 'radial-gradient(circle, hsl(42 80% 80% / .55), hsl(348 60% 85% / .25) 55%, transparent 72%)' }} aria-hidden="true" />
        <span className="absolute -inset-2 animate-ping rounded-full bg-[hsl(38_55%_70%/0.14)] [animation-duration:2.6s]" aria-hidden="true" />
        <span className="absolute -inset-4 animate-halo rounded-full" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, hsl(38 70% 70% / .6) 60deg, transparent 140deg, hsl(348 60% 78% / .5) 220deg, transparent 300deg)', WebkitMask: 'radial-gradient(circle, transparent 60%, #000 62%, #000 69%, transparent 71%)', mask: 'radial-gradient(circle, transparent 60%, #000 62%, #000 69%, transparent 71%)' }} aria-hidden="true" />
        <Monogram eager sizes="(min-width: 640px) 288px, 240px" className="relative h-60 w-60 animate-rock object-contain transition-transform duration-500 group-hover:scale-105 sm:h-72 sm:w-72" />
      </Link>
      <h1 className="animate-rise font-script text-5xl leading-tight text-maroon-deep [animation-delay:.3s] sm:text-7xl" style={{ textShadow: '0 1px 0 hsl(38 50% 95% / .6)' }}>Anmol &amp; Tejas</h1>
      <div className="mt-2 animate-rise px-2 text-center [animation-delay:.45s]">
        <p className="font-serif text-xs italic leading-relaxed text-maroon-deep sm:text-sm">First With loving memory of</p>
        <p className="mt-1 font-serif text-xs font-bold leading-relaxed text-maroon-deep sm:text-sm">Late Mr Jitendra Brahmbhatt<br />Late Mrs Ramila Brahmbhatt<br />Late Mr Jaimeen Brahmbhatt</p>
        <p className="mt-2 font-serif text-xs italic leading-relaxed text-maroon-deep sm:text-sm">Joyfully invite you to celebrate the union of their daughter</p>
        <p className="mt-1 font-serif text-xs italic leading-relaxed text-maroon-deep sm:text-sm"><b>Daughter of Mrs Karuna Brahmbhatt &amp; Mr Prashant Brahmbhatt</b></p>
      </div>
      <div className="mt-5 flex animate-rise flex-col items-center gap-1.5 [animation-delay:.55s]">
        <p className="font-heading text-xl tracking-[0.24em] text-maroon-deep sm:text-2xl">PRESS THE LOGO</p>
        <p className="font-serif text-lg italic text-maroon sm:text-xl">&amp; step into our love story</p>
        <p className="font-serif text-lg italic text-maroon sm:text-xl">Scroll down to see what awaits</p>
        <button type="button" onClick={() => scrollTo('save-the-date')} aria-label="Scroll to save the date" className="mt-3 grid h-10 w-10 animate-bounce place-items-center rounded-full text-maroon hover:bg-white/30"><ChevronDownIcon size={22} /></button>
      </div>
    </section>
  );
}

function SaveTheDate() {
  return (
    <section id="save-the-date" className="relative scroll-mt-0 bg-white">
      <div className="relative">
        <img src={mdina1280} srcSet={`${mdina640} 640w, ${mdina1280} 1280w`} sizes="100vw" alt="Mdina, Malta at golden hour" width={1280} height={960} loading="lazy" decoding="async" className="h-[58svh] min-h-[340px] w-full object-cover sm:h-[70vh]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30_40%_20%/0.25)] via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 top-6 flex justify-center"><Monogram className="h-24 w-24 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,.35)] sm:h-32 sm:w-32" sizes="128px" alt="" /></div>
        <TornEdge className="absolute inset-x-0 -bottom-px" />
      </div>
      <div className="flex flex-col items-center gap-6 px-6 pb-16 pt-2 text-center">
        <Reveal as="h2" className="font-script text-5xl leading-tight text-[#901836] sm:text-7xl">Anmol &amp; Tejas</Reveal>
        <Reveal as="p" delay={150} className="max-w-xs font-serif text-lg italic leading-relaxed text-maroon sm:max-w-md sm:text-xl">{couple.tagline}</Reveal>
        <OrnamentDivider />
        <Reveal delay={250} className="flex w-full flex-col items-center gap-4">
          <p className="font-heading text-base tracking-[0.4em] text-gold-deep sm:text-lg">✦ SAVE THE DATE ✦</p>
          <ScratchCard><p className="font-heading text-4xl tracking-[0.12em] text-maroon-deep sm:text-5xl">{couple.shortDate}</p><p className="mt-1 font-serif text-lg italic text-maroon">our forever begins</p><p className="mt-1 font-heading text-[10px] uppercase tracking-[0.22em] text-gold-deep">{couple.place}</p></ScratchCard>
        </Reveal>
        <Reveal delay={350} className="w-full max-w-sm"><Countdown /></Reveal>
        <button type="button" onClick={() => scrollTo('step-inside')} aria-label="Next: step inside" className="mt-2 grid h-12 w-12 animate-bounce place-items-center rounded-full border border-maroon/30 bg-white/70 text-maroon shadow-md transition hover:scale-110"><ChevronDownIcon size={20} strokeWidth={2} /></button>
      </div>
    </section>
  );
}

function StepInside() {
  return (
    <section id="step-inside" className="bg-sky relative overflow-hidden px-6 pb-44 pt-14 sm:pb-52">
      <div className="mx-auto max-w-md"><SectionRule label="Step inside" /></div>
      <ul className="mx-auto mt-10 flex max-w-md flex-col gap-9 sm:max-w-lg sm:gap-11">
        {doors.map(({ to, label, art, icon }, i) => {
          const left = i % 2 === 0;
          return <li key={to}><Reveal><Link to={to} className={`group flex items-center gap-5 sm:gap-8 ${left ? 'justify-start pl-[6%]' : 'flex-row-reverse justify-start pr-[6%]'}`}>
            <OrnateFrame className="w-[6.5rem] shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1.5deg]">
              {icon ? <img src={icon} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" /> : <DoorArt kind={art} className="transition-transform duration-700 group-hover:scale-105" />}
            </OrnateFrame>
            <span className="max-w-[9rem] font-heading text-sm uppercase leading-snug tracking-[0.2em] text-maroon-deep sm:text-lg" style={{ textShadow: '0 1px 2px hsl(36 60% 95% / .8)' }}>{label}</span>
          </Link></Reveal></li>;
        })}
      </ul>
      <FloralSpray className="pointer-events-none absolute -left-12 bottom-0 w-48 opacity-80 sm:w-64" />
      <FloralSpray className="pointer-events-none absolute -right-12 bottom-0 w-48 -scale-x-100 opacity-80 sm:w-64" />
    </section>
  );
}

function Welcome() {
  return <section className="bg-paper px-5 pb-40 pt-14"><div className="mx-auto grid max-w-2xl gap-10">
    <Reveal as="article" className="card px-6 py-10 text-center sm:px-12"><GoldCorners /><SectionRule label="Welcome" /><p className="mt-5 font-serif text-xl leading-relaxed text-ink">{couple.welcome}</p><p className="mt-5 inline-block rounded-full bg-maroon-deep px-4 py-1.5 font-serif text-base font-semibold tracking-wide text-gold-light">{couple.hashtag}</p><p className="mt-5 font-heading text-[11px] uppercase leading-relaxed tracking-[0.18em] text-gold-deep">{couple.families}</p></Reveal>
    <footer className="flex flex-col items-center gap-2 text-center"><Monogram className="h-20 w-20 object-contain" sizes="80px" alt="" /><p className="font-script text-4xl text-maroon">Anmol &amp; Tejas</p><p className="eyebrow">{couple.dateLabel}</p><p className="font-serif italic text-muted">{couple.place}</p></footer>
  </div></section>;
}

export function Home() { useDocumentTitle(); return <main id="main"><Hero /><SaveTheDate /><StepInside /><Welcome /></main>; }
