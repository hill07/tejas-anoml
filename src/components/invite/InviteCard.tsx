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
  const photo = EVENT_BACKGROUNDS[event.slug];

  return (
    <article
      data-active={active}
      className="inv-card relative aspect-[9/16] w-full overflow-hidden rounded-2xl"
      style={{ background: theme.background, containerType: 'inline-size' } as CSSProperties}
    >
      {/* Event photo backdrop; events without a photo fall back to the drawn scene. */}
      {photo ? (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${photo}")` }}
          aria-hidden="true"
        />
      ) : (
        <svg viewBox="0 0 360 640" preserveAspectRatio="xMidYMax slice" className="inv-kenburns absolute inset-0 h-full w-full" aria-hidden="true">
          <Scene />
        </svg>
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            event.slug === 'welcome-party' || event.slug === 'reception'
              ? 'linear-gradient(180deg, rgba(20,10,25,.72) 0%, rgba(20,10,25,.48) 24%, rgba(20,10,25,.08) 46%, transparent 60%, rgba(20,10,25,.12) 100%)'
              : 'linear-gradient(180deg, rgba(255,250,239,.9) 0%, rgba(255,250,239,.72) 24%, rgba(255,250,239,.22) 43%, transparent 58%, rgba(35,12,25,.08) 100%)',
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

      {/* Readable event-details panel, kept inside the invitation card. */}
      <div
        key={String(active)}
        className="absolute inset-x-[4%] top-[4%] z-10 rounded-xl border px-[5%] py-[4%] text-center shadow-lg"
        style={{
          background: event.slug === 'welcome-party' || event.slug === 'reception'
            ? 'rgba(24, 12, 30, 0.76)'
            : 'rgba(255, 251, 242, 0.88)',
          borderColor: event.slug === 'welcome-party' || event.slug === 'reception'
            ? 'rgba(247, 217, 160, 0.55)'
            : 'rgba(122, 24, 48, 0.22)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: event.slug === 'welcome-party' || event.slug === 'reception' ? '#fff4df' : '#54202b',
        }}
      >
        <h2
          className={`font-script leading-tight break-words ${active ? 'inv-in' : ''}`}
          style={{
            color: event.slug === 'welcome-party' || event.slug === 'reception' ? '#f7d9a0' : '#7a1830',
            fontSize: 'clamp(1.45rem, 10cqw, 2.65rem)',
            textShadow: '0 1px 2px rgba(0,0,0,.18)',
          }}
        >
          {event.name}
        </h2>
        <p
          className={`mt-[2cqw] font-serif font-semibold leading-snug ${active ? 'inv-in' : ''}`}
          style={{ fontSize: 'clamp(.72rem, 3.7cqw, 1rem)', animationDelay: '.25s' }}
        >
          {event.dateLabel} <span className="opacity-60">|</span> {formatTime(event.startTime)}
        </p>
        <p
          className={`mt-[2cqw] font-serif font-semibold leading-snug ${active ? 'inv-in' : ''}`}
          style={{ fontSize: 'clamp(.72rem, 3.7cqw, 1rem)', animationDelay: '.45s' }}
        >
          <span className="opacity-75">Venue:</span>
          <br />
          <span className="break-words">{event.venue}</span>
        </p>
        <p
          className={`mt-[1.5cqw] font-serif italic leading-snug ${active ? 'inv-in' : ''}`}
          style={{ fontSize: 'clamp(.68rem, 3.2cqw, .9rem)', opacity: 0.96, animationDelay: '.65s' }}
        >
          {event.dressCode}
        </p>
      </div>
    </article>
  );
}
