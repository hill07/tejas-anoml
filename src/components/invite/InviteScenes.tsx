import type { ReactNode } from 'react';
import { Leaf, Marigold, Rose } from '../DoorArt';

/*
 * Illustrated backdrops for the invitation cards, drawn on a 360 × 640 (9:16) canvas.
 * The top ~40% is kept light so the card's lettering sits over it.
 * Elements with the `inv-*` classes are animated from index.css.
 */

const skin = '#e9b996';
const hair = '#2f1b18';

export type SceneTheme = {
  /** Card background (CSS) */
  background: string;
  /** Title colour */
  title: string;
  /** Body text colour */
  text: string;
  /** Petal colours that drift across the card */
  petals: string[];
  /** Twinkling sparkles for evening scenes */
  sparkle?: boolean;
  scene: () => ReactNode;
};

function Defs() {
  return (
    <defs>
      <filter id="inv-wc" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="inv-soft" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id="inv-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <radialGradient id="inv-flame" cx=".5" cy=".7" r=".6">
        <stop offset="0" stopColor="#fff3b0" />
        <stop offset=".45" stopColor="#fbb03b" />
        <stop offset="1" stopColor="#e2542a" />
      </radialGradient>
    </defs>
  );
}

/* ----------------------------- reusable figures ---------------------------- */

function Bride({ x, y, s = 1, lehenga = '#cf3b55', trim = '#e8c15e', veil = '#ef6f86' }: { x: number; y: number; s?: number; lehenga?: string; trim?: string; veil?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 0 Q-20 -40 -8 -58 H8 Q20 -40 26 0 Q0 6 -26 0 Z" fill={lehenga} />
      <path d="M-26 0 Q0 6 26 0 L25 -5 Q0 1 -25 -5 Z" fill={trim} />
      <path d="M-18 -18 Q0 -14 18 -18" fill="none" stroke={trim} strokeWidth="1.4" opacity=".8" />
      <path d="M-9 -58 Q0 -64 9 -58 L9 -72 Q0 -76 -9 -72 Z" fill={lehenga} />
      <path d="M-9 -60 H9" stroke={trim} strokeWidth="2" />
      <path d="M-9 -70 Q-15 -58 -11 -46" fill="none" stroke={skin} strokeWidth="4" strokeLinecap="round" />
      <path d="M9 -70 Q15 -58 11 -46" fill="none" stroke={skin} strokeWidth="4" strokeLinecap="round" />
      <rect x="-2.5" y="-80" width="5" height="7" fill="#d9a07d" />
      <circle cx="0" cy="-86" r="8" fill={skin} />
      <path d="M-8.5 -85 Q-9 -96 0 -96 Q9 -96 8.5 -85 Q6 -91 0 -91 Q-6 -91 -8.5 -85 Z" fill={hair} />
      <circle cx="0" cy="-91" r="1.4" fill={trim} />
      <path d="M-10 -84 Q-10 -100 0 -100 Q12 -100 12 -86 Q18 -60 22 -28 Q14 -44 11 -60 Q4 -72 -10 -84 Z" fill={veil} opacity=".55" />
    </g>
  );
}

function Groom({ x, y, s = 1, coat = '#f6ead2', trim = '#d9b56a', safa = '#b8263f', trousers = '#efe1c4' }: { x: number; y: number; s?: number; coat?: string; trim?: string; safa?: string; trousers?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-8 0 L-7 -30 H7 L8 0 Z" fill={trousers} />
      <path d="M-15 -26 Q-14 -68 0 -72 Q14 -68 15 -26 Z" fill={coat} />
      <path d="M0 -70 V-26" stroke={trim} strokeWidth="1.2" />
      <path d="M-14 -60 Q0 -48 14 -60" fill="none" stroke="#e05b72" strokeWidth="3" />
      <path d="M-14 -66 Q-19 -50 -14 -36" fill="none" stroke={coat} strokeWidth="6" strokeLinecap="round" />
      <path d="M14 -66 Q19 -50 14 -36" fill="none" stroke={coat} strokeWidth="6" strokeLinecap="round" />
      <rect x="-3" y="-80" width="6" height="8" fill="#d9a07d" />
      <circle cx="0" cy="-86" r="8.5" fill={skin} />
      <path d="M-9.5 -86 Q-10 -100 0 -101 Q11 -100 10 -86 Q0 -91 -9.5 -86 Z" fill={safa} />
      <path d="M8 -97 Q16 -99 14 -88" fill="none" stroke={safa} strokeWidth="2.4" />
      <circle cx="0" cy="-97" r="1.8" fill="#f1cf6a" />
    </g>
  );
}

