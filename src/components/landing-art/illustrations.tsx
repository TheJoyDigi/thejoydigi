import React from "react";
import s from "./art.module.css";
import { blobPath, CORAL, CREAM, INK, MINT, rng, SKY, Sparkle, SUN } from "./primitives";

const d = (sec: number) => ({ animationDelay: `${sec}s` });

export function WebsiteArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden>
      <path d={blobPath(3, { r: 130, cx: 200, cy: 150, points: 8 })} fill={SKY} opacity={0.18} />
      <g className={s.float}>
        <rect x={40} y={40} width={320} height={220} rx={16} fill="#fff" stroke={INK} strokeWidth={3} />
        <line x1={40} y1={72} x2={360} y2={72} stroke={INK} strokeWidth={3} />
        <circle cx={62} cy={56} r={5} fill={CORAL} />
        <circle cx={78} cy={56} r={5} fill={SUN} />
        <circle cx={94} cy={56} r={5} fill={MINT} />
        <rect x={120} y={49} width={180} height={14} rx={7} fill={CREAM} />

        {[100, 116, 132].map((y, i) => (
          <path
            key={y}
            d={`M62 ${y} H${i === 2 ? 160 : 205}`}
            pathLength={1}
            className={s.drawLoop}
            style={d(i * 0.25)}
            stroke={i === 0 ? INK : "#9FB3B9"}
            strokeWidth={i === 0 ? 9 : 6}
            strokeLinecap="round"
          />
        ))}
        <rect x={62} y={148} width={80} height={24} rx={12} fill={CORAL} />
        <path d="M84 160 h36" stroke="#fff" strokeWidth={4} strokeLinecap="round" />

        <rect x={228} y={90} width={110} height={82} rx={12} fill={SUN} opacity={0.35} />
        <circle className={s.floatAlt} cx={310} cy={112} r={11} fill={SUN} />
        <path d="M236 166 L266 128 L286 150 L300 136 L332 166 Z" fill={SKY} />

        {[62, 152, 242].map((x, i) => (
          <g key={x} className={s.pop} style={d(0.3 + i * 0.3)}>
            <rect x={x} y={190} width={96} height={52} rx={10} fill={CREAM} stroke={INK} strokeWidth={2} />
            <circle cx={x + 18} cy={216} r={8} fill={[SKY, CORAL, MINT][i]} />
            <path d={`M${x + 34} 212 h44 M${x + 34} 222 h28`} stroke={INK} strokeOpacity={0.4} strokeWidth={4} strokeLinecap="round" />
          </g>
        ))}

        <circle className={s.click} cx={102} cy={160} r={16} fill="none" stroke={INK} strokeWidth={3} />
        <g transform="translate(162 120)">
          <g className={s.cursor}>
            <path d="M0 0 L0 26 L7 20 L12 31 L17 29 L12 18 L21 18 Z" fill={INK} stroke="#fff" strokeWidth={2} strokeLinejoin="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function AppArt() {
  const cards = Array.from({ length: 7 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden>
      <defs>
        <clipPath id="app-screen">
          <rect x={153} y={44} width={94} height={212} rx={14} />
        </clipPath>
      </defs>
      <path d={blobPath(14, { r: 125, cx: 200, cy: 150, points: 8 })} fill={CORAL} opacity={0.16} />
      <g className={s.float}>
        <rect x={145} y={28} width={110} height={244} rx={24} fill={INK} />
        <rect x={153} y={44} width={94} height={212} rx={14} fill={CREAM} />
        <g clipPath="url(#app-screen)">
          <g className={s.scrollFeed}>
            {cards.map((i) => {
              const y = 54 + i * 58;
              const c = [SKY, CORAL, SUN, MINT][i % 4];
              return (
                <g key={i}>
                  <rect x={161} y={y} width={78} height={48} rx={9} fill="#fff" />
                  <circle cx={176} cy={y + 15} r={7} fill={c} />
                  <path d={`M189 ${y + 12} h40 M189 ${y + 20} h26 M169 ${y + 36} h62`} stroke={INK} strokeOpacity={0.35} strokeWidth={4} strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        </g>
        <rect x={182} y={36} width={36} height={6} rx={3} fill="#0B5566" />
      </g>

      <g className={s.bubble} style={{ transformOrigin: "left bottom" }}>
        <rect x={266} y={60} width={112} height={44} rx={14} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <path className={s.beat} d="M290 76 c-4-6-14-3-12 4 c1 5 12 12 12 12 s11-7 12-12 c2-7-8-10-12-4z" fill={CORAL} />
        <path d="M312 78 h50 M312 88 h32" stroke={INK} strokeOpacity={0.4} strokeWidth={4} strokeLinecap="round" />
      </g>

      <g className={s.bubble} style={{ ...d(2), transformOrigin: "right bottom" }}>
        <rect x={28} y={176} width={96} height={40} rx={20} fill={SKY} />
        {[56, 76, 96].map((x, i) => (
          <circle key={x} className={s.twinkle} style={d(i * 0.2)} cx={x} cy={196} r={6} fill="#fff" />
        ))}
      </g>

      <rect className={s.floatAlt} x={60} y={70} width={40} height={40} rx={11} fill={SUN} />
      <rect className={s.float} style={d(-2)} x={300} y={200} width={34} height={34} rx={10} fill={MINT} />
      <circle className={s.floatAlt} style={d(-4)} cx={96} cy={250} r={13} fill="none" stroke={INK} strokeWidth={4} />
    </svg>
  );
}

export function ConsultingArt() {
  const bars = [
    { x: 84, h: 40 },
    { x: 134, h: 70 },
    { x: 184, h: 60 },
    { x: 234, h: 110 },
    { x: 284, h: 150 },
  ];
  const points: [number, number][] = [
    [60, 228],
    [160, 188],
    [250, 128],
    [338, 62],
  ];
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden>
      <path d={blobPath(27, { r: 128, cx: 200, cy: 150, points: 8 })} fill={SUN} opacity={0.22} />
      <g className={s.spinSlow}>
        <circle cx={200} cy={150} r={122} fill="none" stroke={INK} strokeOpacity={0.25} strokeWidth={2} strokeDasharray="3 9" />
        <path d="M200 20 l6 16 h-12 z M200 280 l6 -16 h-12 z M70 150 l16 6 v-12 z M330 150 l-16 6 v-12 z" fill={INK} fillOpacity={0.3} />
      </g>

      {[90, 130, 170, 210].map((y) => (
        <line key={y} x1={56} y1={y} x2={360} y2={y} stroke={INK} strokeOpacity={0.12} strokeWidth={2} strokeDasharray="6 8" />
      ))}
      <path d="M56 40 V250 H360" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />

      {bars.map((b, i) => (
        <rect key={b.x} className={s.grow} style={d(i * 0.15)} x={b.x - 14} y={250 - b.h} width={28} height={b.h} rx={6} fill={SKY} opacity={0.55} />
      ))}

      <path
        d="M60 228 C 110 222 120 180 160 188 S 220 150 250 128 S 310 86 338 62"
        pathLength={1}
        className={s.drawLoop}
        fill="none"
        stroke={CORAL}
        strokeWidth={6}
        strokeLinecap="round"
      />
      {points.map(([x, y], i) => (
        <circle key={x} className={s.pop} style={d(0.4 + i * 0.5)} cx={x} cy={y} r={8} fill="#fff" stroke={CORAL} strokeWidth={4} />
      ))}

      <g className={s.float} style={d(-1)}>
        <g transform="translate(346 44) rotate(45)">
          <path d="M0 -26 C 10 -16 12 0 8 14 H -8 C -12 0 -10 -16 0 -26 Z" fill={INK} />
          <circle cx={0} cy={-6} r={5} fill={SKY} />
          <path d="M-8 6 L-16 18 L-8 14 Z M8 6 L16 18 L8 14 Z" fill={CORAL} />
          <path className={s.twinkle} d="M-5 16 L0 30 L5 16 Z" fill={SUN} />
        </g>
      </g>
    </svg>
  );
}

export function QrArt() {
  const n = 17;
  const cell = 12;
  const origin = 98;
  const oy = 38;
  const rand = (x: number, y: number) => rng(x * 131 + y * 7 + 1)();
  const inFinder = (x: number, y: number) =>
    (x < 5 && y < 5) || (x > n - 6 && y < 5) || (x < 5 && y > n - 6);
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y) || rand(x, y) < 0.52) continue;
      cells.push(
        <rect
          key={`${x}-${y}`}
          className={s.qrCell}
          style={d((x + y) * 0.08)}
          x={origin + x * cell + 1}
          y={oy + y * cell + 1}
          width={cell - 2}
          height={cell - 2}
          rx={3}
          fill={(x + y) % 7 === 0 ? CORAL : INK}
        />
      );
    }
  }
  const finder = (fx: number, fy: number) => (
    <g key={`${fx}-${fy}`}>
      <rect x={origin + fx * cell} y={oy + fy * cell} width={cell * 5} height={cell * 5} rx={12} fill="none" stroke={INK} strokeWidth={cell * 0.9} />
      <rect className={s.beat} x={origin + (fx + 1.6) * cell} y={oy + (fy + 1.6) * cell} width={cell * 1.8} height={cell * 1.8} rx={5} fill={SKY} />
    </g>
  );
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" aria-hidden>
      <rect x={0} y={0} width={400} height={280} fill={SKY} opacity={0.14} />
      <circle className={s.floatAlt} cx={40} cy={230} r={60} fill={SKY} opacity={0.3} />
      <circle className={s.float} cx={370} cy={40} r={46} fill={SUN} opacity={0.45} />
      <rect x={origin - 14} y={oy - 14} width={n * cell + 28} height={n * cell + 28} rx={22} fill="#fff" stroke={INK} strokeWidth={3} />
      {cells}
      {finder(0, 0)}
      {finder(n - 5, 0)}
      {finder(0, n - 5)}
      <rect className={s.dashFlow} x={origin - 24} y={oy - 24} width={n * cell + 48} height={n * cell + 48} rx={28} fill="none" stroke={CORAL} strokeWidth={3} strokeDasharray="10 14" />
    </svg>
  );
}

