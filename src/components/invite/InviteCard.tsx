import type { CSSProperties } from 'react';
import type { WeddingEvent } from '../../data/wedding';
import { themeFor } from './InviteScenes';

/** "18:00" → "6:00 PM" */
export function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  if (Number.isNaN(h)) return t;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m ?? 0).padStart(2, '0')} ${suffix}`;
}

// Fixed pseudo-random layout so petals don't jump between renders.
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 37 + 11) % 96,
  delay: (i * 1.13) % 9,
  duration: 8 + ((i * 7) % 6),
  size: 7 + ((i * 5) % 7),
  drift: ((i % 2 ? 1 : -1) * (20 + ((i * 13) % 40))),
}));

const EVENT_BACKGROUNDS: Record<string, string> = {
  'welcome-party': '/Mehndi.jpeg',
  haldi: '/Haldi.jpeg',
  wedding: '/Wedding.jpeg',
  reception: '/reception.jpeg',
};

const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 29 + 7) % 94,
  top: (i * 17 + 5) % 60,
  delay: (i * 0.37) % 3,
}));

/**
 * A 9:16 animated invitation card for one event — illustrated scene, drifting
 * petals and the event lettering, in the manner of a video invite.
 */
export function InviteCard({ event, active }: { event: WeddingEvent; active: boolean }) {
  const theme = themeFor(event.slug);
  const Scene = theme.scene;

  return (
    <article
      data-active={active}
      className="inv-card relative aspect-[9/16] w-full overflow-hidden rounded-2xl"
      style={{ background: theme.background, containerType: 'inline-size' } as CSSProperties}
    >
      {/* Event photo backdrop; the crimson velvet outside the card is unchanged. */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${EVENT_BACKGROUNDS[event.slug] ?? ''}")` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            event.slug === 'welcome-party' || event.slug === 'reception'
              ? 'linear-gradient(180deg, rgba(35,12,25,.38) 0%, rgba(35,12,25,.12) 48%, rgba(35,12,25,.3) 100%)'
              : 'linear-gradient(180deg, rgba(255,248,232,.55) 0%, rgba(255,248,232,.12) 48%, rgba(35,12,25,.18) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle animated paper-like highlights over the photo. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.55), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(255,255,255,.3), transparent 60%)' }}
        aria-hidden="true"
      />

      {theme.sparkle
        ? SPARKS.map((s, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inv-spark pointer-events-none absolute h-1 w-1 rounded-full bg-white"
              style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
            />
          ))
        : null}

      {PETALS.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inv-petal pointer-events-none absolute -top-[4%]"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.7,
              background: theme.petals[i % theme.petals.length],
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift': `${p.drift}px`,
            } as CSSProperties
          }
        />
      ))}

      {/* lettering */}
      <div key={String(active)} className="absolute inset-x-0 top-0 pl-[18%] pr-[7%] pt-[10%] text-right">
        <h2
          className={`font-script leading-[1.05] ${active ? 'inv-in' : ''}`}
          style={{ color: theme.title, fontSize: 'clamp(1.6rem, 13cqw, 3.6rem)', textShadow: '0 1px 1px rgba(0,0,0,.08)' }}
        >
          {event.name}
        </h2>
        <p
          className={`mt-[3cqw] font-serif font-semibold leading-snug ${active ? 'inv-in' : ''}`}
          style={{ color: theme.text, fontSize: 'clamp(.8rem, 4.6cqw, 1.25rem)', animationDelay: '.25s' }}
        >
          {event.dateLabel} <span className="opacity-70">|</span> {formatTime(event.startTime)}
        </p>
        <p
          className={`mt-[2.5cqw] font-serif font-semibold leading-snug ${active ? 'inv-in' : ''}`}
          style={{ color: theme.text, fontSize: 'clamp(.8rem, 4.6cqw, 1.25rem)', animationDelay: '.45s' }}
        >
          Venue:
          <br />
          {event.venue}
        </p>
        <p
          className={`mt-[2cqw] font-serif italic ${active ? 'inv-in' : ''}`}
          style={{ color: theme.text, fontSize: 'clamp(.75rem, 4cqw, 1.1rem)', opacity: 0.85, animationDelay: '.65s' }}
        >
          {event.dressCode}
        </p>
      </div>
    </article>
  );
}
