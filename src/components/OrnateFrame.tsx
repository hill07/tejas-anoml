import { useId, type ReactNode } from 'react';

/*
 * Carved, gilded baroque picture frame (portrait, 3:4).
 * Drawn in a 120 × 160 box; the SVG is padded by 6 on every side so the
 * carved corners can spill outside the moulding.
 */

const W = 120;
const H = 160;
const PAD = 6;
const VB_W = W + PAD * 2;
const VB_H = H + PAD * 2;
// Picture opening inside the moulding
const OPEN = { x: 16, y: 18, w: 88, h: 124 };

// Percentage insets that position the picture exactly inside the opening.
const inset = {
  left: `${((OPEN.x + PAD) / VB_W) * 100}%`,
  right: `${((VB_W - (OPEN.x + OPEN.w + PAD)) / VB_W) * 100}%`,
  top: `${((OPEN.y + PAD) / VB_H) * 100}%`,
  bottom: `${((VB_H - (OPEN.y + OPEN.h + PAD)) / VB_H) * 100}%`,
};

/** Beads spaced evenly around a rectangle. */
function beads(x0: number, y0: number, x1: number, y1: number, step: number) {
  const pts: [number, number][] = [];
  for (let x = x0; x <= x1; x += step) pts.push([x, y0], [x, y1]);
  for (let y = y0 + step; y < y1; y += step) pts.push([x0, y], [x1, y]);
  return pts;
}

/** Engraved S-scroll carving along one straight run. */
function scrollRun(horizontal: boolean, fixed: number, from: number, to: number) {
  const segs: string[] = [];
  const len = 10;
  for (let p = from; p + len <= to; p += len) {
    const a = p;
    const m = p + len / 2;
    const b = p + len;
    segs.push(
      horizontal
        ? `M${a} ${fixed} C${a + 2} ${fixed - 3} ${m - 1} ${fixed - 3} ${m} ${fixed} S${b - 2} ${fixed + 3} ${b} ${fixed}`
        : `M${fixed} ${a} C${fixed - 3} ${a + 2} ${fixed - 3} ${m - 1} ${fixed} ${m} S${fixed + 3} ${b - 2} ${fixed} ${b}`,
    );
  }
  return segs.join(' ');
}

function CornerCarving({ id }: { id: string }) {
  return (
    <g>
      {/* acanthus leaves bursting from the corner */}
      <path
        d="M-5 22 C-7 10 -3 -2 8 -5 C20 -8 26 -1 21 4 C17 8 12 5 14 1 C8 1 5 5 6 10 C9 9 12 12 9 15 C6 18 2 17 1 14 C-1 17 -2 20 -5 22 Z"
        fill={`url(#${id}-gold)`}
        stroke="#6d4410"
        strokeWidth=".6"
      />
      <path d="M22 -3 C28 -6 33 -2 31 2 C29 5 25 4 26 1" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-3 24 C-6 30 -2 35 2 33 C5 31 4 27 1 28" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3 3 C6 7 9 8 12 7" fill="none" stroke="#fff3c4" strokeWidth=".8" opacity=".9" />
      <circle cx="6" cy="6" r="2.6" fill="#fbe7a6" stroke="#6d4410" strokeWidth=".5" />
      <circle cx="5.3" cy="5.3" r=".9" fill="#fffbe8" />
    </g>
  );
}

function Crest({ id }: { id: string }) {
  // Shell cartouche centred on the top rail
  return (
    <g>
      <path
        d="M42 8 C43 -1 50 -6 55 -1 C56 -7 64 -7 65 -1 C70 -6 77 -1 78 8 C72 5 66 6 60 9 C54 6 48 5 42 8 Z"
        fill={`url(#${id}-gold)`}
        stroke="#6d4410"
        strokeWidth=".6"
      />
      <path d="M60 -3 V7 M55 -1 L58 7 M65 -1 L62 7 M49 2 L55 8 M71 2 L65 8" stroke="#7a4d12" strokeWidth=".55" />
      <circle cx="60" cy="9" r="2.4" fill="#fbe7a6" stroke="#6d4410" strokeWidth=".5" />
    </g>
  );
}

function SideCartouche({ id }: { id: string }) {
  // Small scroll pair centred on the left rail (mirrored for the right)
  return (
    <g>
      <path
        d="M4 66 C-4 68 -6 74 -1 77 C-5 79 -5 81 -1 83 C-6 86 -4 92 4 94 C2 88 3 84 5 80 C3 76 2 72 4 66 Z"
        fill={`url(#${id}-gold)`}
        stroke="#6d4410"
        strokeWidth=".6"
      />
      <circle cx="0" cy="80" r="1.8" fill="#fbe7a6" stroke="#6d4410" strokeWidth=".4" />
    </g>
  );
}

