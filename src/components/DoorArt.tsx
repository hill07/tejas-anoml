import { useId, type ReactNode } from 'react';

/*
 * Hand-drawn, watercolour-style SVG illustrations for the "Step inside" frames.
 * Each sits in an 88 × 124 canvas (the frame's picture opening).
 */

export type DoorArtKind = 'story' | 'invite' | 'wardrobe' | 'travel' | 'guide' | 'gallery' | 'rsvp' | 'more';

const skin = '#e9b996';
const skinShade = '#d49d7a';
const hair = '#3b2320';
const leafC = '#7fa06a';
const leafDark = '#5d7d4c';

function Wash({ cx, cy, rx, ry, color, id, opacity = 0.55 }: { cx: number; cy: number; rx: number; ry: number; color: string; id: string; opacity?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} filter={`url(#${id}-blur)`} />;
}

function Leaf({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C3 -4 9 -4 12 0 C9 4 3 4 0 0 Z" fill={leafC} stroke={leafDark} strokeWidth=".4" />
      <path d="M1 0 H11" stroke={leafDark} strokeWidth=".35" />
    </g>
  );
}

function Rose({ x, y, r = 4, tone = 'pink' }: { x: number; y: number; r?: number; tone?: 'pink' | 'red' | 'blush' }) {
  const c = { pink: ['#f2a7bb', '#e07a98', '#b9476a'], red: ['#e0606e', '#c23a4d', '#8e1f33'], blush: ['#f8cfd6', '#eeabb9', '#c97a8f'] }[tone];
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={c[0]} />
      <circle r={r * 0.72} fill={c[1]} opacity=".85" />
      <path
        d={`M${-r * 0.55} ${r * 0.1} A${r * 0.55} ${r * 0.55} 0 1 1 ${r * 0.3} ${r * 0.45} M${-r * 0.25} 0 A${r * 0.28} ${r * 0.28} 0 1 1 ${r * 0.15} ${r * 0.2}`}
        fill="none"
        stroke={c[2]}
        strokeWidth={r * 0.13}
        strokeLinecap="round"
      />
    </g>
  );
}

function Marigold({ x, y, r = 3 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#f4a32c" />
      <circle r={r * 0.7} fill="#f8bf45" />
      <circle r={r * 0.35} fill="#e0851c" />
    </g>
  );
}

function Bougainvillea({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <Leaf x={-2} y={2} r={-150} s={1.1} />
      <Leaf x={6} y={-6} r={-60} s={0.9} />
      <Leaf x={12} y={4} r={20} s={0.9} />
      {[
        [0, 0, 4.5], [7, -3, 4], [4, 5, 3.6], [12, -1, 3.4], [-5, 5, 3.2], [9, 7, 3],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} fill={cx % 2 ? '#ee8fb0' : '#e56f98'} opacity=".9" />
      ))}
      <circle cx={2} cy={-1} r={1.6} fill="#fbd3e0" />
      <circle cx={10} cy={2} r={1.3} fill="#fbd3e0" />
    </g>
  );
}

/* ---------- scenes ---------- */

