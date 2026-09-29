import type { CSSProperties } from 'react';

/** Gold line · dot · ring · dot · line — the design reference's divider. */
export function OrnamentDivider({ className = '', light = false }: { className?: string; light?: boolean }) {
  const c = light ? 'hsl(var(--gold-light))' : 'hsl(var(--gold))';
  return (
    <svg viewBox="0 0 160 12" className={`mx-auto h-3 w-40 ${className}`} aria-hidden="true">
      <line x1="0" y1="6" x2="62" y2="6" stroke={c} strokeWidth="1" />
      <circle cx="68" cy="6" r="1.4" fill={c} />
      <circle cx="80" cy="6" r="4" fill="none" stroke={c} strokeWidth="1" />
      <circle cx="80" cy="6" r="1.4" fill={c} />
      <circle cx="92" cy="6" r="1.4" fill={c} />
      <line x1="98" y1="6" x2="160" y2="6" stroke={c} strokeWidth="1" />
    </svg>
  );
}

/** ❖ LABEL ❖ between two fading gold rules. */
export function SectionRule({ label, light = false, className = '' }: { label?: string; light?: boolean; className?: string }) {
  const rule = light
    ? 'from-transparent to-[hsl(var(--gold-light)/0.8)]'
    : 'from-transparent to-[hsl(var(--gold)/0.7)]';
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px flex-1 bg-gradient-to-r ${rule}`} />
      <span className={light ? 'text-sm text-gold-light' : 'text-sm text-gold'} aria-hidden="true">
        ❖
      </span>
      {label ? (
        <span className={light ? 'eyebrow text-gold-light' : 'eyebrow'}>{label}</span>
      ) : null}
      {label ? (
        <span className={light ? 'text-sm text-gold-light' : 'text-sm text-gold'} aria-hidden="true">
          ❖
        </span>
      ) : null}
      <span className={`h-px flex-1 bg-gradient-to-l ${rule}`} />
    </div>
  );
}

/** Soft torn-paper edge that sits at the bottom of an image. */
export function TornEdge({ className = '', color = '#ffffff' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className={`block h-10 w-full sm:h-14 ${className}`} aria-hidden="true">
      <path
        fill={color}
        d="M0,60 L0,30 C40,20 90,40 130,28 C170,16 210,36 255,30 C300,24 330,12 375,22 C420,32 455,40 500,30 C545,20 585,10 630,20 C675,30 710,42 755,34 C800,26 835,14 880,22 C925,30 965,40 1010,32 C1055,24 1095,12 1140,22 C1170,28 1188,32 1200,30 L1200,60 Z"
      />
      <path
        fill={color}
        opacity="0.75"
        d="M0,60 L0,42 C60,36 100,50 150,42 C200,34 240,48 290,44 C340,40 385,32 435,40 C485,48 530,52 580,46 C630,40 675,32 725,38 C775,44 820,52 870,46 C920,40 965,34 1015,40 C1065,46 1115,50 1165,45 L1200,44 L1200,60 Z"
      />
    </svg>
  );
}

/** Four gold corner flourishes for framed cards. */
export function GoldCorners({ className = '' }: { className?: string }) {
  const corner = (style: CSSProperties) => (
    <svg viewBox="0 0 40 40" className="absolute h-8 w-8 sm:h-10 sm:w-10" style={style} aria-hidden="true">
      <path d="M2 38 V10 Q2 2 10 2 H38" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.2" />
      <path d="M7 38 V14 Q7 7 14 7 H38" fill="none" stroke="hsl(var(--gold) / .5)" strokeWidth=".8" />
      <circle cx="10" cy="10" r="2" fill="hsl(var(--gold))" />
      <path d="M14 14 q6 -1 8 4 q-5 -1 -8 -4z" fill="hsl(var(--gold) / .7)" />
    </svg>
  );
  return (
    <div className={`pointer-events-none absolute inset-2 ${className}`} aria-hidden="true">
      {corner({ top: 0, left: 0 })}
      {corner({ top: 0, right: 0, transform: 'scaleX(-1)' })}
      {corner({ bottom: 0, left: 0, transform: 'scaleY(-1)' })}
      {corner({ bottom: 0, right: 0, transform: 'scale(-1,-1)' })}
    </div>
  );
}

function Rose({ x, y, r, hue = 352 }: { x: number; y: number; r: number; hue?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={`hsl(${hue} 62% 34%)`} />
      <circle r={r * 0.78} fill={`hsl(${hue} 60% 42%)`} />
      <path
        d={`M${-r * 0.6} 0 A${r * 0.6} ${r * 0.6} 0 1 1 ${r * 0.35} ${r * 0.45} M${-r * 0.3} ${-r * 0.05} A${r * 0.32} ${r * 0.32} 0 1 1 ${r * 0.18} ${r * 0.22}`}
        fill="none"
        stroke={`hsl(${hue} 70% 24%)`}
        strokeWidth={r * 0.1}
        strokeLinecap="round"
      />
      <circle r={r * 0.14} fill={`hsl(${hue} 70% 26%)`} />
    </g>
  );
}

function Marigold({ x, y, r }: { x: number; y: number; r: number }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <g transform={`translate(${x} ${y})`}>
      {petals.map((a) => (
        <ellipse key={a} cx={0} cy={-r * 0.62} rx={r * 0.32} ry={r * 0.45} fill="hsl(32 92% 52%)" transform={`rotate(${a})`} />
      ))}
      {petals.map((a) => (
        <ellipse key={`i${a}`} cx={0} cy={-r * 0.34} rx={r * 0.22} ry={r * 0.3} fill="hsl(38 95% 58%)" transform={`rotate(${a + 15})`} />
      ))}
      <circle r={r * 0.22} fill="hsl(28 85% 42%)" />
    </g>
  );
}

function Leaf({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C6 -8 18 -8 26 0 C18 8 6 8 0 0 Z" fill="hsl(110 28% 34%)" />
      <path d="M1 0 H24" stroke="hsl(110 30% 24%)" strokeWidth=".8" />
    </g>
  );
}

/** A spray of roses, marigolds and leaves, drawn in SVG. */
export function FloralSpray({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 160" className={className} style={style} aria-hidden="true">
      <path d="M10 150 C50 120 90 100 150 40" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.4" />
      <path d="M60 118 C70 90 95 80 120 78" fill="none" stroke="hsl(var(--gold) / .7)" strokeWidth="1" />
      <Leaf x={30} y={132} rot={-60} s={1.1} />
      <Leaf x={48} y={124} rot={20} />
      <Leaf x={92} y={92} rot={-80} s={0.9} />
      <Leaf x={112} y={70} rot={10} s={0.9} />
      <Leaf x={140} y={52} rot={-40} s={0.8} />
      <Leaf x={70} y={110} rot={150} s={0.9} />
      <Rose x={74} y={100} r={20} />
      <Marigold x={108} y={82} r={13} />
      <Rose x={132} y={54} r={12} hue={350} />
      <Marigold x={46} y={128} r={10} />
      <circle cx={152} cy={36} r={4} fill="hsl(352 60% 38%)" />
      <circle cx={160} cy={30} r={2.5} fill="hsl(var(--gold))" />
      <circle cx={96} cy={112} r={2.5} fill="hsl(var(--gold))" />
    </svg>
  );
}