function MarigoldString({ x, y0, y1, step = 9 }: { x: number; y0: number; y1: number; step?: number }) {
  const n = Math.floor((y1 - y0) / step);
  return (
    <g className="inv-sway" style={{ transformOrigin: `${x}px ${y0}px` }}>
      <path d={`M${x} ${y0} V${y1}`} stroke="#6d8f4e" strokeWidth=".8" />
      {Array.from({ length: n }, (_, i) => (
        <Marigold key={i} x={x} y={y0 + i * step + step / 2} r={4.4} />
      ))}
      <Rose x={x} y={y1 + 4} r={4} tone="red" />
    </g>
  );
}

function BananaLeaf({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C-10 -60 -6 -130 14 -180 C30 -130 34 -60 12 0 Z" fill="#6f9b4a" />
      <path d="M6 0 C6 -60 10 -120 14 -180" fill="none" stroke="#4e7534" strokeWidth="2" />
      {[-30, -60, -90, -120, -150].map((yy) => (
        <path key={yy} d={`M${8 + (yy / -180) * 6} ${yy} l-12 10 M${8 + (yy / -180) * 6} ${yy} l14 12`} stroke="#86b35f" strokeWidth="1.2" />
      ))}
    </g>
  );
}

function Chandelier({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const drops = [-30, -20, -10, 0, 10, 20, 30];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="inv-sway" style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}>
      <path d={`M0 ${-y} V0`} stroke="#e8d7b0" strokeWidth="1" opacity=".7" />
      <ellipse cx="0" cy="4" rx="34" ry="6" fill="none" stroke="#f3e4bf" strokeWidth="1.6" />
      <ellipse cx="0" cy="18" rx="24" ry="4" fill="none" stroke="#f3e4bf" strokeWidth="1.2" />
      {drops.map((d, i) => (
        <g key={d}>
          <path d={`M${d} 4 V${24 + (i % 3) * 8}`} stroke="#f7eed6" strokeWidth=".6" />
          <path d={`M${d} ${26 + (i % 3) * 8} l-2.4 -4 l2.4 -4 l2.4 4 z`} fill="#fdf6e3" opacity=".95" />
        </g>
      ))}
      {[-30, 0, 30].map((d) => (
        <circle key={d} cx={d} cy={-2} r={3} fill="#fff4c8" className="inv-twinkle" style={{ animationDelay: `${(d + 30) * 20}ms` }} />
      ))}
      <circle cx="0" cy="10" r="20" fill="#fff1c4" opacity=".25" filter="url(#inv-glow)" />
      </g>
    </g>
  );
}

/* ---------------------------------- scenes --------------------------------- */