function Story({ id }: { id: string }) {
  // A domed palace pavilion with bougainvillea
  return (
    <>
      <Wash id={id} cx={44} cy={60} rx={36} ry={46} color="#f8e2cf" opacity={0.8} />
      <Wash id={id} cx={44} cy={104} rx={40} ry={10} color="#e9d2b3" />
      <g filter={`url(#${id}-wc)`}>
        {/* side kiosks */}
        {[18, 70].map((cx) => (
          <g key={cx}>
            <rect x={cx - 7} y={62} width={14} height={30} fill="#f1dcc0" stroke="#c9a27a" strokeWidth=".6" />
            <path d={`M${cx - 5} 92 V72 Q${cx} 64 ${cx + 5} 72 V92`} fill="#e3c39c" opacity=".6" />
            <path d={`M${cx - 8} 62 H${cx + 8} L${cx + 6} 58 H${cx - 6} Z`} fill="#e8c9a2" stroke="#c9a27a" strokeWidth=".5" />
            <path d={`M${cx - 6} 58 Q${cx - 6} 46 ${cx} 44 Q${cx + 6} 46 ${cx + 6} 58 Z`} fill="#f2c7ae" stroke="#c98f75" strokeWidth=".5" />
            <path d={`M${cx} 44 V39`} stroke="#c69b43" strokeWidth=".8" />
            <circle cx={cx} cy={38.5} r={1} fill="#c69b43" />
          </g>
        ))}
        {/* main hall */}
        <rect x={26} y={56} width={36} height={38} fill="#f6e4ca" stroke="#c9a27a" strokeWidth=".7" />
        {[30, 40, 50].map((x) => (
          <path key={x} d={`M${x} 94 V70 Q${x + 4} 62 ${x + 8} 70 V94`} fill="#dcb58c" opacity=".55" stroke="#b98c62" strokeWidth=".5" />
        ))}
        <path d="M24 56 H64 L61 51 H27 Z" fill="#e8c9a2" stroke="#c9a27a" strokeWidth=".6" />
        {/* dome */}
        <path d="M28 51 Q27 30 44 22 Q61 30 60 51 Z" fill="#f3c2a7" stroke="#c98f75" strokeWidth=".7" />
        <path d="M33 49 Q33 33 44 25" fill="none" stroke="#fbe3d5" strokeWidth="2" opacity=".8" />
        <path d="M44 22 V13" stroke="#c69b43" strokeWidth="1" />
        <circle cx={44} cy={12} r={1.6} fill="#d9ad4e" />
        <path d="M41 17 Q44 14 47 17" fill="none" stroke="#c69b43" strokeWidth=".8" />
        {/* plinth and steps */}
        <rect x={8} y={92} width={72} height={6} fill="#ead3b1" stroke="#c9a27a" strokeWidth=".6" />
        <rect x={4} y={98} width={80} height={6} fill="#e2c7a1" stroke="#c9a27a" strokeWidth=".6" />
      </g>
      <Bougainvillea x={6} y={100} />
      <Bougainvillea x={82} y={98} flip />
      <path d="M16 26 q2 -2 4 0 q2 -2 4 0 M62 18 q1.5 -1.5 3 0 q1.5 -1.5 3 0" fill="none" stroke="#8a6a5a" strokeWidth=".6" />
    </>
  );
}