export function OrnateFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  const id = `of${useId().replace(/:/g, '')}`;
  const outer = `M2 6 Q2 2 6 2 H${W - 6} Q${W - 2} 2 ${W - 2} 6 V${H - 6} Q${W - 2} ${H - 2} ${W - 6} ${H - 2} H6 Q2 ${H - 2} 2 ${H - 6} Z`;
  const inner = `M${OPEN.x - 2} ${OPEN.y - 2} H${OPEN.x + OPEN.w + 2} V${OPEN.y + OPEN.h + 2} H${OPEN.x - 2} Z`;
  const carve =
    scrollRun(true, 7.5, 24, 42) +
    ' ' +
    scrollRun(true, 7.5, 80, 98) +
    ' ' +
    scrollRun(true, H - 7.5, 24, 98) +
    ' ' +
    scrollRun(false, 7.5, 28, 62) +
    ' ' +
    scrollRun(false, 7.5, 98, 134) +
    ' ' +
    scrollRun(false, W - 7.5, 28, 62) +
    ' ' +
    scrollRun(false, W - 7.5, 98, 134);

  return (
    <div
      className={`relative aspect-[132/172] ${className}`}
      style={{ filter: 'drop-shadow(0 10px 14px hsl(230 40% 12% / .45)) drop-shadow(0 2px 3px hsl(30 60% 15% / .35))' }}
    >
      {/* the picture sits beneath the frame */}
      <div
        className="absolute overflow-hidden"
        style={{
          ...inset,
          background: 'radial-gradient(ellipse at 50% 40%, hsl(40 40% 97%) 0%, hsl(36 18% 88%) 70%, hsl(30 12% 80%) 100%)',
        }}
      >
        {children}
      </div>

      <svg viewBox={`${-PAD} ${-PAD} ${VB_W} ${VB_H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbe7a1" />
            <stop offset=".18" stopColor="#d9a845" />
            <stop offset=".36" stopColor="#8f5e18" />
            <stop offset=".52" stopColor="#f2cf73" />
            <stop offset=".7" stopColor="#b07a24" />
            <stop offset=".86" stopColor="#f6dc8c" />
            <stop offset="1" stopColor="#7d5014" />
          </linearGradient>
          <linearGradient id={`${id}-lip`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff1bd" />
            <stop offset=".5" stopColor="#c8943a" />
            <stop offset="1" stopColor="#f5d783" />
          </linearGradient>
          <radialGradient id={`${id}-sheen`} cx=".3" cy=".2" r=".9">
            <stop offset="0" stopColor="#fff8dc" stopOpacity=".55" />
            <stop offset=".5" stopColor="#fff8dc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* moulding */}
        <path d={`${outer} ${inner}`} fillRule="evenodd" fill={`url(#${id}-gold)`} stroke="#6d4410" strokeWidth=".7" />
        <path d={`${outer} ${inner}`} fillRule="evenodd" fill={`url(#${id}-sheen)`} />
        {/* carved scroll band */}
        <path d={carve} fill="none" stroke="#7a4d12" strokeWidth="1.3" strokeLinecap="round" opacity=".8" />
        <path d={carve} fill="none" stroke="#fff0b8" strokeWidth=".5" strokeLinecap="round" opacity=".75" transform="translate(-.4 -.4)" />
        {/* beaded inner row */}
        {beads(12, 13.5, W - 12, H - 13.5, 4.6).map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r=".95" fill="#fae6a3" stroke="#7a4d12" strokeWidth=".25" />
        ))}
        {/* inner lip around the picture */}
        <rect x={OPEN.x - 1.4} y={OPEN.y - 1.4} width={OPEN.w + 2.8} height={OPEN.h + 2.8} fill="none" stroke={`url(#${id}-lip)`} strokeWidth="2.6" />
        <rect x={OPEN.x} y={OPEN.y} width={OPEN.w} height={OPEN.h} fill="none" stroke="#5c380c" strokeWidth=".6" />

        {/* carved ornaments */}
        <CornerCarving id={id} />
        <g transform={`translate(${W} 0) scale(-1 1)`}>
          <CornerCarving id={id} />
        </g>
        <g transform={`translate(0 ${H}) scale(1 -1)`}>
          <CornerCarving id={id} />
        </g>
        <g transform={`translate(${W} ${H}) scale(-1 -1)`}>
          <CornerCarving id={id} />
        </g>
        <Crest id={id} />
        <g transform={`translate(0 ${H}) scale(1 -1)`}>
          <Crest id={id} />
        </g>
        <SideCartouche id={id} />
        <g transform={`translate(${W} 0) scale(-1 1)`}>
          <SideCartouche id={id} />
        </g>
      </svg>
    </div>
  );
}
