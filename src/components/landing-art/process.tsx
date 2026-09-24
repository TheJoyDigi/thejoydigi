import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CORAL, INK, MINT, RevealWords, Scene, SectionKicker, SKY, SUN } from "./primitives";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const steps = [
  {
    title: "Free Consultation",
    text: "Understand your goals, challenges, and ideas.",
    img: "/how-we-work/Consultation.svg",
    color: SKY,
  },
  {
    title: "Custom Proposal",
    text: "You'll receive a tailored plan with scope, time estimate, and cost.",
    img: "/how-we-work/Proposal.svg",
    color: SUN,
  },
  {
    title: "Design & Build",
    text: "We turn your vision into a clean, functional digital product.",
    img: "/how-we-work/Build.svg",
    color: CORAL,
  },
  {
    title: "Launch & Support",
    text: "We help launch your site/app and provide ongoing support if needed.",
    img: "/how-we-work/Launching.svg",
    color: MINT,
  },
];

type Geo = { w: number; h: number; cx: number; nodes: number[]; d: string };

function buildPath(w: number, h: number, cx: number, nodes: number[], amp: number) {
  const ys = [0, ...nodes, h];
  let d = `M${cx},0`;
  for (let i = 1; i < ys.length; i++) {
    const [a, b] = [ys[i - 1], ys[i]];
    const side = i % 2 ? 1 : -1;
    const k = amp * side;
    d += ` C${cx + k},${a + (b - a) * 0.3} ${cx + k},${a + (b - a) * 0.7} ${cx},${b}`;
  }
  return d;
}

export default function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [lit, setLit] = useState(-1);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.offsetWidth;
    const h = wrap.offsetHeight;
    const desktop = w >= 768;
    const cx = desktop ? w / 2 : 22;
    const nodes = stepRefs.current.map((el) => {
      const node = el?.querySelector<HTMLElement>("[data-node]");
      if (!el || !node) return 0;
      return el.offsetTop + node.offsetTop + node.offsetHeight / 2;
    });
    const amp = desktop ? 56 : 14;
    setGeo({ w, h, cx, nodes, d: buildPath(w, h, cx, nodes, amp) });
  }, []);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 65%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const orbX = useMotionValue(0);
  const orbY = useMotionValue(0);

  const placeOrb = (v: number) => {
    const path = pathRef.current;
    if (!path || !geo) return;
    const len = path.getTotalLength();
    const p = path.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    orbX.set(p.x);
    orbY.set(p.y);
    const idx = geo.nodes.filter((n) => p.y >= n - 4).length - 1;
    if (idx !== lit) setLit(idx);
  };

  useMotionValueEvent(progress, "change", placeOrb);
  useEffect(() => placeOrb(progress.get()), [geo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Scene id="process" className="relative bg-[#FDF6EC] py-20 md:py-28 overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-[#4ABEFF]/15 blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-[30rem] h-[30rem] rounded-full bg-[#FF6B6B]/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <SectionKicker color={INK}>The joy path</SectionKicker>
          <h2 className="font-display !py-0 mt-4 text-5xl md:text-7xl font-[460] leading-[0.95] tracking-tight text-[#003B49] mb-6">
            <RevealWords text="How We" /> <RevealWords text="Work" delay={0.12} wordClassName="italic text-[#FF6B6B]" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#003B49]/80"
          >
            At The Joy Digi, we aim to make your digital transformation feel
            easy, fun, and empowering — not overwhelming.
          </motion.p>
        </div>

        <div ref={wrapRef} className="relative">
          {geo && (
            <svg
              aria-hidden
              className="absolute inset-0 pointer-events-none overflow-visible"
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
            >
              <defs>
                <linearGradient id="path-grad" x1="0" y1="0" x2="0" y2={geo.h} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={SKY} />
                  <stop offset="35%" stopColor={SUN} />
                  <stop offset="70%" stopColor={CORAL} />
                  <stop offset="100%" stopColor={MINT} />
                </linearGradient>
                <filter id="orb-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <path d={geo.d} fill="none" stroke={INK} strokeOpacity={0.15} strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" />
              <motion.path
                ref={pathRef}
                d={geo.d}
                fill="none"
                stroke="url(#path-grad)"
                strokeWidth={6}
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
              {geo.nodes.map((y, i) => (
                <g key={i} transform={`translate(${geo.cx} ${y})`}>
                  <motion.circle
                    r={20}
                    fill="#FDF6EC"
                    stroke={i <= lit ? steps[i].color : INK}
                    strokeOpacity={i <= lit ? 1 : 0.25}
                    strokeWidth={4}
                    animate={{ scale: i <= lit ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  />
                  <text textAnchor="middle" dy="0.35em" fontSize={14} fontWeight={700} fill={INK}>
                    {i + 1}
                  </text>
                </g>
              ))}
              <motion.g style={{ x: orbX, y: orbY }}>
                <circle r={16} fill={CORAL} opacity={0.6} filter="url(#orb-glow)" />
                <circle r={8} fill="#fff" stroke={CORAL} strokeWidth={4} />
              </motion.g>
            </svg>
          )}

          <ol className="relative space-y-16 md:space-y-20">
            {steps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative grid md:grid-cols-2 md:gap-32 items-center pl-14 md:pl-0"
                >
                  <span data-node className="absolute left-0 top-1/2 h-0 w-0 md:left-1/2" />
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative rounded-[2rem] border-2 border-[#003B49] bg-white p-6 md:p-8 shadow-[6px_6px_0_0_#003B49] ${
                      right ? "md:col-start-2" : ""
                    }`}
                  >
                    <span
                      className="font-display absolute -top-7 right-5 md:-top-8 md:right-6 text-6xl md:text-8xl font-semibold leading-none"
                      style={{ color: step.color, WebkitTextStroke: `2px ${INK}` }}
                    >
                      0{i + 1}
                    </span>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                      <motion.div
                        className="shrink-0 rounded-2xl p-2"
                        style={{ background: `${step.color}33` }}
                      >
                        <Image src={step.img} alt={step.title} width={120} height={120} className="h-20 w-20 md:h-28 md:w-28" />
                      </motion.div>
                      <div>
                        <h3 className="font-display !py-0 text-2xl md:text-3xl font-semibold text-[#003B49] mb-2">
                          {step.title}
                        </h3>
                        <p className="text-[#003B49]/80 md:text-lg">{step.text}</p>
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Scene>
  );
}