function Invite({ id }: { id: string }) {
  // A couple beneath a floral mandap
  return (
    <>
      <Wash id={id} cx={44} cy={58} rx={38} ry={48} color="#fbe0e4" opacity={0.85} />
      <g filter={`url(#${id}-wc)`}>
        {/* mandap posts */}
        {[10, 72].map((x) => (
          <g key={x}>
            <rect x={x} y={34} width={6} height={72} fill="#f4b3c1" stroke="#d17f95" strokeWidth=".6" />
            <rect x={x - 1.5} y={32} width={9} height={4} fill="#e2b35a" />
            <rect x={x - 1.5} y={104} width={9} height={4} fill="#e2b35a" />
          </g>
        ))}
        {/* canopy */}
        <path d="M6 34 Q44 6 82 34 Z" fill="#f7c4cf" stroke="#d17f95" strokeWidth=".7" />
        <path d="M6 34 Q16 40 25 34 Q35 40 44 34 Q53 40 63 34 Q72 40 82 34" fill="#fbe2e7" stroke="#d17f95" strokeWidth=".6" />
        <path d="M44 12 V6" stroke="#c69b43" strokeWidth="1" />
        <circle cx={44} cy={5} r={1.5} fill="#d9ad4e" />
        {/* marigold strings */}
        {[18, 30, 58, 70].map((x) => (
          <g key={x}>
            {[0, 1, 2, 3, 4].map((k) => (
              <circle key={k} cx={x} cy={40 + k * 4} r={1.5} fill={k % 2 ? '#f8bf45' : '#f09a2a'} />
            ))}
          </g>
        ))}
        {/* groom */}
        <path d="M30 104 L31 80 H37 L38 104 Z" fill="#efe1c4" stroke="#c9ab80" strokeWidth=".5" />
        <path d="M26 82 Q27 62 34 60 Q41 62 42 82 Z" fill="#f6ead2" stroke="#c9ab80" strokeWidth=".6" />
        <path d="M34 61 V82" stroke="#d9b56a" strokeWidth=".6" />
        <path d="M27 66 Q34 72 41 66" fill="none" stroke="#e05b72" strokeWidth="1.6" />
        <circle cx={34} cy={54} r={4.2} fill={skin} />
        <path d="M29.4 53 Q29 46 34 45 Q39.5 45.5 39 52.5 Q34 50 29.4 53 Z" fill="#b8263f" />
        <path d="M38 48 Q42 47 41 52" fill="none" stroke="#b8263f" strokeWidth="1.2" />
        <circle cx={34} cy={47.4} r={1} fill="#e7c15f" />
        {/* bride */}
        <path d="M44 104 Q46 80 54 72 Q62 80 66 104 Z" fill="#cf3b55" stroke="#9d2439" strokeWidth=".6" />
        <path d="M44 104 Q55 101 66 104" fill="none" stroke="#e8c15e" strokeWidth="2" />
        <path d="M47 96 Q55 93 63 96" fill="none" stroke="#e8c15e" strokeWidth=".8" />
        <path d="M50 74 Q54 64 58 74 Z" fill="#c9304b" />
        <circle cx={54} cy={60} r={4} fill={skin} />
        <path d="M49 60 Q49 53 54 53 Q59 53 59 60 Q57 56 54 56 Q51 56 49 60 Z" fill={hair} />
        {/* dupatta */}
        <path d="M48 62 Q48 50 54 50 Q61 50 61 60 Q63 76 66 92 Q58 82 56 68 Q52 70 48 62 Z" fill="#ef6f86" opacity=".6" />
        <path d="M49 58 Q52 51 57 51" fill="none" stroke="#e8c15e" strokeWidth=".7" />
        {/* hands joined with garland */}
        <path d="M40 76 Q44 80 50 76" fill="none" stroke={skinShade} strokeWidth="1.4" strokeLinecap="round" />
      </g>
      {[[20, 110], [44, 112], [66, 110], [30, 114], [58, 114]].map(([x, y]) => (
        <Rose key={`${x}${y}`} x={x} y={y} r={2.6} tone="pink" />
      ))}
    </>
  );
}