function WelcomeMehndi() {
  // Olive Gardens at dusk: string lights, lanterns and a hennaed hand
  const bulbs = Array.from({ length: 14 }, (_, i) => i);
  return (
    <>
      <Defs />
      <circle cx="280" cy="560" r="160" fill="#f5b86a" opacity=".35" filter="url(#inv-soft)" />
      {/* string lights */}
      {[0, 1].map((row) => (
        <g key={row}>
          <path
            d={`M0 ${300 + row * 30} Q90 ${330 + row * 30} 180 ${308 + row * 30} T360 ${312 + row * 30}`}
            fill="none"
            stroke="#1c2a22"
            strokeWidth="1"
            opacity=".7"
          />
          {bulbs.map((i) => {
            const t = i / (bulbs.length - 1);
            const bx = t * 360;
            const by = 300 + row * 30 + Math.sin(t * Math.PI * 2) * 12 + 12;
            return (
              <g key={i}>
                <circle cx={bx} cy={by} r="7" fill="#ffd98a" opacity=".45" filter="url(#inv-glow)" />
                <circle cx={bx} cy={by} r="2.6" fill="#fff1c1" className="inv-twinkle" style={{ animationDelay: `${(i * 260 + row * 130) % 2000}ms` }} />
              </g>
            );
          })}
        </g>
      ))}
      <g filter="url(#inv-wc)">
        {/* olive trees */}
        {[
          [40, 470, 1.1],
          [320, 480, 1],
        ].map(([x, y, s]) => (
          <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
            <path d="M-6 120 C-4 60 -14 30 -4 0 C4 30 10 60 8 120 Z" fill="#5a4a3a" />
            {[
              [-40, -20, 46, 30],
              [30, -30, 50, 32],
              [-10, -60, 54, 34],
              [-50, 20, 34, 22],
              [44, 10, 36, 22],
            ].map(([cx, cy, rx, ry], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={i % 2 ? '#7f9a6b' : '#6b8a5e'} opacity=".95" />
            ))}
            {Array.from({ length: 18 }, (_, i) => (
              <ellipse key={`o${i}`} cx={-50 + ((i * 37) % 100)} cy={-70 + ((i * 23) % 100)} rx="4" ry="1.6" fill="#b9c9a6" transform={`rotate(${i * 25} ${-50 + ((i * 37) % 100)} ${-70 + ((i * 23) % 100)})`} />
            ))}
          </g>
        ))}
        {/* lanterns */}
        {[110, 250].map((x, i) => (
          <g key={x} className="inv-sway" style={{ transformOrigin: `${x}px 330px` }}>
            <path d={`M${x} 330 V${370 + i * 20}`} stroke="#2a2a22" strokeWidth="1" />
            <path d={`M${x - 11} ${370 + i * 20} h22 l-3 30 h-16 z`} fill="#e7a94a" stroke="#8a5a1c" strokeWidth="1" />
            <rect x={x - 8} y={376 + i * 20} width="16" height="18" fill="#ffe29a" className="inv-twinkle" />
            <circle cx={x} cy={386 + i * 20} r="18" fill="#ffd27a" opacity=".35" filter="url(#inv-glow)" />
          </g>
        ))}
        {/* ground & cushions */}
        <path d="M0 560 Q180 530 360 560 V640 H0 Z" fill="#3f5b3c" />
        <ellipse cx="96" cy="580" rx="46" ry="14" fill="#d9467a" />
        <ellipse cx="96" cy="574" rx="40" ry="9" fill="#ee6d98" />
        <ellipse cx="260" cy="590" rx="40" ry="12" fill="#f09a2a" />
        <ellipse cx="260" cy="585" rx="34" ry="8" fill="#f8bf45" />
        {/* hennaed hand */}
        <g transform="translate(182 640) rotate(-8)">
          <path d="M-34 0 C-38 -50 -40 -80 -34 -118 C-31 -128 -22 -126 -22 -116 L-20 -80 L-18 -150 C-17 -160 -6 -160 -6 -150 L-4 -86 L-2 -164 C-1 -174 11 -174 11 -164 L12 -88 L16 -150 C17 -160 28 -158 28 -148 L26 -76 C34 -96 44 -104 50 -96 C56 -88 40 -60 32 -40 C26 -20 24 -8 24 0 Z" fill="#e7b48f" />
          <g stroke="#9a3b1c" strokeWidth="1.3" fill="none" strokeLinecap="round">
            <circle cx="-4" cy="-54" r="14" />
            <circle cx="-4" cy="-54" r="8" />
            <circle cx="-4" cy="-54" r="2.5" fill="#9a3b1c" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <path key={i} d={`M${-4 + Math.cos(a) * 14} ${-54 + Math.sin(a) * 14} q${Math.cos(a) * 5} ${Math.sin(a) * 5} ${Math.cos(a + 0.5) * 7} ${Math.sin(a + 0.5) * 7}`} />;
            })}
            <path d="M-26 -18 q14 -8 28 0 t26 0" />
            <path d="M-26 -8 q14 -8 28 0 t26 0" />
            {[-12, 4, 20].map((fx) => (
              <g key={fx}>
                <path d={`M${fx} -100 v-40`} strokeDasharray="2 4" />
                <circle cx={fx} cy={-146} r="3" />
              </g>
            ))}
            <path d="M-28 -90 v-20" strokeDasharray="2 4" />
            <path d="M34 -60 q6 -12 12 -20" strokeDasharray="2 4" />
          </g>
        </g>
      </g>
    </>
  );
}