const BS_PINK = "#FF3D8B";
const BS_BLUE = "#1F6FE5";

export function BlueSockArt() {
  const trail = [
    [196, 250, 70],
    [222, 236, 62],
    [250, 248, 70],
    [276, 232, 58],
    [304, 244, 66],
  ];
  const badges = [
    { x: 206, y: 70, c: SUN },
    { x: 256, y: 52, c: BS_PINK },
    { x: 306, y: 70, c: SKY },
  ];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="bs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF4E0" />
          <stop offset="100%" stopColor="#FFE2C4" />
        </linearGradient>
        <linearGradient id="bs-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5CD3F0" />
          <stop offset="100%" stopColor="#1FA6D6" />
        </linearGradient>
        <clipPath id="bs-sock-clip">
          <path d="M72 38 H134 V150 C134 166 144 173 160 176 L190 181 C212 186 214 218 190 224 L112 226 C82 226 72 204 72 182 Z" />
        </clipPath>
      </defs>
      <rect width={400} height={280} fill="url(#bs-sky)" />
      <circle cx={352} cy={46} r={26} fill={SUN} />
      <rect y={196} width={400} height={84} fill="url(#bs-pool)" />
      <path d="M0 214 C 40 206 80 222 120 214 S 200 206 240 214 S 320 222 400 212" fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={3} />
      <path d="M0 246 C 50 238 100 254 150 246 S 250 238 300 246 S 370 252 400 244" fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} />

      <g className={s.float} style={d(-1)}>
        <ellipse cx={322} cy={214} rx={50} ry={17} fill="none" stroke={BS_PINK} strokeWidth={17} />
        <ellipse cx={322} cy={209} rx={50} ry={17} fill="none" stroke="#FF7AB0" strokeWidth={6} strokeDasharray="14 18" />
      </g>

      <g transform="rotate(-10 130 140)" className={s.floatAlt}>
        <path d="M72 38 H134 V150 C134 166 144 173 160 176 L190 181 C212 186 214 218 190 224 L112 226 C82 226 72 204 72 182 Z" fill={BS_BLUE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <g clipPath="url(#bs-sock-clip)">
          <rect x={60} y={38} width={90} height={18} fill={INK} />
          <rect x={60} y={64} width={90} height={9} fill="#fff" />
          <rect x={60} y={80} width={90} height={9} fill="#fff" />
          <circle cx={112} cy={214} r={30} fill="#1655B8" />
          <circle cx={198} cy={206} r={24} fill="#1655B8" />
        </g>
      </g>

      {badges.map((b, i) => (
        <g key={i} className={s.pop} style={d(0.2 + i * 0.25)}>
          <circle cx={b.x} cy={b.y} r={19} fill={b.c} stroke={INK} strokeWidth={2.5} />
          <path d={`M${b.x} ${b.y - 9} l2.7 5.6 6.1 .9 -4.4 4.3 1 6.1 -5.4 -2.9 -5.4 2.9 1 -6.1 -4.4 -4.3 6.1 -.9z`} fill="#fff" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
        </g>
      ))}

      {trail.map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <g className={s.paw} style={d(i * 0.4)}>
            <ellipse cx={0} cy={4} rx={6} ry={5} fill="#fff" />
            <circle cx={-6} cy={-4} r={2.4} fill="#fff" />
            <circle cx={-2} cy={-7.5} r={2.4} fill="#fff" />
            <circle cx={2} cy={-7.5} r={2.4} fill="#fff" />
            <circle cx={6} cy={-4} r={2.4} fill="#fff" />
          </g>
        </g>
      ))}
    </svg>
  );
}