function Wardrobe({ id }: { id: string }) {
  // A bride in a flared pink lehenga
  return (
    <>
      <Wash id={id} cx={44} cy={62} rx={34} ry={48} color="#fbe4ea" opacity={0.85} />
      <Wash id={id} cx={44} cy={112} rx={30} ry={5} color="#d8c2b0" opacity={0.7} />
      <g filter={`url(#${id}-wc)`}>
        {/* lehenga */}
        <path d="M36 52 Q28 70 14 108 Q44 116 74 108 Q60 70 52 52 Z" fill={`url(#${id}-lehenga)`} stroke="#d27a93" strokeWidth=".7" />
        <path d="M14 108 Q44 116 74 108 L73 104 Q44 111 15 104 Z" fill="#e5bf61" />
        {[24, 34, 44, 54, 64].map((x) => (
          <path key={x} d={`M44 54 Q${(x + 44) / 2} 80 ${x} 106`} fill="none" stroke="#f9d9e2" strokeWidth=".7" opacity=".9" />
        ))}
        {[[30, 92], [40, 96], [50, 96], [58, 92], [36, 84], [52, 84], [44, 76]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={0.9} fill="#e5bf61" />
        ))}
        {/* blouse and waist */}
        <path d="M36 40 Q44 36 52 40 L52 52 H36 Z" fill="#e98aa3" stroke="#c9667f" strokeWidth=".6" />
        <path d="M36 50 H52" stroke="#e5bf61" strokeWidth="1.4" />
        {/* arms with bangles */}
        <path d="M36 41 Q30 52 34 62" fill="none" stroke={skin} strokeWidth="3" strokeLinecap="round" />
        <path d="M52 41 Q58 52 54 62" fill="none" stroke={skin} strokeWidth="3" strokeLinecap="round" />
        <path d="M32 55 h3.5 M32.5 57 h3.5 M52.5 55 h3.5 M52 57 h3.5" stroke="#d6a43f" strokeWidth=".9" />
        {/* neck and head */}
        <rect x={42} y={31} width={4} height={6} fill={skinShade} />
        <circle cx={44} cy={25} r={6} fill={skin} />
        <path d="M37.8 26 Q37 16 44 16 Q51 16 50.2 26 Q48 21 44 21 Q40 21 37.8 26 Z" fill={hair} />
        <circle cx={44} cy={20.8} r={1.1} fill="#e5bf61" />
        <path d="M40 34 Q44 38 48 34" fill="none" stroke="#e5bf61" strokeWidth="1.1" />
        {/* dupatta veil */}
        <path d="M36 26 Q36 13 44 13 Q53 13 53 24 Q58 44 62 70 Q56 60 53 46 Q48 40 40 40 Q35 34 36 26 Z" fill="#f59fb4" opacity=".55" />
        <path d="M37 24 Q39 15 44 14.5 Q50 15 52 22" fill="none" stroke="#e5bf61" strokeWidth=".7" />
      </g>
      <Rose x={10} y={112} r={4} tone="pink" />
      <Leaf x={12} y={116} r={20} />
      <Rose x={78} y={110} r={3.4} tone="blush" />
      <Leaf x={70} y={114} r={160} />
    </>
  );
}

function Travel({ id }: { id: string }) {
  // A Maltese luzzu on the sea beneath Mdina
  return (
    <>
      <rect x={0} y={0} width={88} height={78} fill={`url(#${id}-sky)`} />
      <Wash id={id} cx={64} cy={24} rx={16} ry={14} color="#fde2b8" opacity={0.9} />
      <circle cx={64} cy={24} r={6} fill="#f8cf85" opacity=".9" />
      <g filter={`url(#${id}-wc)`}>
        {/* Mdina skyline */}
        <path d="M0 76 V62 L8 60 V56 H14 V60 L22 58 V52 H30 V58 L36 56 V48 Q40 40 44 48 V56 L52 57 V50 H56 V46 H58 V50 H62 V58 L70 60 V55 H76 V61 L88 63 V76 Z" fill="#e8c998" stroke="#c9a06a" strokeWidth=".5" />
        <path d="M40 44 V39" stroke="#b58c55" strokeWidth=".7" />
        <path d="M0 76 H88 V70 Q44 66 0 70 Z" fill="#d9b683" />
        {/* sea */}
        <rect x={0} y={76} width={88} height={48} fill={`url(#${id}-sea)`} />
        {[84, 92, 100, 110].map((y, i) => (
          <path key={y} d={`M${i % 2 ? 4 : 0} ${y} q6 -2 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0`} fill="none" stroke="#e6f2f8" strokeWidth=".8" opacity=".85" />
        ))}
        {/* luzzu hull */}
        <path d="M14 92 Q16 84 12 76 L18 80 Q44 86 70 80 L76 76 Q72 84 74 92 Q44 100 14 92 Z" fill="#f4c542" stroke="#9c7a20" strokeWidth=".6" />
        <path d="M15 88 Q44 95 73 88" fill="none" stroke="#2f6fb0" strokeWidth="3" />
        <path d="M16 84.5 Q44 91 72 84.5" fill="none" stroke="#d33a3a" strokeWidth="1.4" />
        <path d="M18 80 Q44 86 70 80" fill="none" stroke="#3a8a4f" strokeWidth="1.2" />
        {/* bow & stern posts */}
        <path d="M12 76 Q10 70 13 66" fill="none" stroke="#d33a3a" strokeWidth="2" strokeLinecap="round" />
        <path d="M76 76 Q78 70 75 66" fill="none" stroke="#d33a3a" strokeWidth="2" strokeLinecap="round" />
        {/* the Eye of Osiris */}
        <path d="M20 86 Q24 83 28 86 Q24 89 20 86 Z" fill="#fff" stroke="#1e3f6e" strokeWidth=".5" />
        <circle cx={24} cy={86} r={1.3} fill="#1e3f6e" />
        {/* reflection */}
        <path d="M18 98 Q44 104 70 98" fill="none" stroke="#f4c542" strokeWidth="1.4" opacity=".35" />
      </g>
      <path d="M12 22 q2 -2 4 0 q2 -2 4 0 M24 30 q1.5 -1.5 3 0 q1.5 -1.5 3 0" fill="none" stroke="#7d6a6a" strokeWidth=".6" />
    </>
  );
}

