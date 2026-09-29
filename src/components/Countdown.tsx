import { useEffect, useState } from 'react';
import { couple } from '../data/wedding';

function remaining(target: number) {
  const t = Math.max(0, target - Date.now());
  return {
    days: Math.floor(t / 864e5),
    hours: Math.floor(t / 36e5) % 24,
    minutes: Math.floor(t / 6e4) % 60,
    seconds: Math.floor(t / 1e3) % 60,
    done: t === 0,
  };
}

/** Live countdown to the wedding ceremony (30 June 2027, 10:30 Malta time). */
export function Countdown({ className = '' }: { className?: string }) {
  const target = new Date(couple.weddingDate).getTime();
  const [left, setLeft] = useState(() => remaining(target));

  useEffect(() => {
    const id = window.setInterval(() => setLeft(remaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (left.done) {
    return <p className={`text-center font-serif text-xl italic text-maroon ${className}`}>our forever begins</p>;
  }

  const cells = [
    { value: left.days, label: 'Days' },
    { value: left.hours, label: 'Hrs' },
    { value: left.minutes, label: 'Min' },
    { value: left.seconds, label: 'Sec' },
  ];

  return (
    <div className={`grid grid-cols-4 gap-2 sm:gap-3 ${className}`} role="timer" aria-label="Countdown to the wedding">
      {cells.map((c) => (
        <div
          key={c.label}
          className="rounded-xl bg-[hsl(var(--ivory)/0.8)] py-3 text-center shadow-[0_0_0_1px_hsl(var(--gold)/0.35)]"
        >
          <div className="font-heading text-2xl leading-none text-maroon-deep tabular-nums sm:text-3xl">
            {String(c.value).padStart(2, '0')}
          </div>
          <div className="mt-1.5 font-heading text-[10px] uppercase tracking-[0.2em] text-muted">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
