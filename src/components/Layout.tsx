import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Monogram } from './Monogram';
import { OrnamentDivider } from './Ornaments';
import { CalendarIcon, EllipsisIcon, FlowerIcon, HouseIcon, MailIcon, PlaneIcon, ShirtIcon } from './Icons';
import { InstallPrompt } from './InstallPrompt';
import { couple } from '../data/wedding';

const navItems = [
  { to: '/', label: 'Home', Icon: HouseIcon },
  { to: '/schedule', label: 'Schedule', Icon: CalendarIcon },
  { to: '/wardrobe', label: 'Wardrobe', Icon: ShirtIcon },
  { to: '/travel', label: 'Travel', Icon: PlaneIcon },
  { to: '/guide', label: 'Guide', Icon: FlowerIcon },
  { to: '/rsvp', label: 'RSVP', Icon: MailIcon },
  { to: '/more', label: 'More', Icon: EllipsisIcon },
];

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

function BottomNav() {
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),0.6rem)]">
      <div className="mx-auto max-w-xl px-3">
        <ul className="flex items-stretch justify-between rounded-2xl bg-maroon-deep/95 px-1 py-1.5 shadow-[0_-8px_30px_-12px_hsl(345_60%_10%/0.7)] ring-1 ring-[hsl(var(--gold-light)/0.45)] backdrop-blur">
          {navItems.map(({ to, label, Icon }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 rounded-xl py-1.5 transition-colors ${
                    isActive ? 'bg-[hsl(var(--gold-light)/0.16)] text-gold-light' : 'text-ivory/65 hover:text-ivory'
                  }`
                }
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[hsl(var(--gold-light)/0.3)] bg-[hsl(var(--gold-light)/0.08)]">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <span className="font-serif text-[11px] font-medium leading-none tracking-wide">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** Floating monogram in the top corner of inner pages — tap to return home. */
function HomeBadge() {
  return (
    <Link
      to="/"
      aria-label="Back to home"
      className="fixed right-3 top-3 z-40 grid h-14 w-14 place-items-center rounded-full bg-[hsl(38_50%_94%)] shadow-[0_8px_20px_-8px_hsl(345_50%_12%/0.6)] ring-1 ring-[hsl(var(--gold)/0.5)] transition hover:scale-105 sm:right-5 sm:top-5"
    >
      <Monogram className="h-11 w-11 object-contain" sizes="44px" alt="" eager />
    </Link>
  );
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Wait for a visitor gesture before requesting the audio.
    // Only events that count as a user gesture are used: on touch screens that is
    // the finger lifting (touchend / pointerup / click), not touchstart / pointerdown.
    const gestures = ['click', 'pointerup', 'touchend', 'keydown'] as const;
    const stopListening = () => gestures.forEach((g) => window.removeEventListener(g, startMusic));
    function startMusic(e?: Event) {
      if (!audio || !audio.paused) return;
      // The music button handles its own taps.
      if (e?.target instanceof Element && e.target.closest('[data-music-toggle]')) return;
      audio.play().then(stopListening, () => setPlaying(false));
    }

    gestures.forEach((g) => window.addEventListener(g, startMusic, { passive: true }));
    // Once it is playing (by any route, including the music button) stop auto-starting,
    // so a visitor who pauses it is not overridden by their next tap.
    audio.addEventListener('playing', stopListening, { once: true });
    return () => {
      stopListening();
      audio.removeEventListener('playing', stopListening);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  // Opening cover: browsers only allow sound after a tap, so the invitation opens
  // with one — and that same tap starts the music.
  const [cover, setCover] = useState<'shown' | 'leaving' | 'gone'>('shown');
  const openButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (cover === 'gone') return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [cover]);

  useEffect(() => {
    openButton.current?.focus({ preventScroll: true });
  }, []);

  const openInvitation = () => {
    const audio = audioRef.current;
    if (audio?.paused) audio.play().catch(() => setPlaying(false));
    setCover('leaving');
    window.setTimeout(() => setCover('gone'), 900);
  };

  return (
    <>
      {cover !== 'gone' ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Open the invitation"
          className={`bg-velvet-taupe fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden px-6 text-center transition-[opacity,transform] duration-[900ms] ease-out ${
            cover === 'leaving' ? 'pointer-events-none scale-105 opacity-0' : 'opacity-100'
          }`}
        >
          <span
            className="pointer-events-none absolute h-80 w-80 animate-breathe rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(42 80% 80% / .6), hsl(348 60% 85% / .25) 55%, transparent 72%)' }}
            aria-hidden="true"
          />
          <Monogram eager sizes="224px" alt="" className="relative h-52 w-52 animate-rock object-contain sm:h-56 sm:w-56" />
          <p className="relative mt-2 font-script text-5xl leading-tight text-maroon-deep sm:text-6xl">{couple.names}</p>
          <OrnamentDivider className="relative mt-4" />
          <button
            ref={openButton}
            type="button"
            onClick={openInvitation}
            data-music-toggle
            className="btn-primary relative mt-8 px-7 py-4 text-[13px]"
          >
            Tap to open the invitation
          </button>
        </div>
      ) : null}
      <audio ref={audioRef} src="/music.mp3" loop preload="none" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
        data-music-toggle
        className="fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-[hsl(var(--gold-light)/0.65)] bg-maroon-deep/95 text-gold-light shadow-lg transition hover:scale-105 sm:right-6"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </>
  );
}

export function AppShell() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-ivory focus:px-3 focus:py-2">
        Skip to content
      </a>
      <ScrollManager />
      {pathname !== '/' && <HomeBadge />}
      <Outlet />
      <BottomNav />
      <MusicPlayer />
      <InstallPrompt />
    </>
  );
}

type Bg = 'paper' | 'crimson' | 'mauve' | 'sky' | 'taupe';
const bgClass: Record<Bg, string> = {
  paper: 'bg-paper',
  crimson: 'bg-velvet-crimson',
  mauve: 'bg-velvet-mauve',
  sky: 'bg-sky',
  taupe: 'bg-velvet-taupe',
};

export function Page({ children, bg = 'paper', wide = false }: { children: ReactNode; bg?: Bg; wide?: boolean }) {
  return (
    <main id="main" className={`min-h-screen ${bgClass[bg]}`}>
      <div className={`mx-auto w-full px-5 pb-36 pt-6 sm:px-8 ${wide ? 'max-w-4xl' : 'max-w-2xl'}`}>{children}</div>
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  script,
  intro,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <header className="animate-rise pb-8 pt-12 text-center sm:pt-16">
      {eyebrow ? <p className={light ? 'eyebrow text-gold-light' : 'eyebrow'}>{eyebrow}</p> : null}
      <h1
        className={`mt-3 font-heading text-[2rem] font-medium uppercase leading-tight tracking-[0.16em] sm:text-5xl ${
          light ? 'text-gold-gradient' : 'text-maroon-deep'
        }`}
      >
        {title}
      </h1>
      {script ? (
        <p className={`-mt-1 font-script text-4xl sm:text-5xl ${light ? 'text-ivory' : 'text-maroon'}`}>{script}</p>
      ) : null}
      <OrnamentDivider className="mt-4" light={light} />
      {intro ? (
        <p className={`mx-auto mt-4 max-w-md font-serif text-lg italic leading-relaxed ${light ? 'text-ivory/85' : 'text-muted'}`}>
          {intro}
        </p>
      ) : null}
    </header>
  );
}