function Guide({ id }: { id: string }) {
  // The sacred fire, with diyas and marigolds
  return (
    <>
      <Wash id={id} cx={44} cy={62} rx={30} ry={34} color="#fde0b0" opacity={0.9} />
      <Wash id={id} cx={44} cy={58} rx={14} ry={18} color="#ffd27a" opacity={0.7} />
      <g filter={`url(#${id}-wc)`}>
        {/* flames */}
        <path d="M44 30 C52 42 58 50 54 62 C51 70 37 70 34 62 C30 52 38 44 44 30 Z" fill="#f28a2e" />
        <path d="M44 40 C49 48 52 54 50 61 C48 66 40 66 38 61 C36 55 40 49 44 40 Z" fill="#f8b03c" />
        <path d="M44 50 C46 54 48 57 47 61 C46 64 42 64 41 61 C40 58 42 55 44 50 Z" fill="#fde48a" />
        <path d="M36 44 C34 50 34 55 36 58 C32 56 31 50 36 44 Z M53 42 C57 48 57 54 54 58 C58 55 58 48 53 42 Z" fill="#e8662c" opacity=".8" />
        {/* stepped havan kund */}
        <path d="M24 70 H64 L60 78 H28 Z" fill="#d9a441" stroke="#8a5f17" strokeWidth=".6" />
        <path d="M28 78 H60 L57 86 H31 Z" fill="#c38d2f" stroke="#8a5f17" strokeWidth=".6" />
        <path d="M31 86 H57 L55 94 H33 Z" fill="#ad7a24" stroke="#8a5f17" strokeWidth=".6" />
        <path d="M26 72 H62" stroke="#f7dd8e" strokeWidth=".8" />
        {/* diyas */}
        {[14, 74].map((x) => (
          <g key={x}>
            <path d={`M${x - 7} 100 Q${x} 108 ${x + 7} 100 Z`} fill="#c7653a" stroke="#8c3f1f" strokeWidth=".5" />
            <path d={`M${x} 99 C${x + 2.5} 95 ${x + 1.5} 92 ${x} 89 C${x - 1.5} 92 ${x - 2.5} 95 ${x} 99 Z`} fill="#f8b03c" />
            <circle cx={x} cy={96.5} r={0.9} fill="#fde48a" />
          </g>
        ))}
      </g>
      {/* marigold garland along the bottom */}
      {Array.from({ length: 11 }, (_, i) => (
        <Marigold key={i} x={6 + i * 7.6} y={112 + Math.sin(i * 0.9) * 2} r={3} />
      ))}
      {[[26, 104], [62, 104], [44, 104]].map(([x, y]) => (
        <Rose key={`${x}${y}`} x={x} y={y} r={2.2} tone="red" />
      ))}
    </>
  );
}

