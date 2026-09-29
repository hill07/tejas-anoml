import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '../components/Icons';
import { InviteCard } from '../components/invite/InviteCard';
import { events } from '../data/wedding';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const AUTOPLAY_MS = 6000;
const SWIPE_PX = 40;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/**
 * Wedding invite carousel — one animated invitation card per event on crimson
 * velvet, looping, autoplaying, swipeable, with arrows on larger screens.
 */
export default function Schedule() {
  useDocumentTitle('Wedding Invite', 'Invitations to every celebration, with dates, times and venues.');
  const navigate = useNavigate();
  const n = events.length;
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(document.visibilityState === 'hidden');
  const reduced = usePrefersReducedMotion();
  const start = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);
  // Remember each slide's last offset so wrap-around moves never sweep across the screen.
  const lastOffset = useRef<number[]>([]);

  const go = useCallback((delta: number) => setActive((a) => (((a + delta) % n) + n) % n), [n]);

  // Autoplay: advance every 6 s unless hovered, hidden, or reduced motion is preferred.
  useEffect(() => {
    if (n < 2 || hovering || hidden || reduced) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, hovering, hidden, reduced, n, go]);

  useEffect(() => {
    const onVis = () => setHidden(document.visibilityState === 'hidden');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('keydown', onKey);
    };
  }, [go]);

  const offsetFor = (i: number) => {
    const base = (((i - active) % n) + n) % n;
    const options = [base, base - n];
    const prev = lastOffset.current[i];
    let d = options.reduce((best, o) => (Math.abs(o) < Math.abs(best) ? o : best));
    // For slides leaving view, keep them travelling in the same direction they came from.
    if (prev !== undefined && Math.abs(d) > 1) {
      d = options.reduce((best, o) => (Math.abs(o - prev) < Math.abs(best - prev) ? o : best));
    }
    return d;
  };
  const offsets = events.map((_, i) => offsetFor(i));
  lastOffset.current = offsets;

  const current = events[active];

  return (
    <main id="main" className="bg-velvet-crimson relative h-[100dvh] min-h-[560px] overflow-hidden">
      <h1 className="sr-only">Wedding Invite — {events.map((e) => e.name).join(', ')}</h1>

      <section
        aria-roledescription="carousel"
        aria-label="Wedding invitations"
        className="absolute inset-x-0 top-0 bottom-[9.5rem] touch-pan-y select-none [--step:84vw] sm:bottom-[8.5rem] sm:[--step:60vw] md:[--step:55vw] lg:[--step:50vw]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onPointerDown={(e) => {
          start.current = { x: e.clientX, y: e.clientY };
          moved.current = false;
        }}
        onPointerMove={(e) => {
          if (!start.current) return;
          const dx = e.clientX - start.current.x;
          if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - start.current.y)) {
            moved.current = true;
            setDrag(dx);
          }
        }}
        onPointerUp={() => {
          if (drag <= -SWIPE_PX) go(1);
          else if (drag >= SWIPE_PX) go(-1);
          start.current = null;
          setDrag(0);
        }}
        onPointerCancel={() => {
          start.current = null;
          setDrag(0);
        }}
      >
        {events.map((event, i) => {
          const d = offsets[i];
          const isActive = d === 0;
          const visible = Math.abs(d) <= 1;
          const style: CSSProperties = {
            width: 'min(80vw, calc((100dvh - 12rem) * 0.5625), 30rem)',
            transform: `translate(-50%, -50%) translateX(calc(var(--step) * ${d} + ${drag}px)) scale(${isActive ? 1 : 0.82})`,
            opacity: isActive ? 1 : visible ? 0.55 : 0,
            filter: isActive ? 'none' : 'blur(1px)',
            zIndex: isActive ? 2 : 1,
            transition: drag ? 'none' : 'transform .6s cubic-bezier(.22,1,.36,1), opacity .6s ease, filter .6s ease',
            pointerEvents: visible ? 'auto' : 'none',
          };
          return (
            <div
              key={event.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${event.name}`}
              aria-hidden={!isActive}
              className="absolute left-1/2 top-1/2"
              style={style}
            >
              <button
                type="button"
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  if (moved.current) return;
                  if (isActive) navigate(`/schedule/${event.slug}`);
                  else setActive(i);
                }}
                className="block w-full rounded-2xl text-left transition-shadow"
                style={{
                  boxShadow: isActive ? '0 25px 60px -20px hsl(345 60% 8% / .6)' : '0 10px 30px -15px hsl(345 60% 8% / .35)',
                }}
                aria-label={isActive ? `${event.name} — open details` : `Show ${event.name}`}
              >
                <InviteCard event={event} active={isActive} />
              </button>
            </div>
          );
        })}

        {n > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous invitation"
              className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[hsl(var(--gold-light)/0.5)] bg-[hsl(348_70%_12%/0.55)] text-gold-light backdrop-blur transition hover:scale-110 sm:grid lg:left-10"
            >
              <ChevronRightIcon size={20} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next invitation"
              className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[hsl(var(--gold-light)/0.5)] bg-[hsl(348_70%_12%/0.55)] text-gold-light backdrop-blur transition hover:scale-110 sm:grid lg:right-10"
            >
              <ChevronRightIcon size={20} />
            </button>
          </>
        ) : null}
      </section>

      {/* dots + details link, above the bottom navigation */}
      <div className="absolute inset-x-0 bottom-[6.2rem] flex flex-col items-center gap-2.5 px-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose an invitation">
          {events.map((e, i) => (
            <button
              key={e.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={e.name}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-7 bg-gold-light' : 'w-2.5 bg-ivory/40 hover:bg-ivory/70'}`}
            />
          ))}
        </div>
        <Link
          to={`/schedule/${current.slug}`}
          className="font-heading text-[11px] uppercase tracking-[0.24em] text-ivory/85 underline-offset-4 hover:text-gold-light hover:underline"
          aria-live="polite"
        >
          Tap the invite for details
        </Link>
      </div>
    </main>
  );
}
