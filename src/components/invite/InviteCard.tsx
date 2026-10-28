import { useEffect, useState, type CSSProperties } from 'react';
import type { WeddingEvent } from '../../data/wedding';
import { invitePhotoReady, whenInvitePhotoReady } from '../../lib/invitePhotos';
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
  'welcome-party': '/optimized/mehndi.webp',
  haldi: '/optimized/haldi.webp',
  wedding: '/optimized/wedding.webp',
  reception: '/optimized/reception.webp',
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
  // The gradient is only the drawn-scene fallback. Photo cards stay blank until
  // the artwork has decoded, so the gradient never flashes in front of it.
  const [photoReady, setPhotoReady] = useState(() => (photo ? invitePhotoReady(photo) : false));
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    if (!photo) return;
    let live = true;
    whenInvitePhotoReady(photo).then((ok) => {
      if (!live) return;
      if (ok) setPhotoReady(true);
      else setPhotoFailed(true);
    });
    return () => {
      live = false;
    };
  }, [photo]);

  const showPhoto = Boolean(photo) && photoReady && !photoFailed;
  const waitingForPhoto = Boolean(photo) && !photoReady && !photoFailed;

  return (
    <article
      data-active={active}
      className={`inv-card relative aspect-[9/16] w-full overflow-hidden rounded-2xl ${waitingForPhoto ? 'invisible' : ''}`}
      style={{ background: showPhoto || waitingForPhoto ? 'transparent' : theme.background, containerType: 'inline-size' } as CSSProperties}
    >
      {/* Event photo backdrop; events without a photo fall back to the drawn scene. */}
      {showPhoto ? (
        <img
          src={photo ?? ''}
          alt=""
          decoding="sync"
          fetchPriority={active ? 'high' : 'low'}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      ) : photo && !photoFailed ? null : (
        <svg viewBox="0 0 360 640" preserveAspectRatio="xMidYMax slice" className="inv-kenburns absolute inset-0 h-full w-full" aria-hidden="true">
          <Scene />
        </svg>
      )}

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

      {/* Event lettering. */}
      <div
        key={String(active)}
        className={`absolute inset-x-[5%] z-10 px-[3%] text-center ${event.slug === 'welcome-party' ? 'top-[7%]' : event.slug === 'wedding' ? 'top-[20%]' : 'top-1/2 -translate-y-1/2'}`}
        style={{
          color: event.slug === 'reception' ? '#fff4df' : '#54202b',
        }}
      >
        <h2
          className={`font-script leading-tight break-words ${active ? 'inv-in' : ''}`}
          style={{
            color: event.slug === 'reception' ? '#f7d9a0' : '#7a1830',
            fontSize: 'clamp(1.65rem, 11cqw, 2.9rem)',
          }}
        >
          {event.name}
        </h2>
        <div
          className={`mt-[2.5cqw] font-serif font-semibold leading-relaxed ${active ? 'inv-in' : ''}`}
          style={{ fontSize: 'clamp(.82rem, 4.3cqw, 1.15rem)', animationDelay: '.25s' }}
        >
          <p>{event.dateLabel}</p>
          <p className="mt-[.8cqw]">{formatTime(event.startTime)}</p>
        </div>
        <p
          className={`mt-[2cqw] font-serif font-semibold leading-snug ${active ? 'inv-in' : ''}`}
          style={{ fontSize: 'clamp(.82rem, 4.3cqw, 1.15rem)', animationDelay: '.45s' }}
        >
          <span className="opacity-80">Venue:</span>
          <br />
          <span className="break-words">{event.venue}</span>
        </p>
        <p
          className={`mt-[1.5cqw] font-serif italic leading-snug ${active ? 'inv-in' : ''}`}
          style={{ fontSize: 'clamp(.76rem, 3.8cqw, 1rem)', opacity: 1, animationDelay: '.65s' }}
        >
          {event.dressCode}
        </p>
      </div>
    </article>
  );
}
