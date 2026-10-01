import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Monogram } from './Monogram';
import { OrnamentDivider } from './Ornaments';
import { CalendarIcon, EllipsisIcon, FlowerIcon, HouseIcon, MailIcon, PlaneIcon, ShirtIcon } from './Icons';
import { InstallPrompt } from './InstallPrompt';

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

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="none" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
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