function Haldi() {
  // Marigold-yellow morning: a couple on a flower swing
  return (
    <>
      <Defs />
      <circle cx="90" cy="120" r="120" fill="#fff0a8" opacity=".6" filter="url(#inv-soft)" />
      <circle cx="300" cy="420" r="150" fill="#fbd15b" opacity=".5" filter="url(#inv-soft)" />
      {/* marigold strings hanging from the top-left */}
      <MarigoldString x={22} y0={0} y1={210} />
      <MarigoldString x={50} y0={0} y1={160} />
      <MarigoldString x={78} y0={0} y1={120} />
      <g filter="url(#inv-wc)">
        {/* swing */}
        {[118, 242].map((x) => (
          <g key={x}>
            <path d={`M${x} 250 V470`} stroke="#6d8f4e" strokeWidth="1.2" />
            {Array.from({ length: 24 }, (_, i) => (
              <Marigold key={i} x={x} y={256 + i * 9} r={4.6} />
            ))}
          </g>
        ))}
        <path d="M100 250 Q180 232 260 250" fill="none" stroke="#6d8f4e" strokeWidth="2" />
        {Array.from({ length: 17 }, (_, i) => (
          <Marigold key={i} x={102 + i * 9.6} y={246 - Math.sin((i / 16) * Math.PI) * 14} r={5} />
        ))}
        <rect x="104" y="470" width="152" height="12" rx="3" fill="#b0702a" />
        <rect x="104" y="468" width="152" height="4" fill="#e7b04a" />
        {/* couple in yellow */}
        <Groom x={152} y={470} s={1.05} coat="#f7d34d" trim="#e2a52b" safa="#e2842b" trousers="#fff6dc" />
        <Bride x={208} y={470} s={1.05} lehenga="#f6c233" trim="#e2842b" veil="#f5a623" />
        {/* banana leaves */}
        <BananaLeaf x={4} y={640} r={6} s={1.25} />
        <BananaLeaf x={330} y={640} r={-12} s={1.15} />
        {/* floor & brass urlis */}
        <path d="M0 560 Q180 540 360 560 V640 H0 Z" fill="#c9722c" opacity=".9" />
        {[
          [110, 590],
          [250, 596],
        ].map(([x, y]) => (
          <g key={x}>
            <ellipse cx={x} cy={y} rx="40" ry="12" fill="#d69a2f" />
            <path d={`M${x - 40} ${y} Q${x} ${y + 34} ${x + 40} ${y} Z`} fill="#b87a1f" />
            <ellipse cx={x} cy={y} rx="34" ry="8" fill="#f2c233" />
            {[-18, -6, 8, 20].map((dx) => (
              <Marigold key={dx} x={x + dx} y={y - 1 + (dx % 3)} r={3.6} />
            ))}
          </g>
        ))}
      </g>
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={20 + ((i * 53) % 330)} cy={618 + ((i * 7) % 16)} r="3" fill={i % 2 ? '#f4a32c' : '#e0606e'} />
      ))}
    </>
  );
}