export function GrowthIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden>
      <circle cx={40} cy={40} r={36} fill={MINT} opacity={0.3} />
      <path d="M40 66 V30" pathLength={1} className={s.drawLoop} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path className={s.pop} style={d(0.6)} d="M40 44 C 26 44 20 34 20 26 C 32 26 40 32 40 44Z" fill="#2FBF8F" />
      <path className={s.pop} style={d(1)} d="M40 36 C 54 36 60 26 60 18 C 48 18 40 24 40 36Z" fill="#2FBF8F" />
      <path d="M24 66 H56" stroke={INK} strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}

export function TailoredIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden>
      <circle cx={40} cy={40} r={36} fill={SKY} opacity={0.25} />
      <path className={s.dashFlow} d="M10 56 C 24 40 40 64 56 44 S 72 30 72 30" fill="none" stroke={CORAL} strokeWidth={3} strokeDasharray="6 6" strokeLinecap="round" />
      <g className={s.float}>
        <path d="M30 20 L58 48" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d="M30 48 L58 20" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <circle cx={26} cy={52} r={7} fill="none" stroke={INK} strokeWidth={4} />
        <circle cx={26} cy={16} r={7} fill="none" stroke={INK} strokeWidth={4} />
      </g>
    </svg>
  );
}

export function CareIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden>
      <circle cx={40} cy={40} r={36} fill={CORAL} opacity={0.2} />
      <path className={s.beat} d="M40 62 C 12 44 14 22 28 20 C 34 19 38 23 40 27 C 42 23 46 19 52 20 C 66 22 68 44 40 62Z" fill={CORAL} />
      <path d="M14 42 H28 L32 34 L38 50 L42 38 H66" pathLength={1} className={s.drawLoop} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg viewBox="-40 -40 80 80" className="w-16 h-16" aria-hidden>
      <circle r={30} fill="#fff" stroke={INK} strokeWidth={4} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={0} y1={-24} x2={0} y2={i % 3 ? -21 : -18} stroke={INK} strokeWidth={2.5} transform={`rotate(${i * 30})`} strokeLinecap="round" />
      ))}
      <g className={s.tick}>
        <line x1={0} y1={0} x2={0} y2={-14} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      </g>
      <g className={s.sweep}>
        <line x1={0} y1={4} x2={0} y2={-22} stroke={CORAL} strokeWidth={2.5} strokeLinecap="round" />
      </g>
      <circle r={3.5} fill={CORAL} />
    </svg>
  );
}

export function BarsIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden>
      <rect x={6} y={6} width={68} height={68} rx={18} fill={SKY} opacity={0.2} />
      {[
        { x: 18, h: 22, c: SKY },
        { x: 34, h: 36, c: INK },
        { x: 50, h: 46, c: CORAL },
      ].map((b, i) => (
        <rect key={b.x} className={s.grow} style={d(i * 0.2)} x={b.x} y={62 - b.h} width={12} height={b.h} rx={4} fill={b.c} />
      ))}
    </svg>
  );
}

export function QuoteIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden>
      <g className={s.float}>
        <path d="M20 10 H48 L62 24 V70 H20 Z" fill="#fff" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M48 10 V24 H62" fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        {[34, 44, 54].map((y, i) => (
          <path key={y} d={`M28 ${y} H${i === 2 ? 42 : 54}`} pathLength={1} className={s.drawLoop} style={d(i * 0.3)} stroke={INK} strokeOpacity={0.5} strokeWidth={4} strokeLinecap="round" />
        ))}
      </g>
      <circle className={s.pop} style={d(1.4)} cx={60} cy={60} r={12} fill={MINT} />
      <path className={s.pop} style={d(1.6)} d="M54 60 L58.5 64.5 L66 56" fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