function Gallery({ id }: { id: string }) {
  // A pastel vintage camera and a scatter of photographs
  return (
    <>
      <Wash id={id} cx={44} cy={62} rx={36} ry={44} color="#e6ecf7" opacity={0.9} />
      <g filter={`url(#${id}-wc)`}>
        {/* photographs */}
        <g transform="rotate(-12 26 40)">
          <rect x={12} y={20} width={28} height={32} fill="#fffaf2" stroke="#d8cbb8" strokeWidth=".5" />
          <rect x={15} y={23} width={22} height={21} fill="#f7d7b7" />
          <path d="M15 44 L22 34 L28 40 L32 36 L37 44 Z" fill="#e1b67a" />
          <circle cx={31} cy={28} r={2.2} fill="#f7a35a" />
        </g>
        <g transform="rotate(10 62 38)">
          <rect x={48} y={18} width={28} height={32} fill="#fffaf2" stroke="#d8cbb8" strokeWidth=".5" />
          <rect x={51} y={21} width={22} height={21} fill="#cfe2ee" />
          <path d="M51 36 Q62 32 73 36 V42 H51 Z" fill="#8fbad3" />
          <path d="M56 36 Q62 31 68 36 Z" fill="#f4c542" />
        </g>
        {/* camera */}
        <rect x={16} y={62} width={56} height={36} rx={4} fill="#f2b9c4" stroke="#b9667c" strokeWidth=".7" />
        <rect x={16} y={70} width={56} height={20} fill="#e39aab" opacity=".6" />
        <path d="M30 62 L34 55 H50 L54 62 Z" fill="#e8c26a" stroke="#9c7a20" strokeWidth=".6" />
        <rect x={58} y={57} width={9} height={5} rx={1} fill="#fbf3e3" stroke="#b9967c" strokeWidth=".5" />
        <circle cx={44} cy={80} r={13} fill="#e8c26a" stroke="#9c7a20" strokeWidth=".7" />
        <circle cx={44} cy={80} r={9.5} fill="#4f5f7c" />
        <circle cx={44} cy={80} r={6} fill="#7d93b5" />
        <circle cx={41} cy={77} r={2.2} fill="#e6eefb" opacity=".9" />
        <circle cx={23} cy={67} r={2} fill="#fbf3e3" />
      </g>
      <Rose x={16} y={106} r={4} tone="blush" />
      <Leaf x={20} y={110} r={10} />
      <Rose x={70} y={108} r={3.2} tone="pink" />
      <Leaf x={62} y={112} r={170} s={0.9} />
      <path d="M44 106 c-2 -3 -6 -1 -4 2 l4 4 l4 -4 c2 -3 -2 -5 -4 -2 z" fill="#e07a98" />
    </>
  );
}

function Rsvp({ id }: { id: string }) {
  // An envelope sealed with a monogrammed wax seal, with a quill
  return (
    <>
      <Wash id={id} cx={44} cy={64} rx={36} ry={42} color="#f8e5d4" opacity={0.9} />
      <g filter={`url(#${id}-wc)`}>
        {/* quill */}
        <path d="M70 14 C58 26 50 44 46 60 L48 61 C54 46 64 30 74 18 Z" fill="#fbf6ee" stroke="#c8b79f" strokeWidth=".6" />
        <path d="M72 16 L47 60" stroke="#b9a58a" strokeWidth=".5" />
        <path d="M46 60 L44 66 L48 61 Z" fill="#c69b43" />
        {/* letter */}
        <rect x={20} y={38} width={48} height={40} fill="#fffdf8" stroke="#dccfb9" strokeWidth=".6" transform="rotate(-4 44 58)" />
        <path d="M26 46 h30 M26 51 h34 M26 56 h24" stroke="#c9a2a8" strokeWidth=".8" transform="rotate(-4 44 58)" />
        {/* envelope */}
        <rect x={10} y={60} width={68} height={44} fill="#f6e8d4" stroke="#caa97c" strokeWidth=".7" />
        <path d="M10 104 L44 80 L78 104" fill="#efdcc0" stroke="#caa97c" strokeWidth=".6" />
        <path d="M10 60 L44 86 L78 60" fill="#f2e2c9" stroke="#caa97c" strokeWidth=".7" />
        {/* wax seal */}
        <circle cx={44} cy={86} r={8.5} fill="#8e1c32" />
        <path d="M44 77.5 a8.5 8.5 0 0 1 6 2.5" fill="none" stroke="#b83a52" strokeWidth="1.2" />
        <circle cx={44} cy={86} r={6.2} fill="none" stroke="#b83a52" strokeWidth=".6" />
        <text x={44} y={88.6} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="6.4" fill="#f3cf82">
          A&amp;T
        </text>
      </g>
      <Rose x={12} y={62} r={5} tone="red" />
      <Rose x={20} y={56} r={3.4} tone="pink" />
      <Leaf x={6} y={56} r={-120} />
      <Leaf x={20} y={64} r={30} s={0.9} />
      <Marigold x={76} y={104} r={3.6} />
      <Leaf x={70} y={110} r={150} />
    </>
  );
}