function Wedding() {
  // Sunset on the upper terrace: mandap, sacred fire and the couple
  return (
    <>
      <Defs />
      <circle cx="180" cy="430" r="150" fill="#ffd39a" opacity=".6" filter="url(#inv-soft)" />
      <circle cx="180" cy="430" r="40" fill="#ffe2a8" opacity=".9" className="inv-glow" />
      <g filter="url(#inv-wc)">
        {/* distant sea & terrace */}
        <rect x="0" y="470" width="360" height="30" fill="#e8a18f" opacity=".6" />
        {/* mandap */}
        {[46, 300].map((x) => (
          <g key={x}>
            <rect x={x} y="250" width="14" height="300" fill="#fff4ea" stroke="#d8b98a" strokeWidth="1" />
            <rect x={x - 4} y="244" width="22" height="10" fill="#e2b35a" />
            {Array.from({ length: 10 }, (_, i) => (
              <Rose key={i} x={x + 7} y={268 + i * 28} r={5.5} tone={i % 2 ? 'red' : 'blush'} />
            ))}
          </g>
        ))}
        <path d="M30 252 Q180 170 330 252" fill="#fff4ea" stroke="#d8b98a" strokeWidth="1.2" />
        <path d="M30 252 Q70 268 105 252 Q142 268 180 252 Q218 268 255 252 Q292 268 330 252" fill="#fbe4e0" stroke="#d8b98a" strokeWidth="1" />
        {Array.from({ length: 13 }, (_, i) => (
          <Rose key={i} x={40 + i * 23.3} y={250 - Math.sin((i / 12) * Math.PI) * 44} r={7} tone={i % 3 ? 'red' : 'pink'} />
        ))}
        {/* floral strands */}
        {[90, 130, 230, 270].map((x, i) => (
          <g key={x} className="inv-sway" style={{ transformOrigin: `${x}px 262px` }}>
            <path d={`M${x} 262 V${330 + (i % 2) * 30}`} stroke="#f8e9d8" strokeWidth="1.2" />
            {Array.from({ length: 6 + (i % 2) * 3 }, (_, k) => (
              <circle key={k} cx={x} cy={270 + k * 10} r="2.6" fill="#fffaf0" />
            ))}
          </g>
        ))}
        {/* havan kund & fire */}
        <path d="M156 520 H204 L198 532 H162 Z" fill="#c38d2f" />
        <path d="M162 532 H198 L194 544 H166 Z" fill="#a8741f" />
        <g className="inv-flicker" style={{ transformOrigin: '180px 520px' }}>
          <path d="M180 470 C194 490 202 506 194 520 H166 C158 506 166 490 180 470 Z" fill="url(#inv-flame)" />
          <path d="M180 490 C186 500 190 508 186 518 H174 C170 508 174 500 180 490 Z" fill="#fff3b0" />
        </g>
        {/* couple */}
        <Groom x={118} y={560} s={1.25} />
        <Bride x={244} y={560} s={1.25} />
        <path d="M134 484 Q180 500 228 484" fill="none" stroke="#f2a7bb" strokeWidth="3" strokeDasharray="1 4" strokeLinecap="round" />
        {/* balustrade */}
        <rect x="0" y="560" width="360" height="12" fill="#f3dfc6" />
        {Array.from({ length: 19 }, (_, i) => (
          <path key={i} d={`M${6 + i * 19.5} 572 q-5 14 0 26 q5 12 0 22 h10 q-5 -10 0 -22 q5 -12 0 -26 z`} fill="#ecd3b3" stroke="#d2b48e" strokeWidth=".6" />
        ))}
        <rect x="0" y="620" width="360" height="20" fill="#e4c8a4" />
      </g>
      <Rose x={24} y={600} r={14} tone="red" />
      <Rose x={52} y={616} r={10} tone="pink" />
      <Leaf x={4} y={586} r={-120} s={2} />
      <Rose x={336} y={604} r={13} tone="red" />
      <Rose x={308} y={620} r={9} tone="blush" />
      <Leaf x={340} y={584} r={-60} s={2} />
    </>
  );
}

function Reception() {
  // Evening in the ballroom: chandeliers, champagne and a first dance
  return (
    <>
      <Defs />
      <circle cx="180" cy="470" r="160" fill="#f2a6c0" opacity=".35" filter="url(#inv-soft)" />
      <Chandelier x={64} y={250} s={1.25} />
      <Chandelier x={180} y={290} s={0.85} />
      <g filter="url(#inv-wc)">
        {/* lower terrace arches */}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${10 + i * 88} 560 V400 Q${54 + i * 88} 340 ${98 + i * 88} 400 V560`}
            fill="none"
            stroke="#f3cfe0"
            strokeWidth="3"
            opacity=".35"
          />
        ))}
        {/* champagne tower */}
        <g transform="translate(300 560)">
          {[
            [0, 0, 4],
            [0, -26, 3],
            [0, -52, 2],
            [0, -78, 1],
          ].map(([, yy, n]) =>
            Array.from({ length: n }, (_, k) => {
              const gx = (k - (n - 1) / 2) * 16;
              return (
                <g key={`${yy}${k}`} transform={`translate(${gx} ${yy})`}>
                  <path d="M-7 -24 L7 -24 L2 -10 V-2 H5 V0 H-5 V-2 H-2 V-10 Z" fill="#fdf1d2" opacity=".85" />
                  <path d="M-5.5 -21 L5.5 -21 L1.6 -12 H-1.6 Z" fill="#f3cf6a" />
                </g>
              );
            }),
          )}
        </g>
        {/* dancing couple */}
        <g transform="translate(176 560)">
          <path d="M-4 0 Q-2 -40 6 -58 H22 Q34 -40 44 0 Q20 8 -4 0 Z" fill="#f6d2de" />
          <path d="M8 -58 Q14 -66 22 -58 L22 -74 Q14 -78 8 -74 Z" fill="#f6d2de" />
          <circle cx="15" cy="-86" r="8" fill={skin} />
          <path d="M6.5 -85 Q6 -97 15 -97 Q24 -97 23.5 -85 Q30 -70 24 -60 Q22 -76 15 -91 Q9 -89 6.5 -85 Z" fill={hair} />
          <path d="M-30 0 L-28 -30 H-16 L-14 0 Z" fill="#1c1418" />
          <path d="M-34 -26 Q-33 -68 -22 -72 Q-10 -68 -8 -26 Z" fill="#241a1f" />
          <path d="M-22 -70 V-28" stroke="#caa55a" strokeWidth="1" />
          <circle cx="-22" cy="-86" r="8.5" fill={skin} />
          <path d="M-30.5 -86 Q-31 -98 -22 -98 Q-13 -98 -13.5 -88 Q-20 -92 -30.5 -86 Z" fill={hair} />
          <path d="M-10 -62 Q2 -70 10 -66" fill="none" stroke="#241a1f" strokeWidth="6" strokeLinecap="round" />
          <path d="M8 -64 Q-4 -52 -12 -50" fill="none" stroke={skin} strokeWidth="3.5" strokeLinecap="round" />
        </g>
        {/* floor with reflection */}
        <path d="M0 560 H360 V640 H0 Z" fill="#5a1f3d" opacity=".7" />
        <ellipse cx="180" cy="580" rx="120" ry="10" fill="#f6d2de" opacity=".25" />
      </g>
      {/* florals */}
      <Rose x={30} y={612} r={14} tone="blush" />
      <Rose x={60} y={626} r={10} tone="pink" />
      <Leaf x={8} y={596} r={-120} s={2} />
      <Rose x={250} y={620} r={11} tone="blush" />
      <Leaf x={236} y={604} r={-80} s={1.6} />
    </>
  );
}

function Floral() {
  // Fallback for any event added later
  return (
    <>
      <Defs />
      <circle cx="180" cy="460" r="170" fill="#fbd9df" opacity=".6" filter="url(#inv-soft)" />
      <g filter="url(#inv-wc)">
        <path d="M60 640 V420 Q180 250 300 420 V640" fill="none" stroke="#d9b56a" strokeWidth="6" />
        {Array.from({ length: 22 }, (_, i) => {
          const t = i / 21;
          const a = Math.PI * (1 - t);
          const x = 180 + Math.cos(a) * 120;
          const y = 420 - Math.sin(a) * 150 + (t < 0.05 || t > 0.95 ? 0 : 0);
          return <Rose key={i} x={x} y={y} r={9} tone={i % 3 ? 'pink' : 'red'} />;
        })}
      </g>
      {Array.from({ length: 10 }, (_, i) => (
        <Leaf key={i} x={50 + i * 28} y={610 + (i % 2) * 10} r={-90 + i * 18} s={1.8} />
      ))}
    </>
  );
}

const themes: Record<string, SceneTheme> = {
  'welcome-party': {
    background: 'linear-gradient(180deg, #0f3b3a 0%, #1f5a52 38%, #2f6b56 62%, #c98a4a 100%)',
    title: '#f6dca0',
    text: '#fbf1dc',
    petals: ['#f7c9d6', '#f8bf45', '#fff3d6'],
    sparkle: true,
    scene: WelcomeMehndi,
  },
  haldi: {
    background: 'linear-gradient(180deg, #fbd64a 0%, #f8c232 40%, #f4a926 75%, #ee9322 100%)',
    title: '#3f4a1a',
    text: '#5a3510',
    petals: ['#f4a32c', '#e0606e', '#fff1a8'],
    scene: Haldi,
  },
  wedding: {
    background: 'linear-gradient(180deg, #f6c7c1 0%, #f3a98f 34%, #eb8a6f 58%, #f5c587 100%)',
    title: '#7a1830',
    text: '#5a1a28',
    petals: ['#c23a4d', '#f2a7bb', '#fff4ea'],
    scene: Wedding,
  },
  reception: {
    background: 'linear-gradient(180deg, #3a1230 0%, #5f1f47 38%, #8a3563 70%, #b85d86 100%)',
    title: '#f7d9a0',
    text: '#fbe9f0',
    petals: ['#f6d2de', '#fff4c8', '#f2a6c0'],
    sparkle: true,
    scene: Reception,
  },
};

const fallback: SceneTheme = {
  background: 'linear-gradient(180deg, #fff6ee 0%, #fbe6e3 50%, #f6d3d3 100%)',
  title: '#7a1830',
  text: '#5a1a28',
  petals: ['#f2a7bb', '#e0606e', '#f8bf45'],
  scene: Floral,
};

export function themeFor(slug: string): SceneTheme {
  return themes[slug] ?? fallback;
}