function More({ id }: { id: string }) {
  // A tied bouquet of roses and marigolds
  return (
    <>
      <Wash id={id} cx={44} cy={58} rx={36} ry={44} color="#fbe3dc" opacity={0.9} />
      <g filter={`url(#${id}-wc)`}>
        {/* stems */}
        {[-10, -5, 0, 5, 10].map((dx) => (
          <path key={dx} d={`M${44 + dx * 1.4} 60 L${44 + dx * 0.3} 106`} stroke={leafDark} strokeWidth="1.2" />
        ))}
        {/* wrap */}
        <path d="M26 60 L44 104 L62 60 Q44 66 26 60 Z" fill="#fbf1e6" stroke="#dcc6ad" strokeWidth=".6" />
        <path d="M30 62 L44 98" stroke="#ecdcc8" strokeWidth=".8" />
        {/* ribbon */}
        <path d="M38 84 H50 L52 88 H36 Z" fill="#c23a4d" />
        <path d="M44 86 Q36 92 32 100 L37 99 Q40 94 44 88 Q48 94 51 99 L56 100 Q52 92 44 86 Z" fill="#d9495e" />
      </g>
      {/* blooms */}
      <Leaf x={20} y={44} r={-150} s={1.3} />
      <Leaf x={68} y={44} r={-30} s={1.3} />
      <Leaf x={26} y={28} r={-120} s={1.1} />
      <Leaf x={62} y={28} r={-60} s={1.1} />
      <Leaf x={44} y={14} r={-90} s={1.1} />
      <Rose x={44} y={40} r={9} tone="red" />
      <Rose x={30} y={48} r={7} tone="pink" />
      <Rose x={58} y={48} r={7} tone="pink" />
      <Rose x={36} y={28} r={6} tone="blush" />
      <Rose x={54} y={28} r={6} tone="blush" />
      <Marigold x={24} y={36} r={4.2} />
      <Marigold x={64} y={36} r={4.2} />
      <Marigold x={44} y={22} r={4} />
      <Marigold x={44} y={56} r={4} />
      {[[18, 56], [70, 56], [30, 18], [58, 18]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={1.6} fill="#f7d7df" />
      ))}
    </>
  );
}

const scenes: Record<DoorArtKind, (p: { id: string }) => ReactNode> = {
  story: Story,
  invite: Invite,
  wardrobe: Wardrobe,
  travel: Travel,
  guide: Guide,
  gallery: Gallery,
  rsvp: Rsvp,
  more: More,
};

export function DoorArt({ kind, className = '' }: { kind: DoorArtKind; className?: string }) {
  const id = `da${useId().replace(/:/g, '')}`;
  const Scene = scenes[kind];
  return (
    <svg viewBox="0 0 88 124" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        {/* soft paint edges */}
        <filter id={`${id}-wc`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id={`${id}-lehenga`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8c3cf" />
          <stop offset="1" stopColor="#e8859e" />
        </linearGradient>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe8f5" />
          <stop offset="1" stopColor="#fbe8d6" />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fc7dc" />
          <stop offset="1" stopColor="#6fa5c4" />
        </linearGradient>
      </defs>
      <Scene id={id} />
    </svg>
  );
}
